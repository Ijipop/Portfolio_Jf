'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SITE_DARK, SITE_LIGHT } from '@/design-system/siteDark'
import { useSiteDarkChrome } from '@/hooks/useSiteDarkChrome'
import AboutPortraitLoop from './AboutPortraitLoop'

type TFn = (key: string) => string

type AboutPersonalStorySectionProps = {
  t: TFn
  textColor: string
}

/** Récit À propos — restyle confiance ; contenu inchangé. */
export default function AboutPersonalStorySection({ t, textColor }: AboutPersonalStorySectionProps) {
  const siteDark = useSiteDarkChrome()
  const tokens = siteDark ? SITE_DARK : SITE_LIGHT

  return (
    <Box
      sx={{
        borderRadius: tokens.cardRadius,
        padding: { xs: 3, sm: 4 },
        textAlign: 'center',
        mb: 8,
        position: 'relative',
        overflow: 'hidden',
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        boxShadow: siteDark ? '0 10px 32px rgba(0,0,0,0.22)' : '0 8px 28px rgba(18,24,32,0.06)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: { xs: 2.5, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AboutPortraitLoop alt={t('about.photoPortraitAlt')} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 720, mx: 'auto' }}>
        {[t('about.personalStoryP1'), t('about.personalStoryP2'), t('about.personalStoryP3')].map(
          (paragraph, index, arr) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontFamily: 'var(--font-body), "Plus Jakarta Sans", sans-serif',
                fontSize: { xs: '0.98rem', sm: '1.05rem' },
                color: textColor || tokens.text,
                opacity: 0.95,
                lineHeight: 1.65,
                mb: index < arr.length - 1 ? 2.5 : 0,
                textAlign: 'center',
                whiteSpace: 'pre-line',
              }}
            >
              {paragraph}
            </Typography>
          ),
        )}
      </Box>
    </Box>
  )
}
