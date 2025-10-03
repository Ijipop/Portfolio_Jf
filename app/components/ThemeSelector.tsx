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

  // Fonction pour obtenir les couleurs de cartes selon le thème
  const getCardColorsForTheme = (theme: any) => {
    if (theme.isDefault) {
      return {
        primary: '#1e3a8a',
        secondary: '#059669',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)'
      }
    }
    
    return {
      primary: theme.primary,
      secondary: theme.secondary,
      background: `linear-gradient(145deg, ${theme.primary}20 0%, ${theme.secondary}20 50%, ${theme.primary}20 100%)`
    }
  }

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
        
        // Supprimer TOUTES les variables CSS de cartes
        root.style.removeProperty('--card-primary')
        root.style.removeProperty('--card-secondary')
        root.style.removeProperty('--card-background')
        root.style.removeProperty('--card-text-primary')
        root.style.removeProperty('--card-text-secondary')
        root.style.removeProperty('--card-hover-primary')
        root.style.removeProperty('--card-hover-secondary')
        root.style.removeProperty('--card-hover-glow')
        
        // Reset body ET html background
        document.body.style.removeProperty('background')
        document.documentElement.style.removeProperty('background')
        
        // SUPPRIMÉ - Plus de reset des conteneurs
        
        // SUPPRIMÉ - Plus de reset des conteneurs
        
        // SUPPRIMÉ - Plus de reset des conteneurs
        
        // Reset SÉLECTIF des styles inline
        setTimeout(() => {
          // Reset des titres
          const titles = document.querySelectorAll('h1, .MuiTypography-h1')
          titles.forEach((title) => {
            if (title instanceof HTMLElement) {
              title.style.removeProperty('color')
              title.style.removeProperty('text-shadow')
            }
          })
          
          // Reset des liens
          const links = document.querySelectorAll('a')
          links.forEach((link) => {
            if (link instanceof HTMLElement) {
              link.style.removeProperty('color')
            }
          })
          
          // Reset des icônes
          const icons = document.querySelectorAll('.MuiSvgIcon-root, svg')
          icons.forEach((icon) => {
            if (icon instanceof HTMLElement) {
              icon.style.removeProperty('color')
            }
          })
          
          // Reset des boutons
          const buttons = document.querySelectorAll('.MuiButton-root, button')
          buttons.forEach((button) => {
            if (button instanceof HTMLElement) {
              button.style.removeProperty('color')
              button.style.removeProperty('border-color')
            }
          })
          
          // Reset des cartes - NETTOYAGE AGRESSIF !
          console.log('🔄 Resetting cards...')
          
          // Nettoyer TOUTES les cartes possibles
          const allCards = document.querySelectorAll('.MuiCard-root, .MuiPaper-root, [class*="Card"], [class*="card"], .MuiBox-root, .MuiContainer-root')
          allCards.forEach((card) => {
            if (card instanceof HTMLElement) {
              console.log('🔄 Resetting card:', card.className)
              
              // Supprimer TOUS les styles de thème
              card.style.removeProperty('background')
              card.style.removeProperty('background-color')
              card.style.removeProperty('background-image')
              card.style.removeProperty('border')
              card.style.removeProperty('border-color')
              card.style.removeProperty('backdrop-filter')
              card.style.removeProperty('box-shadow')
              card.style.removeProperty('color')
              card.style.removeProperty('text-shadow')
              
              // Forcer le style par défaut
              card.style.setProperty('background', '', 'important')
              card.style.setProperty('border', '', 'important')
              card.style.setProperty('box-shadow', '', 'important')
            }
          })
          
          // SUPPRIMÉ - Plus de reset des headers/footers
          
          // Reset des headers
          const headers = document.querySelectorAll('[class*="HeaderSection"]')
          headers.forEach((header) => {
            if (header instanceof HTMLElement) {
              header.style.removeProperty('background')
            }
          })
          
          // Reset des Box de titre
          const titleBoxes = document.querySelectorAll('.MuiBox-root')
          titleBoxes.forEach((box) => {
            if (box instanceof HTMLElement) {
              const hasTitle = box.querySelector('h1, .MuiTypography-h1, [class*="title"], [class*="Title"]')
              if (hasTitle) {
                box.style.removeProperty('background')
              }
            }
          })
          
          // SUPPRIMÉ - Plus d'effets hover à reset
          
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
        
        // Nettoyage ULTRA-AGRESSIF après 1 seconde
        setTimeout(() => {
          console.log('🔄 ULTRA-AGGRESSIVE card cleanup...')
          
          // Supprimer TOUTES les variables CSS de thème
          const root = document.documentElement
          root.style.removeProperty('--card-primary')
          root.style.removeProperty('--card-secondary')
          root.style.removeProperty('--card-background')
          root.style.removeProperty('--card-text-primary')
          root.style.removeProperty('--card-text-secondary')
          root.style.removeProperty('--card-hover-primary')
          root.style.removeProperty('--card-hover-secondary')
          root.style.removeProperty('--card-hover-glow')
          
          // Nettoyer TOUTES les cartes avec approche ultra-agressive
          const allCards = document.querySelectorAll('*')
          allCards.forEach((element) => {
            if (element instanceof HTMLElement) {
              const className = element.className || ''
              const tagName = element.tagName.toLowerCase()
              
              // Cibler tous les éléments qui pourraient être des cartes
              if (className.includes('Card') || className.includes('card') || 
                  className.includes('MuiCard') || className.includes('MuiPaper') ||
                  className.includes('MuiBox') || className.includes('MuiContainer') ||
                  tagName === 'div' || tagName === 'section' || tagName === 'article') {
                
                console.log('🔄 ULTRA-cleaning element:', tagName, className)
                
                // Supprimer TOUS les styles possibles
                element.style.removeProperty('background')
                element.style.removeProperty('background-color')
                element.style.removeProperty('background-image')
                element.style.removeProperty('background-size')
                element.style.removeProperty('background-position')
                element.style.removeProperty('background-repeat')
                element.style.removeProperty('border')
                element.style.removeProperty('border-color')
                element.style.removeProperty('border-width')
                element.style.removeProperty('border-style')
                element.style.removeProperty('border-radius')
                element.style.removeProperty('box-shadow')
                element.style.removeProperty('color')
                element.style.removeProperty('text-shadow')
                element.style.removeProperty('backdrop-filter')
                element.style.removeProperty('filter')
                element.style.removeProperty('transform')
                element.style.removeProperty('transition')
                
                // Forcer le style par défaut avec !important
                element.style.setProperty('background', 'transparent', 'important')
                element.style.setProperty('background-color', 'transparent', 'important')
                element.style.setProperty('background-image', 'none', 'important')
                element.style.setProperty('border', 'none', 'important')
                element.style.setProperty('box-shadow', 'none', 'important')
                element.style.setProperty('color', 'inherit', 'important')
                element.style.setProperty('text-shadow', 'none', 'important')
              }
            }
          })
          
          console.log('✅ ULTRA-AGGRESSIVE cleanup complete')
        }, 1000)
      }
      
      return
    }
    
    // 1. CSS Variables sur le root
    const root = document.documentElement
    root.style.setProperty('--primary-color', theme.primary)
    root.style.setProperty('--secondary-color', theme.secondary)
    root.style.setProperty('--theme-bg', theme.bg)
    root.style.setProperty('--theme-bg2', theme.bg2)
    
    // Appliquer les couleurs de cartes selon le thème
    const cardColors = getCardColorsForTheme(theme)
    root.style.setProperty('--card-primary', cardColors.primary)
    root.style.setProperty('--card-secondary', cardColors.secondary)
    root.style.setProperty('--card-background', cardColors.background)
    
    // 2. Background du body ET du html pour couvrir toute la page
    document.body.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
    document.documentElement.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
    
    // SUPPRIMÉ - On ne touche plus aux conteneurs pour éviter qu'ils soient visibles
    
    // SUPPRIMÉ - On ne touche plus aux conteneurs
    
    // SUPPRIMÉ - On ne touche plus aux conteneurs
    
    // SUPPRIMÉ - On ne touche plus aux conteneurs pour éviter de tout voir
    
    // 3. Forcer sur tous les éléments avec un délai
    setTimeout(() => {
      console.log('🔧 Applying styles to elements...')
      
      // Titres principaux (h1, h4, h5 et leurs variantes MUI)
      const titles = document.querySelectorAll('h1, .MuiTypography-h1, h4, .MuiTypography-h4, h5, .MuiTypography-h5')
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
      
      // Cards - APPROCHE SIMPLE ET PROPRE !
      console.log('🎨 Applying theme to cards...')
      
      // Cibler SEULEMENT les cartes MUI principales
      const mainCards = document.querySelectorAll('.MuiCard-root, .MuiPaper-root')
      const processedCards = new Set()
      
      mainCards.forEach((card) => {
        if (card instanceof HTMLElement && !processedCards.has(card)) {
          processedCards.add(card)
          console.log('🎨 Applying theme to MUI card:', card.className)
          
          // Styles propres et précis
          card.style.setProperty('background', `linear-gradient(145deg, ${theme.bg} 0%, ${theme.bg2} 50%, ${theme.bg} 100%)`, 'important')
          card.style.setProperty('border', `2px solid ${theme.primary}60`, 'important')
          card.style.setProperty('backdrop-filter', 'blur(10px)', 'important')
          card.style.setProperty('box-shadow', `0 20px 60px ${theme.primary}40, 0 0 0 1px ${theme.primary}30`, 'important')
          card.style.setProperty('color', theme.primary, 'important')
        }
      })
      
      // SUPPRIMÉ - On évite les conflits avec headers/footers
      
      // Sections header - REMETTRE LES BANNIÈRES DE TITRE !
      const sections = document.querySelectorAll('[class*="HeaderSection"]')
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          section.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
        }
      })
      
      // AUSSI cibler les Box qui contiennent les titres principaux
      const titleBoxes = document.querySelectorAll('.MuiBox-root')
      titleBoxes.forEach((box) => {
        if (box instanceof HTMLElement) {
          // Vérifier si c'est une section de titre (contient h1 ou titre principal)
          const hasTitle = box.querySelector('h1, .MuiTypography-h1, [class*="title"], [class*="Title"]')
          if (hasTitle) {
            box.style.setProperty('background', `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 25%, ${theme.bg} 50%, ${theme.bg2} 75%, ${theme.bg} 100%)`, 'important')
          }
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
