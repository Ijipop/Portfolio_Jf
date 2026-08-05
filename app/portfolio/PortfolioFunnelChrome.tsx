'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import HomeV2Backdrop from '@/components/home-v2/HomeV2Backdrop'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'

type PortfolioFunnelChromeProps = {
  children: ReactNode
}

/** Atmosphère + sticky estimation unifiés sur tout le funnel /portfolio. */
export default function PortfolioFunnelChrome({ children }: PortfolioFunnelChromeProps) {
  const pathname = usePathname()
  const onContact =
    pathname === '/portfolio/contact' || Boolean(pathname?.startsWith('/portfolio/contact/'))

  return (
    <>
      <HomeV2Backdrop glowPlacement="top" />
      {children}
      {!onContact ? (
        <ScrollTriggeredStickyCTA textKey="homeV2.heroCtaPrimary" href="/portfolio/contact" />
      ) : null}
    </>
  )
}
