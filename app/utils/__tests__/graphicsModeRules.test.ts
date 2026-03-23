import { describe, expect, it } from 'vitest'
import {
  evaluateGraphicsMetricBreach,
  resolveGraphicsModeOverride,
  resolveInitialGraphicsDecision,
  shouldDowngradeFromSlowFrames,
} from '../graphicsModeRules'

describe('graphicsModeRules', () => {
  it('parses supported graphics mode overrides', () => {
    expect(resolveGraphicsModeOverride('light')).toBe('light')
    expect(resolveGraphicsModeOverride('FULL')).toBe('full')
    expect(resolveGraphicsModeOverride('unknown')).toBe(null)
    expect(resolveGraphicsModeOverride(null)).toBe(null)
  })

  it('forces full mode by default in development', () => {
    const decision = resolveInitialGraphicsDecision({
      prefersReducedMotion: true,
      saveData: true,
      deviceMemory: 1,
      hardwareConcurrency: 1,
      isProduction: false,
    })

    expect(decision).toEqual({
      mode: 'full',
      reason: null,
    })
  })

  it('uses explicit forced overrides', () => {
    const decision = resolveInitialGraphicsDecision({
      forcedMode: 'light',
      isProduction: true,
    })

    expect(decision).toEqual({
      mode: 'light',
      reason: 'forced-light-mode',
    })
  })

  it('keeps full mode in production even with low-motion signals', () => {
    const decision = resolveInitialGraphicsDecision({
      prefersReducedMotion: true,
      saveData: true,
      deviceMemory: 1,
      hardwareConcurrency: 1,
      isProduction: true,
    })

    expect(decision).toEqual({
      mode: 'full',
      reason: null,
    })
  })

  it('ignores metric breaches for automatic downgrading', () => {
    const firstBreach = evaluateGraphicsMetricBreach(
      { name: 'LCP', value: 4500 },
      0,
      true
    )
    const secondBreach = evaluateGraphicsMetricBreach(
      { name: 'LCP', value: 4500 },
      firstBreach.nextCount,
      true
    )

    expect(firstBreach).toEqual({
      nextCount: 0,
      shouldDowngrade: false,
      reason: null,
    })
    expect(secondBreach).toEqual({
      nextCount: 0,
      shouldDowngrade: false,
      reason: null,
    })
  })

  it('does not downgrade from metrics or slow frames in development', () => {
    expect(
      evaluateGraphicsMetricBreach({ name: 'INP', value: 500 }, 1, false)
    ).toEqual({
      nextCount: 0,
      shouldDowngrade: false,
      reason: null,
    })
    expect(shouldDowngradeFromSlowFrames(0.9, false)).toBe(false)
  })

  it('does not downgrade from slow frames in production either', () => {
    expect(shouldDowngradeFromSlowFrames(0.95, true)).toBe(false)
  })
})
