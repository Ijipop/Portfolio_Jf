'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import { HOME_V2 } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

export default function HomeV2FinalCta() {
  const { t } = useLanguage()

  return (
    <Box
      component="section"
      sx={{
        py: HOME_V2.sectionPy,
        px: 0,
      }}
    >
      <Box sx={{ maxWidth: HOME_V2.maxWidth, mx: 'auto' }}>
        <ScrollReveal distance={24}>
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 5, md: 7 },
              px: { xs: 2.5, md: 4 },
              borderRadius: HOME_V2.cardRadiusLg,
              background: `linear-gradient(145deg, ${HOME_V2.surface} 0%, rgba(234, 88, 12, 0.06) 100%)`,
              border: `1px solid ${HOME_V2.borderHover}`,
              boxShadow: `0 16px 48px ${HOME_V2.brandGlow}`,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: HOME_V2.text,
                mb: 1.5,
                lineHeight: 1.25,
              }}
            >
              {t('homeV2.finalCtaTitle')}
            </Typography>

            <Typography
              sx={{
                fontSize: '0.9375rem',
                color: HOME_V2.textSecondary,
                mb: 3,
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              {t('homeV2.finalCtaSubtitle')}
            </Typography>

            <Box sx={{ maxWidth: 320, mx: 'auto' }}>
              <HomeV2Cta href={CONTACT_PATH} variant="primary" size="large" fullWidth>
                {t('homeV2.finalCtaButton')}
              </HomeV2Cta>
            </Box>
          </Box>
        </ScrollReveal>
      </Box>
    </Box>
  )
}
