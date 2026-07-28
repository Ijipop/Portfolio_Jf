'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import HomeV2Cta from './HomeV2Cta'
import { useHomeV2Tokens } from './homeV2Tokens'

const CONTACT_PATH = '/portfolio/contact'

export default function HomeV2FinalCta() {
  const { t } = useLanguage()
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <Box
      component="section"
      sx={{
        py: v2.sectionPy,
        px: 0,
      }}
    >
      <Box sx={{ maxWidth: v2.maxWidth, mx: 'auto' }}>
        <ScrollReveal distance={24}>
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 5, md: 7 },
              px: { xs: 2.5, md: 4 },
              borderRadius: v2.cardRadiusLg,
              background: `linear-gradient(145deg, ${v2.surface} 0%, rgba(234, 88, 12, 0.06) 100%)`,
              border: `1px solid ${v2.borderHover}`,
              boxShadow: `0 16px 48px ${v2.brandGlow}`,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: v2.fontDisplay,
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: v2.text,
                mb: 1.5,
                lineHeight: 1.25,
              }}
            >
              {t('homeV2.finalCtaTitle')}
            </Typography>

            <Typography
              sx={{
                fontFamily: v2.fontBody,
                fontSize: '0.9375rem',
                color: v2.textSecondary,
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
