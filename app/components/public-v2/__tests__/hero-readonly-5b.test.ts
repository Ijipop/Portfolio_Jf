import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

/**
 * Après le tag hero-v2-reference, la Phase 5B ne doit pas retoucher le Hero.
 */
describe('Hero read-only during Phase 5B', () => {
  it('ne modifie aucun fichier Hero depuis hero-v2-reference', () => {
    const out = execSync('git diff --name-only hero-v2-reference -- app/components/public-v2/sections/Hero lib/public-v2/heroContent.ts', {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()
    expect(out).toBe('')
  })
})
