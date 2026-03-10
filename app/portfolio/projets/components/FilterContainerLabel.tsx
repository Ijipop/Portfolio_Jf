'use client'

import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useThemeColors } from '@/hooks/useThemeColors'
import { useTextColor } from '@/hooks/useTextColor'

export default function FilterContainerLabel({ label }: { label: string }) {
  const { primary } = useThemeColors()
  const textColor = useTextColor()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mr: 1, flexShrink: 0 }}>
      <FilterListIcon
        sx={{
          color: primary,
          fontSize: 22,
          opacity: 0.9,
          transition: DESIGN_TOKENS.transitions.normal,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: textColor,
          fontSize: { xs: '0.9375rem', sm: '1rem' },
          letterSpacing: '0.02em',
          transition: DESIGN_TOKENS.transitions.normal,
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

