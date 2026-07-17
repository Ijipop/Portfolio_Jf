'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE_DARK } from '@/design-system/siteDark'
import HomeV2Backdrop from '@/components/home-v2/HomeV2Backdrop'
import { homeGatewayCopy } from '@/i18n/homeGatewayCopy'

const WEB_HREF = '/portfolio'
const SUPPORT_HREF = '/soutien-informatique-montreal'
const SOFTWARE_HREF = '/portfolio/projets?type=logiciel'

type GatewayChoice = {
  href: string
  title: string
  description: string
  cta: string
  delayMs: number
  testId: string
}

export default function HomeGatewayClient() {
  const { locale } = useLanguage()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const copy = homeGatewayCopy[locale === 'en' ? 'en' : 'fr']

  const choices: GatewayChoice[] = [
    {
      href: WEB_HREF,
      title: copy.webTitle,
      description: copy.webDesc,
      cta: copy.webCta,
      delayMs: 120,
      testId: 'gateway-choice-web',
    },
    {
      href: SUPPORT_HREF,
      title: copy.supportTitle,
      description: copy.supportDesc,
      cta: copy.supportCta,
      delayMs: 200,
      testId: 'gateway-choice-support',
    },
    {
      href: SOFTWARE_HREF,
      title: copy.softwareTitle,
      description: copy.softwareDesc,
      cta: copy.softwareCta,
      delayMs: 280,
      testId: 'gateway-choice-software',
    },
  ]

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 1.5, sm: 3, md: 5 },
        color: SITE_DARK.text,
        overflow: 'visible',
        '@media (min-height: 900px)': {
          py: 'clamp(48px, 8vh, 96px)',
        },
      }}
    >
      <HomeV2Backdrop glowPlacement="center" />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 960,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (min-height: 900px)': {
            gap: 'clamp(28px, 4.5vh, 56px)',
          },
          '@media (min-height: 1100px)': {
            gap: 'clamp(36px, 5.5vh, 72px)',
          },
          '@keyframes gatewayFadeUp': {
            from: { opacity: 0, transform: 'translateY(14px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes gatewaySlideUp': {
            from: { transform: 'translateY(14px)' },
            to: { transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          component="h1"
          sx={{
            m: 0,
            mb: { xs: 1, sm: 2, md: 2.5 },
            '@media (min-height: 900px)': { mb: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: reducedMotion ? 'none' : 'gatewayFadeUp 0.55s ease both',
          }}
        >
          <Typography
            component="span"
            sx={{
              mb: { xs: 0.5, sm: 1 },
              fontSize: { xs: '1rem', sm: '1.45rem', md: '1.65rem' },
              fontWeight: 500,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              color: SITE_DARK.textSecondary,
            }}
          >
            {copy.welcomeEyebrow}
          </Typography>

          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                pt: { xs: '0.55em', sm: '0.5em', md: '0.4em', lg: '0.36em' },
                /** Plafond plus bas en desktop : évite un titre/halo disproportionnés. */
                fontSize: {
                  xs: 'clamp(2.6rem, 12vw, 3.4rem)',
                  sm: 'clamp(4.2rem, 10vw, 5.4rem)',
                  md: 'clamp(4.6rem, 6vw, 5.8rem)',
                  lg: 'clamp(5rem, 4.5vw, 6.1rem)',
                  xl: 'clamp(5.2rem, 3.8vw, 6.25rem)',
                },
                '@media (max-height: 720px)': {
                  fontSize: 'clamp(3rem, 8vw, 4.8rem)',
                },
                '@media (max-height: 640px)': {
                  fontSize: 'clamp(2.6rem, 7.5vw, 4rem)',
                },
                '@media (max-height: 500px)': {
                  fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
                },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  transform: 'translateX(-50%)',
                  width: { xs: '60%', sm: '56%', md: '50%', lg: '46%' },
                  height: { xs: '0.4em', md: '0.3em', lg: '0.26em' },
                  pointerEvents: 'none',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '60%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '130%', md: '120%', lg: '115%' },
                    height: '100%',
                    background: {
                      xs: `radial-gradient(ellipse 80% 90% at 50% 70%, ${SITE_DARK.brandGlowStrong} 0%, transparent 70%)`,
                      md: `radial-gradient(ellipse 70% 85% at 50% 70%, ${SITE_DARK.brandGlow} 0%, transparent 72%)`,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '52%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: { xs: 2.5, sm: 3, md: 3, lg: 3.5 },
                    borderRadius: 99,
                    background: `linear-gradient(90deg, transparent, ${SITE_DARK.brandOrangeLight} 20%, ${SITE_DARK.brandOrange} 50%, ${SITE_DARK.brandOrangeLight} 80%, transparent)`,
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  '& > .MuiTypography-root': { fontSize: '1em !important' },
                }}
              >
                <IjipopGlitchTitle text={copy.brand} variant="gateway" />
              </Box>
            </Box>

            <Typography
              component="span"
              sx={{
                mt: { xs: -0.35, sm: -0.55 },
                fontSize: { xs: '1.15rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'lowercase',
                color: SITE_DARK.brandOrangeLight,
              }}
            >
              {copy.brandSuffix}
            </Typography>
          </Box>
        </Box>

        <Typography
          component="p"
          sx={{
            m: 0,
            mb: { xs: 1.5, sm: 3.5, md: 5 },
            '@media (min-height: 900px)': { mb: 0 },
            fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.3rem' },
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: SITE_DARK.textSecondary,
            animation: reducedMotion ? 'none' : 'gatewayFadeUp 0.55s ease 0.06s both',
            '@media (max-height: 720px)': {
              mb: 2,
              fontSize: '0.98rem',
            },
          }}
        >
          {copy.prompt}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{ width: '100%', alignItems: 'stretch' }}
        >
              {choices.map((choice) => (
            <Box
              key={choice.testId}
              component={Link}
              href={choice.href}
              data-testid={choice.testId}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                textDecoration: 'none',
                color: 'inherit',
                minHeight: { xs: 'auto', md: 200 },
                p: { xs: 1.35, sm: 2.5, md: 3 },
                borderRadius: SITE_DARK.cardRadius,
                background: SITE_DARK.surface,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: `1px solid ${SITE_DARK.border}`,
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.35)`,
                transition:
                  'border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease, background 0.28s ease',
                /** Pas d’opacity:0 — évite boundingBox null pendant le delay (e2e / a11y). */
                animation: reducedMotion
                  ? 'none'
                  : `gatewaySlideUp 0.55s ease ${choice.delayMs}ms both`,
                '&:hover': {
                  borderColor: SITE_DARK.borderHover,
                  background: SITE_DARK.surfaceHover,
                  boxShadow: `0 16px 48px ${SITE_DARK.brandGlowStrong}, 0 0 0 1px rgba(234, 88, 12, 0.12)`,
                  transform: reducedMotion ? 'none' : 'translateY(-4px)',
                  '& .gateway-arrow': {
                    transform: 'translateX(4px)',
                    color: SITE_DARK.brandOrangeLight,
                  },
                },
                '&:focus-visible': {
                  outline: `2px solid ${SITE_DARK.brandOrange}`,
                  outlineOffset: 3,
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: '1.05rem', sm: '1.45rem', md: '1.7rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: SITE_DARK.text,
                  mb: { xs: 0.35, sm: 1.25 },
                }}
              >
                {choice.title}
              </Typography>
              <Typography
                component="span"
                sx={{
                  flex: 1,
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  lineHeight: { xs: 1.35, sm: 1.5 },
                  color: SITE_DARK.textSecondary,
                  mb: { xs: 0.75, sm: 2.5 },
                  display: { xs: '-webkit-box', sm: 'block' },
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: { xs: 'hidden', sm: 'visible' },
                  '@media (min-width: 600px)': {
                    WebkitLineClamp: 'unset',
                  },
                }}
              >
                {choice.description}
              </Typography>
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 'auto',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: SITE_DARK.brandOrange,
                }}
              >
                {choice.cta}
                <Box
                  component="span"
                  className="gateway-arrow"
                  aria-hidden
                  sx={{
                    display: 'inline-block',
                    transition: 'transform 0.28s ease, color 0.28s ease',
                    fontSize: '1.15em',
                    lineHeight: 1,
                  }}
                >
                  →
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
