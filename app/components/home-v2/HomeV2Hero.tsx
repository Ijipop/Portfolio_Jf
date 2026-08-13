'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, type Variants } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import SiteBrowserMockup from '@/components/shared/SiteBrowserMockup'
import { useLanguage } from '@/contexts/LanguageContext'
import HomePortraitAvatar from './HomePortraitAvatar'
import HomeV2Cta from './HomeV2Cta'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'
const DEMOS_PATH = '/demos'
const AFTER_HERO_ID = 'portfolio-after-hero'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/** iPad portrait+ : split desktop sans attendre MUI md (900). */
const TABLET_SPLIT = '@media (min-width: 768px) and (min-height: 700px)'

/** Hero studio : glitch plus petit, preuve visuelle, portrait réel. */
export default function HomeV2Hero() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToAfterHero = useCallback(() => {
    const target = document.getElementById(AFTER_HERO_ID)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [])

  return (
    <Box
      component="section"
      data-testid="home-v2-hero"
      sx={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 1120,
        mx: 'auto',
        pt: { xs: 1.5, sm: 2 },
        pb: { xs: 5.5, md: 6 },
        px: { xs: 0.5, sm: 1 },
        overflow: 'visible',
        boxSizing: 'border-box',
        minHeight: 0,
        '@media (max-height: 480px)': {
          alignItems: 'flex-start',
          pt: 0.75,
          pb: 1.25,
        },
      }}
    >
      <motion.div
        variants={reducedMotion ? undefined : stagger}
        initial={reducedMotion ? undefined : 'hidden'}
        animate={reducedMotion ? undefined : 'show'}
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: { xs: 2.5, md: 4 },
            alignItems: 'center',
            [TABLET_SPLIT]: {
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.95fr)',
              gap: 4,
            },
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              [TABLET_SPLIT]: { textAlign: 'left' },
            }}
          >
            <motion.div variants={reducedMotion ? undefined : item}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: { xs: 1.5, md: 2 },
                  [TABLET_SPLIT]: { justifyContent: 'flex-start' },
                  '@media (max-height: 480px)': { mb: 0.75 },
                }}
              >
                <IjipopGlitchTitle
                  text={t('homeV2.heroTitle')}
                  variant="hero"
                  sx={{
                    fontSize: {
                      xs: 'clamp(2.8rem, 12vw, 3.6rem)',
                      sm: 'clamp(3.2rem, 8vw, 4.2rem)',
                      md: 'clamp(3.4rem, 5vw, 4.6rem)',
                    },
                    textAlign: 'center',
                    mx: 'auto',
                    [TABLET_SPLIT]: {
                      textAlign: 'left',
                      mx: 0,
                    },
                    '@media (max-height: 480px)': {
                      fontSize: 'clamp(2.2rem, 8vh, 2.8rem) !important',
                    },
                  }}
                />
              </Box>
            </motion.div>

            <motion.div variants={reducedMotion ? undefined : item}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: v2.fontDisplay,
                  fontWeight: 700,
                  fontSize: {
                    xs: 'clamp(1.35rem, 4.5vw, 1.75rem)',
                    sm: 'clamp(1.55rem, 2.6vw, 1.95rem)',
                  },
                  lineHeight: 1.22,
                  letterSpacing: '-0.03em',
                  color: v2.text,
                  mb: 1.25,
                  maxWidth: '22ch',
                  mx: 'auto',
                  [TABLET_SPLIT]: { mx: 0 },
                  '@media (max-height: 480px)': {
                    fontSize: '1.05rem',
                    mb: 0.5,
                    lineHeight: 1.2,
                  },
                }}
              >
                {t('homeV2.heroHeadline')}
              </Typography>
            </motion.div>

            <motion.div variants={reducedMotion ? undefined : item}>
              <Typography
                sx={{
                  fontFamily: v2.fontBody,
                  fontSize: { xs: '1rem', sm: '1.05rem' },
                  color: v2.textSecondary,
                  maxWidth: 460,
                  mx: 'auto',
                  [TABLET_SPLIT]: { mx: 0 },
                  lineHeight: 1.55,
                  mb: 1.75,
                  '@media (max-height: 480px)': {
                    fontSize: '0.88rem',
                    lineHeight: 1.35,
                    mb: 0.75,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
                }}
              >
                {t('homeV2.heroSubtitle')}
              </Typography>
            </motion.div>

            <motion.div variants={reducedMotion ? undefined : item}>
              <Stack
                direction="row"
                spacing={1.25}
                alignItems="center"
                justifyContent="center"
                sx={{
                  mb: 0.25,
                  [TABLET_SPLIT]: { justifyContent: 'flex-start' },
                  '@media (max-height: 480px)': { mb: 0 },
                }}
              >
                <HomePortraitAvatar alt={t('about.photoPortraitAlt')} />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      fontFamily: v2.fontBody,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: v2.text,
                      lineHeight: 1.2,
                      '@media (max-height: 480px)': { fontSize: '0.8rem' },
                    }}
                  >
                    {t('homeV2.heroRealName')}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: v2.fontBody,
                      fontSize: '0.82rem',
                      color: v2.textMuted,
                      '@media (max-height: 480px)': { display: 'none' },
                    }}
                  >
                    {t('homeV2.heroOneLiner')}
                  </Typography>
                </Box>
              </Stack>
            </motion.div>

            <motion.div variants={reducedMotion ? undefined : item}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.25}
                justifyContent="center"
                alignItems="stretch"
                sx={{
                  mt: { xs: 2.5, md: 3 },
                  maxWidth: { xs: 320, sm: 420 },
                  mx: 'auto',
                  [TABLET_SPLIT]: {
                    justifyContent: 'flex-start',
                    mx: 0,
                  },
                  '@media (max-height: 480px)': {
                    mt: 1,
                    flexDirection: 'row',
                    maxWidth: 400,
                    gap: 1,
                  },
                }}
              >
                <HomeV2Cta href={CONTACT_PATH} variant="primary" size="small" fullWidth>
                  {t('homeV2.heroCtaPrimary')}
                </HomeV2Cta>
                <HomeV2Cta href={DEMOS_PATH} variant="secondary" size="small" fullWidth>
                  {t('homeV2.heroCtaSecondary')}
                </HomeV2Cta>
              </Stack>
            </motion.div>
          </Box>

          <Box
            sx={{
              display: 'none',
              [TABLET_SPLIT]: { display: 'block' },
              '@media (max-height: 480px)': { display: 'none' },
            }}
          >
            <motion.div variants={reducedMotion ? undefined : item}>
              <SiteBrowserMockup
                alt={t('homeV2.heroProofCaption')}
                caption={t('homeV2.heroProofCaption')}
              />
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      <Box
        component="button"
        type="button"
        onClick={scrollToAfterHero}
        aria-label={t('homeV2.heroScrollAria')}
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: { xs: 10, md: 14 },
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.75,
          m: 0,
          p: 0.5,
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: v2.fontBody,
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: v2.textMuted,
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition: 'opacity 0.35s ease, color 0.2s ease',
          WebkitTapHighlightColor: 'transparent',
          '&:hover, &:focus-visible': {
            color: v2.brandOrange,
            outline: 'none',
          },
          '&:focus-visible': {
            boxShadow: `0 0 0 2px ${v2.brandOrange}66`,
            borderRadius: 1,
          },
          '@media (max-height: 560px)': { display: 'none' },
          '@media (prefers-reduced-motion: reduce)': {
            '& .home-v2-scroll-dot': { animation: 'none' },
          },
        }}
      >
        <Box component="span">{t('homeV2.heroScrollLabel')}</Box>
        <Box
          aria-hidden
          sx={{
            position: 'relative',
            width: 2,
            height: { xs: 40, md: 52 },
            background: `linear-gradient(to bottom, ${v2.brandOrange}bf, transparent)`,
            overflow: 'visible',
          }}
        >
          <Box
            className="home-v2-scroll-dot"
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 9,
              height: 9,
              ml: '-4.5px',
              borderRadius: '50%',
              backgroundColor: v2.brandOrange,
              boxShadow: `0 0 0 3px ${v2.brandOrange}33, 0 0 14px ${v2.brandOrange}99`,
              animation: 'homeV2ScrollDot 1.4s cubic-bezier(0.45, 0, 0.25, 1) infinite',
              '@keyframes homeV2ScrollDot': {
                '0%': { transform: 'translateY(0)', opacity: 1 },
                '70%': { opacity: 1 },
                '100%': { transform: 'translateY(40px)', opacity: 0 },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
