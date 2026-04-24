'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { shouldDowngradeFromSlowFrames } from '@/utils/graphicsModeRules'

type VantaMode = 'normal' | 'degraded'

interface VantaPerformanceState {
  isActive: boolean
  mode: VantaMode
  targetFps: number
}

/**
 * Runtime perf state for heavy canvas effects.
 * - On ne met en pause que lorsque l’onglet est caché (économie batterie).
 * - Ne pas utiliser hasFocus / IntersectionObserver sur un fond fixed plein écran :
 *   ça peut laisser isActive à false (Safari, iframe, DevTools) + bloquer les clics.
 * - mode/targetFps : stockés en ref pour éviter de re-monter Vanta (deps useEffect) en boucle.
 * - Aligné sur `FullPageTopologyWrapper` : en présentation Créa (`dev`) sans prefers-reduced-motion,
 *   le fond constellations (Three) ou mesh de repli reste actif même si `graphicsMode === 'light'` ; hors Créa, Vanta DOTS.
 */
export function useVantaPerformance(_elRef: RefObject<HTMLElement>): VantaPerformanceState {
  const [isVisibleTab, setIsVisibleTab] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  )
  const { graphicsMode, requestLightMode } = useGraphicsMode()
  const { mode: presentationMode } = usePresentationMode()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const isProduction = process.env.NODE_ENV === 'production'

  const modeRef = useRef<VantaMode>('normal')
  const targetFpsRef = useRef(60)
  const lightModeRequestedRef = useRef(false)
  const [, bump] = useState(0)

  const creaWantsMotionBackground = presentationMode === 'dev' && !prefersReducedMotion
  const allowVantaDespiteLightGraphics = creaWantsMotionBackground && graphicsMode === 'light'
  const isActive =
    isVisibleTab && (graphicsMode === 'full' || allowVantaDespiteLightGraphics)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onVisibility = () => setIsVisibleTab(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return

    let raf = 0
    let running = true
    let last = performance.now()
    let frameCount = 0
    let slowFrames = 0

    const sample = () => {
      if (!running) return
      const now = performance.now()
      const delta = now - last
      last = now

      frameCount += 1
      if (delta > 28) slowFrames += 1

      if (frameCount >= 45) {
        const slowRatio = slowFrames / frameCount
        const nextMode: VantaMode = slowRatio > 0.45 ? 'degraded' : 'normal'
        const nextFps = nextMode === 'degraded' ? 30 : 60

        if (shouldDowngradeFromSlowFrames(slowRatio, isProduction) && !lightModeRequestedRef.current) {
          lightModeRequestedRef.current = true
          requestLightMode(`slow-frames-${Math.round(slowRatio * 100)}`)
        }

        if (modeRef.current !== nextMode || targetFpsRef.current !== nextFps) {
          modeRef.current = nextMode
          targetFpsRef.current = nextFps
          bump((n) => n + 1)
        }
        frameCount = 0
        slowFrames = 0
      }

      raf = requestAnimationFrame(sample)
    }

    raf = requestAnimationFrame(sample)
    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [isActive, isProduction, requestLightMode])

  return {
    isActive,
    mode: modeRef.current,
    targetFps: targetFpsRef.current,
  }
}
