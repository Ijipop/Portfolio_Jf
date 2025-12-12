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
import { useState } from 'react'
import SkillTag from '../components/shared/SkillTag'
import HeaderSection from '../components/shared/HeaderSection'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { GRADIENTS, DESIGN_TOKENS } from '../design-system/constants'
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

const FlipCardFront = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  background: theme.palette.mode === 'dark'
    ? GRADIENTS.cards.dark
    : GRADIENTS.cards.light,
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(148, 163, 184, 0.1)',
  borderRadius: DESIGN_TOKENS.borderRadius.large,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? DESIGN_TOKENS.shadows.card.dark
    : DESIGN_TOKENS.shadows.card.light,
  transition: DESIGN_TOKENS.transitions.slow,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

const FlipCardBack = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  background: `linear-gradient(145deg, var(--card-secondary, #059669) 20%, var(--card-primary, #1e3a8a) 20%, var(--card-secondary, #059669) 20%)`,
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.3)' 
    : '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: DESIGN_TOKENS.borderRadius.large,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(74, 85, 104, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 4px 20px rgba(148, 163, 184, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.08)',
  transform: 'rotateY(180deg)',
  WebkitTransform: 'rotateY(180deg)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))



export default function About() {
  const router = useRouter()
  const { customTheme } = useAdvancedTheme()
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({
    who: false,
    formation: false,
    experience: false
  })

  // Utiliser directement la couleur primaire du thème personnalisé
  const getPaletteColor = () => {
    console.log('customTheme:', customTheme)
    console.log('customTheme.primary:', customTheme.primary)
    return customTheme.primary
  }


  // Créer des styles dynamiques basés sur le thème
  const dynamicStyles = {
    titleColor: getPaletteColor(),
    titleShadow: `0 2px 4px ${getPaletteColor()}40`
  }

  const handleCardFlip = (cardKey: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }))
  }

  return (
    <PageWrapper
      backgroundVariant="alternate"
      particleCount={120}
      particleSpeed={0.4}
      particleColors={['#ff6b35', '#ff1744', '#3b82f6', '#059669']}
    >
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection 
        title="À Propos"
        subtitle="Découvrez mon parcours et mes compétences"
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
                <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  style={{ 
                    fontWeight: 'bold',
                    color: dynamicStyles.titleColor,
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Qui suis-je ?
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  Développeur passionné par la création d&apos;applications web modernes et innovantes.
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
                    color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
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
                    color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Cliquez pour retourner la carte
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
                  style={{ 
                    color: dynamicStyles.titleColor,
                    marginBottom: '16px', 
                    fontWeight: 'bold',
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Jean-François Lefebvre
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  Passionné par l'informatique et les jeux vidéo. Grand consommateur d'applications mobiles et web.
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 2, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  À 41 ans, je me suis réorienté vers le développement d'applications.  Pour ainsi réalisé mon rêve de travailler dans cette industrie.
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ 
                    textAlign: 'left', 
                    lineHeight: 1.6, 
                    fontWeight: 'bold', 
                    color: dynamicStyles.titleColor,
                    textShadow: `0 1px 2px ${dynamicStyles.titleColor}40`
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
                <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  style={{ 
                    fontWeight: 'bold',
                    color: dynamicStyles.titleColor,
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Formation
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  Formation en développement d'applications avec focus sur les technologies modernes.
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
                    color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
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
                    color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Cliquez pour retourner la carte
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
                  style={{ 
                    color: dynamicStyles.titleColor,
                    marginBottom: '16px', 
                    fontWeight: 'bold',
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Formation
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 1, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  • DEP en soutien informatique à l'ÉMICA (2023-2024)
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 1, 
                  textAlign: 'left', 
                  lineHeight: 1.6,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  • AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web (2024-2026)
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
                <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  style={{ 
                    fontWeight: 'bold',
                    color: dynamicStyles.titleColor,
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Expérience
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}>
                  En toute honnêteté, je n'ai pas d'expérience dans le développement d'applications. Je termine actuellement ma formation en développement d'applications et je suis à la recherche d'un stage pour appliquer mes connaissances.
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
                    color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
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
                    color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Cliquez pour retourner la carte
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
                  style={{ 
                    color: dynamicStyles.titleColor,
                    marginBottom: '16px', 
                    fontWeight: 'bold',
                    textShadow: dynamicStyles.titleShadow
                  }}
                >
                  Expérience
                </Typography>
                <Typography 
                  variant="body1" 
                  style={{ 
                    textAlign: 'center', 
                    lineHeight: 1.6, 
                    fontWeight: 'bold', 
                    color: dynamicStyles.titleColor,
                    textShadow: `0 1px 2px ${dynamicStyles.titleColor}40`
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
            opacity: 0.3,
          }
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            style={{ 
              marginBottom: '24px',
              fontWeight: 'bold',
              color: dynamicStyles.titleColor,
              textShadow: dynamicStyles.titleShadow
            }}
          >
            Mes Compétences Techniques
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
            style={{ 
              marginBottom: DESIGN_TOKENS.spacing.md,
              fontWeight: 'bold',
              color: dynamicStyles.titleColor,
              textShadow: dynamicStyles.titleShadow
            }}
          >
            Soft Skills
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: DESIGN_TOKENS.spacing.md,
            mt: DESIGN_TOKENS.spacing.lg
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <LightbulbIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                Créativité
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Résolution de problèmes innovante
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <GroupWorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                Collaboration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Travail d&apos;équipe efficace
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TimelineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                Adaptabilité
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Apprentissage continu
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                Qualité
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Code propre et maintenable
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
          <EmojiEventsIcon sx={{ fontSize: 64, color: 'primary.main', mb: DESIGN_TOKENS.spacing.md }} />
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              ...DESIGN_TOKENS.typography.h3,
              mb: DESIGN_TOKENS.spacing.md
            }}
          >
            Prêt à collaborer sur votre prochain projet ?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              mb: DESIGN_TOKENS.spacing.xl,
              ...DESIGN_TOKENS.typography.body1,
              fontSize: '1.125rem',
              color: customTheme.name === 'Default' ? 'text.secondary' : '#ffffff',
              textShadow: customTheme.name === 'Default' ? 'none' : '0 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            N&apos;hésitez pas à me contacter pour discuter de vos idées et voir comment nous pouvons travailler ensemble.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton 
              variant="primary"
              onClick={() => router.push('/contact')}
              size="large"
            >
              Me contacter
            </CTAButton>
            <CTAButton 
              variant="outline"
              onClick={() => router.push('/projets')}
              size="large"
            >
              Voir mes projets
            </CTAButton>
          </Box>
        </Box>
      </Container>
      
      <Footer />
    </PageWrapper>
  )
}
