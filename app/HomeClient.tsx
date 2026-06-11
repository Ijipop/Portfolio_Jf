'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import HomeAmbientBackdrop from './components/home/HomeAmbientBackdrop'
import PortfolioHomeHero from './components/home/PortfolioHomeHero'
import AppBarComponent from './components/appBar'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import PortfolioServicesSection from './components/shared/PortfolioServicesSection'
import ClientProofSection from './components/shared/ClientProofSection'
import ScrollTriggeredStickyCTA from './components/shared/ScrollTriggeredStickyCTA'
import HomeDemosBand from './components/home/HomeDemosBand'
import Footer from './components/Footer'
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

        {SHOW_HOME_DEMOS_BAND && <HomeDemosBand />}

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
