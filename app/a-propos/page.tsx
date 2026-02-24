'use client'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PersonIcon from '@mui/icons-material/Person'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import SkillTag from '../components/shared/SkillTag'
import HeaderSection from '../components/shared/HeaderSection'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { GRADIENTS, DESIGN_TOKENS } from '../design-system/constants'
import { useThemeColors } from '../hooks/useThemeColors'
import { useTextColor } from '../hooks/useTextColor'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '@mui/material/styles'
import { getTextColorForBackground } from '../utils/colorUtils'
import TimelineIcon from '@mui/icons-material/Timeline'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import GroupWorkIcon from '@mui/icons-material/GroupWork'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

// FlipCard components spécifiques à cette page (logique complexe)
const FlipCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  height: '400px',
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

const FlipCardInner = styled(Box)<{ flipped: boolean }>(({ theme, flipped }) => ({
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
// En thème default : même rendu que les cartes Contact (blanc, bordure légère, ombre)
const FlipCardFront = ({ children, sx }: { children: React.ReactNode; sx?: any }) => {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const { themeName } = useAdvancedTheme()
  const [cardBackground, setCardBackground] = useState<string>(GRADIENTS.cards.light)
  const isDefaultTheme = themeName === 'default'

  useEffect(() => {
    if (isDefaultTheme) return
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
  }, [isDefaultTheme])

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        ...(isDefaultTheme
          ? {
              background: '#ffffff !important',
              border: '1px solid rgba(0,0,0,0.08) !important',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08) !important',
            }
          : {
              background: `${cardBackground} !important`,
              border: `1px solid ${primary}30 !important`,
              boxShadow: `0 8px 32px ${primary}15, ${DESIGN_TOKENS.shadows.elevated.light} !important`,
            }),
        borderRadius: '8px',
        padding: theme.spacing(4),
        textAlign: 'center',
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

// Composant FlipCardBack : en thème default même style que Contact (fond clair, bordure légère)
const FlipCardBack = ({ children, sx }: { children: React.ReactNode; sx?: any }) => {
  const theme = useTheme()
  const { themeName } = useAdvancedTheme()
  const { primary, secondary } = useThemeColors()
  const isDefaultTheme = themeName === 'default'
  const backGradient = isDefaultTheme
    ? undefined
    : `linear-gradient(135deg, ${primary} 0%, ${secondary} 50%, ${primary} 100%)`
  const backTextColor = isDefaultTheme ? '#334155' : getTextColorForBackground(backGradient ?? '')

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        ...(isDefaultTheme
          ? {
              background: '#f8fafc !important',
              border: '1px solid rgba(0,0,0,0.08) !important',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08) !important',
              color: backTextColor,
            }
          : {
              background: `${backGradient} !important`,
              border: `1px solid ${primary}40 !important`,
              boxShadow: `0 8px 32px ${primary}30, ${DESIGN_TOKENS.shadows.elevated.light} !important`,
              color: backTextColor,
            }),
        borderRadius: '8px',
        padding: theme.spacing(4),
        textAlign: 'center',
        transform: 'rotateY(180deg)',
        WebkitTransform: 'rotateY(180deg)',
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



export default function About() {
  const router = useRouter()
  const { customTheme } = useAdvancedTheme()
  const { primary, secondary, accent } = useThemeColors()
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
    <PageWrapper
      backgroundVariant="alternate"
      particleCount={60}
      particleSpeed={0.25}
      particleColors={[primary, secondary, accent]}
    >
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection 
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 2 }}>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          {/* Carte Qui suis-je */}
          <FlipCard onClick={() => handleCardFlip('who')}>
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
                    fontWeight: 'bold',
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
                  {t('home.intro')}
                </Typography>
                <Box sx={{ 
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: 1000,
                  position: 'relative',
                  // Cacher les tags sur mobile quand la carte est retournée
                  display: { xs: flippedCards.who ? 'none' : 'flex', sm: 'flex' },
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <SkillTag>Material-UI</SkillTag>
                  <SkillTag>Prisma</SkillTag>
                  <SkillTag>PostgreSQL</SkillTag>
                  <SkillTag>Vercel</SkillTag>
                </Box>
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
                    fontWeight: 'bold',
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
                  Passionné par l'informatique et les jeux vidéo. Grand consommateur d'applications mobiles et web.
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  À 41 ans, je me suis réorienté vers le développement d'applications.  Pour ainsi réalisé mon rêve de travailler dans cette industrie.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textAlign: 'left', 
                    lineHeight: 1.6, 
                    fontWeight: 'bold', 
                    color: textColor,
                    textShadow: `0 1px 2px ${primary}40`
                  }}
                >
                  Motivé et heureux de pouvoir enfin jumeler passion et travail !
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>

          {/* Carte Formation */}
          <FlipCard onClick={() => handleCardFlip('formation')}>
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
                    fontWeight: 'bold',
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
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: 1000,
                  position: 'relative',
                  // Cacher les tags sur mobile quand la carte est retournée
                  display: { xs: flippedCards.formation ? 'none' : 'flex', sm: 'flex' },
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <SkillTag>Responsive Design</SkillTag>
                  <SkillTag>GitHub</SkillTag>
                  <SkillTag>JSON</SkillTag>
                </Box>
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
                    fontWeight: 'bold',
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
                  • DEP en soutien informatique à l'ÉMICA (2023-2024)
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 1, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: textColor,
                  opacity: 0.9
                }}>
                  • AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web au Cégep De Maisonneuve (2024-2026)
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>

          {/* Carte Expérience */}
          <FlipCard onClick={() => handleCardFlip('experience')}>
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
                    fontWeight: 'bold',
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
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: 1000,
                  position: 'relative',
                  // Cacher les tags sur mobile quand la carte est retournée
                  display: { xs: flippedCards.experience ? 'none' : 'flex', sm: 'flex' },
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <SkillTag>MVC</SkillTag>
                  <SkillTag>CRUD</SkillTag>
                  <SkillTag>REST API</SkillTag>
                </Box>
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
                    fontWeight: 'bold',
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
                    fontWeight: 'bold', 
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

        <Box sx={{ 
          background: 'var(--card-background, linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%))',
          border: '1px solid var(--card-primary, rgba(0,0,0,0.08))',
          borderRadius: DESIGN_TOKENS.borderRadius.large,
          padding: 4,
          textAlign: 'center',
          boxShadow: '0 8px 32px var(--card-primary, rgba(0,0,0,0.1))',
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, var(--card-primary, rgba(30, 58, 138, 0.1)) 0%, var(--card-secondary, rgba(5, 150, 105, 0.1)) 50%, var(--card-primary, rgba(30, 58, 138, 0.05)) 100%)`,
            opacity: 'var(--card-overlay-opacity, 0.3)',
          }
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              marginBottom: '24px',
              fontWeight: 'bold',
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

        {/* Section Soft Skills */}
        <Box sx={{ 
          background: 'var(--card-background, linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%))',
          border: '1px solid var(--card-primary, rgba(0,0,0,0.08))',
          borderRadius: DESIGN_TOKENS.borderRadius.large,
          padding: DESIGN_TOKENS.spacing.xl,
          textAlign: 'center',
          boxShadow: '0 8px 32px var(--card-primary, rgba(0,0,0,0.1))',
          mb: DESIGN_TOKENS.spacing.xxl,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              marginBottom: DESIGN_TOKENS.spacing.md,
              fontWeight: 'bold',
              color: primary,
              textShadow: `0 2px 4px ${primary}40`
            }}
          >
            {t('about.softSkills')}
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: DESIGN_TOKENS.spacing.md,
            mt: DESIGN_TOKENS.spacing.lg
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <LightbulbIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
                {t('about.creativity')}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                {t('about.creativityDesc')}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <GroupWorkIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
                {t('about.collaboration')}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                {t('about.collaborationDesc')}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TimelineIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
                {t('about.adaptability')}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                {t('about.adaptabilityDesc')}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <AutoAwesomeIcon sx={{ fontSize: 48, color: primary, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: textColor }}>
                {t('about.quality')}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
                {t('about.qualityDesc')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Section CTA */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: DESIGN_TOKENS.spacing.xxl,
          mb: DESIGN_TOKENS.spacing.xl
        }}>
          <EmojiEventsIcon sx={{ fontSize: 64, color: primary, mb: DESIGN_TOKENS.spacing.md }} />
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              ...DESIGN_TOKENS.typography.h3,
              mb: DESIGN_TOKENS.spacing.md,
              color: textColor
            }}
          >
            {t('about.ctaTitle')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              mb: DESIGN_TOKENS.spacing.xl,
              ...DESIGN_TOKENS.typography.body1,
              fontSize: '1.125rem',
              color: textColor,
              opacity: 0.9
            }}
          >
            {t('about.ctaText')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton 
              variant="primary"
              onClick={() => router.push('/contact')}
              size="large"
            >
              {t('about.contactCTA')}
            </CTAButton>
            <CTAButton 
              variant="outline"
              onClick={() => router.push('/projets')}
              size="large"
            >
              {t('home.seeProjects')}
            </CTAButton>
          </Box>
        </Box>
      </Container>
      
      <Footer />
    </PageWrapper>
  )
}
