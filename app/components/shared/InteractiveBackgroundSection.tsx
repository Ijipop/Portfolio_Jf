'use client'

import Box from '@mui/material/Box'
import { ReactNode } from 'react'

interface InteractiveBackgroundSectionProps {
  children: ReactNode
}

export default function InteractiveBackgroundSection({
  children,
}: InteractiveBackgroundSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        flex: 1,
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
