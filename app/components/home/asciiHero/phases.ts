export type DevHeroPhase =
  | 'typingBuild'
  | 'falling'
  | 'walkShort'
  | 'clearCode'
  | 'typingSword'
  | 'swordScene'
  | 'interactiveWalk'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
