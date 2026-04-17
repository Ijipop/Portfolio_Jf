'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import { GlassContainer } from '@/components/GlassCard'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import SectionDisplayTitle from '@/components/shared/SectionDisplayTitle'
import HomeHeroDevCodeIntro from '@/components/home/HomeHeroDevCodeIntro'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { useRef } from 'react'

const mobileProseWrapSx = {
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
  orphans: 2,
  widows: 2,
} as const

export default function HomeHeroServicesSection() {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const isDevPresentation = presentationMode === 'dev'
  const isDark = theme.palette.mode === 'dark'
  const glassRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      component="section"
      aria-labelledby="home-main-section-heading"
      sx={{
        /** Sous la carte → grille : 60px desktop, légèrement moins sur mobile. */
        mb: { xs: 'clamp(40px, 8vw, 60px)', sm: '60px' },
        maxWidth: { xs: '100%', sm: 860, md: 980, lg: 1080 },
        mx: 'auto',
        width: '100%',
        px: { xs: 0.5, sm: 0 },
      }}
    >
      <GlassContainer
        ref={glassRef}
        sx={{
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          position: 'relative',
          overflow: isDevPresentation ? 'visible' : 'hidden',
          p: { xs: 3, sm: 4, md: 4.5 },
          width: '100%',
          /** Sur mobile, 32px sur une carte quasi pleine largeur paraît trop « pilule » ; on aligne sur le rayon des cartes grille. */
          borderRadius: {
            xs: DESIGN_TOKENS.borderRadius.medium,
            sm: DESIGN_TOKENS.borderRadius.xlarge,
          },
          border: `1px solid ${alpha(primary, isDark ? 0.22 : 0.14)}`,
          boxShadow: isDark
            ? '0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : `${DESIGN_TOKENS.shadows.card.light}, 0 1px 0 rgba(255,255,255,0.85) inset`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(120px, 28%)',
            height: 3,
            borderRadius: '0 0 8px 8px',
            background: `linear-gradient(90deg, transparent, ${alpha(primary, 0.65)}, transparent)`,
            opacity: 0.9,
          },
        }}
      >
        {isDevPresentation ? (
          <HomeHeroDevCodeIntro
            name="Jean-François Lefebvre"
            role={t('home.role')}
            intro={`${t('home.mainSectionP1')}\n\n${t('home.mainSectionP2')}`}
            isTopologyRoute={isTopologyRoute}
            embedded
            walkSurfaceRef={glassRef}
            sectionTitle={
              <SectionDisplayTitle
                component="h2"
                id="home-main-section-heading"
                sx={{ mb: { xs: 1.5, sm: 2 } }}
              >
                {t('home.mainSectionTitle')}
              </SectionDisplayTitle>
            }
          />
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              pt: { xs: 0.5, sm: 0.75 },
              px: { xs: 0.5, sm: 1 },
            }}
          >
            <SectionDisplayTitle
              component="h2"
              id="home-main-section-heading"
              sx={{ mb: { xs: 2.25, sm: 2.75 } }}
            >
              {t('home.mainSectionTitle')}
            </SectionDisplayTitle>

            <Typography
              component="p"
              variant="body1"
              sx={{
                color: textColor,
                opacity: 0.92,
                textAlign: 'center',
                lineHeight: 1.75,
                fontSize: { xs: '1rem', sm: '1.0625rem' },
                fontWeight: 400,
                letterSpacing: '0.01em',
                maxWidth: 540,
                mx: 'auto',
                mb: { xs: 1.75, sm: 2 },
                ...mobileProseWrapSx,
              }}
            >
              {t('home.mainSectionP1')}
            </Typography>

            <Typography
              component="p"
              variant="body1"
              sx={{
                color: textColor,
                opacity: 0.78,
                textAlign: 'center',
                lineHeight: 1.75,
                fontSize: { xs: '0.98rem', sm: '1.03rem' },
                fontWeight: 400,
                maxWidth: 540,
                mx: 'auto',
                mb: 0,
                ...mobileProseWrapSx,
              }}
            >
              {t('home.mainSectionP2')}
            </Typography>
          </Box>
        )}
      </GlassContainer>
    </Box>
  )
}
