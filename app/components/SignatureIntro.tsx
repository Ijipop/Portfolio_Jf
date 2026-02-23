'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeColors } from '../hooks/useThemeColors'
import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect, useCallback } from 'react'

const INTRO_DURATION_MS = 2800
const SPLIT_DURATION_S = 0.85

interface SignatureIntroProps {
  onComplete: () => void
}

export default function SignatureIntro({ onComplete }: SignatureIntroProps) {
  const { primary, secondary } = useThemeColors()
  const { t } = useLanguage()
  const [isOpening, setIsOpening] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

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

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: isOpening ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      {/* Left panel – slides left */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '-100%' : 0 }}
        transition={{
          duration: SPLIT_DURATION_S,
          ease: [0.4, 0, 0.2, 1],
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
        }}
      />
      {/* Right panel – slides right */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '100%' : 0 }}
        transition={{
          duration: SPLIT_DURATION_S,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          background: gradientBg,
          zIndex: 1,
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
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
