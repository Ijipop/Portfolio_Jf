'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBarComponent from '../../../components/appBar'
import PageWrapper from '../../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../../components/shared/InteractiveBackgroundSection'
import Footer from '../../../components/Footer'
import { useLanguage } from '../../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../../design-system/constants'
import { useThemeColors } from '../../../hooks/useThemeColors'
import { useTextColor } from '../../../hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { usePathname } from 'next/navigation'

export default function TimelendrMerciPage() {
  const { t } = useLanguage()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)

  const cardSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: false,
  })

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
            py: { xs: 6, sm: 8, md: 10 },
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                ...cardSx,
                borderRadius: DESIGN_TOKENS.borderRadius.large,
                p: { xs: 3, sm: 4 },
                textAlign: 'center',
                border: `1px solid ${primary}22`,
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2.5,
                  color: textColor,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('timelendr.merciTitle')}
              </Typography>
              <Typography
                sx={{
                  color: textColor,
                  opacity: 0.92,
                  lineHeight: 1.75,
                  fontSize: { xs: '1rem', sm: '1.0625rem' },
                  whiteSpace: 'pre-line',
                }}
              >
                {t('timelendr.merciBody')}
              </Typography>
            </Box>
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
