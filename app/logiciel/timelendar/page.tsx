'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'

export default function TimelendarPage() {
  const { t } = useLanguage()
  const { primary } = useThemeColors()
  const textColor = useTextColor()

  return (
    <PageWrapper backgroundVariant="default">
      <AppBarComponent />
      <InteractiveBackgroundSection>
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          py: { xs: 4, sm: 6, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
              color: textColor,
            }}
          >
            {t('timelendar.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: textColor,
              opacity: 0.92,
            }}
          >
            {t('timelendar.subtitle')}
          </Typography>

          <Typography sx={{ mb: 2, lineHeight: 1.8, color: textColor, opacity: 0.92 }}>
            {t('timelendar.intro')}
          </Typography>
          <Typography sx={{ mb: 2, lineHeight: 1.8, color: textColor, opacity: 0.92 }}>
            {t('timelendar.timeline')}
          </Typography>
          <Typography sx={{ mb: 4, lineHeight: 1.8, color: textColor, opacity: 0.92 }}>
            {t('timelendar.calendar')}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                minHeight: 200,
                borderRadius: DESIGN_TOKENS.borderRadius.medium,
                border: `2px dashed ${primary}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                color: textColor,
                opacity: 0.8,
              }}
            >
              {t('timelendar.imagePlaceholder')}
            </Box>
            <Box
              sx={{
                minHeight: 200,
                borderRadius: DESIGN_TOKENS.borderRadius.medium,
                border: `2px dashed ${primary}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                color: textColor,
                opacity: 0.8,
              }}
            >
              {t('timelendar.imagePlaceholder')}
            </Box>
          </Box>
        </Container>
      </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
