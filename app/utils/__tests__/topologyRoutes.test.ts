import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shouldShowTopology } from '../topologyRoutes'

describe('shouldShowTopology', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns true for allowed roots', () => {
    expect(shouldShowTopology('/portfolio')).toBe(true)
    expect(shouldShowTopology('/logiciel')).toBe(true)
    expect(shouldShowTopology('/pageweb')).toBe(true)
  })

  it('returns true for allowed nested routes', () => {
    expect(shouldShowTopology('/portfolio/projets')).toBe(true)
    expect(shouldShowTopology('/portfolio/contact')).toBe(true)
    expect(shouldShowTopology('/logiciel/timelendr')).toBe(true)
  })

  it('returns false for non-target routes', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/admin')).toBe(false)
    expect(shouldShowTopology('/promo/business-card')).toBe(false)
    expect(shouldShowTopology(null)).toBe(false)
  })

  it('keeps topology enabled on landing page', () => {
    expect(shouldShowTopology('/')).toBe(true)
  })

  it('excludes /test routes so labs can use their own WebGL canvas', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'global')
    expect(shouldShowTopology('/test/vanta-birds')).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/test/vanta-birds')).toBe(false)
  })
})

