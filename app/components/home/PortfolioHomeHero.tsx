'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import ScramblingText from '@/components/ScramblingText'
import CTAButton from '@/components/shared/CTAButton'
import HeaderSection from '@/components/shared/HeaderSection'
import IjipopGlitchTitle, { BRAND_GLITCH_GRADIENT, buildPaletteGlitchGradient } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { deferUntilIdle } from '@/utils/deferUntilIdle'
import { loadGsapWithScrollTrigger } from '@/utils/gsapScrollTrigger'

export default function PortfolioHomeHero() {
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [scramblePhase, setScramblePhase] = useState<'chaos' | 'settled'>('settled')
  const rotatingWordGradient = useMemo(
    () =>
      presentationMode === 'beige'
        ? BRAND_GLITCH_GRADIENT
        : buildPaletteGlitchGradient(primary, secondary, accent),
    [presentationMode, primary, secondary, accent]
  )

  const rotatingWords = [
    t('home.heroRotatingSites'),
    t('home.heroRotatingTools'),
    t('home.heroRotatingSoftware'),
    t('home.heroRotatingInterfaces'),
  ]

  useLayoutEffect(() => {
    if (reducedMotion) return
    const el = heroSectionRef.current
    if (!el) return

    let cancelled = false
    let revert: (() => void) | undefined

    const cancelDefer = deferUntilIdle(() => {
      if (cancelled) return

      void loadGsapWithScrollTrigger().then(({ gsap }) => {
        if (cancelled) return

        const ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { y: 0, opacity: 1 },
            {
              y: 48,
              opacity: 0.8,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 80px',
                end: '+=420',
                scrub: 0.5,
              },
            },
          )
        }, el)

        revert = () => ctx.revert()
      })
    }, 900)

    return () => {
      cancelled = true
      cancelDefer()
      revert?.()
    }
  }, [reducedMotion])

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

  const subtitle = (
    <Box sx={{ textAlign: 'center', mt: 0, px: { xs: 1, sm: 0 } }}>
      <Typography
        component="div"
        sx={{
          display: 'grid',
          justifyItems: 'center',
          gap: { xs: 0.22, sm: 0.45 },
          fontWeight: 850,
          fontSize: {
            xs: 'clamp(1.34rem, 6.75vw, 2.08rem)',
            sm: 'clamp(2.15rem, 6vw, 2.7rem)',
            md: 'clamp(2.45rem, 4.2vw, 3rem)',
            lg: 'clamp(2.85rem, 3.4vw, 3.35rem)',
            xl: 'clamp(3.1rem, 2.8vw, 3.6rem)',
          },
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          color: textColor,
          mb: { xs: 1.15, sm: 2 },
          '@media (max-width: 599.95px) and (max-height: 760px)': {
            fontSize: 'clamp(1.26rem, 6.25vw, 1.92rem)',
            gap: 0.12,
            mb: 0.9,
          },
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          {t('home.heroEditorialPrefix')}
        </Box>
        <Box
          component="div"
          sx={{
            display: 'block',
            width: { xs: 'min(78vw, 300px)', sm: 330, md: 390, lg: 430, xl: 480 },
            minHeight: '1.12em',
            mx: 'auto',
            textAlign: 'center',
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
        <Box component="div">{t('home.heroEditorialSuffix')}</Box>
      </Typography>
      <Typography
        component="p"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.03rem', sm: '1.2rem' },
          letterSpacing: '0.01em',
          color: textColor,
          mb: 0.35,
        }}
      >
        {t('home.heroRealName')}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '0.84rem', sm: '0.9375rem' },
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
    <HeaderSection ref={heroSectionRef} fullViewport title={<IjipopGlitchTitle text={t('home.heroTitle')} variant="hero" />} subtitle={subtitle}>
      <Stack
        direction="column"
        spacing={1.5}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          mt: { xs: 'auto', sm: 2.75 },
          mb: { xs: 0, sm: 0 },
          pt: { xs: 2, sm: 0 },
          px: { xs: 1, sm: 0 },
          width: '100%',
          maxWidth: { xs: 400, lg: 460, xl: 520 },
          mx: 'auto',
          '@media (min-width: 900px) and (max-height: 820px)': {
            mt: 2,
          },
          '@media (min-width: 900px) and (max-height: 680px)': {
            mt: 1.25,
          },
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
