'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { HOME_V2 } from './homeV2Tokens'

export default function HomeV2Footer() {
  const { t } = useLanguage()

  const linkSx = {
    color: HOME_V2.textMuted,
    fontSize: '0.8125rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': { color: HOME_V2.textSecondary },
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3 },
        borderTop: `1px solid ${HOME_V2.border}`,
      }}
    >
      <Box
        sx={{
          maxWidth: HOME_V2.maxWidth,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: HOME_V2.text }}>
            {t('homeV2.footerName')}
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: HOME_V2.textMuted }}>
            {t('homeV2.footerLocation')}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2.5} flexWrap="wrap">
          <Typography component={Link} href="/" sx={linkSx}>
            {t('homeV2.footerBack')}
          </Typography>
          <Typography component={Link} href="/demos" sx={linkSx}>
            {t('homeV2.footerDemos')}
          </Typography>
          <Typography component={Link} href="/portfolio/contact" sx={linkSx}>
            {t('homeV2.navContact')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
