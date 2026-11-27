import { describe, expect, it } from 'vitest'
import { getSupportLandingContent } from '../soutien-informatique-montreal.fr'

describe('support form phone optional copy', () => {
  it('expose des libellés FR/EN optionnels', () => {
    const fr = getSupportLandingContent('fr')
    const en = getSupportLandingContent('en')
    expect(fr.formPhoneOptional).toMatch(/optionnel/i)
    expect(en.formPhoneOptional).toMatch(/optional/i)
    expect(fr.formPhoneRequired).toBeTruthy()
    expect(en.formPhoneRequired).toBeTruthy()
  })
})
