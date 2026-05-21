import { describe, expect, it } from 'vitest'
import {
  downgradeVantaQuality,
  resolveInitialVantaQuality,
  vantaTargetFps,
} from '../deviceHints'

describe('deviceHints', () => {
  it('starts soft on very low memory or cores', () => {
    expect(resolveInitialVantaQuality({ deviceMemory: 4, hardwareConcurrency: 8 })).toBe('soft')
    expect(resolveInitialVantaQuality({ deviceMemory: 8, hardwareConcurrency: 2 })).toBe('soft')
  })

  it('starts degraded on moderate hardware', () => {
    expect(resolveInitialVantaQuality({ deviceMemory: 8, hardwareConcurrency: 4 })).toBe('degraded')
  })

  it('starts normal on capable hardware', () => {
    expect(resolveInitialVantaQuality({ deviceMemory: 16, hardwareConcurrency: 8 })).toBe('normal')
  })

  it('downgrades quality stepwise', () => {
    expect(downgradeVantaQuality('normal')).toBe('degraded')
    expect(downgradeVantaQuality('degraded')).toBe('soft')
    expect(downgradeVantaQuality('soft')).toBe('soft')
  })

  it('maps quality to target fps', () => {
    expect(vantaTargetFps('normal')).toBe(60)
    expect(vantaTargetFps('degraded')).toBe(30)
    expect(vantaTargetFps('soft')).toBe(24)
  })
})
