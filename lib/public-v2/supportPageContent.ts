/**
 * Page /soutien-informatique-montreal V2 — Phase 6B5.
 * Copy FR issue de getSupportLandingContent('fr') — formulaire SupportContactForm inchangé.
 * Bilingue V2 reporté (comme Contact / À propos).
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

export {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_LANDING_PATH,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_PORTRAIT_SRC,
  SUPPORT_SMS_HREF,
}

/** Contenu public FR de la landing V2. */
export const SUPPORT_PAGE_COPY = getSupportLandingContent('fr')

export const SUPPORT_CROSS_LINKS = [
  { href: '/portfolio/projets?type=web', label: 'Sites web' },
  { href: '/portfolio/projets?type=logiciel', label: 'Logiciels' },
] as const
