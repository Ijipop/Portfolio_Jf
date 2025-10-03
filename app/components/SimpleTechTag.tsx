'use client'

import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

interface SimpleTechTagProps {
  children: React.ReactNode
  reflectionColor?: string
}

export default function SimpleTechTag({ children, reflectionColor }: SimpleTechTagProps) {
  const { customTheme } = useAdvancedTheme()
  
  const primaryColor = customTheme?.primary || '#3b82f6'
  const secondaryColor = customTheme?.secondary || '#059669'
  const accentColor = customTheme?.accent || '#8b5cf6'
  
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
        e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 25%, ${accentColor} 50%, ${primaryColor} 75%, ${primaryColor} 100%)`
        e.currentTarget.style.backgroundSize = '200% 200%'
        e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}60, 0 0 20px ${secondaryColor}40`
        
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
