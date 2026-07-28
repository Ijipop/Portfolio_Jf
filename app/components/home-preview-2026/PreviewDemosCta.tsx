'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLanguage } from '@/contexts/LanguageContext'
import PreviewCta from './PreviewCta'
import PreviewReveal from './PreviewReveal'
import { PREVIEW } from './previewTokens'

export default function PreviewDemosCta() {
  const { t } = useLanguage()

  return (
    <Box component="section" sx={{ position: 'relative', zIndex: 1, py: { xs: 2, md: 3 } }}>
      <PreviewReveal>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2.5,
            p: { xs: 2.75, md: 3.5 },
            borderRadius: `${PREVIEW.radiusLg}px`,
            border: `1px solid ${PREVIEW.border}`,
            background: `linear-gradient(120deg, ${PREVIEW.surface} 0%, rgba(234,88,12,0.08) 100%)`,
            backdropFilter: 'blur(14px)',
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: PREVIEW.fontDisplay,
                fontWeight: 700,
                fontSize: { xs: '1.35rem', md: '1.6rem' },
                letterSpacing: '-0.03em',
                color: PREVIEW.text,
                mb: 0.75,
              }}
            >
              {t('seo.webDemosTitle')}
            </Typography>
            <Typography
              sx={{
                fontFamily: PREVIEW.fontBody,
                fontSize: '0.98rem',
                color: PREVIEW.textSecondary,
                lineHeight: 1.55,
                maxWidth: 520,
              }}
            >
              {t('seo.webDemosBody')}
            </Typography>
          </Box>
          <PreviewCta href="/demos" variant="primary" size="large">
            {t('seo.webDemosLink')}
          </PreviewCta>
        </Box>
      </PreviewReveal>
    </Box>
  )
}
