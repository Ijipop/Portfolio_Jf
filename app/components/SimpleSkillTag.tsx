'use client'

import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import { getPaletteTokens } from '../design-system/themes'

interface SimpleSkillTagProps {
  children: React.ReactNode
}

export default function SimpleSkillTag({ children }: SimpleSkillTagProps) {
  const { themeName } = useAdvancedTheme()
  
  // Obtenir les couleurs spécifiques à la palette actuelle
  const paletteColors = getPaletteTokens(themeName)
  
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
        fontSize: '0.875rem',
        fontWeight: '500',
        margin: '4px',
        boxShadow: `0 2px 8px ${primaryColor}40`,
        border: `2px solid ${primaryColor}`,
        visibility: 'visible',
        opacity: '1',
        zIndex: '9999',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const t = 'translateY(-3px) scale(1.05)'
        e.currentTarget.style.transform = t
        ;(e.currentTarget.style as CSSStyleDeclaration & { webkitTransform?: string }).webkitTransform = t
        e.currentTarget.style.background = paletteColors.hover.background
        e.currentTarget.style.backgroundSize = '200% 200%'
        e.currentTarget.style.boxShadow = `0 4px 12px ${paletteColors.hover.shadow}60, 0 0 20px ${paletteColors.hover.glow}40`
      }}
      onMouseLeave={(e) => {
        const t = 'translateY(0px) scale(1)'
        e.currentTarget.style.transform = t
        ;(e.currentTarget.style as CSSStyleDeclaration & { webkitTransform?: string }).webkitTransform = t
        e.currentTarget.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        e.currentTarget.style.backgroundSize = '100% 100%'
        e.currentTarget.style.boxShadow = `0 2px 8px ${primaryColor}40`
      }}
    >
      {children}
    </span>
  )
}
