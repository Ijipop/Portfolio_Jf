import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getOwnSitePathname,
  isOwnSiteHost,
  navigateProjectUrl,
  resolveProductLandingHref,
} from '../navigateProjectUrl'

describe('isOwnSiteHost', () => {
  it('recognizes exact IJIPOP hosts', () => {
    expect(isOwnSiteHost('ijipop.com')).toBe(true)
    expect(isOwnSiteHost('www.ijipop.com')).toBe(true)
    expect(isOwnSiteHost('localhost')).toBe(true)
    expect(isOwnSiteHost('IJIPOP.COM')).toBe(true)
  })

  it('recognizes anchored portfolio Preview / deployment aliases only', () => {
    expect(
      isOwnSiteHost('portfolio-8z057waqv-jean-francois-lefebvres-projects.vercel.app'),
    ).toBe(true)
    expect(
      isOwnSiteHost('portfolio-jf-git-fix-ad-76f431-jean-francois-lefebvres-projects.vercel.app'),
    ).toBe(true)
  })

  it('rejects third-party and unknown Vercel hosts', () => {
    expect(isOwnSiteHost('frigopop.vercel.app')).toBe(false)
    expect(isOwnSiteHost('thermo-trappeur.vercel.app')).toBe(false)
    expect(isOwnSiteHost('unknown-app.vercel.app')).toBe(false)
    expect(isOwnSiteHost('evil-portfolio-x-jean-francois-lefebvres-projects.vercel.app.evil.com')).toBe(
      false,
    )
    expect(isOwnSiteHost('notportfolio-abc-jean-francois-lefebvres-projects.vercel.app')).toBe(false)
  })
})

describe('getOwnSitePathname', () => {
  it('returns relative site paths', () => {
    expect(getOwnSitePathname('/spacetaker')).toBe('/spacetaker')
    expect(getOwnSitePathname('/cpu-ze?type=logiciel')).toBe('/cpu-ze')
  })

  it('returns own-site absolute paths', () => {
    expect(getOwnSitePathname('https://ijipop.com/deskdot')).toBe('/deskdot')
    expect(getOwnSitePathname('https://www.ijipop.com/space-taker')).toBe('/space-taker')
  })

  it('returns pathname for portfolio Preview aliases', () => {
    expect(
      getOwnSitePathname(
        'https://portfolio-jf-git-fix-ad-76f431-jean-francois-lefebvres-projects.vercel.app/deskdot',
      ),
    ).toBe('/deskdot')
  })

  it('treats FrigoPop / Thermo / unknown Vercel as external', () => {
    expect(getOwnSitePathname('https://frigopop.vercel.app/')).toBeNull()
    expect(getOwnSitePathname('https://thermo-trappeur.vercel.app/')).toBeNull()
    expect(getOwnSitePathname('https://some-other-app.vercel.app/page')).toBeNull()
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
    expect(resolveProductLandingHref('/traducteur')).toBe('/traducteur')
    expect(resolveProductLandingHref('/traducteur/merci')).toBe('/traducteur')
    expect(resolveProductLandingHref('/logiciel/timelendr')).toBe('/logiciel/timelendr')
    expect(resolveProductLandingHref('/logiciel/timelendar')).toBe('/logiciel/timelendr')
  })

  it('returns null for missing or unrelated URLs', () => {
    expect(resolveProductLandingHref('')).toBeNull()
    expect(resolveProductLandingHref('/portfolio/projets')).toBeNull()
    expect(resolveProductLandingHref('https://example.com/spacetaker')).toBeNull()
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

describe('navigateProjectUrl', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function mockWindow(origin = 'https://ijipop.com') {
    const open = vi.fn()
    vi.stubGlobal('window', {
      location: { origin },
      open,
    })
    return { open }
  }

  it('opens FrigoPop in a new tab with noopener,noreferrer', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl('https://frigopop.vercel.app/', { push })
    expect(push).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledWith('https://frigopop.vercel.app/', '_blank', 'noopener,noreferrer')
  })

  it('opens Thermo-Trappeur in a new tab with noopener,noreferrer', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl('https://thermo-trappeur.vercel.app/', { push })
    expect(push).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledWith(
      'https://thermo-trappeur.vercel.app/',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('navigates ijipop.com/deskdot internally', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl('https://ijipop.com/deskdot', { push })
    expect(open).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/deskdot')
  })

  it('navigates /spacetaker internally', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl('/spacetaker', { push })
    expect(open).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/spacetaker')
  })

  it('navigates portfolio Preview alias paths internally', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl(
      'https://portfolio-jf-git-fix-ad-76f431-jean-francois-lefebvres-projects.vercel.app/deskdot',
      { push },
    )
    expect(open).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/deskdot')
  })

  it('keeps GitHub releases external', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    const url =
      'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe'
    navigateProjectUrl(url, { push })
    expect(push).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer')
  })

  it('opens unknown Vercel domains externally', () => {
    const { open } = mockWindow()
    const push = vi.fn()
    navigateProjectUrl('https://random-demo.vercel.app/', { push })
    expect(push).not.toHaveBeenCalled()
    expect(open).toHaveBeenCalledWith('https://random-demo.vercel.app/', '_blank', 'noopener,noreferrer')
  })

  it('treats current-origin URLs as internal even on a Preview host', () => {
    const previewOrigin =
      'https://portfolio-ll71pzyhb-jean-francois-lefebvres-projects.vercel.app'
    const { open } = mockWindow(previewOrigin)
    const push = vi.fn()
    navigateProjectUrl(`${previewOrigin}/spacetaker`, { push })
    expect(open).not.toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/spacetaker')
  })
})
