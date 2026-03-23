'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '../hooks/useThemeColors'
import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect, useCallback } from 'react'

const INTRO_DURATION_MS = 2800
const SPLIT_DURATION_S = 1.15
const FADE_DURATION_S = 0.5
const SPLIT_EASE = [0.25, 0.46, 0.45, 0.94] as const

// Style commun pour forcer une couche GPU et limiter les repaints (évite le flicker sur mobile)
const panelLayerStyle = { transform: 'translateZ(0)' as const }

interface SignatureIntroProps {
  onComplete: () => void
}

export default function SignatureIntro({ onComplete }: SignatureIntroProps) {
  const { primary, secondary } = useThemeColors()
  const { t } = useLanguage()
  const [isOpening, setIsOpening] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [useSimpleFade, setUseSimpleFade] = useState(false)

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setUseSimpleFade(isMobile || prefersReducedMotion)
  }, [])

  const startOpening = useCallback(() => {
    if (isOpening) return
    setIsOpening(true)
  }, [isOpening])

  useEffect(() => {
    const timer = setTimeout(startOpening, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [startOpening])

  const handleAnimationComplete = useCallback(() => {
    if (hasCompleted) return
    setHasCompleted(true)
    onComplete()
  }, [onComplete, hasCompleted])

  const gradientBg = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`

  // Variante mobile / reduced-motion : un seul overlay en fade (moins de charge GPU)
  if (useSimpleFade) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: DESIGN_TOKENS.zIndex.introOverlay,
          overflow: 'hidden',
          pointerEvents: isOpening ? 'none' : 'auto',
          minHeight: '100vh',
          '@supports (height: 100dvh)': { minHeight: '100dvh' },
        }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          transition={{ duration: FADE_DURATION_S, ease: SPLIT_EASE }}
          onAnimationComplete={
            isOpening
              ? () => setTimeout(() => handleAnimationComplete(), 100)
              : undefined
          }
          style={{
            position: 'absolute',
            inset: 0,
            background: gradientBg,
            zIndex: 1,
            ...panelLayerStyle,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            Jean-François Lefebvre
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 3, pointerEvents: 'auto' }}>
          <Button
            onClick={startOpening}
            aria-label={t('intro.skip')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.5)',
              '&:hover': {
                color: 'white',
                borderColor: 'rgba(255,255,255,0.9)',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {t('intro.skip')}
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: DESIGN_TOKENS.zIndex.introOverlay,
        overflow: 'hidden',
        pointerEvents: isOpening ? 'none' : 'auto',
        minHeight: '100vh',
        '@supports (height: 100dvh)': { minHeight: '100dvh' },
      }}
      aria-hidden="true"
    >
      {/* Left panel – slides left (couche GPU pour éviter flicker) */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '-100%' : 0 }}
        transition={{
          duration: SPLIT_DURATION_S,
          ease: SPLIT_EASE,
        }}
        onAnimationComplete={isOpening ? handleAnimationComplete : undefined}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background: gradientBg,
          zIndex: 1,
          ...panelLayerStyle,
        }}
      />
      {/* Right panel – slides right (couche GPU) */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '100%' : 0 }}
        transition={{
          duration: SPLIT_DURATION_S,
          ease: SPLIT_EASE,
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background: gradientBg,
          zIndex: 1,
          ...panelLayerStyle,
        }}
      />

      {/* Centered name + Skip (on top of panels); fades out when opening */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <AnimatePresence mode="wait">
            {!isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  Jean-François Lefebvre
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Skip button – top right, clickable */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 3,
          pointerEvents: 'auto',
        }}
      >
        <Button
          onClick={startOpening}
          aria-label={t('intro.skip')}
          sx={{
            color: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(255,255,255,0.5)',
            '&:hover': {
              color: 'white',
              borderColor: 'rgba(255,255,255,0.9)',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {t('intro.skip')}
        </Button>
      </Box>
    </Box>
  )
}
