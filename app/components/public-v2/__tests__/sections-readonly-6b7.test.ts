import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { CONTACT_SMS_DISABLE_FILES } from './approved-contact-sms-disable-allowlist'
import { SUPPORT_FORM_P0_FILES } from './approved-support-form-p0-allowlist'
import { gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'
import { I18N_V2_FILES } from './approved-i18n-v2-allowlist'
import { SUPPORT_HERO_ATELIER_FILES } from './approved-support-hero-atelier-allowlist'
import { PROJECTS_LOADER_FILES } from './approved-projects-loader-allowlist'
import { SOFTWARE_LANDING_FILES } from './approved-software-landing-allowlist'

/**
 * Phase 6B7 clôturée (Space Taker). Baseline = commit 6B7.
 * DeskDot / Timelendr hors périmètre — voir sections-readonly-6b9 / 6b10.
 */
const BASE_AFTER_6B7 = 'f6b38d349599faf6445bd504c2eea8eb326c713c'

const READONLY_PATHS_6B7 = [
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
  'app/(site-pages)/soutien-informatique-montreal',
  'app/components/public-v2/services/support',
  'lib/public-v2/supportPageContent.ts',
  'app/(site-pages)/spacetaker',
]

describe('Approved surfaces remain frozen after Phase 6B7', () => {
  it('ne régresse pas Space Taker ni les pages figées (hors migrations produit suivantes)', () => {
    const out = gitDiffNameOnly(BASE_AFTER_6B7, READONLY_PATHS_6B7).filter(
      (name) =>
        !APPROVED_CLIENT_MEDIA_FILES.has(name) &&
        !PHASE8_PREMIUM_FILES.has(name) &&
        !SUPPORT_FORM_P0_FILES.has(name) &&
        !CONTACT_SMS_DISABLE_FILES.has(name) &&
        !I18N_V2_FILES.has(name) &&
        !SUPPORT_HERO_ATELIER_FILES.has(name) &&
        !PROJECTS_LOADER_FILES.has(name) &&
        !SOFTWARE_LANDING_FILES.has(name),
    )

    expect(out).toEqual([])
  })
})
