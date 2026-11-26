/**
 * Page /soutien-informatique-montreal V2 — Phase 6B5.
 * Copy issue de getSupportLandingContent(locale) — formulaire SupportContactForm inchangé.
 */

import {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_LANDING_PATH,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_PORTRAIT_SRC,
  SUPPORT_SMS_HREF,
  getSupportLandingContent,
} from '@/content/soutien-informatique-montreal.fr'
import type { PublicV2Locale } from './locale'

export {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_LANDING_PATH,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_PORTRAIT_SRC,
  SUPPORT_SMS_HREF,
}

export function getSupportPageCopy(locale: PublicV2Locale = 'fr') {
  return getSupportLandingContent(locale)
}

/** Contenu public FR de la landing V2. */
export const SUPPORT_PAGE_COPY = getSupportLandingContent('fr')

const SUPPORT_CROSS_LINKS_FR = [
  { href: '/portfolio/projets?type=web', label: 'Sites web' },
  { href: '/portfolio/projets?type=logiciel', label: 'Logiciels' },
] as const

const SUPPORT_CROSS_LINKS_EN = [
  { href: '/portfolio/projets?type=web', label: 'Websites' },
  { href: '/portfolio/projets?type=logiciel', label: 'Software' },
] as const

export type SupportCrossLink = { href: string; label: string }

export function getSupportCrossLinks(locale: PublicV2Locale = 'fr'): readonly SupportCrossLink[] {
  return locale === 'en' ? SUPPORT_CROSS_LINKS_EN : SUPPORT_CROSS_LINKS_FR
}

/** @deprecated Prefer getSupportCrossLinks(locale). */
export const SUPPORT_CROSS_LINKS = SUPPORT_CROSS_LINKS_FR