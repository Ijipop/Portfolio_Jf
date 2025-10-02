'use client'

import { Palette } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(0)
  
  const themes = [
    { name: 'Default', primary: '#3b82f6', secondary: '#059669' },
    { name: 'Neon', primary: '#00ff88', secondary: '#ff0080' },
    { name: 'Sunset', primary: '#ff6b35', secondary: '#ff1744' },
    { name: 'Ocean', primary: '#00bcd4', secondary: '#2196f3' },
    { name: 'Forest', primary: '#4caf50', secondary: '#8bc34a' },
    { name: 'Cyber', primary: '#9c27b0', secondary: '#e91e63' }
  ]

  const handleThemeChange = () => {
    const nextTheme = (currentTheme + 1) % themes.length
    setCurrentTheme(nextTheme)
    
    // Appliquer le thème via CSS variables
    const root = document.documentElement
    root.style.setProperty('--primary-color', themes[nextTheme].primary)
    root.style.setProperty('--secondary-color', themes[nextTheme].secondary)
  }

  return (
    <Tooltip title={`Thème: ${themes[currentTheme].name}`}>
      <IconButton
        onClick={handleThemeChange}
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Palette />
      </IconButton>
    </Tooltip>
  )
}
