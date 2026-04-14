'use client'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import GroupWorkIcon from '@mui/icons-material/GroupWork'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import TimelineIcon from '@mui/icons-material/Timeline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { usePathname } from 'next/navigation'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'

interface SoftSkillsSectionProps {
  primary: string
  textColor: string
  t: (key: string) => string
}

export default function SoftSkillsSection({ primary, textColor, t }: SoftSkillsSectionProps) {
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const surfaceSx = getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false })

  return (
    <Box
      sx={{
        ...surfaceSx,
        borderRadius: DESIGN_TOKENS.borderRadius.large,
        padding: DESIGN_TOKENS.spacing.xl,
        textAlign: 'center',
        mb: DESIGN_TOKENS.spacing.xxl,
        position: 'relative',
        overflow: 'hidden',
        ...(!isTopologyRoute && {
          background:
            'var(--card-background, linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%))',
          border: '1px solid var(--card-primary, rgba(0,0,0,0.08))',
          boxShadow: '0 8px 32px var(--card-primary, rgba(0,0,0,0.1))',
        }),
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          marginBottom: DESIGN_TOKENS.spacing.md,
          fontWeight: 700,
          color: primary,
          textShadow: `0 2px 4px ${primary}40`,
        }}
      >
        {t('about.softSkills')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: DESIGN_TOKENS.spacing.md,
          mt: DESIGN_TOKENS.spacing.lg,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <LightbulbIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
            {t('about.creativity')}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
            {t('about.creativityDesc')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <GroupWorkIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
            {t('about.collaboration')}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
            {t('about.collaborationDesc')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <TimelineIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
            {t('about.adaptability')}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
            {t('about.adaptabilityDesc')}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <AutoAwesomeIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
            {t('about.quality')}
          </Typography>
          <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
            {t('about.qualityDesc')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

