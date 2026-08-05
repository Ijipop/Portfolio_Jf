'use client'

import Box from '@mui/material/Box'
import { SITE_DARK } from '@/design-system/siteDark'

type HomeV2BackdropProps = {
  /**
   * `top` = lueur collée en haut du viewport (accueil).
   * `center` = lueur derrière le contenu (gateway / grands écrans).
   */
  glowPlacement?: 'top' | 'center'
}

/** Fond confiance : encre bleutée, lueur ambre discrète, grain léger. */
export default function HomeV2Backdrop({ glowPlacement = 'top' }: HomeV2BackdropProps) {
  const centered = glowPlacement === 'center'

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `linear-gradient(168deg, ${SITE_DARK.bg} 0%, #101722 46%, ${SITE_DARK.bgElevated} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: centered ? '46%' : '-12%',
          left: '50%',
          transform: centered ? 'translate(-50%, -50%)' : 'translateX(-50%)',
          width: centered ? 'min(860px, 72vw)' : 'min(920px, 110vw)',
          height: centered ? 'min(420px, 42vh)' : 'min(520px, 62vh)',
          background: `radial-gradient(ellipse at center, ${SITE_DARK.brandGlowStrong} 0%, transparent 70%)`,
          opacity: centered ? 0.55 : 0.5,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 10% 100%, rgba(56, 90, 130, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 20%, rgba(232, 93, 4, 0.06) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")
          `,
          opacity: 1,
          mixBlendMode: 'normal',
        },
      }}
    />
  )
}
