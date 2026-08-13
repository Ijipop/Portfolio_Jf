'use client'

import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import SiteBrowserMockup from '@/components/shared/SiteBrowserMockup'
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
  featured?: boolean
  icon: typeof LanguageOutlinedIcon
}

export default function HomeGatewayClient() {
  const { locale, setLocale } = useLanguage()
  const copy = homeGatewayCopy[locale === 'en' ? 'en' : 'fr']
  /**
   * pending → opaque final off-screen (évite SSR/hydratation qui rejoue les keyframes)
   * animate → Tetris une seule fois post-mount
   * static → prefers-reduced-motion / E2E
   */
  const [introMode, setIntroMode] = useState<'pending' | 'animate' | 'static'>('pending')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setIntroMode('static')
      return
    }
    let cancelled = false
    const id = window.requestAnimationFrame(() => {
      if (cancelled) return
      setIntroMode('animate')
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(id)
    }
  }, [])

  const playIntro = introMode === 'animate'
  const showStatic = introMode === 'static'
  const hideUntilIntro = introMode === 'pending'

  const lanes: LaneChoice[] = [
    {
      href: WEB_HREF,
      title: copy.webTitle,
      description: copy.webDesc,
      cta: copy.webCta,
      delayMs: 280,
      testId: 'gateway-choice-web',
      featured: true,
      icon: LanguageOutlinedIcon,
    },
    {
      href: SUPPORT_HREF,
      title: copy.supportTitle,
      description: copy.supportDesc,
      cta: copy.supportCta,
      delayMs: 420,
      testId: 'gateway-choice-support',
      icon: SupportAgentOutlinedIcon,
    },
    {
      href: SOFTWARE_HREF,
      title: copy.softwareTitle,
      description: copy.softwareDesc,
      cta: copy.softwareCta,
      delayMs: 560,
      testId: 'gateway-choice-software',
      icon: DevicesOutlinedIcon,
    },
  ]

  const tabletSplit = '@media (min-width: 768px) and (min-height: 700px)'
  const landscapeCompact = '@media (min-width: 640px) and (max-height: 500px)'

  return (
    <Box
      component="main"
      className={`${outfit.variable} ${plusJakarta.variable}`}
      data-testid="gateway-hero-stage"
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', sm: 'center' },
        px: { xs: 2, sm: 3, md: 4 },
        pt: {
          xs: 'max(1.1rem, env(safe-area-inset-top, 0px))',
          sm: 2.5,
          md: 3,
        },
        pb: { xs: 2.5, sm: 3, md: 4 },
        color: SITE_DARK.text,
        /* Clip horizontal Tetris sans bloquer le scroll sur téléphones courts. */
        overflowX: 'hidden',
        overflowY: 'auto',
        boxSizing: 'border-box',
        '@media (max-height: 700px)': {
          overflowY: 'auto',
          justifyContent: 'flex-start',
        },
        [landscapeCompact]: {
          minHeight: 'auto',
          justifyContent: 'flex-start',
          pt: 1,
          pb: 1,
          px: 2,
          overflowX: 'hidden',
          overflowY: 'visible',
        },
        '@keyframes gatewayBrandIn': {
          from: { opacity: 0, transform: 'translateY(14px) scale(0.98)', filter: 'blur(4px)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        '@keyframes gatewayFadeUp': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        /* Chute type Tetris + bounce lock (offsets modérés pour Safari / petits vh). */
        '@keyframes gatewayTetrisDrop': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-24vh) rotate(-2deg)',
            boxShadow: 'none',
          },
          '62%': {
            opacity: 1,
            transform: 'translateY(8px) rotate(0.5deg)',
          },
          '78%': {
            transform: 'translateY(-4px) rotate(-0.25deg)',
            boxShadow: `0 0 0 1px ${SITE_DARK.brandOrange}66, 0 0 28px ${SITE_DARK.brandOrange}44`,
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) rotate(0deg)',
            boxShadow: `0 0 0 1px ${SITE_DARK.brandOrange}33, 0 14px 36px rgba(0,0,0,0.3)`,
          },
        },
        '@keyframes gatewayTetrisDropShort': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-12vh)',
          },
          '70%': {
            opacity: 1,
            transform: 'translateY(3px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes gatewayMockupDrop': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-22vh) scale(0.96)',
          },
          '65%': {
            opacity: 1,
            transform: 'translateY(6px) scale(1.01)',
          },
          '82%': {
            transform: 'translateY(-3px) scale(1)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          },
        },
      }}
    >
      <HomeV2Backdrop glowPlacement="center" intensity="spectacle" glitchDelayMs={750} />

      <Button
        size="small"
        onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
        aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
        data-testid="gateway-locale-toggle"
        sx={{
          position: 'fixed',
          top: {
            xs: 'max(0.75rem, env(safe-area-inset-top, 0px))',
            sm: 'max(1rem, env(safe-area-inset-top, 0px))',
          },
          right: {
            xs: 'max(0.75rem, env(safe-area-inset-right, 0px))',
            sm: 'max(1rem, env(safe-area-inset-right, 0px))',
          },
          zIndex: 20,
          minWidth: { xs: 40, sm: 44 },
          height: { xs: 40, sm: 44 },
          fontSize: '0.75rem',
          px: 1,
          py: 0,
          color: SITE_DARK.textSecondary,
          fontWeight: 700,
          fontFamily: FONT_BODY,
          border: `1px solid ${SITE_DARK.border}`,
          borderRadius: '50%',
          background: SITE_DARK.surface,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          '&:hover': {
            color: SITE_DARK.text,
            bgcolor: SITE_DARK.surfaceHover,
            borderColor: SITE_DARK.borderHover,
          },
        }}
      >
        {locale === 'fr' ? 'FR' : 'EN'}
      </Button>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: { xs: 1.1, sm: 1.5, md: 1.85 },
          [landscapeCompact]: { gap: 0.75 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: { xs: 1.25, md: 3 },
            alignItems: 'center',
            [tabletSplit]: {
              gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.95fr)',
              gap: 3,
            },
            [landscapeCompact]: {
              gridTemplateColumns: '1fr',
              gap: 0.5,
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
              textAlign: 'center',
              animation: playIntro
                ? 'gatewayBrandIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both'
                : 'none',
              opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
              [tabletSplit]: {
                alignItems: 'flex-start',
                textAlign: 'left',
              },
              [landscapeCompact]: {
                alignItems: 'flex-start',
                textAlign: 'left',
              },
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
                [landscapeCompact]: {
                  mb: 0.25,
                  fontSize: '0.82rem',
                },
              }}
            >
              {copy.welcomeEyebrow}
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                [tabletSplit]: { alignItems: 'flex-start' },
                [landscapeCompact]: { alignItems: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  pt: { xs: '0.4em', sm: '0.35em' },
                  fontSize: {
                    xs: 'clamp(2.85rem, 12vw, 3.6rem)',
                    sm: 'clamp(3.5rem, 8vw, 4.6rem)',
                    md: 'clamp(3.8rem, 5vw, 5.2rem)',
                  },
                  [landscapeCompact]: {
                    pt: '0.2em',
                    fontSize: 'clamp(1.85rem, 5vh, 2.4rem)',
                  },
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: { xs: '50%', md: '42%' },
                    top: 0,
                    transform: 'translateX(-50%)',
                    width: { xs: '56%', sm: '48%' },
                    height: { xs: '0.32em', md: '0.26em' },
                    pointerEvents: 'none',
                    [tabletSplit]: { left: '42%' },
                    [landscapeCompact]: { left: '42%', height: '0.22em' },
                  }}
                >
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
                      boxShadow: `0 0 22px ${SITE_DARK.brandOrange}`,
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
                  fontSize: { xs: '1.05rem', sm: '1.25rem', md: '1.4rem' },
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'lowercase',
                  color: SITE_DARK.brandOrangeLight,
                  [landscapeCompact]: {
                    mt: -0.15,
                    fontSize: '0.85rem',
                  },
                }}
              >
                {copy.brandSuffix}
              </Typography>
            </Box>

            <Typography
              component="p"
              sx={{
                m: 0,
                mt: { xs: 1, md: 1.25 },
                maxWidth: 440,
                fontFamily: FONT_DISPLAY,
                fontSize: { xs: '1.12rem', sm: '1.32rem' },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.22,
                color: SITE_DARK.text,
                animation: playIntro
                  ? 'gatewayFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both'
                  : 'none',
                opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
                [landscapeCompact]: {
                  mt: 0.4,
                  fontSize: '0.95rem',
                  lineHeight: 1.2,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                },
              }}
            >
              {copy.benefit}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'none',
              [tabletSplit]: { display: 'block' },
              [landscapeCompact]: { display: 'none' },
              animation: playIntro
                ? 'gatewayMockupDrop 0.85s cubic-bezier(0.22, 1.2, 0.36, 1) 0.18s both'
                : 'none',
              opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
            }}
          >
            <SiteBrowserMockup
              alt={copy.proofAlt}
              caption={copy.proofCaption}
              compact
              breathe={playIntro || showStatic}
            />
          </Box>
        </Box>

        <Typography
          component="p"
          sx={{
            m: 0,
            textAlign: 'center',
            fontFamily: FONT_BODY,
            fontSize: { xs: '0.92rem', sm: '1rem' },
            fontWeight: 600,
            color: SITE_DARK.text,
            animation: playIntro
              ? 'gatewayFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both'
              : 'none',
            opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
            [tabletSplit]: { textAlign: 'left' },
            [landscapeCompact]: {
              textAlign: 'left',
              fontSize: '0.82rem',
            },
          }}
        >
          {copy.prompt}
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: { xs: 0.9, sm: 1.1, md: 1.35 },
            [tabletSplit]: {
              gridTemplateColumns: '1.28fr 1fr 1fr',
              gap: 1.35,
            },
            [landscapeCompact]: {
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 0.75,
            },
          }}
        >
          {lanes.map((lane) => {
            const Icon = lane.icon
            const dropAnim = playIntro
              ? `gatewayTetrisDrop 0.9s cubic-bezier(0.22, 1.15, 0.36, 1) ${lane.delayMs}ms both`
              : 'none'
            const dropAnimShort = playIntro
              ? `gatewayTetrisDropShort 0.55s cubic-bezier(0.22, 1.1, 0.36, 1) ${Math.max(0, lane.delayMs - 120)}ms both`
              : 'none'

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
                  minHeight: 'auto',
                  p: { xs: 1.35, sm: 1.65 },
                  borderRadius: SITE_DARK.cardRadius,
                  background: lane.featured
                    ? `linear-gradient(165deg, ${SITE_DARK.surfaceHover} 0%, ${SITE_DARK.surface} 55%)`
                    : SITE_DARK.surface,
                  border: `1px solid ${lane.featured ? SITE_DARK.borderHover : SITE_DARK.border}`,
                  boxShadow: lane.featured
                    ? `0 0 0 1px ${SITE_DARK.brandOrange}33, 0 12px 36px rgba(0,0,0,0.28)`
                    : 'none',
                  transition:
                    'border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                  animation: dropAnim,
                  opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
                  [landscapeCompact]: {
                    p: 1,
                    minHeight: 0,
                    animation: dropAnimShort,
                    boxShadow: 'none',
                  },
                  [tabletSplit]: {
                    minHeight: 156,
                  },
                  '&:hover': {
                    borderColor: SITE_DARK.brandOrange,
                    background: SITE_DARK.surfaceHover,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 0 0 1px ${SITE_DARK.brandOrange}66, 0 0 32px ${SITE_DARK.brandOrange}33, 0 18px 40px rgba(0,0,0,0.35)`,
                    '& .gateway-arrow': {
                      color: SITE_DARK.brandOrangeLight,
                      transform: 'translateX(3px)',
                    },
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none !important',
                    '&:hover': { transform: 'none' },
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${SITE_DARK.brandOrange}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.7,
                    width: '100%',
                    [landscapeCompact]: { mb: 0.4 },
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: SITE_DARK.bgElevated,
                      color: SITE_DARK.brandOrangeLight,
                      border: `1px solid ${lane.featured ? SITE_DARK.borderHover : SITE_DARK.border}`,
                      boxShadow: lane.featured ? `0 0 12px ${SITE_DARK.brandOrange}44` : 'none',
                      [landscapeCompact]: { width: 28, height: 28 },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Box>
                  {lane.featured ? (
                    <Typography
                      component="span"
                      sx={{
                        ml: 'auto',
                        fontFamily: FONT_BODY,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: SITE_DARK.brandOrangeLight,
                        [landscapeCompact]: { fontSize: '0.58rem' },
                      }}
                    >
                      {copy.webBadge}
                    </Typography>
                  ) : null}
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: SITE_DARK.text,
                    mb: 0.4,
                    [landscapeCompact]: {
                      fontSize: '0.92rem',
                      mb: 0.25,
                    },
                  }}
                >
                  {lane.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    flex: 1,
                    fontFamily: FONT_BODY,
                    fontSize: { xs: '0.8rem', sm: '0.86rem' },
                    lineHeight: 1.35,
                    color: SITE_DARK.textSecondary,
                    mb: 1,
                    [landscapeCompact]: {
                      fontSize: '0.72rem',
                      lineHeight: 1.25,
                      mb: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    },
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
                    minHeight: 24,
                    fontFamily: FONT_BODY,
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: SITE_DARK.brandOrange,
                    [landscapeCompact]: { fontSize: '0.78rem' },
                  }}
                >
                  {lane.cta}
                  <Box
                    component="span"
                    className="gateway-arrow"
                    aria-hidden
                    sx={{
                      display: 'inline-block',
                      transition: 'color 0.25s ease, transform 0.25s ease',
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
          spacing={{ xs: 1, sm: 1.5 }}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: '100%',
            pt: 0.15,
            animation: playIntro
              ? 'gatewayFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.72s both'
              : 'none',
            opacity: hideUntilIntro ? 0 : showStatic ? 1 : undefined,
            [landscapeCompact]: {
              flexDirection: 'row',
              justifyContent: 'center',
              pt: 0,
              gap: 1,
            },
          }}
        >
          <Box
            component="a"
            href={SUPPORT_PHONE_HREF}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              minHeight: 44,
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
              transition: 'border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
              boxSizing: 'border-box',
              '&:hover': {
                borderColor: SITE_DARK.borderHover,
                color: SITE_DARK.brandOrangeLight,
                boxShadow: `0 0 20px ${SITE_DARK.brandOrange}33`,
              },
              [landscapeCompact]: {
                fontSize: '0.8rem',
                px: 1.25,
                py: 0.5,
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
              minHeight: 44,
              fontFamily: FONT_BODY,
              fontSize: '0.88rem',
              fontWeight: 700,
              color: SITE_DARK.text,
              textDecoration: 'none',
              px: 1.75,
              py: 0.75,
              borderRadius: 999,
              border: `1px solid ${SITE_DARK.borderHover}`,
              background: SITE_DARK.surface,
              transition: 'border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
              boxSizing: 'border-box',
              '&:hover': {
                borderColor: SITE_DARK.brandOrange,
                color: SITE_DARK.brandOrangeLight,
                boxShadow: `0 0 20px ${SITE_DARK.brandOrange}33`,
              },
              [landscapeCompact]: {
                fontSize: '0.8rem',
                px: 1.25,
                py: 0.5,
              },
            }}
          >
            {copy.demosHint} →
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
