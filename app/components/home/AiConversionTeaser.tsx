'use client'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { DESIGN_TOKENS } from '@/design-system/constants'
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
  const theme = useTheme()
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const mobileFlatMetrics = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })

  return (
    <ScrollReveal direction="up" delay={0.04}>
      <Box
        sx={{
          mb: { xs: 4.5, md: 6, lg: 4.75, xl: 4.25 },
          px: { xs: 2, sm: 3, md: 3.5, lg: 2.75, xl: 2.5 },
          py: { xs: 3, sm: 3.5, md: 3.5, lg: 2.75, xl: 2.5 },
          borderRadius: { xs: '28px', sm: `${DESIGN_TOKENS.borderRadius.medium}px` },
          border: `1px solid ${alpha(primary, 0.32)}`,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(primary, 0.18)} 0%, ${alpha('#020617', 0.64)} 48%, ${alpha(secondary, 0.16)} 100%)`
              : `linear-gradient(135deg, ${alpha(primary, 0.1)} 0%, ${alpha('#ffffff', 0.72)} 48%, ${alpha(secondary, 0.08)} 100%)`,
          boxShadow: `0 24px 70px ${alpha(primary, 0.18)}`,
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
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gap: { xs: 2.5, md: 2.75, lg: 2, xl: 1.75 },
            gridTemplateColumns: {
              xs: '1fr',
              md: 'minmax(0, 1.02fr) minmax(300px, 0.92fr)',
              lg: 'minmax(0, 1.04fr) minmax(252px, 0.84fr)',
              xl: 'minmax(0, 1.06fr) minmax(240px, 0.8fr)',
            },
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
                fontSize: { xs: '0.76rem', lg: '0.72rem', xl: '0.7rem' },
                mb: { xs: 1.25, lg: 1, xl: 0.9 },
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: { xs: 18, lg: 17, xl: 16 } }} />
              {t('home.aiImpactKicker')}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: textColor,
                fontWeight: 950,
                letterSpacing: '-0.055em',
                lineHeight: { xs: 1.04, lg: 1.08, xl: 1.1 },
                fontSize: {
                  xs: '2rem',
                  sm: '2.35rem',
                  md: '2.55rem',
                  lg: '2.02rem',
                  xl: '1.88rem',
                },
                mb: { xs: 1.35, lg: 1.1, xl: 1 },
              }}
            >
              {t('home.aiImpactTitle')}
            </Typography>
            <Typography
              sx={{
                color: textColor,
                opacity: 0.88,
                lineHeight: 1.6,
                fontSize: { xs: '0.98rem', md: '1.02rem', lg: '0.94rem', xl: '0.9rem' },
                maxWidth: { xs: 620, lg: 540, xl: 500 },
                mx: { xs: 'auto', md: 0 },
                mb: { xs: 2.35, lg: 1.85, xl: 1.65 },
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
                <CTAButton variant="primary" size="medium">
                  {t('home.aiImpactPrimaryCta')}
                </CTAButton>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: mobileFlatMetrics ? 'flex' : 'grid',
              flexDirection: mobileFlatMetrics ? 'column' : undefined,
              gridTemplateColumns: mobileFlatMetrics ? undefined : { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: mobileFlatMetrics ? 2 : { xs: 1.25, md: 1.2, lg: 1, xl: 0.9 },
            }}
          >
            <Box
              sx={{
                gridColumn: mobileFlatMetrics ? undefined : { xs: 'auto', sm: '1 / -1' },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: {
                  xs: `${DESIGN_TOKENS.borderRadius.large}px`,
                  sm: `${DESIGN_TOKENS.borderRadius.medium}px`,
                },
                border: (muiTheme) =>
                  mobileFlatMetrics
                    ? `1px solid ${alpha(primary, muiTheme.palette.mode === 'dark' ? 0.14 : 0.12)}`
                    : `1px solid ${alpha(primary, 0.28)}`,
                minHeight: { xs: 190, sm: 230, md: 240, lg: 200, xl: 186 },
                background: (muiTheme) =>
                  muiTheme.palette.mode === 'dark' ? alpha('#020617', 0.72) : alpha('#ffffff', 0.58),
                boxShadow: mobileFlatMetrics
                  ? `0 8px 24px ${alpha(primary, 0.07)}`
                  : `0 18px 46px ${alpha(primary, 0.16)}`,
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
                  minHeight: { xs: 190, sm: 230, md: 240, lg: 200, xl: 186 },
                  objectFit: 'cover',
                  objectPosition: 'center',
                  opacity: 0.88,
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

            {mobileFlatMetrics ? (
              <Stack
                divider={
                  <Divider flexItem sx={{ borderColor: alpha(primary, theme.palette.mode === 'dark' ? 0.14 : 0.1) }} />
                }
                sx={{ width: '100%' }}
              >
                {METRICS.map(({ icon: Icon, labelKey, hintKey }) => (
                  <Box
                    key={labelKey}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      py: 1.1,
                      color: textColor,
                    }}
                  >
                    <Icon sx={{ color: primary, fontSize: 26, flexShrink: 0, mt: 0.2 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 900,
                          lineHeight: 1.28,
                          fontSize: '0.78rem',
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
                          fontSize: '0.72rem',
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
              </Stack>
            ) : (
              METRICS.map(({ icon: Icon, labelKey, hintKey }) => (
                <Box
                  key={labelKey}
                  sx={{
                    p: { xs: 1.65, md: 1.5, lg: 1.2, xl: 1.05 },
                    borderRadius: { xs: 3, lg: 2.5 },
                    border: `1px solid ${alpha(primary, 0.22)}`,
                    background: (muiTheme) =>
                      muiTheme.palette.mode === 'dark' ? alpha('#ffffff', 0.045) : alpha('#ffffff', 0.62),
                    color: textColor,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 0.85, lg: 0.55, xl: 0.5 },
                  }}
                >
                  <Icon sx={{ color: primary, fontSize: { xs: 28, sm: 30, lg: 26, xl: 24 }, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        lineHeight: 1.28,
                        fontSize: { xs: '0.78rem', sm: '0.82rem', lg: '0.76rem', xl: '0.72rem' },
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
                        lineHeight: 1.38,
                        fontSize: { xs: '0.72rem', sm: '0.76rem', lg: '0.7rem', xl: '0.66rem' },
                        opacity: 0.86,
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                      }}
                    >
                      {t(hintKey)}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}

            <Box
              sx={{
                gridColumn: mobileFlatMetrics ? undefined : { xs: 'auto', sm: '1 / -1' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: textColor,
                opacity: 0.78,
                px: 0.5,
                mt: { lg: -0.25, xl: -0.35 },
              }}
            >
              <FactCheckOutlinedIcon sx={{ color: primary, fontSize: { xs: 20, lg: 18, xl: 17 }, flexShrink: 0 }} />
              <Typography variant="caption" sx={{ lineHeight: 1.45, fontSize: { lg: '0.68rem', xl: '0.65rem' } }}>
                {t('home.aiImpactDisclosure')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
