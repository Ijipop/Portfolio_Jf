import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** HEAD après commit 6B8. */
const BASE_6B9 = 'a480ada74cea72f71d030fb82bc56ab648f1289b'

const ALLOWED_6B9 = new Set([
  'app/(public)/deskdot/page.tsx',
  'app/(public)/deskdot/layout.tsx',
  'app/(public)/deskdot/DeskDotLandingClient.tsx',
  'app/(public)/deskdot/DeskDotLanding.module.css',
  'app/(public)/deskdot/DeskDotPhotoStack.tsx',
  'app/(public)/deskdot/DeskDotPitchTitle.tsx',
  'app/(site-pages)/deskdot/page.tsx',
  'app/(site-pages)/deskdot/layout.tsx',
  'app/(site-pages)/deskdot/DeskDotLandingClient.tsx',
  'app/(site-pages)/deskdot/DeskDotLanding.module.css',
  'app/(site-pages)/deskdot/DeskDotPhotoStack.tsx',
  'app/(site-pages)/deskdot/DeskDotPitchTitle.tsx',
  'app/(site-pages)/deskdot/__tests__/DeskDotLandingClient.test.tsx',
  'app/__tests__/layout-isolation.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b6.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b7.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b8.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b9.test.ts',
])

describe('Approved surfaces read-only during Phase 6B9', () => {
  it('ne modifie pas les surfaces figées hors fiche DeskDot', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B9} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(site-pages)/spacetaker app/(site-pages)/cpu-ze app/(site-pages)/traducteur app/(public)/deskdot app/(site-pages)/deskdot app/__tests__/layout-isolation.test.ts app/components/public-v2/__tests__/sections-readonly-6b6.test.ts app/components/public-v2/__tests__/sections-readonly-6b7.test.ts app/components/public-v2/__tests__/sections-readonly-6b8.test.ts app/components/public-v2/__tests__/sections-readonly-6b9.test.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !ALLOWED_6B9.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
