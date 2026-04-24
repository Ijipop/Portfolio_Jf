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
import PortfolioHomeHero from './components/home/PortfolioHomeHero'
import { FadeIn } from './components/SimpleAnimations'
import ThreeDCardComponent from './components/ThreeDCard'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import AppBarComponent from './components/appBar'
import PageWrapper from './components/shared/PageWrapper'
import InteractiveBackgroundSection from './components/shared/InteractiveBackgroundSection'
import StickyCTA from './components/shared/StickyCTA'
import Footer from './components/Footer'
import { DESIGN_TOKENS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import { usePresentationMode } from './contexts/PresentationModeContext'
import SignatureIntro from './components/SignatureIntro'
import { useEffect, useState, type ReactNode } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'

const INTRO_SESSION_KEY = 'portfolio-intro-seen'

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

type HomeNavCardProps = {
  href: string
  /** Mode Créa (présentation dev) : effet Aceternity CardSpotlight à la place de la 3D card. */
  useCreaSpotlight: boolean
  floatingElements?: number
  children: ReactNode
}

function HomeNavCard({
  href,
  useCreaSpotlight,
  floatingElements = 2,
  children,
}: HomeNavCardProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const surfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flat',
    level: 'soft',
    interactive: true,
  })
  const hasGlassSurface = Object.keys(surfaceSx).length > 0

  const linkStyle = {
    textDecoration: 'none' as const,
    display: 'flex',
    width: '100%',
    height: '100%',
    minHeight: 0,
  }

  if (useCreaSpotlight) {
    const glow = {
      primary: alpha(primary, 0.44),
      secondary: alpha(secondary, 0.36),
      accent: alpha(accent, 0.34),
    }
    const maskTint = alpha(primary, theme.palette.mode === 'dark' ? 0.3 : 0.12)

    return (
      <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
        <Link
          href={href}
          style={{
            ...linkStyle,
            flex: 1,
            alignSelf: 'stretch',
            minHeight: 240,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              cursor: 'pointer',
              borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
              overflow: 'hidden',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)' },
              ...surfaceSx,
              ...(!hasGlassSurface && {
                background: 'var(--card-background)',
                border: `1px solid ${alpha(primary, theme.palette.mode === 'dark' ? 0.24 : 0.14)}`,
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 20px 50px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 20px 50px rgba(15,23,42,0.1), 0 0 0 1px rgba(15,23,42,0.06)',
              }),
              /** Padding uniquement sur le contenu : CardSpotlight occupe tout le panneau pour que le halo couvre toute la carte. */
              height: '100%',
              minHeight: 240,
            }}
          >
            <CardSpotlight
              radius={320}
              color={maskTint}
              glow={glow}
              className="flex h-full min-h-[240px] w-full min-w-0 flex-1 flex-col !rounded-none !border-0 !bg-transparent !p-0 !shadow-none"
            >
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 20,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  height: '100%',
                  p: HOME_GRID_CARD_SX.p,
                  color: textColor,
                  '& .MuiSvgIcon-root': { color: primary },
                }}
              >
                {children}
              </Box>
            </CardSpotlight>
          </Box>
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', minHeight: 0, height: '100%' }}>
      <Link href={href} style={linkStyle}>
        <ThreeDCardComponent fullHeight floatingElements={floatingElements} sx={HOME_GRID_CARD_SX}>
          {children}
        </ThreeDCardComponent>
      </Link>
    </Box>
  )
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const useCreaSpotlightCards = presentationMode === 'dev'
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
        <HomeHeroServicesSection />

        <FadeIn delay={0.08}>
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
        </FadeIn>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
          px: { xs: 1, sm: 0 },
          alignItems: 'stretch',
        }}>
          <FadeIn delay={0}>
            <HomeNavCard href="/portfolio/projets" useCreaSpotlight={useCreaSpotlightCards} floatingElements={2}>
              <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardProjects')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardProjectsDesc')}
              </Typography>
            </HomeNavCard>
          </FadeIn>

          <FadeIn delay={0}>
            <HomeNavCard href="/portfolio/a-propos" useCreaSpotlight={useCreaSpotlightCards} floatingElements={3}>
              <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardAbout')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardAboutDesc')}
              </Typography>
            </HomeNavCard>
          </FadeIn>

          <FadeIn delay={0}>
            <HomeNavCard href="/portfolio/contact" useCreaSpotlight={useCreaSpotlightCards} floatingElements={2}>
              <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardContact')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, ...HOME_CARD_DESC_TYPO_SX }}>
                {t('home.cardContactDesc')}
              </Typography>
            </HomeNavCard>
          </FadeIn>
        </Box>
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
      {!isMobile && (
        <StickyCTA text={t('home.stickyCTA')} href="/portfolio/contact" />
      )}
      </Box>
    </PageWrapper>
      )}
    </>
  )
}
