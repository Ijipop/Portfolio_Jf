'use client'

import { usePathname } from 'next/navigation'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { isTimelendrRoute } from '@/utils/isTimelendrRoute'

/**
 * Refonte V2 sombre active (glass, SITE_DARK, texte clair).
 * Défaut au chargement : beigeDark=true. Désactivé via le toggle navbar → mode Site clair (beige).
 * Exclut Timelendr (thème latte inchangé).
 */
export function useSiteDarkChrome(): boolean {
  const pathname = usePathname()
  const { beigeDark } = useBeigeDark()
  return beigeDark && !isTimelendrRoute(pathname)
}
