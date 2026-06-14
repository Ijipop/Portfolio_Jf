'use client'

import Box from '@mui/material/Box'
import { HOME_V2 } from './homeV2Tokens'

export default function HomeV2Backdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `linear-gradient(180deg, ${HOME_V2.bg} 0%, ${HOME_V2.bgElevated} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 120vw)',
          height: 'min(700px, 80vh)',
          background: `radial-gradient(ellipse at center, ${HOME_V2.brandGlowStrong} 0%, transparent 70%)`,
          opacity: 0.9,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: 'overlay',
        },
      }}
    />
  )
}
