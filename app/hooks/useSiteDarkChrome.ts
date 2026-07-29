'use client'

import { usePathname } from 'next/navigation'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { isProductLandingRoute } from '@/components/product-landings/productLandingRoutes'

/**
 * Refonte V2 sombre active (glass, SITE_DARK, texte clair).
 * Défaut au chargement : beigeDark=true. Désactivé via le toggle navbar → mode Site clair (beige).
 * Exclut landings produit (Timelendr, CPU-ZE, Space Taker).
 */
export function useSiteDarkChrome(): boolean {
  const pathname = usePathname()
  const { beigeDark } = useBeigeDark()
  return beigeDark && !isProductLandingRoute(pathname)
}
