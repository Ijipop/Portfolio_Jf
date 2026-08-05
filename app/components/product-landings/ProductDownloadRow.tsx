'use client'

import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

type DownloadItem = {
  href: string
  label: string
  primary?: boolean
  disabled?: boolean
}

type ProductDownloadRowProps = {
  items: DownloadItem[]
  accent: string
  accentHover?: string
}

export default function ProductDownloadRow({ items, accent, accentHover }: ProductDownloadRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        justifyContent: { xs: 'stretch', sm: 'flex-start' },
      }}
    >
      {items.map((item) => {
        const disabled = Boolean(item.disabled) || !item.href.trim() || item.href === '#'
        const buttonSx = {
          flex: { xs: '1 1 auto', sm: '0 0 auto' },
          minHeight: 48,
          px: 2.75,
          borderRadius: '999px',
          textTransform: 'none' as const,
          fontWeight: 700,
          fontSize: '0.95rem',
          ...(item.primary
            ? {
                background: accent,
                color: '#0a0a0c',
                '&:hover': { background: accentHover ?? accent, filter: 'brightness(1.06)' },
                '&.Mui-disabled': {
                  background: accent,
                  color: '#0a0a0c',
                  opacity: 0.45,
                },
              }
            : {
                background: 'transparent',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.22)',
                '&:hover': { borderColor: accent, background: 'rgba(255,255,255,0.04)' },
              }),
        }

        if (disabled) {
          return (
            <Button
              key={item.href + item.label}
              disabled
              startIcon={item.primary ? <DownloadIcon /> : undefined}
              sx={buttonSx}
            >
              {item.label}
            </Button>
          )
        }

        return (
          <Button
            key={item.href + item.label}
            component={Link}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            startIcon={item.primary ? <DownloadIcon /> : undefined}
            sx={buttonSx}
          >
            {item.label}
          </Button>
        )
      })}
    </Box>
  )
}
