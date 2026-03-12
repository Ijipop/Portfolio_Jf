'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../components/shared/InteractiveBackgroundSection'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { useTextColor } from '../hooks/useTextColor'

export default function PagewebPage() {
  const router = useRouter()
  const { t } = useLanguage()
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
              mb: 2,
              textAlign: 'center',
              color: textColor,
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
              color: textColor,
              opacity: 0.92,
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
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
