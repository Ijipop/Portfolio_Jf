import { describe, expect, it } from 'vitest'
import {
  SOFTWARE_LANDING_PATH,
  getSoftwareEditorialContent,
} from '@/lib/public-v2/softwareEditorialContent'

describe('softwareEditorialContent', () => {
  it('pointe la landing et le filtre catalogue logiciels', () => {
    expect(SOFTWARE_LANDING_PATH).toBe('/developpement-logiciels-montreal')
    const fr = getSoftwareEditorialContent('fr')
    const en = getSoftwareEditorialContent('en')
    expect(fr.hero.projectsHref).toBe('/portfolio/projets?type=logiciel')
    expect(en.hero.projectsHref).toBe('/portfolio/projets?type=logiciel')
    expect(fr.projects.href).toBe('/portfolio/projets?type=logiciel')
    expect(fr.hero.title.length).toBeGreaterThan(8)
    expect(en.hero.title.length).toBeGreaterThan(8)
  })

  it('utilise le vouvoiement en français', () => {
    const fr = getSoftwareEditorialContent('fr')
    expect(fr.hero.lead).toMatch(/Vous avez|vous /)
    expect(fr.hero.lead).not.toMatch(/\b(tu|ton|ta|tes|t['’])/i)
    expect(fr.finalCta.title).toMatch(/Vous avez/)
  })
})
