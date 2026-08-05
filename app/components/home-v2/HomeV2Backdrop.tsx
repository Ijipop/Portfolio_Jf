'use client'

import Box from '@mui/material/Box'
import { SITE_DARK } from '@/design-system/siteDark'
import { useBackdropPresence } from './useBackdropPresence'

type HomeV2BackdropProps = {
  /**
   * `top` = lueur collée en haut du viewport (accueil).
   * `center` = lueur derrière le contenu (gateway / grands écrans).
   */
  glowPlacement?: 'top' | 'center'
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E")`

/** Fond confiance : encre, halo ambre, grain + spotlight / micro-glitch / profondeur scroll. */
export default function HomeV2Backdrop({ glowPlacement = 'top' }: HomeV2BackdropProps) {
  const centered = glowPlacement === 'center'
  const baseHaloOpacity = centered ? 0.7 : 0.65
  const { effectsEnabled, pointerFine, glitchActive, spotlightRef, haloRef } = useBackdropPresence({
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
        background: `linear-gradient(168deg, ${SITE_DARK.bg} 0%, #101722 46%, ${SITE_DARK.bgElevated} 100%)`,
      }}
    >
      <Box
        ref={haloRef}
        sx={{
          position: 'absolute',
          top: centered ? '46%' : '-12%',
          left: '50%',
          width: centered ? 'min(860px, 72vw)' : 'min(920px, 110vw)',
          height: centered ? 'min(420px, 42vh)' : 'min(520px, 62vh)',
          transform: initialHaloTransform,
          transformOrigin: 'center center',
          background: `radial-gradient(ellipse at center, ${SITE_DARK.brandGlow} 0%, transparent 72%)`,
          opacity: baseHaloOpacity,
          willChange: effectsEnabled ? 'transform, opacity' : undefined,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 10% 100%, rgba(56, 90, 130, 0.1) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 20%, rgba(232, 93, 4, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {pointerFine && effectsEnabled ? (
        <Box
          ref={spotlightRef}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '35%',
            width: 'min(480px, 55vw)',
            height: 'min(480px, 55vw)',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232, 93, 4, 0.09) 0%, transparent 70%)',
            opacity: 0,
            willChange: 'left, top, opacity',
          }}
        />
      ) : null}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN_URL,
          transform: glitchActive ? 'translate(1.5px, -1px)' : 'translate(0, 0)',
          opacity: 1,
          animation: glitchActive ? 'ijipopBgGlitch 300ms steps(2, end)' : undefined,
          '@keyframes ijipopBgGlitch': {
            '0%': { transform: 'translate(0, 0)', filter: 'none' },
            '25%': { transform: 'translate(-2px, 1px)', filter: 'brightness(1.06)' },
            '50%': { transform: 'translate(2px, -1px)', filter: 'brightness(1.1)' },
            '75%': { transform: 'translate(-1px, 0)', filter: 'none' },
            '100%': { transform: 'translate(0, 0)', filter: 'none' },
          },
        }}
      />

      {glitchActive ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 50% 40% at 50% 30%, ${SITE_DARK.brandGlowStrong} 0%, transparent 70%)`,
            animation: 'ijipopBgFlash 300ms ease-out forwards',
            '@keyframes ijipopBgFlash': {
              '0%': { opacity: 0.5 },
              '100%': { opacity: 0 },
            },
          }}
        />
      ) : null}
    </Box>
  )
}
