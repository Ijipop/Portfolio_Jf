/**
 * Ouvre une URL projet : même onglet pour chemins internes / même origine,
 * nouvel onglet pour les domaines externes.
 *
 * Les liens absolus vers ijipop.com sont traités comme routes internes
 * (évite d’ouvrir prod depuis localhost quand la landing n’est pas encore déployée).
 */
const SITE_HOSTS = new Set(['ijipop.com', 'www.ijipop.com', 'localhost'])

function isOwnSiteHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  if (SITE_HOSTS.has(host)) return true
  if (host.endsWith('.vercel.app')) return true
  return false
}

/** Pathname du site uniquement — jamais github.com ni un autre domaine externe. */
export function getOwnSitePathname(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('/')) {
    return trimmed.split(/[?#]/)[0]
  }

  try {
    const parsed = trimmed.startsWith('//')
      ? new URL(trimmed, 'https://ijipop.com')
      : new URL(trimmed)
    if (parsed.hostname.toLowerCase().includes('github.com')) return null
    if (isOwnSiteHost(parsed.hostname)) return parsed.pathname
    return null
  } catch {
    return null
  }
}

/** Landing produit interne, ou null si l’URL doit s’ouvrir telle quelle (ex. GitHub). */
export function resolveProductLandingHref(url: string): string | null {
  const path = getOwnSitePathname(url)?.toLowerCase()
  if (!path) return null
  if (
    path === '/logiciel/timelendr' ||
    path.startsWith('/logiciel/timelendr/') ||
    path === '/logiciel/timelendar' ||
    path.startsWith('/logiciel/timelendar/')
  ) {
    return '/logiciel/timelendr'
  }
  if (path === '/cpu-ze' || path.startsWith('/cpu-ze/')) return '/cpu-ze'
  if (
    path === '/spacetaker' ||
    path.startsWith('/spacetaker/') ||
    path === '/space-taker' ||
    path.startsWith('/space-taker/')
  ) {
    return '/spacetaker'
  }
  if (path === '/deskdot' || path.startsWith('/deskdot/')) return '/deskdot'
  if (path === '/traducteur' || path.startsWith('/traducteur/')) return '/traducteur'
  return null
}

export function navigateProjectUrl(
  url: string,
  router: { push: (href: string) => void | Promise<void> }
): void {
  const trimmed = url.trim()
  if (!trimmed || typeof window === 'undefined') return

  if (trimmed.startsWith('//')) {
    try {
      const u = new URL(trimmed, window.location.origin)
      if (u.origin === window.location.origin || isOwnSiteHost(u.hostname)) {
        void router.push(`${u.pathname}${u.search}${u.hash}`)
      } else {
        window.open(u.href, '_blank', 'noopener,noreferrer')
      }
    } catch {
      window.open(trimmed, '_blank', 'noopener,noreferrer')
    }
    return
  }

  if (trimmed.startsWith('/')) {
    void router.push(trimmed)
    return
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const u = new URL(trimmed)
      if (u.origin === window.location.origin || isOwnSiteHost(u.hostname)) {
        void router.push(`${u.pathname}${u.search}${u.hash}`)
      } else {
        window.open(trimmed, '_blank', 'noopener,noreferrer')
      }
    } catch {
      window.open(trimmed, '_blank', 'noopener,noreferrer')
    }
    return
  }

  void router.push(`/${trimmed.replace(/^\/+/, '')}`)
}
