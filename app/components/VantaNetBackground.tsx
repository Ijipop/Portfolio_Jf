'use client'

import { useEffect, useRef, useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '../design-system/themes'

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
const VANTA_NET_CDN = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js'

function hexToNumber(hex: string): number {
  return parseInt(hex.slice(1), 16)
}

function getNetOptions(themeName: ThemeName): Record<string, unknown> {
  const theme = THEMES[themeName]
  return {
    color: hexToNumber(theme.primary),
    backgroundColor: hexToNumber(theme.bg),
  }
}

function getFallbackBgColor(themeName: ThemeName): string {
  return THEMES[themeName]?.bg ?? '#f8fafc'
}

interface VantaNetBackgroundProps {
  fillContainer?: boolean
  colorHex?: string
  backgroundHex?: string
}

export default function VantaNetBackground(props?: VantaNetBackgroundProps) {
  const { fillContainer = false, colorHex, backgroundHex } = props ?? {}
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
        await loadScript(VANTA_NET_CDN)
        if (!mounted || !elRef.current) return

        const VANTA = (window as unknown as { VANTA: { NET: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void } } }).VANTA
        if (!VANTA?.NET) {
          if (mounted) setVantaReady(true)
          return
        }

        const options = getNetOptions(themeName as ThemeName)
        const resolvedColor = colorHex ? hexToNumber(colorHex) : (options.color as number)
        const resolvedBackground = backgroundHex ? hexToNumber(backgroundHex) : (options.backgroundColor as number)

        const effect = VANTA.NET({
          el: elRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          points: 10,
          maxDistance: 20,
          spacing: 15,
          showDots: true,
          color: resolvedColor,
          backgroundColor: resolvedBackground,
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
        console.warn('[VantaNetBackground] Vanta NET failed to load', err)
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
