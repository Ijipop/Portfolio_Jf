'use client'

import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import {
  getThemeTransitionClipPaths,
  type TransitionVariant,
} from '@/components/ui/animated-theme-toggler'

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
  const { t, locale } = useLanguage()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  const handleToggle = useCallback(() => {
    const next = mode === 'dev' ? 'beige' : 'dev'
    if (next === mode) return
    if (reduceMotion) {
      setMode(next)
      return
    }
    runCenteredPresentationViewTransition(next, () => setMode(next))
  }, [mode, reduceMotion, setMode])

  const label = locale === 'fr' ? (mode === 'dev' ? 'Funky On' : 'Funky Off') : mode === 'dev' ? 'Funky On' : 'Funky Off'

  return (
    <Button
      size="small"
      onClick={handleToggle}
      aria-label={t('nav.presentationToggleGroup')}
      sx={{
        px: { xs: 1.15, sm: 1.35 },
        py: 0.5,
        minWidth: { xs: 92, sm: 104 },
        borderRadius: 999,
        fontSize: { xs: '0.75rem', sm: '0.75rem' },
        fontWeight: 800,
        letterSpacing: '0.01em',
        textTransform: 'none',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.6)',
        background:
          mode === 'dev'
            ? 'linear-gradient(90deg, rgba(251,146,60,0.72), rgba(234,88,12,0.75), rgba(185,28,28,0.68))'
            : 'rgba(255,255,255,0.10)',
        boxShadow: mode === 'dev' ? '0 10px 22px rgba(234,88,12,0.3)' : 'none',
        transition: 'all 0.22s ease',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.82)',
          background:
            mode === 'dev'
              ? 'linear-gradient(90deg, rgba(251,146,60,0.8), rgba(234,88,12,0.84), rgba(185,28,28,0.76))'
              : 'rgba(255,255,255,0.18)',
        },
      }}
    >
      <Box component="span">{label}</Box>
    </Button>
  )
}
