'use client'

import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HandshakeIcon from '@mui/icons-material/Handshake'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import { Alert, Snackbar, TextField, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import Image from 'next/image'
import ThreeDCardComponent from '../../components/ThreeDCard'
import HeaderSection from '../../components/shared/HeaderSection'
import IjipopGlitchTitle from '../../components/shared/IjipopGlitchTitle'
import AppBarComponent from '../../components/appBar'
import PageWrapper from '../../components/shared/PageWrapper'
import InteractiveBackgroundSection from '../../components/shared/InteractiveBackgroundSection'
import Footer from '../../components/Footer'
import CTAButton from '../../components/shared/CTAButton'
import ProjectWebBriefSection, {
  emptyProjectWebBrief,
  type ProjectWebBriefState,
} from '../../components/contact/ProjectWebBriefSection'
import AiLeadDiagnosis, {
  type AiLeadDiagnosisResult,
} from '../../components/contact/AiLeadDiagnosis'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { useTextColor } from '../../hooks/useTextColor'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useLanguage } from '../../contexts/LanguageContext'

const SocialCardContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  minHeight: 0,
}))

const SocialIconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: DESIGN_TOKENS.transitions.normal,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(74, 144, 226, 0.3)'
    : '0 4px 20px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(74, 144, 226, 0.5)'
      : '0 8px 30px rgba(102, 126, 234, 0.5)',
  }
}))

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'helperTextColor',
})<{ textColor?: string; helperTextColor?: string }>(({ theme, textColor, helperTextColor }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    transition: DESIGN_TOKENS.transitions.normal,
    color: textColor || '#ffffff',
    '& .MuiOutlinedInput-input': {
      color: textColor || '#ffffff',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: textColor || '#ffffff',
    '&.Mui-focused': {
      color: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
    },
  },
  '& .MuiFormHelperText-root': {
    color: helperTextColor || 'rgba(255, 255, 255, 0.7)',
  },
}))

export default function Contact() {
  const theme = useTheme()
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'))
  const isTallViewport = useMediaQuery('(min-height: 1000px)', { noSsr: true })
  const useCompactContact = !isXlUp || !isTallViewport
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const { t } = useLanguage()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [montrealImgError, setMontrealImgError] = useState(false)
  
  // Formulaire de contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    /** Honeypot anti-bot : doit rester vide (champ masqué). */
    bm_verify: '',
  })
  const [includeProjectWeb, setIncludeProjectWeb] = useState(false)
  const [projectWeb, setProjectWeb] = useState<ProjectWebBriefState>(() => emptyProjectWebBrief())
  const [aiDiagnosis, setAiDiagnosis] = useState<AiLeadDiagnosisResult | null>(null)
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactPromises = [
    { icon: AccessTimeIcon, label: t('contact.promiseResponse') },
    { icon: HandshakeIcon, label: t('contact.promiseCall') },
    { icon: RequestQuoteIcon, label: t('contact.promiseEstimate') },
  ]

  const handleGitHubClick = () => {
    window.open('https://github.com/Ijipop', '_blank')
  }

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/', '_blank')
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const validateField = (name: string, value: string) => {
    let error = ''
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Le nom est requis'
        } else if (value.trim().length < 2) {
          error = 'Le nom doit contenir au moins 2 caractères'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'L\'email est requis'
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            error = 'Format d\'email invalide'
          }
        }
        break
      case 'subject':
        if (!value.trim()) {
          error = 'Le sujet est requis'
        } else if (value.trim().length < 3) {
          error = 'Le sujet doit contenir au moins 3 caractères'
        }
        break
      case 'message':
        if (!value.trim()) {
          error = 'Le message est requis'
        } else if (value.trim().length < 10) {
          error = 'Le message doit contenir au moins 10 caractères'
        }
        break
      case 'bm_verify':
        break
    }
    
    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name !== 'bm_verify') {
      setAiDiagnosis(null)
    }
    
    // Validation en temps réel
    const error = validateField(name, value)
    setFormErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleIncludeProjectWebChange = (next: boolean) => {
    setIncludeProjectWeb(next)
    setAiDiagnosis(null)
  }

  const handleProjectWebChange = (next: ProjectWebBriefState) => {
    setProjectWeb(next)
    setAiDiagnosis(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Valider tous les champs
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    }
    
    setFormErrors(errors)
    
    // Vérifier s'il y a des erreurs
    if (Object.values(errors).some(error => error !== '')) {
      setSnackbarMessage(t('contact.formErrors'))
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(includeProjectWeb ? { projectWeb } : {}),
          ...(aiDiagnosis ? { aiDiagnosis } : {}),
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        const topologyScroll =
          typeof document !== 'undefined'
            ? (document.querySelector('.topology-scroll-container') as HTMLElement | null)
            : null
        const scrollTopBefore = topologyScroll?.scrollTop ?? 0

        setSnackbarMessage(data.message || t('contact.sendSuccess'))
        setSnackbarSeverity('success')
        setFormData({ name: '', email: '', subject: '', message: '', bm_verify: '' })
        setFormErrors({ name: '', email: '', subject: '', message: '' })
        setIncludeProjectWeb(false)
        setProjectWeb(emptyProjectWebBrief())
        setAiDiagnosis(null)

        const restoreScroll = () => {
          const el = document.querySelector('.topology-scroll-container') as HTMLElement | null
          if (el) el.scrollTop = scrollTopBefore
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(restoreScroll)
        })
      } else {
        setSnackbarMessage(data.error || t('contact.sendError'))
        setSnackbarSeverity('error')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setSnackbarMessage(t('contact.networkError'))
      setSnackbarSeverity('error')
    } finally {
      setIsSubmitting(false)
      setSnackbarOpen(true)
    }
  }

  return (
    <PageWrapper backgroundVariant="alternate">
      <AppBarComponent />
      
      <HeaderSection 
        title={<IjipopGlitchTitle text={t('contact.title')} />}
        subtitle={t('contact.subtitle')}
      />

      <InteractiveBackgroundSection>
      <Container maxWidth="lg" sx={{ py: useCompactContact ? 4 : 8, position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1.25,
            mb: useCompactContact ? 3 : 4,
          }}
        >
          {contactPromises.map(({ icon: Icon, label }) => (
            <Box
              key={label}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.85,
                px: { xs: 1.4, sm: 1.75 },
                py: 1,
                borderRadius: 999,
                border: `1px solid ${primary}42`,
                color: textColor,
                background: `${primary}10`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: { xs: '0.78rem', sm: '0.86rem' },
                fontWeight: 800,
                letterSpacing: '0.02em',
              }}
            >
              <Icon sx={{ fontSize: 18, color: primary }} />
              {label}
            </Box>
          ))}
        </Box>
        {/* Formulaire de contact */}
        <Box sx={{ 
          maxWidth: '800px',
          margin: '0 auto',
          mb: useCompactContact ? 4 : 6,
        }}>
          <ThreeDCardComponent
            floatingElements={2}
            sx={{ padding: { xs: 2, sm: 3 } }}
            borderBeam={{
              duration: 45,
              size: 220,
              ...(theme.palette.mode === 'dark'
                ? {
                    colorFrom: '#ff6b35',
                    colorTo: '#6b6b6f',
                  }
                : {
                    colorFrom: '#ea580c',
                    colorTo: '#948c82',
                  }),
            }}
          >
            <Box sx={{ textAlign: 'center', mb: useCompactContact ? 2 : 3 }}>
              <EmailIcon sx={{ fontSize: 48, color: primary, mb: 1.5 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: primary }}>
                {t('contact.sendMessage')}
              </Typography>
              <Typography variant="body1" sx={{ color: textColor, opacity: 0.9 }}>
                {t('contact.sendMessageDesc')}
              </Typography>
            </Box>
            
            <Box data-testid="contact-form" component="form" onSubmit={handleSubmit} sx={{ mt: useCompactContact ? 2 : 3, position: 'relative' }}>
              <input
                type="text"
                name="bm_verify"
                value={formData.bm_verify}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />
              <Box sx={{ display: 'grid', gap: useCompactContact ? 2 : 2.5, mb: useCompactContact ? 2 : 2.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <StyledTextField
                    name="name"
                    label={t('contact.formName')}
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                    fullWidth
                    textColor={textColor}
                    helperTextColor={`${textColor}B3`}
                  />
                  <StyledTextField
                    name="email"
                    label={t('contact.formEmail')}
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                    fullWidth
                    textColor={textColor}
                    helperTextColor={`${textColor}B3`}
                  />
                </Box>
                
                <StyledTextField
                  name="subject"
                  label={t('contact.formSubject')}
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={!!formErrors.subject}
                  helperText={formErrors.subject}
                  required
                  fullWidth
                  textColor={textColor}
                  helperTextColor={`${textColor}B3`}
                />
                
                <StyledTextField
                  name="message"
                  label={t('contact.formMessage')}
                  value={formData.message}
                  onChange={handleInputChange}
                  error={!!formErrors.message}
                  helperText={formErrors.message}
                  required
                  fullWidth
                  multiline
                  rows={useCompactContact ? 4 : 6}
                  textColor={textColor}
                  helperTextColor={`${textColor}B3`}
                />

                <ProjectWebBriefSection
                  include={includeProjectWeb}
                  onIncludeChange={handleIncludeProjectWebChange}
                  value={projectWeb}
                  onChange={handleProjectWebChange}
                  textColor={textColor}
                  compact={useCompactContact}
                />

                <AiLeadDiagnosis
                  formData={formData}
                  projectWeb={projectWeb}
                  includeProjectWeb={includeProjectWeb}
                  value={aiDiagnosis}
                  onChange={setAiDiagnosis}
                  textColor={textColor}
                  compact={useCompactContact}
                />
              </Box>
              
              <CTAButton
                variant="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              >
                {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
              </CTAButton>
            </Box>
          </ThreeDCardComponent>
        </Box>

        <Box sx={{ maxWidth: 420, mx: 'auto', mb: useCompactContact ? 4 : 6 }}>
          <ThreeDCardComponent floatingElements={2} sx={{ minHeight: { xs: 230, sm: 260 }, padding: { xs: 2, sm: 2.5, md: 3 } }}>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-start' }}>
              <LocationOnIcon sx={{ fontSize: 40, color: primary, mb: 1.5 }} />
              <Typography variant="h6" gutterBottom sx={{ color: primary }}>
                {t('contact.location')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5, color: textColor, opacity: 0.8 }}>
                {t('contact.locationCity')}
              </Typography>
              {!montrealImgError ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 150, sm: 180 },
                    aspectRatio: '1 / 1',
                    borderRadius: 1,
                    overflow: 'hidden',
                    display: 'block',
                    mx: 'auto',
                  }}
                >
                  <Image
                    src="/imgs/images/montreal.png"
                    alt="Montréal"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    onError={() => setMontrealImgError(true)}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: { xs: 150, sm: 180 },
                    aspectRatio: '1 / 1',
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    mx: 'auto',
                  }}
                >
                  Montréal
                </Box>
              )}
            </Box>
          </ThreeDCardComponent>
        </Box>

        <Box sx={{ mt: useCompactContact ? 4 : 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 700, color: primary }}>
            {t('contact.followMe')}
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 4,
            maxWidth: '600px',
            mx: 'auto',
            alignItems: 'stretch',
          }}>
            <ThreeDCardComponent onClick={handleLinkedInClick} floatingElements={2} sx={{ height: '100%', minHeight: { xs: 220, sm: 240 }, padding: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', '& .MuiCardContent-root': { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 } }}>
              <SocialCardContent>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <SocialIconWrapper>
                    <LinkedInIcon sx={{ fontSize: 40 }} />
                  </SocialIconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: primary }}>
                    LinkedIn
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                    {t('contact.linkedInDesc')}
                  </Typography>
                </Box>
                <CTAButton variant="outline" size="small" fullWidth>
                  {t('contact.viewProfile')}
                </CTAButton>
              </SocialCardContent>
            </ThreeDCardComponent>

            <ThreeDCardComponent onClick={handleGitHubClick} floatingElements={2} sx={{ height: '100%', minHeight: { xs: 220, sm: 240 }, padding: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', '& .MuiCardContent-root': { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 } }}>
              <SocialCardContent>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <SocialIconWrapper>
                    <GitHubIcon sx={{ fontSize: 40 }} />
                  </SocialIconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: primary }}>
                    GitHub
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                    {t('contact.githubDesc')}
                  </Typography>
                </Box>
                <CTAButton variant="outline" size="small" fullWidth>
                  {t('contact.viewRepos')}
                </CTAButton>
              </SocialCardContent>
            </ThreeDCardComponent>
          </Box>
        </Box>
      </Container>
      </InteractiveBackgroundSection>

      {/* Snackbar pour confirmer la copie */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          icon={snackbarSeverity === 'success' ? <CheckCircleIcon /> : undefined}
          sx={{ 
            width: '100%',
            background: snackbarSeverity === 'success'
              ? (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                : 'linear-gradient(135deg, #059669 0%, #047857 100%)'
              : (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <Footer />
    </PageWrapper>
  )
}
