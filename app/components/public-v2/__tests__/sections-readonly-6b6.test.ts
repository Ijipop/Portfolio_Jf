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
 * Phase 6B6 clôturée (hub /logiciel). Baseline = commit 6B6.
 * Fiches produit migrées ensuite hors périmètre.
 */
const BASE_AFTER_6B6 = 'f24c05430e0e251ce8d4e699d0083697b3ee0b86'

const READONLY_PATHS_6B6 = [
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
]

describe('Approved surfaces remain frozen after Phase 6B6', () => {
  it('ne régresse pas les pages figées d’accueil / services', () => {
    const out = gitDiffNameOnly(BASE_AFTER_6B6, READONLY_PATHS_6B6).filter(
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
