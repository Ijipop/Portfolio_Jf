'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'

type ProjectsStatsStripProps = {
  total: number
  completed: number
  inProgress: number
  t: (key: string) => string
  containerSx: SxProps<Theme>
  textColor: string
  primary: string
}

export default function ProjectsStatsStrip({
  total,
  completed,
  inProgress,
  t,
  containerSx,
  textColor,
  primary,
}: ProjectsStatsStripProps) {
  const sep = (
    <Typography component="span" sx={{ opacity: 0.45, px: { xs: 0.35, sm: 0.5 }, userSelect: 'none' }}>
      ·
    </Typography>
  )

  const segment = (value: number, labelKey: string) => (
    <>
      <Typography component="span" sx={{ fontWeight: 800, color: primary, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </Typography>{' '}
      <Typography component="span" sx={{ color: textColor, opacity: 0.88, fontWeight: 600, fontSize: '0.82rem' }}>
        {t(labelKey)}
      </Typography>
    </>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 0,
        rowGap: 0.75,
        py: { xs: 1.35, sm: 1.5 },
        px: { xs: 1.5, sm: 2.25 },
        mb: { xs: 2.5, md: 3 },
        ...containerSx,
      }}
    >
      {segment(total, 'projects.statsTotal')}
      {sep}
      {segment(completed, 'projects.statsDone')}
      {sep}
      {segment(inProgress, 'projects.statsWip')}
    </Box>
  )
}
