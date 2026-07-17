'use client'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import AppBarComponent from '@/components/appBar'
import Footer from '@/components/Footer'
import CTAButton from '@/components/shared/CTAButton'
import InteractiveBackgroundSection from '@/components/shared/InteractiveBackgroundSection'
import PageWrapper from '@/components/shared/PageWrapper'
import ScrollReveal from '@/components/shared/ScrollReveal'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import LaneCrossLinks from '@/components/home/LaneCrossLinks'
import { supportLandingContent } from '@/content/soutien-informatique-montreal.fr'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { useSiteThemeTokens } from '@/hooks/useSiteThemeTokens'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'
import { SITE_DARK } from '@/design-system/siteDark'

const fadeUp = (reduced: boolean | null) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.01 : 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
})

export default function SupportLandingClient() {
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const siteDarkChrome = useSiteDarkChrome()
  const tokens = useSiteThemeTokens()
  const { locale } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const supportSubject = CONTACT_SUBJECT_TECH_SUPPORT[locale] ?? supportLandingContent.contactSubject
  const contactHref = `/portfolio/contact?subject=${encodeURIComponent(supportSubject)}#soutien-technique`

  const panelBorder = tokens.border
  const panelHoverBorder = tokens.borderHover
  const glow = siteDarkChrome ? tokens.brandGlowStrong : alpha(primary, 0.18)

  return (
    <PageWrapper backgroundVariant="default">
      <AppBarComponent />
      <InteractiveBackgroundSection>
        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            pb: { xs: 12, sm: 8, md: 10 },
          }}
        >
          {/* Hero */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              pt: { xs: 5, sm: 7, md: 9 },
              pb: { xs: 6, sm: 8, md: 10 },
              px: { xs: 1.5, sm: 2, md: 3 },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(820px, 120vw)',
                height: 'min(420px, 55vh)',
                background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 68%)`,
                pointerEvents: 'none',
                opacity: 0.95,
              }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Box
                component={motion.div}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.1,
                      delayChildren: prefersReducedMotion ? 0 : 0.04,
                    },
                  },
                }}
              >
                <Typography
                  component={motion.p}
                  variants={fadeUp(prefersReducedMotion)}
                  sx={{
                    m: 0,
                    mb: 1.5,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: siteDarkChrome ? SITE_DARK.brandOrangeLight : primary,
                  }}
                >
                  {supportLandingContent.heroEyebrow}
                </Typography>

                <Typography
                  component={motion.h1}
                  variants={fadeUp(prefersReducedMotion)}
                  sx={{
                    m: 0,
                    mb: 2.5,
                    fontWeight: 900,
                    letterSpacing: '-0.035em',
                    lineHeight: 1.12,
                    fontSize: {
                      xs: 'clamp(1.85rem, 7.5vw, 2.35rem)',
                      sm: 'clamp(2.4rem, 5vw, 3rem)',
                      md: 'clamp(2.85rem, 4.2vw, 3.45rem)',
                    },
                    color: textColor,
                  }}
                >
                  {supportLandingContent.h1}
                </Typography>

                <Typography
                  component={motion.p}
                  variants={fadeUp(prefersReducedMotion)}
                  sx={{
                    m: 0,
                    mb: 3.5,
                    mx: 'auto',
                    maxWidth: 560,
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    lineHeight: 1.65,
                    color: siteDarkChrome ? tokens.textSecondary : textColor,
                    opacity: siteDarkChrome ? 1 : 0.88,
                  }}
                >
                  {supportLandingContent.intro}
                </Typography>

                <Box component={motion.div} variants={fadeUp(prefersReducedMotion)}>
                  <Link href={contactHref} style={{ textDecoration: 'none' }}>
                    <CTAButton variant="primary" size="large">
                      {supportLandingContent.ctaPrimary}
                    </CTAButton>
                  </Link>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Pillars */}
          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 6, md: 9 } }}>
            <ScrollReveal direction="up" delay={0.04}>
              <Box sx={{ textAlign: 'center', mb: { xs: 3.5, md: 5 }, maxWidth: 640, mx: 'auto' }}>
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '1.55rem', sm: '1.85rem', md: '2.1rem' },
                    color: textColor,
                    mb: 1.25,
                  }}
                >
                  {supportLandingContent.serviceTitle}
                </Typography>
                <Typography
                  sx={{
                    color: siteDarkChrome ? tokens.textSecondary : textColor,
                    opacity: siteDarkChrome ? 1 : 0.85,
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', sm: '1.05rem' },
                  }}
                >
                  {supportLandingContent.serviceLead}
                </Typography>
              </Box>
            </ScrollReveal>

            <Box
              component={motion.div}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.12,
                  },
                },
              }}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 2, md: 2.5 },
                alignItems: 'stretch',
              }}
            >
              {supportLandingContent.pillars.map((pillar) => (
                <Box
                  key={pillar.id}
                  component={motion.article}
                  variants={fadeUp(prefersReducedMotion)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    textAlign: 'left',
                    p: { xs: 2.5, sm: 3 },
                    minHeight: { md: 340 },
                    height: '100%',
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: tokens.surface,
                    backdropFilter: siteDarkChrome ? 'blur(14px)' : undefined,
                    WebkitBackdropFilter: siteDarkChrome ? 'blur(14px)' : undefined,
                    boxShadow: siteDarkChrome
                      ? '0 12px 40px rgba(0, 0, 0, 0.32)'
                      : `0 10px 28px ${alpha(primary, 0.1)}`,
                    transition:
                      'border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease, background 0.28s ease',
                    '&:hover': {
                      borderColor: panelHoverBorder,
                      background: tokens.surfaceHover,
                      boxShadow: siteDarkChrome
                        ? `0 16px 48px ${glow}, 0 0 0 1px rgba(234, 88, 12, 0.12)`
                        : `0 16px 36px ${alpha(primary, 0.16)}`,
                      transform: prefersReducedMotion ? 'none' : 'translateY(-4px)',
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      fontSize: { xs: '1.2rem', sm: '1.3rem' },
                      lineHeight: 1.25,
                      minHeight: { xs: '2.5em', md: '2.5em' },
                      color: textColor,
                      mb: 1,
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2.5,
                      fontSize: '0.95rem',
                      lineHeight: 1.55,
                      minHeight: { xs: '4.65em', md: '4.65em' },
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.82,
                    }}
                  >
                    {pillar.lead}
                  </Typography>
                  <Stack
                    component="ul"
                    spacing={1.1}
                    sx={{
                      listStyle: 'none',
                      p: 0,
                      m: 0,
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {pillar.items.map((item) => (
                      <Box
                        key={item}
                        component="li"
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1.1rem 1fr',
                          columnGap: 1,
                          alignItems: 'start',
                          minHeight: '2.85em',
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color: siteDarkChrome ? SITE_DARK.brandOrange : primary,
                            fontSize: '1.1rem',
                            mt: '0.15em',
                            justifySelf: 'center',
                          }}
                          aria-hidden
                        />
                        <Typography
                          sx={{
                            color: textColor,
                            lineHeight: 1.45,
                            fontSize: '0.95rem',
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Container>

          {/* Trust + territory */}
          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 6, md: 9 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              <ScrollReveal direction="up" delay={0.06}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: siteDarkChrome
                      ? `linear-gradient(145deg, ${tokens.brandGlow} 0%, ${tokens.surface} 55%)`
                      : `linear-gradient(145deg, ${alpha(primary, 0.14)} 0%, ${tokens.surface} 60%)`,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      letterSpacing: '-0.02em',
                      color: textColor,
                      mb: 1.25,
                    }}
                  >
                    <SecurityOutlinedIcon
                      sx={{ color: siteDarkChrome ? SITE_DARK.brandOrange : primary }}
                      aria-hidden
                    />
                    {supportLandingContent.reassuranceTitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.9,
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    {supportLandingContent.reassurance}
                  </Typography>
                </Box>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.12}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: tokens.surface,
                    backdropFilter: siteDarkChrome ? 'blur(12px)' : undefined,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      letterSpacing: '-0.02em',
                      color: textColor,
                      mb: 1.25,
                    }}
                  >
                    <FmdGoodOutlinedIcon
                      sx={{ color: siteDarkChrome ? SITE_DARK.brandOrange : primary }}
                      aria-hidden
                    />
                    {supportLandingContent.travelTitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.9,
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    {supportLandingContent.travelNote}
                  </Typography>
                </Box>
              </ScrollReveal>
            </Box>
          </Container>

          {/* Final CTA */}
          <Container maxWidth="md" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 2, md: 4 } }}>
            <ScrollReveal direction="up" delay={0.08}>
              <Box
                sx={{
                  textAlign: 'center',
                  px: { xs: 2.5, sm: 4 },
                  py: { xs: 3.5, sm: 4.5 },
                  borderRadius: tokens.cardRadius,
                  border: `1px solid ${panelHoverBorder}`,
                  background: siteDarkChrome
                    ? `radial-gradient(90% 80% at 50% -20%, ${glow} 0%, transparent 55%), linear-gradient(160deg, ${tokens.surfaceHover} 0%, ${tokens.bgElevated} 100%)`
                    : `linear-gradient(160deg, ${alpha(primary, 0.16)} 0%, ${tokens.surface} 70%)`,
                  boxShadow: siteDarkChrome
                    ? `0 18px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px ${tokens.brandGlow}`
                    : `0 16px 40px ${alpha(primary, 0.14)}`,
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '1.55rem', sm: '1.9rem', md: '2.15rem' },
                    color: textColor,
                    mb: 1.5,
                    lineHeight: 1.15,
                  }}
                >
                  {supportLandingContent.finalTitle}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 520,
                    mx: 'auto',
                    mb: 3,
                    color: siteDarkChrome ? tokens.textSecondary : textColor,
                    opacity: siteDarkChrome ? 1 : 0.9,
                    lineHeight: 1.65,
                    fontSize: { xs: '1rem', sm: '1.05rem' },
                  }}
                >
                  {supportLandingContent.finalBody}
                </Typography>
                <Link href={contactHref} style={{ textDecoration: 'none' }}>
                  <CTAButton variant="primary" size="large">
                    {supportLandingContent.ctaPrimary}
                  </CTAButton>
                </Link>
              </Box>
            </ScrollReveal>
          </Container>
          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 2, sm: 3 } }}>
            <LaneCrossLinks current="support" />
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer mobileBottomClearance />
      <ScrollTriggeredStickyCTA text={supportLandingContent.ctaPrimary} href={contactHref} />
    </PageWrapper>
  )
}
