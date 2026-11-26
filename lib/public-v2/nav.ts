/**
 * Navigation publique V2 — source unique pour Header, Footer et menu mobile.
 */

import type { PublicV2Locale } from './locale'

export type { PublicV2Locale } from './locale'

export type PublicV2NavItemId = 'services' | 'realisations' | 'about' | 'contact'

export type PublicV2NavItem = {
  id: PublicV2NavItemId
  label: string
  /** Destination canonique (production / futur accueil). */
  href: string
}

export const PUBLIC_V2_BRAND = {
  name: 'Jean-François Lefebvre',
  mark: 'IJIPOP',
  /** Accueil site — réécrit en ancre sandbox sur la preview. */
  homeHref: '/',
} as const

/** Id du `<main>` partagé (accueil + sandbox). */
export const PUBLIC_V2_MAIN_ID = 'pv2-main'

/** Ancre Services = id réel de ServicesSection (`pv2-services`). */
export const PUBLIC_V2_SERVICES_HASH = '#pv2-services'
export const PUBLIC_V2_SERVICES_HREF = '/#pv2-services'

const NAV_HREFS: Record<PublicV2NavItemId, string> = {
  services: PUBLIC_V2_SERVICES_HREF,
  realisations: '/portfolio/projets',
  about: '/portfolio/a-propos',
  contact: '/portfolio/contact',
}

const NAV_LABELS: Record<PublicV2Locale, Record<PublicV2NavItemId, string>> = {
  fr: {
    services: 'Services',
    realisations: 'Réalisations',
    about: 'À propos',
    contact: 'Contact',
  },
  en: {
    services: 'Services',
    realisations: 'Work',
    about: 'About',
    contact: 'Contact',
  },
}

const CTA_LABELS: Record<PublicV2Locale, string> = {
  fr: 'Me contacter',
  en: 'Contact me',
}

const CTA_HREF = '/portfolio/contact'

/** Libellés chrome (skip, aria) — hors items de nav. */
export const PUBLIC_V2_CHROME_COPY: Record<
  PublicV2Locale,
  {
    skipToContent: string
    primaryNav: string
    footerNav: string
    mobileMenu: string
  }
> = {
  fr: {
    skipToContent: 'Aller au contenu',
    primaryNav: 'Principale',
    footerNav: 'Pied de page',
    mobileMenu: 'Menu de navigation',
  },
  en: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    mobileMenu: 'Navigation menu',
  },
}

/** Items FR (rétrocompat tests / imports). */
export const PUBLIC_V2_NAV_ITEMS: readonly PublicV2NavItem[] = (
  Object.keys(NAV_HREFS) as PublicV2NavItemId[]
).map((id) => ({
  id,
  label: NAV_LABELS.fr[id],
  href: NAV_HREFS[id],
}))

export const PUBLIC_V2_CTA = {
  label: CTA_LABELS.fr,
  href: CTA_HREF,
} as const

/** Path sandbox design system. */
export const PUBLIC_V2_PREVIEW_PATH = '/v2-design-preview'
/** Alias historique — même ancre Services. */
export const PUBLIC_V2_PREVIEW_SERVICES_HASH = PUBLIC_V2_SERVICES_HASH
export const PUBLIC_V2_PREVIEW_MAIN_HASH = `#${PUBLIC_V2_MAIN_ID}`

function isPreviewPath(pathname: string): boolean {
  return (
    pathname === PUBLIC_V2_PREVIEW_PATH || pathname.startsWith(`${PUBLIC_V2_PREVIEW_PATH}/`)
  )
}

/**
 * Adapte les hrefs canoniques à la route courante.
 * Sur la sandbox, évite de quitter `/v2-design-preview` pour `/#…`.
 */
export function resolvePublicV2Href(href: string, pathname: string): string {
  if (!isPreviewPath(pathname)) return href

  if (
    href === PUBLIC_V2_SERVICES_HREF ||
    href === PUBLIC_V2_SERVICES_HASH ||
    href === '/#services' ||
    href === '#services'
  ) {
    return PUBLIC_V2_SERVICES_HASH
  }
  if (href === '/' || href === PUBLIC_V2_BRAND.homeHref) {
    return PUBLIC_V2_PREVIEW_MAIN_HASH
  }
  return href
}

export function getPublicV2NavItems(
  pathname: string,
  locale: PublicV2Locale = 'fr',
): PublicV2NavItem[] {
  const labels = NAV_LABELS[locale] ?? NAV_LABELS.fr
  return (Object.keys(NAV_HREFS) as PublicV2NavItemId[]).map((id) => ({
    id,
    label: labels[id],
    href: resolvePublicV2Href(NAV_HREFS[id], pathname),
  }))
}

export function getPublicV2Cta(pathname: string, locale: PublicV2Locale = 'fr') {
  return {
    label: CTA_LABELS[locale] ?? CTA_LABELS.fr,
    href: resolvePublicV2Href(CTA_HREF, pathname),
  }
}

export function getPublicV2ChromeCopy(locale: PublicV2Locale = 'fr') {
  return PUBLIC_V2_CHROME_COPY[locale] ?? PUBLIC_V2_CHROME_COPY.fr
}

export function getPublicV2BrandHomeHref(pathname: string): string {
  return resolvePublicV2Href(PUBLIC_V2_BRAND.homeHref, pathname)
}

/** État actif de nav — dérivé du pathname serveur (pas de window). */
export function isPublicV2NavItemActive(item: PublicV2NavItem, pathname: string): boolean {
  switch (item.id) {
    case 'services':
      return pathname === '/' || pathname === ''
    case 'realisations':
      return pathname === '/portfolio/projets' || pathname.startsWith('/portfolio/projets/')
    case 'about':
      return pathname === '/portfolio/a-propos' || pathname.startsWith('/portfolio/a-propos/')
    case 'contact':
      return pathname === '/portfolio/contact' || pathname.startsWith('/portfolio/contact/')
    default:
      return false
  }
}
