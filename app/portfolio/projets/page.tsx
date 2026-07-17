'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { styled, alpha } from '@mui/material/styles'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { navigateProjectUrl } from '@/lib/navigateProjectUrl'
import { getImageUrl } from '@/lib/getImageUrl'
import React from 'react'
import AppBarComponent from '../../components/appBar'
import ProjectsLoadingFrameSection from './ProjectsLoadingFrameSection'
import HeaderSection from '../../components/shared/HeaderSection'
import IjipopGlitchTitle from '../../components/shared/IjipopGlitchTitle'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useLanguage } from '../../contexts/LanguageContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import type { Project, TimelendrLatestLinks } from './projectTypes'
import { ProjectsGrid } from './components/projectsGrid'
import ProjectCard from './components/ProjectCard'
const AnimatedBox = styled(Box)({
  animation: 'fadeIn 0.6s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
})

export default function Projets() {
  const router = useRouter()
  const pathname = usePathname()
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const { t } = useLanguage()
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
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, sm: 4, md: 5, xl: 5 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          {error && (
            <AnimatedBox>
              <Alert severity="error" sx={{ mb: 4, borderRadius: DESIGN_TOKENS.borderRadius.small }}>
                {error}
              </Alert>
            </AnimatedBox>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, md: 4 } }}>
            <ToggleButtonGroup
              exclusive
              size="medium"
              value={selectedProjectType}
              onChange={handleProjectTypeChange}
              aria-label={t('projects.title')}
              sx={{
                p: 0.5,
                borderRadius: '999px',
                border: `1px solid ${alpha(primary, 0.28)}`,
                bgcolor: alpha(primary, 0.06),
                '& .MuiToggleButtonGroup-grouped': {
                  border: 'none !important',
                  borderRadius: '999px !important',
                  mx: 0.25,
                },
                '& .MuiToggleButton-root': {
                  px: { xs: 2.25, sm: 3 },
                  py: 1.1,
                  fontWeight: 700,
                  textTransform: 'none',
                  color: projetsSectionText,
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  '&.Mui-selected': {
                    bgcolor: primary,
                    color: '#fff',
                    boxShadow: `0 8px 22px ${alpha(primary, 0.35)}`,
                    '&:hover': {
                      bgcolor: primary,
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha(primary, 0.12),
                  },
                },
              }}
            >
              <ToggleButton value="web">{t('nav.webSites')}</ToggleButton>
              <ToggleButton value="logiciel">{t('nav.software')}</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {selectedProjectType === 'web' ? (
            <Box sx={{ pt: 0.5, pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2.5, md: 3.5 } }}>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={webAudienceTab === 0 ? 'personal' : 'professional'}
                  onChange={(_, v) => {
                    if (v === 'personal') setWebAudienceTab(0)
                    if (v === 'professional') setWebAudienceTab(1)
                  }}
                  aria-label={t('projects.webSectionPersonalTitle')}
                  sx={{
                    p: 0.4,
                    borderRadius: '999px',
                    border: `1px solid ${alpha(primary, 0.22)}`,
                    bgcolor: alpha(primary, 0.04),
                    '& .MuiToggleButtonGroup-grouped': {
                      border: 'none !important',
                      borderRadius: '999px !important',
                      mx: 0.2,
                    },
                    '& .MuiToggleButton-root': {
                      px: { xs: 1.75, sm: 2.25 },
                      py: 0.85,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      color: alpha(projetsSectionText, 0.78),
                      '&.Mui-selected': {
                        bgcolor: alpha(primary, 0.2),
                        color: primary,
                        '&:hover': { bgcolor: alpha(primary, 0.24) },
                      },
                    },
                  }}
                >
                  <ToggleButton value="personal">{t('projects.webSectionPersonalTitle')}</ToggleButton>
                  <ToggleButton value="professional">{t('projects.webSectionProfessionalTitle')}</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {webAudienceTab === 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2.5,
                      textAlign: 'center',
                      color: projetsSectionText,
                      opacity: 0.78,
                      maxWidth: 520,
                      mx: 'auto',
                    }}
                  >
                    {t('projects.webSectionPersonalSubtitle')}
                  </Typography>
                  {webPersonalProjects.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ textAlign: 'center', color: projetsSectionText, opacity: 0.75 }}
                    >
                      {t('projects.webSectionEmpty')}
                    </Typography>
                  ) : (
                    <ProjectsGrid variant="showcase">
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
                      mb: 2.5,
                      textAlign: 'center',
                      color: projetsSectionText,
                      opacity: 0.78,
                      maxWidth: 520,
                      mx: 'auto',
                    }}
                  >
                    {t('projects.webSectionProfessionalSubtitle')}
                  </Typography>
                  {webProfessionalProjects.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ textAlign: 'center', color: projetsSectionText, opacity: 0.75 }}
                    >
                      {t('projects.webSectionEmpty')}
                    </Typography>
                  ) : (
                    <ProjectsGrid variant="showcase">
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
            <ProjectsGrid variant="showcase">
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
                  openAppLabel={t('projects.openApp')}
                  cardVariant="logiciel"
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
