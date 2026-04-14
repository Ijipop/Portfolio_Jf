'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import CTAButton from '@/components/shared/CTAButton'
import HeaderSection from '@/components/shared/HeaderSection'
import IjipopGlitchTitle from '@/components/shared/IjipopGlitchTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'

export default function PortfolioHomeHero() {
  const { t } = useLanguage()
  const textColor = useTextColor()

  const subtitle = (
    <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 2.5 }, px: { xs: 1, sm: 0 } }}>
      <Typography
        component="p"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.0625rem' },
          letterSpacing: '0.01em',
          color: textColor,
          mb: 0.5,
        }}
      >
        {t('home.heroRealName')}
      </Typography>
      <Typography
        component="p"
        variant="body2"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '0.9rem', sm: '0.9375rem' },
          color: textColor,
          opacity: 0.82,
          letterSpacing: '0.02em',
        }}
      >
        {t('home.heroOneLiner')}
      </Typography>
    </Box>
  )

  return (
    <HeaderSection title={<IjipopGlitchTitle text={t('home.heroTitle')} variant="hero" />} subtitle={subtitle}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.75}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          mt: { xs: 2, sm: 2.25 },
          mb: { xs: 0, sm: 0 },
          px: { xs: 1, sm: 0 },
          width: '100%',
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <Link href="/portfolio/projets" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
          <CTAButton variant="primary" size="medium" fullWidth>
            {t('home.ctaRealizations')}
          </CTAButton>
        </Link>
        <Link href="/portfolio/contact" style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
          <CTAButton variant="outline" size="medium" fullWidth>
            {t('home.contactMe')}
          </CTAButton>
        </Link>
      </Stack>
    </HeaderSection>
  )
}
