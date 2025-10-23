'use client'

import { Box, CssBaseline } from '@mui/material'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles'
import React, { createContext, useContext, useEffect, useState } from 'react'

// Thèmes personnalisés
const themes = {
  default: {
    name: 'Default',
    primary: '#3b82f6',
    secondary: '#059669',
    accent: '#ff6b35',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  },
  neon: {
    name: 'Neon',
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  },
  sunset: {
    name: 'Sunset',
    primary: '#ff6b35',
    secondary: '#ff1744',
    accent: '#ffd700',
    background: 'linear-gradient(135deg, #ff6b35 0%, #ff1744 50%, #ffd700 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  },
  ocean: {
    name: 'Ocean',
    primary: '#00bcd4',
    secondary: '#2196f3',
    accent: '#4fc3f7',
    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  },
  forest: {
    name: 'Forest',
    primary: '#4caf50',
    secondary: '#8bc34a',
    accent: '#cddc39',
    background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 50%, #a5d6a7 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  },
  cyber: {
    name: 'Cyber',
    primary: '#9c27b0',
    secondary: '#e91e63',
    accent: '#ff9800',
    background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)',
    darkBackground: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)'
  }
}

interface AdvancedThemeContextType {
  themeName: string
  customTheme: any
  setTheme: (themeName: string) => void
  availableThemes: string[]
}

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined)

export function AdvancedThemeProvider({ children }: { children: React.ReactNode }) {
  const mode: PaletteMode = 'light' // Mode fixe à light
  const [themeName, setThemeName] = useState('default')
  const [customTheme, setCustomTheme] = useState(themes.default)

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeName')
    
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      setThemeName(savedTheme)
      setCustomTheme(themes[savedTheme as keyof typeof themes])
    }
  }, [])

  const setTheme = (newThemeName: string) => {
    if (themes[newThemeName as keyof typeof themes]) {
      setThemeName(newThemeName)
      setCustomTheme(themes[newThemeName as keyof typeof themes])
      localStorage.setItem('themeName', newThemeName)
    }
  }

  // Créer le thème MUI avec les couleurs personnalisées
  const theme = createTheme({
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
        default: mode === 'dark' ? '#0a0a0a' : '#f5f7fa',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff'
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
            background: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 20px 40px ${customTheme.primary}20`
            }
          }
        }
      }
    }
  })

  return (
    <AdvancedThemeContext.Provider
      value={{
        themeName,
        customTheme,
        setTheme,
        availableThemes: Object.keys(themes)
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: customTheme.background,
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
