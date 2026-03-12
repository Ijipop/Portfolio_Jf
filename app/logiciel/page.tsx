'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../components/shared/InteractiveBackgroundSection'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../design-system/constants'
import { useThemeColors } from '../hooks/useThemeColors'
import { useTextColor } from '../hooks/useTextColor'

export default function LogicielPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { primary, secondary } = useThemeColors()
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
            {t('logiciel.title')}
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
            {t('logiciel.intro')}
          </Typography>

          <Card
            sx={{
              maxWidth: 480,
              mx: 'auto',
              borderRadius: DESIGN_TOKENS.borderRadius.medium,
              background: `linear-gradient(145deg, ${primary}15 0%, ${secondary}10 100%)`,
              border: `1px solid ${primary}30`,
              overflow: 'hidden',
            }}
          >
            <CardActionArea
              onClick={() => router.push('/logiciel/timelendar')}
              sx={{ display: 'block', textAlign: 'left' }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, color: textColor }}>
                  {t('logiciel.timelendarCardTitle')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: textColor, opacity: 0.9 }}>
                  {t('logiciel.timelendarCardDesc')}
                </Typography>
                <CTAButton
                  variant="primary"
                  size="medium"
                  onClick={() => router.push('/logiciel/timelendar')}
                >
                  {t('logiciel.learnMore')}
                </CTAButton>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
