'use client'

import CodeIcon from '@mui/icons-material/Code'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PersonIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { GlassContainer } from './components/GlassCard'
import { LetterAnimations } from './components/LetterAnimations'
import { FadeIn, HoverScale, TypingEffect } from './components/SimpleAnimations'
import SkillTag from './components/shared/SkillTag'
import ThreeDCardComponent from './components/ThreeDCard'
import AppBarComponent from './components/appBar'
import HeaderSection from './components/shared/HeaderSection'
import PageWrapper from './components/shared/PageWrapper'
import CTAButton from './components/shared/CTAButton'
import StickyCTA from './components/shared/StickyCTA'
import Footer from './components/Footer'
import { DESIGN_TOKENS, GRADIENTS } from './design-system/constants'
import { useThemeColors } from './hooks/useThemeColors'
import { useTextColor } from './hooks/useTextColor'
import { useLanguage } from './contexts/LanguageContext'
import { useAdvancedTheme } from './contexts/AdvancedThemeContext'
import SignatureIntro from './components/SignatureIntro'
import { useEffect, useState } from 'react'

const INTRO_SESSION_KEY = 'portfolio-intro-seen'

function setIntroSeenCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${INTRO_SESSION_KEY}=1; path=/`
}

export default function HomeClient({ initialShowIntro }: { initialShowIntro: boolean }) {
  const router = useRouter()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { themeName } = useAdvancedTheme()
  const [skillsBackground, setSkillsBackground] = useState<string>(GRADIENTS.cards.light)
  const [showIntro, setShowIntro] = useState<boolean>(initialShowIntro)

  // Synchroniser avec cookie/sessionStorage après montage pour éviter flash d'hydration
  useEffect(() => {
    const seen =
      typeof window !== 'undefined' &&
      (sessionStorage.getItem(INTRO_SESSION_KEY) === '1' ||
        document.cookie.includes('portfolio-intro-seen=1'))
    if (seen) setShowIntro(false)
  }, [])

  // Mettre à jour le background de la section compétences quand le thème change
  useEffect(() => {
    const updateSkillsBackground = () => {
      if (typeof window === 'undefined') return
      
      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()
      
      if (cardBg && cardBg !== 'none') {
        setSkillsBackground(cardBg)
      } else {
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
        const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
        
        if (bg && bg2) {
          setSkillsBackground(`linear-gradient(145deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`)
        } else {
          setSkillsBackground(GRADIENTS.cards.light)
        }
      }
    }
    
    updateSkillsBackground()
    
    const observer = new MutationObserver(updateSkillsBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateSkillsBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
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
      <PageWrapper
      backgroundVariant="default"
      particleCount={60}
      particleSpeed={0.2}
      particleColors={[primary, secondary, accent]}
    >
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
            onClick={() => router.push('/projets')}
            size="large"
          >
            {t('home.seeProjects')}
          </CTAButton>
          <CTAButton 
            variant="outline"
            onClick={() => router.push('/contact')}
            size="large"
          >
            {t('home.contactMe')}
          </CTAButton>
        </Box>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
        <GlassContainer sx={{ 
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
            background: themeName === 'default' ? '#ffffff !important' : `${skillsBackground} !important`,
            border: themeName === 'default' ? '1px solid rgba(0,0,0,0.08) !important' : `1px solid ${primary}30 !important`,
            borderRadius: DESIGN_TOKENS.borderRadius.large,
            padding: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
            textAlign: 'center',
            boxShadow: themeName === 'default' ? '0 8px 32px rgba(0,0,0,0.08) !important' : `0 8px 32px ${primary}20 !important`,
            mb: DESIGN_TOKENS.spacing.xxl,
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
          }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                mb: DESIGN_TOKENS.spacing.md,
                ...DESIGN_TOKENS.typography.h3,
                fontWeight: 700,
                ...(themeName === 'default'
                  ? { color: '#1e293b', textShadow: '0 1px 2px rgba(0,0,0,0.06)' }
                  : {
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
                    }),
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
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/projets')} floatingElements={2}>
            <CodeIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
              {t('home.cardProjects')}
            </Typography>
            <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
              {t('home.cardProjectsDesc')}
            </Typography>
          </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>

          <FadeIn delay={1.0}>
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/a-propos')} floatingElements={3}>
                <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                  {t('home.cardAbout')}
                </Typography>
                <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
                  {t('home.cardAboutDesc')}
                </Typography>
              </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>

          <FadeIn delay={1.2}>
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/contact')} floatingElements={2}>
                <ContactSupportIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ color: textColor }}>
                  {t('home.cardContact')}
                </Typography>
                <Typography variant="body1" sx={{ color: textColor, opacity: 0.8 }}>
                  {t('home.cardContactDesc')}
                </Typography>
              </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>
        </Box>
      </Container>
      
      <Footer />
      <StickyCTA text={t('home.stickyCTA')} onClick={() => router.push('/contact')} />
    </PageWrapper>
      )}
    </>
  )
}
