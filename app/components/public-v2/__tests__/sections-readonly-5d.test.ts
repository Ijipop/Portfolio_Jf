import { describe, expect, it } from 'vitest'
import { APPROVED_CLIENT_MEDIA_FILES } from './approved-client-media-allowlist'
import { gitDiffNameOnly } from './gitDiffPortable'
import { PHASE8_PREMIUM_FILES } from './phase8-premium-allowlist'
import { I18N_V2_FILES } from './approved-i18n-v2-allowlist'

/** Commit Phase 5C — sections figées pour la Phase 5D. */
const BASE_5C = '84cd2a51d14fc069c8f38e3ae46b15e692d8fee1'

describe('Validated sections read-only during Phase 5D', () => {
  it('ne modifie pas Hero, Services ni Work depuis le commit 5C', () => {
    const out = gitDiffNameOnly(BASE_5C, [
      'app/components/public-v2/sections/Hero',
      'app/components/public-v2/sections/Services',
      'app/components/public-v2/sections/Work',
      'lib/public-v2/heroContent.ts',
      'lib/public-v2/servicesContent.ts',
      'lib/public-v2/workContent.ts',
      'lib/content/demos-catalog.ts',
    ])

    const allowed = new Set([
      'app/components/public-v2/sections/Hero/Hero.module.css',
      /** 6B5/6B6 : retarget href Services web + logiciels */
      'lib/public-v2/servicesContent.ts',
      'app/components/public-v2/sections/Services/__tests__/ServicesSection.test.tsx',
      ...APPROVED_CLIENT_MEDIA_FILES,
      ...PHASE8_PREMIUM_FILES,
      ...I18N_V2_FILES,
    ])
    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })

  it('limite les changements Laboratory à la suppression éditoriale du hint', () => {
    const out = gitDiffNameOnly(BASE_5C, [
      'app/components/public-v2/sections/Laboratory',
      'lib/public-v2/laboratoryContent.ts',
    ])

    const allowed = new Set([
      'app/components/public-v2/sections/Laboratory/LaboratorySection.tsx',
      'app/components/public-v2/sections/Laboratory/LaboratorySection.module.css',
      'lib/public-v2/laboratoryContent.ts',
      ...I18N_V2_FILES,
    ])

    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })
})
