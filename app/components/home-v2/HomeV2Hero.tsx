'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { motion, type Variants } from 'framer-motion'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'
const DEMOS_PATH = '/demos'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Hero confiance : glitch Ijipop + une promesse + CTAs — sans carte inset. */
export default function HomeV2Hero() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: 'calc(100dvh - var(--app-bar-height, 64px) - 48px)' },
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 880,
        mx: 'auto',
        pt: { xs: 2, sm: 3 },
        pb: { xs: 4, md: 5 },
        px: { xs: 0.5, sm: 1 },
        overflow: 'visible',
        boxSizing: 'border-box',
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
            textAlign: 'center',
            maxWidth: 720,
            mx: 'auto',
          }}
        >
          <motion.div variants={reducedMotion ? undefined : item}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: { xs: 2.5, md: 3 },
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -48%)',
                    width: '118%',
                    height: '110%',
                    minWidth: 240,
                    minHeight: 100,
                    background: `radial-gradient(ellipse at center, ${v2.brandGlowStrong} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />
                <IjipopGlitchTitle
                  text={t('homeV2.heroTitle')}
                  variant="hero"
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: {
                      xs: 'clamp(3.8rem, 16vw, 5rem)',
                      sm: 'clamp(5rem, 12vw, 6.8rem)',
                      md: 'clamp(5.8rem, 9vw, 7.5rem)',
                    },
                    textAlign: 'center',
                  }}
                />
              </Box>
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
                  sm: 'clamp(1.6rem, 3vw, 2rem)',
                },
                lineHeight: 1.25,
                letterSpacing: '-0.03em',
                color: v2.text,
                mb: 1.5,
              }}
            >
              {t('homeV2.heroHeadline')}
            </Typography>
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: { xs: '1rem', sm: '1.08rem' },
                color: v2.textSecondary,
                maxWidth: 480,
                mx: 'auto',
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
                fontSize: '0.95rem',
                color: v2.text,
                mb: 0.25,
              }}
            >
              {t('homeV2.heroRealName')}
            </Typography>
            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.88rem',
                color: v2.textMuted,
                mb: 0,
              }}
            >
              {t('homeV2.heroOneLiner')}
            </Typography>
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : item}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.25}
              justifyContent="center"
              alignItems="stretch"
              sx={{
                mt: { xs: 3, md: 3.5 },
                maxWidth: { xs: 320, sm: 420 },
                mx: 'auto',
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
      </motion.div>
    </Box>
  )
}
