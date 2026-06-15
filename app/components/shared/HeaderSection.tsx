'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ReactNode, forwardRef, isValidElement, useEffect, useState } from 'react'
import { DESIGN_TOKENS } from '../../design-system/constants'
import { THEMES } from '../../design-system/themes'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useTextColor } from '../../hooks/useTextColor'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import { usePathname } from 'next/navigation'
import { siteDarkGlassSurface, siteLightGlassSurface } from '@/design-system/siteDarkSurfaces'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'
import { alpha, useTheme } from '@mui/material/styles'

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
  fullViewport?: boolean
}

const HeaderSection = forwardRef<HTMLDivElement, HeaderSectionProps>(function HeaderSection(
  { title, subtitle, tagline, children, fullViewport = false },
  ref,
) {
  const titleIsGlitch = isValidElement(title)
  const subtitleIsElement = isValidElement(subtitle)
  const { primary, secondary, accent } = useThemeColors()
  const textColor = useTextColor()
  const theme = useTheme()
  const { customTheme } = useAdvancedTheme()
  const siteDarkChrome = useSiteDarkChrome()
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

  const fullViewportSurfaceBg = siteDarkChrome
    ? `radial-gradient(90% 70% at 50% -12%, ${SITE_DARK.brandGlowStrong} 0%, transparent 58%),
    radial-gradient(64% 56% at 12% 24%, ${SITE_DARK.brandGlow} 0%, transparent 52%),
    linear-gradient(145deg, ${SITE_DARK.surface} 0%, rgba(8, 8, 12, 0.92) 52%, ${SITE_DARK.surface} 100%)`
    : `radial-gradient(90% 70% at 50% -12%, ${alpha(primary, 0.2)} 0%, transparent 58%),
    radial-gradient(64% 56% at 12% 24%, ${alpha(accent, 0.14)} 0%, transparent 52%),
    radial-gradient(58% 52% at 88% 30%, ${alpha(secondary, 0.16)} 0%, transparent 54%),
    linear-gradient(145deg, ${SITE_LIGHT.surface} 0%, rgba(255, 254, 251, 0.9) 52%, ${SITE_LIGHT.surface} 100%)`

  const heroPadTop = {
    xs: `calc(${theme.spacing(5.5)} + var(--app-bar-height, 56px))`,
    sm: `calc(${theme.spacing(8)} + var(--app-bar-height, 64px))`,
    md: 'calc(86px + var(--app-bar-height, 64px))',
    lg: 'calc(108px + var(--app-bar-height, 64px))',
    xl: 'calc(132px + var(--app-bar-height, 64px))',
  }
  
  return (
    <Box
      ref={ref}
      sx={{
        background: fullViewport
          ? fullViewportSurfaceBg
          : siteDarkChrome
            ? siteDarkGlassSurface.background
            : siteLightGlassSurface.background,
        backdropFilter: 'blur(18px) saturate(1.18)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.18)',
        ...(siteDarkChrome && !fullViewport ? siteDarkGlassSurface : {}),
        ...(!siteDarkChrome && !fullViewport ? siteLightGlassSurface : {}),
        borderBottom: siteDarkChrome
          ? `1px solid ${SITE_DARK.border}`
          : `1px solid ${SITE_LIGHT.border}`,
        boxShadow: fullViewport
          ? `0 18px 70px ${alpha(primary, 0.18)}, inset 0 1px 0 ${alpha('#ffffff', 0.26)}`
          : '0 6px 18px rgba(2, 6, 23, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        color: textColor,
        padding: fullViewport
          ? {
              xs: `${heroPadTop.xs} 0 ${theme.spacing(4)}`,
              sm: `${heroPadTop.sm} 0 ${theme.spacing(5)}`,
              md: `${heroPadTop.md} 0 44px`,
              lg: `${heroPadTop.lg} 0 52px`,
              xl: `${heroPadTop.xl} 0 60px`,
            }
          : theme.spacing(3.5, 0, 2.5),
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...(fullViewport && {
          /** Le fond remonte sous l’AppBar sticky — supprime la bande claire entre navbar et hero. */
          marginTop: 'calc(-1 * var(--app-bar-height, 64px))',
          /** Plein écran : la hauteur navbar est déjà compensée par marginTop + padding-top. */
          minHeight: {
            xs: '100svh',
            sm: '100dvh',
          },
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }),
        [theme.breakpoints.down('sm')]: {
          padding: fullViewport
            ? `calc(${theme.spacing(3.5)} + var(--app-bar-height, 56px)) 8px ${theme.spacing(3.25)}`
            : theme.spacing(2.5, 1, 2),
        },
        ...(fullViewport && {
          '@media (max-width: 599.95px) and (max-height: 760px)': {
            padding: `calc(${theme.spacing(3.25)} + var(--app-bar-height, 56px)) 8px ${theme.spacing(3.5)}`,
          },
          '@media (min-width: 900px) and (max-height: 820px)': {
            padding: 'calc(48px + var(--app-bar-height, 64px)) 0 38px',
          },
          '@media (min-width: 900px) and (max-height: 680px)': {
            padding: 'calc(34px + var(--app-bar-height, 64px)) 0 28px',
          },
        }),
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: fullViewport
            ? `linear-gradient(${alpha(primary, 0.08)} 1px, transparent 1px),
               linear-gradient(90deg, ${alpha(primary, 0.08)} 1px, transparent 1px),
               url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: fullViewport ? '52px 52px, 52px 52px, 60px 60px' : undefined,
          opacity: fullViewport ? 0.52 : 1,
          maskImage: fullViewport ? 'linear-gradient(to bottom, black 0%, transparent 78%)' : undefined,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={
          fullViewport
            ? {
                position: 'relative',
                zIndex: 1,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0,
                width: '100%',
              }
            : undefined
        }
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: fullViewport
              ? { xs: 3.35, sm: 7, md: '78px', lg: '92px', xl: '112px' }
              : 1,
            ...(fullViewport && {
              '@media (max-width: 599.95px) and (max-height: 760px)': {
                mb: 2.5,
              },
              '@media (min-width: 900px) and (max-height: 820px)': {
                mb: '42px',
              },
              '@media (min-width: 900px) and (max-height: 680px)': {
                mb: '26px',
              },
            }),
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
                overflowX: 'visible',
                overflowY: 'visible',
                maxWidth: '100%',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
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
})

export default HeaderSection
