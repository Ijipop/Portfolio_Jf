'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { usePathname, useRouter } from 'next/navigation'
import { GlassContainer } from './components/GlassCard'
import { LetterAnimations } from './components/LetterAnimations'
import { FadeIn, TypingEffect } from './components/SimpleAnimations'
import SkillTag from './components/shared/SkillTag'
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
  const router = useRouter()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { primary, secondary, accent } = useThemeColors()
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

  const handleCardClick = (path: string) => {
    router.push(path)
  }

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
          <LetterAnimations>
            {t('home.heroTitle')}
          </LetterAnimations>
        }
        subtitle={
          <TypingEffect 
            text={t('home.heroSubtitle')}
            speed={50}
          />
        }
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'center',
          mt: 2,
          alignItems: 'center'
        }}>
          <CTAButton 
            variant="primary"
            onClick={() => router.push('/portfolio/projets')}
            size="large"
          >
            {t('home.seeProjects')}
          </CTAButton>
          <CTAButton 
            variant="outline"
            onClick={() => router.push('/portfolio/contact')}
            size="large"
          >
            {t('home.contactMe')}
          </CTAButton>
        </Box>
      </HeaderSection>

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
        <GlassContainer sx={{ 
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'glass', level: 'soft', interactive: false }),
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
                opacity: 0.9
              }}
            >
              {t('home.intro')}
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              gap: { xs: 1.5, sm: 2 },
              mt: 2,
              mb: 0,
              maxWidth: 500,
              mx: 'auto'
            }}>
              <Box>
                <Typography variant="h3" sx={{ 
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 0.25
                }}>
                  1
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: textColor, opacity: 0.8 }}>
                  {t('home.statsStage')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ 
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  color: primary,
                  mb: 0.25
                }}>
                  10+
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: textColor, opacity: 0.8 }}>
                  {t('home.statsTech')}
                </Typography>
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                <Typography variant="h3" sx={{ 
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 700,
                  color: primary,
                  mb: 0.25
                }}>
                  {t('home.statsAvailable')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: textColor, opacity: 0.8 }}>
                  {t('home.statsAvailableLabel')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </GlassContainer>

        <Container maxWidth="lg" sx={{ 
          py: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl }, 
          px: { xs: 2, sm: 3, md: 4 }, 
          position: 'relative', 
          zIndex: 2 
        }}>
          <Box sx={{ 
            borderRadius: DESIGN_TOKENS.borderRadius.large,
            padding: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
            textAlign: 'center',
            mb: DESIGN_TOKENS.spacing.xxl,
            position: 'relative',
            overflow: 'hidden',
            ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                mb: DESIGN_TOKENS.spacing.md,
                ...DESIGN_TOKENS.typography.h3,
                fontWeight: 700,
                textShadow: `0 2px 4px rgba(0,0,0,0.1), 0 0 20px ${primary}40`,
                background: `linear-gradient(135deg, ${primary}, ${secondary}, ${primary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease-in-out infinite',
                '@keyframes gradientShift': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}
            >
              {t('home.sectionSkills')}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              gap: 1.5,
              visibility: 'visible !important',
              opacity: '1 !important',
              zIndex: 1000,
              position: 'relative'
            }}>
              <SkillTag>Python</SkillTag>
              <SkillTag>Java</SkillTag>
              <SkillTag>React</SkillTag>
              <SkillTag>Next.js</SkillTag>
              <SkillTag>TypeScript</SkillTag>
              <SkillTag>JavaScript</SkillTag>
              <SkillTag>SQL</SkillTag>
              <SkillTag>CSS3</SkillTag>
              <SkillTag>HTML5</SkillTag>
              <SkillTag>Git</SkillTag>
            </Box>
          </Box>
        </Container>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
          mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl },
          px: { xs: 1, sm: 0 }
        }}>
          <FadeIn delay={0.8}>
            <ThreeDCardComponent onClick={() => handleCardClick('/portfolio/projets')} floatingElements={2}>
              <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardProjects')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
                {t('home.cardProjectsDesc')}
              </Typography>
            </ThreeDCardComponent>
          </FadeIn>

          <FadeIn delay={1.0}>
            <ThreeDCardComponent onClick={() => handleCardClick('/portfolio/a-propos')} floatingElements={3}>
              <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardAbout')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
                {t('home.cardAboutDesc')}
              </Typography>
            </ThreeDCardComponent>
          </FadeIn>

          <FadeIn delay={1.2}>
            <ThreeDCardComponent onClick={() => handleCardClick('/portfolio/contact')} floatingElements={2}>
              <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                {t('home.cardContact')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
                {t('home.cardContactDesc')}
              </Typography>
            </ThreeDCardComponent>
          </FadeIn>
        </Box>
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
      {!isMobile && (
        <StickyCTA text={t('home.stickyCTA')} onClick={() => router.push('/portfolio/contact')} />
      )}
    </PageWrapper>
      )}
    </>
  )
}
