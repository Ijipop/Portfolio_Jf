'use client'

import Box from '@mui/material/Box'
import { PREVIEW } from './previewTokens'

/** Mesh lent + grain film — atmosphère full-bleed derrière le contenu. */
export default function PreviewAtmosphere() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: PREVIEW.bg,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-20%',
          background: `
            radial-gradient(ellipse 55% 45% at 18% 20%, ${PREVIEW.orangeGlow} 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 82% 15%, rgba(251, 146, 60, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 90%, rgba(234, 88, 12, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 70% 55%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)
          `,
          animation: 'previewMeshDrift 28s ease-in-out infinite alternate',
          '@keyframes previewMeshDrift': {
            '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
            '100%': { transform: 'translate3d(-2%, 1.5%, 0) scale(1.04)' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${PREVIEW.bg} 0%, transparent 18%, transparent 78%, ${PREVIEW.bg} 100%)`,
          opacity: 0.55,
        }}
      />
    </Box>
  )
}
