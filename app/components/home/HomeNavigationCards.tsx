'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import ThreeDCardComponent from '@/components/ThreeDCard'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { useLanguage } from '@/contexts/LanguageContext'

const HOME_GRID_CARD_SX = {
  height: '100%',
  minHeight: 0,
  p: { xs: 2.25, sm: 3, md: 4 },
} as const

const HOME_CARD_DESC_TYPO_SX = {
  opacity: 0.85,
  lineHeight: 1.55,
  flex: 1,
  overflowWrap: 'break-word' as const,
  orphans: 2,
  widows: 2,
  hyphens: 'auto' as const,
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
}

export default function HomeNavigationCards() {
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
        mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
        px: { xs: 1, sm: 0 },
        alignItems: 'stretch',
      }}
    >
      <ScrollReveal direction="up" delay={0} fillHeight>
        <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
          <Link href="/portfolio/projets" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
            <ThreeDCardComponent fullHeight floatingElements={2} sx={HOME_GRID_CARD_SX}>
              <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardProjects')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardProjectsDesc')}
              </Typography>
            </ThreeDCardComponent>
          </Link>
        </Box>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.05} fillHeight>
        <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
          <Link href="/portfolio/a-propos" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
            <ThreeDCardComponent fullHeight floatingElements={3} sx={HOME_GRID_CARD_SX}>
              <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardAbout')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardAboutDesc')}
              </Typography>
            </ThreeDCardComponent>
          </Link>
        </Box>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} fillHeight>
        <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
          <Link href="/portfolio/contact" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
            <ThreeDCardComponent fullHeight floatingElements={2} sx={HOME_GRID_CARD_SX}>
              <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardContact')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardContactDesc')}
              </Typography>
            </ThreeDCardComponent>
          </Link>
        </Box>
      </ScrollReveal>
    </Box>
  )
}
