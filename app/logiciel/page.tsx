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
import { useCardSurfaceOptions } from '@/hooks/useCardSurfaceOptions'
import { getCardSurfaceSx } from '../components/shared/cardSurface'

type SoftwareCard = {
  titleKey: string
  descKey: string
  href: string
}

const SOFTWARE_CARDS: SoftwareCard[] = [
  {
    titleKey: 'logiciel.timelendrCardTitle',
    descKey: 'logiciel.timelendrCardDesc',
    href: '/logiciel/timelendr',
  },
  {
    titleKey: 'logiciel.cpuZeCardTitle',
    descKey: 'logiciel.cpuZeCardDesc',
    href: '/cpu-ze',
  },
  {
    titleKey: 'logiciel.spaceTakerCardTitle',
    descKey: 'logiciel.spaceTakerCardDesc',
    href: '/spacetaker',
  },
]

export default function LogicielPage() {
  const router = useRouter()
  const { isTopologyRoute, isSiteDark } = useCardSurfaceOptions()
  const { t } = useLanguage()
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()
  const cardSurfaceSx = getCardSurfaceSx({ isTopologyRoute, isSiteDark, variant: 'flat', level: 'soft', interactive: false })

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

          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            }}
          >
            {SOFTWARE_CARDS.map((card) => (
              <Card
                key={card.href}
                sx={{
                  borderRadius: DESIGN_TOKENS.borderRadius.medium,
                  overflow: 'hidden',
                  ...cardSurfaceSx,
                  ...(!isTopologyRoute && {
                    background: `linear-gradient(145deg, ${primary}15 0%, ${secondary}10 100%)`,
                    border: `1px solid ${primary}30`,
                  }),
                }}
              >
                <CardActionArea
                  component="div"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(card.href)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      router.push(card.href)
                    }
                  }}
                  sx={{ display: 'block', textAlign: 'left', height: '100%' }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1, color: textColor }}>
                      {t(card.titleKey)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: textColor, opacity: 0.9, flex: 1 }}>
                      {t(card.descKey)}
                    </Typography>
                    <CTAButton
                      variant="primary"
                      size="medium"
                      onClick={() => router.push(card.href)}
                    >
                      {t('logiciel.learnMore')}
                    </CTAButton>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
