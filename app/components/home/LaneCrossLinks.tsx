'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE_DARK } from '@/design-system/siteDark'

type LaneCrossLinksProps = {
  /** Lane courante — on n’affiche pas le lien vers soi-même. */
  current: 'web' | 'support' | 'software'
}

const LANES = [
  { id: 'web' as const, href: '/portfolio', labelKey: 'nav.webSites' },
  { id: 'support' as const, href: '/soutien-informatique-montreal', labelKey: 'nav.support' },
  {
    id: 'software' as const,
    href: '/portfolio/projets?type=logiciel',
    labelKey: 'nav.software',
  },
]

export default function LaneCrossLinks({ current }: LaneCrossLinksProps) {
  const { t, locale } = useLanguage()
  const others = LANES.filter((lane) => lane.id !== current)
  const alsoLabel = locale === 'en' ? 'Also available' : 'Aussi disponible'

  return (
    <Box
      component="nav"
      aria-label={alsoLabel}
      sx={{
        mt: { xs: 4, md: 5 },
        mb: { xs: 1, md: 2 },
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: SITE_DARK.textMuted,
          mb: 1,
        }}
      >
        {alsoLabel}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        {others.map((lane) => (
          <Box
            key={lane.id}
            component={Link}
            href={lane.href}
            sx={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: SITE_DARK.textSecondary,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              '&:hover': { color: SITE_DARK.brandOrangeLight },
            }}
          >
            {t(lane.labelKey)}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
