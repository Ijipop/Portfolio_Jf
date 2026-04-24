'use client'

import React from 'react'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { runRootViewTransition } from '@/lib/magic-view-transition'

const CREA_LABEL_CLASS = 'presentation-dev-label'
const CREA_TOGGLE_CLASS = 'presentation-mode-dev-toggle'

/**
 * Mêmes teintes que le dégradé marque Ijipop (`IjipopGlitchTitle` — ambre → orange #ea580c → brique),
 * en bande horizontale + boucle pour l’animation du libellé Créa.
 */
const IJIPOP_ORANGE_LABEL_GRADIENT =
  'linear-gradient(90deg, #ffedd5, #fdba74, #fb923c, #ea580c, #b91c1c, #7f1d1d, #b91c1c, #ea580c, #fb923c, #fdba74, #ffedd5)'

const IJIPOP_ORANGE_FALLBACK = '#ea580c'

export function PresentationModeToggle() {
  const { mode, setMode } = usePresentationMode()
  const { t } = useLanguage()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size="small"
      onChange={(_, value: 'beige' | 'dev' | null) => {
        if (!value || value === mode) return
        runRootViewTransition(
          () => {
            setMode(value)
          },
          {
            duration: 450,
            variant: 'circle',
            fromCenter: true,
            respectReducedMotion: true,
          }
        )
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
