'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { RefObject, useEffect, useMemo, useState } from 'react'
import { useGraphicsMode } from '@/contexts/GraphicsModeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import {
  downgradeVantaQuality,
  resolveInitialVantaQuality,
  vantaTargetFps,
  type VantaQuality,
} from '@/utils/deviceHints'

interface VantaPerformanceState {
  isActive: boolean
  quality: VantaQuality
  targetFps: number
}

/**
 * Runtime perf pour Vanta : garde l’effet visible, adapte la densité / FPS cible.
 * Ne bascule plus vers graphicsMode « light » sur frames lentes (light = retire Vanta).
 */
export function useVantaPerformance(_elRef: RefObject<HTMLElement>): VantaPerformanceState {
  const [isVisibleTab, setIsVisibleTab] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  )
  const { graphicsMode } = useGraphicsMode()
  const { mode: presentationMode } = usePresentationMode()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const initialQuality = useMemo(() => {
    if (typeof navigator === 'undefined') return 'normal' as VantaQuality
    const nav = navigator as Navigator & { deviceMemory?: number }
    return resolveInitialVantaQuality({
      deviceMemory: nav.deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    })
  }, [])

  const [quality, setQuality] = useState<VantaQuality>(initialQuality)

  const creaWantsVanta = presentationMode === 'dev' && !prefersReducedMotion
  const allowVantaDespiteLightGraphics = creaWantsVanta && graphicsMode === 'light'
  const isActive =
    isVisibleTab && (graphicsMode === 'full' || allowVantaDespiteLightGraphics)

  useEffect(() => {
    if (typeof document === 'undefined') return

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
      if (delta > 32) slowFrames += 1

      if (frameCount >= 60) {
        const slowRatio = slowFrames / frameCount

        if (slowRatio > 0.38) {
          setQuality((current) => downgradeVantaQuality(current))
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
  }, [isActive])

  return {
    isActive,
    quality,
    targetFps: vantaTargetFps(quality),
  }
}

/** @deprecated Alias interne — préférer `quality`. */
export type VantaMode = VantaQuality
