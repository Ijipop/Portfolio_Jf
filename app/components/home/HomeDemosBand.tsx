'use client'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import {
  BRAND_GLITCH_GRADIENT,
  buildPaletteGlitchGradient,
} from '@/components/shared/IjipopGlitchTitle'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { DESIGN_TOKENS } from '@/design-system/constants'
import {
  siteDarkSectionBandBackground,
  siteDarkSectionBandHoverShadow,
  siteDarkSectionBandShadow,
  siteLightSectionBandBackground,
  siteLightSectionBandHoverShadow,
  siteLightSectionBandShadow,
} from '@/design-system/siteDarkSurfaces'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useMemo } from 'react'

/** Même largeur que ClientProofSection (« Projet livré »). */
const PROOF_BAND_MAX_WIDTH = 860

export default function HomeDemosBand() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const { mode: presentationMode } = usePresentationMode()
  const isSiteDark = useSiteDarkChrome()

  const accentGradient = useMemo(
    () =>
      presentationMode === 'beige'
        ? BRAND_GLITCH_GRADIENT
        : buildPaletteGlitchGradient(primary, secondary, accent),
    [presentationMode, primary, secondary, accent],
  )

  const outerBackground = useMemo(
    () =>
      isSiteDark
        ? siteDarkSectionBandBackground(primary, secondary)
        : siteLightSectionBandBackground(primary, secondary),
    [isSiteDark, primary, secondary],
  )

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute: false,
    isSiteDark,
    variant: 'elevated',
    level: 'balanced',
    interactive: true,
  })

  return (
    <ScrollReveal direction="up" delay={0.08}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          mb: { xs: 5, md: 8 },
          mx: 'auto',
          maxWidth: PROOF_BAND_MAX_WIDTH,
          p: { xs: 2.75, sm: 3.5 },
          pl: { xs: 2.75, sm: 3.75 },
          borderRadius: `${DESIGN_TOKENS.borderRadius.banner}px`,
          border: `1px solid ${alpha(primary, isSiteDark ? 0.34 : 0.24)}`,
          background: outerBackground,
          boxShadow: isSiteDark
            ? siteDarkSectionBandShadow
            : siteLightSectionBandShadow,
          overflow: 'hidden',
          transition: DESIGN_TOKENS.transitions.slow,
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: isSiteDark
                ? siteDarkSectionBandHoverShadow
                : siteLightSectionBandHoverShadow,
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(68% 85% at 0% 0%, ${alpha(secondary, isSiteDark ? 0.2 : 0.12)} 0%, transparent 55%),
              radial-gradient(58% 70% at 100% 100%, ${alpha(primary, isSiteDark ? 0.18 : 0.1)} 0%, transparent 52%)`,
            pointerEvents: 'none',
          },
          ...surfaceSx,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            background: accentGradient,
            boxShadow: `0 0 18px ${alpha(secondary, 0.35)}`,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            alignItems: { sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              width: { xs: 52, sm: 58 },
              height: { xs: 52, sm: 58 },
              flexShrink: 0,
              borderRadius: `${DESIGN_TOKENS.borderRadius.bannerInner}px`,
              display: 'grid',
              placeItems: 'center',
              background: accentGradient,
              boxShadow: `0 10px 24px ${alpha(secondary, 0.28)}, inset 0 1px 0 ${alpha('#fff', 0.35)}`,
            }}
          >
            <ViewQuiltOutlinedIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#fff' }} aria-hidden />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                mb: 1.15,
                px: 1.15,
                py: 0.45,
                borderRadius: 999,
                border: `1px solid ${alpha(secondary, 0.3)}`,
                bgcolor: alpha(secondary, isSiteDark ? 0.16 : 0.1),
                boxShadow: `inset 0 1px 0 ${alpha('#fff', isSiteDark ? 0.1 : 0.45)}`,
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 15, color: secondary }} aria-hidden />
              <Typography
                component="span"
                sx={{
                  color: secondary,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '0.68rem',
                  lineHeight: 1.2,
                }}
              >
                {t('home.demosBandKicker')}
              </Typography>
            </Box>

            <Typography
              component="h2"
              variant="h5"
              sx={{
                color: textColor,
                fontWeight: 900,
                mb: 1.25,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                fontSize: { xs: '1.28rem', sm: '1.45rem', md: '1.55rem' },
              }}
            >
              {t('home.demosBandTitle')}
            </Typography>

            <Typography
              sx={{
                color: textColor,
                opacity: 0.9,
                lineHeight: 1.65,
                mb: 2,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                maxWidth: 640,
              }}
            >
              {t('home.demosBandLead')}
            </Typography>

            <Link href="/demos" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <CTAButton variant="primary" size="medium">
                {t('home.demosBandCta')}
              </CTAButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
