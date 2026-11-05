import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** HEAD après commit 6B7. */
const BASE_6B8 = 'f6b38d349599faf6445bd504c2eea8eb326c713c'

const ALLOWED_6B8 = new Set([
  'app/(public)/cpu-ze/page.tsx',
  'app/(public)/cpu-ze/layout.tsx',
  'app/(public)/cpu-ze/CpuZeLandingClient.tsx',
  'app/(public)/cpu-ze/CpuZeLanding.module.css',
  'app/(site-pages)/cpu-ze/page.tsx',
  'app/(site-pages)/cpu-ze/layout.tsx',
  'app/(site-pages)/cpu-ze/CpuZeLandingClient.tsx',
  'app/(site-pages)/cpu-ze/CpuZeLanding.module.css',
  'app/(site-pages)/cpu-ze/__tests__/CpuZeLandingClient.test.tsx',
  'app/(public)/traducteur/page.tsx',
  'app/(public)/traducteur/layout.tsx',
  'app/(public)/traducteur/TraducteurLandingClient.tsx',
  'app/(public)/traducteur/TraducteurLanding.module.css',
  'app/(site-pages)/traducteur/page.tsx',
  'app/(site-pages)/traducteur/layout.tsx',
  'app/(site-pages)/traducteur/TraducteurLandingClient.tsx',
  'app/(site-pages)/traducteur/TraducteurLanding.module.css',
  'app/(site-pages)/traducteur/__tests__/TraducteurLandingClient.test.tsx',
  'app/__tests__/layout-isolation.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b6.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b7.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b8.test.ts',
])

describe('Approved surfaces read-only during Phase 6B8', () => {
  it('ne modifie pas les surfaces figées hors CPU-ZE et Traducteur', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B8} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(public)/cpu-ze app/(site-pages)/cpu-ze app/(site-pages)/spacetaker app/(public)/deskdot app/(public)/traducteur app/(site-pages)/traducteur app/__tests__/layout-isolation.test.ts app/components/public-v2/__tests__/sections-readonly-6b6.test.ts app/components/public-v2/__tests__/sections-readonly-6b7.test.ts app/components/public-v2/__tests__/sections-readonly-6b8.test.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !ALLOWED_6B8.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
