'use client'

import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import {
  getThemeTransitionClipPaths,
  type TransitionVariant,
} from '@/components/ui/animated-theme-toggler'

const CREA_LABEL_CLASS = 'presentation-dev-label'
const CREA_TOGGLE_CLASS = 'presentation-mode-dev-toggle'

/**
 * Mêmes teintes que le dégradé marque Ijipop (`IjipopGlitchTitle` — ambre → orange #ea580c → brique),
 * en bande horizontale + boucle pour l’animation du libellé Créa.
 */
const IJIPOP_ORANGE_LABEL_GRADIENT =
  'linear-gradient(90deg, #ffedd5, #fdba74, #fb923c, #ea580c, #b91c1c, #7f1d1d, #b91c1c, #ea580c, #fb923c, #fdba74, #ffedd5)'

const IJIPOP_ORANGE_FALLBACK = '#ea580c'

const VT_DURATION_MS = 420
const VT_SHAPE: TransitionVariant = 'circle'

function runCenteredPresentationViewTransition(
  next: 'beige' | 'dev',
  applyMode: () => void
): void {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  const x = viewportWidth / 2
  const y = viewportHeight / 2
  const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))

  const root = document.documentElement
  root.dataset.presentationModeVt = 'active'
  root.style.setProperty('--presentation-mode-vt-duration', `${VT_DURATION_MS}ms`)

  const cleanup = () => {
    delete root.dataset.presentationModeVt
    root.style.removeProperty('--presentation-mode-vt-duration')
  }

  const apply = () => {
    flushSync(applyMode)
  }

  if (typeof document.startViewTransition !== 'function') {
    apply()
    cleanup()
    return
  }

  const transition = document.startViewTransition(apply)
  if (typeof transition?.finished?.finally === 'function') {
    transition.finished.finally(cleanup)
  } else {
    cleanup()
  }

  const ready = transition?.ready
  if (ready && typeof ready.then === 'function') {
    ready.then(() => {
      const clipPath = getThemeTransitionClipPaths(
        VT_SHAPE,
        x,
        y,
        maxRadius,
        viewportWidth,
        viewportHeight
      )
      document.documentElement.animate(
        { clipPath },
        {
          duration: VT_DURATION_MS,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }
}

export function PresentationModeToggle() {
  const { mode, setMode } = usePresentationMode()
  const { t } = useLanguage()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const handlePresentationChange = useCallback(
    (next: 'beige' | 'dev') => {
      if (next === mode) return
      if (reduceMotion) {
        setMode(next)
        return
      }
      runCenteredPresentationViewTransition(next, () => setMode(next))
    },
    [mode, reduceMotion, setMode]
  )

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size="small"
      onChange={(_, value: 'beige' | 'dev' | null) => {
        if (value) handlePresentationChange(value)
      }}
      aria-label={t('nav.presentationToggleGroup')}
      sx={{
        '@keyframes creaPaletteShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        '& .MuiToggleButton-root': {
          px: { xs: 0.75, sm: 1.25 },
          py: 0.5,
          fontSize: { xs: '0.65rem', sm: '0.75rem' },
          fontWeight: 700,
          color: 'white',
          border: '1px solid rgba(255,255,255,0.55) !important',
          textTransform: 'none',
          '&.Mui-selected': {
            bgcolor: 'rgba(255,255,255,0.22) !important',
            color: 'white',
          },
          '&:not(.Mui-selected)': {
            bgcolor: 'transparent',
          },
        },
        [`& .${CREA_TOGGLE_CLASS}:not(.Mui-selected) .${CREA_LABEL_CLASS}`]: reduceMotion
          ? {
              display: 'inline-block',
              color: IJIPOP_ORANGE_FALLBACK,
              textShadow: '0 0 12px rgba(0,0,0,0.35)',
            }
          : {
              display: 'inline-block',
              background: IJIPOP_ORANGE_LABEL_GRADIENT,
              backgroundSize: '240% 100%',
              backgroundPosition: '0% 50%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              animation: 'creaPaletteShift 16s ease-in-out infinite',
            },
        [`& .${CREA_TOGGLE_CLASS}.Mui-selected .${CREA_LABEL_CLASS}`]: {
          display: 'inline-block',
          background: 'none',
          WebkitBackgroundClip: 'unset',
          backgroundClip: 'unset',
          color: 'inherit',
          WebkitTextFillColor: 'currentcolor',
          animation: 'none',
        },
      }}
    >
      <ToggleButton value="beige" aria-label={t('nav.presentationBeige')}>
        {t('nav.presentationBeige')}
      </ToggleButton>
      <ToggleButton value="dev" className={CREA_TOGGLE_CLASS} aria-label={t('nav.presentationDev')}>
        <Box component="span" className={CREA_LABEL_CLASS}>
          {t('nav.presentationDev')}
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
