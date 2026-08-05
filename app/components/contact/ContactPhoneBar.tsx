'use client'

import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_SMS_HREF,
} from '@/content/soutien-informatique-montreal.fr'
import { useLanguage } from '@/contexts/LanguageContext'

type ContactPhoneBarProps = {
  primary: string
  textColor: string
  compact?: boolean
}

export default function ContactPhoneBar({ primary, textColor, compact = false }: ContactPhoneBarProps) {
  const { t } = useLanguage()

  const chipSx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    px: { xs: 1.5, sm: 1.85 },
    py: 1,
    borderRadius: 999,
    border: `1px solid ${primary}55`,
    color: textColor,
    background: `${primary}12`,
    textDecoration: 'none',
    fontWeight: 800,
    fontSize: { xs: '0.82rem', sm: '0.9rem' },
    letterSpacing: '0.01em',
    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, background 0.25s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: primary,
      background: `${primary}22`,
    },
  } as const

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        mb: compact ? 2.5 : 3.5,
      }}
    >
      <Stack direction="row" spacing={1.25} flexWrap="wrap" justifyContent="center" useFlexGap>
        <Box component="a" href={SUPPORT_PHONE_HREF} sx={chipSx}>
          <PhoneOutlinedIcon sx={{ fontSize: 18, color: primary }} />
          {t('contact.phoneCta')} {SUPPORT_PHONE_DISPLAY}
        </Box>
        <Box component="a" href={SUPPORT_SMS_HREF} sx={chipSx}>
          <SmsOutlinedIcon sx={{ fontSize: 18, color: primary }} />
          {t('contact.smsCta')}
        </Box>
      </Stack>
      <Typography
        sx={{
          fontSize: '0.8rem',
          color: textColor,
          opacity: 0.72,
          textAlign: 'center',
        }}
      >
        {t('contact.phoneHint')}
        {' · '}
        {t('contact.pricingAnchor')}
      </Typography>
    </Box>
  )
}
