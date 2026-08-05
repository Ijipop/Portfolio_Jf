'use client'

import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DESIGN_TOKENS } from '@/design-system/constants'

const PORTRAIT_MAX_WIDTH = 340
const PORTRAIT_ASPECT = '3 / 4'
const PORTRAIT_INTERVAL_MS = 5200

/** Vraie photo d’abord, puis pixel 8 bits — alternance lente. */
const PORTRAITS = [
  { src: '/img/Jf.jpg', pixelated: false },
  { src: '/img/moi8bit.png', pixelated: true },
] as const

type AboutPortraitLoopProps = {
  alt: string
}

export default function AboutPortraitLoop({ alt }: AboutPortraitLoopProps) {
  const theme = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const intervalMs = prefersReducedMotion ? PORTRAIT_INTERVAL_MS * 1.5 : PORTRAIT_INTERVAL_MS

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PORTRAITS.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [prefersReducedMotion])

  const portrait = PORTRAITS[activeIndex]
  const portraitSizes = `(max-width: 600px) min(100vw, ${PORTRAIT_MAX_WIDTH}px), ${PORTRAIT_MAX_WIDTH}px`
  const portraitRadiusPx = `${DESIGN_TOKENS.borderRadius.small}px`

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: PORTRAIT_MAX_WIDTH,
        aspectRatio: PORTRAIT_ASPECT,
        borderRadius: portraitRadiusPx,
        overflow: 'hidden',
        boxShadow: (muiTheme) =>
          muiTheme.palette.mode === 'dark'
            ? `0 18px 42px ${alpha('#000', 0.45)}`
            : `0 18px 38px ${alpha('#0f172a', 0.14)}`,
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.22)}`,
        },
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <Box
          key={portrait.src}
          component={motion.div}
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: 'blur(10px)' }
          }
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(8px)' }
          }
          transition={{
            duration: prefersReducedMotion ? 0.6 : 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          sx={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src={portrait.src}
            alt={alt}
            fill
            sizes={portraitSizes}
            priority={activeIndex === 0}
            unoptimized={portrait.pixelated}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: portraitRadiusPx,
              imageRendering: portrait.pixelated ? 'pixelated' : 'auto',
            }}
          />
        </Box>
      </AnimatePresence>

      {!prefersReducedMotion && (
        <Box
          component={motion.div}
          aria-hidden
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
            mixBlendMode: 'soft-light',
          }}
        />
      )}
    </Box>
  )
}
