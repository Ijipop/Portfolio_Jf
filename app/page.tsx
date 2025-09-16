'use client'

import AppBarComponent from './components/appBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Home'
import CodeIcon from '@mui/icons-material/Code'
import PersonIcon from '@mui/icons-material/Person'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import { useRouter } from 'next/navigation'

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
  }
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(255, 107, 53, 0.3)' 
    : '1px solid rgba(30, 58, 138, 0.1)',
  borderRadius: 24,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 10px 40px rgba(30, 58, 138, 0.1), 0 0 0 1px rgba(30, 58, 138, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  cursor: 'pointer',
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
      ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 23, 68, 0.1) 50%, rgba(255, 107, 53, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(30, 58, 138, 0.03) 0%, rgba(5, 150, 105, 0.03) 100%)',
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
      ? 'linear-gradient(45deg, #ff6b35, #ff1744, #ff6b35, #ff1744)'
      : 'transparent',
    borderRadius: 26,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 25px 50px rgba(30, 58, 138, 0.15), 0 0 0 1px rgba(30, 58, 138, 0.1)',
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    }
  }
}))

export default function Home() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
      
      <HeaderSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
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
            Portfolio Web
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
            Développeur Full Stack passionné par les technologies modernes
          </Typography>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            Bienvenue sur mon portfolio
            JEAN-FRANÇOIS LEFEBVRE
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explorez mes projets, découvrez mon parcours et n&apos;hésitez pas à me contacter pour collaborer sur vos idées.
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          <FeatureCard onClick={() => handleCardClick('/projets')}>
            <CodeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Mes Projets
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Découvrez mes réalisations et explorations technologiques
            </Typography>
          </FeatureCard>

          <FeatureCard onClick={() => handleCardClick('/a-propos')}>
            <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              À Propos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              En savoir plus sur mon parcours et mes compétences
            </Typography>
          </FeatureCard>

          <FeatureCard onClick={() => handleCardClick('/contact')}>
            <ContactSupportIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Prenons contact et discutons de vos projets
            </Typography>
          </FeatureCard>
        </Box>
      </Container>
    </Box>
  )
}
