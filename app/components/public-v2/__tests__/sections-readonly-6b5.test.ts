import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { CONTACT_SMS_DISABLE_FILES } from './approved-contact-sms-disable-allowlist'
import { gitDiff, gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'
import { I18N_V2_FILES } from './approved-i18n-v2-allowlist'
import { SUPPORT_HERO_ATELIER_FILES } from './approved-support-hero-atelier-allowlist'
import { PROJECTS_LOADER_FILES } from './approved-projects-loader-allowlist'

/** HEAD après commit 6B4 À propos. */
const BASE_6B5 = 'c22c1f548d418ffe34426d48ca0bba3570475cc6'

/** Changements autorisés post-6B5 / 6B6 : href Services + hub /logiciel retiré.
 * Timelendr migré en 6B10 (hors périmètre) — voir sections-readonly-6b10. */
const ALLOWED_6B5 = new Set([
  'lib/public-v2/servicesContent.ts',
  'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
  'app/(public)/logiciel/page.tsx',
  'app/(public)/logiciel/layout.tsx',
  'app/(public)/logiciel/timelendr/page.tsx',
  'app/(public)/logiciel/timelendr/layout.tsx',
  'app/(public)/logiciel/timelendr/TimelendrCarousel.tsx',
  'app/(public)/logiciel/timelendr/TimelendrProduct.module.css',
  'app/(public)/logiciel/timelendr/merci/page.tsx',
  'app/(public)/logiciel/timelendr/merci/layout.tsx',
])

const READONLY_PATHS_6B5 = [
  'app/components/public-v2/sections/Hero',
  'app/components/public-v2/sections/Services',
  'app/components/public-v2/sections/Work',
  'app/components/public-v2/sections/Laboratory',
  'app/components/public-v2/sections/About',
  'app/components/public-v2/sections/Contact',
  'lib/public-v2/heroContent.ts',
  'lib/public-v2/servicesContent.ts',
  'lib/public-v2/workContent.ts',
  'lib/public-v2/laboratoryContent.ts',
  'lib/public-v2/aboutContent.ts',
  'lib/public-v2/contactContent.ts',
  'app/components/public-v2/projects',
  'lib/public-v2/projectsContent.ts',
  'lib/public-v2/projectsFixtures.ts',
  'app/(site-pages)/portfolio/projets',
  'app/(site-pages)/portfolio/contact',
  'app/components/public-v2/contact',
  'lib/public-v2/contactPageContent.ts',
  'app/(site-pages)/portfolio/a-propos',
  'app/components/public-v2/about',
  'lib/public-v2/aboutPageContent.ts',
  'app/(public)/logiciel',
]

describe('Homepage + catalog + contact + about read-only during Phase 6B5', () => {
  it('ne modifie pas les pages approuvées depuis 6B4 (sauf href Services et hub logiciel)', () => {
    const out = gitDiffNameOnly(BASE_6B5, READONLY_PATHS_6B5).filter(
      (name) =>
        !ALLOWED_6B5.has(name) &&
        !APPROVED_CLIENT_MEDIA_FILES.has(name) &&
        !PHASE8_PREMIUM_FILES.has(name) &&
        !CONTACT_SMS_DISABLE_FILES.has(name) &&
        !I18N_V2_FILES.has(name) &&
        !SUPPORT_HERO_ATELIER_FILES.has(name) &&
        !PROJECTS_LOADER_FILES.has(name),
    )

    expect(out).toEqual([])
  })

  it('ne change que les href Services (web + logiciels) dans servicesContent', () => {
    const diff = gitDiff(BASE_6B5, ['lib/public-v2/servicesContent.ts'])
    expect(diff).toMatch(/creation-site-web-montreal|portfolio\/projets\?type=web/)
    expect(diff).toMatch(/portfolio\/projets\?type=logiciel/)
    // Twins EN (I18N_V2) autorisés — hors i18n, pas de retouche éditoriale FR.
    if (!I18N_V2_FILES.has('lib/public-v2/servicesContent.ts')) {
      expect(diff).not.toMatch(/^\+.*title:/m)
      expect(diff).not.toMatch(/^\+.*description:/m)
      expect(diff).not.toMatch(/^\+.*ctaLabel:/m)
    }
  })
})
