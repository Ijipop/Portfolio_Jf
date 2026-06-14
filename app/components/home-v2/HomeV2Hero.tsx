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
import { HOME_V2 } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

export default function HomeV2Hero() {
  const { t } = useLanguage()
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
        minHeight: { xs: 'auto', md: '85vh' },
        maxHeight: { md: '900px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pt: { xs: 3, sm: 4, md: 5 },
        pb: { xs: 6, md: 8 },
        px: 0,
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
          background: `radial-gradient(ellipse at center, ${HOME_V2.brandGlowStrong} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 800 }}>
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
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
            color: HOME_V2.text,
            mb: { xs: 2, md: 2.5 },
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
            color: HOME_V2.textSecondary,
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.55,
            mb: 2,
          }}
        >
          {t('homeV2.heroSubtitle')}
        </Typography>

        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: HOME_V2.text, mb: 0.5 }}>
          {t('homeV2.heroRealName')}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: HOME_V2.textMuted, mb: { xs: 3, md: 4 } }}>
          {t('homeV2.heroOneLiner')}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          justifyContent="center"
          alignItems="stretch"
          sx={{ maxWidth: 440, mx: 'auto' }}
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
