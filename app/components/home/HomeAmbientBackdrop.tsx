'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useThemeColors } from '@/hooks/useThemeColors'

/**
 * Fond d’ambiance plein écran (mode Créa uniquement, voir HomeClient) : dégradés animés
 * derrière le contenu, sans quadrillage ni interaction.
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
    </Box>
  )
}
