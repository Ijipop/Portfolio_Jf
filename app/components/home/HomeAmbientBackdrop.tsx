'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useThemeColors } from '@/hooks/useThemeColors'

/**
 * Fond d’ambiance plein écran pour l’accueil : derrière tout le contenu (z-index 0),
 * sans interaction. Animations basées sur background-position pour éviter le rognage
 * avec overflow: hidden sur PageWrapper.
 */
export default function HomeAmbientBackdrop() {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const isDark = theme.palette.mode === 'dark'

  const p = isDark ? 0.34 : 0.22
  const s = isDark ? 0.28 : 0.16
  const a = isDark ? 0.2 : 0.12

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(closest-side at 22% 38%, ${alpha(primary, p)}, transparent 72%),
            radial-gradient(closest-side at 82% 62%, ${alpha(secondary, s)}, transparent 72%),
            radial-gradient(closest-side at 52% 18%, ${alpha(accent, a)}, transparent 70%)
          `,
          backgroundSize: '160% 160%, 150% 150%, 170% 170%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% 50%, 100% 50%, 50% 0%',
          '@keyframes homeAmbBgShift': {
            '0%': { backgroundPosition: '0% 50%, 100% 50%, 50% 0%' },
            '100%': { backgroundPosition: '100% 40%, 0% 60%, 50% 100%' },
          },
          animation: 'homeAmbBgShift 28s ease-in-out infinite alternate',
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.35 : 0.4,
          backgroundImage: `
            linear-gradient(${alpha('#fff', isDark ? 0.04 : 0.08)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha('#fff', isDark ? 0.04 : 0.08)} 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 45%, black 8%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 45%, black 8%, transparent 72%)',
        }}
      />
    </Box>
  )
}
