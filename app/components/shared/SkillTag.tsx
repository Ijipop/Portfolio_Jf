'use client'

import { useThemeColors } from '../../hooks/useThemeColors'
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext'
import { DESIGN_TOKENS } from '../../design-system/constants'

interface SkillTagProps {
  children: React.ReactNode
  size?: 'small' | 'medium'
  reflectionColor?: string
}

export default function SkillTag({ children, size = 'medium', reflectionColor }: SkillTagProps) {
  const { primary, secondary, accent } = useThemeColors()
  const { themeName } = useAdvancedTheme()
  const isDefaultTheme = themeName === 'default'

  const hoverBackground = `linear-gradient(135deg, ${primary} 0%, ${secondary} 25%, ${accent} 50%, ${primary} 75%, ${primary} 100%)`
  const fontSize = size === 'small' ? '0.75rem' : '0.875rem'

  const baseStyle = isDefaultTheme
    ? {
        display: 'inline-block' as const,
        background: '#f1f5f9',
        color: '#334155',
        padding: '4px 12px',
        borderRadius: DESIGN_TOKENS.borderRadius.medium,
        fontSize,
        fontWeight: '500',
        margin: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        visibility: 'visible' as const,
        opacity: '1',
        zIndex: '9999',
        position: 'relative' as const,
        transition: DESIGN_TOKENS.transitions.normal,
        cursor: 'pointer',
      }
    : {
        display: 'inline-block' as const,
        background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        color: 'white',
        padding: '4px 12px',
        borderRadius: DESIGN_TOKENS.borderRadius.medium,
        fontSize,
        fontWeight: '500',
        margin: '4px',
        boxShadow: `0 2px 8px ${primary}40`,
        border: `2px solid ${primary}`,
        visibility: 'visible' as const,
        opacity: '1',
        zIndex: '9999',
        position: 'relative' as const,
        transition: DESIGN_TOKENS.transitions.normal,
        cursor: 'pointer',
      }

  return (
    <span
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
        if (isDefaultTheme) {
          e.currentTarget.style.background = '#e2e8f0'
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)'
        } else {
          e.currentTarget.style.background = hoverBackground
          e.currentTarget.style.backgroundSize = '200% 200%'
          e.currentTarget.style.boxShadow = `0 4px 12px ${primary}60, 0 0 20px ${secondary}40`
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)'
        if (isDefaultTheme) {
          e.currentTarget.style.background = '#f1f5f9'
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
        } else {
          e.currentTarget.style.background = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
          e.currentTarget.style.backgroundSize = '100% 100%'
          e.currentTarget.style.boxShadow = `0 2px 8px ${primary}40`
        }
      }}
    >
      {children}
    </span>
  )
}

