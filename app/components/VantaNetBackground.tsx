'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'
import { useVantaPerformance } from '@/hooks/useVantaPerformance'
import { deferUntilIdle } from '@/utils/deferUntilIdle'
import { THREE_CDN, VANTA_NET_CDN } from '@/utils/vantaAssets'
import { getVantaNetOptions } from '@/utils/vantaNetOptions'
import { loadExternalScript } from '@/utils/vantaScriptLoader'

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaNetBackgroundProps {
  fillContainer?: boolean
  colorHex?: string
  backgroundHex?: string
}

type VantaNetInstance = { destroy: () => void; resize?: () => void }

export default function VantaNetBackground(props?: VantaNetBackgroundProps) {
  const { fillContainer = false, colorHex, backgroundHex } = props ?? {}
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const elRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<VantaNetInstance | null>(null)
  const [vantaReady, setVantaReady] = useState(false)
  const [initReady, setInitReady] = useState(false)
  const { themeName } = useAdvancedTheme()
  const { isActive, quality, targetFps } = useVantaPerformance(elRef)
  const targetFpsRef = useRef(targetFps)
  const qualityRef = useRef(quality)

  useEffect(() => {
    targetFpsRef.current = targetFps
  }, [targetFps])

  useEffect(() => {
    qualityRef.current = quality
  }, [quality])

  useEffect(() => {
    elRef.current = containerEl
  }, [containerEl])

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerEl(node)
  }, [])

  useEffect(() => {
    if (!containerEl || !isActive) {
      setInitReady(false)
      return
    }

    return deferUntilIdle(() => setInitReady(true), 1400)
  }, [containerEl, isActive])

  useEffect(() => {
    const el = containerEl
    if (!el || typeof window === 'undefined' || !initReady) return

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
        const prefersReducedMotion =
          typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          setVantaReady(true)
          return
        }

        if (effectRef.current) {
          effectRef.current.destroy()
          effectRef.current = null
        }

        safetyTimer = setTimeout(() => {
          if (mounted) setVantaReady(true)
        }, 15000)

        await loadExternalScript(THREE_CDN)
        if (!mounted) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }
        await loadExternalScript(VANTA_NET_CDN)
        if (!mounted || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }

        const VANTA = (
          window as unknown as { VANTA: { NET: (opts: Record<string, unknown>) => VantaNetInstance } }
        ).VANTA
        if (!VANTA?.NET) {
          if (safetyTimer) clearTimeout(safetyTimer)
          if (mounted) setVantaReady(true)
          return
        }

        const options = getVantaNetOptions(themeName as ThemeName, qualityRef.current, {
          colorHex,
          backgroundHex,
        })

        const effect = VANTA.NET({
          el,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          ...options,
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
            effectRef.current?.resize?.()
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
        console.warn('[VantaNetBackground] Vanta NET failed to load', err)
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
  }, [containerEl, themeName, colorHex, backgroundHex, isActive, initReady, quality])

  const fallbackBg = backgroundHex ?? getFallbackBgColor(themeName as ThemeName)

  return (
    <div
      ref={setContainerRef}
      data-testid="vanta-background"
      data-vanta-kind="net"
      data-vanta-quality={quality}
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
        contain: 'strict',
      }}
      aria-hidden
    />
  )
}
