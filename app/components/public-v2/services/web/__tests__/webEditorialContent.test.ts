import { describe, expect, it } from 'vitest'
import {
  WEB_LANDING_PATH,
  getWebEditorialContent,
} from '@/lib/public-v2/webEditorialContent'

describe('webEditorialContent', () => {
  it('pointe la landing et le filtre catalogue web', () => {
    expect(WEB_LANDING_PATH).toBe('/creation-site-web-montreal')
    const fr = getWebEditorialContent('fr')
    const en = getWebEditorialContent('en')
    expect(fr.hero.projectsHref).toBe('/portfolio/projets?type=web')
    expect(en.hero.projectsHref).toBe('/portfolio/projets?type=web')
    expect(fr.projects.href).toBe('/portfolio/projets?type=web')
    expect(fr.hero.title.length).toBeGreaterThan(8)
    expect(en.hero.title.length).toBeGreaterThan(8)
  })
})
