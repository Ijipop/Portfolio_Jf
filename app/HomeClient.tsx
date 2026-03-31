'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GlassContainer } from './components/GlassCard'
import { FadeIn } from './components/SimpleAnimations'
import ThreeDCardComponent from './components/ThreeDCard'
import AppBarComponent from './components/appBar'
import HeaderSection from './components/shared/HeaderSection'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import CTAButton from './components/shared/CTAButton'
import StickyCTA from './components/shared/StickyCTA'
import Footer from './components/Footer'
import { DESIGN_TOKENS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import { shouldShowTopology } from './utils/topologyRoutes'
import { getCardSurfaceSx } from './components/shared/cardSurface'
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
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const heroBrand = t('home.heroTitle')
  const heroBrandDisplay = heroBrand.toLowerCase()
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
        title={
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              fontSize: { xs: '3.5rem', sm: '5rem', md: '6.6rem' },
              fontWeight: 900,
              letterSpacing: { xs: '0.03em', sm: '0.05em' },
              textTransform: 'none',
              lineHeight: 1.05,
              position: 'relative',
              mb: { xs: 0.9, sm: 1.2 },
            }}
          >
            <Box
              component="span"
              data-text={heroBrand}
              sx={{
                position: 'relative',
                display: 'inline-block',
                color: 'transparent',
                background: `linear-gradient(180deg, #ffffff 0%, ${secondary} 30%, ${primary} 62%, ${primary}c9 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 14px ${primary}1f`,
                animation: 'ijipopGlitchBase 3.6s infinite steps(1, end)',
                '@keyframes ijipopGlitchBase': {
                  '0%, 74%, 100%': { transform: 'translate(0, 0) skewX(0deg)', opacity: 1 },
                  '75%': { transform: 'translate(0, 0) skewX(-6deg)', opacity: 0.92 },
                  '76%': { transform: 'translate(0, 0) skewX(6deg)', opacity: 1 },
                  '77%': { transform: 'translate(0, 0) skewX(-4deg)', opacity: 0.95 },
                  '78%': { transform: 'translate(0, 0) skewX(0deg)', opacity: 1 },
                },
                '&::before, &::after': {
                  content: 'attr(data-text)',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  opacity: 0.92,
                },
                '&::before': {
                  color: primary,
                  transform: 'translate(-1px, 0)',
                  clipPath: 'polygon(0 0%, 100% 0%, 100% 24%, 0 24%)',
                  animation: 'ijipopGlitchTop 3.1s infinite steps(2, end)',
                  opacity: 0.78,
                },
                '&::after': {
                  color: primary,
                  transform: 'translate(1px, 0)',
                  clipPath: 'polygon(0 76%, 100% 76%, 100% 100%, 0 100%)',
                  animation: 'ijipopGlitchBottom 2.8s infinite steps(2, end)',
                  opacity: 0.7,
                },
                '@keyframes ijipopGlitchTop': {
                  '0%, 60%, 100%': { transform: 'translate(0, 0)', clipPath: 'polygon(0 0%, 100% 0%, 100% 24%, 0 24%)' },
                  '61%': { transform: 'translate(-5px, -2px)', clipPath: 'polygon(0 6%, 100% 6%, 100% 32%, 0 32%)' },
                  '62%': { transform: 'translate(6px, 1px)', clipPath: 'polygon(0 0%, 100% 0%, 100% 18%, 0 18%)' },
                  '63%': { transform: 'translate(-4px, 0)', clipPath: 'polygon(0 10%, 100% 10%, 100% 36%, 0 36%)' },
                  '64%': { transform: 'translate(3px, -1px)', clipPath: 'polygon(0 2%, 100% 2%, 100% 26%, 0 26%)' },
                },
                '@keyframes ijipopGlitchBottom': {
                  '0%, 56%, 100%': { transform: 'translate(0, 0)', clipPath: 'polygon(0 76%, 100% 76%, 100% 100%, 0 100%)' },
                  '57%': { transform: 'translate(6px, 2px)', clipPath: 'polygon(0 82%, 100% 82%, 100% 100%, 0 100%)' },
                  '58%': { transform: 'translate(-6px, -1px)', clipPath: 'polygon(0 72%, 100% 72%, 100% 98%, 0 98%)' },
                  '59%': { transform: 'translate(4px, 0)', clipPath: 'polygon(0 78%, 100% 78%, 100% 100%, 0 100%)' },
                  '60%': { transform: 'translate(-3px, 1px)', clipPath: 'polygon(0 74%, 100% 74%, 100% 99%, 0 99%)' },
                },
              }}
            >
              {heroBrandDisplay}
            </Box>
          </Typography>
        }
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
        <GlassContainer sx={{ 
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
          p: { xs: 2.5, sm: 3, md: 3.5 },
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 1,
                ...DESIGN_TOKENS.typography.h1,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
                background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease-in-out infinite',
              }}
            >
              Jean-François Lefebvre
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 1,
                ...DESIGN_TOKENS.typography.h4,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                fontWeight: 400,
                opacity: 0.9,
                color: textColor
              }}
            >
              {t('home.role')}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                mb: 2,
                ...DESIGN_TOKENS.typography.body1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: textColor,
                opacity: 0.9,
                whiteSpace: 'pre-line',
              }}
            >
              {t('home.intro')}
            </Typography>
          </Box>
        </GlassContainer>

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
