import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'

/** HEAD après commits techniques Partie A (UTF-8 + Hero glyph). */
const BASE_6B4 = '011aa0565f8f7a58e78219788c714094d1d119b5'

describe('Homepage + catalog + contact read-only during Phase 6B4', () => {
  it('ne modifie pas les sections d’accueil figées, le catalogue ni Contact depuis Partie A', () => {
    const allowed = new Set([
      'lib/public-v2/servicesContent.ts',
      'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
      ...APPROVED_CLIENT_MEDIA_FILES,
    ]) // 6B5/6B6 href Services + médias clients autorisés
    const out = execSync(
      `git diff --name-only ${BASE_6B4} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !allowed.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
