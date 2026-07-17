'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useMemo, useState } from 'react'
import ScramblingText from '@/components/ScramblingText'
import IjipopGlitchTitle, { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

const heroViewportHeight = 'calc(100dvh - var(--app-bar-height, 64px))'

export default function HomeV2Hero() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [wordIndex, setWordIndex] = useState(0)
  const [scramblePhase, setScramblePhase] = useState<'chaos' | 'settled'>('settled')

  const rotatingWords = [
    t('homeV2.heroRotatingSites'),
    t('homeV2.heroRotatingTools'),
    t('homeV2.heroRotatingSoftware'),
    t('homeV2.heroRotatingInterfaces'),
  ]

  const rotatingWordGradient = useMemo(() => BRAND_GLITCH_GRADIENT, [])

  useEffect(() => {
    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setScramblePhase('chaos')
      window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % rotatingWords.length)
        setScramblePhase('settled')
      }, 560)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [reducedMotion, rotatingWords.length])

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: heroViewportHeight,
        minHeight: heroViewportHeight,
        maxHeight: heroViewportHeight,
        '@supports (height: 100dvh)': {
          height: heroViewportHeight,
          minHeight: heroViewportHeight,
          maxHeight: heroViewportHeight,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        pt: { xs: 1, sm: 1.5 },
        px: { xs: 2, sm: 3 },
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(600px, 90vw)',
          height: 'min(400px, 50vh)',
          background: `radial-gradient(ellipse at center, ${v2.brandGlowStrong} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          minHeight: 0,
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          pb: { xs: 1, sm: 1.5 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            mb: { xs: 5, md: 6 },
            overflow: 'visible',
            '@media (max-height: 920px)': { mb: 2.5 },
            '@media (max-height: 800px)': { mb: 2 },
            '@media (max-height: 680px)': { mb: 1.5 },
            '@media (max-height: 500px)': { mb: 1 },
          }}
        >
          <IjipopGlitchTitle text={t('homeV2.heroTitle')} variant="hero" />
        </Box>

        <Typography
          component="div"
          sx={{
            display: 'grid',
            justifyItems: 'center',
            gap: { xs: 0.3, sm: 0.5 },
            fontWeight: 800,
            fontSize: {
              xs: 'clamp(1.2rem, 5.5vw, 1.75rem)',
              sm: 'clamp(1.6rem, 4vw, 2.25rem)',
              md: 'clamp(1.85rem, 3.2vw, 2.5rem)',
            },
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: v2.text,
            mb: { xs: 2, md: 2.5 },
            '@media (min-width: 900px) and (max-height: 900px)': {
              mb: 1.25,
              fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)',
            },
            '@media (max-height: 900px)': {
              mb: 1.25,
            },
            '@media (max-height: 760px)': {
              mb: 1,
            },
            '@media (max-height: 680px)': {
              mb: 0.75,
            },
            '@media (max-height: 500px)': {
              mb: 0.5,
              fontSize: 'clamp(1rem, 4.5vw, 1.35rem)',
              gap: 0.2,
            },
          }}
        >
          <Box component="span">{t('homeV2.heroEditorialPrefix')}</Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              width: { xs: 'min(72vw, 280px)', sm: 300, md: 340 },
              minHeight: '1.15em',
              mx: 'auto',
            }}
          >
            <ScramblingText
              text={rotatingWords[wordIndex] ?? rotatingWords[0]}
              enabled={!reducedMotion}
              phase={reducedMotion ? 'settled' : scramblePhase}
              variant="inherit"
              component="span"
              letterSx={{
                backgroundImage: rotatingWordGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
              sx={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                backgroundImage: rotatingWordGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            />
          </Box>
          <Box component="span">{t('homeV2.heroEditorialSuffix')}</Box>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem' },
            color: v2.textSecondary,
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.55,
            mb: 2,
            '@media (max-height: 900px)': {
              mb: 1.25,
              fontSize: '0.98rem',
            },
            '@media (max-height: 760px)': {
              mb: 1,
              fontSize: '0.92rem',
            },
            '@media (max-height: 680px)': {
              mb: 0.75,
              fontSize: '0.88rem',
            },
            '@media (max-height: 500px)': {
              mb: 0.5,
              fontSize: '0.82rem',
              lineHeight: 1.4,
            },
          }}
        >
          {t('homeV2.heroSubtitle')}
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: v2.text,
            mb: 0.5,
            '@media (max-height: 900px)': {
              fontSize: '0.95rem',
              mb: 0.35,
            },
            '@media (max-height: 760px)': {
              fontSize: '0.9rem',
              mb: 0.25,
            },
            '@media (max-height: 680px)': {
              fontSize: '0.86rem',
              mb: 0,
            },
            '@media (max-height: 500px)': {
              fontSize: '0.8rem',
            },
          }}
        >
          {t('homeV2.heroRealName')}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.9rem',
            color: v2.textMuted,
            mb: 0,
            '@media (max-height: 900px)': {
              fontSize: '0.84rem',
            },
            '@media (max-height: 800px)': {
              display: 'none',
            },
          }}
        >
          {t('homeV2.heroOneLiner')}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          flexShrink: 0,
          width: '100%',
          maxWidth: 440,
          mx: 'auto',
          pt: { xs: 1.5, sm: 2 },
          pb: 'max(16px, env(safe-area-inset-bottom, 0px))',
          '@media (max-height: 900px)': {
            pt: 1.25,
          },
          '@media (max-height: 500px)': {
            pt: 1,
            pb: 'max(12px, env(safe-area-inset-bottom, 0px))',
          },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          justifyContent="center"
          alignItems="stretch"
        >
          <HomeV2Cta href={CONTACT_PATH} variant="primary" size="large" fullWidth>
            {t('homeV2.heroCtaPrimary')}
          </HomeV2Cta>
          <HomeV2Cta href="#forfaits" variant="secondary" size="large" fullWidth>
            {t('homeV2.heroCtaSecondary')}
          </HomeV2Cta>
        </Stack>
      </Box>
    </Box>
  )
}
