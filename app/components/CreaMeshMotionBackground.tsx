'use client'

/**
 * Fond mode Créa — mesh gradient CSS (safe premium) : halos flous animés + voile large + grille fine.
 * Pas de WebGL : volontairement « lumière ambiante » plutôt que particules denses.
 */

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'

export default function CreaMeshMotionBackground() {
  const theme = useTheme()
  const { customTheme } = useAdvancedTheme()
  const isDark = theme.palette.mode === 'dark'

  const p = customTheme.primary
  const s = customTheme.secondary
  const ac = customTheme.accent
  const bg = customTheme.bg
  const bg2 = customTheme.bg2

  return (
    <Box
      aria-hidden
      data-testid="crea-mesh-background"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100%',
        overflow: 'hidden',
        background: `linear-gradient(125deg, ${bg} 0%, ${bg2} 45%, ${bg} 100%)`,
        '@keyframes creaMeshDriftA': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(5%, -4%, 0) scale(1.06)' },
        },
        '@keyframes creaMeshDriftB': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-4%, 5%, 0) scale(1.05)' },
        },
        '@keyframes creaMeshPulse': {
          '0%, 100%': { opacity: isDark ? 0.35 : 0.28 },
          '50%': { opacity: isDark ? 0.52 : 0.42 },
        },
        '@keyframes creaMeshGridBreath': {
          '0%, 100%': { opacity: isDark ? 0.14 : 0.1 },
          '50%': { opacity: isDark ? 0.22 : 0.16 },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .crea-mesh-anim': {
            animation: 'none !important',
          },
        },
      }}
    >
      {/* Grand voile statique : évite l’impression « seulement 3 taches » sur le vide. */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-5%',
          background: `radial-gradient(ellipse 85% 55% at 50% 35%, ${alpha(p, isDark ? 0.08 : 0.06)} 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 70% 80%, ${alpha(s, isDark ? 0.07 : 0.05)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Grille très fine = lecture « mesh » ; respiration lente. */}
      <Box
        className="crea-mesh-anim"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.16 : 0.12,
          animation: 'creaMeshGridBreath 28s ease-in-out infinite',
          backgroundImage: `linear-gradient(${alpha(p, isDark ? 0.22 : 0.14)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(p, isDark ? 0.22 : 0.14)} 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          pointerEvents: 'none',
        }}
      />
      <Box
        className="crea-mesh-anim"
        sx={{
          position: 'absolute',
          width: 'min(130vw, 900px)',
          height: 'min(130vw, 900px)',
          left: '-18%',
          top: '-12%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 40%, ${alpha(p, isDark ? 0.22 : 0.18)} 0%, transparent 58%)`,
          filter: 'blur(56px)',
          animation: 'creaMeshDriftA 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <Box
        className="crea-mesh-anim"
        sx={{
          position: 'absolute',
          width: 'min(115vw, 720px)',
          height: 'min(115vw, 720px)',
          right: '-14%',
          bottom: '-8%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 55% 45%, ${alpha(s, isDark ? 0.2 : 0.16)} 0%, transparent 55%)`,
          filter: 'blur(48px)',
          animation: 'creaMeshDriftB 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <Box
        className="crea-mesh-anim"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          width: 'min(90vw, 520px)',
          height: 'min(55vw, 340px)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${alpha(ac, isDark ? 0.12 : 0.1)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: 'creaMeshPulse 14s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
