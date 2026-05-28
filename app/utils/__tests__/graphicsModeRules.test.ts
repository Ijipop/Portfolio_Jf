import { describe, expect, it } from 'vitest'
import {
  evaluateGraphicsMetricBreach,
  resolveGraphicsModeOverride,
  resolveInitialGraphicsDecision,
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

  it('starts light in production when motion or save-data signals are present', () => {
    expect(
      resolveInitialGraphicsDecision({
        prefersReducedMotion: true,
        isProduction: true,
      })
    ).toEqual({ mode: 'light', reason: 'prefers-reduced-motion' })

    expect(
      resolveInitialGraphicsDecision({
        saveData: true,
        isProduction: true,
      })
    ).toEqual({ mode: 'light', reason: 'save-data' })
  })

  it('starts light in production on low device memory or few CPU cores', () => {
    expect(
      resolveInitialGraphicsDecision({
        deviceMemory: 4,
        isProduction: true,
      })
    ).toEqual({ mode: 'light', reason: 'device-memory-low' })

    expect(
      resolveInitialGraphicsDecision({
        hardwareConcurrency: 2,
        isProduction: true,
      })
    ).toEqual({ mode: 'light', reason: 'hardware-concurrency-low' })
  })

  it('respects persisted light session in production', () => {
    const decision = resolveInitialGraphicsDecision({
      persistedMode: 'light',
      persistedReason: 'slow-frames-60',
      isProduction: true,
    })

    expect(decision).toEqual({
      mode: 'light',
      reason: 'slow-frames-60',
    })
  })

  it('accumulates poor web vitals in production then suggests downgrade', () => {
    const first = evaluateGraphicsMetricBreach({ name: 'LCP', value: 5000, rating: 'poor' }, 0, true)
    expect(first).toEqual({ nextCount: 1, shouldDowngrade: false, reason: null })

    const fifth = evaluateGraphicsMetricBreach({ name: 'LCP', value: 5000, rating: 'poor' }, 4, true)
    expect(fifth).toEqual({ nextCount: 5, shouldDowngrade: false, reason: null })

    const sixth = evaluateGraphicsMetricBreach({ name: 'LCP', value: 5000, rating: 'poor' }, 5, true)
    expect(sixth.shouldDowngrade).toBe(true)
    expect(sixth.nextCount).toBe(0)
    expect(sixth.reason).toBe('web-vitals-lcp-poor')
  })

  it('does not downgrade from metrics outside production', () => {
    expect(
      evaluateGraphicsMetricBreach({ name: 'INP', value: 900, rating: 'poor' }, 0, false)
    ).toEqual({
      nextCount: 0,
      shouldDowngrade: false,
      reason: null,
    })
  })
})
