'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useEffect, useRef, type Ref } from 'react'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'

const DEMO_SRC = '/img/demo1.mp4'

type Props = { compact?: boolean }

export default function ContactCoffeeVideo({ compact = false }: Props) {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const theme = useTheme()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const invite = t('contact.coffeeInvite')

  useEffect(() => {
    const video = videoRef.current
    const root = containerRef.current
    if (!video || !root || reducedMotion) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(root)
    return () => obs.disconnect()
  }, [reducedMotion])

  return (
    <Box
      ref={containerRef}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: compact ? 3 : 4,
        mb: compact ? 4 : 6,
        px: { xs: 0, sm: 0 },
      }}
    >
      <Typography
        component="p"
        sx={{
          textAlign: 'center',
          color: textColor,
          fontWeight: 700,
          fontSize: { xs: '1rem', sm: '1.08rem' },
          lineHeight: 1.45,
          mb: compact ? 1.5 : 2,
          opacity: 0.92,
        }}
      >
        {invite}
      </Typography>
      <Box
        sx={{
          borderRadius: { xs: '28px', sm: `${DESIGN_TOKENS.borderRadius.medium}px` },
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          bgcolor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#0f0f0f',
        }}
      >
        <Box
          component="video"
          ref={videoRef as Ref<HTMLVideoElement>}
          src={DEMO_SRC}
          muted
          loop
          playsInline
          preload="metadata"
          controls
          autoPlay={!reducedMotion}
          aria-label={invite}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  )
}
