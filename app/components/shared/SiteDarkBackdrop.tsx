'use client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import { SITE_DARK, siteDarkPageGradient } from '@/design-system/siteDark'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { isProductLandingRoute } from '@/components/product-landings/productLandingRoutes'

type SiteDarkBackdropProps = {
  /** Force l’affichage (ex. topology layer). */
  force?: boolean
}

export default function SiteDarkBackdrop({ force = false }: SiteDarkBackdropProps) {
  const pathname = usePathname()
  const { beigeDark } = useBeigeDark()

  if (isProductLandingRoute(pathname)) return null
  const show = force || beigeDark
  if (!show) return null

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: siteDarkPageGradient(),
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 120vw)',
          height: 'min(700px, 80vh)',
          background: `radial-gradient(ellipse at center, ${SITE_DARK.brandGlow} 0%, transparent 72%)`,
          opacity: 0.55,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`,
          opacity: 1,
          mixBlendMode: 'normal',
        },
      }}
    />
  )
}
