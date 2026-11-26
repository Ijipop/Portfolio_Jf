import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'

/**
 * Après le commit 5B, les sections figées restent protégées.
 * Services peut recevoir des corrections UX ciblées (alignement / lead).
 */
const BASE_5B = 'b661fcf2adacc543c0d9159545ccfe18535f2093'

describe('Validated sections read-only during Phase 5C', () => {
  it('ne modifie pas Hero ni Work depuis HEAD de référence 5B', () => {
    const out = gitDiffNameOnly(BASE_5B, [
      'app/components/public-v2/sections/Hero',
      'app/components/public-v2/sections/Work',
      'lib/public-v2/heroContent.ts',
      'lib/public-v2/workContent.ts',
    ])

    const allowed = new Set([
      'app/components/public-v2/sections/Hero/Hero.module.css',
      ...APPROVED_CLIENT_MEDIA_FILES,
      ...PHASE8_PREMIUM_FILES,
    ])
    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })

  it('limite les changements Services aux fichiers de section / contenu autorisés', () => {
    const out = gitDiffNameOnly(BASE_5B, [
      'app/components/public-v2/sections/Services',
      'lib/public-v2/servicesContent.ts',
    ])

    const allowed = new Set([
      'app/components/public-v2/sections/Services/ServiceCard.module.css',
      'app/components/public-v2/sections/Services/ServiceCard.tsx',
      'app/components/public-v2/sections/Services/ServicesSection.module.css',
      'app/components/public-v2/sections/Services/ServicesSection.tsx',
      'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
      'app/components/public-v2/sections/Services/index.ts',
      'lib/public-v2/servicesContent.ts',
    ])

    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })
})
