'use client'

import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { DESIGN_TOKENS } from '../../design-system/constants'

interface SkillTagProps {
  children: React.ReactNode
  size?: 'small' | 'medium'
  reflectionColor?: string
}

export default function SkillTag({ children, size = 'medium', reflectionColor }: SkillTagProps) {
  const { customTheme } = useAdvancedTheme()
  
  // Utiliser directement customTheme au lieu de dupliquer les couleurs
  const primaryColor = customTheme?.primary || '#3b82f6'
  const secondaryColor = customTheme?.secondary || '#059669'
  const accentColor = customTheme?.accent || '#8b5cf6'
  
  // Générer dynamiquement le gradient hover à partir du thème
  const hoverBackground = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 25%, ${accentColor} 50%, ${primaryColor} 75%, ${primaryColor} 100%)`
  
  const fontSize = size === 'small' ? '0.75rem' : '0.875rem'
  
  return (
    <span
      style={{
        display: 'inline-block',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        color: 'white',
        padding: '4px 12px',
        borderRadius: DESIGN_TOKENS.borderRadius.medium,
        fontSize,
        fontWeight: '500',
        margin: '4px',
        boxShadow: `0 2px 8px ${primaryColor}40`,
        border: `2px solid ${primaryColor}`,
        visibility: 'visible',
        opacity: '1',
        zIndex: '9999',
        position: 'relative',
        transition: DESIGN_TOKENS.transitions.normal,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
        e.currentTarget.style.background = hoverBackground
        e.currentTarget.style.backgroundSize = '200% 200%'
        e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}60, 0 0 20px ${secondaryColor}40`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)'
        e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        e.currentTarget.style.backgroundSize = '100% 100%'
        e.currentTarget.style.boxShadow = `0 2px 8px ${primaryColor}40`
      }}
    >
      {children}
    </span>
  )
}

