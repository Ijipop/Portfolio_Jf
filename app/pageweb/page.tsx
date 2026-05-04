'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../components/shared/InteractiveBackgroundSection'
import CTAButton from '../components/shared/CTAButton'
import SectionDisplayTitle from '../components/shared/SectionDisplayTitle'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { useTextColor } from '../hooks/useTextColor'

const PAGE_WEB_BULLET_KEYS = ['pageweb.bullet1', 'pageweb.bullet2', 'pageweb.bullet3'] as const

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
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Container maxWidth="md">
          <SectionDisplayTitle component="h1" sx={{ mb: 2 }}>
            {t('pageweb.title')}
          </SectionDisplayTitle>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 3,
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.7,
              color: textColor,
              opacity: 0.92,
            }}
          >
            {t('pageweb.intro')}
          </Typography>
          <Box
            component="ul"
            sx={{
              maxWidth: 640,
              mx: 'auto',
              mb: 4,
              pl: { xs: 2.5, sm: 3 },
              color: textColor,
              opacity: 0.9,
              '& li': { mb: 1.25, lineHeight: 1.65 },
            }}
          >
            {PAGE_WEB_BULLET_KEYS.map((key) => (
              <Typography key={key} component="li" variant="body1">
                {t(key)}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Link href="/portfolio/contact#diagnostic-ia" style={{ textDecoration: 'none' }}>
              <CTAButton variant="primary" size="large">
                {t('home.aiImpactPrimaryCta')}
              </CTAButton>
            </Link>
            <CTAButton
              variant="outline"
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
