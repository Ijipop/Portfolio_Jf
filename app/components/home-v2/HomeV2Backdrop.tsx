'use client'

import Box from '@mui/material/Box'
import { SITE_DARK, siteDarkPageGradient } from '@/design-system/siteDark'
import { useBackdropPresence } from './useBackdropPresence'

type HomeV2BackdropProps = {
  /**
   * `top` = lueur collée en haut du viewport (accueil).
   * `center` = lueur derrière le contenu (gateway / grands écrans).
   */
  glowPlacement?: 'top' | 'center'
  /** `spectacle` = halos pulsés + dérive (gateway). */
  intensity?: 'default' | 'spectacle'
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`

/** Fond éditorial : encre chaude, halo ambre vivant — mode spectacle pour la gateway. */
export default function HomeV2Backdrop({
  glowPlacement = 'top',
  intensity = 'default',
}: HomeV2BackdropProps) {
  const centered = glowPlacement === 'center'
  const spectacle = intensity === 'spectacle'
  const baseHaloOpacity = spectacle ? (centered ? 0.9 : 0.8) : centered ? 0.72 : 0.68
  const { effectsEnabled, glitchActive, haloRef } = useBackdropPresence({
    centered,
    baseOpacity: baseHaloOpacity,
  })

  const initialHaloTransform = centered
    ? 'translate(-50%, -50%) scale(1)'
    : 'translateX(-50%) scale(1)'

  return (
    <Box
      aria-hidden
      data-testid="home-v2-backdrop"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: siteDarkPageGradient(),
        '@keyframes gatewayHaloDrift': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.55 },
          '50%': { transform: 'translate(-44%, -56%) scale(1.12)', opacity: 0.85 },
        },
        '@keyframes gatewayHaloDrift2': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.4 },
          '50%': { transform: 'translate(-58%, -42%) scale(1.18)', opacity: 0.75 },
        },
        '@keyframes gatewayAmberPulse': {
          '0%, 100%': { opacity: 0.35 },
          '40%': { opacity: 0.7 },
          '70%': { opacity: 0.5 },
        },
      }}
    >
      <Box
        ref={haloRef}
        sx={{
          position: 'absolute',
          top: centered ? '40%' : '-16%',
          left: '50%',
          width: centered
            ? spectacle
              ? 'min(920px, 88vw)'
              : 'min(780px, 74vw)'
            : 'min(920px, 110vw)',
          height: centered
            ? spectacle
              ? 'min(460px, 52vh)'
              : 'min(380px, 40vh)'
            : 'min(480px, 56vh)',
          transform: initialHaloTransform,
          transformOrigin: 'center center',
          background: spectacle
            ? `radial-gradient(ellipse at center, rgba(232, 93, 4, 0.28) 0%, rgba(244, 140, 6, 0.12) 42%, transparent 72%)`
            : `radial-gradient(ellipse at center, ${SITE_DARK.brandGlow} 0%, transparent 70%)`,
          opacity: baseHaloOpacity,
          willChange: effectsEnabled ? 'transform, opacity' : undefined,
        }}
      />

      {spectacle ? (
        <Box
          sx={{
            position: 'absolute',
            top: centered ? '34%' : '-12%',
            left: '40%',
            width: 'min(700px, 68vw)',
            height: 'min(380px, 42vh)',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(ellipse at center, rgba(244, 140, 6, 0.22) 0%, transparent 68%)',
            animation: effectsEnabled ? 'gatewayHaloDrift 11s ease-in-out infinite' : undefined,
          }}
        />
      ) : null}

      {spectacle ? (
        <Box
          sx={{
            position: 'absolute',
            top: '62%',
            left: '58%',
            width: 'min(560px, 58vw)',
            height: 'min(300px, 34vh)',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse at center, rgba(232, 93, 4, 0.2) 0%, transparent 70%)`,
            animation: effectsEnabled ? 'gatewayHaloDrift2 9s ease-in-out infinite' : undefined,
          }}
        />
      ) : null}

      {spectacle ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 50% at 50% 42%, rgba(232, 93, 4, 0.12) 0%, transparent 65%)',
            animation: effectsEnabled ? 'gatewayAmberPulse 4.2s ease-in-out infinite' : undefined,
          }}
        />
      ) : null}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN_URL,
          opacity: spectacle ? 1.2 : 1,
        }}
      />

      {glitchActive ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 55% 42% at 50% 30%, rgba(244, 140, 6, 0.35) 0%, transparent 70%)`,
            animation: 'ijipopBgFlash 320ms ease-out forwards',
            '@keyframes ijipopBgFlash': {
              '0%': { opacity: 0.65 },
              '100%': { opacity: 0 },
            },
          }}
        />
      ) : null}
    </Box>
  )
}
