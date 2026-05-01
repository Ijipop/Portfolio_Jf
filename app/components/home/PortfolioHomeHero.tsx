'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ScramblingText from '@/components/ScramblingText'
import CTAButton from '@/components/shared/CTAButton'
import HeaderSection from '@/components/shared/HeaderSection'
import IjipopGlitchTitle, { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'

export default function PortfolioHomeHero() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [wordIndex, setWordIndex] = useState(0)
  const [scramblePhase, setScramblePhase] = useState<'chaos' | 'settled'>('settled')

  const rotatingWords = [
    t('home.heroRotatingSites'),
    t('home.heroRotatingTools'),
    t('home.heroRotatingInterfaces'),
  ]

  useEffect(() => {
    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setScramblePhase('chaos')
      window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % rotatingWords.length)
        setScramblePhase('settled')
      }, 360)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [reducedMotion, rotatingWords.length])

  const subtitle = (
    <Box sx={{ textAlign: 'center', mt: 0, px: { xs: 1, sm: 0 } }}>
      <Typography
        component="div"
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gap: { xs: 0.35, sm: 0.45 },
          fontWeight: 900,
          fontSize: { xs: 'clamp(1.45rem, 8vw, 2.45rem)', sm: '2.7rem', md: '3.35rem' },
          lineHeight: 1.08,
          letterSpacing: '-0.045em',
          color: textColor,
          mb: { xs: 1.6, sm: 2 },
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'baseline',
            columnGap: { xs: 0.85, sm: 1.15 },
            rowGap: 0.15,
          }}
        >
          <Box component="span">{t('home.heroEditorialPrefix')}</Box>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: { xs: 'min(48vw, 220px)', sm: 220, md: 270 },
              minHeight: '1.12em',
            }}
          >
            <ScramblingText
              text={rotatingWords[wordIndex] ?? rotatingWords[0]}
              enabled={!reducedMotion}
              phase={reducedMotion ? 'settled' : scramblePhase}
              variant="inherit"
              component="span"
              letterSx={{
                backgroundImage: BRAND_GLITCH_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
              sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                backgroundImage: BRAND_GLITCH_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            />
          </Box>
        </Box>
        <Box component="span">{t('home.heroEditorialSuffix')}</Box>
      </Typography>
      <Typography
        component="p"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.12rem', sm: '1.2rem' },
          letterSpacing: '0.01em',
          color: textColor,
          mb: 0.5,
        }}
      >
        {t('home.heroRealName')}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '0.9rem', sm: '0.9375rem' },
          color: textColor,
          opacity: 0.82,
          letterSpacing: '0.02em',
        }}
      >
        {t('home.heroOneLiner')}
      </Typography>
    </Box>
  )

  return (
    <HeaderSection fullViewport title={<IjipopGlitchTitle text={t('home.heroTitle')} variant="hero" />} subtitle={subtitle}>
      <Stack
        direction="column"
        spacing={1.5}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          mt: { xs: 2.25, sm: 2.75 },
          mb: { xs: 0, sm: 0 },
          px: { xs: 1, sm: 0 },
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Link href="/portfolio/contact" style={{ textDecoration: 'none', width: '100%', display: 'flex' }}>
          <CTAButton variant="primary" size="large" fullWidth>
            {t('home.contactMe')}
          </CTAButton>
        </Link>
      </Stack>
    </HeaderSection>
  )
}
