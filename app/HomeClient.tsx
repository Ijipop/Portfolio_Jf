'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import HomeHeroIntroCard from './components/home/HomeHeroIntroCard'
import { FadeIn } from './components/SimpleAnimations'
import ThreeDCardComponent from './components/ThreeDCard'
import AppBarComponent from './components/appBar'
import HeaderSection from './components/shared/HeaderSection'
import IjipopGlitchTitle from './components/shared/IjipopGlitchTitle'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import CTAButton from './components/shared/CTAButton'
import StickyCTA from './components/shared/StickyCTA'
import Footer from './components/Footer'
import { DESIGN_TOKENS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import SignatureIntro from './components/SignatureIntro'
import { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const INTRO_SESSION_KEY = 'portfolio-intro-seen'

function setIntroSeenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${INTRO_SESSION_KEY}=1; path=/`
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const heroBrand = t('home.heroTitle')
  const [showIntro, setShowIntro] = useState<boolean>(initialShowIntro)

  // Synchroniser avec cookie/sessionStorage après montage pour éviter flash d'hydration
  useEffect(() => {
    const seen =
      typeof window !== 'undefined' &&
      (sessionStorage.getItem(INTRO_SESSION_KEY) === '1' ||
        document.cookie.includes('portfolio-intro-seen=1'))
    if (seen) setShowIntro(false)
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
      <AppBarComponent />
      
      <HeaderSection 
        title={<IjipopGlitchTitle text={heroBrand} variant="hero" />}
        subtitle={
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              mt: { xs: 0.45, sm: 0.6 },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.08rem' },
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500,
              opacity: 0.9,
              color: textColor,
            }}
          >
            {t('home.heroSubtitle')}
          </Typography>
        }
        tagline={t('home.heroTagline')}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
          mt: 2,
          alignItems: 'center'
        }}>
          <Link href="/portfolio/contact" style={{ textDecoration: 'none' }}>
            <CTAButton variant="outline" size="large">
              {t('home.contactMe')}
            </CTAButton>
          </Link>
        </Box>
      </HeaderSection>

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
        <HomeHeroIntroCard />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gridTemplateRows: { md: '260px' },
          gap: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
          px: { xs: 1, sm: 0 },
          alignItems: 'stretch',
        }}>
          <FadeIn delay={0}>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/projets" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={2} sx={{ height: '100%', maxHeight: { md: 260 }, overflow: 'hidden' }}>
                  <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardProjects')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                    {t('home.cardProjectsDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </FadeIn>

          <FadeIn delay={0}>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/a-propos" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={3} sx={{ height: '100%', maxHeight: { md: 260 }, overflow: 'hidden' }}>
                  <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardAbout')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                    {t('home.cardAboutDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </FadeIn>

          <FadeIn delay={0}>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/contact" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={2} sx={{ height: '100%', maxHeight: { md: 260 }, overflow: 'hidden' }}>
                  <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardContact')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                    {t('home.cardContactDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </FadeIn>
        </Box>
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
      {!isMobile && (
        <StickyCTA text={t('home.stickyCTA')} href="/portfolio/contact" />
      )}
    </PageWrapper>
      )}
    </>
  )
}
