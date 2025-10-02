'use client'

import { ArrowDropDown, Palette } from '@mui/icons-material'
import {
    Box,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material'
import { useState } from 'react'

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const themes = [
    { name: 'Default', primary: '#3b82f6', secondary: '#059669', bg: '#1e293b' },
    { name: 'Neon', primary: '#00ff88', secondary: '#ff0080', bg: '#0a0a0a' },
    { name: 'Sunset', primary: '#ff6b35', secondary: '#ff1744', bg: '#2d1b1b' },
    { name: 'Ocean', primary: '#00bcd4', secondary: '#2196f3', bg: '#0f172a' },
    { name: 'Forest', primary: '#4caf50', secondary: '#8bc34a', bg: '#0f1f0f' },
    { name: 'Cyber', primary: '#9c27b0', secondary: '#e91e63', bg: '#1a0a1a' }
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeSelect = (themeIndex: number) => {
    setCurrentTheme(themeIndex)
    handleClose()
    
    // Appliquer le thème via CSS variables
    const root = document.documentElement
    const theme = themes[themeIndex]
    root.style.setProperty('--primary-color', theme.primary)
    root.style.setProperty('--secondary-color', theme.secondary)
    root.style.setProperty('--theme-bg', theme.bg)
    
    // Appliquer aussi sur le body pour un effet global
    document.body.style.setProperty('--primary-color', theme.primary)
    document.body.style.setProperty('--secondary-color', theme.secondary)
    document.body.style.setProperty('--theme-bg', theme.bg)
  }

  return (
    <>
      <Tooltip title={`Thème: ${themes[currentTheme].name}`}>
        <IconButton
          onClick={handleClick}
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
          <ArrowDropDown sx={{ ml: 0.5, fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            minWidth: 200
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {themes.map((theme, index) => (
          <MenuItem 
            key={theme.name}
            onClick={() => handleThemeSelect(index)}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(5px)'
              },
              transition: 'all 0.3s ease',
              py: 1.5
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </ListItemIcon>
            <ListItemText 
              primary={theme.name}
              sx={{ 
                '& .MuiListItemText-primary': {
                  fontWeight: currentTheme === index ? 600 : 400,
                  color: currentTheme === index ? theme.primary : 'white'
                }
              }}
            />
            {currentTheme === index && (
              <Chip 
                label="Actif" 
                size="small" 
                sx={{ 
                  bgcolor: theme.primary,
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 20
                }} 
              />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
