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
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { THEMES, ThemeName, getAvailableThemes } from '../design-system/themes'

export function ThemeSelector() {
  const { setTheme: setAdvancedTheme, themeName } = useAdvancedTheme()
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  // Ordre d'affichage des thèmes dans le menu
  const themeDisplayOrder: ThemeName[] = ['default', 'sunset', 'neon', 'ocean', 'forest', 'cyber']
  
  // Appliquer le thème au chargement
  useEffect(() => {
    const savedThemeIndex = localStorage.getItem('portfolio-theme')
    const savedThemeName = localStorage.getItem('themeName') as ThemeName
    
    if (savedThemeName && THEMES[savedThemeName]) {
      // Priorité au themeName (synchronisé avec AdvancedThemeContext)
      const index = themeDisplayOrder.indexOf(savedThemeName)
      if (index !== -1) {
        setCurrentThemeIndex(index)
      }
      applyTheme(savedThemeName)
    } else if (savedThemeIndex) {
      // Fallback sur l'ancien système (portfolio-theme)
      const themeIndex = parseInt(savedThemeIndex)
      if (themeIndex < themeDisplayOrder.length) {
        setCurrentThemeIndex(themeIndex)
        applyTheme(themeDisplayOrder[themeIndex])
      }
    } else {
      // Appliquer le thème par défaut au chargement
      applyTheme('default')
    }
  }, [])
  
  // Synchroniser avec AdvancedThemeContext
  useEffect(() => {
    const validThemeName = themeName as ThemeName
    if (validThemeName && themeDisplayOrder.includes(validThemeName)) {
      const index = themeDisplayOrder.indexOf(validThemeName)
      if (index !== -1) {
        setCurrentThemeIndex(index)
      }
    }
  }, [themeName])

  // Fonction pour obtenir les couleurs de cartes selon le thème
  // Palette default : fond de carte plus clair (moins foncé) que les autres palettes
  const getCardColorsForTheme = (theme: typeof THEMES[ThemeName], themeName: ThemeName) => {
    if (themeName === 'default') {
      return {
        primary: theme.primary,
        secondary: theme.secondary,
        background: `linear-gradient(145deg, ${theme.bg2}E6 0%, ${theme.bg}E0 50%, ${theme.bg2}E6 100%)`,
        cardGradient: `linear-gradient(145deg, ${theme.primary}26 0%, ${theme.secondary}22 50%, ${theme.accent}20 100%)`
      }
    }
    
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      background: `linear-gradient(145deg, ${theme.primary}20 0%, ${theme.secondary}20 50%, ${theme.primary}20 100%)`,
      cardGradient: `linear-gradient(145deg, ${theme.primary}20 0%, ${theme.secondary}20 50%, ${theme.primary}20 100%)`
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // Fonction pour appliquer un thème - SIMPLIFIÉE : SEULEMENT CSS VARIABLES
  const applyTheme = (themeName: ThemeName) => {
    const theme = THEMES[themeName]
    
    // 1. Synchroniser avec AdvancedThemeContext pour mettre à jour le thème Material-UI
    try {
      setAdvancedTheme(themeName)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ThemeSelector] Could not update AdvancedThemeContext:', error)
      }
    }
    
    // 2. Définir UNIQUEMENT les CSS variables (pas de manipulation DOM directe)
    const root = document.documentElement
    root.style.setProperty('--primary-color', theme.primary)
    root.style.setProperty('--secondary-color', theme.secondary)
    root.style.setProperty('--accent-color', theme.accent)
    root.style.setProperty('--theme-bg', theme.bg)
    root.style.setProperty('--theme-bg2', theme.bg2)
    
    // Appliquer les couleurs de cartes selon le thème
    const cardColors = getCardColorsForTheme(theme, themeName)
    root.style.setProperty('--card-primary', cardColors.primary)
    root.style.setProperty('--card-secondary', cardColors.secondary)
    root.style.setProperty('--card-background', cardColors.background)
    root.style.setProperty('--card-card-gradient', cardColors.cardGradient)
    root.style.setProperty('--card-overlay-opacity', themeName === 'default' ? '0.22' : '0.3')
    root.style.setProperty('--card-decor-opacity', themeName === 'default' ? '0.58' : '0.6')
    
    // 3. Background global avec !important pour override les styles React
    document.body.style.setProperty('background', 
      `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`,
      'important'
    )
    document.documentElement.style.setProperty('background', 
      `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`,
      'important'
    )
      
    // 4. Sauvegarder l'index pour l'affichage
    const index = themeDisplayOrder.indexOf(themeName)
    if (index !== -1) {
      setCurrentThemeIndex(index)
      localStorage.setItem('portfolio-theme', index.toString())
    }
  }

  const handleThemeSelect = (themeIndex: number) => {
    const selectedThemeName = themeDisplayOrder[themeIndex]
    if (!selectedThemeName) return
    
    setCurrentThemeIndex(themeIndex)
    handleClose()
    
    // Appliquer le thème (qui sauvegarde automatiquement)
    applyTheme(selectedThemeName)
  }

  const currentTheme = THEMES[themeDisplayOrder[currentThemeIndex] ?? 'default']

  return (
    <>
      <Tooltip title={`Thème: ${currentTheme.name}`} arrow placement="left">
        <IconButton
          onClick={handleClick}
          aria-label="Changer le thème"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.05)' },
            '@keyframes paletteGlow': {
              '0%, 100%': { color: currentTheme.primary },
              '33%': { color: currentTheme.secondary },
              '66%': { color: currentTheme.accent },
            },
            animation: 'paletteGlow 2.5s ease-in-out infinite',
          }}
        >
          <Palette sx={{ fontSize: 20 }} />
          <ArrowDropDown sx={{ ml: 0.25, fontSize: 18, opacity: 0.9 }} />
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
            minWidth: { xs: 'min(200px, 85vw)', sm: 200 }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {themeDisplayOrder.map((themeName, index) => {
          const theme = THEMES[themeName]
          return (
          <MenuItem 
              key={themeName}
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
                    fontWeight: currentThemeIndex === index ? 600 : 400,
                    color: currentThemeIndex === index ? theme.primary : 'white'
                }
              }}
            />
              {currentThemeIndex === index && (
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
          )
        })}
      </Menu>
    </>
  )
}
