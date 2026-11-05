import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/**
 * Phase 6B7 clôturée (Space Taker). Baseline = commit 6B7.
 * DeskDot hors périmètre — voir sections-readonly-6b9.
 */
const BASE_AFTER_6B7 = 'f6b38d349599faf6445bd504c2eea8eb326c713c'

describe('Approved surfaces remain frozen after Phase 6B7', () => {
  it('ne régresse pas Space Taker ni les pages figées (hors migrations produit suivantes)', () => {
    const out = execSync(
      `git diff --name-only ${BASE_AFTER_6B7} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/components/public-v2/projects lib/public-v2/projectsContent.ts lib/public-v2/projectsFixtures.ts app/(site-pages)/portfolio/projets app/(site-pages)/portfolio/contact app/components/public-v2/contact lib/public-v2/contactPageContent.ts app/(site-pages)/portfolio/a-propos app/components/public-v2/about lib/public-v2/aboutPageContent.ts app/(site-pages)/soutien-informatique-montreal app/components/public-v2/services/support lib/public-v2/supportPageContent.ts app/(public)/logiciel/timelendr app/(site-pages)/spacetaker`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    expect(out).toEqual([])
  })
})
