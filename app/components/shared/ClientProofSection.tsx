'use client'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useMemo } from 'react'
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
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

type ClientProofSectionProps = {
  kicker?: string
  title: string
  body: string
  projectLabel: string
  projectHref?: string
  ctaLabel?: string
  ctaHref?: string
  /** Sans bouton estimation — preuve textuelle + lien projet seulement */
  proofOnly?: boolean
}

export default function ClientProofSection({
  kicker,
  title,
  body,
  projectLabel,
  projectHref = '/portfolio/projets',
  ctaLabel,
  ctaHref,
  proofOnly = false,
}: ClientProofSectionProps) {
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
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          mb: { xs: 5, md: 8 },
          mx: 'auto',
          maxWidth: 860,
          p: { xs: 2.75, sm: 3.5 },
          pl: { xs: 2.75, sm: 3.75 },
          borderRadius: `${DESIGN_TOKENS.borderRadius.banner}px`,
          border: `1px solid ${alpha(primary, isSiteDark ? 0.34 : 0.26)}`,
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
            background: `radial-gradient(72% 90% at 100% 0%, ${alpha(primary, isSiteDark ? 0.22 : 0.14)} 0%, transparent 58%)`,
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
            boxShadow: `0 0 18px ${alpha(primary, 0.35)}`,
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
              boxShadow: `0 10px 24px ${alpha(primary, 0.28)}, inset 0 1px 0 ${alpha('#fff', 0.35)}`,
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#fff' }} aria-hidden />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {kicker ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  mb: 1.15,
                  px: 1.15,
                  py: 0.45,
                  borderRadius: 999,
                  border: `1px solid ${alpha(primary, 0.28)}`,
                  bgcolor: alpha(primary, isSiteDark ? 0.16 : 0.09),
                  boxShadow: `inset 0 1px 0 ${alpha('#fff', isSiteDark ? 0.1 : 0.45)}`,
                }}
              >
                <VerifiedOutlinedIcon sx={{ fontSize: 15, color: primary }} aria-hidden />
                <Typography
                  component="span"
                  sx={{
                    color: primary,
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.68rem',
                    lineHeight: 1.2,
                  }}
                >
                  {kicker}
                </Typography>
              </Box>
            ) : null}
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
              {title}
            </Typography>
            <Typography
              sx={{
                color: textColor,
                opacity: 0.9,
                lineHeight: 1.65,
                mb: proofOnly ? 2 : 2.5,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                maxWidth: 640,
              }}
            >
              {body}
            </Typography>
            {proofOnly ? (
              <Link href={projectHref} style={{ textDecoration: 'none', display: 'inline-flex' }}>
                <CTAButton variant="outline" size="medium">
                  {projectLabel}
                </CTAButton>
              </Link>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                {ctaLabel && ctaHref ? (
                  <Link href={ctaHref} style={{ textDecoration: 'none' }}>
                    <CTAButton variant="primary" size="medium">
                      {ctaLabel}
                    </CTAButton>
                  </Link>
                ) : null}
                <Link href={projectHref} style={{ textDecoration: 'none' }}>
                  <CTAButton variant="outline" size="medium">
                    {projectLabel}
                  </CTAButton>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
