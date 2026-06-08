'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

/**
 * Fond d’ambiance plein écran (activé depuis HomeClient) :
 * dégradés animés + voile lumineux discret derrière le contenu.
 */
export default function HomeAmbientBackdrop() {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const isDark = theme.palette.mode === 'dark'
  const [animationsPaused, setAnimationsPaused] = useState(false)

  useEffect(() => {
    if (typeof document === 'undefined') return

    const sync = () => setAnimationsPaused(document.visibilityState !== 'visible')
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  const animSx = animationsPaused
    ? { animationPlayState: 'paused' as const }
    : undefined

  const p = isDark ? 0.58 : 0.44
  const s = isDark ? 0.48 : 0.36
  const a = isDark ? 0.36 : 0.28

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
            ? `radial-gradient(140% 85% at 50% -15%, ${alpha(primary, 0.28)} 0%, transparent 58%),
               radial-gradient(90% 60% at 100% 100%, ${alpha(secondary, 0.2)} 0%, transparent 50%),
               radial-gradient(72% 50% at 0% 62%, ${alpha(accent, 0.16)} 0%, transparent 48%)`
            : `radial-gradient(120% 75% at 50% -10%, ${alpha(primary, 0.28)} 0%, transparent 52%),
               radial-gradient(85% 55% at 100% 100%, ${alpha(secondary, 0.2)} 0%, transparent 48%),
               radial-gradient(70% 48% at 0% 62%, ${alpha(accent, 0.12)} 0%, transparent 46%)`,
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
          filter: 'blur(44px)',
          opacity: isDark ? 1 : 0.98,
          animation: 'ambientDriftA 16s ease-in-out infinite',
          willChange: 'transform',
          ...animSx,
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
          filter: 'blur(42px)',
          opacity: isDark ? 0.95 : 0.94,
          animation: 'ambientDriftB 20s ease-in-out infinite',
          willChange: 'transform',
          ...animSx,
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
          filter: 'blur(48px)',
          opacity: isDark ? 0.82 : 0.86,
          animation: 'ambientDriftC 24s ease-in-out infinite',
          willChange: 'transform',
          ...animSx,
        }}
      />
    </Box>
  )
}
