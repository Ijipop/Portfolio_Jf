'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import AppBarComponent from '@/components/appBar'
import PageWrapper from '@/components/shared/PageWrapper'
import InteractiveBackgroundSection from '@/components/shared/InteractiveBackgroundSection'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import HomeV2Backdrop from '@/components/home-v2/HomeV2Backdrop'
import HomeV2Hero from '@/components/home-v2/HomeV2Hero'
import HomeV2CaseStudies from '@/components/home-v2/HomeV2CaseStudies'
import HomeV2Services from '@/components/home-v2/HomeV2Services'
import HomeV2Pricing from '@/components/home-v2/HomeV2Pricing'
import HomeV2Credibility from '@/components/home-v2/HomeV2Credibility'
import HomeV2FinalCta from '@/components/home-v2/HomeV2FinalCta'
import SeoInternalLinkCta from '@/components/seo/SeoInternalLinkCta'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

const SignatureIntro = dynamic(() => import('@/components/SignatureIntro'), { ssr: false })

const INTRO_SESSION_KEY = 'portfolio-intro-seen'

function setIntroSeenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${INTRO_SESSION_KEY}=1; path=/`
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
  const { t } = useLanguage()
  const [showIntro, setShowIntro] = useState<boolean>(initialShowIntro)

  useEffect(() => {
    const seen =
      typeof window !== 'undefined' &&
      (sessionStorage.getItem(INTRO_SESSION_KEY) === '1' ||
        document.cookie.includes('portfolio-intro-seen=1'))
    if (seen) setShowIntro(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const scrollToHash = () => {
      const raw = window.location.hash.replace(/^#/, '')
      if (!raw) {
        window.scrollTo(0, 0)
        return
      }
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
      {showIntro && <SignatureIntro onComplete={handleIntroComplete} />}
      {!showIntro && (
        <PageWrapper backgroundVariant="default">
          <HomeV2Backdrop glowPlacement="top" />
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
              <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3, md: 4 } }}>
                <HomeV2Hero />
              </Container>
            </Box>

            <InteractiveBackgroundSection>
              <Container
                maxWidth="lg"
                sx={{
                  pt: { xs: 2, sm: 3 },
                  pb: { xs: 10, sm: 4, md: 8 },
                  px: { xs: 1.5, sm: 3, md: 4 },
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <HomeV2CaseStudies />
                <HomeV2Services />
                <HomeV2Pricing />
                <HomeV2Credibility />
                <SeoInternalLinkCta
                  title={t('seo.webDemosTitle')}
                  body={t('seo.webDemosBody')}
                  href="/demos"
                  linkLabel={t('seo.webDemosLink')}
                  variant="compact"
                />
                <HomeV2FinalCta />
              </Container>
            </InteractiveBackgroundSection>

            <Footer mobileBottomClearance />
            <ScrollTriggeredStickyCTA textKey="homeV2.heroCtaPrimary" />
          </Box>
        </PageWrapper>
      )}
    </>
  )
}
