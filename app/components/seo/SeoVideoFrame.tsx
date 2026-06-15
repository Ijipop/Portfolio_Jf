'use client'

import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DESIGN_TOKENS } from '@/design-system/constants'
import { useSiteThemeTokens } from '@/hooks/useSiteThemeTokens'
import { useThemeColors } from '@/hooks/useThemeColors'

type SeoVideoFrameProps = {
  src: string
  delay?: number
}

export default function SeoVideoFrame({ src, delay = 0.06 }: SeoVideoFrameProps) {
  const tokens = useSiteThemeTokens()
  const { primary, secondary } = useThemeColors()

  return (
    <ScrollReveal direction="up" delay={delay}>
      <Box
        sx={{
          my: { xs: 3, sm: 4 },
          mx: 'auto',
          maxWidth: 720,
          position: 'relative',
          borderRadius: `${DESIGN_TOKENS.borderRadius.large}px`,
          overflow: 'hidden',
          border: `1px solid ${alpha(primary, 0.28)}`,
          boxShadow: `0 20px 56px ${alpha(primary, 0.16)}, 0 0 0 1px ${alpha(tokens.text, 0.06)} inset`,
          aspectRatio: '16 / 9',
          background: alpha(tokens.bg, 0.75),
        }}
      >
        <Box
          component="video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.92,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(145deg, ${alpha(primary, 0.2)} 0%, transparent 42%, ${alpha(secondary, 0.18)} 100%)`,
          }}
        />
      </Box>
    </ScrollReveal>
  )
}
