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

  it('uses persisted light mode in production', () => {
    const decision = resolveInitialGraphicsDecision({
      persistedMode: 'light',
      persistedReason: 'inp-420',
      isProduction: true,
    })

    expect(decision).toEqual({
      mode: 'light',
      reason: 'inp-420',
    })
  })

  it('downgrades immediately for initial production low-motion signals', () => {
    const decision = resolveInitialGraphicsDecision({
      prefersReducedMotion: true,
      isProduction: true,
    })

    expect(decision).toEqual({
      mode: 'light',
      reason: 'prefers-reduced-motion',
    })
  })

  it('requires two metric breaches before downgrading', () => {
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
      nextCount: 1,
      shouldDowngrade: false,
      reason: null,
    })
    expect(secondBreach).toEqual({
      nextCount: 2,
      shouldDowngrade: true,
      reason: 'lcp-4500',
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
})
