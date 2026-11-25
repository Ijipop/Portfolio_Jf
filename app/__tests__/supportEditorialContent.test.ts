import { describe, expect, it } from 'vitest'
import { SUPPORT_EDITORIAL } from '@/lib/public-v2/supportEditorialContent'

describe('supportEditorialContent', () => {
  it('expose cinq domaines et mention Expression LaSalle une fois', () => {
    expect(SUPPORT_EDITORIAL.services.domains).toHaveLength(5)
    expect(SUPPORT_EDITORIAL.services.domains[4].title).toBe(
      'Solutions informatiques pour organisations',
    )
    const mentions = JSON.stringify(SUPPORT_EDITORIAL).match(/Expression LaSalle/g) ?? []
    expect(mentions).toHaveLength(1)
  })

  it('décrit trois étapes de processus', () => {
    expect(SUPPORT_EDITORIAL.process.steps).toHaveLength(3)
  })
})