'use client'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert, Button, Box as MuiBox, Snackbar, TextField, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import ContactCard from '../components/shared/ContactCard'
import HeaderSection from '../components/shared/HeaderSection'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import Footer from '../components/Footer'
import CTAButton from '../components/shared/CTAButton'
import { DESIGN_TOKENS } from '../design-system/constants'
import { useTextColor } from '../hooks/useTextColor'
import { useThemeColors } from '../hooks/useThemeColors'


const SocialCard = styled(ContactCard)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  transition: DESIGN_TOKENS.transitions.slow,
  '&:hover': {
    transform: 'translateY(-8px) scale(1.05)',
  },
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
    transform: 'scale(1.15) rotate(5deg)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(74, 144, 226, 0.5)'
      : '0 8px 30px rgba(102, 126, 234, 0.5)',
  }
}))

const EmailButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
  color: 'white',
  borderRadius: DESIGN_TOKENS.borderRadius.small,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5),
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 15px rgba(74, 85, 104, 0.3)'
    : '0 4px 15px rgba(102, 126, 234, 0.3)',
  transition: DESIGN_TOKENS.transitions.normal,
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #5a6578 0%, #3d4858 100%)'
        : 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(74, 85, 104, 0.4)'
      : '0 8px 25px rgba(102, 126, 234, 0.4)',
  }
}))


const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: DESIGN_TOKENS.borderRadius.small,
    transition: DESIGN_TOKENS.transitions.normal,
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
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.mode === 'dark' ? '#60a5fa' : '#1e3a8a',
  },
}))

export default function Contact() {
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  
  // Formulaire de contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emailAddress = 'ijipop82@gmail.com'

  const handleGitHubClick = () => {
    window.open('https://github.com/Ijipop', '_blank')
  }

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/', '_blank')
  }

  const handleOpenEmail = () => {
    const subject = encodeURIComponent('Contact depuis votre portfolio')
    const body = encodeURIComponent('Bonjour Jean-François,\n\n')
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    window.open(mailtoLink)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setSnackbarMessage('Adresse email copiée !')
      setSnackbarOpen(true)
    } catch (err) {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea')
      textArea.value = emailAddress
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setSnackbarMessage('Adresse email copiée !')
      setSnackbarOpen(true)
    }
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
    }
    
    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validation en temps réel
    const error = validateField(name, value)
    setFormErrors(prev => ({ ...prev, [name]: error }))
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
      setSnackbarMessage('Veuillez corriger les erreurs dans le formulaire')
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
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSnackbarMessage(data.message || 'Message envoyé avec succès !')
        setSnackbarSeverity('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setFormErrors({ name: '', email: '', subject: '', message: '' })
      } else {
        setSnackbarMessage(data.error || 'Erreur lors de l\'envoi du message')
        setSnackbarSeverity('error')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setSnackbarMessage('Erreur de connexion. Veuillez réessayer.')
      setSnackbarSeverity('error')
    } finally {
      setIsSubmitting(false)
      setSnackbarOpen(true)
    }
  }

  return (
    <PageWrapper
      backgroundVariant="alternate"
      particleCount={100}
      particleSpeed={0.5}
      particleColors={['#ff6b35', '#ff1744', '#3b82f6', '#059669']}
    >
      <AppBarComponent />
      
      <HeaderSection 
        title="Contact"
        subtitle="Prenons contact et discutons!"
      />

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          <ContactCard>
            <EmailIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
              {emailAddress}
            </Typography>
            <MuiBox sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <EmailButton
                startIcon={<SendIcon />}
                onClick={handleOpenEmail}
                fullWidth
              >
                Ouvrir Email
              </EmailButton>
              <EmailButton
                startIcon={<ContentCopyIcon />}
                onClick={handleCopyEmail}
                fullWidth
                variant="outlined"
                sx={{
                  background: 'transparent',
                  border: (theme) => theme.palette.mode === 'dark' 
                    ? '2px solid rgba(255, 107, 53, 0.5)' 
                    : '2px solid rgba(30, 58, 138, 0.5)',
                  color: (theme) => theme.palette.mode === 'dark' ? '#ff6b35' : '#1e3a8a',
                  '&:hover': {
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(255, 107, 53, 0.1)' 
                      : 'rgba(30, 58, 138, 0.1)',
                    border: (theme) => theme.palette.mode === 'dark' 
                      ? '2px solid #ff6b35' 
                      : '2px solid #1e3a8a',
                  }
                }}
              >
                Copier
              </EmailButton>
            </MuiBox>
          </ContactCard>

          <ContactCard>
            <PhoneIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Téléphone
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
              Sur demande!
            </Typography>
          </ContactCard>

          <ContactCard>
            <LocationOnIcon sx={{ fontSize: 48, color: primary, mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: textColor }}>
              Localisation
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.8 }}>
              Montréal, Québec, Canada
            </Typography>
          </ContactCard>
        </Box>

        {/* Formulaire de contact */}
        <Box sx={{ 
          gridColumn: { xs: '1fr', md: 'span 3' },
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <ContactCard>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <EmailIcon sx={{ fontSize: 56, color: primary, mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: textColor }}>
              Envoyez-moi un message
            </Typography>
            <Typography variant="body1" sx={{ color: textColor, opacity: 0.9 }}>
              Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Box sx={{ display: 'grid', gap: 3, mb: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                <StyledTextField
                  name="name"
                  label="Nom complet"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                  fullWidth
                />
                <StyledTextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  fullWidth
                />
              </Box>
              
              <StyledTextField
                name="subject"
                label="Sujet"
                value={formData.subject}
                onChange={handleInputChange}
                error={!!formErrors.subject}
                helperText={formErrors.subject}
                required
                fullWidth
              />
              
              <StyledTextField
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleInputChange}
                error={!!formErrors.message}
                helperText={formErrors.message}
                required
                fullWidth
                multiline
                rows={6}
              />
            </Box>
            
            <CTAButton
              variant="primary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </CTAButton>
          </Box>
          </ContactCard>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 700, color: textColor }}>
            Suivez-moi
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            <SocialCard onClick={handleLinkedInClick}>
              <SocialIconWrapper>
                <LinkedInIcon sx={{ fontSize: 40 }} />
              </SocialIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: textColor }}>
                LinkedIn
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                Connectons-nous et échangeons sur nos expériences professionnelles
              </Typography>
              <CTAButton variant="outline" size="small" fullWidth>
                Voir le profil
              </CTAButton>
            </SocialCard>

            <SocialCard onClick={handleGitHubClick}>
              <SocialIconWrapper>
                <GitHubIcon sx={{ fontSize: 40 }} />
              </SocialIconWrapper>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: textColor }}>
                GitHub
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: textColor, opacity: 0.8 }}>
                Découvrez mes projets open source et contributions
              </Typography>
              <CTAButton variant="outline" size="small" fullWidth>
                Voir les repos
              </CTAButton>
            </SocialCard>
          </Box>
        </Box>
      </Container>

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
