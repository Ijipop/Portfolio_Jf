'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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

interface TimelendarRelease {
  id: number
  filePath: string
  changelog: string
  version: string | null
  createdAt: string
}

export default function TimelendarPage() {
  const { t } = useLanguage()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const [releases, setReleases] = useState<TimelendarRelease[]>([])

  useEffect(() => {
    fetch('/api/timelendar/releases')
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

          {/* Téléchargements .zip */}
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, mt: 4, color: textColor }}
          >
            {t('timelendar.downloadsTitle')}
          </Typography>
          <Typography sx={{ mb: 2, color: textColor, opacity: 0.92 }}>
            {t('timelendar.downloadsIntro')}
          </Typography>
          {releases.length === 0 ? (
            <Typography sx={{ color: textColor, opacity: 0.9 }}>
              {t('timelendar.noReleases')}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {releases.map((r) => (
                <Box
                  key={r.id}
                  sx={{
                    p: 2,
                    borderRadius: DESIGN_TOKENS.borderRadius.small,
                    border: `1px solid ${primary}30`,
                    backgroundColor: `${primary}08`,
                    color: textColor,
                  }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
                    {r.version && (
                      <Typography component="span" variant="subtitle2" sx={{ color: textColor, fontWeight: 600 }}>
                        {t('timelendar.version')} {r.version}
                      </Typography>
                    )}
                    <Typography component="span" variant="body2" sx={{ color: textColor, opacity: 0.9 }}>
                      {new Date(r.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: textColor, opacity: 0.95, mb: 1.5, whiteSpace: 'pre-wrap' }}>
                    {r.changelog}
                  </Typography>
                  <Button
                    variant="contained"
                    href={r.filePath}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {t('timelendar.downloadButton')}
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
      </InteractiveBackgroundSection>
      <Footer />
    </PageWrapper>
  )
}
