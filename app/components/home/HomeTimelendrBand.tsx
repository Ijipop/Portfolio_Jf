'use client'

import AppleIcon from '@mui/icons-material/Apple'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined'
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useMemo } from 'react'
import CTAButton from '@/components/shared/CTAButton'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTimelendrLatestDownloads } from '@/hooks/useTimelendrLatestDownloads'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'

const BAND_MAX_WIDTH = 860
const TIMELENDR_TEAL = '#0d9488'
const TIMELENDR_TEAL_DARK = '#0f766e'
const FALLBACK_DOWNLOADS_HREF = '/logiciel/timelendr#timelendr-downloads'

export default function HomeTimelendrBand() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary, secondary } = useThemeColors()
  const { customTheme } = useAdvancedTheme()
  const { mode: presentationMode } = usePresentationMode()
  const { windowsUrl, macosUrl } = useTimelendrLatestDownloads()
  const siteDarkChrome = useSiteDarkChrome()

  const betaContactHref = `/portfolio/contact?subject=${encodeURIComponent(t('home.timelendrBandBetaSubject'))}`

  const outerBackground = useMemo(
    () =>
      siteDarkChrome
        ? `linear-gradient(145deg, ${alpha('#0f172a', 0.94)} 0%, ${alpha(TIMELENDR_TEAL, 0.22)} 42%, ${alpha(primary, 0.1)} 100%)`
        : presentationMode === 'beige'
          ? `linear-gradient(145deg, ${alpha('#fffefb', 0.98)} 0%, ${alpha(customTheme.bg2, 0.9)} 40%, ${alpha(TIMELENDR_TEAL, 0.1)} 100%)`
          : `linear-gradient(145deg, ${alpha('#ffffff', 0.98)} 0%, ${alpha(customTheme.bg, 0.92)} 38%, ${alpha(TIMELENDR_TEAL, 0.12)} 100%)`,
    [siteDarkChrome, presentationMode, customTheme.bg, customTheme.bg2, primary],
  )

  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute: false,
    isSiteDark: siteDarkChrome,
    variant: 'elevated',
    level: 'balanced',
    interactive: false,
  })

  const downloadBtnSx = {
    borderRadius: DESIGN_TOKENS.borderRadius.banner,
    background: `linear-gradient(135deg, ${TIMELENDR_TEAL} 0%, ${TIMELENDR_TEAL_DARK} 100%)`,
    boxShadow: `0 10px 28px ${alpha(TIMELENDR_TEAL, 0.32)}`,
    '&:hover': {
      background: `linear-gradient(135deg, #14b8a6 0%, ${TIMELENDR_TEAL} 100%)`,
    },
  }

  return (
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        component="section"
        aria-labelledby="home-timelendr-band-title"
        sx={{
          position: 'relative',
          mb: { xs: 5, md: 7 },
          mx: 'auto',
          maxWidth: BAND_MAX_WIDTH,
          p: { xs: 2.75, sm: 3.5, md: 4 },
          borderRadius: `${DESIGN_TOKENS.borderRadius.banner}px`,
          border: `1px solid ${alpha(TIMELENDR_TEAL, siteDarkChrome ? 0.38 : 0.28)}`,
          background: outerBackground,
          boxShadow: siteDarkChrome
            ? `0 22px 52px ${alpha('#000', 0.38)}, inset 0 1px 0 ${alpha('#fff', 0.06)}`
            : `0 22px 48px ${alpha(secondary, 0.12)}, inset 0 1px 0 ${alpha('#fff', 0.75)}`,
          overflow: 'hidden',
          ...surfaceSx,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: `linear-gradient(180deg, ${TIMELENDR_TEAL} 0%, ${alpha(primary, 0.85)} 100%)`,
            borderRadius: '4px 0 0 4px',
          },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: '-8%',
            top: '-20%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(TIMELENDR_TEAL, 0.2)} 0%, transparent 68%)`,
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            component="p"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: TIMELENDR_TEAL,
              fontWeight: 950,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontSize: '0.74rem',
              mb: 1.25,
            }}
          >
            <OfflineBoltOutlinedIcon sx={{ fontSize: 17 }} />
            {t('home.timelendrBandKicker')}
          </Typography>

          <Typography
            id="home-timelendr-band-title"
            component="h2"
            sx={{
              color: textColor,
              fontWeight: 950,
              letterSpacing: '-0.04em',
              lineHeight: 1.12,
              fontSize: { xs: '1.45rem', sm: '1.85rem', md: '2.05rem' },
              mb: 1.25,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            {t('home.timelendrBandTitle')}
          </Typography>

          <Typography
            sx={{
              color: textColor,
              opacity: 0.86,
              lineHeight: 1.6,
              fontSize: { xs: '0.92rem', md: '0.98rem' },
              maxWidth: 520,
              mx: 'auto',
              mb: 2.5,
            }}
          >
            {t('home.timelendrBandLead')}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              gap: 1.25,
              justifyContent: 'center',
              alignItems: 'stretch',
              mb: 2.25,
            }}
          >
            <CTAButton
              variant="primary"
              size="medium"
              href={windowsUrl ?? FALLBACK_DOWNLOADS_HREF}
              target={windowsUrl ? '_blank' : undefined}
              rel={windowsUrl ? 'noopener noreferrer' : undefined}
              startIcon={<WindowOutlinedIcon />}
              endIcon={<DownloadOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{ flex: { sm: '1 1 160px' }, maxWidth: { sm: 240 }, ...downloadBtnSx }}
            >
              {t('home.timelendrBandCtaWindows')}
            </CTAButton>

            <CTAButton
              variant="primary"
              size="medium"
              href={macosUrl ?? FALLBACK_DOWNLOADS_HREF}
              target={macosUrl ? '_blank' : undefined}
              rel={macosUrl ? 'noopener noreferrer' : undefined}
              startIcon={<AppleIcon />}
              endIcon={<DownloadOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{ flex: { sm: '1 1 160px' }, maxWidth: { sm: 240 }, ...downloadBtnSx }}
            >
              {t('home.timelendrBandCtaMacos')}
            </CTAButton>

            <CTAButton
              variant="outline"
              size="medium"
              href={betaContactHref}
              startIcon={<MailOutlineIcon />}
              sx={{
                flex: { sm: '1 1 160px' },
                maxWidth: { sm: 280 },
                borderRadius: DESIGN_TOKENS.borderRadius.banner,
                borderColor: alpha(TIMELENDR_TEAL, 0.45),
                color: textColor,
                minHeight: 44,
                '&:hover': {
                  borderColor: TIMELENDR_TEAL,
                  bgcolor: alpha(TIMELENDR_TEAL, 0.08),
                },
              }}
            >
              {t('home.timelendrBandCtaBeta')}
            </CTAButton>
          </Box>

          <Typography
            component="p"
            sx={{
              color: textColor,
              opacity: 0.78,
              fontSize: { xs: '0.84rem', md: '0.9rem' },
              lineHeight: 1.55,
              fontWeight: 600,
            }}
          >
            {t('home.timelendrBandBetaNote')}
          </Typography>

          <Typography
            component="p"
            sx={{ mt: 1.5, fontSize: '0.8rem' }}
          >
            <Link
              href="/logiciel/timelendr"
              style={{ textDecoration: 'none' }}
            >
              <Box
                component="span"
                sx={{
                  color: '#2dd4bf',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  textUnderlineOffset: 4,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#99f6e4',
                  },
                }}
              >
                {t('home.timelendrBandDiscover')}
              </Box>
            </Link>
          </Typography>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
