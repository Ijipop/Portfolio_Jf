'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion } from 'framer-motion'
import { BRAND_GLITCH_GRADIENT } from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const STEPS = [
  { number: '01', titleKey: 'home.processBriefTitle', textKey: 'home.processBriefText', deliverableKey: 'home.processBriefDeliverable' },
  { number: '02', titleKey: 'home.processMockupTitle', textKey: 'home.processMockupText', deliverableKey: 'home.processMockupDeliverable' },
  { number: '03', titleKey: 'home.processBuildTitle', textKey: 'home.processBuildText', deliverableKey: 'home.processBuildDeliverable' },
  { number: '04', titleKey: 'home.processLaunchTitle', textKey: 'home.processLaunchText', deliverableKey: 'home.processLaunchDeliverable' },
]

export default function PortfolioProcessSection() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const reducedMotion = useReducedMotion()

  return (
    <Box sx={{ mb: { xs: 5, md: 8 } }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 780, mx: 'auto', mb: { xs: 3, md: 4.5 } }}>
          <Typography
            component="p"
            sx={{
              color: primary,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              mb: 1,
            }}
          >
            {t('home.processKicker')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '2rem', md: '3.1rem' },
              lineHeight: 1.05,
            }}
          >
            {t('home.processTitle')}
          </Typography>
        </Box>
      </ScrollReveal>

      <Box sx={{ position: 'relative' }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: { xs: 22, md: 0 },
            right: { xs: 'auto', md: 0 },
            top: { xs: 0, md: 42 },
            width: { xs: 2, md: '100%' },
            height: { xs: '100%', md: 2 },
            background: `${primary}1e`,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            component={motion.div}
            initial={reducedMotion ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
            transition={{ duration: reducedMotion ? 0 : 1.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            sx={{
              width: '100%',
              height: '100%',
              transformOrigin: { xs: 'top', md: 'left' },
              background: BRAND_GLITCH_GRADIENT,
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 1.5 },
          }}
        >
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.number} direction="up" delay={0.06 * index} fillHeight>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 190, md: 280 },
                  p: { xs: 2.5, md: 2.75 },
                  pl: { xs: 6, md: 2.75 },
                  borderRadius: DESIGN_TOKENS.borderRadius.medium,
                  border: `1px solid ${primary}20`,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <Typography
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    right: { xs: 24, md: 28 },
                    top: { xs: 18, md: 24 },
                    fontSize: { xs: '4.25rem', md: '4.85rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.12em',
                    color: primary,
                    opacity: 0.08,
                  }}
                >
                  {step.number}
                </Typography>
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: { xs: 15, md: 18 },
                    top: { xs: 24, md: 28 },
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: BRAND_GLITCH_GRADIENT,
                    boxShadow: `0 0 0 7px ${primary}18`,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    color: textColor,
                    fontWeight: 900,
                    mb: 1.25,
                    pl: { xs: 0, md: 3 },
                    pr: 3,
                  }}
                >
                  {t(step.titleKey)}
                </Typography>
                <Typography sx={{ color: textColor, opacity: 0.84, lineHeight: 1.6, mb: 2 }}>
                  {t(step.textKey)}
                </Typography>
                <Typography
                  sx={{
                    mt: 'auto',
                    color: primary,
                    fontWeight: 900,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t(step.deliverableKey)}
                </Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
