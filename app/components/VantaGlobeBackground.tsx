'use client'

import { useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
const VANTA_GLOBE_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.globe.min.js'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

function getGlobeOptions(themeName: ThemeName): Record<string, unknown> {
  const theme = THEMES[themeName]
  return {
    backgroundColor: hexToNumber(theme.bg),
    color: hexToNumber(theme.primary),
    color2: hexToNumber(theme.accent),
    size: 1,
  }
}

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaGlobeBackgroundProps {
  fillContainer?: boolean
}

export default function VantaGlobeBackground(props?: VantaGlobeBackgroundProps) {
  const { fillContainer = false } = props ?? {}
  const elRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<{ destroy: () => void; resize?: () => void } | null>(null)
  const [vantaReady, setVantaReady] = useState(false)
  const { themeName } = useAdvancedTheme()

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    let mounted = true
    let resizeObserver: ResizeObserver | null = null

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
        if (existing) {
          const alreadyLoaded = existing.getAttribute('data-loaded') === 'true'
          if (alreadyLoaded) {
            resolve()
            return
          }
          existing.addEventListener('load', () => {
            existing.setAttribute('data-loaded', 'true')
            resolve()
          }, { once: true })
          existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), { once: true })
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
          script.setAttribute('data-loaded', 'true')
          resolve()
        }
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
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
        await loadScript(VANTA_GLOBE_CDN)
        if (!mounted || !elRef.current) return

        const VANTA = (window as unknown as { VANTA: { GLOBE: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void } } }).VANTA
        if (!VANTA?.GLOBE) {
          if (mounted) setVantaReady(true)
          return
        }

        const options = getGlobeOptions(themeName as ThemeName)
        const effect = VANTA.GLOBE({
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
        effectRef.current = effect

        resizeObserver = new ResizeObserver(() => {
          if (effectRef.current?.resize) effectRef.current.resize()
        })
        resizeObserver.observe(el)

        requestAnimationFrame(() => {
          if (mounted) setVantaReady(true)
        })
      } catch (err) {
        console.warn('[VantaGlobeBackground] Vanta GLOBE failed to load', err)
        if (mounted) setVantaReady(true)
      }
    }

    init()

    return () => {
      mounted = false
      resizeObserver?.disconnect()
      resizeObserver = null
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
        transition: 'opacity 0s',
      }}
      aria-hidden
    />
  )
}
