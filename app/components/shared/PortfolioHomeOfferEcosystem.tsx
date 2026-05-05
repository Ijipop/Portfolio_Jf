'use client'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useRef, useState, type Ref } from 'react'
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
  const hoverPrompt = t('home.servicesEcosystemDemo2Hover')
  const [demoHovered, setDemoHovered] = useState(false)
  const displayCaption = demoHovered ? hoverPrompt : caption

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
            fontSize: { xs: '0.88rem', sm: '0.9rem', lg: '0.86rem' },
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
            gap: { xs: 1, lg: 0.75 },
            justifyContent: 'center',
            mb: { xs: 2.5, lg: 2 },
          }}
        >
          {BONUS_KEYS.map((key) => (
            <Chip
              key={key}
              label={t(key)}
              size="small"
              variant="outlined"
              sx={{
                borderColor: { xs: 'transparent', sm: alpha(primary, 0.45) },
                bgcolor: { xs: alpha(primary, 0.07), sm: 'transparent' },
                color: textColor,
                fontWeight: 600,
                fontSize: { xs: '0.78rem', sm: '0.78rem', lg: '0.72rem', xl: '0.7rem' },
                '&:hover': {
                  bgcolor: { xs: alpha(primary, 0.11), sm: alpha(primary, 0.04) },
                  borderColor: { xs: 'transparent', sm: alpha(primary, 0.55) },
                },
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: '100%',
            textAlign: 'left',
          }}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
        >
          <Box
            ref={containerRef}
            sx={{
              width: '100%',
              /* Mobile : 16:9 naturel. À partir de md : pleine largeur + hauteur en clamp (un peu plus haut
                 pour mieux voir la vidéo, plafond maîtrisé pour ne pas dominer un laptop 768px de haut). */
              aspectRatio: { xs: '16 / 9', md: 'unset' },
              height: {
                xs: 'auto',
                md: 'clamp(264px, 35vw, 448px)',
                lg: 'clamp(272px, 32vw, 468px)',
                xl: 'clamp(276px, 29vw, 460px)',
              },
              position: 'relative',
              borderRadius: { xs: '28px', sm: `${DESIGN_TOKENS.borderRadius.medium}px` },
              overflow: 'hidden',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0a0a0a' : '#0f0f0f'),
              cursor: 'default',
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
              title={displayCaption}
              aria-label={displayCaption}
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Box>

          <Typography
            component="p"
            sx={{
              mt: 1.5,
              mb: 0,
              color: textColor,
              opacity: demoHovered ? 0.92 : 0.72,
              fontSize: { xs: '0.78rem', sm: '0.8rem' },
              lineHeight: 1.45,
              textAlign: 'left',
              transition: 'opacity 0.2s ease',
            }}
          >
            {displayCaption}
          </Typography>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
