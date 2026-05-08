'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import AutoplayLoopVideo from '@/components/shared/AutoplayLoopVideo'

const DEMO_SRC = '/img/demo1.mp4'

type Props = { compact?: boolean }

export default function ContactCoffeeVideo({ compact = false }: Props) {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const theme = useTheme()
  const invite = t('contact.coffeeInvite')

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: compact ? 3 : 4,
        mb: compact ? 4 : 6,
        px: { xs: 0, sm: 0 },
      }}
    >
      <Typography
        component="p"
        sx={{
          textAlign: 'center',
          color: textColor,
          fontWeight: 700,
          fontSize: { xs: '1rem', sm: '1.08rem' },
          lineHeight: 1.45,
          mb: compact ? 1.5 : 2,
          opacity: 0.92,
        }}
      >
        {invite}
      </Typography>
      <Box
        sx={{
          borderRadius: 6,
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          bgcolor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#0f0f0f',
        }}
      >
        <AutoplayLoopVideo src={DEMO_SRC} ariaLabel={invite} />
      </Box>
    </Box>
  )
}
