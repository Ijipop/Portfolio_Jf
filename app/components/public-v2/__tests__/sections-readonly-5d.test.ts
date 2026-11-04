import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/** Commit Phase 5C — sections figées pour la Phase 5D. */
const BASE_5C = '84cd2a51d14fc069c8f38e3ae46b15e692d8fee1'

describe('Validated sections read-only during Phase 5D', () => {
  it('ne modifie pas Hero, Services ni Work depuis le commit 5C', () => {
    const out = execSync(
      `git diff --name-only ${BASE_5C} -- app/components/public-v2/sections/Hero app/components/public-v2/sections/Services app/components/public-v2/sections/Work lib/public-v2/heroContent.ts lib/public-v2/servicesContent.ts lib/public-v2/workContent.ts lib/content/demos-catalog.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    ).trim()
    expect(out).toBe('')
  })

  it('limite les changements Laboratory à la suppression éditoriale du hint', () => {
    const out = execSync(
      `git diff --name-only ${BASE_5C} -- app/components/public-v2/sections/Laboratory lib/public-v2/laboratoryContent.ts`,
      { encoding: 'utf8', cwd: process.cwd() },
    )
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)

    const allowed = new Set([
      'app/components/public-v2/sections/Laboratory/LaboratorySection.tsx',
      'app/components/public-v2/sections/Laboratory/LaboratorySection.module.css',
      'lib/public-v2/laboratoryContent.ts',
    ])

    for (const file of out) {
      expect(allowed.has(file)).toBe(true)
    }
  })
})
