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

type GatewayChoice = {
  href: string
  title: string
  description: string
  cta: string
  delayMs: number
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
    },
    {
      href: SUPPORT_HREF,
      title: copy.supportTitle,
      description: copy.supportDesc,
      cta: copy.supportCta,
      delayMs: 240,
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
        py: { xs: 4, sm: 5 },
        color: SITE_DARK.text,
        overflow: 'hidden',
      }}
    >
      <HomeV2Backdrop />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 960,
          textAlign: 'center',
          '@keyframes gatewayFadeUp': {
            from: { opacity: 0, transform: 'translateY(18px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          component="h1"
          sx={{
            m: 0,
            mb: { xs: 1.5, sm: 2 },
            animation: reducedMotion ? 'none' : 'gatewayFadeUp 0.7s ease both',
          }}
        >
          <IjipopGlitchTitle text={copy.welcome} variant="gateway" />
        </Box>

        <Typography
          component="p"
          sx={{
            m: 0,
            mb: { xs: 3.5, sm: 4.5, md: 5.5 },
            fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' },
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: SITE_DARK.textSecondary,
            animation: reducedMotion ? 'none' : 'gatewayFadeUp 0.7s ease 0.08s both',
            '@media (max-height: 680px)': {
              mb: 3,
              fontSize: '1.05rem',
            },
          }}
        >
          {copy.prompt}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 2.5 }}
          sx={{ width: '100%', alignItems: 'stretch' }}
        >
              {choices.map((choice) => (
            <Box
              key={choice.href}
              component={Link}
              href={choice.href}
              data-testid={
                choice.href === WEB_HREF ? 'gateway-choice-web' : 'gateway-choice-support'
              }
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                textDecoration: 'none',
                color: 'inherit',
                minHeight: { xs: 168, md: 220 },
                p: { xs: 2.75, sm: 3.25, md: 3.5 },
                borderRadius: SITE_DARK.cardRadius,
                background: SITE_DARK.surface,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: `1px solid ${SITE_DARK.border}`,
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.35)`,
                transition:
                  'border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease, background 0.28s ease',
                animation: reducedMotion
                  ? 'none'
                  : `gatewayFadeUp 0.75s ease ${choice.delayMs}ms both`,
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
                  fontSize: { xs: '1.35rem', sm: '1.55rem', md: '1.7rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: SITE_DARK.text,
                  mb: 1.25,
                }}
              >
                {choice.title}
              </Typography>
              <Typography
                component="span"
                sx={{
                  flex: 1,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  lineHeight: 1.55,
                  color: SITE_DARK.textSecondary,
                  mb: 2.5,
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
                  fontSize: '0.95rem',
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
