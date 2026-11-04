import { describe, expect, it } from 'vitest'
import {
  PUBLIC_V2_CTA,
  PUBLIC_V2_MAIN_ID,
  PUBLIC_V2_NAV_ITEMS,
  PUBLIC_V2_SERVICES_HASH,
  PUBLIC_V2_SERVICES_HREF,
  getPublicV2Cta,
  getPublicV2NavItems,
  resolvePublicV2Href,
} from '../nav'

describe('public-v2 nav config', () => {
  it('expose les quatre destinations et le CTA Me contacter', () => {
    expect(PUBLIC_V2_NAV_ITEMS.map((i) => i.id)).toEqual([
      'services',
      'realisations',
      'about',
      'contact',
    ])
    expect(PUBLIC_V2_CTA.label).toBe('Me contacter')
    expect(PUBLIC_V2_NAV_ITEMS.find((i) => i.id === 'services')?.href).toBe(
      PUBLIC_V2_SERVICES_HREF,
    )
  })

  it('pointe Services vers l’ancre pv2-services réelle', () => {
    expect(PUBLIC_V2_SERVICES_HREF).toBe('/#pv2-services')
    expect(PUBLIC_V2_SERVICES_HASH).toBe('#pv2-services')
  })

  it('réécrit Services et home sur la sandbox preview', () => {
    expect(resolvePublicV2Href('/#pv2-services', '/v2-design-preview')).toBe('#pv2-services')
    expect(resolvePublicV2Href('/#services', '/v2-design-preview')).toBe('#pv2-services')
    expect(resolvePublicV2Href('/', '/v2-design-preview')).toBe(`#${PUBLIC_V2_MAIN_ID}`)
  })

  it('conserve les hrefs canoniques hors preview', () => {
    expect(resolvePublicV2Href('/#pv2-services', '/')).toBe('/#pv2-services')
    expect(resolvePublicV2Href('/portfolio/projets', '/v2-design-preview')).toBe(
      '/portfolio/projets',
    )
  })

  it('aligne Header et Footer sur la même résolution', () => {
    const items = getPublicV2NavItems('/v2-design-preview')
    const cta = getPublicV2Cta('/v2-design-preview')
    expect(items.find((i) => i.id === 'services')?.href).toBe('#pv2-services')
    expect(cta.href).toBe('/portfolio/contact')
    expect(items.map((i) => i.href)).toEqual(
      getPublicV2NavItems('/v2-design-preview').map((i) => i.href),
    )
  })
})
