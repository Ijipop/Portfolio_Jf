import { describe, expect, it } from 'vitest'
import { shouldShowTopology } from '../topologyRoutes'

describe('shouldShowTopology', () => {
  it('returns true for allowed roots', () => {
    expect(shouldShowTopology('/portfolio')).toBe(true)
    expect(shouldShowTopology('/logiciel')).toBe(true)
    expect(shouldShowTopology('/pageweb')).toBe(true)
  })

  it('returns true for allowed nested routes', () => {
    expect(shouldShowTopology('/portfolio/projets')).toBe(true)
    expect(shouldShowTopology('/portfolio/contact')).toBe(true)
    expect(shouldShowTopology('/logiciel/timelendar')).toBe(true)
  })

  it('returns false for non-target routes', () => {
    expect(shouldShowTopology('/')).toBe(false)
    expect(shouldShowTopology('/admin')).toBe(false)
    expect(shouldShowTopology('/promo/business-card')).toBe(false)
    expect(shouldShowTopology(null)).toBe(false)
  })
})

