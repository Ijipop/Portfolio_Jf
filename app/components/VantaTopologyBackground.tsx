'use client'

import { useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'
import { useVantaPerformance } from '@/hooks/useVantaPerformance'
import { loadExternalScript } from '@/utils/vantaScriptLoader'

const P5_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'
const VANTA_TOPOLOGY_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

function getTopologyOptions(themeName: ThemeName): Record<string, unknown> {
  const theme = THEMES[themeName]
  return {
    backgroundColor: hexToNumber(theme.bg),
    color: hexToNumber(theme.primary),
  }
}

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaTopologyBackgroundProps {
  /** Remplir uniquement le conteneur parent (pas de minHeight 100vh). À utiliser dans InteractiveBackgroundSection. */
  fillContainer?: boolean
  colorHex?: string
  backgroundHex?: string
}

export default function VantaTopologyBackground(props?: VantaTopologyBackgroundProps) {
  const { fillContainer = false, colorHex, backgroundHex } = props ?? {}
  const elRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<{ destroy: () => void; resize?: () => void } | null>(null)
  const [vantaReady, setVantaReady] = useState(false)
  const { themeName } = useAdvancedTheme()
  const { isActive, mode, targetFps } = useVantaPerformance(elRef)

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    let mounted = true
    let resizeObserver: ResizeObserver | null = null
    let resizeRaf = 0
    let lastResizeAt = 0

    if (!isActive) {
      setVantaReady(false)
      return () => {
        if (effectRef.current) {
          effectRef.current.destroy()
          effectRef.current = null
        }
      }
    }

    const init = async () => {
      try {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          setVantaReady(true)
          return
        }

        await loadExternalScript(P5_CDN)
        if (!mounted) return
        // Topology uses p5, not THREE. The "[VANTA] No THREE defined on window" message is from the
        // library and is harmless. Stub window.THREE to silence it.
        if (typeof (window as unknown as { THREE?: unknown }).THREE === 'undefined') {
          (window as unknown as { THREE: object }).THREE = {}
        }
        await loadExternalScript(VANTA_TOPOLOGY_CDN)
        if (!mounted || !elRef.current) return

        const VANTA = (window as unknown as { VANTA: { TOPOLOGY: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void } } }).VANTA
        if (!VANTA?.TOPOLOGY) {
          if (mounted) setVantaReady(true)
          return
        }

        const options = getTopologyOptions(themeName as ThemeName)
        const resolvedColor = colorHex ? hexToNumber(colorHex) : options.color
        const resolvedBackground = backgroundHex ? hexToNumber(backgroundHex) : options.backgroundColor
        const effect = VANTA.TOPOLOGY({
          el: elRef.current,
          mouseControls: mode === 'normal',
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          ...options,
          color: resolvedColor,
          backgroundColor: resolvedBackground,
        })
        effectRef.current = effect

        resizeObserver = new ResizeObserver(() => {
          if (resizeRaf) return
          resizeRaf = requestAnimationFrame(() => {
            resizeRaf = 0
            const now = performance.now()
            const minDelta = 1000 / targetFps
            if (now - lastResizeAt < minDelta) return
            lastResizeAt = now
            if (effectRef.current?.resize) effectRef.current.resize()
          })
        })
        resizeObserver.observe(el)

        requestAnimationFrame(() => {
          if (mounted) setVantaReady(true)
        })
      } catch (err) {
        console.warn('[VantaTopologyBackground] Vanta TOPOLOGY failed to load', err)
        if (mounted) setVantaReady(true)
      }
    }

    init()

    return () => {
      mounted = false
      resizeObserver?.disconnect()
      resizeObserver = null
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = 0
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [themeName, colorHex, backgroundHex, isActive, mode, targetFps])

  const fallbackBg = backgroundHex ?? getFallbackBgColor(themeName as ThemeName)

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        minHeight: fillContainer ? '100%' : '100vh',
        minWidth: '100%',
        backgroundColor: fallbackBg,
        opacity: vantaReady ? 1 : 0,
        transition: 'opacity 0s',
      }}
      aria-hidden
    />
  )
}
