'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewCta from './PreviewCta'
import PreviewReveal from './PreviewReveal'
import { PREVIEW } from './previewTokens'

const CONTACT_PATH = '/portfolio/contact'

export default function PreviewFinalCta() {
  const { t } = useLanguage()

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        zIndex: 1,
        py: PREVIEW.sectionPy,
      }}
    >
      <PreviewReveal>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 6, md: 8 },
            px: { xs: 2.5, md: 4 },
            borderRadius: `${PREVIEW.radiusLg}px`,
            border: `1px solid ${PREVIEW.borderHover}`,
            background: `
              radial-gradient(ellipse 70% 80% at 50% 0%, ${PREVIEW.orangeGlow} 0%, transparent 55%),
              ${PREVIEW.surface}
            `,
            boxShadow: `0 30px 80px rgba(0,0,0,0.35)`,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: PREVIEW.fontDisplay,
              fontWeight: 700,
              fontSize: { xs: 'clamp(1.6rem, 5vw, 2.2rem)', md: 'clamp(2rem, 3vw, 2.75rem)' },
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: PREVIEW.text,
              mb: 1.75,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            {t('homeV2.finalCtaTitle')}
          </Typography>
          <Typography
            sx={{
              fontFamily: PREVIEW.fontBody,
              fontSize: '1.02rem',
              color: PREVIEW.textSecondary,
              mb: 3.5,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            {t('homeV2.finalCtaSubtitle')}
          </Typography>
          <Box sx={{ maxWidth: 340, mx: 'auto' }}>
            <PreviewCta href={CONTACT_PATH} variant="primary" size="large" fullWidth>
              {t('homeV2.finalCtaButton')}
            </PreviewCta>
          </Box>
        </Box>
      </PreviewReveal>
    </Box>
  )
}
