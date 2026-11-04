/**
 * Navigation publique V2 — source unique pour Header, Footer et menu mobile.
 */

export type PublicV2NavItem = {
  id: 'services' | 'realisations' | 'about' | 'contact'
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

export const PUBLIC_V2_NAV_ITEMS: readonly PublicV2NavItem[] = [
  { id: 'services', label: 'Services', href: PUBLIC_V2_SERVICES_HREF },
  { id: 'realisations', label: 'Réalisations', href: '/portfolio/projets' },
  { id: 'about', label: 'À propos', href: '/portfolio/a-propos' },
  { id: 'contact', label: 'Contact', href: '/portfolio/contact' },
] as const

export const PUBLIC_V2_CTA = {
  label: 'Me contacter',
  href: '/portfolio/contact',
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

export function getPublicV2NavItems(pathname: string): PublicV2NavItem[] {
  return PUBLIC_V2_NAV_ITEMS.map((item) => ({
    ...item,
    href: resolvePublicV2Href(item.href, pathname),
  }))
}

export function getPublicV2Cta(pathname: string) {
  return {
    label: PUBLIC_V2_CTA.label,
    href: resolvePublicV2Href(PUBLIC_V2_CTA.href, pathname),
  }
}

export function getPublicV2BrandHomeHref(pathname: string): string {
  return resolvePublicV2Href(PUBLIC_V2_BRAND.homeHref, pathname)
}
