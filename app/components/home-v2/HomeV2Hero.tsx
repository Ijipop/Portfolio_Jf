'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import ScramblingText from '@/components/ScramblingText'
import IjipopGlitchTitle, { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'
const WEB_PROJECTS_PATH = '/portfolio/projets?type=web'

/** Preuves réelles — tuiles égales, images entières (contain), liens sortants. */
const HERO_STACK = [
  {
    src: '/imgs/projets/1776087415283_Thermo.png',
    href: 'https://thermo-trappeur.vercel.app/',
    label: 'Thermo-Trappeur',
    accent: true,
  },
  {
    src: '/imgs/projets/1764967544239_Frigopop4.png',
    href: 'https://frigopop.vercel.app/',
    label: 'FrigoPop',
    accent: false,
  },
  {
    src: '/imgs/images/Overstamp_icon.svg',
    href: 'https://www.overstamp.studio/',
    label: 'Overstamp',
    accent: false,
  },
] as const

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HomeV2Hero() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [wordIndex, setWordIndex] = useState(0)
  const [scramblePhase, setScramblePhase] = useState<'chaos' | 'settled'>('settled')

  /** Vocabulaire lane Web uniquement. */
  const rotatingWords = [t('homeV2.heroRotatingSites'), t('homeV2.heroRotatingInterfaces')]

  const rotatingWordGradient = useMemo(() => BRAND_GLITCH_GRADIENT, [])

  useEffect(() => {
    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setScramblePhase('chaos')
      window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % rotatingWords.length)
        setScramblePhase('settled')
      }, 560)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [reducedMotion, rotatingWords.length])

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: 'calc(100dvh - var(--app-bar-height, 64px))' },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'minmax(0, 1fr) minmax(300px, 360px)',
          xl: 'minmax(0, 1fr) minmax(340px, 400px)',
        },
        alignItems: 'center',
        columnGap: { lg: 5, xl: 8 },
        rowGap: { xs: 3.5, lg: 0 },
        width: '100%',
        maxWidth: { xs: '100%', lg: 1280, xl: 1360 },
        mx: 'auto',
        pt: { xs: 1.5, sm: 2 },
        pb: { xs: 3, md: 4 },
        px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '8%',
          left: { xs: '50%', lg: '22%' },
          transform: 'translateX(-50%)',
          width: 'min(420px, 55vw)',
          height: 'min(280px, 36vh)',
          background: `radial-gradient(ellipse at center, ${v2.brandGlowStrong} 0%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        variants={reducedMotion ? undefined : stagger}
        initial={reducedMotion ? undefined : 'hidden'}
        animate={reducedMotion ? undefined : 'show'}
        style={{ position: 'relative', zIndex: 2, minWidth: 0, maxWidth: '100%' }}
      >
        <Box
          sx={{
            textAlign: { xs: 'center', lg: 'left' },
            maxWidth: { xs: 560, lg: '100%' },
            mx: { xs: 'auto', lg: 0 },
            minWidth: 0,
            overflow: 'hidden',
            containerType: 'inline-size',
          }}
        >
          <motion.div variants={reducedMotion ? undefined : item}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                mb: { xs: 2.5, md: 3 },
                maxWidth: '100%',
                minWidth: 0,
              }}
            >
              <IjipopGlitchTitle
                text={t('homeV2.heroTitle')}
                variant="hero"
                sx={{
                  fontSize: {
                    xs: 'clamp(4.35rem, 18vw, 5.25rem)',
                    sm: 'clamp(5.8rem, 13vw, 7.75rem)',
                    md: 'clamp(6.25rem, 9vw, 8rem)',
                    lg: 'clamp(5.5rem, 18cqi, 7.25rem)',
                    xl: 'clamp(6rem, 16cqi, 7.75rem)',
                  },
                  maxWidth: '100%',
                  mx: { xs: 'auto', lg: 0 },
                  textAlign: { xs: 'center', lg: 'left' },
                  '@media (min-width: 900px) and (max-height: 920px)': {
                    fontSize: 'clamp(5rem, 16cqi, 6.5rem)',
                  },
                  '@media (min-width: 900px) and (max-height: 800px)': {
                    fontSize: 'clamp(4.4rem, 14cqi, 5.6rem)',
                  },
                  '@media (min-width: 900px) and (max-height: 700px)': {
                    fontSize: 'clamp(3.8rem, 12cqi, 4.8rem)',
                  },
                }}
              />
            </Box>
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Typography
              component="div"
              sx={{
                display: 'grid',
                justifyItems: { xs: 'center', lg: 'start' },
                gap: { xs: 0.3, sm: 0.45 },
                fontFamily: v2.fontDisplay,
                fontWeight: 800,
                fontSize: {
                  xs: 'clamp(1.25rem, 5.2vw, 1.75rem)',
                  sm: 'clamp(1.55rem, 3.6vw, 2.1rem)',
                  md: 'clamp(1.75rem, 2.8vw, 2.35rem)',
                },
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: v2.text,
                mb: { xs: 1.75, md: 2 },
              }}
            >
              <Box component="span">{t('homeV2.heroEditorialPrefix')}</Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  width: { xs: 'min(72vw, 280px)', sm: 300, md: 340 },
                  minHeight: '1.15em',
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
                    textAlign: { xs: 'center', lg: 'left' },
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
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: v2.textSecondary,
                maxWidth: 520,
                mx: { xs: 'auto', lg: 0 },
                lineHeight: 1.55,
                mb: 2,
              }}
            >
              {t('homeV2.heroSubtitle')}
            </Typography>
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontWeight: 600,
                fontSize: '1rem',
                color: v2.text,
                mb: 0.35,
              }}
            >
              {t('homeV2.heroRealName')}
            </Typography>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.9rem',
                color: v2.textMuted,
                mb: 0,
                '@media (max-height: 720px)': { display: { md: 'none' } },
              }}
            >
              {t('homeV2.heroOneLiner')}
            </Typography>
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
              alignItems="stretch"
              sx={{
                mt: { xs: 3, md: 3.5 },
                maxWidth: { xs: 300, sm: 320 },
                mx: { xs: 'auto', lg: 0 },
              }}
            >
              <HomeV2Cta href={CONTACT_PATH} variant="primary" size="small" fullWidth>
                {t('homeV2.heroCtaPrimary')}
              </HomeV2Cta>
              <HomeV2Cta href="#forfaits" variant="secondary" size="small" fullWidth>
                {t('homeV2.heroCtaSecondary')}
              </HomeV2Cta>
            </Stack>
            <Box
              component="a"
              href={WEB_PROJECTS_PATH}
              sx={{
                display: 'inline-block',
                mt: 1.5,
                fontFamily: v2.fontBody,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: v2.textSecondary,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': { color: v2.brandOrangeLight },
              }}
            >
              {t('homeV2.heroSeeWebProjects')} →
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ position: 'relative', zIndex: 3, minWidth: 0, width: '100%', alignSelf: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 420, lg: 'none' },
            mx: { xs: 'auto', lg: 0 },
            borderRadius: { xs: '20px', lg: '24px' },
            overflow: 'hidden',
            isolation: 'isolate',
            border: `1px solid ${v2.border}`,
            background: `linear-gradient(160deg, ${v2.surface} 0%, ${v2.bg} 100%)`,
            boxShadow: `0 28px 64px rgba(0,0,0,0.32)`,
            p: { xs: 1.25, md: 1.5 },
          }}
        >
          <Box
            component="nav"
            aria-label="Projets en vitrine"
            sx={{
              display: 'grid',
              gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
              gap: { xs: 1.25, lg: 1.5 },
              height: {
                xs: 380,
                sm: 460,
                lg: 'min(580px, 66vh)',
                xl: 'min(640px, 68vh)',
              },
            }}
          >
            {HERO_STACK.map((panel) => (
              <Box
                key={panel.href}
                component="a"
                href={panel.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${panel.label} — ouvrir le site`}
                sx={{
                  position: 'relative',
                  minHeight: 0,
                  minWidth: 0,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: `1px solid ${v2.border}`,
                  bgcolor: v2.surface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 1, md: 1.25 },
                  textDecoration: 'none',
                  color: 'inherit',
                  transition:
                    'border-color 0.25s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease',
                  '&:hover': {
                    borderColor: v2.borderHover,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 28px ${v2.brandGlow}`,
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${v2.brandOrange}`,
                    outlineOffset: 2,
                  },
                }}
              >
                {panel.accent ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      zIndex: 2,
                      background: BRAND_GLITCH_GRADIENT,
                    }}
                  />
                ) : null}
                <Box
                  component="img"
                  src={panel.src}
                  alt=""
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}
