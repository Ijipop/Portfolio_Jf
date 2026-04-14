'use client'

import PersonIcon from '@mui/icons-material/Person'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { shouldShowTopology } from '@/utils/topologyRoutes'
import SkillTag from '../../components/shared/SkillTag'
import HeaderSection from '../../components/shared/HeaderSection'
import IjipopGlitchTitle from '../../components/shared/IjipopGlitchTitle'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { GRADIENTS, DESIGN_TOKENS } from '../../design-system/constants'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '@mui/material/styles'
import { getTextColorForBackground } from '../../utils/colorUtils'
import { getCardSurfaceSx } from '@/components/shared/cardSurface'
import ScrollReveal from '../../components/shared/ScrollReveal'
import SoftSkillsSection from './components/SoftSkillsSection'
import AboutCtaSection from './components/AboutCtaSection'
import AboutPersonalStorySection from './components/AboutPersonalStorySection'

// FlipCard components spécifiques à cette page (logique complexe)
const FlipCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  height: 400,
  minHeight: 280,
  [theme.breakpoints.down('md')]: { height: 380 },
  [theme.breakpoints.down('sm')]: { height: 420, minHeight: 360 },
  perspective: '1000px',
  cursor: 'pointer',
  WebkitPerspective: '1000px',
  MozPerspective: '1000px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    animation: 'shake 0.5s ease-in-out',
  },
  '@keyframes shake': {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-2px)' },
    '75%': { transform: 'translateX(2px)' },
  }
}))

const FlipCardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'flipped',
})<{ flipped: boolean }>(({ theme, flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  WebkitTransformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  WebkitTransform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}))

// Composant FlipCardFront fonctionnel pour utiliser les couleurs du thème
const FlipCardFront = ({ children, sx }: { children: React.ReactNode; sx?: any }) => {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary } = useThemeColors()
  const [cardBackground, setCardBackground] = useState<string>(GRADIENTS.cards.light)

  useEffect(() => {
    const updateCardBackground = () => {
      if (typeof window === 'undefined') return
      
      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()
      
      if (cardBg && cardBg !== 'none') {
        setCardBackground(cardBg)
      } else {
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
        const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
        
        if (bg && bg2) {
          setCardBackground(`linear-gradient(145deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`)
        } else {
          setCardBackground(GRADIENTS.cards.light)
        }
      }
    }
    
    updateCardBackground()
    
    const observer = new MutationObserver(updateCardBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateCardBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  const flipFaceSurfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flipFace',
    level: 'soft',
    interactive: false,
  })
  const glassStyle = isTopologyRoute
    ? flipFaceSurfaceSx
    : { background: `${cardBackground} !important` }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        ...glassStyle,
        border: `1px solid ${primary}30 !important`,
        borderRadius: '8px',
        padding: theme.spacing(4),
        textAlign: 'center',
        boxShadow: `${DESIGN_TOKENS.shadows.elevated.light} !important`,
        transition: DESIGN_TOKENS.transitions.slow,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

// Animation d'entrée discrète pour l'endos des cartes (relax, professionnel)
const BackContentAnimated = styled(Box)({
  '@keyframes backEntrance': {
    '0%': { opacity: 0, transform: 'translateY(6px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'backEntrance 0.6s ease-out',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
})

// Composant FlipCardBack fonctionnel pour utiliser les couleurs du thème
const FlipCardBack = ({ children, sx }: { children: React.ReactNode; sx?: any }) => {
  const theme = useTheme()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { primary, secondary } = useThemeColors()
  const backGradient = `linear-gradient(135deg, ${primary}CC 0%, ${secondary}B3 50%, ${primary}CC 100%)`
  const backTextColor = getTextColorForBackground(backGradient)

  const backFlipFaceSurfaceSx = getCardSurfaceSx({
    isTopologyRoute,
    variant: 'flipFace',
    level: 'soft',
    interactive: false,
  })
  const backGlassStyle = isTopologyRoute
    ? backFlipFaceSurfaceSx
    : { background: `${backGradient} !important` }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        ...backGlassStyle,
        border: `1px solid ${primary}40 !important`,
        borderRadius: '8px',
        padding: theme.spacing(4),
        textAlign: 'center',
        boxShadow: `${DESIGN_TOKENS.shadows.elevated.light} !important`,
        transform: 'rotateY(180deg)',
        WebkitTransform: 'rotateY(180deg)',
        MozTransform: 'rotateY(180deg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: backTextColor,
        ...sx
      }}
    >
      <BackContentAnimated>
        {children}
      </BackContentAnimated>
    </Box>
  )
}



export default function About() {
  const router = useRouter()
  const pathname = usePathname()
  const isTopologyRoute = shouldShowTopology(pathname)
  const { customTheme } = useAdvancedTheme()
  const { primary, secondary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({
    who: false,
    formation: false,
    experience: false
  })

  const handleCardFlip = (cardKey: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }))
  }

  return (
    <PageWrapper backgroundVariant="alternate">
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection 
        title={<IjipopGlitchTitle text={t('about.title')} />}
        subtitle={t('about.subtitle')}
      />

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 2 }}>

        <ScrollReveal direction="up" delay={0.05}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          {/* Carte Qui suis-je */}
          <FlipCard data-testid="about-flip-card-who" onClick={() => handleCardFlip('who')}>
            <FlipCardInner 
              flipped={flippedCards.who}
              sx={{
                transform: flippedCards.who ? 'rotateY(180deg)' : 'rotateY(0deg)',
                WebkitTransform: flippedCards.who ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <FlipCardFront
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                }}
              >
                <PersonIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: primary,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  {t('about.subtitle')}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {t('home.role')}
                </Typography>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  right: 16,
                  opacity: 0.6,
                  transition: 'opacity 0.3s ease'
                }}>
                  <RotateRightIcon sx={{ 
                    fontSize: 18, 
                    color: textColor,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(180deg)'
                    }
                  }} />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.65rem',
                    opacity: 0.6,
                    color: textColor
                  }}
                >
                  {t('about.clickToFlip')}
                </Typography>
              </FlipCardFront>
              <FlipCardBack
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: textColor,
                    marginBottom: '16px', 
                    fontWeight: 600,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  Jean-François Lefebvre
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {t('about.whoCardP1')}
                </Typography>
                <Typography variant="body1" sx={{ 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {t('about.whoCardP2')}
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>

          {/* Carte Formation */}
          <FlipCard data-testid="about-flip-card-formation" onClick={() => handleCardFlip('formation')}>
            <FlipCardInner 
              flipped={flippedCards.formation}
              sx={{
                transform: flippedCards.formation ? 'rotateY(180deg)' : 'rotateY(0deg)',
                WebkitTransform: flippedCards.formation ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <FlipCardFront
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                }}
              >
                <SchoolIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: primary,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  {t('about.formation')}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {t('about.formationDesc')}
                </Typography>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  right: 16,
                  opacity: 0.6,
                  transition: 'opacity 0.3s ease'
                }}>
                  <RotateRightIcon sx={{ 
                    fontSize: 18, 
                    color: textColor,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(180deg)'
                    }
                  }} />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.65rem',
                    opacity: 0.6,
                    color: textColor
                  }}
                >
                  {t('about.clickToFlip')}
                </Typography>
              </FlipCardFront>
              <FlipCardBack
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: textColor,
                    marginBottom: '16px', 
                    fontWeight: 600,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  Formation
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 1, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {"• DEP en soutien informatique à l'ÉMICA (2023-2024)"}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 1, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {"• AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web au Cégep De Maisonneuve (2024-2026)"}
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>

          {/* Carte Expérience */}
          <FlipCard data-testid="about-flip-card-experience" onClick={() => handleCardFlip('experience')}>
            <FlipCardInner 
              flipped={flippedCards.experience}
              sx={{
                transform: flippedCards.experience ? 'rotateY(180deg)' : 'rotateY(0deg)',
                WebkitTransform: flippedCards.experience ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <FlipCardFront
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                }}
              >
                <WorkIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: primary,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  {t('about.experience')}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: textColor,
                  opacity: 0.9
                }}>
                  {t('about.experienceText')}
                </Typography>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  right: 16,
                  opacity: 0.6,
                  transition: 'opacity 0.3s ease'
                }}>
                  <RotateRightIcon sx={{ 
                    fontSize: 18, 
                    color: textColor,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(180deg)'
                    }
                  }} />
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.65rem',
                    opacity: 0.6,
                    color: textColor
                  }}
                >
                  {t('about.clickToFlip')}
                </Typography>
              </FlipCardFront>
              <FlipCardBack
                sx={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  MozBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: textColor,
                    marginBottom: '16px', 
                    fontWeight: 600,
                    textShadow: `0 2px 4px ${primary}40`
                  }}
                >
                  Expérience
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textAlign: 'center', 
                    lineHeight: 1.6, 
                    fontWeight: 600, 
                    color: textColor,
                    textShadow: `0 1px 2px ${primary}40`
                  }}
                >
                  Merci de me donner une chance de travailler avec vous !
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>
        </Box>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
        <AboutPersonalStorySection t={t} primary={primary} textColor={textColor} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
        <Box sx={{ 
          ...getCardSurfaceSx({ isTopologyRoute, variant: 'flat', level: 'soft', interactive: false }),
          borderRadius: DESIGN_TOKENS.borderRadius.large,
          padding: 4,
          textAlign: 'center',
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          ...(!isTopologyRoute && {
            background: 'var(--card-background, linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%))',
            border: '1px solid var(--card-primary, rgba(0,0,0,0.08))',
            boxShadow: '0 8px 32px var(--card-primary, rgba(0,0,0,0.1))',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, var(--card-primary, rgba(30, 58, 138, 0.1)) 0%, var(--card-secondary, rgba(5, 150, 105, 0.1)) 50%, var(--card-primary, rgba(30, 58, 138, 0.05)) 100%)`,
              opacity: 'var(--card-overlay-opacity, 0.3)',
            },
          }),
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              marginBottom: '24px',
              fontWeight: 700,
              color: primary,
              textShadow: `0 2px 4px ${primary}40`
            }}
          >
            {t('about.skills')}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: 1,
            visibility: 'visible !important',
            opacity: '1 !important',
            zIndex: DESIGN_TOKENS.zIndex.elevated,
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
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
        <SoftSkillsSection primary={primary} textColor={textColor} t={t} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.25}>
        <AboutCtaSection
          primary={primary}
          textColor={textColor}
          t={t}
          onContact={() => router.push('/portfolio/contact')}
          onProjects={() => router.push('/portfolio/projets')}
        />
        </ScrollReveal>
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
    </PageWrapper>
  )
}
