'use client'

import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DownloadIcon from '@mui/icons-material/Download'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import CTAButton from '../../components/shared/CTAButton'
import { useLanguage } from '../../contexts/LanguageContext'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useTextColor } from '../../hooks/useTextColor'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { usePathname } from 'next/navigation'
import TimelendrCarousel from './TimelendrCarousel'
import styles from './TimelendrProduct.module.css'

const FEATURE_PILLARS = [
  { titleKey: 'timelendr.pillar1Title', descKey: 'timelendr.pillar1Desc', accent: 'teal', wide: true },
  { titleKey: 'timelendr.pillar2Title', descKey: 'timelendr.pillar2Desc', accent: 'violet', wide: false },
  { titleKey: 'timelendr.pillar3Title', descKey: 'timelendr.pillar3Desc', accent: 'mixed', wide: false },
  { titleKey: 'timelendr.pillar4Title', descKey: 'timelendr.pillar4Desc', accent: 'teal', wide: false },
  { titleKey: 'timelendr.pillar5Title', descKey: 'timelendr.pillar5Desc', accent: 'violet', wide: false },
] as const

const ACCENT_CLASS = {
  teal: styles.bentoCardAccentTeal,
  violet: styles.bentoCardAccentViolet,
  mixed: styles.bentoCardAccentMixed,
} as const

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

  const latestRelease = releases[0] ?? null

  useEffect(() => {
    fetch('/api/timelendr/releases')
      .then((res) => res.json())
      .then((data) => data.success && setReleases(data.data))
      .catch(() => {})
  }, [])

  const trustItems = useMemo(
    () => [
      t('timelendr.trustDesktop'),
      t('timelendr.trustCollab'),
      t('timelendr.trustOffline'),
      t('timelendr.trustIntegrations'),
    ],
    [t]
  )

  const scrollToDownloads = () => {
    document.getElementById('timelendr-downloads')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToFeatures = () => {
    document.getElementById('timelendr-features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageWrapper backgroundVariant="default">
      <AppBarComponent />
      <InteractiveBackgroundSection>
        <Box
          component="main"
          className={styles.page}
          sx={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            py: { xs: 3, sm: 5, md: 6 },
            px: 2,
          }}
        >
          <Container maxWidth="lg">
            <div className={styles.productShell}>
            <section className={styles.hero}>
              <div className={styles.heroGrid}>
                <Box>
                  <span className={styles.heroKicker}>{t('timelendr.heroKicker')}</span>
                  <h1 className={styles.heroTitle}>{t('timelendr.title')}</h1>
                  <p className={styles.heroSubtitle}>{t('timelendr.subtitle')}</p>
                  <p className={styles.heroIntro}>{t('timelendr.intro')}</p>
                  <div className={styles.heroActions}>
                    <CTAButton
                      variant="primary"
                      size="large"
                      startIcon={<DownloadIcon />}
                      onClick={scrollToDownloads}
                      sx={{
                        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                        boxShadow: '0 12px 32px rgba(13,148,136,0.35)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                        },
                      }}
                    >
                      {t('timelendr.heroCtaDownload')}
                    </CTAButton>
                    <CTAButton
                      variant="outline"
                      size="large"
                      onClick={scrollToFeatures}
                      sx={{
                        color: '#f1f5f9',
                        borderColor: 'rgba(255,255,255,0.35)',
                        '&:hover': {
                          borderColor: 'rgba(255,255,255,0.55)',
                          bgcolor: 'rgba(255,255,255,0.06)',
                        },
                      }}
                    >
                      {t('timelendr.heroCtaFeatures')}
                    </CTAButton>
                  </div>
                  <div className={styles.trustRow}>
                    {trustItems.map((item) => (
                      <span key={item} className={styles.trustItem}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Box>
                <TimelendrCarousel
                  variant="hero"
                  hideTitle
                  title={t('timelendr.galleryTitle')}
                  emptyMessage={t('timelendr.galleryEmpty')}
                />
              </div>
            </section>

            <section id="timelendr-features" className={styles.productSection}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>{t('timelendr.featuresTitle')}</h2>
              <div className={styles.bento}>
                {FEATURE_PILLARS.map(({ titleKey, descKey, accent, wide }, index) => (
                  <article
                    key={titleKey}
                    className={`${styles.bentoCard} ${ACCENT_CLASS[accent]} ${wide ? styles.bentoWide : ''}`}
                  >
                    <div className={styles.bentoIndex}>{String(index + 1).padStart(2, '0')}</div>
                    <h3 className={styles.bentoTitle}>{t(titleKey)}</h3>
                    <p className={styles.bentoDesc}>{t(descKey)}</p>
                  </article>
                ))}
              </div>
              <p className={styles.featuresSecondary}>{t('timelendr.featuresSecondary')}</p>
            </section>

            <section id="timelendr-downloads" className={styles.downloadsPanel}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>{t('timelendr.downloadsTitle')}</h2>
              <Typography sx={{ color: 'rgba(255,255,255,0.72)', mb: 2, lineHeight: 1.6, maxWidth: '56ch' }}>
                {t('timelendr.downloadsLead')}
              </Typography>
              {releases.length === 0 ? (
                <Typography sx={{ color: 'rgba(255,255,255,0.75)' }}>{t('timelendr.noReleases')}</Typography>
              ) : (
                releases.map((r) => (
                  <div key={r.id} className={styles.downloadCard}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25, mb: 1 }}>
                      {r.version && (
                        <Typography component="span" sx={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9375rem' }}>
                          {t('timelendr.version')} {r.version}
                        </Typography>
                      )}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#5eead4',
                        }}
                      >
                        {(r.platform ?? 'both') === 'windows'
                          ? t('timelendr.platformWindows')
                          : (r.platform ?? 'both') === 'macos'
                            ? t('timelendr.platformMacos')
                            : t('timelendr.platformBoth')}
                      </Typography>
                      <Typography component="span" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
                        {new Date(r.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.82)', mb: 2, whiteSpace: 'pre-wrap', lineHeight: 1.65, fontSize: '0.9rem' }}>
                      {r.changelog}
                    </Typography>
                    <Button
                      variant="contained"
                      href={r.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<DownloadIcon />}
                      sx={{
                        fontWeight: 700,
                        borderRadius: DESIGN_TOKENS.borderRadius.small,
                        bgcolor: '#0d9488',
                        '&:hover': { bgcolor: '#0f766e' },
                      }}
                    >
                      {t('timelendr.downloadButton')}
                    </Button>
                  </div>
                ))
              )}
              {latestRelease && (
                <p className={styles.secondaryNote}>{t('timelendr.downloadNote')}</p>
              )}
            </section>
            </div>

            <Box
              sx={{
                ...cardSx,
                borderRadius: DESIGN_TOKENS.borderRadius.medium,
                p: { xs: 2.5, sm: 3 },
                mb: 3,
                borderLeft: '3px solid #0d9488',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: textColor, mb: 1.5, fontSize: '1rem' }}>
                {t('timelendr.securityTitle')}
              </Typography>
              <Typography sx={{ color: textColor, opacity: 0.88, lineHeight: 1.7, mb: 1.5, fontSize: '0.9rem' }}>
                {t('timelendr.securityLead')}
              </Typography>
              <Typography sx={{ color: textColor, opacity: 0.82, lineHeight: 1.7, fontSize: '0.875rem' }}>
                {t('timelendr.securityP1')}
              </Typography>
            </Box>

            <Typography
              sx={{
                textAlign: 'center',
                color: textColor,
                opacity: 0.55,
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
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
