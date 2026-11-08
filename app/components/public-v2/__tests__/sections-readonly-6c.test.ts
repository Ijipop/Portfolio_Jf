import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** HEAD après commit 6B10 Timelendr. */
const BASE_6C = 'e0a4e4cd1612ae15480df8a0e927575ce0fc67c2'

const ALLOWED_6C = new Set([
  'app/(public)/demos/page.tsx',
  'app/(public)/demos/DemosIndexShell.tsx',
  'app/(public)/demos/DemosIndexAnimatedGrid.tsx',
  'app/(public)/demos/DemosAiVideoShowcase.tsx',
  'app/(public)/demos/DemosSeoCta.tsx',
  'app/(public)/demos/DemosIndex.module.css',
  'app/(site-pages)/demos/page.tsx',
  'app/(site-pages)/demos/layout.tsx',
  'app/(site-pages)/demos/DemosIndexAnimatedGrid.tsx',
  'app/(site-pages)/demos/DemosAiVideoShowcase.tsx',
  'app/(site-pages)/demos/DemosSeoCta.tsx',
  'app/(site-pages)/demos/DemosIndex.module.css',
  'app/__tests__/layout-isolation.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6c.test.ts',
  'app/(site-pages)/demos/__tests__/DemosHubPage.test.tsx',
])

describe('Approved surfaces read-only during Phase 6C', () => {
  it('ne modifie pas Laboratoire, fiches produit ni pages figées hors hub /demos', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6C} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts lib/content/demos-catalog.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(site-pages)/spacetaker app/(site-pages)/cpu-ze app/(site-pages)/traducteur app/(site-pages)/deskdot app/(site-pages)/logiciel/timelendr app/(public)/demos/construction app/(public)/demos/restaurant app/(public)/demos/tech app/(public)/demos/wellness app/(public)/demos/studio app/(public)/demos/spectacle app/(public)/demos/portfolio app/(public)/demos/galerie app/(public)/demos/volt app/(public)/demos/page.tsx app/(public)/demos/DemosIndexShell.tsx app/(public)/demos/DemosIndexAnimatedGrid.tsx app/(public)/demos/DemosAiVideoShowcase.tsx app/(public)/demos/DemosSeoCta.tsx app/(public)/demos/DemosIndex.module.css app/(site-pages)/demos app/__tests__/layout-isolation.test.ts app/components/public-v2/__tests__/sections-readonly-6c.test.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !ALLOWED_6C.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
