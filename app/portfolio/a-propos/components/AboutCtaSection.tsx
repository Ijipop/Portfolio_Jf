'use client'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CTAButton from '@/components/shared/CTAButton'
import { DESIGN_TOKENS } from '@/design-system/constants'

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
  return (
    <Box sx={{ textAlign: 'center', mt: DESIGN_TOKENS.spacing.xxl, mb: DESIGN_TOKENS.spacing.xl }}>
      <EmojiEventsIcon sx={{ fontSize: 64, color: primary, mb: DESIGN_TOKENS.spacing.md }} />
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          ...DESIGN_TOKENS.typography.h3,
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
          mb: DESIGN_TOKENS.spacing.xl,
          ...DESIGN_TOKENS.typography.body1,
          fontSize: '1.125rem',
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

