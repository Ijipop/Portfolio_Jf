'use client'

/**
 * LAB Vanta BIRDS — démo isolée. Le fond Créa global utilise `CreaMeshMotionBackground` (mesh CSS).
 * Route : désactiver NEXT_PUBLIC_VANTA_BIRDS_TEST (≠ '1').
 */

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { THEMES, type ThemeName } from '@/design-system/themes'
import { THREE_CDN, VANTA_BIRDS_CDN } from '@/utils/vantaAssets'
import { loadExternalScript } from '@/utils/vantaScriptLoader'

function hexToNumber(hex: string): number {
  const h = hex.startsWith('#') ? hex.slice(1) : hex
  return parseInt(h, 16)
}

function getBirdPalette(themeName: ThemeName) {
  const t = THEMES[themeName]
  return {
    backgroundColor: hexToNumber(t.bg),
    color1: hexToNumber(t.primary),
    color2: hexToNumber(t.accent),
    backgroundAlpha: 1,
    colorMode: 'varianceGradient' as const,
    quantity: 1,
    birdSize: 2,
    wingSpan: 32,
    speedLimit: 5,
    separation: 20,
    alignment: 20,
    cohesion: 20,
  }
}

type VantaBirdsInstance = { destroy: () => void; resize?: () => void }

function canUseBirdsWebGL(): boolean {
  if (typeof document === 'undefined') return false
  const c = document.createElement('canvas')
  const gl =
    c.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
    c.getContext('webgl', { failIfMajorPerformanceCaveat: false })
  if (!gl) return false
  const ext = (gl as WebGLRenderingContext).getExtension?.('OES_texture_float')
  const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext
  return isWebGL2 || !!ext
}

export default function VantaBirdsLab() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const effectRef = useRef<VantaBirdsInstance | null>(null)
  const [ready, setReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const { themeName } = useAdvancedTheme()
  const paletteKey = `${themeName}-${THEMES[themeName].primary}-${THEMES[themeName].accent}-${THEMES[themeName].bg}`

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerEl(node)
  }, [])

  useLayoutEffect(() => {
    const el = containerEl
    if (!el || typeof window === 'undefined') return

    let active = true
    let resizeObserver: ResizeObserver | null = null
    let resizeRaf = 0
    let lastResizeAt = 0
    let safetyTimer: ReturnType<typeof setTimeout> | undefined
    let canvasCheckTimer: ReturnType<typeof setTimeout> | undefined

    setStatusMessage(null)

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setReady(true)
      setStatusMessage('Animation réduite (accessibilité) : effet désactivé.')
      return
    }

    if (!canUseBirdsWebGL()) {
      setReady(true)
      setStatusMessage(
        'WebGL ou textures float indisponibles — BIRDS ne peut pas s’afficher dans ce navigateur.'
      )
      return
    }

    const init = async () => {
      try {
        safetyTimer = setTimeout(() => {
          if (active) setReady(true)
        }, 15000)

        await loadExternalScript(THREE_CDN)
        if (!active || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }
        await loadExternalScript(VANTA_BIRDS_CDN)
        if (!active || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }

        const VANTA = (
          window as unknown as {
            VANTA?: { BIRDS?: (opts: Record<string, unknown>) => VantaBirdsInstance }
          }
        ).VANTA
        if (!VANTA?.BIRDS) {
          if (safetyTimer) clearTimeout(safetyTimer)
          if (active) {
            setReady(true)
            setStatusMessage('Script Vanta BIRDS introuvable (vérifiez le réseau / bloqueur de pub).')
          }
          return
        }

        if (effectRef.current) {
          effectRef.current.destroy()
          effectRef.current = null
        }

        await new Promise<void>((r) => {
          requestAnimationFrame(() => requestAnimationFrame(() => r()))
        })
        if (!active || !el) {
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }

        const p = getBirdPalette(themeName as ThemeName)
        const w = Math.max(200, el.offsetWidth)
        const h = Math.max(200, el.offsetHeight)

        const effect = VANTA.BIRDS({
          el,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: h,
          minWidth: w,
          scale: 1,
          scaleMobile: 1,
          ...p,
        })
        if (!active) {
          effect.destroy()
          if (safetyTimer) clearTimeout(safetyTimer)
          return
        }
        effectRef.current = effect
        effect.resize?.()

        resizeObserver = new ResizeObserver(() => {
          if (resizeRaf) return
          resizeRaf = requestAnimationFrame(() => {
            resizeRaf = 0
            const now = performance.now()
            if (now - lastResizeAt < 100) return
            lastResizeAt = now
            effectRef.current?.resize?.()
          })
        })
        resizeObserver.observe(el)

        canvasCheckTimer = setTimeout(() => {
          if (!active) return
          const canvas = el.querySelector('canvas')
          if (!canvas || canvas.clientWidth < 2 || canvas.clientHeight < 2) {
            setStatusMessage(
              'Canvas absent ou trop petit — ouvrez la console (F12) pour une erreur [vanta.js] birds.'
            )
          }
        }, 1200)

        requestAnimationFrame(() => {
          if (active) {
            if (safetyTimer) clearTimeout(safetyTimer)
            setReady(true)
          }
        })
      } catch (e) {
        console.warn('[VantaBirdsLab] init failed', e)
        if (safetyTimer) clearTimeout(safetyTimer)
        if (active) {
          setReady(true)
          setStatusMessage(
            `Échec d’initialisation : ${e instanceof Error ? e.message : String(e)}`
          )
        }
      }
    }

    void init()

    return () => {
      active = false
      if (safetyTimer) clearTimeout(safetyTimer)
      if (canvasCheckTimer) clearTimeout(canvasCheckTimer)
      resizeObserver?.disconnect()
      resizeObserver = null
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = 0
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [containerEl, paletteKey, themeName])

  const fallbackBg = THEMES[themeName as ThemeName]?.bg ?? '#f7f3eb'

  return (
    <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
      <Box
        ref={setContainerRef}
        data-testid="vanta-birds-lab"
        data-vanta-kind="birds"
        sx={{
          position: 'relative',
          zIndex: 1,
          isolation: 'isolate',
          width: '100%',
          minHeight: { xs: 360, sm: 420 },
          height: { xs: 360, sm: 420 },
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: fallbackBg,
          opacity: ready ? 1 : 0.92,
          transition: 'opacity 0.35s ease',
          touchAction: 'none',
        }}
        aria-label="Démo Vanta BIRDS — déplacez la souris ou le doigt"
      />
      {statusMessage ? (
        <Box
          component="p"
          sx={{
            mt: 1.5,
            mb: 0,
            typography: 'body2',
            color: 'error.main',
          }}
        >
          {statusMessage}
        </Box>
      ) : null}
    </Box>
  )
}
