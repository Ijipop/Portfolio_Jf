'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ReactNode, isValidElement, useEffect, useState } from 'react'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { THEMES } from '../../design-system/themes'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import { useTheme } from '@mui/material/styles'

// Fonction utilitaire pour convertir hex en rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

interface HeaderSectionProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  tagline?: string | ReactNode
  children?: ReactNode
}

export default function HeaderSection({ title, subtitle, tagline, children }: HeaderSectionProps) {
  const titleIsGlitch = isValidElement(title)
  const subtitleIsElement = isValidElement(subtitle)
  const { primary } = useThemeColors()
  const textColor = useTextColor()
  const theme = useTheme()
  const { customTheme } = useAdvancedTheme()
  const [headerBackground, setHeaderBackground] = useState<string>(
    `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`
  )
  
  // Mettre à jour le background du header quand le thème change
  useEffect(() => {
    const updateHeaderBackground = () => {
      if (typeof window === 'undefined') return
      
      // Lire les CSS variables définies par ThemeSelector
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg')?.trim()
      const bg2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg2')?.trim()
      
      if (bg && bg2) {
        setHeaderBackground(`linear-gradient(135deg, ${bg} 0%, ${bg2} 25%, ${bg} 50%, ${bg2} 75%, ${bg} 100%)`)
      } else {
        setHeaderBackground(
          `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`
        )
      }
    }
    
    updateHeaderBackground()
    
    // Observer les changements de CSS variables
    const observer = new MutationObserver(updateHeaderBackground)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })
    
    const interval = setInterval(updateHeaderBackground, 200)
    
    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [customTheme])
  
  return (
    <Box
      sx={{
        background:
          'linear-gradient(145deg, rgba(255, 255, 255, 0.13) 0%, rgba(241, 245, 249, 0.1) 50%, rgba(255, 255, 255, 0.12) 100%)',
        backdropFilter: 'blur(14px) saturate(1.05)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.22)',
        boxShadow: '0 6px 18px rgba(2, 6, 23, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        color: textColor,
        padding: theme.spacing(3.5, 0, 2.5),
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(2.5, 1, 2),
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 1,
            fontWeight: 900,
            fontSize: titleIsGlitch ? 'inherit' : { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' },
            textShadow: titleIsGlitch ? 'none' : `0 0 20px ${hexToRgba(primary, 0.8)}, 0 4px 8px rgba(0,0,0,0.3)`,
            letterSpacing: titleIsGlitch ? 'inherit' : { xs: '0.05em', sm: '0.1em' },
            textTransform: titleIsGlitch ? 'none' : 'uppercase',
            color: titleIsGlitch ? 'transparent' : primary,
            filter: 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            imageRendering: 'crisp-edges',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            position: 'relative',
            zIndex: 1
          }}
        >
          {title}
        </Typography>
        {subtitle &&
          (subtitleIsElement ? (
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                mx: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
            >
              {subtitle}
            </Box>
          ) : (
            <Typography
              variant="h5"
              component="div"
              sx={{
                opacity: 0.9,
                fontWeight: 300,
                color: textColor,
                fontSize: { xs: '0.95rem', sm: 'inherit' },
                overflowX: { xs: 'visible', sm: 'auto' },
                overflowY: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                maxWidth: '100%',
              }}
            >
              {subtitle}
            </Typography>
          ))}
        {tagline &&
          (isValidElement(tagline) ? (
            <Box
              sx={{
                mt: { xs: 1.25, sm: 1.5 },
                mx: 'auto',
                maxWidth: 960,
                width: '100%',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {tagline}
            </Box>
          ) : (
            <Typography
              variant="body1"
              component="div"
              sx={{
                mt: 1.5,
                mx: 'auto',
                maxWidth: 760,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                fontWeight: 600,
                lineHeight: 1.6,
                color: textColor,
                position: 'relative',
                zIndex: 1,
                whiteSpace: 'pre-line',
              }}
            >
              {tagline}
            </Typography>
          ))}
        {children}
      </Container>
    </Box>
  )
}

