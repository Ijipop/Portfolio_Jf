import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/** HEAD après commit 6B9. */
const BASE_6B10 = '8903f617b3b12b1bc9c12a7801df8e0c9e458c60'

const ALLOWED_6B10 = new Set([
  'app/(public)/logiciel/timelendr/page.tsx',
  'app/(public)/logiciel/timelendr/layout.tsx',
  'app/(public)/logiciel/timelendr/TimelendrCarousel.tsx',
  'app/(public)/logiciel/timelendr/TimelendrProduct.module.css',
  'app/(public)/logiciel/timelendr/merci/page.tsx',
  'app/(public)/logiciel/timelendr/merci/layout.tsx',
  'app/(site-pages)/logiciel/timelendr/page.tsx',
  'app/(site-pages)/logiciel/timelendr/layout.tsx',
  'app/(site-pages)/logiciel/timelendr/TimelendrLandingClient.tsx',
  'app/(site-pages)/logiciel/timelendr/TimelendrCarousel.tsx',
  'app/(site-pages)/logiciel/timelendr/TimelendrProduct.module.css',
  'app/(site-pages)/logiciel/timelendr/merci/page.tsx',
  'app/(site-pages)/logiciel/timelendr/merci/layout.tsx',
  'app/(site-pages)/logiciel/timelendr/merci/TimelendrMerciClient.tsx',
  'app/(site-pages)/logiciel/timelendr/__tests__/TimelendrLandingClient.test.tsx',
  'app/__tests__/layout-isolation.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b5.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b6.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b7.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b8.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b9.test.ts',
  'app/components/public-v2/__tests__/sections-readonly-6b10.test.ts',
])

describe('Approved surfaces read-only during Phase 6B10', () => {
  it('ne modifie pas les surfaces figées hors Timelendr', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B10} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(site-pages)/logiciel/timelendr app/(site-pages)/spacetaker app/(site-pages)/cpu-ze app/(site-pages)/traducteur app/(site-pages)/deskdot app/__tests__/layout-isolation.test.ts app/components/public-v2/__tests__/sections-readonly-6b5.test.ts app/components/public-v2/__tests__/sections-readonly-6b6.test.ts app/components/public-v2/__tests__/sections-readonly-6b7.test.ts app/components/public-v2/__tests__/sections-readonly-6b8.test.ts app/components/public-v2/__tests__/sections-readonly-6b9.test.ts app/components/public-v2/__tests__/sections-readonly-6b10.test.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => {
        const name = f.replace(/\\/g, '/')
        return !ALLOWED_6B10.has(name) && !APPROVED_CLIENT_MEDIA_FILES.has(name) && !PHASE8_PREMIUM_FILES.has(name)
      })

    expect(out).toEqual([])
  })
})
