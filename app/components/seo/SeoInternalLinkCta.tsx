'use client'

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useSiteThemeTokens } from '@/hooks/useSiteThemeTokens'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useMemo } from 'react'

type SeoInternalLinkCtaProps = {
  title: string
  body: string
  href: string
  linkLabel: string
  variant?: 'compact' | 'full'
}

export default function SeoInternalLinkCta({
  title,
  body,
  href,
  linkLabel,
  variant = 'full',
}: SeoInternalLinkCtaProps) {
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const tokens = useSiteThemeTokens()

  const outerBackground = useMemo(
    () =>
      `linear-gradient(135deg, ${tokens.surface} 0%, ${alpha(tokens.bg, 0.88)} 48%, ${alpha(primary, 0.1)} 100%)`,
    [tokens.surface, tokens.bg, primary],
  )

  const isCompact = variant === 'compact'

  return (
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        component="aside"
        sx={{
          mt: { xs: 4, md: 5 },
          mb: { xs: 2, md: 3 },
          mx: 'auto',
          maxWidth: isCompact ? 720 : 860,
          p: { xs: 2.25, sm: 3 },
          borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
          border: `1px solid ${alpha(primary, 0.28)}`,
          background: outerBackground,
          boxShadow: `0 12px 36px ${alpha(primary, 0.12)}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isCompact ? { xs: 'column', sm: 'row' } : 'column',
            alignItems: isCompact ? { xs: 'flex-start', sm: 'center' } : 'center',
            gap: isCompact ? { xs: 2, sm: 2.5 } : 2,
            textAlign: isCompact ? 'left' : 'center',
          }}
        >
          {!isCompact ? (
            <LanguageOutlinedIcon sx={{ fontSize: 48, color: primary }} aria-hidden />
          ) : null}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component="h2"
              variant={isCompact ? 'h6' : 'h5'}
              sx={{
                color: textColor,
                fontWeight: 800,
                mb: isCompact ? 0.75 : 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: textColor,
                opacity: 0.88,
                lineHeight: 1.65,
                fontSize: isCompact ? '0.92rem' : '1rem',
              }}
            >
              {body}
            </Typography>
          </Box>
          <Link href={href} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <CTAButton variant="primary" size={isCompact ? 'medium' : 'large'}>
              {linkLabel}
            </CTAButton>
          </Link>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
