'use client'

import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePresentationMode } from '@/contexts/PresentationModeContext'

export function PresentationModeToggle() {
  const { mode, setMode } = usePresentationMode()
  const { t } = useLanguage()

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size="small"
      onChange={(_, value: 'beige' | 'dev' | null) => {
        if (value) setMode(value)
      }}
      aria-label={t('nav.presentationToggleGroup')}
      sx={{
        '& .MuiToggleButton-root': {
          px: { xs: 0.75, sm: 1.25 },
          py: 0.5,
          fontSize: { xs: '0.65rem', sm: '0.75rem' },
          fontWeight: 700,
          color: 'white',
          border: '1px solid rgba(255,255,255,0.55) !important',
          textTransform: 'none',
          '&.Mui-selected': {
            bgcolor: 'rgba(255,255,255,0.22) !important',
            color: 'white',
          },
          '&:not(.Mui-selected)': {
            bgcolor: 'transparent',
          },
        },
      }}
    >
      <Tooltip title={t('nav.presentationBeigeHint')} arrow>
        <ToggleButton value="beige" aria-label={t('nav.presentationBeige')}>
          {t('nav.presentationBeige')}
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('nav.presentationDevHint')} arrow>
        <ToggleButton value="dev" aria-label={t('nav.presentationDev')}>
          {t('nav.presentationDev')}
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  )
}
