'use client'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CTAButton from '@/components/shared/CTAButton'
import { DESIGN_TOKENS, SECTION_H3_DENSE_SX } from '@/design-system/constants'

interface AboutCtaSectionProps {
  primary: string
  textColor: string
  t: (key: string) => string
  onContact: () => void
  onProjects: () => void
}

export default function AboutCtaSection({
  primary,
  textColor,
  t,
  onContact,
  onProjects,
}: AboutCtaSectionProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: { xs: DESIGN_TOKENS.spacing.xxl, lg: DESIGN_TOKENS.spacing.xl, xl: theme.spacing(6) },
        mb: { xs: DESIGN_TOKENS.spacing.xl, lg: DESIGN_TOKENS.spacing.lg, xl: theme.spacing(5) },
      }}
    >
      <EmojiEventsIcon
        sx={{
          fontSize: { xs: 52, sm: 60, md: 52, lg: 44, xl: 40 },
          color: primary,
          mb: { xs: DESIGN_TOKENS.spacing.sm, lg: 1.5 },
        }}
      />
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          ...DESIGN_TOKENS.typography.h3,
          ...SECTION_H3_DENSE_SX,
          lineHeight: 1.12,
          mb: DESIGN_TOKENS.spacing.md,
          color: textColor,
        }}
      >
        {t('about.ctaTitle')}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: 700,
          mx: 'auto',
          mb: { xs: DESIGN_TOKENS.spacing.xl, lg: DESIGN_TOKENS.spacing.lg, xl: theme.spacing(5) },
          ...DESIGN_TOKENS.typography.body1,
          fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.08rem', lg: '1rem', xl: '0.95rem' },
          color: textColor,
          opacity: 0.9,
        }}
      >
        {t('about.ctaText')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <CTAButton variant="primary" onClick={onContact} size="large">
          {t('about.contactCTA')}
        </CTAButton>
        <CTAButton variant="outline" onClick={onProjects} size="large">
          {t('home.seeProjects')}
        </CTAButton>
      </Box>
    </Box>
  )
}

