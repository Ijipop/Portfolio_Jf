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
    expect(shouldShowTopology('/portfolio')).toBe(false)
    expect(shouldShowTopology('/logiciel')).toBe(true)
  })

  it('disables topology on all funnel /portfolio/* routes', () => {
    expect(shouldShowTopology('/portfolio/projets')).toBe(false)
    expect(shouldShowTopology('/portfolio/contact')).toBe(false)
    expect(shouldShowTopology('/portfolio/a-propos')).toBe(false)
    expect(shouldShowTopology('/portfolio/pageweb')).toBe(false)
    expect(shouldShowTopology('/logiciel/timelendr')).toBe(true)
    expect(shouldShowTopology('/logiciel/timelendr/merci')).toBe(true)
  })

  it('disables topology on /portfolio sales home and /demos hub', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'global')
    expect(shouldShowTopology('/portfolio')).toBe(false)
    expect(shouldShowTopology('/demos')).toBe(false)
    expect(shouldShowTopology('/demos/restaurant')).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/portfolio')).toBe(false)
    expect(shouldShowTopology('/demos')).toBe(false)
  })

  it('returns false for non-target routes', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/admin')).toBe(false)
    expect(shouldShowTopology('/promo/business-card')).toBe(false)
    expect(shouldShowTopology(null)).toBe(false)
  })

  it('disables topology on gateway landing (dedicated HomeV2Backdrop)', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'global')
    expect(shouldShowTopology('/')).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/')).toBe(false)
  })

  it('excludes /test routes so labs can use their own WebGL canvas', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'global')
    expect(shouldShowTopology('/test/vanta-birds')).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/test/vanta-birds')).toBe(false)
  })

  it('excludes /accueil-v2 preview route for dedicated dark background', () => {
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'global')
    expect(shouldShowTopology('/accueil-v2')).toBe(false)
    vi.stubEnv('NEXT_PUBLIC_TOPOLOGY_SCOPE', 'targeted')
    expect(shouldShowTopology('/accueil-v2')).toBe(false)
  })
})
