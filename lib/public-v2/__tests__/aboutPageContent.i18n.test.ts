import { describe, expect, it } from 'vitest'
import { ABOUT_PAGE_COPY, getAboutPageContent } from '../aboutPageContent'

describe('public-v2 aboutPageContent i18n', () => {
  it('returns English about title and story for en', () => {
    const en = getAboutPageContent('en')
    expect(en.title).toBe('About')
    expect(en.storyParagraphs[0]).toMatch(/stroke survivor/i)
    expect(en.portraitEyebrow).toBe('Portrait')
  })

  it('defaults French copy to ABOUT_PAGE_COPY', () => {
    expect(getAboutPageContent('fr')).toBe(ABOUT_PAGE_COPY)
    expect(ABOUT_PAGE_COPY.portraitEyebrow).toBe('Portrait')
  })
})