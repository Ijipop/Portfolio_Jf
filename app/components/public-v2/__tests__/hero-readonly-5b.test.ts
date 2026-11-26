import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { gitDiff, gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/**
 * Après le tag local hero-v2-reference, la Phase 5B ne doit pas retoucher le Hero.
 * Commit peeled du tag annoté (object c4aecab… → commit ci-dessous). Tag absent sur origin ;
 * ce SHA est ancêtre de origin/main et disponible avec checkout fetch-depth: 0.
 * @see docs/ijipop-v2/HERO-REFERENCE.md
 */
const HERO_V2_REFERENCE_SHA = '8fe8ab52d86ba547f74254638f63ed397d5a0879'

const HERO_PATHS = [
  'app/components/public-v2/sections/Hero',
  'lib/public-v2/heroContent.ts',
]

describe('Hero read-only during Phase 5B', () => {
  it('ne modifie aucun fichier Hero depuis hero-v2-reference (sauf correctif glyph CSS)', () => {
    const out = gitDiffNameOnly(HERO_V2_REFERENCE_SHA, HERO_PATHS)

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
      const diff = gitDiff(HERO_V2_REFERENCE_SHA, [heroCss])
      expect(diff).toMatch(/\.titleLine/)
      expect(diff).toMatch(/line-height:\s*1\.18/)
    }
  })
})
