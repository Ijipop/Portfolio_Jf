'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'
import { useVantaPerformance } from '@/hooks/useVantaPerformance'
import { THREE_CDN, VANTA_DOTS_CDN } from '@/utils/vantaAssets'
import { loadExternalScript } from '@/utils/vantaScriptLoader'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

function getDotsOptions(themeName: ThemeName): Record<string, unknown> {
  const theme = THEMES[themeName]
  return {
    color: hexToNumber(theme.primary),
    color2: hexToNumber(theme.accent),
    backgroundColor: hexToNumber(theme.bg),
    size: 3,
    spacing: 35,
    showLines: true,
  }
}

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaDotsBackgroundProps {
  fillContainer?: boolean
  colorHex?: string
  backgroundHex?: string
}

export default function VantaDotsBackground(props?: VantaDotsBackgroundProps) {
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

        await loadExternalScript(THREE_CDN)
        if (!mounted) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }
        await loadExternalScript(VANTA_DOTS_CDN)
        if (!mounted || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }

        const VANTA = (window as unknown as { VANTA: { DOTS: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void } } }).VANTA
        if (!VANTA?.DOTS) {
          if (safetyTimer) clearTimeout(safetyTimer)
          if (mounted) setVantaReady(true)
          return
        }

        const options = getDotsOptions(themeName as ThemeName)
        const resolvedColor = colorHex ? hexToNumber(colorHex) : (options.color as number)
        const resolvedColor2 = colorHex ? hexToNumber(colorHex) : (options.color2 as number)
        const resolvedBackground = backgroundHex ? hexToNumber(backgroundHex) : (options.backgroundColor as number)

        const effect = VANTA.DOTS({
          el,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: resolvedColor,
          color2: resolvedColor2,
          backgroundColor: resolvedBackground,
          size: options.size,
          spacing: options.spacing,
          showLines: options.showLines,
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
        console.warn('[VantaDotsBackground] Vanta DOTS failed to load', err)
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
      data-vanta-kind="dots"
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
        opacity: 1,
        transition: vantaReady ? 'opacity 0.35s ease' : 'none',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  )
}
