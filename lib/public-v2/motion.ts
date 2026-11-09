/**
 * Public V2 motion overrides — maps a few knobs to CSS custom properties.
 * Durations live in CSS (`tokens.css`); this file does not duplicate the full scale as constants for components.
 */

import type { CSSProperties } from 'react'

export type PublicV2MotionOverrides = {
  /** Multiplier for CSS duration tokens (1 = default). */
  speedScale?: number
  /** Multiplier for lift / reveal distances (1 = default). */
  intensity?: number
}

function scaleDuration(baseMs: number, speedScale: number): string {
  const ms = Math.max(1, Math.round(baseMs * speedScale))
  return `${ms}ms`
}

/**
 * Returns inline CSS variables to merge onto `PublicThemeRoot` style.
 * Omit or pass `{}` to keep token defaults.
 */
export function publicV2MotionStyle(
  overrides: PublicV2MotionOverrides = {},
): CSSProperties {
  const speed = overrides.speedScale ?? 1
  const intensity = overrides.intensity ?? 1

  if (speed === 1 && intensity === 1) {
    return {}
  }

  const style: Record<string, string> = {}

  if (speed !== 1) {
    style['--dur-fast'] = scaleDuration(180, speed)
    style['--dur-med'] = scaleDuration(420, speed)
    style['--dur-slow'] = scaleDuration(780, speed)
    style['--dur-reveal'] = scaleDuration(900, speed)
    style['--stagger'] = scaleDuration(70, speed)
  }

  if (intensity !== 1) {
    style['--motion-lift'] = `${Math.round(8 * intensity)}px`
    style['--motion-reveal-y'] = `${(1 * intensity).toFixed(2)}rem`
  }

  return style as CSSProperties
}
