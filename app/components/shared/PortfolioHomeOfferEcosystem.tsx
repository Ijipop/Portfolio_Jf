'use client'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useRef, type Ref } from 'react'
import ScrollReveal from './ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const DEMO2_SRC = '/img/demo2.mp4'

const BONUS_KEYS = [
  'home.servicesEcosystemBonus1',
  'home.servicesEcosystemBonus2',
  'home.servicesEcosystemBonus3',
  'home.servicesEcosystemBonus4',
  'home.servicesEcosystemBonus5',
] as const

export default function PortfolioHomeOfferEcosystem() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const caption = t('home.servicesEcosystemDemo2Caption')

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
      { threshold: 0.2 }
    )
    obs.observe(root)
    return () => obs.disconnect()
  }, [reducedMotion])

  return (
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        sx={{
          width: '100%',
          mt: { xs: 3, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography
          component="p"
          sx={{
            color: textColor,
            opacity: 0.78,
            fontSize: { xs: '0.88rem', sm: '0.9rem' },
            lineHeight: 1.5,
            mb: 1.5,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          {t('home.servicesEcosystemBonusLabel')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          {BONUS_KEYS.map((key) => (
            <Chip
              key={key}
              label={t(key)}
              size="small"
              variant="outlined"
              sx={{
                borderColor: alpha(primary, 0.45),
                color: textColor,
                fontWeight: 600,
                fontSize: '0.78rem',
              }}
            />
          ))}
        </Box>

        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: DESIGN_TOKENS.borderRadius.medium,
              overflow: 'hidden',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0a0a0a' : '#0f0f0f'),
            }}
          >
            <Box
              component="video"
              ref={videoRef as Ref<HTMLVideoElement>}
              src={DEMO2_SRC}
              muted
              loop
              playsInline
              preload="metadata"
              controls
              autoPlay={!reducedMotion}
              title={caption}
              aria-label={caption}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            component="p"
            sx={{
              mt: 1.5,
              mb: 0,
              color: textColor,
              opacity: 0.72,
              fontSize: { xs: '0.78rem', sm: '0.8rem' },
              lineHeight: 1.45,
              textAlign: 'left',
            }}
          >
            {caption}
          </Typography>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
