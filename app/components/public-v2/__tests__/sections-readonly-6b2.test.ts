import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/** Commit Phase 6B1 — accueil figé pour la Phase 6B2. */
const BASE_6B1 = '0d530a36aae3344f6fcff8b5f944df074f7f2cf3'

describe('Homepage read-only during Phase 6B2', () => {
  it('ne modifie pas les sections d’accueil figées depuis 6B1', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B1} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work app/components/public-v2/sections/Laboratory app/components/public-v2/sections/About app/components/public-v2/sections/Contact lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/public-v2/laboratoryContent.ts lib/public-v2/aboutContent.ts lib/public-v2/contactContent.ts app/(site-home)/page.tsx`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    /** Exception glyph Hero + retarget href Services (6B5/6B6) + médias clients autorisés. */
    const allowedHeroGlyphFix = new Set([
      'app/components/public-v2/sections/Hero/Hero.module.css',
      'lib/public-v2/servicesContent.ts',
      'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
      ...APPROVED_CLIENT_MEDIA_FILES,
      ...PHASE8_PREMIUM_FILES,
    ])

    for (const file of out) {
      expect(allowedHeroGlyphFix.has(file)).toBe(true)
    }

    // Ancien correctif glyph (6B2) : hors Phase 8 uniquement.
    // Phase 8 Premium / Atelier Atlantique autorise une réécriture Hero complète.
    const heroCss = 'app/components/public-v2/sections/Hero/Hero.module.css'
    if (out.includes(heroCss) && !PHASE8_PREMIUM_FILES.has(heroCss)) {
      const diff = execSync(`git diff ${BASE_6B1} -- ${heroCss}`, {
        encoding: 'utf8',
        cwd: process.cwd(),
      })
      const added = diff
        .split(/\r?\n/)
        .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
        .join('\n')
      expect(added).toMatch(/line-height:\s*1\.18/)
      expect(diff).toMatch(/^-.*overflow:\s*hidden/m)
      expect(added.split('\n').filter((l) => /^\+\s*overflow:\s*hidden/.test(l))).toHaveLength(0)
      expect(added).not.toMatch(/font-size|font-family|HERO_COPY|background:|font-weight/)
    }
  })

  it('limite les changements du shell d’accueil au refactor chrome structurel', () => {
    const out = execSync(
      `git diff --name-only ${BASE_6B1} -- app/components/public-v2/home`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    const allowed = new Set([
      'app/components/public-v2/home/PopAtelierHomeShell.tsx',
      'app/components/public-v2/home/__tests__/PopAtelierHomeShell.test.tsx',
      'app/components/public-v2/home/index.ts',
    ])

    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }

    if (out.includes('app/components/public-v2/home/PopAtelierHomeShell.tsx')) {
      const diff = execSync(
        `git diff ${BASE_6B1} -- app/components/public-v2/home/PopAtelierHomeShell.tsx`,
        { encoding: 'utf8', cwd: process.cwd() },
      )
      expect(diff).toMatch(/PublicChromeShell/)
      expect(diff).not.toMatch(/Hero\.module|ABOUT_COPY|HERO_COPY/)
    }
  })
})
