'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

type Options = {
  /** Seuil d’intersection (0 = dès qu’une partie sort de l’écran). */
  threshold?: number
  /** Désactiver l’observation (ex. reduced motion géré ailleurs). */
  enabled?: boolean
}

/**
 * Met `paused` à true quand l’élément n’est pas visible — pour couper animations CSS / Framer hors écran.
 */
export function usePauseWhenOffscreen<T extends HTMLElement>(
  options: Options = {},
): { ref: RefObject<T | null>; paused: boolean } {
  const { threshold = 0, enabled = true } = options
  const ref = useRef<T | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setPaused(false)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, threshold])

  return { ref, paused }
}
