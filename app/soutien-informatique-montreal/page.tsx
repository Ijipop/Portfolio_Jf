'use client'

import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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
import SectionDisplayTitle from '@/components/shared/SectionDisplayTitle'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import { supportLandingContent } from '@/content/soutien-informatique-montreal.fr'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { SITE_DARK } from '@/design-system/siteDark'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'

export default function SoutienInformatiqueMontrealPage() {
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const siteDarkChrome = useSiteDarkChrome()
  const { locale } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const supportSubject = CONTACT_SUBJECT_TECH_SUPPORT[locale] ?? supportLandingContent.contactSubject
  const contactHref = `/portfolio/contact?subject=${encodeURIComponent(supportSubject)}#soutien-technique`

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
            py: { xs: 4, sm: 6, md: 8 },
            pb: { xs: 12, sm: 8, md: 8 },
            px: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 860, mx: 'auto', mb: { xs: 5, md: 8 } }}>
              <SectionDisplayTitle component="h1" sx={{ mb: 2 }}>
                {supportLandingContent.h1}
              </SectionDisplayTitle>

              <Box
                sx={{
                  mb: 5,
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
                  border: siteDarkChrome
                    ? `1px solid ${SITE_DARK.border}`
                    : `1px solid ${alpha(primary, 0.28)}`,
                  background: siteDarkChrome
                    ? SITE_DARK.surface
                    : alpha('#ffffff', 0.72),
                  backdropFilter: siteDarkChrome ? 'blur(12px)' : undefined,
                  WebkitBackdropFilter: siteDarkChrome ? 'blur(12px)' : undefined,
                  boxShadow: siteDarkChrome
                    ? `0 12px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px ${SITE_DARK.brandGlow}`
                    : `0 14px 28px ${alpha(primary, 0.16)}`,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: textColor,
                    fontWeight: 800,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                  }}
                >
                  <BuildCircleOutlinedIcon aria-hidden />
                  {supportLandingContent.serviceTitle}
                </Typography>

                <Box
                  component={motion.ul}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.09,
                        delayChildren: prefersReducedMotion ? 0 : 0.08,
                      },
                    },
                  }}
                  sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    display: 'grid',
                    gap: 1.1,
                  }}
                >
                  {supportLandingContent.services.map((service) => (
                    <Box
                      key={service}
                      component={motion.li}
                      variants={{
                        hidden: {
                          opacity: prefersReducedMotion ? 1 : 0,
                          y: prefersReducedMotion ? 0 : 22,
                          scale: prefersReducedMotion ? 1 : 0.97,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: prefersReducedMotion ? 0.01 : 0.44,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      sx={{
                        borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
                        border: siteDarkChrome
                          ? `1px solid ${SITE_DARK.border}`
                          : `1px solid ${alpha(primary, 0.22)}`,
                        background: siteDarkChrome
                          ? SITE_DARK.surfaceHover
                          : alpha(primary, 0.06),
                        px: 1.5,
                        py: 1.1,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                        '&:hover': siteDarkChrome
                          ? {
                              borderColor: SITE_DARK.borderHover,
                              background: 'rgba(255, 255, 255, 0.08)',
                            }
                          : undefined,
                      }}
                    >
                      <CheckCircleOutlineRoundedIcon sx={{ color: primary, fontSize: '1.1rem', mt: '2px' }} />
                      <Typography sx={{ color: textColor, lineHeight: 1.6 }}>{service}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <ScrollReveal direction="up" delay={0.08}>
                <Box
                  sx={{
                    mb: 3,
                    borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
                    border: siteDarkChrome
                      ? `1px solid ${SITE_DARK.borderHover}`
                      : `1px solid ${alpha(primary, 0.26)}`,
                    background: siteDarkChrome
                      ? `linear-gradient(135deg, ${SITE_DARK.brandGlow} 0%, ${SITE_DARK.surface} 100%)`
                      : `linear-gradient(135deg, ${alpha(primary, 0.16)} 0%, ${alpha('#ffffff', 0.88)} 100%)`,
                    px: { xs: 2, sm: 2.8 },
                    py: { xs: 2.2, sm: 2.8 },
                  }}
                >
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      lineHeight: 1.75,
                      fontSize: { xs: '1rem', sm: '1.08rem' },
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <SecurityOutlinedIcon sx={{ color: primary, mt: '2px' }} aria-hidden />
                    {supportLandingContent.reassurance}
                  </Typography>
                </Box>
              </ScrollReveal>

              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: textColor,
                  opacity: 0.9,
                }}
              >
                <FmdGoodOutlinedIcon sx={{ color: primary }} aria-hidden />
                <Typography sx={{ textAlign: 'center', lineHeight: 1.7 }}>
                  {supportLandingContent.travelNote}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}>
                <Typography
                  component="h2"
                  variant="h3"
                  sx={{
                    ...DESIGN_TOKENS.typography.h3,
                    mb: DESIGN_TOKENS.spacing.md,
                    color: textColor,
                    fontWeight: 900,
                  }}
                >
                  {supportLandingContent.finalTitle}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 720,
                    mx: 'auto',
                    mb: DESIGN_TOKENS.spacing.xl,
                    color: textColor,
                    opacity: 0.9,
                    lineHeight: 1.7,
                    fontSize: '1.05rem',
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
            </Box>
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer mobileBottomClearance />
      <ScrollTriggeredStickyCTA text={supportLandingContent.ctaPrimary} href={contactHref} />
    </PageWrapper>
  )
}
