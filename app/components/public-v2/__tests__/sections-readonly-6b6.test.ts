import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** HEAD après commit 6B5. */
const BASE_6B6 = 'ff6b2a1cdd019a41af2e8cca5aefbd9cbbecf24f'

const ALLOWED_6B6 = new Set([
  'lib/public-v2/servicesContent.ts',
  'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
  'app/(public)/logiciel/page.tsx',
  'app/(public)/logiciel/layout.tsx',
])

describe('Approved surfaces read-only during Phase 6B6', () => {
  it('ne modifie pas les pages figées ni les fiches Timelendr depuis 6B5', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B6} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(public)/cpu-ze app/(public)/spacetaker app/(public)/deskdot app/(public)/traducteur`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !ALLOWED_6B6.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
