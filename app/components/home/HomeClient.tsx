'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import dynamic from 'next/dynamic'
import AppBarComponent from '@/components/appBar'
import PageWrapper from '@/components/shared/PageWrapper'
import InteractiveBackgroundSection from '@/components/shared/InteractiveBackgroundSection'
import ScrollTriggeredStickyCTA from '@/components/shared/ScrollTriggeredStickyCTA'
import LaneCrossLinks from '@/components/home/LaneCrossLinks'
import HomeV2Hero from '@/components/home-v2/HomeV2Hero'
import HomeV2Services from '@/components/home-v2/HomeV2Services'
import HomeV2Pricing from '@/components/home-v2/HomeV2Pricing'
import HomeV2Credibility from '@/components/home-v2/HomeV2Credibility'
import HomeV2FinalCta from '@/components/home-v2/HomeV2FinalCta'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'

const SignatureIntro = dynamic(() => import('@/components/SignatureIntro'), { ssr: false })

const INTRO_SESSION_KEY = 'portfolio-intro-seen'

function setIntroSeenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${INTRO_SESSION_KEY}=1; path=/`
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
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
      {showIntro && <SignatureIntro onComplete={handleIntroComplete} />}
      {!showIntro && (
        <PageWrapper backgroundVariant="default">
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
                <HomeV2Services />
                <HomeV2Pricing />
                <HomeV2Credibility />
                <HomeV2FinalCta />
                <LaneCrossLinks current="web" />
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
