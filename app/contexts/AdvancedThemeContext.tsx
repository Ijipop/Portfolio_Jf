'use client'

import { Box, CssBaseline } from '@mui/material'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, ThemeName, getDefaultTheme, getAvailableThemes } from '../design-system/themes'

interface AdvancedThemeContextType {
  themeName: ThemeName
  customTheme: any
  setTheme: (themeName: ThemeName) => void
  availableThemes: string[]
}

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined)

export function AdvancedThemeProvider({ children }: { children: React.ReactNode }) {
  const mode: PaletteMode = 'light' // Mode fixe à light
  const [themeName, setThemeName] = useState<ThemeName>('default')
  const customTheme = THEMES[themeName] // Source unique de vérité

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeName') as ThemeName
    
    if (savedTheme && THEMES[savedTheme]) {
      setThemeName(savedTheme)
    }
  }, [])

  const setTheme = (newThemeName: ThemeName) => {
    if (THEMES[newThemeName]) {
      setThemeName(newThemeName)
      localStorage.setItem('themeName', newThemeName)
    }
  }

  // Créer le thème MUI avec les couleurs personnalisées
  // Utiliser useMemo pour recréer le thème quand customTheme change
  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: customTheme.primary,
        light: customTheme.primary + '80',
        dark: customTheme.primary + 'CC'
      },
      secondary: {
        main: customTheme.secondary,
        light: customTheme.secondary + '80',
        dark: customTheme.secondary + 'CC'
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff'
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.3
      },
      h3: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.4
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${customTheme.primary}40`
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 20px 40px ${customTheme.primary}20`
            }
          }
        }
      }
    }
  }), [customTheme, mode])

  return (
    <AdvancedThemeContext.Provider
      value={{
        themeName,
        customTheme,
        setTheme,
        availableThemes: getAvailableThemes()
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: `linear-gradient(135deg, ${customTheme.bg} 0%, ${customTheme.bg2} 25%, ${customTheme.bg} 50%, ${customTheme.bg2} 75%, ${customTheme.bg} 100%)`,
            minHeight: '100vh',
            transition: 'background 0.5s ease'
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </AdvancedThemeContext.Provider>
  )
}

export function useAdvancedTheme() {
  const context = useContext(AdvancedThemeContext)
  if (context === undefined) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider')
  }
  return context
}
