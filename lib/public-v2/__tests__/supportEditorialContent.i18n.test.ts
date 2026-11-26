import { describe, expect, it } from 'vitest'
import {
  SUPPORT_EDITORIAL,
  getSupportEditorialContent,
} from '../supportEditorialContent'
import {
  SUPPORT_PAGE_COPY,
  getSupportCrossLinks,
  getSupportPageCopy,
} from '../supportPageContent'

describe('public-v2 support content i18n', () => {
  it('EN editorial hero titleLine2 mentions sorted', () => {
    const hero = getSupportEditorialContent('en').hero
    expect(hero.titleLine2.toLowerCase()).toMatch(/sorted/)
  })

  it('SUPPORT_EDITORIAL matches French getter', () => {
    expect(SUPPORT_EDITORIAL.hero.titleLine2).toBe('On va démêler ça.')
    expect(getSupportEditorialContent('fr').hero.titleLine1).toBe(
      SUPPORT_EDITORIAL.hero.titleLine1,
    )
  })

  it('getSupportPageCopy delegates to landing content', () => {
    expect(getSupportPageCopy('fr')).toBe(SUPPORT_PAGE_COPY)
    expect(getSupportPageCopy('en').h1).toMatch(/computer/i)
  })

  it('getSupportCrossLinks returns English labels', () => {
    const links = getSupportCrossLinks('en')
    expect(links[0].label).toBe('Websites')
    expect(links[1].label).toBe('Software')
  })
})