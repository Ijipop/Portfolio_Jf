'use client'

import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import type { ReactElement } from 'react'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'

interface FilterChipProps {
  label: string
  onClick: () => void
  selected: boolean
  icon?: ReactElement
}

export default function FilterChipComponent({ label, onClick, selected, icon }: FilterChipProps) {
  const theme = useTheme()
  const { primary } = useThemeColors()
  const textColor = useTextColor()

  const borderColor = selected ? primary : `${primary}40`
  const labelColor = selected ? primary : textColor
  const bgTint = `${primary}0c`

  return (
    <Chip
      label={label}
      onClick={onClick}
      icon={icon}
      sx={{
        borderRadius: DESIGN_TOKENS.borderRadius.small,
        fontWeight: 600,
        fontSize: '0.8125rem',
        padding: theme.spacing(0.6, 1.5),
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        background: selected ? `${primary}14 !important` : `${bgTint} !important`,
        color: `${labelColor} !important`,
        border: `1px solid ${borderColor} !important`,
        boxShadow: 'none',
        '&:hover': {
          background: selected ? `${primary}18 !important` : `${primary}08 !important`,
          borderColor: `${primary}60 !important`,
        },
      }}
    />
  )
}

