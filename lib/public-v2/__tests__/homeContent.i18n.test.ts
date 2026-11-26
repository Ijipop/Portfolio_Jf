import { describe, expect, it } from 'vitest'
import { HERO_COPY, getHeroCopy } from '../heroContent'

describe('public-v2 home content i18n', () => {
  it('returns English hero title for en locale', () => {
    expect(getHeroCopy('en').title).toBe('Websites, software, and IT support.')
  })

  it('returns French hero title matching HERO_COPY for fr locale', () => {
    expect(getHeroCopy('fr').title).toBe(HERO_COPY.title)
    expect(getHeroCopy().title).toBe(HERO_COPY.title)
  })
})