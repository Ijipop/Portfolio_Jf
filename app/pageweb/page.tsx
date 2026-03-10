'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

export default function PagewebPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { themeName } = useAdvancedTheme()
  const isDefaultPalette = themeName === 'default'
  const titleColor = isDefaultPalette ? undefined : 'white'
  const bodyColor = isDefaultPalette ? undefined : 'rgba(255,255,255,0.9)'

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
              mb: 2,
              textAlign: 'center',
              ...(titleColor && { color: titleColor }),
            }}
          >
            {t('pageweb.title')}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 4,
              maxWidth: 560,
              mx: 'auto',
              lineHeight: 1.7,
              ...(bodyColor && { color: bodyColor }),
            }}
          >
            {t('pageweb.intro')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CTAButton
              variant="primary"
              size="large"
              onClick={() => router.push('/portfolio/projets')}
            >
              {t('pageweb.ctaProjects')}
            </CTAButton>
          </Box>
        </Container>
      </Box>
      <Footer />
    </PageWrapper>
  )
}
