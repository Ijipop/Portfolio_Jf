'use client'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTextColor } from '@/hooks/useTextColor'
import { useThemeColors } from '@/hooks/useThemeColors'
import AutoplayLoopVideo from '@/components/shared/AutoplayLoopVideo'

const DEMO2_SRC = '/img/demo2.mp4'

const BONUS_KEYS = [
  'home.servicesEcosystemBonus1',
  'home.servicesEcosystemBonus2',
  'home.servicesEcosystemBonus3',
  'home.servicesEcosystemBonus4',
  'home.servicesEcosystemBonus5',
] as const

export default function PortfolioHomeOfferEcosystem() {
  const { t } = useLanguage()
  const textColor = useTextColor()
  const { primary } = useThemeColors()
  const caption = t('home.servicesEcosystemDemo2Caption')
  const hoverPrompt = t('home.servicesEcosystemDemo2Hover')
  const [demoHovered, setDemoHovered] = useState(false)
  const displayCaption = demoHovered ? hoverPrompt : caption

  return (
    <ScrollReveal direction="up" delay={0.06}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          {BONUS_KEYS.map((key) => (
            <Chip
              key={key}
              label={t(key)}
              size="small"
              variant="outlined"
              sx={{
                borderColor: alpha(primary, 0.45),
                backgroundColor: alpha(primary, 0.07),
                color: textColor,
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: '100%',
            textAlign: 'left',
          }}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: DESIGN_TOKENS.borderRadius.medium,
              overflow: 'hidden',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0a0a0a' : '#0f0f0f'),
              cursor: 'default',
            }}
          >
            <AutoplayLoopVideo
              src={DEMO2_SRC}
              ariaLabel={displayCaption}
              ioThreshold={0.2}
              title={displayCaption}
            />
          </Box>

          <Typography
            component="p"
            sx={{
              mt: 1.5,
              mb: 0,
              color: textColor,
              opacity: demoHovered ? 0.92 : 0.72,
              fontSize: { xs: '0.78rem', sm: '0.8rem' },
              lineHeight: 1.45,
              textAlign: 'left',
              transition: 'opacity 0.2s ease',
            }}
          >
            {displayCaption}
          </Typography>
        </Box>
      </Box>
    </ScrollReveal>
  )
}
