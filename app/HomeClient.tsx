'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { alpha } from '@mui/material/styles'
import HomeHeroServicesSection from './components/home/HomeHeroServicesSection'
import HomeAmbientBackdrop from './components/home/HomeAmbientBackdrop'
import AiConversionTeaser from './components/home/AiConversionTeaser'
import PortfolioHomeHero from './components/home/PortfolioHomeHero'
import ThreeDCardComponent from './components/ThreeDCard'
import AppBarComponent from './components/appBar'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import PortfolioStatsBand from './components/shared/PortfolioStatsBand'
import PortfolioServicesSection from './components/shared/PortfolioServicesSection'
import PortfolioProcessSection from './components/shared/PortfolioProcessSection'
import ScrollReveal from './components/shared/ScrollReveal'
import Footer from './components/Footer'
import { DESIGN_TOKENS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import SignatureIntro from './components/SignatureIntro'
import { useEffect, useState } from 'react'

const INTRO_SESSION_KEY = 'portfolio-intro-seen'
const SHOW_HOME_STATS_BAND = false
const SHOW_HOME_SITE_INTRO = false
const SHOW_HOME_DEMOS_BAND = false
const SHOW_HOME_NAVIGATION_CARDS = false

/** Grille accueil : un peu plus de large utile pour le texte sur mobile ; hauteur libre. */
const HOME_GRID_CARD_SX = {
  height: '100%',
  minHeight: 0,
  p: { xs: 2.25, sm: 3, md: 4 },
} as const

/** Corps des cartes : retours à la ligne plus propres ; « : » orphelin évité côté contenu (espace fine insécable dans les FR). */
const HOME_CARD_DESC_TYPO_SX = {
  opacity: 0.85,
  lineHeight: 1.55,
  flex: 1,
  overflowWrap: 'break-word' as const,
  orphans: 2,
  widows: 2,
  hyphens: 'auto' as const,
  '@supports (text-wrap: pretty)': { textWrap: 'pretty' as const },
}

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
      <AppBarComponent />

      <PortfolioHomeHero />

      <InteractiveBackgroundSection>
      <Container
        maxWidth="lg"
        sx={{
          /** Espace au-dessus du bloc présentation (60px desktop, un peu moins sur très petit écran). */
          pt: { xs: 'clamp(36px, 10vw, 60px)', sm: '60px' },
          pb: { xs: 3, sm: 4, md: 8 },
          px: { xs: 1.5, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        {SHOW_HOME_STATS_BAND && <PortfolioStatsBand />}
        <PortfolioServicesSection />
        {SHOW_HOME_SITE_INTRO && <HomeHeroServicesSection />}

        {SHOW_HOME_DEMOS_BAND && (
        <ScrollReveal direction="up" delay={0.08}>
          <Box
            sx={{
              mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
              px: { xs: 3, sm: 4, md: 4.5 },
              py: { xs: 3.25, sm: 3.75, md: 4 },
              borderRadius: DESIGN_TOKENS.borderRadius.small,
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
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2.5,
                    py: 1.25,
                    borderRadius: DESIGN_TOKENS.borderRadius.small,
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: '#fff',
                    background: `linear-gradient(135deg, ${primary} 0%, ${primary}dd 100%)`,
                    boxShadow: `0 10px 28px ${alpha(primary, 0.35)}`,
                    transition: DESIGN_TOKENS.transitions.normal,
                    '&:hover': { filter: 'brightness(1.05)', transform: 'translateY(-1px)' },
                  }}
                >
                  {t('home.demosBandCta')}
                </Box>
              </Link>
            </Box>
          </Box>
        </ScrollReveal>
        )}

        {SHOW_HOME_NAVIGATION_CARDS && (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
          px: { xs: 1, sm: 0 },
          alignItems: 'stretch',
        }}>
          <ScrollReveal direction="up" delay={0} fillHeight>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/projets" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={2} sx={HOME_GRID_CARD_SX}>
                  <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardProjects')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                    {t('home.cardProjectsDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.05} fillHeight>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/a-propos" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={3} sx={HOME_GRID_CARD_SX}>
                  <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardAbout')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                    {t('home.cardAboutDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1} fillHeight>
            <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
              <Link href="/portfolio/contact" style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}>
                <ThreeDCardComponent fullHeight floatingElements={2} sx={HOME_GRID_CARD_SX}>
                  <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                    {t('home.cardContact')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                    {t('home.cardContactDesc')}
                  </Typography>
                </ThreeDCardComponent>
              </Link>
            </Box>
          </ScrollReveal>
        </Box>
        )}
        <PortfolioProcessSection />
        <AiConversionTeaser />
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
      </Box>
    </PageWrapper>
      )}
    </>
  )
}
