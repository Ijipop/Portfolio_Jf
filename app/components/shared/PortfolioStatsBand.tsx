'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { usePathname } from 'next/navigation'
import AnimatedCounter from './AnimatedCounter'
import { BRAND_GLITCH_GRADIENT } from './IjipopGlitchTitle'
import ScrollReveal from './ScrollReveal'
import { getCardSurfaceSx } from './cardSurface'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import { shouldShowTopology } from '@/utils/topologyRoutes'

const STATS = [
  { value: 12, suffix: '+', labelKey: 'home.wowStatsProjects' },
  { value: 10, suffix: '+', labelKey: 'home.wowStatsTechs' },
]

export default function PortfolioStatsBand() {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary } = useThemeColors()

  return (
    <Box
      sx={{
        ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: { xs: 0, sm: 0 },
        mb: { xs: 4, md: 7 },
        borderRadius: DESIGN_TOKENS.borderRadius.large,
        overflow: 'hidden',
        border: `1px solid ${primary}22`,
      }}
    >
      {STATS.map((stat, index) => (
        <ScrollReveal key={stat.labelKey} direction="up" delay={0.05 * index} fillHeight>
          <Box
            sx={{
              px: { xs: 2.5, sm: 2, md: 3 },
              py: { xs: 3, md: 3.5 },
              textAlign: 'center',
              borderTop: { xs: index === 0 ? 'none' : `1px solid ${primary}18`, sm: 'none' },
              borderLeft: { xs: 'none', sm: index === 0 ? 'none' : `1px solid ${primary}18` },
            }}
          >
            <Typography
              component="div"
              sx={{
                fontSize: { xs: 'clamp(3rem, 16vw, 5rem)', md: 'clamp(3.75rem, 7vw, 6rem)' },
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.08em',
                backgroundImage: BRAND_GLITCH_GRADIENT,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1300} />
            </Typography>
            <Typography
              component="div"
              sx={{
                mt: 1.25,
                color: textColor,
                opacity: 0.82,
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {t(stat.labelKey)}
            </Typography>
          </Box>
        </ScrollReveal>
      ))}
    </Box>
  )
}
