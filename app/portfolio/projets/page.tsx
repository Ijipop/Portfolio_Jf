'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import DownloadIcon from '@mui/icons-material/Download'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { navigateProjectUrl } from '@/lib/navigateProjectUrl'
import React from 'react'
import Image from 'next/image'
import AppBarComponent from '../../components/appBar'
import ThreeDCardComponent from '../../components/ThreeDCard'
import AnimatedCounter from '../../components/shared/AnimatedCounter'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ScrollReveal from '../../components/shared/ScrollReveal'
import SkillTag from '../../components/shared/SkillTag'
import HeaderSection from '../../components/shared/HeaderSection'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import CTAButton from '../../components/shared/CTAButton'
import Footer from '../../components/Footer'
import { DESIGN_TOKENS, ANIMATIONS, GRADIENTS } from '../../design-system/constants'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import FilterContainerLabel from './components/FilterContainerLabel'
import FilterChipComponent from './components/FilterChipComponent'

interface Project {
  id: number
  name: string
  description: string
  technologies: string
  status: string
  projectType?: 'logiciel' | 'web'
  displayOrder?: number
  url: string
  siteUrl?: string | null
  downloadUrl?: string | null
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

type TimelendarPlatform = 'windows' | 'macos' | 'both'

interface TimelendarRelease {
  filePath: string
  platform?: TimelendarPlatform
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

// Technologies prioritaires pour le filtre (ordre d'affichage, max ~12)
const PRIORITY_TECHS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
  'Tailwind CSS', 'Material-UI', 'PostgreSQL', 'Prisma', 'Vite',
  'Supabase', 'Stripe', 'Clerk', 'HTML', 'CSS', 'Python',
]
const MAX_FILTER_TECHS = 10

// Normaliser un nom de tech (variantes → canonique)
function normalizeTechName(raw: string): string {
  const t = raw.trim()
  const map: Record<string, string> = {
    'typescript': 'TypeScript', 'type script': 'TypeScript',
    'nextjs': 'Next.js', 'next.js': 'Next.js',
    'material-ui': 'Material-UI', 'material ui': 'Material-UI', 'mui': 'Material-UI',
    'tailwind': 'Tailwind CSS', 'tailwind css': 'Tailwind CSS',
    'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
    'javascript': 'JavaScript', 'js': 'JavaScript',
    'nodejs': 'Node.js', 'node.js': 'Node.js',
    'html5': 'HTML', 'html': 'HTML',
    'css3': 'CSS', 'css': 'CSS',
    'python': 'Python',     'react': 'React', 'vite': 'Vite',
    'prisma': 'Prisma', 'supabase': 'Supabase', 'stripe': 'Stripe',
    'clerk': 'Clerk',
  }
  return map[t.toLowerCase()] ?? t
}



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
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up('xl')]: {
    gap: theme.spacing(4),
  }
}))

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.up('xl')]: {
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}))

// Composant pour le titre du projet : gradient sur default, couleur palette sur les autres thèmes. Sur mobile, dégradé statique (pas d'animation) pour éviter les glitches.
const ProjectTitleTypography = ({ projectName, isNonDefaultPalette = false }: { projectName: string; isNonDefaultPalette?: boolean }) => {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
              ...(isMobile ? {} : { backgroundSize: '200% 200%', animation: 'gradientShift 3s ease-in-out infinite', ...ANIMATIONS.gradientShift }),
              textShadow: `0 0 20px ${primary}40`,
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
  getImageUrl,
  timelendarWindowsUrl,
  timelendarMacosUrl,
  viewProjectLabel = 'Voir le projet',
  viewSiteLabel = 'Voir le site',
  downloadProjectLabel = 'Télécharger le projet',
  downloadTimelendarPcLabel = 'Télécharger Timelendar PC',
  downloadTimelendarMacosLabel = 'Télécharger Timelendar macOS',
}: { 
  project: Project
  index: number
  handleProjectClick: (url: string) => void
  getStatusIcon: (status: string) => React.ReactElement
  getStatusColor: (status: string) => "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary"
  getImageUrl: (imageUrl: string) => string
  timelendarWindowsUrl?: string | null
  timelendarMacosUrl?: string | null
  viewProjectLabel?: string
  viewSiteLabel?: string
  downloadProjectLabel?: string
  downloadTimelendarPcLabel?: string
  downloadTimelendarMacosLabel?: string
}) => {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { themeName } = useAdvancedTheme()
  const isNonDefaultPalette = themeName !== 'default'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
  
  const imgHeights = { xs: '100px', sm: '120px', md: '140px', xl: '200px' }
  const lowerName = project.name.toLowerCase()
  const lowerUrl = (project.url ?? '').toLowerCase()
  const isTimelendarProject = lowerName.includes('timelendar') || lowerUrl.includes('/logiciel/timelendar')
  const hasProjectAction = project.url?.trim()
    || (!isTimelendarProject && project.downloadUrl?.trim())
    || (isTimelendarProject && (timelendarWindowsUrl || timelendarMacosUrl))

  return (
    <ScrollReveal key={project.id} direction="up" distance={isMobile ? 30 : 50} delay={isMobile ? 0.08 * (index % 4) : 0.05 * (index % 4)}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ThreeDCardComponent 
        key={project.id} 
        fullHeight
        onClick={() => {
          if (project.url?.trim()) handleProjectClick(project.url)
          else if (!isTimelendarProject && project.downloadUrl?.trim()) handleProjectClick(project.downloadUrl)
          else if (isTimelendarProject && timelendarWindowsUrl) handleProjectClick(timelendarWindowsUrl)
          else if (isTimelendarProject && timelendarMacosUrl) handleProjectClick(timelendarMacosUrl)
        }}
        floatingElements={2}
        sx={{
          padding: { xs: 2, sm: 2.5, md: 3 },
          flex: 1,
          minHeight: { xs: 320, md: 380 },
          cursor: hasProjectAction ? 'pointer' : 'default',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            height: '100%',
          }}
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
        
        <ProjectImageContainer
          sx={{
            height: imgHeights,
            flexShrink: 0,
            ...(isNonDefaultPalette ? {
              border: `2px solid ${primary}60`,
              borderRadius: DESIGN_TOKENS.borderRadius.small,
              boxShadow: `0 4px 20px ${primary}25, 0 0 0 1px ${primary}20`,
            } : {}),
            '& img': {
              ...(isNonDefaultPalette ? { boxShadow: 'none' } : {}),
            },
            ...(project.imageUrl && getImageUrl(project.imageUrl)
              ? {}
              : {
                  background: 'rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }),
          }}
        >
          {project.imageUrl && getImageUrl(project.imageUrl) ? (
            <Image
              src={getImageUrl(project.imageUrl)}
              alt={project.name}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Typography variant="caption" sx={{ opacity: 0.5, color: textColor }}>
              —
            </Typography>
          )}
        </ProjectImageContainer>
        
        <Typography
          variant="body2"
          paragraph
          sx={{
            lineHeight: 1.4,
            mb: { xs: 1, md: 1.5 },
            flex: 1,
            minHeight: { xs: '3.5rem', md: '4.5rem' },
            fontSize: { xs: '0.85rem', md: '0.9rem' },
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'rgba(255,255,255,0.92)' }),
          }}
        >
          {project.description}
        </Typography>
        
        <TechStack sx={{
          visibility: 'visible !important',
          opacity: '1 !important',
          zIndex: DESIGN_TOKENS.zIndex.elevated,
          position: 'relative',
          mb: { xs: 1, md: 1.5 }
        }}>
          {project.technologies.split(',').map((tech, techIndex) => (
            <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
              {tech.trim()}
            </SkillTag>
          ))}
        </TechStack>
        
        <Box
          sx={{
            mt: 'auto',
            pt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.url && (
            <CTAButton
              variant="primary"
              size="medium"
              fullWidth
              onClick={() => handleProjectClick(project.url)}
            >
              {viewProjectLabel}
            </CTAButton>
          )}
          {project.siteUrl && (
            <CTAButton
              variant="secondary"
              size="medium"
              fullWidth
              onClick={() => handleProjectClick(project.siteUrl!)}
            >
              {viewSiteLabel}
            </CTAButton>
          )}
          {isTimelendarProject ? (
            <>
              {timelendarWindowsUrl ? (
                <CTAButton
                  variant="secondary"
                  size="medium"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={() => handleProjectClick(timelendarWindowsUrl)}
                >
                  {downloadTimelendarPcLabel}
                </CTAButton>
              ) : null}
              {timelendarMacosUrl ? (
                <CTAButton
                  variant="secondary"
                  size="medium"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={() => handleProjectClick(timelendarMacosUrl)}
                >
                  {downloadTimelendarMacosLabel}
                </CTAButton>
              ) : null}
            </>
          ) : project.downloadUrl ? (
            <CTAButton
              variant="secondary"
              size="medium"
              fullWidth
              startIcon={<DownloadIcon />}
              onClick={() => handleProjectClick(project.downloadUrl!)}
            >
              {downloadProjectLabel}
            </CTAButton>
          ) : null}
        </Box>
        </Box>
      </ThreeDCardComponent>
      </Box>
    </ScrollReveal>
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
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2, 2.5),
        [theme.breakpoints.up('md')]: {
          marginBottom: theme.spacing(4),
          padding: theme.spacing(2.5, 3),
        },
        background: `${filterBackground} !important`,
        border: `1px solid ${primary}20 !important`,
        borderRadius: DESIGN_TOKENS.borderRadius.small,
        boxShadow: `0 2px 12px ${primary}08`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: DESIGN_TOKENS.transitions.normal,
        color: `${textColor} !important`,
        '& *': {
          color: 'inherit !important',
        },
        '&:hover': {
          border: `1px solid ${primary}35 !important`,
        },
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
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.up('lg')]: { marginBottom: theme.spacing(2) },
  '& img': {
    transition: DESIGN_TOKENS.transitions.slow,
    width: '100%',
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
  const router = useRouter()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedProjectType, setSelectedProjectType] = useState<'logiciel' | 'web'>('logiciel')
  const [timelendarWindowsUrl, setTimelendarWindowsUrl] = useState<string | null>(null)
  const [timelendarMacosUrl, setTimelendarMacosUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
    fetchTimelendarReleases()
  }, [])

  useEffect(() => {
    setSelectedTech(null)
  }, [selectedProjectType])

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

  const fetchTimelendarReleases = async () => {
    try {
      const response = await fetch('/api/timelendar/releases')
      const data = await response.json()
      if (!data?.success || !Array.isArray(data.data)) return
      const releases: TimelendarRelease[] = data.data

      let latestWindows: string | null = null
      let latestMacos: string | null = null

      for (const release of releases) {
        const platform = release.platform ?? 'both'
        if (!latestWindows && (platform === 'windows' || platform === 'both')) {
          latestWindows = release.filePath
        }
        if (!latestMacos && (platform === 'macos' || platform === 'both')) {
          latestMacos = release.filePath
        }
        if (latestWindows && latestMacos) break
      }

      setTimelendarWindowsUrl(latestWindows)
      setTimelendarMacosUrl(latestMacos)
    } catch {
      // Ignore silently: la page reste utilisable sans releases Timelendar.
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

  const handleProjectClick = useCallback(
    (url: string) => {
      const normalized = url.trim().toLowerCase()
      if (normalized.includes('/logiciel/timelendar')) {
        void router.push('/logiciel/timelendar')
        return
      }
      navigateProjectUrl(url, router)
    },
    [router]
  )

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

  // Technologies prioritaires présentes dans les projets (normalisées, limitées)
  const getDisplayTechnologies = () => {
    const rawSet = new Set<string>()
    projects.forEach(project => {
      project.technologies.split(',').forEach(tech => rawSet.add(tech.trim()))
    })
    const normalizedToCanonical = new Map<string, string>()
    rawSet.forEach(raw => {
      const canon = normalizeTechName(raw)
      if (PRIORITY_TECHS.includes(canon)) normalizedToCanonical.set(canon, canon)
    })
    const ordered = PRIORITY_TECHS.filter(t => normalizedToCanonical.has(t))
    return ordered.slice(0, MAX_FILTER_TECHS)
  }

  // Filtrer les projets par technologie (comparaison normalisée)
  const projectsByType = projects.filter((project) => (project.projectType ?? 'web') === selectedProjectType)

  const orderedProjects = [...projectsByType].sort((a, b) => {
    const orderA = a.displayOrder ?? 0
    const orderB = b.displayOrder ?? 0
    if (orderA !== orderB) return orderA - orderB
    return a.id - b.id
  })

  const filteredProjects = selectedTech
    ? orderedProjects.filter(project =>
        project.technologies.split(',').some(tech => normalizeTechName(tech.trim()) === selectedTech)
      )
    : orderedProjects

  const handleTechFilter = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech)
  }

  if (loading) {
    return (
      <PageWrapper backgroundVariant="default">
        <AppBarComponent />
        <InteractiveBackgroundSection>
          <Container sx={{ 
            mt: 4, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh'
          }}>
            <LoadingSpinner message="Chargement des projets..." />
          </Container>
        </InteractiveBackgroundSection>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper
      backgroundVariant="projects"
      overlayVariant="light"
      overflowX="hidden"
      overflowY="auto"
    >
      <AppBarComponent />
      
      {/* Hero Section */}
      <HeaderSection 
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 4, xl: 5 }, position: 'relative', zIndex: 2 }}>
        {error && (
          <AnimatedBox>
            <Alert severity="error" sx={{ mb: 4, borderRadius: DESIGN_TOKENS.borderRadius.small }}>
              {error}
            </Alert>
          </AnimatedBox>
        )}

        {/* Stats Section et Filtres par technologie désactivés pour l'instant */}
        {false && (
          <>
            <ScrollReveal direction="up" delay={0.05}>
              <StatsGrid>
                <ScrollReveal direction="up" delay={0.1}>
                  <ThreeDCardComponent floatingElements={2} compact>
                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: primary, mb: 0.5, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                        <AnimatedCounter value={projects.length} />
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('projects.totalProjects')}
                      </Typography>
                    </Box>
                  </ThreeDCardComponent>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <ThreeDCardComponent floatingElements={2} compact>
                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: primary, mb: 0.5, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                        <AnimatedCounter value={getCompletedProjects()} />
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('projects.completed')}
                      </Typography>
                    </Box>
                  </ThreeDCardComponent>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
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
            {projects.length > 0 && (
              <ScrollReveal direction="up" delay={0.25}>
                <FilterContainerComponent>
                  <FilterContainerLabel label={t('projects.filterLabel')} />
                  <FilterChipComponent
                    label={t('projects.filterAll')}
                    onClick={() => setSelectedTech(null)}
                    selected={selectedTech === null}
                    icon={selectedTech === null ? undefined : <ClearIcon />}
                  />
                  {getDisplayTechnologies().map((tech) => (
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
          </>
        )}

        {/* Projects Grid */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <Button
            variant={selectedProjectType === 'logiciel' ? 'contained' : 'outlined'}
            onClick={() => setSelectedProjectType('logiciel')}
            sx={{ minWidth: 140 }}
          >
            {t('nav.software')}
          </Button>
          <Button
            variant={selectedProjectType === 'web' ? 'contained' : 'outlined'}
            onClick={() => setSelectedProjectType('web')}
            sx={{ minWidth: 140 }}
          >
            {t('nav.webSites')}
          </Button>
        </Box>

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
              timelendarWindowsUrl={timelendarWindowsUrl}
              timelendarMacosUrl={timelendarMacosUrl}
              viewProjectLabel={t('projects.viewProject')}
              viewSiteLabel={t('projects.viewSite')}
              downloadProjectLabel={t('projects.downloadProject')}
              downloadTimelendarPcLabel={t('projects.downloadTimelendarPc')}
              downloadTimelendarMacosLabel={t('projects.downloadTimelendarMacos')}
            />
          ))}
        </ProjectsGrid>
        
        {filteredProjects.length === 0 && projectsByType.length > 0 && (
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
                {t('projects.noProjects')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t('projects.noProjectsHint')}
              </Typography>
              <CTAButton
                variant="secondary"
                onClick={() => setSelectedTech(null)}
                startIcon={<ClearIcon />}
              >
                {t('projects.resetFilter')}
              </CTAButton>
            </Box>
          </AnimatedBox>
        )}

        {projectsByType.length === 0 && !error && (
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
                {selectedProjectType === 'logiciel' ? 'Aucun logiciel pour le moment' : 'Aucun site web pour le moment'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('projects.comingSoon')}
              </Typography>
            </Box>
          </AnimatedBox>
        )}
      </Container>
      </InteractiveBackgroundSection>
      
      <Footer />
    </PageWrapper>
  )
}
