'use client'

import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

interface SimpleSkillTagProps {
  children: React.ReactNode
}

export default function SimpleSkillTag({ children }: SimpleSkillTagProps) {
  const { customTheme } = useAdvancedTheme()
  
  const primaryColor = customTheme?.primary || '#3b82f6'
  const secondaryColor = customTheme?.secondary || '#059669'
  
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
      }}
    >
      {children}
    </span>
  )
}
