/**
 * Ouvre une URL projet : même onglet pour chemins internes / même origine,
 * nouvel onglet pour les domaines externes.
 */
export function navigateProjectUrl(
  url: string,
  router: { push: (href: string) => void | Promise<void> }
): void {
  const trimmed = url.trim()
  if (!trimmed || typeof window === 'undefined') return

  if (trimmed.startsWith('//')) {
    try {
      const u = new URL(trimmed, window.location.origin)
      if (u.origin === window.location.origin) {
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
      if (u.origin === window.location.origin) {
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
