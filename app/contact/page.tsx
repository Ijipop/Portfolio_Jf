'use client'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import SendIcon from '@mui/icons-material/Send'
import { Alert, Button, Box as MuiBox, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import ContactCard from '../components/shared/ContactCard'
import HeaderSection from '../components/shared/HeaderSection'
import AppBarComponent from '../components/appBar'
import PageWrapper from '../components/shared/PageWrapper'
import { DESIGN_TOKENS } from '../design-system/constants'


const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  margin: theme.spacing(1),
  cursor: 'pointer',
  transition: DESIGN_TOKENS.transitions.normal,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(74, 144, 226, 0.4)'
      : '0 8px 25px rgba(102, 126, 234, 0.4)',
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

export default function Contact() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

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
            <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
            <PhoneIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Téléphone
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sur demande!
            </Typography>
          </ContactCard>

          <ContactCard>
            <LocationOnIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Localisation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Montréal, Québec, Canada
            </Typography>
          </ContactCard>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Suivez-moi
          </Typography>
          <Box>
            <SocialIcon onClick={handleLinkedInClick}>
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon onClick={handleGitHubClick}>
              <GitHubIcon />
            </SocialIcon>
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
          severity="success" 
          sx={{ 
            width: '100%',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)'
              : 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageWrapper>
  )
}
