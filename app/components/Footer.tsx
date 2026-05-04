'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import CodeIcon from '@mui/icons-material/Code'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CTAButton from './shared/CTAButton'
import { DESIGN_TOKENS } from '../design-system/constants'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { useThemeColors } from '../hooks/useThemeColors'
import { getTextColorForBackground } from '../utils/colorUtils'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const theme = useTheme()
  const { primary, secondary } = useThemeColors()
  const { customTheme } = useAdvancedTheme()
  const { t } = useLanguage()
  const [footerBackground, setFooterBackground] = useState<string>(
    `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 50%, ${customTheme.bg} 100%)`
  )
  const [textColor, setTextColor] = useState<string>('#ffffff')

  // Mettre à jour le background du footer quand le thème change
  useEffect(() => {
    const updateFooterBackground = () => {
      if (typeof window === 'undefined') return
      
      let newBackground: string
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
      const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
      if (bg && bg2) {
        newBackground = `linear-gradient(135deg, ${bg} 0%, ${bg2} 50%, ${bg} 100%)`
      } else {
        newBackground = `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 50%, ${customTheme.bg} 100%)`
      }
      
      setFooterBackground(newBackground)
      setTextColor(getTextColorForBackground(newBackground))
    }
    
    updateFooterBackground()
    
    const observer = new MutationObserver(updateFooterBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateFooterBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [customTheme])

  const handleEmailClick = () => {
    router.push('/portfolio/contact')
  }

  const handleGitHubClick = () => {
    window.open('https://github.com/Ijipop', '_blank')
  }

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/jean-fran%C3%A7ois-lefebvre-92380329a/', '_blank')
  }

  return (
    <Box
      component="footer"
      aria-label={t('footer.landmarkLabel')}
      sx={{
        background:
          'linear-gradient(145deg, rgba(255, 255, 255, 0.13) 0%, rgba(241, 245, 249, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%) !important',
        backdropFilter: 'blur(14px) saturate(1.05)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
        borderTop: '1px solid rgba(148, 163, 184, 0.22)',
        boxShadow: '0 -6px 18px rgba(2, 6, 23, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        color: `${textColor} !important`,
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
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
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
              <CodeIcon sx={{ fontSize: 32, color: textColor }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: textColor }}>
                {t('home.heroTitle')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: DESIGN_TOKENS.spacing.md, color: textColor }}>
              Jean-François Lefebvre
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: DESIGN_TOKENS.spacing.md, color: textColor }}>
              {t('footer.tagline')}
            </Typography>
            <Link href="/portfolio/contact" style={{ textDecoration: 'none' }}>
              <CTAButton variant="outline" size="small">
                {t('footer.contactButton')}
              </CTAButton>
            </Link>
          </Box>

          {/* Section Liens rapides / Navigation */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: DESIGN_TOKENS.spacing.md, color: textColor }}>
              {t('footer.navigation')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/portfolio/projets" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    transition: DESIGN_TOKENS.transitions.normal,
                    color: textColor,
                    '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                  }}
                >
                  {t('home.cardProjects')}
                </Typography>
              </Link>
              <Link href="/portfolio/a-propos" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    transition: DESIGN_TOKENS.transitions.normal,
                    color: textColor,
                    '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                  }}
                >
                  {t('home.cardAbout')}
                </Typography>
              </Link>
              <Link href="/portfolio/contact" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    transition: DESIGN_TOKENS.transitions.normal,
                    color: textColor,
                    '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                  }}
                >
                  {t('home.cardContact')}
                </Typography>
              </Link>
              <Link href="/portfolio/contact#diagnostic-ia" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    cursor: 'pointer',
                    transition: DESIGN_TOKENS.transitions.normal,
                    color: textColor,
                    '&:hover': { opacity: 1, transform: 'translateX(4px)' }
                  }}
                >
                  {t('home.servicesAiLink')}
                </Typography>
              </Link>
            </Box>
          </Box>

          {/* Section Social */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: DESIGN_TOKENS.spacing.md, color: textColor }}>
              {t('contact.followMe')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: DESIGN_TOKENS.spacing.lg }}>
              <Box
                onClick={handleGitHubClick}
                aria-label="GitHub"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: textColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  color: textColor,
                  margin: theme.spacing(0, 1),
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    background: textColor === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)',
                    transform: 'scale(1.15) translateY(-2px)',
                    boxShadow: `0 4px 12px ${primary}40`,
                  }
                }}
              >
                <GitHubIcon />
              </Box>
              <Box
                onClick={handleLinkedInClick}
                aria-label="LinkedIn"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: textColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  color: textColor,
                  margin: theme.spacing(0, 1),
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    background: textColor === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)',
                    transform: 'scale(1.15) translateY(-2px)',
                    boxShadow: `0 4px 12px ${primary}40`,
                  }
                }}
              >
                <LinkedInIcon />
              </Box>
              <Box
                onClick={handleEmailClick}
                aria-label="Email"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: textColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  color: textColor,
                  margin: theme.spacing(0, 1),
                  cursor: 'pointer',
                  transition: DESIGN_TOKENS.transitions.normal,
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    background: textColor === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)',
                    transform: 'scale(1.15) translateY(-2px)',
                    boxShadow: `0 4px 12px ${primary}40`,
                  }
                }}
              >
                <EmailIcon />
              </Box>
            </Box>
            <Box sx={{ borderTop: `1px solid ${textColor === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, pt: DESIGN_TOKENS.spacing.md }}>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem', color: textColor }}>
                © {currentYear} {t('footer.rights')}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6, fontSize: '0.7rem', mt: 0.5, color: textColor }}>
                {t('footer.builtWith')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
