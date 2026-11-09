'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, type SxProps, type Theme } from '@mui/material/styles'

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
  const segment = (value: number, labelKey: string) => (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.5em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums lining-nums',
          color: textColor,
          fontSize: { xs: '1.05rem', sm: '1.125rem' },
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        component="span"
        sx={{
          color: textColor,
          opacity: 0.52,
          fontWeight: 600,
          fontSize: { xs: '0.65rem', sm: '0.6875rem' },
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {t(labelKey)}
      </Typography>
    </Box>
  )

  const sep = (
    <Box
      component="span"
      aria-hidden
      sx={{
        display: 'inline-block',
        width: '1px',
        height: { xs: '1.125rem', sm: '1.25rem' },
        flexShrink: 0,
        alignSelf: 'center',
        bgcolor: alpha(primary, 0.22),
        opacity: 0.9,
      }}
    />
  )

  return (
    <Box
      sx={{
        ...containerSx,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: { xs: 1.75, sm: 2.5 },
        rowGap: 0,
        py: { xs: 1.1, sm: 1.25 },
        px: { xs: 1.75, sm: 2.5 },
        mb: { xs: 2.25, md: 2.75 },
        overflowX: 'auto',
        overflowY: 'hidden',
        maxWidth: '100%',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
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
