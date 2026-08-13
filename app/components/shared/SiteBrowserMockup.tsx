'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'

const THERMO_SRC = '/imgs/projets/1776087415283_Thermo.png'
const THERMO_HREF = 'https://www.thermo-trappeur.ca/fr'
const THERMO_URL = 'thermo-trappeur.ca'

type SiteBrowserMockupProps = {
  src?: string
  href?: string
  urlLabel?: string
  alt: string
  caption?: string
  compact?: boolean
  /** Float léger autour du chrome (gateway). */
  breathe?: boolean
}

/** Chrome navigateur autour d’un screenshot réel — preuve de craft, pas une icône. */
export default function SiteBrowserMockup({
  src = THERMO_SRC,
  href = THERMO_HREF,
  urlLabel = THERMO_URL,
  alt,
  caption,
  compact = false,
  breathe = false,
}: SiteBrowserMockupProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const external = href.startsWith('http')

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: compact ? 420 : 560,
        mx: 'auto',
        animation:
          breathe && !reducedMotion
            ? 'mockupBreathe 5.5s ease-in-out infinite'
            : undefined,
        '@keyframes mockupBreathe': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      }}
    >
      <Box
        component={external ? 'a' : Link}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={alt}
        sx={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(232, 220, 200, 0.16)',
          background: '#161310',
          boxShadow: '0 18px 40px rgba(0, 0, 0, 0.35)',
          '&:focus-visible': {
            outline: '2px solid #e85d04',
            outlineOffset: 3,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.25,
            py: 0.85,
            background: '#211c18',
            borderBottom: '1px solid rgba(232, 220, 200, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.6, pr: 0.5 }} aria-hidden>
            {['#f87171', '#fbbf24', '#4ade80'].map((c) => (
              <Box
                key={c}
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c, opacity: 0.85 }}
              />
            ))}
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              px: 1,
              py: 0.35,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              fontSize: '0.68rem',
              letterSpacing: '0.01em',
              color: 'rgba(247, 243, 238, 0.55)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {urlLabel}
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            height: compact ? 220 : 320,
            overflow: 'hidden',
            bgcolor: '#0e0c0a',
            containerType: 'size',
          }}
        >
          <Box
            sx={{
              width: '100%',
              animation:
                reducedMotion
                  ? 'none'
                  : compact
                    ? 'mockupDrift 22s ease-in-out infinite alternate'
                    : 'mockupDrift 28s ease-in-out infinite alternate',
              '@keyframes mockupDrift': {
                from: { transform: 'translateY(0)' },
                to: { transform: 'translateY(calc(-100% + 100cqh))' },
              },
            }}
          >
            <Box
              component="img"
              src={src}
              alt=""
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'top center',
              }}
            />
          </Box>
        </Box>
      </Box>
      {caption ? (
        <Typography
          sx={{
            mt: 1,
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'rgba(196, 184, 170, 0.9)',
            letterSpacing: '0.02em',
          }}
        >
          {caption}
        </Typography>
      ) : null}
    </Box>
  )
}
