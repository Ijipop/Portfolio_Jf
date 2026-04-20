'use client'

import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Palette from '@mui/icons-material/Palette'
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
import { useEffect, useMemo, useState } from 'react'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { THEMES, ThemeName, getDevThemeChoices } from '@/design-system/themes'

export function ThemeSelector() {
  const { setTheme: setAdvancedTheme, themeName } = useAdvancedTheme()
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const themeDisplayOrder = useMemo(() => {
    try {
      const list = getDevThemeChoices()
      return list.length > 0 ? list : (['default'] as ThemeName[])
    } catch {
      return ['default'] as ThemeName[]
    }
  }, [])

  // Synchroniser l’index du menu avec le thème actif (mode Créa uniquement)
  useEffect(() => {
    const validThemeName = themeName as ThemeName
    if (validThemeName && themeDisplayOrder.includes(validThemeName)) {
      const index = themeDisplayOrder.indexOf(validThemeName)
      if (index !== -1) {
        setCurrentThemeIndex(index)
      }
    }
  }, [themeName, themeDisplayOrder])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const applyTheme = (nextName: ThemeName) => {
    try {
      setAdvancedTheme(nextName)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[ThemeSelector] Could not update AdvancedThemeContext:', error)
      }
    }

    const index = themeDisplayOrder.indexOf(nextName)
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
        {themeDisplayOrder.map((name, index) => {
          const theme = THEMES[name]
          return (
          <MenuItem
              key={name}
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
