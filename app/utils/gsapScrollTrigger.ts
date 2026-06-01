import type gsapType from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

type GsapBundle = {
  gsap: typeof gsapType
  ScrollTrigger: typeof ScrollTriggerPlugin
}

let cached: Promise<GsapBundle> | null = null

/** Charge GSAP + ScrollTrigger une seule fois (chunks séparés du bundle initial). */
export function loadGsapWithScrollTrigger(): Promise<GsapBundle> {
  if (!cached) {
    cached = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapMod, stMod]) => {
        const gsap = gsapMod.default
        const ScrollTrigger = stMod.ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        return { gsap, ScrollTrigger }
      },
    )
  }
  return cached
}
