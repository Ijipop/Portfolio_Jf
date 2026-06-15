'use client'

import { useMemo } from 'react'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { useSiteThemeTokens } from '@/hooks/useSiteThemeTokens'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'

const METRICS = [
  {
    icon: MarkEmailReadOutlinedIcon,
    labelKey: 'home.aiImpactMetricLeads',
    hintKey: 'home.aiImpactMetricLeadsHint',
  },
  {
    icon: ManageSearchOutlinedIcon,
    labelKey: 'home.aiImpactMetricQualified',
    hintKey: 'home.aiImpactMetricQualifiedHint',
  },
  {
    icon: AutoAwesomeOutlinedIcon,
    labelKey: 'home.aiImpactMetricDiagnostics',
    hintKey: 'home.aiImpactMetricDiagnosticsHint',
  },
  {
    icon: QueryStatsOutlinedIcon,
    labelKey: 'home.aiImpactMetricConversion',
    hintKey: 'home.aiImpactMetricConversionHint',
  },
]

export default function AiConversionTeaser() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const siteDarkChrome = useSiteDarkChrome()
  const tokens = useSiteThemeTokens()

  const outerBackground = useMemo(
    () =>
      `linear-gradient(135deg, ${tokens.surface} 0%, ${alpha(tokens.bg, 0.92)} 48%, ${alpha(primary, 0.14)} 100%)`,
    [tokens.surface, tokens.bg, primary],
  )

  const videoFrameBackground = useMemo(
    () => alpha(tokens.bg, 0.85),
    [tokens.bg],
  )

  const metricCardBackground = useMemo(
    () =>
      `linear-gradient(145deg, ${alpha(tokens.bg, 0.88)} 0%, ${tokens.surface} 55%, ${alpha(primary, 0.1)} 100%)`,
    [tokens.bg, tokens.surface, primary],
  )

  const metricBorder = useMemo(
    () => alpha(primary, 0.28),
    [primary],
  )

  return (
    <ScrollReveal direction="up" delay={0.04}>
      <Box
        sx={{
          mb: { xs: 4.5, md: 7 },
          px: { xs: 2.25, sm: 3, md: 4 },
          py: { xs: 3, sm: 3.5, md: 4.25 },
          borderRadius: DESIGN_TOKENS.borderRadius.banner,
          border: `1px solid ${alpha(primary, 0.32)}`,
          borderBottom: `1px solid ${alpha(primary, 0.14)}`,
          background: outerBackground,
          boxShadow: `0 12px 36px -10px ${alpha(primary, 0.14)}, 0 4px 16px -6px ${alpha(primary, 0.08)}`,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-25% auto auto 58%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(accent, 0.28)} 0%, transparent 68%)`,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 20,
            pointerEvents: 'none',
            background: `linear-gradient(to bottom, transparent, ${alpha(tokens.bg, 0.55)})`,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              component="p"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                color: primary,
                fontWeight: 950,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontSize: '0.76rem',
                mb: 1.25,
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />
              {t('home.aiImpactKicker')}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: textColor,
                fontWeight: 950,
                letterSpacing: '-0.055em',
                lineHeight: 1.04,
                fontSize: { xs: '2rem', sm: '2.45rem', md: '3rem' },
                mb: 1.35,
              }}
            >
              {t('home.aiImpactTitle')}
            </Typography>
            <Typography
              sx={{
                color: textColor,
                opacity: 0.88,
                lineHeight: 1.65,
                fontSize: { xs: '0.98rem', md: '1.05rem' },
                maxWidth: 620,
                mx: { xs: 'auto', md: 0 },
                mb: 2.35,
              }}
            >
              {t('home.aiImpactLead')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1.25,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Link href="/portfolio/contact#diagnostic-ia" style={{ textDecoration: 'none' }}>
                <CTAButton
                  variant="primary"
                  size="medium"
                  sx={{ borderRadius: DESIGN_TOKENS.borderRadius.banner }}
                >
                  {t('home.aiImpactPrimaryCta')}
                </CTAButton>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                gridColumn: { xs: 'auto', sm: '1 / -1' },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: DESIGN_TOKENS.borderRadius.banner,
                border: `1px solid ${alpha(primary, 0.28)}`,
                minHeight: { xs: 190, sm: 230, md: 260 },
                background: videoFrameBackground,
                boxShadow: `0 18px 46px ${alpha(primary, 0.16)}`,
              }}
            >
              <Box
                component="video"
                src="/img/ijipopKeyboardHero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  minHeight: { xs: 190, sm: 230, md: 260 },
                  objectFit: 'cover',
                  objectPosition: 'center',
                  opacity: 0.88,
                  borderRadius: DESIGN_TOKENS.borderRadius.banner,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: `linear-gradient(135deg, ${alpha(primary, 0.18)} 0%, transparent 45%, ${alpha(secondary, 0.22)} 100%)`,
                }}
              />
            </Box>

            {METRICS.map(({ icon: Icon, labelKey, hintKey }) => (
              <Box
                key={labelKey}
                sx={{
                  p: 1.65,
                  borderRadius: DESIGN_TOKENS.borderRadius.bannerInner,
                  border: `1px solid ${metricBorder}`,
                  background: metricCardBackground,
                  backdropFilter: siteDarkChrome ? 'blur(12px)' : 'blur(10px)',
                  WebkitBackdropFilter: siteDarkChrome ? 'blur(12px)' : 'blur(10px)',
                  color: textColor,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.85,
                }}
              >
                <Icon sx={{ color: primary, fontSize: 30, flexShrink: 0 }} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1.28,
                      fontSize: { xs: '0.78rem', sm: '0.82rem' },
                      letterSpacing: '0.01em',
                      hyphens: 'auto',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      mb: 0.35,
                    }}
                  >
                    {t(labelKey)}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.4,
                      fontSize: { xs: '0.72rem', sm: '0.76rem' },
                      opacity: 0.86,
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                    }}
                  >
                    {t(hintKey)}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                gridColumn: { xs: 'auto', sm: '1 / -1' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: textColor,
                opacity: 0.78,
                px: 0.5,
              }}
            >
              <FactCheckOutlinedIcon sx={{ color: primary, fontSize: 20, flexShrink: 0 }} />
              <Typography variant="caption" sx={{ lineHeight: 1.45 }}>
                {t('home.aiImpactDisclosure')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
