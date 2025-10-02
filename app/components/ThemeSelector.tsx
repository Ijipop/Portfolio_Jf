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
import { useEffect, useState } from 'react'

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  // Appliquer le thème au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      const themeIndex = parseInt(savedTheme)
      setCurrentTheme(themeIndex)
      applyTheme(themeIndex)
    }
  }, [])
  
  const themes = [
    { name: 'Default', primary: '#1e3a8a', secondary: '#059669', bg: '#f8fafc', bg2: '#ffffff', isDefault: true },
    { name: 'Neon', primary: '#00ff88', secondary: '#ff0080', bg: '#0a0a0a', bg2: '#000000' },
    { name: 'Sunset', primary: '#ff6b35', secondary: '#ff1744', bg: '#2d1b1b', bg2: '#1a0f0f' },
    { name: 'Ocean', primary: '#00bcd4', secondary: '#2196f3', bg: '#0f172a', bg2: '#0a0f1a' },
    { name: 'Forest', primary: '#4caf50', secondary: '#8bc34a', bg: '#0f1f0f', bg2: '#0a1a0a' },
    { name: 'Cyber', primary: '#9c27b0', secondary: '#e91e63', bg: '#1a0a1a', bg2: '#0f0a1a' }
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // Fonction pour appliquer un thème
  const applyTheme = (themeIndex: number) => {
    const theme = themes[themeIndex]
    
    console.log('🎨 Applying theme:', theme.name, theme.primary)
    
    // Si c'est le thème Default, on reset seulement en light mode
    if (theme.isDefault) {
      console.log('🔄 Resetting to default MUI theme...')
      
      // Vérifier si on est en dark mode
      const isDarkMode = document.documentElement.getAttribute('data-mui-color-scheme') === 'dark'
      
      if (!isDarkMode) {
        // Reset CSS variables seulement en light mode
        const root = document.documentElement
        root.style.removeProperty('--primary-color')
        root.style.removeProperty('--secondary-color')
        root.style.removeProperty('--theme-bg')
        root.style.removeProperty('--theme-bg2')
        
        // Reset body background
        document.body.style.removeProperty('background')
        
        // Reset tous les styles inline
        setTimeout(() => {
          const allElements = document.querySelectorAll('*')
          allElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.removeProperty('color')
              element.style.removeProperty('text-shadow')
              element.style.removeProperty('border-color')
              element.style.removeProperty('box-shadow')
              element.style.removeProperty('background')
            }
          })
          console.log('✅ Default theme restored!')
        }, 100)
      } else {
        // En dark mode, garder les couleurs orange par défaut
        const root = document.documentElement
        root.style.setProperty('--primary-color', '#ff6b35')
        root.style.setProperty('--secondary-color', '#ff1744')
        root.style.setProperty('--theme-bg', '#0a0a0a')
        root.style.setProperty('--theme-bg2', '#1a1a1a')
        
        document.body.style.setProperty('background', 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #0a0a0a 50%, #1a1a1a 75%, #0a0a0a 100%)', 'important')
        
        // Forcer les couleurs orange en dark mode
        setTimeout(() => {
          const titles = document.querySelectorAll('h1, .MuiTypography-h1')
          titles.forEach((title) => {
            if (title instanceof HTMLElement) {
              title.style.setProperty('color', '#ff6b35', 'important')
              title.style.setProperty('text-shadow', '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4)', 'important')
            }
          })
          console.log('✅ Dark mode default colors applied!')
        }, 100)
      }
      
      return
    }
    
    // 1. CSS Variables sur le root
    const root = document.documentElement
    root.style.setProperty('--primary-color', theme.primary)
    root.style.setProperty('--secondary-color', theme.secondary)
    root.style.setProperty('--theme-bg', theme.bg)
    root.style.setProperty('--theme-bg2', theme.bg2)
    
    // 2. Background du body avec !important
    document.body.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
    
    // 3. Forcer sur tous les éléments avec un délai
    setTimeout(() => {
      console.log('🔧 Applying styles to elements...')
      
      // Titres principaux
      const titles = document.querySelectorAll('h1, .MuiTypography-h1')
      titles.forEach((title) => {
        if (title instanceof HTMLElement) {
          title.style.setProperty('color', theme.primary, 'important')
          title.style.setProperty('text-shadow', `0 0 20px ${theme.primary}80, 0 0 40px ${theme.primary}40`, 'important')
        }
      })
      
      // Liens
      const links = document.querySelectorAll('a')
      links.forEach((link) => {
        if (link instanceof HTMLElement) {
          link.style.setProperty('color', theme.primary, 'important')
        }
      })
      
      // Icônes
      const icons = document.querySelectorAll('.MuiSvgIcon-root, svg')
      icons.forEach((icon) => {
        if (icon instanceof HTMLElement) {
          icon.style.setProperty('color', theme.primary, 'important')
        }
      })
      
      // Boutons
      const buttons = document.querySelectorAll('.MuiButton-root, button')
      buttons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.style.setProperty('color', theme.primary, 'important')
          button.style.setProperty('border-color', theme.primary, 'important')
        }
      })
      
      // Cards
      const cards = document.querySelectorAll('.MuiCard-root, .MuiPaper-root, [class*="Card"]')
      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          card.style.setProperty('border-color', theme.primary + '40', 'important')
          card.style.setProperty('box-shadow', `0 4px 20px ${theme.primary}20`, 'important')
        }
      })
      
      // Sections header
      const sections = document.querySelectorAll('[class*="HeaderSection"], .MuiBox-root')
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          section.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
        }
      })
      
      console.log('✅ Theme applied successfully!')
    }, 200)
  }

  const handleThemeSelect = (themeIndex: number) => {
    setCurrentTheme(themeIndex)
    handleClose()
    
    // Sauvegarder le thème
    localStorage.setItem('portfolio-theme', themeIndex.toString())
    
    // Appliquer le thème
    applyTheme(themeIndex)
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
