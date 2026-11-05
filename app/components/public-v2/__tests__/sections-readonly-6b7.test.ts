import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** HEAD après commit 6B6. */
const BASE_6B7 = 'f24c05430e0e251ce8d4e699d0083697b3ee0b86'

/** Seule la fiche pilote Space Taker + garde-fous associés. */
const ALLOWED_6B7 = new Set([
  'app/(public)/spacetaker/page.tsx',
  'app/(public)/spacetaker/layout.tsx',
  'app/(public)/spacetaker/SpaceTakerLandingClient.tsx',
  'app/(public)/spacetaker/SpaceTakerLanding.module.css',
  'app/(site-pages)/spacetaker/page.tsx',
  'app/(site-pages)/spacetaker/layout.tsx',
  'app/(site-pages)/spacetaker/SpaceTakerLandingClient.tsx',
  'app/(site-pages)/spacetaker/SpaceTakerLanding.module.css',
  'app/__tests__/layout-isolation.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b6.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b7.test.ts',
  'app/(site-pages)/spacetaker/__tests__/SpaceTakerLandingClient.test.tsx',
])

describe('Approved surfaces read-only during Phase 6B7', () => {
  it('ne modifie pas les surfaces figées hors fiche pilote Space Taker', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B7} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(public)/cpu-ze app/(public)/spacetaker app/(site-pages)/spacetaker app/(public)/deskdot app/(public)/traducteur app/__tests__/layout-isolation.test.ts app/components/public-v2/__tests__/sections-readonly-6b6.test.ts app/components/public-v2/__tests__/sections-readonly-6b7.test.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !ALLOWED_6B7.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
