import { describe, expect, it } from 'vitest'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'
import { CONTACT_PAGE_COPY, getContactPageContent } from '../contactPageContent'

describe('public-v2 contactPageContent i18n', () => {
  it('returns English merci title for en', () => {
    expect(getContactPageContent('en').merciTitle).toBe('Message received')
  })

  it('uses English tech-support subject in supportShortcutHref for en', () => {
    const href = getContactPageContent('en').supportShortcutHref
    expect(href).toContain(encodeURIComponent(CONTACT_SUBJECT_TECH_SUPPORT.en))
  })

  it('keeps phone display unchanged across locales', () => {
    expect(getContactPageContent('en').phoneDisplay).toBe(CONTACT_PAGE_COPY.phoneDisplay)
    expect(getContactPageContent('en').phoneHref).toBe(CONTACT_PAGE_COPY.phoneHref)
  })

  it('defaults French copy to CONTACT_PAGE_COPY', () => {
    expect(getContactPageContent('fr')).toBe(CONTACT_PAGE_COPY)
  })
})