'use client'

import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useMemo } from 'react'
import ThreeDCardComponent from '@/components/ThreeDCard'
import {
  BRAND_BORDER_BEAM_COLOR_FROM,
  BRAND_BORDER_BEAM_COLOR_TO,
  BRAND_GLITCH_GRADIENT,
  buildPaletteGlitchGradient,
} from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import PortfolioHomeOfferEcosystem from './PortfolioHomeOfferEcosystem'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import type { SvgIconComponent } from '@mui/icons-material'

const CONTACT_PATH = '/portfolio/contact'

const SERVICES: {
  icon: SvgIconComponent
  titleKey: string
  leadKey: string
  linkKey: string
}[] = [
  {
    icon: LanguageOutlinedIcon,
    titleKey: 'home.servicesHomeNewTitle',
    leadKey: 'home.servicesHomeNewLead',
    linkKey: 'home.servicesHomeNewCta',
  },
  {
    icon: AutorenewOutlinedIcon,
    titleKey: 'home.servicesHomeImproveTitle',
    leadKey: 'home.servicesHomeImproveLead',
    linkKey: 'home.servicesHomeImproveCta',
  },
  {
    icon: HandymanOutlinedIcon,
    titleKey: 'home.servicesHomeToolsTitle',
    leadKey: 'home.servicesHomeToolsLead',
    linkKey: 'home.servicesHomeToolsCta',
  },
]

export default function PortfolioServicesSection() {
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const { customTheme } = useAdvancedTheme()
  const textColor = useTextColor()
  const { primary, secondary, accent } = useThemeColors()
  const bonusBlockBackground = useMemo(
    () =>
      presentationMode === 'beige'
        ? `linear-gradient(140deg, ${alpha(customTheme.bg, 0.92)} 0%, ${alpha(customTheme.bg2, 0.88)} 52%, ${alpha(primary, 0.08)} 100%)`
        : `linear-gradient(140deg, ${alpha(customTheme.bg, 0.96)} 0%, ${alpha(customTheme.bg2, 0.92)} 42%, ${alpha(primary, 0.2)} 100%)`,
    [presentationMode, customTheme.bg, customTheme.bg2, primary],
  )
  const bonusBlockBorder = useMemo(
    () => alpha(primary, presentationMode === 'beige' ? 0.3 : 0.4),
    [presentationMode, primary],
  )
  const bonusBadgeBg = useMemo(
    () => alpha(primary, presentationMode === 'beige' ? 0.1 : 0.14),
    [presentationMode, primary],
  )
  const serviceGradient = useMemo(
    () =>
      presentationMode === 'beige'
        ? BRAND_GLITCH_GRADIENT
        : buildPaletteGlitchGradient(primary, secondary, accent),
    [presentationMode, primary, secondary, accent]
  )

  const borderBeamColors = useMemo(
    () =>
      presentationMode === 'beige'
        ? { colorFrom: BRAND_BORDER_BEAM_COLOR_FROM, colorTo: BRAND_BORDER_BEAM_COLOR_TO }
        : { colorFrom: primary, colorTo: accent },
    [presentationMode, primary, accent]
  )

  return (
    <Box id="services" sx={{ mb: { xs: 5, md: 8 }, scrollMarginTop: 96 }}>
      <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ textAlign: 'center', maxWidth: 860, mx: 'auto', mb: { xs: 3, md: 4 } }}>
          <Typography
            component="p"
            sx={{
              color: primary,
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              mb: 1,
            }}
          >
            {t('home.servicesHomeKicker')}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: textColor,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              fontSize: { xs: '2rem', md: '3.1rem' },
              lineHeight: 1.05,
              mb: 2,
            }}
          >
            {t('home.servicesHomeTitle')}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: textColor,
              opacity: 0.82,
              fontSize: { xs: '1rem', sm: '1.0625rem' },
              lineHeight: 1.55,
              maxWidth: 720,
              mx: 'auto',
              px: { xs: 0.5, sm: 0 },
            }}
          >
            {t('home.servicesHomeSubtitle')}
          </Typography>
        </Box>
      </ScrollReveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'stretch',
          '& > *:nth-of-type(3)': {
            gridColumn: { sm: '1 / -1', lg: 'auto' },
          },
        }}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          return (
            <ScrollReveal key={service.titleKey} direction="up" delay={0.06 * index} fillHeight>
              <ThreeDCardComponent
                fullHeight
                borderBeam={{
                  duration: 52,
                  size: 180,
                  delay: index * 4,
                  colorFrom: borderBeamColors.colorFrom,
                  colorTo: borderBeamColors.colorTo,
                }}
                floatingElements={1}
                sx={{
                  minHeight: 260,
                  p: { xs: 2.25, md: 2.75 },
                  '& .MuiCardContent-root': {
                    pb: '24px !important',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: DESIGN_TOKENS.borderRadius.medium,
                      display: 'grid',
                      placeItems: 'center',
                      mb: 2,
                      background: serviceGradient,
                      boxShadow: `0 18px 38px ${primary}2f`,
                    }}
                  >
                    <Icon sx={{ color: 'white', fontSize: 30 }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: textColor, fontWeight: 900, mb: 1, lineHeight: 1.15 }}>
                    {t(service.titleKey)}
                  </Typography>
                  <Typography
                    sx={{
                      color: textColor,
                      opacity: 0.84,
                      lineHeight: 1.6,
                      mb: 0,
                      flex: 1,
                    }}
                  >
                    {t(service.leadKey)}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2.5 }}>
                    <Link href={CONTACT_PATH} style={{ textDecoration: 'none' }}>
                      <Typography
                        component="span"
                        sx={{
                          color: primary,
                          fontWeight: 900,
                          letterSpacing: '0.02em',
                          backgroundImage: `linear-gradient(${primary}, ${primary})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: '0 100%',
                          backgroundSize: '0% 2px',
                          transition: DESIGN_TOKENS.transitions.normal,
                          '&:hover': { backgroundSize: '100% 2px' },
                        }}
                      >
                        {t(service.linkKey)}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </ThreeDCardComponent>
            </ScrollReveal>
          )
        })}
      </Box>

      <ScrollReveal direction="up" delay={0.08}>
        <Box
          sx={{
            mt: { xs: 3.5, md: 4.5 },
            px: { xs: 2, sm: 2.75, md: 3.25 },
            py: { xs: 2.75, md: 3.25 },
            borderRadius: DESIGN_TOKENS.borderRadius.banner,
            border: `1px solid ${bonusBlockBorder}`,
            background: bonusBlockBackground,
            boxShadow: `0 14px 34px ${alpha(primary, 0.15)}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 1.35,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.05,
                py: 0.45,
                borderRadius: 999,
                border: `1px solid ${alpha(primary, presentationMode === 'beige' ? 0.42 : 0.5)}`,
                backgroundColor: bonusBadgeBg,
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 16, color: primary }} />
              <Typography
                component="p"
                sx={{
                  color: primary,
                  fontWeight: 900,
                  letterSpacing: '0.01em',
                  fontSize: { xs: '0.77rem', sm: '0.8rem' },
                  textAlign: 'center',
                }}
              >
                {t('home.servicesEcosystemBonusLabel')}
              </Typography>
            </Box>
          </Box>
          <Typography
            component="p"
            sx={{
              textAlign: 'center',
              maxWidth: 670,
              mx: 'auto',
              color: textColor,
              opacity: 0.88,
              fontSize: { xs: '0.96rem', sm: '1rem' },
              lineHeight: 1.6,
              mb: { xs: 2, md: 2.4 },
              px: { xs: 0.6, sm: 0 },
            }}
          >
            {t('home.servicesHomeFootnote')}
          </Typography>
          <PortfolioHomeOfferEcosystem />
        </Box>
      </ScrollReveal>
    </Box>
  )
}
