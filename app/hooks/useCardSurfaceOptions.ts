'use client'

import { usePathname } from 'next/navigation'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { shouldShowTopology } from '@/utils/topologyRoutes'

/** Options communes pour getCardSurfaceSx sur les pages portfolio. */
export function useCardSurfaceOptions() {
  const pathname = usePathname()
  const isSiteDark = useSiteDarkChrome()
  return {
    isTopologyRoute: shouldShowTopology(pathname),
    isSiteDark,
  }
}
