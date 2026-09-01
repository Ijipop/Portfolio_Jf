import { describe, expect, it } from 'vitest'
import { getOwnSitePathname, resolveProductLandingHref } from '../navigateProjectUrl'

describe('getOwnSitePathname', () => {
  it('returns relative site paths', () => {
    expect(getOwnSitePathname('/spacetaker')).toBe('/spacetaker')
    expect(getOwnSitePathname('/cpu-ze?type=logiciel')).toBe('/cpu-ze')
  })

  it('returns own-site absolute paths', () => {
    expect(getOwnSitePathname('https://ijipop.com/deskdot')).toBe('/deskdot')
    expect(getOwnSitePathname('https://www.ijipop.com/space-taker')).toBe('/space-taker')
  })

  it('ignores GitHub URLs even when they contain product names', () => {
    expect(
      getOwnSitePathname(
        'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe',
      ),
    ).toBeNull()
    expect(getOwnSitePathname('https://github.com/Ijipop/CPU-ZE/releases/download/v0.8.4/CPU-ZE_0.8.4_x64-setup.exe')).toBeNull()
    expect(getOwnSitePathname('https://github.com/Ijipop/Deskdot-releases/releases/latest')).toBeNull()
  })
})

describe('resolveProductLandingHref', () => {
  it('maps internal product paths to landings', () => {
    expect(resolveProductLandingHref('/spacetaker')).toBe('/spacetaker')
    expect(resolveProductLandingHref('/space-taker')).toBe('/spacetaker')
    expect(resolveProductLandingHref('/cpu-ze')).toBe('/cpu-ze')
    expect(resolveProductLandingHref('/deskdot')).toBe('/deskdot')
    expect(resolveProductLandingHref('/logiciel/timelendr')).toBe('/logiciel/timelendr')
  })

  it('does not intercept GitHub download URLs', () => {
    expect(
      resolveProductLandingHref(
        'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe',
      ),
    ).toBeNull()
    expect(resolveProductLandingHref('https://github.com/Ijipop/CPU-ZE')).toBeNull()
    expect(resolveProductLandingHref('https://github.com/Ijipop/Deskdot-releases')).toBeNull()
  })
})
