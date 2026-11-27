'use client'

import { useEffect, useRef, type RefObject } from 'react'
import {
  animate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

export const SOFTWARE_EASE: [number, number, number, number] = [0.22, 0.72, 0.2, 1]

function readDebugProgress(param: string): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get(param)
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return Math.min(1, Math.max(0, n))
}

type MountOptions = {
  mode: 'mount'
  duration: number
  debugParam?: string
}

type InViewOptions = {
  mode: 'inView'
  duration: number
  targetRef: RefObject<Element | null>
  amount?: number
}

/**
 * Une seule MotionValue 0→1 — Hero mount ou section inView.
 * Initial toujours 0 (SSR = client) pour éviter l’hydration mismatch.
 */
export function useSoftwareProgress(
  options: MountOptions | InViewOptions,
): MotionValue<number> {
  const reduced = useReducedMotion()
  const mode = options.mode
  const duration = options.duration
  const debugParam = mode === 'mount' ? options.debugParam : undefined
  const targetRef = mode === 'inView' ? options.targetRef : null
  const amount = mode === 'inView' ? (options.amount ?? 0.22) : 0.22

  const progress = useMotionValue(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (reduced) {
      progress.set(1)
      return
    }

    if (mode === 'mount') {
      const debug = debugParam ? readDebugProgress(debugParam) : null
      if (debug != null) {
        progress.set(debug)
        return
      }
      progress.set(0)
      const controls = animate(progress, 1, { duration, ease: SOFTWARE_EASE })
      return () => controls.stop()
    }

    const node = targetRef?.current
    if (!node || startedRef.current) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      animate(progress, 1, { duration, ease: SOFTWARE_EASE })
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start()
          obs.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -6% 0px' },
    )
    obs.observe(node)

    const rect = node.getBoundingClientRect()
    const vh = window.innerHeight || 1
    if (rect.top < vh * 0.88 && rect.bottom > vh * 0.05) {
      start()
      obs.disconnect()
    }

    return () => obs.disconnect()
  }, [reduced, progress, mode, duration, debugParam, targetRef, amount])

  return progress
}
