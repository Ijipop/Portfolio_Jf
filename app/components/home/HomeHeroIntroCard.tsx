'use client'

import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import ScramblingText from '@/components/ScramblingText'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { GlassContainer } from '@/components/GlassCard'
import HomeHeroDevCodeIntro from '@/components/home/HomeHeroDevCodeIntro'

/** Réduit veuves / orphelines sur mobile (mode beige, texte normal). */
const mobileProseWrapSx = {
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
  orphans: 2,
  widows: 2,
} as const

export default function HomeHeroIntroCard() {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const scrambleEnabled = presentationMode === 'dev'

  if (scrambleEnabled) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5, md: 2 },
          position: 'relative',
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
        }}
      >
        <HomeHeroDevCodeIntro
          name="Jean-François Lefebvre"
          role={t('home.role')}
          intro={t('home.intro')}
          isTopologyRoute={isTopologyRoute}
        />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 1, sm: 1.5, md: 2 },
        position: 'relative',
        mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
      }}
    >
      <Box sx={{ flex: { sm: '0 1 auto' }, width: { xs: '100%', sm: 'auto' }, maxWidth: '100%' }}>
        <GlassContainer
          sx={{
            ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
            p: { xs: 2.5, sm: 3, md: 3.5 },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <ScramblingText
              text="Jean-François Lefebvre"
              enabled={false}
              variant="h1"
              sx={{
                mb: 1,
                ...DESIGN_TOKENS.typography.h1,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
                background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease-in-out infinite',
              }}
            />
            <ScramblingText
              text={t('home.role')}
              enabled={false}
              variant="h4"
              sx={{
                mb: 1,
                ...DESIGN_TOKENS.typography.h4,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                fontWeight: 400,
                opacity: 0.9,
                color: textColor,
                ...mobileProseWrapSx,
              }}
            />
            <ScramblingText
              text={t('home.intro')}
              enabled={false}
              variant="body1"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 2,
                ...DESIGN_TOKENS.typography.body1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: textColor,
                opacity: 0.9,
                whiteSpace: 'pre-line',
                hyphens: 'auto',
                textAlign: 'center',
                ...mobileProseWrapSx,
              }}
            />
          </Box>
        </GlassContainer>
      </Box>
    </Box>
  )
}
