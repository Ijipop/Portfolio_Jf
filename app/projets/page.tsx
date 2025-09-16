'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import AppBarComponent from '../components/appBar'

interface Project {
  id: number
  name: string
  description: string
  technologies: string
  status: string
  url: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

// Composants stylisés
const HeaderSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #059669 100%)',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
  padding: theme.spacing(8, 0, 6),
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
      : 'none',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  }
}))

const ProjectCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(74, 85, 104, 0.2)' 
    : '1px solid rgba(74, 85, 104, 0.15)',
  borderRadius: 24,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 85, 104, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 8px 32px rgba(74, 85, 104, 0.1), 0 0 0 1px rgba(74, 85, 104, 0.05)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: 'fadeInUp 0.6s ease-out',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    right: '-3px',
    bottom: '-3px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #4a5568, #2d3748, #4a5568, #2d3748)'
      : 'linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd, #60a5fa)',
    borderRadius: 27,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  // Nouveau pseudo-élément pour la chenille lumineuse
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    background: theme.palette.mode === 'dark'
      ? 'conic-gradient(from 0deg, transparent 0deg, transparent 320deg, #ff6b35 340deg, #ff1744 360deg, transparent 20deg)'
      : 'conic-gradient(from 0deg, transparent 0deg, transparent 320deg, #3b82f6 340deg, #60a5fa 360deg, transparent 20deg)',
    borderRadius: 28,
    zIndex: -2,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(74, 85, 104, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 20px 40px rgba(59, 130, 246, 0.15), 0 0 20px rgba(147, 197, 253, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    '&::before': {
      opacity: 1,
      // Chenille lumineuse qui marche sur le bord extérieur
      animation: 'rotate 2s linear infinite',
    },
    '&::after': {
      opacity: 1,
    }
  },
  // Animation de rotation pour le serpent lumineux
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}))

const StatusChip = styled(Chip)(({ theme, color }: any) => ({
  borderRadius: 20,
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  }
}))

const ActionButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
  borderRadius: 12,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 15px rgba(59, 130, 246, 0.4)'
    : '0 4px 15px rgba(30, 58, 138, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #2563eb 0%, #059669 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #047857 100%)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(59, 130, 246, 0.6)'
      : '0 8px 25px rgba(30, 58, 138, 0.6)',
  },
  '&:disabled': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #404040 0%, #303030 100%)'
      : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
    color: theme.palette.mode === 'dark' ? '#888888' : '#757575',
    boxShadow: 'none',
  }
}))

const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))

const TechTag = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  color: 'white',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 20,
  fontSize: '0.75rem',
  fontWeight: 500,
  boxShadow: '0 2px 8px rgba(240, 147, 251, 0.3)',
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  color: 'white',
  padding: theme.spacing(3),
  borderRadius: 16,
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)'
    : '0 8px 32px rgba(30, 58, 138, 0.2), 0 0 0 1px rgba(30, 58, 138, 0.1)',
  animation: 'fadeIn 0.6s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
}))

const AnimatedBox = styled(Box)({
  animation: 'fadeIn 0.6s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
})

const ProjectsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  }
}))

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
}))

export default function Projets() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.data)
      } else {
        setError('Erreur lors du chargement des projets')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminee':
      case 'fini':
      case 'terminé':
        return 'success'
      case 'wip':
      case 'en cours':
      case 'en cours de développement':
        return 'warning'
      case 'planifiee':
      case 'planifié':
      case 'planifiée':
        return 'info'
      case 'non':
      case 'non défini':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminee':
      case 'fini':
      case 'terminé':
        return <CheckCircleIcon />
      case 'wip':
      case 'en cours':
      case 'en cours de développement':
        return <TrendingUpIcon />
      case 'planifiee':
      case 'planifié':
      case 'planifiée':
        return <ScheduleIcon />
      case 'non':
      case 'non défini':
        return <ErrorIcon />
      default:
        return <CodeIcon />
    }
  }

  const handleProjectClick = (url: string) => {
    if (url && url.trim() !== '') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // Fonction pour corriger les chemins d'images
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    
    // Si c'est une URL complète (http/https), la retourner telle quelle
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si c'est un chemin relatif commençant par "public/", le corriger
    if (imageUrl.startsWith('public/')) {
      return imageUrl.replace('public/', '/');
    }
    
    // Si c'est un chemin relatif sans "public/", ajouter "/"
    if (!imageUrl.startsWith('/')) {
      return `/${imageUrl}`;
    }
    
    return imageUrl;
  };

  const getCompletedProjects = () => projects.filter(p => 
    ['terminee', 'fini', 'terminé'].includes(p.status.toLowerCase())
  ).length

  const getInProgressProjects = () => projects.filter(p => 
    ['wip', 'en cours', 'en cours de développement'].includes(p.status.toLowerCase())
  ).length

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <AppBarComponent />
        <Container sx={{ 
          mt: 4, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ 
              color: (theme) => theme.palette.mode === 'dark' ? '#4a90e2' : '#667eea', 
              mb: 2 
            }} />
            <Typography variant="h6" color="text.secondary">
              Chargement des projets...
            </Typography>
          </Box>
        </Container>
      </Box>
    )
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
      
      {/* Hero Section */}
      <HeaderSection>
        <Container maxWidth="lg">
          <AnimatedBox>
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
              Mes Projets
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
              Découvrez mes réalisations et explorations technologiques
            </Typography>
          </AnimatedBox>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {error && (
          <AnimatedBox>
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          </AnimatedBox>
        )}

        {/* Stats Section */}
        <AnimatedBox>
          <StatsGrid>
            <StatsCard>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {projects.length}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Projets Totaux
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {getCompletedProjects()}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Projets Terminés
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {getInProgressProjects()}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                En Cours
              </Typography>
            </StatsCard>
          </StatsGrid>
        </AnimatedBox>

        {/* Projects Grid */}
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} sx={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StatusChip
                    icon={getStatusIcon(project.status)}
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="medium"
                  />
                </Box>
                
                                 <Typography 
                   variant="h5" 
                   component="h2" 
                   gutterBottom
                   sx={{ 
                     fontWeight: 700,
                     color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50',
                     mb: 2
                   }}
                 >
                  {project.name}
                </Typography>
                
                {project.imageUrl && (
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <img 
                      src={getImageUrl(project.imageUrl)} 
                      alt={project.name}
                      style={{ 
                        width: '400px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>
                )}
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    lineHeight: 1.6,
                    mb: 3,
                    minHeight: '4.5rem'
                  }}
                >
                  {project.description}
                </Typography>
                
                <TechStack>
                  {project.technologies.split(',').map((tech, techIndex) => (
                    <TechTag key={techIndex}>
                      {tech.trim()}
                    </TechTag>
                  ))}
                </TechStack>
              </CardContent>
              
              <CardActions sx={{ p: 4, pt: 0 }}>
                <ActionButton
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => handleProjectClick(project.url)}
                  disabled={!project.url || project.url.trim() === ''}
                  startIcon={project.url?.includes('github') ? <GitHubIcon /> : <LaunchIcon />}
                >
                  {project.url && project.url.trim() !== '' 
                    ? 'Voir le projet' 
                    : 'Lien non disponible'
                  }
                </ActionButton>
              </CardActions>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        {projects.length === 0 && !error && (
          <AnimatedBox>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <CodeIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Aucun projet disponible
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Mes projets apparaîtront ici bientôt !
              </Typography>
            </Box>
          </AnimatedBox>
        )}
      </Container>
    </Box>
  )
}
