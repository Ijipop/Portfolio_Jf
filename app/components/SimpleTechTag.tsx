'use client'

import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

// Fonction pour obtenir les couleurs spécifiques à chaque palette
const getPaletteColors = (themeName: string) => {
  const paletteColors = {
    default: {
      primary: '#3b82f6',    // Bleu
      secondary: '#059669',   // Vert
      accent: '#8b5cf6',      // Violet
      hover: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #059669 25%, #8b5cf6 50%, #3b82f6 75%, #3b82f6 100%)',
        shadow: '#3b82f6',
        glow: '#059669'
      }
    },
    neon: {
      primary: '#00ff88',      // Vert fluo
      secondary: '#ff0080',    // Rose fluo
      accent: '#00ffff',       // Cyan fluo
      hover: {
        background: 'linear-gradient(135deg, #00ff88 0%, #ff0080 25%, #00ffff 50%, #00ff88 75%, #00ff88 100%)',
        shadow: '#00ff88',
        glow: '#ff0080'
      }
    },
    sunset: {
      primary: '#ff6b35',      // Orange
      secondary: '#ff1744',    // Rouge
      accent: '#ffd700',       // Jaune
      hover: {
        background: 'linear-gradient(135deg, #ff6b35 0%, #ff1744 25%, #ffd700 50%, #ff6b35 75%, #ff6b35 100%)',
        shadow: '#ff6b35',
        glow: '#ff1744'
      }
    },
    ocean: {
      primary: '#00bcd4',      // Cyan
      secondary: '#2196f3',    // Bleu
      accent: '#4fc3f7',       // Bleu clair
      hover: {
        background: 'linear-gradient(135deg, #00bcd4 0%, #2196f3 25%, #4fc3f7 50%, #00bcd4 75%, #00bcd4 100%)',
        shadow: '#00bcd4',
        glow: '#2196f3'
      }
    },
    forest: {
      primary: '#4caf50',       // Vert
      secondary: '#8bc34a',     // Vert clair
      accent: '#cddc39',        // Vert jaune
      hover: {
        background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 25%, #cddc39 50%, #4caf50 75%, #4caf50 100%)',
        shadow: '#4caf50',
        glow: '#8bc34a'
      }
    },
    cyber: {
      primary: '#9c27b0',       // Violet
      secondary: '#e91e63',     // Rose
      accent: '#ff9800',        // Orange
      hover: {
        background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 25%, #ff9800 50%, #9c27b0 75%, #9c27b0 100%)',
        shadow: '#9c27b0',
        glow: '#e91e63'
      }
    }
  }
  
  return paletteColors[themeName as keyof typeof paletteColors] || paletteColors.default
}

interface SimpleTechTagProps {
  children: React.ReactNode
  reflectionColor?: string
}

export default function SimpleTechTag({ children, reflectionColor }: SimpleTechTagProps) {
  const { customTheme, themeName } = useAdvancedTheme()
  
  // Obtenir les couleurs spécifiques à la palette actuelle
  const paletteColors = getPaletteColors(themeName)
  
  const primaryColor = paletteColors.primary
  const secondaryColor = paletteColors.secondary
  const accentColor = paletteColors.accent
  
  return (
    <span
      style={{
        display: 'inline-block',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '500',
        boxShadow: `0 2px 8px ${primaryColor}40`,
        border: `2px solid ${primaryColor}`,
        visibility: 'visible',
        opacity: '1',
        zIndex: '9999',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        margin: '2px',
        ...(reflectionColor && {
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${reflectionColor}20 0%, transparent 50%, ${reflectionColor}10 100%)`,
            borderRadius: '20px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 1,
            pointerEvents: 'none',
          }
        })
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
        e.currentTarget.style.background = paletteColors.hover.background
        e.currentTarget.style.backgroundSize = '200% 200%'
        e.currentTarget.style.boxShadow = `0 4px 12px ${paletteColors.hover.shadow}60, 0 0 20px ${paletteColors.hover.glow}40`
        
        // Ajouter l'effet de reflet au hover
        if (reflectionColor) {
          e.currentTarget.style.setProperty('--reflection-opacity', '1')
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)'
        e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        e.currentTarget.style.backgroundSize = '100% 100%'
        e.currentTarget.style.boxShadow = `0 2px 8px ${primaryColor}40`
        
        // Retirer l'effet de reflet
        if (reflectionColor) {
          e.currentTarget.style.setProperty('--reflection-opacity', '0')
        }
      }}
    >
      {children}
    </span>
  )
}
