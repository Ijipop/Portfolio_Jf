'use client'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import AppBarComponent from '@/components/appBar'
import Footer from '@/components/Footer'
import CTAButton from '@/components/shared/CTAButton'
import InteractiveBackgroundSection from '@/components/shared/InteractiveBackgroundSection'
import PageWrapper from '@/components/shared/PageWrapper'
import ScrollReveal from '@/components/shared/ScrollReveal'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import LaneCrossLinks from '@/components/home/LaneCrossLinks'
import SupportContactForm from '@/components/support/SupportContactForm'
import {
  SUPPORT_FORM_ANCHOR,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_PORTRAIT_SRC,
  SUPPORT_SMS_HREF,
  getSupportLandingContent,
} from '@/content/soutien-informatique-montreal.fr'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { useSiteThemeTokens } from '@/hooks/useSiteThemeTokens'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'

const fadeUp = (reduced: boolean | null) => ({
  hidden: {
    opacity: reduced ? 1 : 0,
    y: reduced ? 0 : 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0.01 : 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
})

const FORM_HREF = `#${SUPPORT_FORM_ANCHOR}`

export default function SupportLandingClient() {
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const siteDarkChrome = useSiteDarkChrome()
  const tokens = useSiteThemeTokens()
  const { locale } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const copy = getSupportLandingContent(locale)

  const panelBorder = tokens.border

  const heroPanel = siteDarkChrome
    ? {
        bg: 'linear-gradient(165deg, rgba(255,250,245,0.97) 0%, rgba(247,243,235,0.94) 100%)',
        text: SITE_LIGHT.text,
        muted: SITE_LIGHT.textSecondary,
        border: 'rgba(92, 77, 60, 0.16)',
      }
    : {
        bg: `linear-gradient(165deg, ${SITE_LIGHT.surface} 0%, ${SITE_LIGHT.bgElevated} 100%)`,
        text: SITE_LIGHT.text,
        muted: SITE_LIGHT.textSecondary,
        border: SITE_LIGHT.border,
      }

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
          {/* Hero clair */}
          <Box sx={{ pt: { xs: 3, sm: 5, md: 6 }, px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 4, md: 6 } }}>
            <Container maxWidth="md">
              <Box
                component={motion.div}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.08,
                      delayChildren: prefersReducedMotion ? 0 : 0.03,
                    },
                  },
                }}
                sx={{
                  position: 'relative',
                  borderRadius: tokens.cardRadius,
                  border: `1px solid ${heroPanel.border}`,
                  background: heroPanel.bg,
                  boxShadow: siteDarkChrome
                    ? '0 20px 48px rgba(0,0,0,0.35)'
                    : `0 16px 40px ${alpha(primary, 0.12)}`,
                  px: { xs: 2.25, sm: 4 },
                  py: { xs: 3, sm: 4 },
                  overflow: 'hidden',
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    top: -40,
                    right: -20,
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(SITE_DARK.brandOrange, 0.16)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 2.5, sm: 3.5 }}
                  alignItems="center"
                  sx={{ position: 'relative', zIndex: 1 }}
                >
                  <Box
                    component={motion.div}
                    variants={fadeUp(prefersReducedMotion)}
                    sx={{
                      flexShrink: 0,
                      width: { xs: 112, sm: 132 },
                      height: { xs: 112, sm: 132 },
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: `3px solid ${alpha(SITE_DARK.brandOrange, 0.45)}`,
                      boxShadow: `0 10px 28px ${alpha(SITE_DARK.brandOrange, 0.22)}`,
                    }}
                  >
                    <Image
                      src={SUPPORT_PORTRAIT_SRC}
                      alt={copy.portraitAlt}
                      width={264}
                      height={264}
                      priority
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>

                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1, minWidth: 0 }}>
                    <Typography
                      component={motion.h1}
                      variants={fadeUp(prefersReducedMotion)}
                      sx={{
                        m: 0,
                        mb: 1,
                        fontWeight: 900,
                        letterSpacing: '-0.035em',
                        lineHeight: 1.15,
                        fontSize: {
                          xs: 'clamp(1.55rem, 6.5vw, 2rem)',
                          sm: 'clamp(1.85rem, 3.5vw, 2.35rem)',
                        },
                        color: heroPanel.text,
                        textWrap: 'balance',
                      }}
                    >
                      {copy.h1}
                    </Typography>
                    <Typography
                      component={motion.p}
                      variants={fadeUp(prefersReducedMotion)}
                      sx={{
                        m: 0,
                        mb: 1.75,
                        fontSize: { xs: '1rem', sm: '1.08rem' },
                        lineHeight: 1.55,
                        color: heroPanel.muted,
                        maxWidth: 440,
                        mx: { xs: 'auto', sm: 0 },
                      }}
                    >
                      {copy.heroLead}
                    </Typography>

                    <Box
                      component={motion.div}
                      variants={fadeUp(prefersReducedMotion)}
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.05rem',
                          color: heroPanel.text,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {copy.identityName}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem', color: heroPanel.muted, lineHeight: 1.4 }}>
                        {copy.identityTitle}
                      </Typography>
                      <Typography sx={{ fontSize: '0.875rem', color: heroPanel.muted }}>
                        {copy.identityPlace}
                      </Typography>
                    </Box>

                    <Stack
                      component={motion.div}
                      variants={fadeUp(prefersReducedMotion)}
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1.25}
                      alignItems={{ xs: 'stretch', sm: 'center' }}
                      sx={{ mb: 1.5 }}
                    >
                      <CTAButton href={FORM_HREF} variant="primary" size="large" fullWidth>
                        {copy.ctaPrimary}
                      </CTAButton>
                      <CTAButton
                        href={SUPPORT_PHONE_HREF}
                        variant="outline"
                        size="large"
                        fullWidth
                        startIcon={<PhoneOutlinedIcon />}
                        sx={{
                          color: `${heroPanel.text} !important`,
                          borderColor: `${alpha(SITE_DARK.brandOrange, 0.55)} !important`,
                          bgcolor: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {copy.ctaCall} {SUPPORT_PHONE_DISPLAY}
                      </CTAButton>
                    </Stack>

                    <Stack
                      component={motion.div}
                      variants={fadeUp(prefersReducedMotion)}
                      direction="row"
                      spacing={2}
                      justifyContent={{ xs: 'center', sm: 'flex-start' }}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Box
                        component="a"
                        href={SUPPORT_SMS_HREF}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: SITE_DARK.brandOrangeDeep,
                          textDecoration: 'none',
                          '&:hover': { color: SITE_DARK.brandOrange },
                        }}
                      >
                        <SmsOutlinedIcon sx={{ fontSize: 18 }} aria-hidden />
                        {copy.ctaText} {SUPPORT_PHONE_DISPLAY}
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', color: heroPanel.muted, alignSelf: 'center' }}>
                        {copy.phoneHint}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Trust signals */}
                <Box
                  component={motion.div}
                  variants={fadeUp(prefersReducedMotion)}
                  sx={{
                    mt: 3,
                    pt: 2.25,
                    borderTop: `1px solid ${heroPanel.border}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: { xs: 1.25, sm: 2 },
                  }}
                >
                  {copy.trustSignals.map((signal) => (
                    <Typography
                      key={signal}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.6,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: heroPanel.text,
                      }}
                    >
                      <CheckCircleOutlineRoundedIcon
                        sx={{ fontSize: 16, color: SITE_DARK.brandOrange }}
                        aria-hidden
                      />
                      {signal}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Comment je peux vous aider — juste après le hero */}
          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 5, md: 7 } }}>
            <ScrollReveal direction="up" delay={0.04}>
              <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 }, maxWidth: 520, mx: 'auto' }}>
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    fontSize: { xs: '1.4rem', sm: '1.7rem' },
                    color: textColor,
                    mb: 0.75,
                  }}
                >
                  {copy.serviceTitle}
                </Typography>
                <Typography
                  sx={{
                    color: siteDarkChrome ? tokens.textSecondary : textColor,
                    opacity: siteDarkChrome ? 1 : 0.85,
                    lineHeight: 1.5,
                    fontSize: '0.98rem',
                  }}
                >
                  {copy.serviceLead}
                </Typography>
              </Box>
            </ScrollReveal>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: { xs: 2, md: 2.25 },
              }}
            >
              {copy.pillars.map((pillar) => (
                <Box
                  key={pillar.id}
                  component="article"
                  sx={{
                    p: { xs: 2.25, sm: 2.75 },
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: tokens.surface,
                    height: '100%',
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: textColor,
                      mb: 0.75,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.75,
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.82,
                    }}
                  >
                    {pillar.lead}
                  </Typography>
                  <Stack component="ul" spacing={1} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {pillar.items.map((item) => (
                      <Box
                        key={item}
                        component="li"
                        sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color: siteDarkChrome ? SITE_DARK.brandOrange : primary,
                            fontSize: '1.05rem',
                            mt: '0.1em',
                          }}
                          aria-hidden
                        />
                        <Typography sx={{ color: textColor, fontSize: '0.9rem', lineHeight: 1.4 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Container>

          {/* Prix */}
          <Container maxWidth="md" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 5, md: 7 } }}>
            <ScrollReveal direction="up" delay={0.04}>
              <Box
                sx={{
                  p: { xs: 2.25, sm: 3 },
                  borderRadius: tokens.cardRadius,
                  border: `1px solid ${panelBorder}`,
                  background: tokens.surface,
                  backdropFilter: siteDarkChrome ? 'blur(12px)' : undefined,
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.35rem', sm: '1.55rem' },
                    letterSpacing: '-0.03em',
                    color: textColor,
                    mb: 0.5,
                    textAlign: 'center',
                  }}
                >
                  {copy.pricesTitle}
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                    mb: 2.5,
                    fontSize: '0.875rem',
                    color: siteDarkChrome ? tokens.textSecondary : textColor,
                    opacity: siteDarkChrome ? 1 : 0.8,
                  }}
                >
                  {copy.pricesNote}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: 'none',
                    m: 0,
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.25,
                  }}
                >
                  {copy.prices.map((row) => (
                    <Box
                      key={row.service}
                      component="li"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: 2,
                        py: 1.1,
                        px: { xs: 0.5, sm: 1 },
                        borderBottom: `1px solid ${alpha(siteDarkChrome ? '#fff' : '#000', 0.08)}`,
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      <Typography sx={{ fontSize: '0.92rem', color: textColor, lineHeight: 1.35 }}>
                        {row.service}
                      </Typography>
                      {row.href ? (
                        <Typography
                          component="a"
                          href={row.href}
                          sx={{
                            flexShrink: 0,
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: siteDarkChrome ? SITE_DARK.brandOrangeLight : SITE_DARK.brandOrange,
                            letterSpacing: '-0.02em',
                            textDecoration: 'underline',
                            textUnderlineOffset: '0.18em',
                            '&:hover': { opacity: 0.85 },
                          }}
                        >
                          {row.price}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            flexShrink: 0,
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: siteDarkChrome ? SITE_DARK.brandOrangeLight : SITE_DARK.brandOrange,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {row.price}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </ScrollReveal>
          </Container>

          {/* Formulaire */}
          <Container maxWidth="sm" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 5, md: 7 } }}>
            <ScrollReveal direction="up" delay={0.06}>
              <SupportContactForm />
            </ScrollReveal>
          </Container>

          {/* Trust + territory (court) */}
          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2, md: 2.25 },
              }}
            >
              <ScrollReveal direction="up" delay={0.05}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 2.25, sm: 2.75 },
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: siteDarkChrome
                      ? `linear-gradient(145deg, ${tokens.brandGlow} 0%, ${tokens.surface} 55%)`
                      : `linear-gradient(145deg, ${alpha(primary, 0.12)} 0%, ${tokens.surface} 60%)`,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: textColor,
                      mb: 0.75,
                    }}
                  >
                    <SecurityOutlinedIcon
                      sx={{ color: siteDarkChrome ? SITE_DARK.brandOrange : primary }}
                      aria-hidden
                    />
                    {copy.reassuranceTitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.9,
                      lineHeight: 1.55,
                      fontSize: '0.95rem',
                    }}
                  >
                    {copy.reassurance}
                  </Typography>
                </Box>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 2.25, sm: 2.75 },
                    borderRadius: tokens.cardRadius,
                    border: `1px solid ${panelBorder}`,
                    background: tokens.surface,
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: textColor,
                      mb: 0.75,
                    }}
                  >
                    <FmdGoodOutlinedIcon
                      sx={{ color: siteDarkChrome ? SITE_DARK.brandOrange : primary }}
                      aria-hidden
                    />
                    {copy.travelTitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: siteDarkChrome ? tokens.textSecondary : textColor,
                      opacity: siteDarkChrome ? 1 : 0.9,
                      lineHeight: 1.55,
                      fontSize: '0.95rem',
                    }}
                  >
                    {copy.travelNote}
                  </Typography>
                </Box>
              </ScrollReveal>
            </Box>
          </Container>

          <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 2, sm: 3 } }}>
            <LaneCrossLinks current="support" />
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer mobileBottomClearance />
      <ScrollTriggeredStickyCTA text={copy.ctaPrimary} href={FORM_HREF} />
    </PageWrapper>
  )
}
