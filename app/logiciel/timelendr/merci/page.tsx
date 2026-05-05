'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import PageWrapper from '../../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../../components/shared/InteractiveBackgroundSection'
import { useLanguage } from '../../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../../design-system/constants'
import { useThemeColors } from '../../../hooks/useThemeColors'
import { useTextColor } from '../../../hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

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
      <InteractiveBackgroundSection>
        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            overflow: 'hidden',
            py: { xs: 8, sm: 10, md: 12 },
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Box
            component={motion.div}
            aria-hidden
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{ opacity: 0.55, scale: 1.08 }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              top: { xs: '10%', md: '16%' },
              left: { xs: '-15%', md: '8%' },
              width: { xs: 220, sm: 320 },
              height: { xs: 220, sm: 320 },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${primary}2e 0%, ${primary}00 70%)`,
              filter: 'blur(6px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            component={motion.div}
            aria-hidden
            initial={{ opacity: 0.25, x: 0 }}
            animate={{ opacity: 0.5, x: 16 }}
            transition={{ duration: 2.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              bottom: { xs: '8%', md: '12%' },
              right: { xs: '-12%', md: '10%' },
              width: { xs: 200, sm: 290 },
              height: { xs: 200, sm: 290 },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${primary}24 0%, ${primary}00 72%)`,
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />
          <Container maxWidth="sm">
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                ...cardSx,
                borderRadius: DESIGN_TOKENS.borderRadius.large,
                p: { xs: 3.2, sm: 4.2 },
                textAlign: 'center',
                border: `1px solid ${primary}33`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 18px 48px ${primary}22`,
                backdropFilter: 'blur(4px)',
              }}
            >
              <Box
                component={motion.div}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 2.1,
                  display: 'grid',
                  placeItems: 'center',
                  background: `linear-gradient(145deg, ${primary}2b, ${primary}12)`,
                  border: `1px solid ${primary}35`,
                }}
              >
                <CheckCircleRoundedIcon sx={{ color: primary, fontSize: 38 }} />
              </Box>
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
    </PageWrapper>
  )
}
