'use client'

import DownloadIcon from '@mui/icons-material/Download'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { styled, useTheme } from '@mui/material/styles'
import type { SxProps, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import React, { useState } from 'react'
import ThreeDCardComponent from '@/components/ThreeDCard'
import ScrollReveal from '@/components/shared/ScrollReveal'
import SkillTag from '@/components/shared/SkillTag'
import CTAButton from '@/components/shared/CTAButton'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { BRAND_GLITCH_GRADIENT } from '@/components/shared/IjipopGlitchTitle'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'
import type { Project } from '../projectTypes'

const DESCRIPTION_EXPAND_THRESHOLD = 100

const StatusChip = styled(Chip)(({ theme, color }: { theme: any; color?: any }) => ({
  borderRadius: DESIGN_TOKENS.borderRadius.medium,
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  },
}))

const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.75),
}))

const ProjectImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('lg')]: { marginBottom: theme.spacing(0.65) },
  '& img': {
    transition: DESIGN_TOKENS.transitions.slow,
    width: '100%',
    objectFit: 'contain',
    borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}))

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

function getWebViewSiteButtonHref(project: Project): string | null {
  const site = project.siteUrl?.trim()
  if (site) return site
  const u = project.url?.trim()
  if (u && !u.toLowerCase().includes('github')) return u
  return null
}

function getProjectMonogram(name: string): string {
  const words = name
    .replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  const initials = words.slice(0, 2).map((word) => word[0]).join('')
  return (initials || name.slice(0, 2) || 'IJ').toUpperCase()
}

export type ProjectCardProps = {
  project: Project
  index: number
  handleProjectClick: (url: string) => void
  getStatusIcon: (status: string) => React.ReactElement
  getStatusColor: (status: string) => 'error' | 'success' | 'warning' | 'info' | 'default' | 'primary' | 'secondary'
  resolveImageUrl: (imageUrl: string) => string
  timelendrWindowsUrl?: string | null
  timelendrMacosUrl?: string | null
  viewProjectLabel?: string
  viewSiteLabel?: string
  downloadProjectLabel?: string
  downloadTimelendrPcLabel?: string
  downloadTimelendrMacosLabel?: string
  cardVariant?: 'web' | 'logiciel'
}

export default function ProjectCard({
  project,
  index,
  handleProjectClick,
  getStatusIcon,
  getStatusColor,
  resolveImageUrl,
  timelendrWindowsUrl,
  timelendrMacosUrl,
  viewProjectLabel = 'Voir le projet',
  viewSiteLabel = 'Voir le site',
  downloadProjectLabel = 'Télécharger le projet',
  downloadTimelendrPcLabel = 'Télécharger Timelendr PC',
  downloadTimelendrMacosLabel = 'Télécharger Timelendr macOS',
  cardVariant = 'logiciel',
}: ProjectCardProps) {
  const theme = useTheme()
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { themeName, customTheme } = useAdvancedTheme()
  const { beigePresentationBgUrl } = useBeigePresentationBg()
  const { mode: presentationMode } = usePresentationMode()
  const isNonDefaultPalette = themeName !== 'default'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const reflectionColors = [primary, secondary, accent, primary, secondary, accent, primary, secondary, accent, primary]
  const reflectionColor = reflectionColors[index % reflectionColors.length]

  const lowerName = project.name.toLowerCase()
  const lowerUrl = (project.url ?? '').toLowerCase()
  const isTimelendrProject =
    lowerName.includes('timelendr') ||
    lowerName.includes('timelendar') ||
    lowerUrl.includes('/logiciel/timelendr') ||
    lowerUrl.includes('/logiciel/timelendar')
  const hasProjectAction =
    project.url?.trim() ||
    project.siteUrl?.trim() ||
    (!isTimelendrProject && project.downloadUrl?.trim()) ||
    (isTimelendrProject && (timelendrWindowsUrl || timelendrMacosUrl))

  const cardImageRaw = resolveProjectCardImage(project) ?? project.imageUrl
  const cardImageHref = cardImageRaw ? resolveImageUrl(cardImageRaw) : ''
  const projectTechs = project.technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
  const projectRoleLabel = cardVariant === 'web' ? t('projects.metaRoleWeb') : t('projects.metaRoleSoftware')
  const yearSegment = project.createdAt
    ? `${t('projects.metaYear')} ${new Date(project.createdAt).getFullYear()}`
    : null
  const stackFallback = projectTechs[0] ?? t('projects.metaStack')
  /** Année seulement si connue ; pas de « Livraison ciblée ». Pas de pastille stack si les badges listent déjà les technos. */
  const projectMetaLineItems: string[] =
    projectTechs.length > 0
      ? [projectRoleLabel, yearSegment].filter((item): item is string => Boolean(item))
      : [projectRoleLabel, yearSegment, stackFallback].filter((item): item is string => Boolean(item))
  const showDescriptionToggle = project.description.length > DESCRIPTION_EXPAND_THRESHOLD

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

  const threeDCardSurfaceSx: SxProps<Theme> =
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
          background: `${getBeigePresentationTopologyBackground(customTheme, beigePresentationBgUrl)} !important`,
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: `1px solid ${primary}28`,
          boxShadow: '0 8px 24px rgba(92, 77, 60, 0.1), 0 0 0 1px rgba(139, 126, 114, 0.08)',
          '&:hover .project-card-image img': {
            transform: 'scale(1.06)',
          },
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
          '&:hover .project-card-image img': {
            transform: 'scale(1.06)',
          },
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

  const timelendrDownloadsBesideProject =
    isTimelendrProject && Boolean(project.url?.trim()) && Boolean(timelendrWindowsUrl || timelendrMacosUrl)

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
          borderBeam={{ duration: 58, size: 180, delay: (index % 4) * 4 }}
          onClick={() => {
            if (project.url?.trim()) handleProjectClick(project.url)
            else if (project.siteUrl?.trim()) handleProjectClick(project.siteUrl)
            else if (!isTimelendrProject && project.downloadUrl?.trim()) handleProjectClick(project.downloadUrl)
            else if (isTimelendrProject && timelendrWindowsUrl) handleProjectClick(timelendrWindowsUrl)
            else if (isTimelendrProject && timelendrMacosUrl) handleProjectClick(timelendrMacosUrl)
          }}
          sx={threeDCardSurfaceSx}
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
              className="project-card-image"
              sx={{
                width: '100%',
                maxWidth: 'none',
                mx: 0,
                mb: 0,
                aspectRatio: '16 / 9',
                flexShrink: 0,
                borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
                ...(cardImageHref
                  ? { background: 'rgba(0,0,0,0.06)' }
                  : {
                      background: BRAND_GLITCH_GRADIENT,
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
                  objectFit: 'cover',
                  borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
                  transform: 'scale(1.01)',
                  ...(isNonDefaultPalette ? { boxShadow: 'none' } : {}),
                },
              }}
            >
              {cardImageHref ? (
                <Image
                  src={cardImageHref}
                  alt={project.name}
                  fill
                  unoptimized={cardImageHref.startsWith('data:')}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-0.08em',
                    textShadow: '0 16px 50px rgba(0,0,0,0.35)',
                  }}
                >
                  {getProjectMonogram(project.name)}
                </Typography>
              )}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: { xs: 1.25, md: 1.5 },
                  color: 'white',
                  background: 'linear-gradient(to top, rgba(2,6,23,0.78), rgba(2,6,23,0.1), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    textShadow: '0 2px 10px rgba(0,0,0,0.45)',
                  }}
                >
                  {project.name}
                </Typography>
              </Box>
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

              <Box sx={{ mb: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'left',
                    lineHeight: 1.35,
                    mb: showDescriptionToggle ? 0.25 : { xs: 0.5, md: 0.65 },
                    fontSize: { xs: '0.72rem', sm: '0.75rem', md: '0.78rem' },
                    ...(descriptionExpanded
                      ? { overflow: 'visible', display: 'block' }
                      : {
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }),
                    ...(isNonDefaultPalette ? { color: `${primary}ee` } : { color: 'rgba(255,255,255,0.92)' }),
                  }}
                >
                  {project.description}
                </Typography>
                {showDescriptionToggle && (
                  <Button
                    type="button"
                    size="small"
                    variant="text"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDescriptionExpanded((v) => !v)
                    }}
                    sx={{
                      mt: 0,
                      p: 0,
                      minWidth: 0,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      color: primary,
                    }}
                  >
                    {descriptionExpanded ? t('projects.viewLess') : t('projects.viewMore')}
                  </Button>
                )}
              </Box>

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
                {projectTechs.map((tech, techIndex) => (
                  <SkillTag key={techIndex} size="small" reflectionColor={reflectionColor}>
                    {tech}
                  </SkillTag>
                ))}
              </TechStack>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 0.65,
                  mb: 0.9,
                  color: textColor,
                  opacity: 0.78,
                  fontSize: '0.64rem',
                  fontWeight: 900,
                  letterSpacing: '0.11em',
                  textTransform: 'uppercase',
                }}
              >
                {projectMetaLineItems.map((item, metaIndex) => (
                  <React.Fragment key={`${project.id}-meta-${metaIndex}-${item}`}>
                    {metaIndex > 0 && (
                      <Box component="span" sx={{ width: 3, height: 3, borderRadius: '50%', background: primary, opacity: 0.8 }} />
                    )}
                    <Box component="span">{item}</Box>
                  </React.Fragment>
                ))}
              </Box>

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
                    <CTAButton variant="primary" size="small" onClick={() => handleProjectClick(webViewSiteHref)}>
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
                      <Button variant="outlined" color="primary" size="small" sx={secondaryBtnSx} onClick={() => handleProjectClick(project.siteUrl!)}>
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
