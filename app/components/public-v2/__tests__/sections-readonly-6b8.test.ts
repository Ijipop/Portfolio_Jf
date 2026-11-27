import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { CONTACT_SMS_DISABLE_FILES } from './approved-contact-sms-disable-allowlist'
import { SUPPORT_FORM_P0_FILES } from './approved-support-form-p0-allowlist'
import { gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'
import { I18N_V2_FILES } from './approved-i18n-v2-allowlist'
import { SUPPORT_HERO_ATELIER_FILES } from './approved-support-hero-atelier-allowlist'
import { PROJECTS_LOADER_FILES } from './approved-projects-loader-allowlist'

/**
 * Phase 6B8 clôturée (CPU-ZE + Traducteur). Baseline = commit 6B9
 * (après DeskDot) : Timelendr hors périmètre — voir sections-readonly-6b10.
 */
const BASE_AFTER_6B9 = '8903f617b3b12b1bc9c12a7801df8e0c9e458c60'

const READONLY_PATHS_6B8 = [
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
  'app/(site-pages)/cpu-ze',
  'app/(site-pages)/traducteur',
  'app/(site-pages)/deskdot',
]

describe('Approved surfaces remain frozen after Phase 6B8', () => {
  it('ne régresse pas CPU-ZE, Traducteur ni les pages figées', () => {
    const out = gitDiffNameOnly(BASE_AFTER_6B9, READONLY_PATHS_6B8).filter(
      (name) =>
        !APPROVED_CLIENT_MEDIA_FILES.has(name) &&
        !PHASE8_PREMIUM_FILES.has(name) &&
        !SUPPORT_FORM_P0_FILES.has(name) &&
        !CONTACT_SMS_DISABLE_FILES.has(name) &&
        !I18N_V2_FILES.has(name) &&
        !SUPPORT_HERO_ATELIER_FILES.has(name) &&
        !PROJECTS_LOADER_FILES.has(name),
    )

    expect(out).toEqual([])
  })
})
