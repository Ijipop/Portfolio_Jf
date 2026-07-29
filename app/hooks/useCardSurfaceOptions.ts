'use client'

import { usePathname } from 'next/navigation'
import { isProductLandingRoute } from '@/components/product-landings/productLandingRoutes'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { shouldShowTopology } from '@/utils/topologyRoutes'

/** Options communes pour getCardSurfaceSx sur les pages portfolio. */
export function useCardSurfaceOptions() {
  const pathname = usePathname()
  const isSiteDark = useSiteDarkChrome()
  const isProductLanding = isProductLandingRoute(pathname)
  return {
    isTopologyRoute: shouldShowTopology(pathname),
    isSiteDark,
    isSiteLight: !isSiteDark && !isProductLanding,
  }
}
