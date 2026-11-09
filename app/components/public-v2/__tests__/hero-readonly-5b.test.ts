import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/**
 * Après le tag hero-v2-reference, la Phase 5B ne doit pas retoucher le Hero.
 */
describe('Hero read-only during Phase 5B', () => {
  it('ne modifie aucun fichier Hero depuis hero-v2-reference (sauf correctif glyph CSS)', () => {
    const out = execSync(
      'git diff --name-only hero-v2-reference -- app/components/public-v2/sections/Hero lib/public-v2/heroContent.ts',
      {
        encoding: 'utf8',
        cwd: process.cwd(),
      },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    const allowed = new Set([
      'app/components/public-v2/sections/Hero/Hero.module.css',
      ...APPROVED_CLIENT_MEDIA_FILES,
      ...PHASE8_PREMIUM_FILES,
    ])
    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }

    // Ancien correctif glyph (5B) : si Hero.module.css change hors Phase 8,
    // le diff doit rester le patch line-height 1.18. Phase 8 Premium autorise
    // une réécriture complète (True WOW / Wave 3.0).
    const heroCss = 'app/components/public-v2/sections/Hero/Hero.module.css'
    if (out.includes(heroCss) && !PHASE8_PREMIUM_FILES.has(heroCss)) {
      const diff = execSync(`git diff hero-v2-reference -- ${heroCss}`, {
        encoding: 'utf8',
        cwd: process.cwd(),
      })
      expect(diff).toMatch(/\.titleLine/)
      expect(diff).toMatch(/line-height:\s*1\.18/)
    }
  })
})
