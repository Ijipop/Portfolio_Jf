'use client'

import { useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
const VANTA_CELLS_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.cells.min.js'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

function getVantaCellsOptions(themeName: ThemeName): Record<string, unknown> {
  const theme = THEMES[themeName]
  return {
    color1: hexToNumber(theme.primary),
    color2: hexToNumber(theme.secondary),
    backgroundColor: hexToNumber(theme.bg),
    size: 1.5,
    speed: 1,
  }
}

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaCellsBackgroundProps {
  /** Remplir uniquement le conteneur parent (pas de minHeight 100vh). À utiliser dans InteractiveBackgroundSection. */
  fillContainer?: boolean
}

export default function VantaCellsBackground(props?: VantaCellsBackgroundProps) {
  const { fillContainer = false } = props ?? {}
  const elRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<{ destroy: () => void } | null>(null)
  const [vantaReady, setVantaReady] = useState(false)
  const { themeName } = useAdvancedTheme()

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    let mounted = true

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = reject
        document.head.appendChild(script)
      })

    const init = async () => {
      try {
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          setVantaReady(true)
          return
        }

        await loadScript(THREE_CDN)
        if (!mounted) return
        await loadScript(VANTA_CELLS_CDN)
        if (!mounted || !elRef.current) return

        const VANTA = (window as unknown as { VANTA: { CELLS: (opts: Record<string, unknown>) => { destroy: () => void } } }).VANTA
        if (!VANTA?.CELLS) return

        const options = getVantaCellsOptions(themeName as ThemeName)
        effectRef.current = VANTA.CELLS({
          el: elRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          ...options,
        })
        requestAnimationFrame(() => {
          if (mounted) setVantaReady(true)
        })
      } catch (err) {
        console.warn('[VantaCellsBackground] Vanta CELLS failed to load', err)
        if (mounted) setVantaReady(true)
      }
    }

    init()
    return () => {
      mounted = false
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [themeName])

  const fallbackBg = getFallbackBgColor(themeName as ThemeName)

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
        transition: 'opacity 0.4s ease',
      }}
      aria-hidden
    />
  )
}
