/**
 * Copy provisoire — section Contact V2 (sandbox).
 * CTA vers le formulaire existant — aucun formulaire inline.
 */

import type { PublicV2Locale } from './locale'

export const CONTACT_COPY = {
  title: 'Un projet en tête? Un problème à régler?',
  lead:
    'Expliquez-moi ce que vous cherchez à faire. On pourra regarder ensemble ce qui serait possible.',
  ctaLabel: 'Me contacter',
  ctaHref: '/portfolio/contact',
} as const

export const CONTACT_COPY_EN = {
  title: 'Got a project in mind? Something to fix?',
  lead: 'Tell me what you’re trying to do. We can look at what might be possible together.',
  ctaLabel: 'Contact me',
  ctaHref: '/portfolio/contact',
}

export type ContactCopy = { [K in keyof typeof CONTACT_COPY]: string }

export function getContactSectionCopy(locale: PublicV2Locale = 'fr'): ContactCopy {
  return locale === 'en' ? CONTACT_COPY_EN : CONTACT_COPY
}