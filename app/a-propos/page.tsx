'use client'

import AppBarComponent from '../components/appBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const HeaderSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #059669 100%)',
  color: 'white',
  padding: theme.spacing(12, 0, 8),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 23, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)'
      : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.03) 50%, transparent 70%)'
      : 'linear-gradient(45deg, transparent 30%, rgba(30, 58, 138, 0.05) 50%, transparent 70%)',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  '@keyframes pulse': {
    '0%': { opacity: 0.3, transform: 'scale(0.95)' },
    '100%': { opacity: 0.6, transform: 'scale(1.05)' },
  }
}))

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
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #fafbfc 30%, #f1f5f9 70%, #e2e8f0 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(148, 163, 184, 0.1)',
  borderRadius: 24,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 85, 104, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 4px 20px rgba(148, 163, 184, 0.08), 0 0 0 1px rgba(148, 163, 184, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(74, 85, 104, 0.1) 0%, rgba(45, 55, 72, 0.1) 50%, rgba(74, 85, 104, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 50%, rgba(59, 130, 246, 0.02) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #4a5568, #2d3748, #4a5568, #2d3748)'
      : 'linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd, #60a5fa)',
    borderRadius: 26,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    }
  }
}))

const FlipCardBack = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)'
    : 'linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.3)' 
    : '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: 24,
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

const SkillTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 20,
  fontSize: '0.875rem',
  fontWeight: 500,
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 8px rgba(102, 126, 234, 0.3)'
    : '0 2px 8px rgba(79, 70, 229, 0.3)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 16px rgba(102, 126, 234, 0.4)'
      : '0 4px 16px rgba(79, 70, 229, 0.4)',
  }
}))

export default function About() {
  const router = useRouter()
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
    <Box sx={{ 
      minHeight: '100vh', 
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 23, 68, 0.05) 0%, transparent 50%)'
          : 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }
    }}>
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '4.5rem' },
              textShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 0 20px rgba(255, 107, 53, 0.5), 0 4px 8px rgba(0,0,0,0.8)'
                : '0 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #ff6b35, #ffffff, #ff1744)'
                : 'inherit',
              backgroundClip: (theme) => theme.palette.mode === 'dark' ? 'text' : 'initial',
              WebkitBackgroundClip: (theme) => theme.palette.mode === 'dark' ? 'text' : 'initial',
              WebkitTextFillColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
            }}
          >
            À Propos
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Découvrez mon parcours et mes compétences
          </Typography>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>

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
                <Typography variant="h5" gutterBottom>
                  Qui suis-je ?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Développeur passionné par la création d&apos;applications web modernes et innovantes.
                </Typography>
                <Box>
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
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 'bold' }}>
                  Jean-François Lefebvre
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', lineHeight: 1.6 }}>
                  Passionné par l'informatique et les jeux vidéo. Grand consommateur d'applications mobiles et web.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left', lineHeight: 1.6 }}>
                  À 38 ans, suite à des problèmes de santé, je me suis réorienté vers le développement d'applications.
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left', lineHeight: 1.6, fontWeight: 'bold', color: 'primary.main' }}>
                  Motivé et heureux de pouvoir enfin jumeler passion et travail !
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cliquez pour retourner la carte
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
                <Typography variant="h5" gutterBottom>
                  Formation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Formation en développement d'applications avec focus sur les technologies modernes.
                </Typography>
                <Box>
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
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 'bold' }}>
                  Formation
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, textAlign: 'left', lineHeight: 1.6 }}>
                  • DEP en soutien informatique à l'ÉMICA (2023-2024)
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, textAlign: 'left', lineHeight: 1.6 }}>
                  • AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web (2024-2026)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cliquez pour retourner la carte
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
                <Typography variant="h5" gutterBottom>
                  Expérience
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  En toute honnêteté, je n'ai pas d'expérience dans le développement d'applications. Je termine actuellement ma formation en développement d'applications et je suis à la recherche d'un stage pour appliquer mes connaissances.
                </Typography>
                <Box>
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
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 'bold' }}>
                  Expérience
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', lineHeight: 1.6, fontWeight: 'bold', color: 'primary.main' }}>
                  Merci de me donner une chance de travailler avec vous !
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cliquez pour retourner la carte
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>
        </Box>

        <Box sx={{ 
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          border: (theme) => theme.palette.mode === 'dark' 
            ? '2px solid rgba(255, 107, 53, 0.3)' 
            : '1px solid rgba(0,0,0,0.08)',
          borderRadius: 24,
          padding: 4,
          textAlign: 'center',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(0,0,0,0.1)',
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
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 23, 68, 0.1) 50%, rgba(255, 107, 53, 0.05) 100%)'
              : 'transparent',
            opacity: 0.3,
          }
        }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Mes Compétences Techniques
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: 1
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

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <EmojiEventsIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Prêt à collaborer sur votre prochain projet ?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            N&apos;hésitez pas à me contacter pour discuter de vos idées et voir comment nous pouvons travailler ensemble.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
