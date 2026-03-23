'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'
import { useVantaPerformance } from '@/hooks/useVantaPerformance'
import { P5_CDN, VANTA_TOPOLOGY_CDN } from '@/utils/vantaAssets'
import { loadExternalScript } from '@/utils/vantaScriptLoader'

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
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const elRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<{ destroy: () => void; resize?: () => void } | null>(null)
  const [vantaReady, setVantaReady] = useState(false)
  const { themeName } = useAdvancedTheme()
  const { isActive, targetFps } = useVantaPerformance(elRef)
  const targetFpsRef = useRef(targetFps)
  useEffect(() => {
    targetFpsRef.current = targetFps
  }, [targetFps])

  useEffect(() => {
    elRef.current = containerEl
  }, [containerEl])

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerEl(node)
  }, [])

  useEffect(() => {
    const el = containerEl
    if (!el || typeof window === 'undefined') return

    let mounted = true
    let resizeObserver: ResizeObserver | null = null
    let resizeRaf = 0
    let lastResizeAt = 0
    let safetyTimer: ReturnType<typeof setTimeout> | undefined

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

        safetyTimer = setTimeout(() => {
          if (mounted) setVantaReady(true)
        }, 15000)

        await loadExternalScript(P5_CDN)
        if (!mounted) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }
        // Topology uses p5, not THREE. The "[VANTA] No THREE defined on window" message is from the
        // library and is harmless. Stub window.THREE to silence it.
        if (typeof (window as unknown as { THREE?: unknown }).THREE === 'undefined') {
          (window as unknown as { THREE: object }).THREE = {}
        }
        await loadExternalScript(VANTA_TOPOLOGY_CDN)
        if (!mounted || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }

        const VANTA = (window as unknown as { VANTA: { TOPOLOGY: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void } } }).VANTA
        if (!VANTA?.TOPOLOGY) {
          if (safetyTimer) clearTimeout(safetyTimer)
          if (mounted) setVantaReady(true)
          return
        }

        const options = getTopologyOptions(themeName as ThemeName)
        const resolvedColor = colorHex ? hexToNumber(colorHex) : options.color
        const resolvedBackground = backgroundHex ? hexToNumber(backgroundHex) : options.backgroundColor
        const effect = VANTA.TOPOLOGY({
          el,
          mouseControls: true,
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
            const minDelta = 1000 / Math.max(1, targetFpsRef.current)
            if (now - lastResizeAt < minDelta) return
            lastResizeAt = now
            if (effectRef.current?.resize) effectRef.current.resize()
          })
        })
        resizeObserver.observe(el)

        requestAnimationFrame(() => {
          if (mounted) {
            if (safetyTimer) clearTimeout(safetyTimer)
            setVantaReady(true)
          }
        })
      } catch (err) {
        console.warn('[VantaTopologyBackground] Vanta TOPOLOGY failed to load', err)
        if (safetyTimer) clearTimeout(safetyTimer)
        if (mounted) setVantaReady(true)
      }
    }

    init()

    return () => {
      mounted = false
      if (safetyTimer) clearTimeout(safetyTimer)
      resizeObserver?.disconnect()
      resizeObserver = null
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = 0
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [containerEl, themeName, colorHex, backgroundHex, isActive])

  const fallbackBg = backgroundHex ?? getFallbackBgColor(themeName as ThemeName)

  return (
    <div
      ref={setContainerRef}
      data-testid="vanta-background"
      data-vanta-kind="topology"
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
        // Toujours montrer au moins le fond (évite écran « vide » si init async bloque ou ref ratée).
        opacity: 1,
        transition: vantaReady ? 'opacity 0.35s ease' : 'none',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  )
}
