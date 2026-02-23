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
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import React from 'react'
import AppBarComponent from '../components/appBar'
import ThreeDCardComponent from '../components/ThreeDCard'
import AnimatedCounter from '../components/shared/AnimatedCounter'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import ScrollReveal from '../components/shared/ScrollReveal'
import SkillTag from '../components/shared/SkillTag'
import HeaderSection from '../components/shared/HeaderSection'
import PageWrapper from '../components/shared/PageWrapper'
import CTAButton from '../components/shared/CTAButton'
import Footer from '../components/Footer'
import { DESIGN_TOKENS, ANIMATIONS, GRADIENTS } from '../design-system/constants'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { useThemeColors } from '../hooks/useThemeColors'
import { useTextColor } from '../hooks/useTextColor'

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

// ActionButton supprimé - utiliser CTAButton à la place qui utilise useThemeColors()

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
  gridTemplateColumns: 'repeat(2, 1fr)',
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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(4),
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

// Composant pour le label du filtre
const FilterContainerLabel = () => {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
      <FilterListIcon sx={{ 
        color: primary,
        fontSize: 28,
        filter: `drop-shadow(0 0 8px ${primary}50)`,
        transition: DESIGN_TOKENS.transitions.normal,
      }} />
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700,
          color: textColor,
          fontSize: { xs: '1rem', sm: '1.125rem' },
          letterSpacing: '0.5px',
          textShadow: `0 0 10px ${primary}30`,
          transition: DESIGN_TOKENS.transitions.normal,
        }}
      >
        Filtrer par technologie:
      </Typography>
    </Box>
  )
}

// Composant pour le titre du projet : gradient sur default, couleur palette sur les autres thèmes
const ProjectTitleTypography = ({ projectName, isNonDefaultPalette = false }: { projectName: string; isNonDefaultPalette?: boolean }) => {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  
  return (
    <Typography 
      variant="h6" 
      component="h2" 
      gutterBottom
      sx={ 
        isNonDefaultPalette
          ? { fontWeight: 700, mb: 1.5, color: primary, textShadow: `0 0 12px ${primary}40` }
          : { 
              fontWeight: 700,
              mb: 1.5,
              background: `linear-gradient(45deg, ${primary}, ${secondary}, ${accent}, ${primary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease-in-out infinite',
              textShadow: `0 0 20px ${primary}40`,
              ...ANIMATIONS.gradientShift
            }
      }
    >
      {projectName}
    </Typography>
  )
}

// Composant wrapper pour un projet avec les couleurs du thème
const ProjectCardWrapper = ({ 
  project, 
  index, 
  handleProjectClick,
  getStatusIcon,
  getStatusColor,
  getImageUrl
}: { 
  project: Project
  index: number
  handleProjectClick: (url: string) => void
  getStatusIcon: (status: string) => React.ReactElement
  getStatusColor: (status: string) => "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary"
  getImageUrl: (imageUrl: string) => string
}) => {
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { themeName } = useAdvancedTheme()
  const isNonDefaultPalette = themeName !== 'default'
  
  // Palette de couleurs pour les reflets basée sur le thème
  const reflectionColors = [
    primary,
    secondary,
    accent,
    primary,
    secondary,
    accent,
    primary,
    secondary,
    accent,
    primary,
  ]
  
  const reflectionColor = reflectionColors[index % reflectionColors.length]
  
  return (
    <ScrollReveal key={project.id} direction="up" delay={0.1 * (index % 4)}>
      <ThreeDCardComponent 
        key={project.id} 
        onClick={() => handleProjectClick(project.url)}
        floatingElements={2}
      >
        {/* Logo GitHub dans le coin supérieur droit */}
        {project.url && project.url.includes('github') && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '50%',
              padding: 1.5,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              zIndex: DESIGN_TOKENS.zIndex.overlay,
              transition: DESIGN_TOKENS.transitions.normal,
              pointerEvents: 'auto',
              '&:hover': {
                transform: 'scale(1.15)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            <GitHubIcon 
              sx={{ 
                fontSize: 22, 
                color: '#000000',
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
              top: 12,
              right: 12,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '50%',
              padding: 1.5,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              zIndex: DESIGN_TOKENS.zIndex.overlay,
              transition: DESIGN_TOKENS.transitions.normal,
              pointerEvents: 'auto',
              '&:hover': {
                transform: 'scale(1.15)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            <LaunchIcon 
              sx={{ 
                fontSize: 22, 
                color: '#000000',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
              }} 
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <StatusChip
            icon={getStatusIcon(project.status)}
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
          />
          {/* Métriques du projet */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {project.createdAt && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                color: textColor,
                opacity: 0.8,
                fontSize: '0.75rem'
              }}>
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  {new Date(project.createdAt).getFullYear()}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        <ProjectTitleTypography projectName={project.name} isNonDefaultPalette={isNonDefaultPalette} />
        
        {project.imageUrl && (
          <ProjectImageContainer
            sx={isNonDefaultPalette ? {
              border: `2px solid ${primary}60`,
              borderRadius: DESIGN_TOKENS.borderRadius.small,
              boxShadow: `0 4px 20px ${primary}25, 0 0 0 1px ${primary}20`,
              '& img': { boxShadow: 'none' },
            } : undefined}
          >
            <img 
              src={getImageUrl(project.imageUrl)} 
              alt={project.name}
            />
          </ProjectImageContainer>
        )}
        
        <Typography 
          variant="body2" 
          paragraph
          sx={{ 
            lineHeight: 1.4,
            mb: 2,
            minHeight: '3rem',
            fontSize: '0.9rem',
            ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'text.secondary' }),
          }}
        >
          {project.description}
        </Typography>
        
        <TechStack sx={{
          visibility: 'visible !important',
          opacity: '1 !important',
          zIndex: 1000,
          position: 'relative',
          mb: 2
        }}>
          {project.technologies.split(',').map((tech, techIndex) => (
            <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
              {tech.trim()}
            </SkillTag>
          ))}
        </TechStack>
        
        {/* CTA pour voir le projet */}
        {project.url && (
          <CTAButton
            variant="primary"
            size="medium"
            fullWidth
            onClick={() => handleProjectClick(project.url)}
          >
            Voir le projet
          </CTAButton>
        )}
      </ThreeDCardComponent>
    </ScrollReveal>
  )
}

// Pills du filtre : style simple, un seul effet au survol
const FilterChipComponent = ({ 
  label, 
  onClick, 
  selected, 
  icon 
}: { 
  label: string
  onClick: () => void
  selected: boolean
  icon?: React.ReactElement
}) => {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  
  const borderColor = selected ? primary : `${primary}40`
  const labelColor = selected ? primary : textColor
  const bgTint = `${primary}0c`

  return (
    <Chip
      label={label}
      onClick={onClick}
      icon={icon}
      sx={{
        borderRadius: DESIGN_TOKENS.borderRadius.small,
        fontWeight: 600,
        fontSize: '0.875rem',
        padding: theme.spacing(0.5, 1.5),
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        background: `${bgTint} !important`,
        color: `${labelColor} !important`,
        border: `1px solid ${borderColor} !important`,
        boxShadow: `0 2px 6px ${primary}15`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 14px ${primary}40`,
        },
      }}
    />
  )
}

// FilterContainer comme composant fonctionnel pour réagir aux changements de thème
const FilterContainerComponent = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const [filterBackground, setFilterBackground] = useState<string>(GRADIENTS.cards.light)
  
  // Mettre à jour le background du filtre quand le thème change
  useEffect(() => {
    const updateFilterBackground = () => {
      if (typeof window === 'undefined') return
      
      // Lire les CSS variables définies par ThemeSelector
      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()
      
      if (cardBg && cardBg !== 'none') {
        setFilterBackground(cardBg)
      } else {
        // Fallback : créer un gradient avec les couleurs du thème
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
        const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
        
        if (bg && bg2) {
          setFilterBackground(`linear-gradient(145deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`)
        } else {
          setFilterBackground(GRADIENTS.cards.light)
        }
      }
    }
    
    updateFilterBackground()
    
    // Observer les changements de CSS variables
    const observer = new MutationObserver(updateFilterBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateFilterBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1.5),
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2),
        background: `${filterBackground} !important`,
        border: `2px solid ${primary}30 !important`,
        borderRadius: DESIGN_TOKENS.borderRadius.medium,
        boxShadow: `0 8px 32px ${primary}15, ${DESIGN_TOKENS.shadows.elevated.light} !important`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: DESIGN_TOKENS.transitions.normal,
        color: `${textColor} !important`,
        '& *': {
          color: 'inherit !important',
        },
        '&:hover': {
          border: `2px solid ${primary}50 !important`,
          boxShadow: `0 12px 40px ${primary}25, ${DESIGN_TOKENS.shadows.elevated.light} !important`,
        }
      }}
    >
      {children}
    </Box>
  )
}

const ProjectImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: DESIGN_TOKENS.borderRadius.small,
  marginBottom: theme.spacing(2),
  '& img': {
    transition: DESIGN_TOKENS.transitions.slow,
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
    opacity: 0,
    transition: DESIGN_TOKENS.transitions.normal,
    pointerEvents: 'none',
  },
  '&:hover::after': {
    opacity: 1,
  },
}))

export default function Projets() {
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

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

  // Extraire toutes les technologies uniques
  const getAllTechnologies = () => {
    const techSet = new Set<string>()
    projects.forEach(project => {
      project.technologies.split(',').forEach(tech => {
        techSet.add(tech.trim())
      })
    })
    return Array.from(techSet).sort()
  }

  // Filtrer les projets par technologie
  const filteredProjects = selectedTech
    ? projects.filter(project => 
        project.technologies.split(',').some(tech => tech.trim().toLowerCase() === selectedTech.toLowerCase())
      )
    : projects

  const handleTechFilter = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech)
  }

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
          <LoadingSpinner message="Chargement des projets..." />
        </Container>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper
      backgroundVariant="projects"
      particleCount={70}
      particleSpeed={0.25}
      particleColors={[primary, secondary, accent]}
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
        <ScrollReveal direction="up" delay={0.1}>
          <StatsGrid>
            <ScrollReveal direction="up" delay={0.2}>
              <ThreeDCardComponent floatingElements={2} compact>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: primary, mb: 0.5, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                    <AnimatedCounter value={projects.length} />
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Projets Totaux
                  </Typography>
                </Box>
              </ThreeDCardComponent>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <ThreeDCardComponent floatingElements={2} compact>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: primary, mb: 0.5, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                    <AnimatedCounter value={getCompletedProjects()} />
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Projets Terminés
                  </Typography>
                </Box>
              </ThreeDCardComponent>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <ThreeDCardComponent floatingElements={2} compact>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: primary, mb: 0.5, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                    <AnimatedCounter value={getInProgressProjects()} />
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    En Cours
                  </Typography>
                </Box>
              </ThreeDCardComponent>
            </ScrollReveal>
          </StatsGrid>
        </ScrollReveal>

        {/* Filtres par technologie */}
        {projects.length > 0 && (
          <ScrollReveal direction="up" delay={0.5}>
            <FilterContainerComponent>
              <FilterContainerLabel />
              <FilterChipComponent
                label="Tous"
                onClick={() => setSelectedTech(null)}
                selected={selectedTech === null}
                icon={selectedTech === null ? undefined : <ClearIcon />}
              />
              {getAllTechnologies().map((tech) => (
                <FilterChipComponent
                  key={tech}
                  label={tech}
                  onClick={() => handleTechFilter(tech)}
                  selected={selectedTech === tech}
                />
              ))}
            </FilterContainerComponent>
          </ScrollReveal>
        )}

        {/* Projects Grid */}
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCardWrapper
              key={project.id}
              project={project}
              index={index}
              handleProjectClick={handleProjectClick}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              getImageUrl={getImageUrl}
            />
          ))}
        </ProjectsGrid>
        
        {filteredProjects.length === 0 && projects.length > 0 && (
          <AnimatedBox>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
              borderRadius: DESIGN_TOKENS.borderRadius.large,
              boxShadow: DESIGN_TOKENS.shadows.elevated.light,
            }}>
              <FilterListIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Aucun projet trouvé avec cette technologie
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Essayez de sélectionner une autre technologie ou réinitialisez le filtre
              </Typography>
              <CTAButton
                variant="secondary"
                onClick={() => setSelectedTech(null)}
                startIcon={<ClearIcon />}
              >
                Réinitialiser le filtre
              </CTAButton>
            </Box>
          </AnimatedBox>
        )}

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
      
      <Footer />
    </PageWrapper>
  )
}
