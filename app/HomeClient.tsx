'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { alpha } from '@mui/material/styles'
import HomeAmbientBackdrop from './components/home/HomeAmbientBackdrop'
import PortfolioHomeHero from './components/home/PortfolioHomeHero'
import AppBarComponent from './components/appBar'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import PortfolioServicesSection from './components/shared/PortfolioServicesSection'
import ClientProofSection from './components/shared/ClientProofSection'
import ScrollTriggeredStickyCTA from './components/shared/ScrollTriggeredStickyCTA'
import CTAButton from './components/shared/CTAButton'
import Footer from './components/Footer'
import { DESIGN_TOKENS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import { useEffect, useState } from 'react'

const SignatureIntro = dynamic(() => import('./components/SignatureIntro'), { ssr: false })
const HomeHeroServicesSection = dynamic(() => import('./components/home/HomeHeroServicesSection'), { ssr: false })
const PortfolioStatsBand = dynamic(() => import('./components/shared/PortfolioStatsBand'), { ssr: false })
const HomeNavigationCards = dynamic(() => import('./components/home/HomeNavigationCards'), { ssr: false })
const PortfolioProcessSection = dynamic(
  () => import('./components/shared/PortfolioProcessSection'),
  { ssr: false },
)
const AiConversionTeaser = dynamic(() => import('./components/home/AiConversionTeaser'), { ssr: false })
const ScrollReveal = dynamic(() => import('./components/shared/ScrollReveal'), { ssr: false })

const INTRO_SESSION_KEY = 'portfolio-intro-seen'
const SHOW_HOME_STATS_BAND = false
const SHOW_HOME_SITE_INTRO = false
const SHOW_HOME_DEMOS_BAND = true
const SHOW_HOME_NAVIGATION_CARDS = false

function setIntroSeenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${INTRO_SESSION_KEY}=1; path=/`
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const [showIntro, setShowIntro] = useState<boolean>(initialShowIntro)

  // Synchroniser avec cookie/sessionStorage après montage pour éviter flash d'hydration
  useEffect(() => {
    const seen =
      typeof window !== 'undefined' &&
      (sessionStorage.getItem(INTRO_SESSION_KEY) === '1' ||
        document.cookie.includes('portfolio-intro-seen=1'))
    if (seen) setShowIntro(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const scrollToHash = () => {
      const raw = window.location.hash.replace(/^#/, '')
      if (!raw) return
      window.requestAnimationFrame(() => {
        document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1')
      setIntroSeenCookie()
    }
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && (
        <SignatureIntro onComplete={handleIntroComplete} />
      )}
      {!showIntro && (
      <PageWrapper backgroundVariant="default">
      <Box sx={{ opacity: 0.78 }}>
        <HomeAmbientBackdrop />
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: '100vh',
        }}
      >
      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          m: 0,
          p: 0,
          flexShrink: 0,
        }}
      >
        <AppBarComponent />
        <PortfolioHomeHero />
      </Box>

      <InteractiveBackgroundSection>
      <Container
        maxWidth="lg"
        sx={{
          /** Espace au-dessus des offres — réduit sur mobile (le hero remplit déjà le viewport). */
          pt: { xs: 'clamp(20px, 5vw, 32px)', sm: '60px' },
          pb: { xs: 10, sm: 4, md: 8 },
          px: { xs: 1.5, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        {SHOW_HOME_STATS_BAND && <PortfolioStatsBand />}
        <PortfolioServicesSection />

        <ClientProofSection
          kicker={t('proof.thermoKicker')}
          title={t('proof.thermoTitle')}
          body={t('proof.thermoBody')}
          projectLabel={t('proof.thermoProjectLink')}
          projectHref="/portfolio/projets"
          proofOnly
        />

        {SHOW_HOME_SITE_INTRO && <HomeHeroServicesSection />}

        {SHOW_HOME_DEMOS_BAND && (
        <ScrollReveal direction="up" delay={0.08}>
          <Box
            sx={{
              mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
              px: { xs: 3, sm: 4, md: 4.5 },
              py: { xs: 3.25, sm: 3.75, md: 4 },
              borderRadius: DESIGN_TOKENS.borderRadius.banner,
              border: (theme) => `1px solid ${alpha(theme.palette.mode === 'dark' ? '#94a3b8' : primary, 0.22)}`,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(primary, 0.14)} 0%, ${alpha('#0f172a', 0.5)} 100%)`
                  : `linear-gradient(135deg, ${alpha(primary, 0.09)} 0%, ${alpha(primary, 0.02)} 100%)`,
              textAlign: { xs: 'center', sm: 'left' },
              display: 'grid',
              gap: { xs: 1.5, sm: 2 },
              gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: primary, fontWeight: 800, letterSpacing: '0.14em', display: 'block', mb: 0.75 }}
              >
                {t('home.demosBandKicker')}
              </Typography>
              <Typography variant="h5" sx={{ color: textColor, fontWeight: 800, mb: 0.75, lineHeight: 1.25 }}>
                {t('home.demosBandTitle')}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, opacity: 0.88, lineHeight: 1.6, maxWidth: 560 }}>
                {t('home.demosBandLead')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Link href="/demos" style={{ textDecoration: 'none' }}>
                <CTAButton variant="primary" size="medium">
                  {t('home.demosBandCta')}
                </CTAButton>
              </Link>
            </Box>
          </Box>
        </ScrollReveal>
        )}

        {SHOW_HOME_NAVIGATION_CARDS && <HomeNavigationCards />}
        <Box className="perf-cv-auto">
          <PortfolioProcessSection />
        </Box>
        <AiConversionTeaser />
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer mobileBottomClearance />
      <ScrollTriggeredStickyCTA text={t('home.stickyCTA')} />
      </Box>
    </PageWrapper>
      )}
    </>
  )
}
