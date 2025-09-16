'use client'

import AppBarComponent from '../components/appBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { Snackbar, Alert, Button, Box as MuiBox } from '@mui/material'

const HeaderSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(12, 0, 8),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 23, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)'
      : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.03) 50%, transparent 70%)'
      : 'none',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  }
}))

const ContactCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgba(255, 107, 53, 0.3)' 
    : '1px solid rgba(0,0,0,0.08)',
  borderRadius: 24,
  padding: theme.spacing(4),
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 23, 68, 0.1) 50%, rgba(255, 107, 53, 0.05) 100%)'
      : 'transparent',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #ff6b35, #ff1744, #ff6b35, #ff1744)'
      : 'transparent',
    borderRadius: 26,
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 20px 40px rgba(0,0,0,0.15)',
    '&::before': {
      opacity: 1,
    },
    '&::after': {
      opacity: 1,
    }
  }
}))

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
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(74, 144, 226, 0.4)'
      : '0 8px 25px rgba(102, 126, 234, 0.4)',
  }
}))

const EmailButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #ff6b35 0%, #ff1744 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #059669 100%)',
  color: 'white',
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5),
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 15px rgba(255, 107, 53, 0.4)'
    : '0 4px 15px rgba(30, 58, 138, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #e55a2b 0%, #e91e63 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #047857 100%)',
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(255, 107, 53, 0.6)'
      : '0 8px 25px rgba(30, 58, 138, 0.6)',
  }
}))

export default function Contact() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const emailAddress = 'ijipop82@gmail.com'

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
    <Box sx={{ 
      minHeight: '100vh', 
      background: (theme) => theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 23, 68, 0.05) 0%, transparent 50%)'
          : 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }
    }}>
      <AppBarComponent />
      
      <HeaderSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '4.5rem' },
              textShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 0 20px rgba(255, 107, 53, 0.5), 0 4px 8px rgba(0,0,0,0.8)'
                : '0 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #ff6b35, #ffffff, #ff1744)'
                : 'inherit',
              backgroundClip: (theme) => theme.palette.mode === 'dark' ? 'text' : 'initial',
              WebkitBackgroundClip: (theme) => theme.palette.mode === 'dark' ? 'text' : 'initial',
              WebkitTextFillColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
            }}
          >
            Contact
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Prenons contact et discutons!
          </Typography>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
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
            <SocialIcon>
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon>
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
    </Box>
  )
}
