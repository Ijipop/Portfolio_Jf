import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/**
 * Phase 6B8 clôturée (CPU-ZE + Traducteur). Baseline = commit 6B8.
 * DeskDot hors périmètre — voir sections-readonly-6b9.
 */
const BASE_AFTER_6B8 = 'a480ada74cea72f71d030fb82bc56ab648f1289b'

describe('Approved surfaces remain frozen after Phase 6B8', () => {
  it('ne régresse pas CPU-ZE, Traducteur ni les pages figées', () => {
    const out = execSync(
      `git diff --name-only ${BASE_AFTER_6B8} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(site-pages)/spacetaker app/(site-pages)/cpu-ze app/(site-pages)/traducteur`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    expect(out).toEqual([])
  })
})
