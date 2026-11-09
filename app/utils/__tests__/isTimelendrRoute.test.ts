import { describe, expect, it } from 'vitest'
import { isTimelendrRoute } from '../isTimelendrRoute'

describe('isTimelendrRoute', () => {
  it('reconnaît la landing et ses sous-routes', () => {
    expect(isTimelendrRoute('/logiciel/timelendr')).toBe(true)
    expect(isTimelendrRoute('/logiciel/timelendr/merci')).toBe(true)
  })

  it('ignore les chemins voisins et les valeurs vides', () => {
    expect(isTimelendrRoute('/logiciel/timelendar')).toBe(false)
    expect(isTimelendrRoute('/logiciel')).toBe(false)
    expect(isTimelendrRoute('/cpu-ze')).toBe(false)
    expect(isTimelendrRoute(null)).toBe(false)
    expect(isTimelendrRoute(undefined)).toBe(false)
  })
})
