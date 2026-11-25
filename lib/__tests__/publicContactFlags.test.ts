import { describe, expect, it } from 'vitest'
import { SMS_CONTACT_ENABLED } from '../publicContactFlags'

describe('publicContactFlags', () => {
  it('désactive les CTA SMS publics tant que Fongo texting est indisponible', () => {
    expect(SMS_CONTACT_ENABLED).toBe(false)
  })
})