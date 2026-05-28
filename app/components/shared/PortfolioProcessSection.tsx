'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import CTAButton from './CTAButton'
import { BRAND_GLITCH_GRADIENT } from './IjipopGlitchTitle'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const STEPS = [
  { number: '01', titleKey: 'home.processBriefTitle', textKey: 'home.processBriefText', deliverableKey: 'home.processBriefDeliverable' },
  { number: '02', titleKey: 'home.processMockupTitle', textKey: 'home.processMockupText', deliverableKey: 'home.processMockupDeliverable' },
  { number: '03', titleKey: 'home.processBuildTitle', textKey: 'home.processBuildText', deliverableKey: 'home.processBuildDeliverable' },
  { number: '04', titleKey: 'home.processLaunchTitle', textKey: 'home.processLaunchText', deliverableKey: 'home.processLaunchDeliverable' },
]

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function PortfolioProcessSection() {
  const { t } = useLanguage()
  const { themeName, customTheme } = useAdvancedTheme()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const reducedMotion = useReducedMotion()
  const [processLineReady, setProcessLineReady] = useState(false)
  useEffect(() => setProcessLineReady(true), [])
  const isLatteTheme = themeName === 'latte'
  const processAccent = isLatteTheme ? '#ea580c' : primary
  const processGradient = isLatteTheme
    ? BRAND_GLITCH_GRADIENT
    : `linear-gradient(135deg, ${primary} 0%, ${secondary} 50%, ${accent} 100%)`
  const cardBackground = isLatteTheme
    ? `linear-gradient(145deg, ${hexToRgba(customTheme.bg, 0.94)}, ${hexToRgba(customTheme.bg2, 0.88)})`
    : `linear-gradient(145deg, ${hexToRgba(customTheme.bg, 0.92)}, ${hexToRgba(customTheme.bg2, 0.86)})`
  const cardBorder = isLatteTheme ? `${primary}2e` : `${primary}46`
  const cardShadow = isLatteTheme
    ? `0 16px 40px rgba(92, 77, 60, 0.12), inset 0 1px 0 ${hexToRgba('#ffffff', 0.38)}`
    : `0 18px 46px rgba(0, 0, 0, 0.28), 0 0 28px ${hexToRgba(primary, 0.1)}, inset 0 1px 0 ${hexToRgba('#ffffff', 0.08)}`

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
            background: `${processAccent}1e`,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          {processLineReady && !reducedMotion ? (
            <Box
              component={motion.div}
              initial={{ scaleX: 0, scaleY: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
              transition={{ duration: 1.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              sx={{
                width: '100%',
                height: '100%',
                transformOrigin: { xs: 'top', md: 'left' },
                background: processGradient,
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                transformOrigin: { xs: 'top', md: 'left' },
                background: processGradient,
              }}
            />
          )}
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
                  zIndex: 1,
                  p: { xs: 2.5, md: 2.75 },
                  pl: { xs: 6, md: 2.75 },
                  borderRadius: '14px',
                  border: `1px solid ${cardBorder}`,
                  background: cardBackground,
                  boxShadow: cardShadow,
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
                    top: { xs: 24, md: 22 },
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: processGradient,
                    boxShadow: `0 0 0 7px ${processAccent}18`,
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

      <ScrollReveal direction="up" delay={0.1}>
        <Box sx={{ textAlign: 'center', mt: { xs: 3.5, md: 4.5 } }}>
          <Link href="/portfolio/contact" style={{ textDecoration: 'none' }}>
            <CTAButton variant="primary" size="large">
              {t('home.processCta')}
            </CTAButton>
          </Link>
        </Box>
      </ScrollReveal>
    </Box>
  )
}
