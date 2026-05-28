'use client'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useMemo } from 'react'

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
  const { primary } = useThemeColors()
  const { customTheme } = useAdvancedTheme()
  const { mode: presentationMode } = usePresentationMode()

  const outerBackground = useMemo(
    () =>
      presentationMode === 'beige'
        ? `linear-gradient(135deg, ${alpha(customTheme.bg, 0.9)} 0%, ${alpha(customTheme.bg2, 0.84)} 48%, ${alpha(primary, 0.08)} 100%)`
        : `linear-gradient(135deg, ${alpha(customTheme.bg, 0.96)} 0%, ${alpha(customTheme.bg2, 0.92)} 45%, ${alpha(primary, 0.18)} 100%)`,
    [presentationMode, customTheme.bg, customTheme.bg2, primary],
  )

  return (
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        component="section"
        sx={{
          mb: { xs: 5, md: 8 },
          mx: 'auto',
          maxWidth: 860,
          p: { xs: 2.5, sm: 3.25 },
          borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
          border: `1px solid ${alpha(primary, 0.28)}`,
          background: outerBackground,
          boxShadow: `0 12px 36px ${alpha(primary, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 } }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 48, color: primary, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}
            aria-hidden
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {kicker ? (
              <Typography
                component="p"
                sx={{
                  color: primary,
                  fontWeight: 900,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                  mb: 1,
                }}
              >
                {kicker}
              </Typography>
            ) : null}
            <Typography
              component="h2"
              variant="h5"
              sx={{ color: textColor, fontWeight: 800, mb: 1.25, letterSpacing: '-0.02em', lineHeight: 1.25 }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: textColor,
                opacity: 0.88,
                lineHeight: 1.7,
                mb: proofOnly ? 1.5 : 2.5,
                fontSize: '0.98rem',
              }}
            >
              {body}
            </Typography>
            {proofOnly ? (
              <Link href={projectHref} style={{ textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{
                    color: primary,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {projectLabel} →
                </Typography>
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
