'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { styled, alpha } from '@mui/material/styles'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { navigateProjectUrl } from '@/lib/navigateProjectUrl'
import { getImageUrl } from '@/lib/getImageUrl'
import React from 'react'
import AppBarComponent from '../../components/appBar'
import ProjectsLoadingFrameSection from './ProjectsLoadingFrameSection'
import ScrollReveal from '../../components/shared/ScrollReveal'
import HeaderSection from '../../components/shared/HeaderSection'
import IjipopGlitchTitle from '../../components/shared/IjipopGlitchTitle'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { DESIGN_TOKENS, GRADIENTS } from '../../design-system/constants'
import { usePresentationMode } from '../../contexts/PresentationModeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import type { Project, TimelendrLatestLinks } from './projectTypes'
import { ProjectsGrid } from './components/projectsGrid'
import ProjectsStatsStrip from './components/ProjectsStatsStrip'
import ProjectCard from './components/ProjectCard'
import CTAButton from '../../components/shared/CTAButton'
import Link from 'next/link'

const AnimatedBox = styled(Box)({
  animation: 'fadeIn 0.6s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
})

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

export default function Projets() {
  const router = useRouter()
  const pathname = usePathname()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
  const { mode: presentationMode } = usePresentationMode()
  /** Couleurs de section alignées sur la palette / thème courant (Créa et Site). */
  const projetsSectionText = textColor
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProjectType, setSelectedProjectType] = useState<'logiciel' | 'web'>('web')
  const [timelendrWindowsUrl, setTimelendrWindowsUrl] = useState<string | null>(null)
  const [timelendrMacosUrl, setTimelendrMacosUrl] = useState<string | null>(null)
  /** 0 = perso, 1 = pro — défaut pro comme l’ancien accordéon « Réalisations professionnelles » ouvert. */
  const [webAudienceTab, setWebAudienceTab] = useState(1)

  const sectionGlassBg = useCardBackgroundFromThemeVars(GRADIENTS.cards.light)
  const glassProjectSectionSurfaceSx = useMemo(
    () =>
      ({
        background: `${sectionGlassBg} !important`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${primary}22 !important`,
        borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
        boxShadow: `0 2px 16px ${primary}10, inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
        overflow: 'hidden',
        transition: DESIGN_TOKENS.transitions.normal,
        '&:hover': {
          border: `1px solid ${primary}38 !important`,
          boxShadow: `0 4px 20px ${primary}14, inset 0 1px 0 rgba(255, 255, 255, 0.16)`,
        },
      }) as const,
    [sectionGlassBg, primary],
  )

  const webSectionSurfaceSx = useMemo(() => {
    if (presentationMode === 'beige') {
      return {
        background: 'transparent !important',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: `1px solid ${primary}22`,
        borderRadius: `${DESIGN_TOKENS.borderRadius.medium}px`,
        boxShadow: 'none',
        overflow: 'hidden',
        transition: DESIGN_TOKENS.transitions.normal,
        '&:hover': {
          border: `1px solid ${primary}32`,
          boxShadow: 'none',
        },
      } as const
    }
    return glassProjectSectionSurfaceSx
  }, [presentationMode, glassProjectSectionSurfaceSx, primary])

  useEffect(() => {
    fetchProjects()
    fetchTimelendrReleases()
  }, [])

  const readTypeFromLocation = useCallback(() => {
    if (typeof window === 'undefined') return
    const type = new URLSearchParams(window.location.search).get('type')
    if (type === 'logiciel' || type === 'web') {
      setSelectedProjectType(type)
    }
  }, [])

  useEffect(() => {
    readTypeFromLocation()
  }, [readTypeFromLocation])

  useEffect(() => {
    const onPop = () => readTypeFromLocation()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [readTypeFromLocation])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', { cache: 'no-store' })
      const data = await response.json()

      if (data.success) {
        setProjects(data.data)
      } else {
        setError('Erreur lors du chargement des projets')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const fetchTimelendrReleases = async () => {
    try {
      const response = await fetch('/api/timelendr/releases?mode=latest')
      const data = await response.json()
      if (!data?.success || !data.data) return
      const latestLinks = data.data as TimelendrLatestLinks

      setTimelendrWindowsUrl(latestLinks.windowsUrl)
      setTimelendrMacosUrl(latestLinks.macosUrl)
    } catch {
      // Ignore silencieusement
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminee':
      case 'fini':
      case 'terminé':
        return 'success' as const
      case 'wip':
      case 'en cours':
      case 'en cours de développement':
        return 'warning' as const
      case 'planifiee':
      case 'planifié':
      case 'planifiée':
        return 'info' as const
      case 'non':
      case 'non défini':
        return 'error' as const
      default:
        return 'default' as const
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
    [router],
  )

  const handleProjectTypeChange = (_: React.MouseEvent<HTMLElement>, next: 'web' | 'logiciel' | null) => {
    if (!next) return
    setSelectedProjectType(next)
    router.replace(`${pathname}?type=${next}`, { scroll: false })
  }

  const getCompletedProjects = () =>
    projects.filter((p) => ['terminee', 'fini', 'terminé'].includes(p.status.toLowerCase())).length

  const getInProgressProjects = () =>
    projects.filter((p) => ['wip', 'en cours', 'en cours de développement'].includes(p.status.toLowerCase())).length

  const projectsByType = projects.filter((project) => (project.projectType ?? 'web') === selectedProjectType)

  const orderedProjects = [...projectsByType].sort((a, b) => {
    const orderA = a.displayOrder ?? 0
    const orderB = b.displayOrder ?? 0
    if (orderA !== orderB) return orderA - orderB
    return a.id - b.id
  })

  const webPersonalProjects = orderedProjects.filter((p) => p.webAudience === 'personal')
  const webProfessionalProjects = orderedProjects.filter((p) => p.webAudience !== 'personal')

  if (loading) {
    return (
      <PageWrapper backgroundVariant="default">
        <AppBarComponent />
        <InteractiveBackgroundSection>
          <Container
            maxWidth="lg"
            sx={{
              mt: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 'min(55dvh, 520px)', sm: '58vh' },
              px: { xs: 1.5, sm: 2 },
              width: '100%',
            }}
          >
            <ProjectsLoadingFrameSection />
          </Container>
        </InteractiveBackgroundSection>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper backgroundVariant="default" overlayVariant="light" overflowX="hidden" overflowY="auto">
      <AppBarComponent />

      <HeaderSection title={<IjipopGlitchTitle text={t('projects.title')} />} subtitle={t('projects.subtitle')} />

      <InteractiveBackgroundSection>
        <Container maxWidth="lg" sx={{ pt: { xs: 2, sm: 3 }, pb: 0, px: { xs: 1.5, sm: 3 } }}>
          <ScrollReveal direction="up" delay={0.04}>
            <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 3, md: 4 } }}>
              <Typography
                sx={{
                  color: textColor,
                  opacity: 0.9,
                  lineHeight: 1.65,
                  mb: 2.5,
                  fontSize: { xs: '0.98rem', sm: '1.05rem' },
                }}
              >
                {t('projects.heroCommercialLead')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  href={`/portfolio/contact?subject=${encodeURIComponent(t('projects.heroCommercialSubject'))}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CTAButton variant="primary" size="large">
                    {t('projects.heroCommercialCta')}
                  </CTAButton>
                </Link>
                <Link href="/creation-site-web-montreal" style={{ textDecoration: 'none' }}>
                  <CTAButton variant="outline" size="large">
                    {t('projects.heroCommercialSecondary')}
                  </CTAButton>
                </Link>
              </Box>
            </Box>
          </ScrollReveal>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 4, xl: 5 }, position: 'relative', zIndex: 2 }}>
          {error && (
            <AnimatedBox>
              <Alert severity="error" sx={{ mb: 4, borderRadius: DESIGN_TOKENS.borderRadius.small }}>
                {error}
              </Alert>
            </AnimatedBox>
          )}

          <ScrollReveal direction="up" delay={0.05}>
            <ProjectsStatsStrip
              total={projects.length}
              completed={getCompletedProjects()}
              inProgress={getInProgressProjects()}
              t={t}
              containerSx={webSectionSurfaceSx}
              textColor={projetsSectionText}
              primary={primary}
            />
          </ScrollReveal>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={selectedProjectType}
              onChange={handleProjectTypeChange}
              aria-label={t('projects.title')}
              sx={{
                '& .MuiToggleButton-root': {
                  px: { xs: 2, sm: 2.5 },
                  py: 1,
                  fontWeight: 700,
                  textTransform: 'none',
                  borderColor: `${alpha(primary, 0.35)} !important`,
                  color: projetsSectionText,
                  '&.Mui-selected': {
                    bgcolor: alpha(primary, 0.18),
                    color: primary,
                  },
                },
              }}
            >
              <ToggleButton value="web">{t('nav.webSites')}</ToggleButton>
              <ToggleButton value="logiciel">{t('nav.software')}</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {selectedProjectType === 'web' ? (
            <Box sx={{ ...webSectionSurfaceSx, px: { xs: 0.5, sm: 1 }, pt: 1, pb: 1.5 }}>
              <Tabs
                value={webAudienceTab}
                onChange={(_, v) => setWebAudienceTab(v as number)}
                variant="fullWidth"
                sx={{
                  minHeight: 44,
                  mb: 1.5,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    color: alpha(projetsSectionText, 0.72),
                    '&.Mui-selected': {
                      color: projetsSectionText,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 1,
                    bgcolor: primary,
                  },
                }}
              >
                <Tab label={t('projects.webSectionPersonalTitle')} />
                <Tab label={t('projects.webSectionProfessionalTitle')} />
              </Tabs>

              {webAudienceTab === 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      px: 0.5,
                      color: projetsSectionText,
                      opacity: 0.82,
                    }}
                  >
                    {t('projects.webSectionPersonalSubtitle')}
                  </Typography>
                  {webPersonalProjects.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ px: 0.5, color: projetsSectionText, opacity: 0.75 }}
                    >
                      {t('projects.webSectionEmpty')}
                    </Typography>
                  ) : (
                    <ProjectsGrid>
                      {webPersonalProjects.map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          handleProjectClick={handleProjectClick}
                          getStatusIcon={getStatusIcon}
                          getStatusColor={getStatusColor}
                          resolveImageUrl={getImageUrl}
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
                </Box>
              )}

              {webAudienceTab === 1 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      px: 0.5,
                      color: projetsSectionText,
                      opacity: 0.82,
                    }}
                  >
                    {t('projects.webSectionProfessionalSubtitle')}
                  </Typography>
                  {webProfessionalProjects.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ px: 0.5, color: projetsSectionText, opacity: 0.75 }}
                    >
                      {t('projects.webSectionEmpty')}
                    </Typography>
                  ) : (
                    <ProjectsGrid>
                      {webProfessionalProjects.map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          handleProjectClick={handleProjectClick}
                          getStatusIcon={getStatusIcon}
                          getStatusColor={getStatusColor}
                          resolveImageUrl={getImageUrl}
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
                </Box>
              )}
            </Box>
          ) : (
            <ProjectsGrid>
              {orderedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  handleProjectClick={handleProjectClick}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  resolveImageUrl={getImageUrl}
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

          {projectsByType.length === 0 && !error && (
            <AnimatedBox>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  background: 'white',
                  borderRadius: DESIGN_TOKENS.borderRadius.small,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <CodeIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {selectedProjectType === 'logiciel' ? t('projects.emptyLogiciel') : t('projects.emptyWeb')}
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
