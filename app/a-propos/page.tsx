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
import { useRouter } from 'next/navigation'

const AboutCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255,255,255,0.1)' 
    : '1px solid rgba(0,0,0,0.08)',
  borderRadius: 20,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0,0,0,0.3)'
    : '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(0,0,0,0.4)'
      : '0 20px 40px rgba(0,0,0,0.15)',
  }
}))

const SkillTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 20,
  fontSize: '0.875rem',
  fontWeight: 500,
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  }
}))

export default function About() {
  const router = useRouter()

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <AppBarComponent />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            À Propos
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.8,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Découvrez mon parcours et mes compétences
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          <AboutCard>
            <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Qui suis-je ?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Développeur passionné par la création d&apos;applications web modernes et innovantes.
            </Typography>
            <Box>
              <SkillTag>React</SkillTag>
              <SkillTag>Next.js</SkillTag>
              <SkillTag>TypeScript</SkillTag>
              <SkillTag>Node.js</SkillTag>
            </Box>
          </AboutCard>

          <AboutCard>
            <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Formation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Formation en développement web avec focus sur les technologies modernes.
            </Typography>
            <Box>
              <SkillTag>JavaScript</SkillTag>
              <SkillTag>HTML/CSS</SkillTag>
              <SkillTag>Git</SkillTag>
              <SkillTag>API REST</SkillTag>
            </Box>
          </AboutCard>

          <AboutCard>
            <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Expérience
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Quelques années d&apos;expérience dans le développement d&apos;applications.
            </Typography>
            <Box>
              <SkillTag>Full Stack</SkillTag>
              <SkillTag>Frontend</SkillTag>
              <SkillTag>Backend</SkillTag>
              <SkillTag>Database</SkillTag>
            </Box>
          </AboutCard>
        </Box>

        <Box sx={{ 
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          border: (theme) => theme.palette.mode === 'dark' 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(0,0,0,0.08)',
          borderRadius: 20,
          padding: 4,
          textAlign: 'center',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.1)',
          mb: 8
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
            <SkillTag>React</SkillTag>
            <SkillTag>Next.js</SkillTag>
            <SkillTag>TypeScript</SkillTag>
            <SkillTag>JavaScript</SkillTag>
            <SkillTag>Node.js</SkillTag>
            <SkillTag>Express</SkillTag>
            <SkillTag>MongoDB</SkillTag>
            <SkillTag>PostgreSQL</SkillTag>
            <SkillTag>Prisma</SkillTag>
            <SkillTag>Material-UI</SkillTag>
            <SkillTag>CSS3</SkillTag>
            <SkillTag>HTML5</SkillTag>
            <SkillTag>Git</SkillTag>
            <SkillTag>REST API</SkillTag>
            <SkillTag>GraphQL</SkillTag>
            <SkillTag>Docker</SkillTag>
            <SkillTag>Vercel</SkillTag>
            <SkillTag>Netlify</SkillTag>
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
