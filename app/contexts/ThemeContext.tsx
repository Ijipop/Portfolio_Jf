'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3a8a', // Bleu professionnel profond
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#059669', // Vert émeraude sophistiqué
      light: '#10b981',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Gris très clair et élégant
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Bleu vif pour le mode sombre
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Vert émeraude lumineux
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a', // Bleu très sombre élégant
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
})

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
