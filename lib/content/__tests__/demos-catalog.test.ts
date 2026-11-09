import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  DEMOS_CATALOG,
  DEMO_THUMB_TOKENS,
  HOME_LAB_FEATURED_IDS,
  getHomeLabFeaturedDemos,
} from '../demos-catalog'

describe('demos-catalog', () => {
  it('contient exactement neuf démonstrations aux ids uniques', () => {
    expect(DEMOS_CATALOG).toHaveLength(9)
    expect(new Set(DEMOS_CATALOG.map((d) => d.id)).size).toBe(9)
    expect(DEMOS_CATALOG.map((d) => d.id)).toEqual([...DEMO_THUMB_TOKENS])
  })

  it('expose des routes /demos cohérentes', () => {
    for (const demo of DEMOS_CATALOG) {
      expect(demo.href).toBe(`/demos/${demo.id}`)
      expect(demo.thumbToken).toBe(demo.id)
      expect(demo.title.length).toBeGreaterThan(0)
      expect(demo.description.length).toBeGreaterThan(0)
    }
  })

  it('sélectionne restaurant, construction et wellness avec images publiques', () => {
    expect([...HOME_LAB_FEATURED_IDS]).toEqual(['restaurant', 'construction', 'wellness'])
    const featured = getHomeLabFeaturedDemos()
    expect(featured).toHaveLength(3)
    for (const demo of featured) {
      expect(demo.previewSrc).toBeTruthy()
      const rel = demo.previewSrc!.replace(/^\//, '')
      expect(existsSync(path.join(process.cwd(), 'public', rel))).toBe(true)
    }
  })
})
