'use client'

import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
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
import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
} from '@/content/soutien-informatique-montreal.fr'
import { outfit, plusJakarta } from '@/fonts'

const WEB_HREF = '/portfolio'
const SUPPORT_HREF = '/soutien-informatique-montreal'
const SOFTWARE_HREF = '/portfolio/projets?type=logiciel'
const DEMOS_HREF = '/demos'

const FONT_DISPLAY = 'var(--font-display), Outfit, sans-serif'
const FONT_BODY = 'var(--font-body), "Plus Jakarta Sans", sans-serif'

type LaneChoice = {
  href: string
  title: string
  description: string
  cta: string
  delayMs: number
  testId: string
  icon: typeof LanguageOutlinedIcon
}

export default function HomeGatewayClient() {
  const { locale } = useLanguage()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const copy = homeGatewayCopy[locale === 'en' ? 'en' : 'fr']

  const lanes: LaneChoice[] = [
    {
      href: WEB_HREF,
      title: copy.webTitle,
      description: copy.webDesc,
      cta: copy.webCta,
      delayMs: 80,
      testId: 'gateway-choice-web',
      icon: LanguageOutlinedIcon,
    },
    {
      href: SUPPORT_HREF,
      title: copy.supportTitle,
      description: copy.supportDesc,
      cta: copy.supportCta,
      delayMs: 140,
      testId: 'gateway-choice-support',
      icon: SupportAgentOutlinedIcon,
    },
    {
      href: SOFTWARE_HREF,
      title: copy.softwareTitle,
      description: copy.softwareDesc,
      cta: copy.softwareCta,
      delayMs: 200,
      testId: 'gateway-choice-software',
      icon: DevicesOutlinedIcon,
    },
  ]

  return (
    <Box
      component="main"
      className={`${outfit.variable} ${plusJakarta.variable}`}
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', sm: 'center' },
        px: { xs: 2, sm: 3, md: 4 },
        pt: {
          xs: 'max(1.25rem, env(safe-area-inset-top, 0px))',
          sm: 3,
          md: 4,
        },
        pb: { xs: 2.5, sm: 3, md: 4 },
        color: SITE_DARK.text,
        overflow: 'visible',
      }}
    >
      <HomeV2Backdrop glowPlacement="center" />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1040,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2.25, md: 2.75 },
          '@keyframes gatewayFadeUp': {
            from: { opacity: 0, transform: 'translateY(14px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes gatewaySlideUp': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          component="h1"
          sx={{
            m: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: reducedMotion ? 'none' : 'gatewayFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          <Typography
            component="span"
            sx={{
              mb: { xs: 0.5, sm: 0.75 },
              fontFamily: FONT_BODY,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              fontWeight: 500,
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
                pt: { xs: '0.4em', sm: '0.35em' },
                fontSize: {
                  xs: 'clamp(2.5rem, 11vw, 3.2rem)',
                  sm: 'clamp(3.5rem, 8.5vw, 4.6rem)',
                  md: 'clamp(4rem, 5.2vw, 5.2rem)',
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
                  width: { xs: '56%', sm: '48%' },
                  height: { xs: '0.32em', md: '0.26em' },
                  pointerEvents: 'none',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '100%',
                    background: `radial-gradient(ellipse 80% 90% at 50% 70%, ${SITE_DARK.brandGlow} 0%, transparent 72%)`,
                    opacity: 0.55,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: { xs: 2, sm: 2.5 },
                    borderRadius: 99,
                    background: `linear-gradient(90deg, transparent, ${SITE_DARK.brandOrangeLight} 22%, ${SITE_DARK.brandOrange} 50%, ${SITE_DARK.brandOrangeLight} 78%, transparent)`,
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
                mt: { xs: -0.25, sm: -0.35 },
                fontFamily: FONT_DISPLAY,
                fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 700,
                letterSpacing: '0.12em',
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
            maxWidth: 480,
            fontFamily: FONT_BODY,
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
            color: SITE_DARK.textSecondary,
            animation: reducedMotion
              ? 'none'
              : 'gatewayFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both',
          }}
        >
          {copy.benefit}
        </Typography>

        <Typography
          component="p"
          sx={{
            m: 0,
            fontFamily: FONT_BODY,
            fontSize: { xs: '0.92rem', sm: '1rem' },
            fontWeight: 600,
            color: SITE_DARK.text,
            animation: reducedMotion
              ? 'none'
              : 'gatewayFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both',
          }}
        >
          {copy.prompt}
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 1.25, sm: 1.5, md: 1.75 },
            mt: { xs: 0.25, sm: 0.5 },
          }}
        >
          {lanes.map((lane) => {
            const Icon = lane.icon
            return (
              <Box
                key={lane.testId}
                component={Link}
                href={lane.href}
                data-testid={lane.testId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  textDecoration: 'none',
                  color: 'inherit',
                  minHeight: { xs: 'auto', md: 200 },
                  p: { xs: 1.75, sm: 2.25 },
                  borderRadius: SITE_DARK.cardRadius,
                  background: SITE_DARK.surface,
                  border: `1px solid ${SITE_DARK.border}`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.22)`,
                  transition:
                    'border-color 0.3s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  animation: reducedMotion
                    ? 'none'
                    : `gatewaySlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${lane.delayMs}ms both`,
                  '&:hover': {
                    borderColor: SITE_DARK.borderHover,
                    background: SITE_DARK.surfaceHover,
                    boxShadow: `0 16px 40px ${SITE_DARK.brandGlowStrong}`,
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
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.25,
                    background: SITE_DARK.brandGlow,
                    color: SITE_DARK.brandOrangeLight,
                  }}
                >
                  <Icon sx={{ fontSize: 22 }} />
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: '1.15rem', sm: '1.25rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: SITE_DARK.text,
                    mb: 0.75,
                  }}
                >
                  {lane.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    flex: 1,
                    fontFamily: FONT_BODY,
                    fontSize: { xs: '0.86rem', sm: '0.92rem' },
                    lineHeight: 1.45,
                    color: SITE_DARK.textSecondary,
                    mb: 1.5,
                  }}
                >
                  {lane.description}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    mt: 'auto',
                    fontFamily: FONT_BODY,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: SITE_DARK.brandOrange,
                  }}
                >
                  {lane.cta}
                  <Box
                    component="span"
                    className="gateway-arrow"
                    aria-hidden
                    sx={{
                      display: 'inline-block',
                      transition: 'transform 0.25s ease, color 0.25s ease',
                      fontSize: '1.1em',
                      lineHeight: 1,
                    }}
                  >
                    →
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2.5 }}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            pt: 0.5,
            animation: reducedMotion
              ? 'none'
              : 'gatewayFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both',
          }}
        >
          <Box
            component="a"
            href={SUPPORT_PHONE_HREF}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              fontFamily: FONT_BODY,
              fontSize: '0.9rem',
              fontWeight: 700,
              color: SITE_DARK.text,
              textDecoration: 'none',
              px: 1.75,
              py: 0.75,
              borderRadius: 999,
              border: `1px solid ${SITE_DARK.border}`,
              background: SITE_DARK.surface,
              transition: 'border-color 0.25s ease, color 0.25s ease',
              '&:hover': {
                borderColor: SITE_DARK.borderHover,
                color: SITE_DARK.brandOrangeLight,
              },
            }}
          >
            <PhoneOutlinedIcon sx={{ fontSize: 18, color: SITE_DARK.brandOrange }} />
            {copy.supportCallCta} {SUPPORT_PHONE_DISPLAY}
          </Box>

          <Box
            component={Link}
            href={DEMOS_HREF}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontFamily: FONT_BODY,
              fontSize: '0.88rem',
              fontWeight: 600,
              color: SITE_DARK.textMuted,
              textDecoration: 'none',
              transition: 'color 0.25s ease',
              '&:hover': { color: SITE_DARK.brandOrangeLight },
            }}
          >
            {copy.demosHint} →
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
