'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useThemeColors } from '@/hooks/useThemeColors'

/**
 * Fond d’ambiance plein écran (activé depuis HomeClient) :
 * dégradés animés + voile lumineux discret derrière le contenu.
 */
export default function HomeAmbientBackdrop() {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const isDark = theme.palette.mode === 'dark'

  const p = isDark ? 0.42 : 0.34
  const s = isDark ? 0.36 : 0.28
  const a = isDark ? 0.28 : 0.22

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        '@keyframes ambientDriftA': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -5%, 0) scale(1.07)' },
        },
        '@keyframes ambientDriftB': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-5%, 4%, 0) scale(1.06)' },
        },
        '@keyframes ambientDriftC': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(3%, 5%, 0) scale(1.04)' },
        },
        '@keyframes ambientShimmer': {
          '0%': { opacity: 0.26, transform: 'translate3d(-9%, 0, 0)' },
          '100%': { opacity: 0.56, transform: 'translate3d(9%, 0, 0)' },
        },
        '@keyframes ambientBeam': {
          '0%, 100%': { opacity: isDark ? 0.26 : 0.2, transform: 'translate3d(-5%, 0, 0) rotate(-10deg)' },
          '50%': { opacity: isDark ? 0.5 : 0.38, transform: 'translate3d(6%, 0, 0) rotate(-7deg)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .ambient-anim': {
            animation: 'none !important',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? `radial-gradient(140% 85% at 50% -15%, ${alpha(primary, 0.18)} 0%, transparent 58%),
               radial-gradient(90% 60% at 100% 100%, ${alpha(secondary, 0.12)} 0%, transparent 50%)`
            : `radial-gradient(120% 75% at 50% -10%, ${alpha(primary, 0.2)} 0%, transparent 52%),
               radial-gradient(85% 55% at 100% 100%, ${alpha(secondary, 0.14)} 0%, transparent 48%)`,
        }}
      />
      <Box
        className="ambient-anim"
        sx={{
          position: 'absolute',
          width: { xs: 'min(120vw, 780px)', md: 'min(95vw, 980px)' },
          height: { xs: 'min(120vw, 780px)', md: 'min(95vw, 980px)' },
          left: { xs: '-30%', md: '-14%' },
          top: { xs: '-12%', md: '-6%' },
          borderRadius: '50%',
          background: `radial-gradient(circle at 38% 38%, ${alpha(primary, p)} 0%, transparent 64%)`,
          filter: 'blur(52px)',
          opacity: isDark ? 0.9 : 0.95,
          animation: 'ambientDriftA 16s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <Box
        className="ambient-anim"
        sx={{
          position: 'absolute',
          width: { xs: 'min(105vw, 620px)', md: 'min(76vw, 760px)' },
          height: { xs: 'min(105vw, 620px)', md: 'min(76vw, 760px)' },
          right: { xs: '-24%', md: '-10%' },
          top: { xs: '16%', md: '8%' },
          borderRadius: '50%',
          background: `radial-gradient(circle at 58% 42%, ${alpha(secondary, s)} 0%, transparent 62%)`,
          filter: 'blur(48px)',
          opacity: isDark ? 0.82 : 0.9,
          animation: 'ambientDriftB 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <Box
        className="ambient-anim"
        sx={{
          position: 'absolute',
          width: { xs: 'min(95vw, 560px)', md: 'min(64vw, 640px)' },
          height: { xs: 'min(95vw, 560px)', md: 'min(64vw, 640px)' },
          left: { xs: '16%', md: '24%' },
          bottom: { xs: '-14%', md: '-8%' },
          borderRadius: '50%',
          background: `radial-gradient(circle at 50% 50%, ${alpha(accent, a)} 0%, transparent 58%)`,
          filter: 'blur(54px)',
          opacity: isDark ? 0.7 : 0.8,
          animation: 'ambientDriftC 24s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <Box
        className="ambient-anim"
        sx={{
          position: 'absolute',
          width: { xs: '140%', md: '120%' },
          height: { xs: '65%', md: '58%' },
          left: { xs: '-22%', md: '-8%' },
          top: { xs: '-8%', md: '-12%' },
          background: `linear-gradient(
            92deg,
            transparent 0%,
            ${alpha('#fff', isDark ? 0.06 : 0.14)} 38%,
            ${alpha(primary, isDark ? 0.13 : 0.1)} 50%,
            ${alpha('#fff', isDark ? 0.06 : 0.14)} 62%,
            transparent 100%
          )`,
          filter: 'blur(22px)',
          transformOrigin: 'center',
          animation: 'ambientBeam 12s ease-in-out infinite',
        }}
      />
      <Box
        className="ambient-anim"
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            108deg,
            transparent 0%,
            ${alpha(primary, isDark ? 0.07 : 0.06)} 42%,
            ${alpha('#fff', isDark ? 0.05 : 0.11)} 50%,
            ${alpha(primary, isDark ? 0.07 : 0.06)} 58%,
            transparent 100%
          )`,
          backgroundSize: '220% 100%',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          animation: 'ambientShimmer 11s ease-in-out infinite alternate',
        }}
      />
    </Box>
  )
}
