'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewCta from './PreviewCta'
import { PREVIEW, PREVIEW_ORANGE_GRADIENT } from './previewTokens'

const CONTACT_PATH = '/portfolio/contact'
const WEB_PROJECTS_PATH = '/portfolio/projets?type=web'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function PreviewHero() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const words = [t('homeV2.heroRotatingSites'), t('homeV2.heroRotatingInterfaces')]
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [reduced, words.length])

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: { xs: '92dvh', md: '100dvh' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' },
        alignItems: 'stretch',
        gap: { xs: 4, lg: 0 },
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <motion.div
        variants={reduced ? undefined : stagger}
        initial={reduced ? undefined : 'hidden'}
        animate={reduced ? undefined : 'show'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box sx={{ pr: { lg: 6 } }}>
          <motion.div variants={reduced ? undefined : item}>
            <Typography
              component="h1"
              sx={{
                fontFamily: PREVIEW.fontDisplay,
                fontWeight: 800,
                fontSize: { xs: 'clamp(3.2rem, 14vw, 5.5rem)', md: 'clamp(4.5rem, 8vw, 7rem)' },
                letterSpacing: '-0.06em',
                lineHeight: 0.92,
                background: PREVIEW_ORANGE_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                mb: { xs: 3, md: 4 },
              }}
            >
              {t('homeV2.heroTitle')}
            </Typography>
          </motion.div>

          <motion.div variants={reduced ? undefined : item}>
            <Typography
              component="p"
              sx={{
                fontFamily: PREVIEW.fontDisplay,
                fontWeight: 600,
                fontSize: { xs: 'clamp(1.35rem, 4.5vw, 1.85rem)', md: 'clamp(1.7rem, 2.6vw, 2.35rem)' },
                letterSpacing: '-0.035em',
                lineHeight: 1.18,
                color: PREVIEW.text,
                mb: 2,
              }}
            >
              {t('homeV2.heroEditorialPrefix')}{' '}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  minWidth: '7.5ch',
                  background: PREVIEW_ORANGE_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {words[wordIndex]}
              </Box>{' '}
              {t('homeV2.heroEditorialSuffix')}
            </Typography>
          </motion.div>

          <motion.div variants={reduced ? undefined : item}>
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: { xs: '1.05rem', md: '1.15rem' },
                color: PREVIEW.textSecondary,
                lineHeight: 1.6,
                maxWidth: 480,
                mb: 2.5,
              }}
            >
              {t('homeV2.heroSubtitle')}
            </Typography>
          </motion.div>

          <motion.div variants={reduced ? undefined : item}>
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontWeight: 600,
                fontSize: '1rem',
                color: PREVIEW.text,
                mb: 0.35,
              }}
            >
              {t('homeV2.heroRealName')}
            </Typography>
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: '0.92rem',
                color: PREVIEW.textMuted,
                mb: 3.5,
              }}
            >
              {t('homeV2.heroOneLiner')}
            </Typography>
          </motion.div>

          <motion.div variants={reduced ? undefined : item}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ mb: 2, maxWidth: 460 }}
            >
              <PreviewCta href={CONTACT_PATH} variant="primary" size="large" fullWidth>
                {t('homeV2.heroCtaPrimary')}
              </PreviewCta>
              <PreviewCta href="#forfaits" variant="secondary" size="large" fullWidth>
                {t('homeV2.heroCtaSecondary')}
              </PreviewCta>
            </Stack>
            <Box
              component="a"
              href={WEB_PROJECTS_PATH}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                fontFamily: PREVIEW.fontBody,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: PREVIEW.textSecondary,
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                '&:hover': { color: PREVIEW.orangeLight },
              }}
            >
              {t('homeV2.heroSeeWebProjects')}
              <Box component="span" aria-hidden>
                →
              </Box>
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 1.04 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'relative', minHeight: 280 }}
        aria-hidden
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            minHeight: { xs: 280, sm: 360, lg: 'auto' },
            borderRadius: {
              xs: `${PREVIEW.radiusLg}px`,
              lg: `${PREVIEW.radiusLg}px 0 0 ${PREVIEW.radiusLg}px`,
            },
            overflow: 'hidden',
            border: `1px solid ${PREVIEW.border}`,
            background: `linear-gradient(160deg, ${PREVIEW.bgElevated} 0%, #1a1410 45%, ${PREVIEW.bg} 100%)`,
            boxShadow: `0 40px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
              radial-gradient(ellipse 70% 55% at 60% 30%, ${PREVIEW.orangeGlow} 0%, transparent 60%),
              linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)
            `,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '8%',
              right: '8%',
              top: '14%',
              bottom: '18%',
              display: 'grid',
              gap: 1.5,
              transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
              transformOrigin: 'left center',
            }}
          >
            {[0, 1, 2].map((layer) => (
              <Box
                key={layer}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${PREVIEW.border}`,
                  background:
                    layer === 0
                      ? `linear-gradient(135deg, rgba(234,88,12,0.25), rgba(255,255,255,0.04))`
                      : PREVIEW.surface,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: layer === 0 ? '38%' : '22%',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 14,
                    width: layer === 0 ? '42%' : '55%',
                    height: 10,
                    borderRadius: 99,
                    background: layer === 0 ? PREVIEW.orange : 'rgba(255,255,255,0.12)',
                    opacity: layer === 0 ? 0.9 : 0.5,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 36,
                    right: 16,
                    height: layer === 0 ? '55%' : 8,
                    borderRadius: 1.5,
                    background: 'rgba(255,255,255,0.05)',
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
