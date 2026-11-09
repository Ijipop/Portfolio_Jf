import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/** Commit Phase 6B2 — catalogue figé pour la Phase 6B3. */
const BASE_6B2 = '0236eab804c4b37976ee1083878dda8c2521ba30'

describe('Homepage + catalog read-only during Phase 6B3', () => {
  it('ne modifie pas les sections d’accueil figées ni le catalogue depuis 6B2', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B2} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    /** Exception glyph Hero + retarget href Services (6B5/6B6) + médias clients autorisés. */
    const allowed = new Set([
      'app/components/public-v2/sections/Hero/Hero.module.css',
      'lib/public-v2/servicesContent.ts',
      'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
      ...APPROVED_CLIENT_MEDIA_FILES,
      ...PHASE8_PREMIUM_FILES,
    ])
    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })
})
