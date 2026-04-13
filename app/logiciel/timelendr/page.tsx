'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { usePathname } from 'next/navigation'
import TimelendrCarousel from './TimelendrCarousel'

const FEATURE_KEYS = [
  'timelendr.featureCalendar',
  'timelendr.featureTimeline',
  'timelendr.featureEvents',
  'timelendr.featureDeadlines',
  'timelendr.featureTodo',
  'timelendr.featureBackup',
  'timelendr.featureColors',
  'timelendr.featurePro',
  'timelendr.featureOffline',
  'timelendr.featureBilingual',
  'timelendr.featureDesktop',
] as const

type TimelendrPlatform = 'windows' | 'macos' | 'both'

interface TimelendrRelease {
  id: number
  filePath: string
  changelog: string
  version: string | null
  platform?: TimelendrPlatform
  createdAt: string
}

export default function TimelendrPage() {
  const { t } = useLanguage()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const [releases, setReleases] = useState<TimelendrRelease[]>([])

  const cardSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: false,
  })

  useEffect(() => {
    fetch('/api/timelendr/releases')
      .then((res) => res.json())
      .then((data) => data.success && setReleases(data.data))
      .catch(() => {})
  }, [])

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
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 }, maxWidth: 720, mx: 'auto' }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1.5,
                  color: textColor,
                  fontSize: { xs: '1.85rem', sm: '2.25rem', md: '2.75rem' },
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('timelendr.title')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: textColor,
                  opacity: 0.92,
                  lineHeight: 1.5,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                {t('timelendr.subtitle')}
              </Typography>
              <Typography
                sx={{
                  mt: 2.5,
                  lineHeight: 1.75,
                  color: textColor,
                  opacity: 0.88,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
              >
                {t('timelendr.intro')}
              </Typography>
            </Box>

            <TimelendrCarousel title={t('timelendr.galleryTitle')} emptyMessage={t('timelendr.galleryEmpty')} />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: textColor,
                textAlign: 'center',
                fontSize: { xs: '1.35rem', sm: '1.6rem' },
              }}
            >
              {t('timelendr.featuresTitle')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
                gap: 2,
                mb: 5,
              }}
            >
              {FEATURE_KEYS.map((key) => (
                <Box
                  key={key}
                  sx={{
                    ...cardSx,
                    borderRadius: DESIGN_TOKENS.borderRadius.medium,
                    p: { xs: 2, sm: 2.25 },
                    display: 'flex',
                    gap: 1.75,
                    alignItems: 'flex-start',
                    border: `1px solid ${primary}22`,
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                    '&:hover': {
                      borderColor: `${primary}44`,
                      boxShadow: `0 12px 40px ${primary}12`,
                    },
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{
                      fontSize: 26,
                      color: primary,
                      flexShrink: 0,
                      mt: 0.15,
                      opacity: 0.95,
                    }}
                  />
                  <Typography
                    sx={{
                      color: textColor,
                      opacity: 0.92,
                      lineHeight: 1.65,
                      fontSize: { xs: '0.9rem', sm: '0.9375rem' },
                    }}
                  >
                    {t(key)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              component="h2"
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.5, mt: 2, color: textColor }}
            >
              {t('timelendr.downloadsTitle')}
            </Typography>
            <Typography sx={{ mb: 2.5, color: textColor, opacity: 0.9, lineHeight: 1.7 }}>
              {t('timelendr.downloadsIntro')}
            </Typography>
            {releases.length === 0 ? (
              <Typography sx={{ color: textColor, opacity: 0.9, mb: 4 }}>
                {t('timelendr.noReleases')}
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                {releases.map((r) => (
                  <Box
                    key={r.id}
                    sx={{
                      p: 2.5,
                      borderRadius: DESIGN_TOKENS.borderRadius.medium,
                      border: `1px solid ${primary}28`,
                      backgroundColor: `${primary}08`,
                      color: textColor,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
                      {r.version && (
                        <Typography component="span" variant="subtitle2" sx={{ color: textColor, fontWeight: 600 }}>
                          {t('timelendr.version')} {r.version}
                        </Typography>
                      )}
                      <Chip
                        size="small"
                        label={
                          (r.platform ?? 'both') === 'windows'
                            ? t('timelendr.platformWindows')
                            : (r.platform ?? 'both') === 'macos'
                              ? t('timelendr.platformMacos')
                              : t('timelendr.platformBoth')
                        }
                        sx={{
                          fontWeight: 600,
                          borderColor: `${primary}55`,
                          color: textColor,
                          bgcolor: `${primary}14`,
                        }}
                        variant="outlined"
                      />
                      <Typography component="span" variant="body2" sx={{ color: textColor, opacity: 0.9 }}>
                        {new Date(r.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: textColor, opacity: 0.95, mb: 2, whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
                      {r.changelog}
                    </Typography>
                    <Button
                      variant="contained"
                      href={r.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
                    >
                      {t('timelendr.downloadButton')}
                    </Button>
                  </Box>
                ))}
              </Box>
            )}

            <Box
              sx={{
                ...cardSx,
                borderRadius: DESIGN_TOKENS.borderRadius.large,
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                borderLeft: `4px solid ${primary}`,
                background: isTopologyRoute
                  ? undefined
                  : `linear-gradient(135deg, ${primary}0d 0%, transparent 55%)`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: textColor, mb: 2 }}>
                {t('timelendr.securityTitle')}
              </Typography>
              <Typography sx={{ color: textColor, opacity: 0.92, lineHeight: 1.75, mb: 2 }}>
                {t('timelendr.securityLead')}
              </Typography>
              <Typography sx={{ color: textColor, opacity: 0.92, lineHeight: 1.75, mb: 2 }}>
                {t('timelendr.securityP1')}
              </Typography>
              <Typography sx={{ color: textColor, opacity: 0.92, lineHeight: 1.75 }}>
                {t('timelendr.securityP2')}
              </Typography>
            </Box>

            <Typography
              sx={{
                textAlign: 'center',
                color: textColor,
                opacity: 0.65,
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600,
                pb: 2,
              }}
            >
              {t('timelendr.privateProject')}
            </Typography>
          </Container>
        </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
