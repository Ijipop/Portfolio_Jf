'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import DownloadIcon from '@mui/icons-material/Download'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { styled, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import IjipopGlitchTitle from '../../components/shared/IjipopGlitchTitle'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import CTAButton from '../../components/shared/CTAButton'
import Footer from '../../components/Footer'
import { DESIGN_TOKENS, ANIMATIONS, GRADIENTS } from '../../design-system/constants'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { usePresentationMode } from '../../contexts/PresentationModeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import FilterContainerLabel from './components/FilterContainerLabel'
import FilterChipComponent from './components/FilterChipComponent'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'

interface Project {
  id: number
  name: string
  description: string
  technologies: string
  status: string
  projectType?: 'logiciel' | 'web'
  webAudience?: 'personal' | 'professional' | null
  displayOrder?: number
  url: string
  siteUrl?: string | null
  downloadUrl?: string | null
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

/** Vignettes par défaut (public/imgs/images/) pour des projets connus. */
function resolveProjectCardImage(project: Project): string | undefined {
  const n = project.name.toLowerCase()
  const u = (project.url ?? '').toLowerCase()
  if (n.includes('thermo') && n.includes('trappeur')) return 'imgs/images/Thermo.png'
  if (
    n.includes('timelendr') ||
    n.includes('timelendar') ||
    u.includes('/logiciel/timelendr') ||
    u.includes('/logiciel/timelendar')
  ) {
    return 'imgs/images/timelendr.png'
  }
  return undefined
}

/** Onglet Web : cible du bouton « Voir le site » — `siteUrl` si présent, sinon `url` si ce n’est pas GitHub (site / démo sans champ dédié). */
function getWebViewSiteButtonHref(project: Project): string | null {
  const site = project.siteUrl?.trim()
  if (site) return site
  const u = project.url?.trim()
  if (u && !u.toLowerCase().includes('github')) return u
  return null
}

type TimelendrPlatform = 'windows' | 'macos' | 'both'

interface TimelendrRelease {
  filePath: string
  platform?: TimelendrPlatform
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
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.75),
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
  alignItems: 'stretch',
  gap: theme.spacing(1.25),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1.25),
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1.25),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1.75),
  },
  [theme.breakpoints.up('xl')]: {
    gap: theme.spacing(2),
  },
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
      variant="subtitle2" 
      component="h2" 
      sx={{
        ...(        isNonDefaultPalette
          ? {
              fontWeight: 700,
              mb: 0.5,
              textAlign: 'left',
              fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.92rem' },
              color: primary,
              textShadow: `0 0 12px ${primary}40`,
            }
          : {
              fontWeight: 700,
              mb: 0.5,
              textAlign: 'left',
              fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.92rem' },
              background: `linear-gradient(45deg, ${primary}, ${secondary}, ${accent}, ${primary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              ...(isMobile ? {} : { backgroundSize: '200% 200%', animation: 'gradientShift 3s ease-in-out infinite', ...ANIMATIONS.gradientShift }),
              textShadow: `0 0 20px ${primary}40`,
            }),
      }}
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
  timelendrWindowsUrl,
  timelendrMacosUrl,
  viewProjectLabel = 'Voir le projet',
  viewSiteLabel = 'Voir le site',
  downloadProjectLabel = 'Télécharger le projet',
  downloadTimelendrPcLabel = 'Télécharger Timelendr PC',
  downloadTimelendrMacosLabel = 'Télécharger Timelendr macOS',
  /** `web` : seul CTA « Voir le site » (pas de « Voir le projet »). `logiciel` : comportement inchangé. */
  cardVariant = 'logiciel',
}: { 
  project: Project
  index: number
  handleProjectClick: (url: string) => void
  getStatusIcon: (status: string) => React.ReactElement
  getStatusColor: (status: string) => "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary"
  getImageUrl: (imageUrl: string) => string
  timelendrWindowsUrl?: string | null
  timelendrMacosUrl?: string | null
  viewProjectLabel?: string
  viewSiteLabel?: string
  downloadProjectLabel?: string
  downloadTimelendrPcLabel?: string
  downloadTimelendrMacosLabel?: string
  cardVariant?: 'web' | 'logiciel'
}) => {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { themeName, customTheme } = useAdvancedTheme()
  const { mode: presentationMode } = usePresentationMode()
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

  const lowerName = project.name.toLowerCase()
  const lowerUrl = (project.url ?? '').toLowerCase()
  const isTimelendrProject =
    lowerName.includes('timelendr') ||
    lowerName.includes('timelendar') ||
    lowerUrl.includes('/logiciel/timelendr') ||
    lowerUrl.includes('/logiciel/timelendar')
  const hasProjectAction =
    project.url?.trim()
    || project.siteUrl?.trim()
    || (!isTimelendrProject && project.downloadUrl?.trim())
    || (isTimelendrProject && (timelendrWindowsUrl || timelendrMacosUrl))

  const cardImageRaw = resolveProjectCardImage(project) ?? project.imageUrl
  const cardImageHref = cardImageRaw ? getImageUrl(cardImageRaw) : ''

  const linkIconButtonSx = {
    flexShrink: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50%',
    padding: 1,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    transition: DESIGN_TOKENS.transitions.normal,
    pointerEvents: 'auto' as const,
    '&:hover': {
      transform: 'scale(1.15)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
  }

  const threeDCardSurfaceSx =
    presentationMode === 'beige'
      ? {
          padding: 0,
          overflow: 'hidden',
          minHeight: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiCardContent-root': {
            padding: 0,
            '&:last-child': { paddingBottom: 0 },
          },
          cursor: hasProjectAction ? 'pointer' : 'default',
          background: `${getBeigePresentationTopologyBackground(customTheme)} !important`,
          backgroundAttachment: 'fixed',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: `1px solid ${primary}28`,
          boxShadow: '0 8px 24px rgba(92, 77, 60, 0.1), 0 0 0 1px rgba(139, 126, 114, 0.08)',
        }
      : {
          padding: 0,
          overflow: 'hidden',
          minHeight: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiCardContent-root': {
            padding: 0,
            '&:last-child': { paddingBottom: 0 },
          },
          cursor: hasProjectAction ? 'pointer' : 'default',
          background: 'transparent !important',
          backdropFilter: 'blur(12px) saturate(1.04)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.04)',
          border: `1px solid ${
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : `${primary}28`
          }`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 12px 32px rgba(0,0,0,0.35)'
              : '0 8px 28px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.05)',
        }

  let primaryHref: string | null = null
  let primaryLabel = viewProjectLabel
  if (project.url?.trim()) {
    primaryHref = project.url.trim()
    primaryLabel = viewProjectLabel
  } else if (project.siteUrl?.trim()) {
    primaryHref = project.siteUrl.trim()
    primaryLabel = viewSiteLabel
  } else if (!isTimelendrProject && project.downloadUrl?.trim()) {
    primaryHref = project.downloadUrl!.trim()
    primaryLabel = downloadProjectLabel
  } else if (isTimelendrProject && timelendrWindowsUrl) {
    primaryHref = timelendrWindowsUrl
    primaryLabel = downloadTimelendrPcLabel
  } else if (isTimelendrProject && timelendrMacosUrl) {
    primaryHref = timelendrMacosUrl
    primaryLabel = downloadTimelendrMacosLabel
  }

  /** Timelendr : lien « projet » + téléchargements → une ligne (projet à gauche, DL à droite) pour aligner le bas avec les autres cartes. */
  const timelendrDownloadsBesideProject =
    isTimelendrProject &&
    Boolean(project.url?.trim()) &&
    Boolean(timelendrWindowsUrl || timelendrMacosUrl)

  const secondaryBtnSx = {
    alignSelf: 'flex-start' as const,
    py: 0.5,
    px: 1.25,
    fontSize: '0.75rem',
    textTransform: 'none' as const,
  }

  const webViewSiteHref = cardVariant === 'web' ? getWebViewSiteButtonHref(project) : null

  return (
    <ScrollReveal
      key={project.id}
      fillHeight
      direction="up"
      distance={isMobile ? 30 : 50}
      delay={isMobile ? 0.08 * (index % 4) : 0.05 * (index % 4)}
    >
      <Box
        sx={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ThreeDCardComponent
          key={project.id}
          subtle
          fullHeight
          floatingElements={0}
          onClick={() => {
            if (project.url?.trim()) handleProjectClick(project.url)
            else if (project.siteUrl?.trim()) handleProjectClick(project.siteUrl)
            else if (!isTimelendrProject && project.downloadUrl?.trim()) handleProjectClick(project.downloadUrl)
            else if (isTimelendrProject && timelendrWindowsUrl) handleProjectClick(timelendrWindowsUrl)
            else if (isTimelendrProject && timelendrMacosUrl) handleProjectClick(timelendrMacosUrl)
          }}
          sx={threeDCardSurfaceSx as SxProps<Theme>}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              alignItems: 'stretch',
              width: '100%',
              flex: 1,
              minHeight: 0,
            }}
          >
            <ProjectImageContainer
              sx={{
                width: '100%',
                maxWidth: 'none',
                mx: 0,
                mb: 0,
                aspectRatio: '16 / 9',
                flexShrink: 0,
                borderRadius: 0,
                ...(cardImageHref
                  ? { background: 'rgba(0,0,0,0.06)' }
                  : {
                      background: 'rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }),
                ...(isNonDefaultPalette
                  ? {
                      border: 'none',
                      borderBottom: `1px solid ${primary}35`,
                      boxShadow: 'none',
                    }
                  : {}),
                '& img': {
                  objectFit: 'contain',
                  ...(isNonDefaultPalette ? { boxShadow: 'none' } : {}),
                },
              }}
            >
              {cardImageHref ? (
                <Image
                  src={cardImageHref}
                  alt={project.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <Typography variant="caption" sx={{ opacity: 0.5, color: textColor }}>
                  —
                </Typography>
              )}
            </ProjectImageContainer>

            <Box
              sx={{
                px: { xs: 1, sm: 1.25, md: 1.5 },
                pt: { xs: 1, sm: 1.15, md: 1.25 },
                pb: { xs: 1, sm: 1.25, md: 1.5 },
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.35, flexShrink: 0 }}>
                <StatusChip
                  icon={getStatusIcon(project.status)}
                  label={project.status}
                  color={getStatusColor(project.status)}
                  size="small"
                />
                {project.url && project.url.includes('github') && (
                  <Box sx={{ ...linkIconButtonSx, zIndex: DESIGN_TOKENS.zIndex.overlay }} aria-hidden>
                    <GitHubIcon sx={{ fontSize: 18, color: '#000000', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                  </Box>
                )}
                {project.url && !project.url.includes('github') && (
                  <Box sx={{ ...linkIconButtonSx, zIndex: DESIGN_TOKENS.zIndex.overlay }} aria-hidden>
                    <LaunchIcon sx={{ fontSize: 18, color: '#000000', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                  </Box>
                )}
              </Box>

              {project.createdAt && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 0.65,
                    flexShrink: 0,
                    color: textColor,
                    opacity: 0.9,
                    fontSize: '0.7rem',
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" component="span" sx={{ fontSize: '0.68rem' }}>
                    {new Date(project.createdAt).getFullYear()}
                  </Typography>
                </Box>
              )}

              <ProjectTitleTypography projectName={project.name} isNonDefaultPalette={isNonDefaultPalette} />

              <Typography
                variant="body2"
                paragraph
                sx={{
                  textAlign: 'left',
                  lineHeight: 1.35,
                  mb: { xs: 0.5, md: 0.65 },
                  fontSize: { xs: '0.72rem', sm: '0.75rem', md: '0.78rem' },
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'rgba(255,255,255,0.92)' }),
                }}
              >
                {project.description}
              </Typography>

              <TechStack
                sx={{
                  visibility: 'visible !important',
                  opacity: '1 !important',
                  zIndex: DESIGN_TOKENS.zIndex.elevated,
                  position: 'relative',
                  justifyContent: 'flex-start',
                  mb: { xs: 0.5, md: 0.65 },
                }}
              >
                {project.technologies.split(',').map((tech, techIndex) => (
                  <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
                    {tech.trim()}
                  </SkillTag>
                ))}
              </TechStack>

              <Box
                sx={{
                  pt: 0.25,
                  mt: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  flexShrink: 0,
                  width: '100%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {cardVariant === 'web' ? (
                  webViewSiteHref ? (
                    <CTAButton
                      variant="primary"
                      size="small"
                      onClick={() => handleProjectClick(webViewSiteHref)}
                    >
                      {viewSiteLabel}
                    </CTAButton>
                  ) : null
                ) : timelendrDownloadsBesideProject ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      width: '100%',
                      gap: 1,
                      rowGap: 0.75,
                    }}
                  >
                    {primaryHref && (
                      <Box sx={{ flexShrink: 0 }}>
                        <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(primaryHref)}>
                          {primaryLabel}
                        </CTAButton>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                        gap: 0.5,
                        flex: '1 1 0',
                        minWidth: { xs: '100%', sm: 0 },
                        maxWidth: { xs: '100%', sm: 400 },
                        marginLeft: { xs: 0, sm: 'auto' },
                      }}
                    >
                      {timelendrWindowsUrl && primaryHref !== timelendrWindowsUrl && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            ...secondaryBtnSx,
                            alignSelf: 'stretch',
                            flex: '1 1 0',
                            minWidth: 0,
                            justifyContent: 'center',
                            px: { xs: 1, sm: 1.35 },
                            py: 0.65,
                            fontSize: '0.75rem',
                          }}
                          startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleProjectClick(timelendrWindowsUrl)}
                        >
                          {downloadTimelendrPcLabel}
                        </Button>
                      )}
                      {timelendrMacosUrl && primaryHref !== timelendrMacosUrl && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            ...secondaryBtnSx,
                            alignSelf: 'stretch',
                            flex: '1 1 0',
                            minWidth: 0,
                            justifyContent: 'center',
                            px: { xs: 1, sm: 1.35 },
                            py: 0.65,
                            fontSize: '0.75rem',
                          }}
                          startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                          onClick={() => handleProjectClick(timelendrMacosUrl)}
                        >
                          {downloadTimelendrMacosLabel}
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <>
                    {primaryHref && (
                      <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(primaryHref)}>
                        {primaryLabel}
                      </CTAButton>
                    )}
                    {project.siteUrl?.trim() && primaryHref !== project.siteUrl.trim() && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        onClick={() => handleProjectClick(project.siteUrl!)}
                      >
                        {viewSiteLabel}
                      </Button>
                    )}
                    {isTimelendrProject && timelendrWindowsUrl && primaryHref !== timelendrWindowsUrl && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(timelendrWindowsUrl)}
                      >
                        {downloadTimelendrPcLabel}
                      </Button>
                    )}
                    {isTimelendrProject && timelendrMacosUrl && primaryHref !== timelendrMacosUrl && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(timelendrMacosUrl)}
                      >
                        {downloadTimelendrMacosLabel}
                      </Button>
                    )}
                    {!isTimelendrProject && project.downloadUrl?.trim() && primaryHref !== project.downloadUrl.trim() && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={secondaryBtnSx}
                        startIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
                        onClick={() => handleProjectClick(project.downloadUrl!)}
                      >
                        {downloadProjectLabel}
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </ThreeDCardComponent>
      </Box>
    </ScrollReveal>
  )
}

/** Fond type carte / verre aligné sur --card-background et le thème (même logique que les cartes projet). */
function useCardBackgroundFromThemeVars(fallback: string) {
  const [filterBackground, setFilterBackground] = useState(fallback)

  useEffect(() => {
    const updateFilterBackground = () => {
      if (typeof window === 'undefined') return

      const cardBg = getComputedStyle(document.documentElement).getPropertyValue('--card-background')?.trim()

      if (cardBg && cardBg !== 'none') {
        setFilterBackground(cardBg)
      } else {
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
        const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()

        if (bg && bg2) {
          setFilterBackground(`linear-gradient(145deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`)
        } else {
          setFilterBackground(fallback)
        }
      }
    }

    updateFilterBackground()

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
  }, [fallback])

  return filterBackground
}

// FilterContainer comme composant fonctionnel pour réagir aux changements de thème
const FilterContainerComponent = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const filterBackground = useCardBackgroundFromThemeVars(GRADIENTS.cards.light)

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
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('lg')]: { marginBottom: theme.spacing(0.65) },
  '& img': {
    transition: DESIGN_TOKENS.transitions.slow,
    width: '100%',
    objectFit: 'contain',
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}))

export default function Projets() {
  const router = useRouter()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedProjectType, setSelectedProjectType] = useState<'logiciel' | 'web'>('web')
  const [timelendrWindowsUrl, setTimelendrWindowsUrl] = useState<string | null>(null)
  const [timelendrMacosUrl, setTimelendrMacosUrl] = useState<string | null>(null)

  const sectionGlassBg = useCardBackgroundFromThemeVars(GRADIENTS.cards.light)
  const glassProjectSectionAccordionSx = useMemo(
    () =>
      ({
        background: `${sectionGlassBg} !important`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${primary}22 !important`,
        borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
        boxShadow: `0 2px 16px ${primary}10, inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
        overflow: 'hidden',
        '&:before': { display: 'none' },
        transition: DESIGN_TOKENS.transitions.normal,
        '&:hover': {
          border: `1px solid ${primary}38 !important`,
          boxShadow: `0 4px 20px ${primary}14, inset 0 1px 0 rgba(255, 255, 255, 0.16)`,
        },
        '& .MuiAccordionSummary-root': {
          backgroundColor: 'transparent',
          color: textColor,
        },
        '& .MuiAccordionDetails-root': {
          backgroundColor: 'transparent',
          color: textColor,
        },
      }) as const,
    [sectionGlassBg, primary, textColor],
  )

  const webSectionAccordionSx = useMemo(() => {
    if (presentationMode === 'beige') {
      return {
        background: 'transparent !important',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: `1px solid ${primary}22`,
        borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
        boxShadow: 'none',
        overflow: 'hidden',
        '&:before': { display: 'none' },
        transition: DESIGN_TOKENS.transitions.normal,
        '&:hover': {
          border: `1px solid ${primary}32`,
          boxShadow: 'none',
        },
        '& .MuiAccordionSummary-root': {
          backgroundColor: 'transparent',
          color: textColor,
        },
        '& .MuiAccordionDetails-root': {
          backgroundColor: 'transparent',
          color: textColor,
        },
      } as const
    }
    return glassProjectSectionAccordionSx
  }, [presentationMode, glassProjectSectionAccordionSx, primary, textColor])

  useEffect(() => {
    fetchProjects()
    fetchTimelendrReleases()
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

  const fetchTimelendrReleases = async () => {
    try {
      const response = await fetch('/api/timelendr/releases')
      const data = await response.json()
      if (!data?.success || !Array.isArray(data.data)) return
      const releases: TimelendrRelease[] = data.data

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

      setTimelendrWindowsUrl(latestWindows)
      setTimelendrMacosUrl(latestMacos)
    } catch {
      // Ignore silently: la page reste utilisable sans releases Timelendr.
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
      if (normalized.includes('/logiciel/timelendr') || normalized.includes('/logiciel/timelendar')) {
        void router.push('/logiciel/timelendr')
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

  const webPersonalProjects = filteredProjects.filter((p) => p.webAudience === 'personal')
  const webProfessionalProjects = filteredProjects.filter((p) => p.webAudience !== 'personal')

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
        title={<IjipopGlitchTitle text={t('projects.title')} />}
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
            variant={selectedProjectType === 'web' ? 'contained' : 'outlined'}
            onClick={() => setSelectedProjectType('web')}
            sx={{ minWidth: 140 }}
          >
            {t('nav.webSites')}
          </Button>
          <Button
            variant={selectedProjectType === 'logiciel' ? 'contained' : 'outlined'}
            onClick={() => setSelectedProjectType('logiciel')}
            sx={{ minWidth: 140 }}
          >
            {t('nav.software')}
          </Button>
        </Box>

        {selectedProjectType === 'web' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Accordion
              defaultExpanded={false}
              disableGutters
              elevation={0}
              sx={webSectionAccordionSx}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: textColor, opacity: 0.85 }} />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primary }}>
                  {t('projects.webSectionPersonalTitle')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.82 }}>
                  {t('projects.webSectionPersonalSubtitle')}
                </Typography>
                {webPersonalProjects.length === 0 ? (
                  <Typography variant="body2" sx={{ color: textColor, opacity: 0.75 }}>
                    {t('projects.webSectionEmpty')}
                  </Typography>
                ) : (
                  <ProjectsGrid>
                    {webPersonalProjects.map((project, index) => (
                      <ProjectCardWrapper
                        key={project.id}
                        project={project}
                        index={index}
                        handleProjectClick={handleProjectClick}
                        getStatusIcon={getStatusIcon}
                        getStatusColor={getStatusColor}
                        getImageUrl={getImageUrl}
                        timelendrWindowsUrl={timelendrWindowsUrl}
                        timelendrMacosUrl={timelendrMacosUrl}
                        viewProjectLabel={t('projects.viewProject')}
                        viewSiteLabel={t('projects.viewSite')}
                        downloadProjectLabel={t('projects.downloadProject')}
                        downloadTimelendrPcLabel={t('projects.downloadTimelendrPc')}
                        downloadTimelendrMacosLabel={t('projects.downloadTimelendrMacos')}
                        cardVariant="web"
                      />
                    ))}
                  </ProjectsGrid>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              disableGutters
              elevation={0}
              sx={webSectionAccordionSx}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: textColor, opacity: 0.85 }} />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primary }}>
                  {t('projects.webSectionProfessionalTitle')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.82 }}>
                  {t('projects.webSectionProfessionalSubtitle')}
                </Typography>
                {webProfessionalProjects.length === 0 ? (
                  <Typography variant="body2" sx={{ color: textColor, opacity: 0.75 }}>
                    {t('projects.webSectionEmpty')}
                  </Typography>
                ) : (
                  <ProjectsGrid>
                    {webProfessionalProjects.map((project, index) => (
                      <ProjectCardWrapper
                        key={project.id}
                        project={project}
                        index={index}
                        handleProjectClick={handleProjectClick}
                        getStatusIcon={getStatusIcon}
                        getStatusColor={getStatusColor}
                        getImageUrl={getImageUrl}
                        timelendrWindowsUrl={timelendrWindowsUrl}
                        timelendrMacosUrl={timelendrMacosUrl}
                        viewProjectLabel={t('projects.viewProject')}
                        viewSiteLabel={t('projects.viewSite')}
                        downloadProjectLabel={t('projects.downloadProject')}
                        downloadTimelendrPcLabel={t('projects.downloadTimelendrPc')}
                        downloadTimelendrMacosLabel={t('projects.downloadTimelendrMacos')}
                        cardVariant="web"
                      />
                    ))}
                  </ProjectsGrid>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        ) : (
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
                timelendrWindowsUrl={timelendrWindowsUrl}
                timelendrMacosUrl={timelendrMacosUrl}
                viewProjectLabel={t('projects.viewProject')}
                viewSiteLabel={t('projects.viewSite')}
                downloadProjectLabel={t('projects.downloadProject')}
                downloadTimelendrPcLabel={t('projects.downloadTimelendrPc')}
                downloadTimelendrMacosLabel={t('projects.downloadTimelendrMacos')}
              />
            ))}
          </ProjectsGrid>
        )}
        
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
