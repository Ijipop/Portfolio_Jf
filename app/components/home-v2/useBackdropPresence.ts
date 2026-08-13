'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

const GLITCH_SESSION_KEY = 'ijipop-bg-glitch-seen'
const SCROLL_RANGE_PX = 750
const LERP = 0.12

export type BackdropPresence = {
  effectsEnabled: boolean
  pointerFine: boolean
  glitchActive: boolean
  /** Ref attaché à la couche spotlight (styles mutés hors React). */
  spotlightRef: RefObject<HTMLDivElement | null>
  /** Ref attaché au halo (profondeur scroll mutée hors React). */
  haloRef: RefObject<HTMLDivElement | null>
}

export type HaloScrollConfig = {
  centered: boolean
  baseOpacity: number
  /** Délai avant le flash glitch de session (ms). Défaut 180. */
  glitchDelayMs?: number
}

function readMedia(query: string): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

/**
 * Spotlight curseur + micro-glitch session + profondeur scroll.
 * Tout off si prefers-reduced-motion.
 */
export function useBackdropPresence(haloConfig: HaloScrollConfig): BackdropPresence {
  const [effectsEnabled, setEffectsEnabled] = useState(false)
  const [pointerFine, setPointerFine] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const haloRef = useRef<HTMLDivElement | null>(null)
  const haloConfigRef = useRef(haloConfig)
  haloConfigRef.current = haloConfig

  const targetRef = useRef({ x: 0.5, y: 0.35, opacity: 0 })
  const currentRef = useRef({ x: 0.5, y: 0.35, opacity: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduced = readMedia('(prefers-reduced-motion: reduce)')
    const fine = readMedia('(pointer: fine)')
    setEffectsEnabled(!reduced)
    setPointerFine(fine && !reduced)

    const onMotionChange = (e: MediaQueryListEvent) => {
      setEffectsEnabled(!e.matches)
      setPointerFine(readMedia('(pointer: fine)') && !e.matches)
    }
    const onPointerChange = (e: MediaQueryListEvent) => {
      setPointerFine(e.matches && !readMedia('(prefers-reduced-motion: reduce)'))
    }

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqPointer = window.matchMedia('(pointer: fine)')
    mqMotion.addEventListener('change', onMotionChange)
    mqPointer.addEventListener('change', onPointerChange)
    return () => {
      mqMotion.removeEventListener('change', onMotionChange)
      mqPointer.removeEventListener('change', onPointerChange)
    }
  }, [])

  // Scroll depth — mutate halo DOM only (no React re-render)
  useEffect(() => {
    const applyHalo = (scrollT: number) => {
      const node = haloRef.current
      if (!node) return
      const { centered, baseOpacity } = haloConfigRef.current
      const opacity = baseOpacity * (1 - scrollT * 0.12)
      const scale = 1 + scrollT * 0.06
      const extraY = scrollT * (centered ? 28 : 42)
      node.style.opacity = String(opacity)
      node.style.transform = centered
        ? `translate(-50%, calc(-50% + ${extraY}px)) scale(${scale})`
        : `translate(-50%, ${extraY}px) scale(${scale})`
    }

    if (!effectsEnabled) {
      applyHalo(0)
      return
    }

    let scheduled = false
    const update = () => {
      if (scheduled) return
      scheduled = true
      window.requestAnimationFrame(() => {
        scheduled = false
        const y = window.scrollY || 0
        const t = Math.min(1, Math.max(0, y / SCROLL_RANGE_PX))
        applyHalo(t)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [effectsEnabled])

  useEffect(() => {
    if (!effectsEnabled) return

    try {
      if (sessionStorage.getItem(GLITCH_SESSION_KEY) === '1') return
    } catch {
      // private mode — play once this mount
    }

    const delay = Math.max(0, haloConfigRef.current.glitchDelayMs ?? 180)
    let cancelled = false
    const start = window.setTimeout(() => {
      if (cancelled) return
      setGlitchActive(true)
      try {
        sessionStorage.setItem(GLITCH_SESSION_KEY, '1')
      } catch {
        // ignore
      }
    }, delay)

    const end = window.setTimeout(() => {
      if (!cancelled) setGlitchActive(false)
    }, delay + 300)

    return () => {
      cancelled = true
      window.clearTimeout(start)
      window.clearTimeout(end)
    }
  }, [effectsEnabled])

  useEffect(() => {
    const el = spotlightRef.current
    if (!effectsEnabled || !pointerFine) {
      if (el) el.style.opacity = '0'
      return
    }

    let idleTimer: number | null = null

    const tick = () => {
      const c = currentRef.current
      const t = targetRef.current
      c.x += (t.x - c.x) * LERP
      c.y += (t.y - c.y) * LERP
      c.opacity += (t.opacity - c.opacity) * LERP
      const node = spotlightRef.current
      if (node) {
        node.style.left = `${c.x * 100}%`
        node.style.top = `${c.y * 100}%`
        node.style.opacity = String(c.opacity * 0.85)
      }
      rafRef.current = window.requestAnimationFrame(tick)
    }
    rafRef.current = window.requestAnimationFrame(tick)

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      targetRef.current.x = e.clientX / w
      targetRef.current.y = e.clientY / h
      targetRef.current.opacity = 1
      if (idleTimer != null) window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        targetRef.current.opacity = 0.35
      }, 900)
    }

    const onLeave = () => {
      targetRef.current.opacity = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
      if (idleTimer != null) window.clearTimeout(idleTimer)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
    }
  }, [effectsEnabled, pointerFine])

  return {
    effectsEnabled,
    pointerFine,
    glitchActive,
    spotlightRef,
    haloRef,
  }
}
