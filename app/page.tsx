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
import { DESIGN_TOKENS } from './design-system/constants'

export default function Home() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <PageWrapper
      backgroundVariant="default"
      particleCount={150}
      particleSpeed={0.3}
      particleColors={['#ff6b35', '#ff1744', '#3b82f6', '#059669', '#ffffff']}
    >
      <AppBarComponent />
      
      <HeaderSection 
        title={
          <LetterAnimations>
            Portfolio Web
          </LetterAnimations>
        }
        subtitle={
          <TypingEffect 
            text="Développeur Full Stack | React • Next.js • TypeScript"
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
            Voir mes projets
          </CTAButton>
          <CTAButton 
            variant="outline"
            onClick={() => router.push('/contact')}
            size="large"
          >
            Me contacter
          </CTAButton>
        </Box>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
        <GlassContainer sx={{ mb: { xs: 4, md: 6 } }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                mb: { xs: 2, md: 3 },
                fontWeight: 900,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                textShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 23, 68, 0.4), 0 4px 8px rgba(0,0,0,0.8)'
                  : '0 0 20px var(--primary-color, rgba(30, 58, 138, 0.4)), 0 0 40px var(--secondary-color, rgba(59, 130, 246, 0.3)), 0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: (theme) => theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #ff6b35, #ffffff, #ff1744, #ff6b35)'
                  : 'linear-gradient(45deg, var(--primary-color, #1e3a8a), var(--secondary-color, #3b82f6), var(--primary-color, #059669), var(--primary-color, #1e3a8a))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease-in-out infinite',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 23, 68, 0.1))'
                    : 'linear-gradient(45deg, var(--primary-color, rgba(30, 58, 138, 0.1)), var(--secondary-color, rgba(59, 130, 246, 0.1))',
                  borderRadius: '20px',
                  filter: 'blur(20px)',
                  zIndex: -1,
                  animation: 'pulse 2s ease-in-out infinite alternate',
                }
              }}
            >
              JEAN-FRANÇOIS LEFEBVRE
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 300, opacity: 0.8 }}>
              Bienvenue sur mon portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Explorez mes projets, découvrez mon parcours et n&apos;hésitez pas à me contacter pour collaborer sur vos idées.
            </Typography>
          </Box>
        </GlassContainer>

        {/* Section Compétences */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, rgba(26, 26, 26, 0.8) 0%, rgba(45, 45, 45, 0.8) 100%)'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
            border: (theme) => theme.palette.mode === 'dark' 
              ? '1px solid rgba(74, 85, 104, 0.3)' 
              : '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: { xs: 16, md: 24 },
            padding: { xs: 2, md: 4 },
            textAlign: 'center',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
          }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                marginBottom: '24px',
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              Technologies & Compétences
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
        </Container>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 4 },
          mb: { xs: 4, md: 8 },
          px: { xs: 1, sm: 0 }
        }}>
          <FadeIn delay={0.8}>
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/projets')} floatingElements={2}>
            <CodeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Mes Projets
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Découvrez mes réalisations et explorations technologiques
            </Typography>
          </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>

          <FadeIn delay={1.0}>
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/a-propos')} floatingElements={3}>
                <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  À Propos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  En savoir plus sur mon parcours et mes compétences
                </Typography>
              </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>

          <FadeIn delay={1.2}>
            <HoverScale>
              <ThreeDCardComponent onClick={() => handleCardClick('/contact')} floatingElements={2}>
                <ContactSupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Prenons contact et discutons de vos projets
                </Typography>
              </ThreeDCardComponent>
            </HoverScale>
          </FadeIn>
        </Box>
      </Container>
    </PageWrapper>
  )
}
