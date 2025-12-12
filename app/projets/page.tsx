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
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import AppBarComponent from '../components/appBar'
import ProjectCard from '../components/shared/ProjectCard'
import StatsCard from '../components/shared/StatsCard'
import { StatsValueTypography, StatsLabelTypography } from '../components/shared/StatsTypography'
import SkillTag from '../components/shared/SkillTag'
import HeaderSection from '../components/shared/HeaderSection'
import PageWrapper from '../components/shared/PageWrapper'
import { DESIGN_TOKENS, ANIMATIONS } from '../design-system/constants'

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

const StatusChip = styled(Chip)(({ theme, color }: any) => ({
  borderRadius: DESIGN_TOKENS.borderRadius.medium,
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
  borderRadius: DESIGN_TOKENS.borderRadius.small,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 15px rgba(59, 130, 246, 0.4)'
    : '0 4px 15px rgba(30, 58, 138, 0.4)',
  transition: DESIGN_TOKENS.transitions.normal,
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
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
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
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
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
      <PageWrapper backgroundVariant="default" showParticles={false}>
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
      </PageWrapper>
    )
  }

  return (
    <PageWrapper
      backgroundVariant="projects"
      particleCount={200}
      particleSpeed={0.2}
      particleColors={['#ff6b35', '#ff1744', '#3b82f6', '#059669']}
      overlayVariant="light"
      overflowX="hidden"
      overflowY="auto"
    >
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection 
        title="Mes Projets"
        subtitle="Découvrez mes réalisations et explorations technologiques"
      />

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 2 }}>
        {error && (
          <AnimatedBox>
            <Alert severity="error" sx={{ mb: 4, borderRadius: DESIGN_TOKENS.borderRadius.small }}>
              {error}
            </Alert>
          </AnimatedBox>
        )}

        {/* Stats Section */}
        <AnimatedBox>
          <StatsGrid>
            <StatsCard>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <StatsValueTypography variant="h3">
                  {projects.length}
                </StatsValueTypography>
                <StatsLabelTypography variant="body1">
                  Projets Totaux
                </StatsLabelTypography>
              </Box>
            </StatsCard>
            <StatsCard>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <StatsValueTypography variant="h3">
                  {getCompletedProjects()}
                </StatsValueTypography>
                <StatsLabelTypography variant="body1">
                  Projets Terminés
                </StatsLabelTypography>
              </Box>
            </StatsCard>
            <StatsCard>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <StatsValueTypography variant="h3">
                  {getInProgressProjects()}
                </StatsValueTypography>
                <StatsLabelTypography variant="body1">
                  En Cours
                </StatsLabelTypography>
              </Box>
            </StatsCard>
          </StatsGrid>
        </AnimatedBox>

        {/* Projects Grid */}
        <ProjectsGrid>
          {projects.map((project, index) => {
            // Palette de couleurs pour les reflets
            const reflectionColors = [
              '#ff6b35', // Orange
              '#3b82f6', // Bleu
              '#059669', // Vert
              '#8b5cf6', // Violet
              '#ec4899', // Rose
              '#f59e0b', // Jaune
              '#ef4444', // Rouge
              '#06b6d4', // Cyan
              '#84cc16', // Lime
              '#f97316', // Orange vif
            ]
            
            const reflectionColor = reflectionColors[index % reflectionColors.length]
            
            return (
              <ProjectCard 
                key={project.id} 
                onClick={() => handleProjectClick(project.url)}
                reflectionColor={reflectionColor}
              >
              {/* Logo GitHub dans le coin supérieur droit */}
                {project.url && project.url.includes('github') && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      padding: 1,
                      boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.1)',
                      zIndex: 3,
                      transition: DESIGN_TOKENS.transitions.normal,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 6px 20px rgba(0, 0, 0, 0.4)'
                          : '0 6px 20px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <GitHubIcon 
                      sx={{ 
                        fontSize: 20, 
                        color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                      }} 
                    />
                  </Box>
                )}

                {/* Icône générique pour autres liens */}
                {project.url && !project.url.includes('github') && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      padding: 1,
                      boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: (theme) => theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(0, 0, 0, 0.1)',
                      zIndex: 3,
                      transition: DESIGN_TOKENS.transitions.normal,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                          ? '0 6px 20px rgba(0, 0, 0, 0.4)'
                          : '0 6px 20px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    <LaunchIcon 
                      sx={{ 
                        fontSize: 20, 
                        color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                      }} 
                    />
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <StatusChip
                    icon={getStatusIcon(project.status)}
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </Box>
                
                                 <Typography 
                   variant="h6" 
                   component="h2" 
                   gutterBottom
                   sx={{ 
                     fontWeight: 700,
                     mb: 1.5,
                     background: (theme) => theme.palette.mode === 'dark'
                       ? 'linear-gradient(45deg, #ff6b35, #ffffff, #ff1744, #ff6b35)'
                       : 'linear-gradient(45deg, #1e3a8a, #3b82f6, #059669, #1e3a8a)',
                     backgroundClip: 'text',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundSize: '200% 200%',
                     animation: 'gradientShift 3s ease-in-out infinite',
                     textShadow: (theme) => theme.palette.mode === 'dark'
                       ? '0 0 20px rgba(255, 107, 53, 0.5)'
                       : '0 0 20px rgba(30, 58, 138, 0.4)',
                     ...ANIMATIONS.gradientShift
                   }}
                 >
                  {project.name}
                </Typography>
                
                {project.imageUrl && (
                  <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <img 
                      src={getImageUrl(project.imageUrl)} 
                      alt={project.name}
                      style={{ 
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: DESIGN_TOKENS.borderRadius.small,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  </Box>
                )}
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    lineHeight: 1.4,
                    mb: 2,
                    minHeight: '3rem',
                    fontSize: '0.9rem'
                  }}
                >
                  {project.description}
                </Typography>
                
                <TechStack sx={{
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: 1000,
                  position: 'relative'
                }}>
                  {project.technologies.split(',').map((tech, techIndex) => (
                    <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
                      {tech.trim()}
                    </SkillTag>
                  ))}
                </TechStack>
              </ProjectCard>
            )
          })}
        </ProjectsGrid>
        
        {projects.length === 0 && !error && (
          <AnimatedBox>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'white',
              borderRadius: DESIGN_TOKENS.borderRadius.small,
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
    </PageWrapper>
  )
}
