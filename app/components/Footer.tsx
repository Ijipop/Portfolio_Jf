'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import CodeIcon from '@mui/icons-material/Code'
import { useRouter } from 'next/navigation'
import CTAButton from './shared/CTAButton'
import { DESIGN_TOKENS } from '../design-system/constants'

const FooterContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4, 0, 2),
  marginTop: 'auto',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
    pointerEvents: 'none',
    zIndex: 0,
  }
}))

const SocialIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  margin: theme.spacing(0, 1),
  cursor: 'pointer',
  transition: DESIGN_TOKENS.transitions.normal,
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    background: 'rgba(255,255,255,0.25)',
    transform: 'scale(1.15) translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  }
}))

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const router = useRouter()

  const handleEmailClick = () => {
    router.push('/contact')
  }

  const handleGitHubClick = () => {
    window.open('https://github.com/Ijipop', '_blank')
  }

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/', '_blank')
  }

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
          gap: DESIGN_TOKENS.spacing.xl,
          py: DESIGN_TOKENS.spacing.xl
        }}>
          {/* Section Info */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: DESIGN_TOKENS.spacing.sm }}>
              <CodeIcon sx={{ fontSize: 32, color: 'white' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                Portfolio Web
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: DESIGN_TOKENS.spacing.md, color: 'white' }}>
              Jean-François Lefebvre
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: DESIGN_TOKENS.spacing.md, color: 'white' }}>
              Développeur Full Stack passionné par la création d&apos;applications web modernes et performantes.
            </Typography>
            <CTAButton
              variant="outline"
              size="small"
              onClick={() => router.push('/contact')}
            >
              Me contacter
            </CTAButton>
          </Box>

          {/* Section Liens rapides */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: DESIGN_TOKENS.spacing.md, color: 'white' }}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8, 
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                }}
                onClick={() => router.push('/projets')}
              >
                Mes Projets
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8, 
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                }}
                onClick={() => router.push('/a-propos')}
              >
                À Propos
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8, 
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                }}
                onClick={() => router.push('/contact')}
              >
                Contact
              </Typography>
            </Box>
          </Box>

          {/* Section Social */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: DESIGN_TOKENS.spacing.md, color: 'white' }}>
              Suivez-moi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: DESIGN_TOKENS.spacing.lg }}>
              <SocialIcon onClick={handleGitHubClick} aria-label="GitHub">
                <GitHubIcon />
              </SocialIcon>
              <SocialIcon onClick={handleLinkedInClick} aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialIcon>
              <SocialIcon onClick={handleEmailClick} aria-label="Email">
                <EmailIcon />
              </SocialIcon>
            </Box>
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: DESIGN_TOKENS.spacing.md }}>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem', color: 'white' }}>
                © {currentYear} Tous droits réservés
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6, fontSize: '0.7rem', mt: 0.5, color: 'white' }}>
                Construit avec Next.js & Material-UI
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  )
}
