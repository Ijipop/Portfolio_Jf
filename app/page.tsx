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
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const [skillsBackground, setSkillsBackground] = useState<string>(GRADIENTS.cards.light)

  // Mettre à jour le background de la section compétences quand le thème change
  useEffect(() => {
    const updateSkillsBackground = () => {
      if (typeof window === 'undefined') return
      
      // Lire les CSS variables définies par ThemeSelector
      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()
      
      if (cardBg && cardBg !== 'none') {
        setSkillsBackground(cardBg)
      } else {
        // Fallback : créer un gradient avec les couleurs du thème
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
    
    // Observer les changements de CSS variables
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

  return (
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
          mt: 4,
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
        <GlassContainer sx={{ mb: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl } }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              gutterBottom 
              sx={{ 
                mb: { xs: DESIGN_TOKENS.spacing.sm, md: DESIGN_TOKENS.spacing.md },
                ...DESIGN_TOKENS.typography.h1,
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
              gutterBottom 
              sx={{ 
                mb: DESIGN_TOKENS.spacing.md,
                ...DESIGN_TOKENS.typography.h4,
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
                maxWidth: 700, 
                mx: 'auto',
                mb: DESIGN_TOKENS.spacing.xl,
                ...DESIGN_TOKENS.typography.body1,
                fontSize: { xs: '0.95rem', md: '1.125rem' },
                color: textColor,
                opacity: 0.9
              }}
            >
              {t('home.intro')}
            </Typography>
            
            {/* Stats Section */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              gap: DESIGN_TOKENS.spacing.md,
              mt: DESIGN_TOKENS.spacing.xl,
              mb: DESIGN_TOKENS.spacing.lg,
              maxWidth: 600,
              mx: 'auto'
            }}>
              <Box>
                <Typography variant="h3" sx={{ 
                  ...DESIGN_TOKENS.typography.h3,
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 0.5
                }}>
                  1
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                  Stage terminé
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ 
                  ...DESIGN_TOKENS.typography.h3,
                  fontWeight: 700,
                  color: primary,
                  mb: 0.5
                }}>
                  10+
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                  Technologies maîtrisées
                </Typography>
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                <Typography variant="h3" sx={{ 
                  ...DESIGN_TOKENS.typography.h3,
                  fontWeight: 700,
                  color: primary,
                  mb: 0.5
                }}>
                  Disponible
                </Typography>
                <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                  Pour nouveaux projets
                </Typography>
              </Box>
            </Box>
          </Box>
        </GlassContainer>

        {/* Section Compétences */}
        <Container maxWidth="lg" sx={{ 
          py: { xs: DESIGN_TOKENS.spacing.xl, md: DESIGN_TOKENS.spacing.xxl }, 
          px: { xs: 2, sm: 3, md: 4 }, 
          position: 'relative', 
          zIndex: 2 
        }}>
          <Box sx={{ 
            background: `${skillsBackground} !important`,
            border: `1px solid ${primary}30 !important`,
            borderRadius: DESIGN_TOKENS.borderRadius.large,
            padding: { xs: DESIGN_TOKENS.spacing.md, md: DESIGN_TOKENS.spacing.xl },
            textAlign: 'center',
            boxShadow: `0 8px 32px ${primary}20 !important`,
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
              gap: 1.5, // 12px au lieu de 4px
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
  )
}
