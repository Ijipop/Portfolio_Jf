'use client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import { SITE_DARK, siteDarkPageGradient } from '@/design-system/siteDark'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { isTimelendrRoute } from '@/utils/isTimelendrRoute'

type SiteDarkBackdropProps = {
  /** Force l’affichage (ex. topology layer). */
  force?: boolean
}

export default function SiteDarkBackdrop({ force = false }: SiteDarkBackdropProps) {
  const pathname = usePathname()
  const { mode: presentationMode } = usePresentationMode()
  const { beigeDark } = useBeigeDark()

  if (isTimelendrRoute(pathname)) return null
  const show = force || (presentationMode === 'beige' && beigeDark)
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
          background: `radial-gradient(ellipse at center, ${SITE_DARK.brandGlowStrong} 0%, transparent 70%)`,
          opacity: 0.85,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          mixBlendMode: 'overlay',
        },
      }}
    />
  )
}
