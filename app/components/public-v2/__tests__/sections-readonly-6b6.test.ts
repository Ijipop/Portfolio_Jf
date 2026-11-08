import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'

/**
 * Phase 6B6 clôturée (hub /logiciel). Baseline = commit 6B6.
 * Fiches produit migrées ensuite hors périmètre.
 */
const BASE_AFTER_6B6 = 'f24c05430e0e251ce8d4e699d0083697b3ee0b86'

describe('Approved surfaces remain frozen after Phase 6B6', () => {
  it('ne régresse pas les pages figées d’accueil / services', () => {
    const out = execSync(
      `git diff --name-only ${BASE_AFTER_6B6} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((f) => !APPROVED_CLIENT_MEDIA_FILES.has(f.replace(/\\/g, '/')))

    expect(out).toEqual([])
  })
})
