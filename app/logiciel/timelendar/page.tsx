'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import Footer from '../../components/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'

export default function TimelendarPage() {
  const { t } = useLanguage()
  const { primary } = useThemeColors()
  const { themeName } = useAdvancedTheme()
  const isDefaultPalette = themeName === 'default'
  const titleColor = isDefaultPalette ? undefined : 'white'
  const bodyColor = isDefaultPalette ? undefined : 'rgba(255,255,255,0.9)'
  const placeholderColor = isDefaultPalette ? undefined : 'rgba(255,255,255,0.8)'

  return (
    <PageWrapper backgroundVariant="default" showParticles={true}>
      <AppBarComponent />
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
              ...(titleColor && { color: titleColor }),
            }}
          >
            {t('timelendar.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              mb: 4,
              ...(bodyColor && { color: bodyColor }),
            }}
          >
            {t('timelendar.subtitle')}
          </Typography>

          <Typography sx={{ mb: 2, lineHeight: 1.8, ...(bodyColor && { color: bodyColor }) }}>
            {t('timelendar.intro')}
          </Typography>
          <Typography sx={{ mb: 2, lineHeight: 1.8, ...(bodyColor && { color: bodyColor }) }}>
            {t('timelendar.timeline')}
          </Typography>
          <Typography sx={{ mb: 4, lineHeight: 1.8, ...(bodyColor && { color: bodyColor }) }}>
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
                ...(placeholderColor && { color: placeholderColor }),
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
                ...(placeholderColor && { color: placeholderColor }),
              }}
            >
              {t('timelendar.imagePlaceholder')}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </PageWrapper>
  )
}
