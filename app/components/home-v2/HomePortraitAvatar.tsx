'use client'

import Box from '@mui/material/Box'
import { useHomeV2Tokens } from './homeV2Tokens'

const AVATAR_SRC = '/img/jf-avatar.jpg?v=8'

type HomePortraitAvatarProps = {
  alt: string
  size?: number
}

/** Carré visage pré-croppé — évite de réduire Jf.jpg (1440×1920) dans un cercle de 56px. */
export default function HomePortraitAvatar({ alt, size = 80 }: HomePortraitAvatarProps) {
  const { tokens: v2 } = useHomeV2Tokens()

  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: `0 0 0 1px ${v2.border}`,
      }}
    >
      <Box
        component="img"
        src={AVATAR_SRC}
        alt={alt}
        width={640}
        height={640}
        decoding="async"
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          transform: 'translateX(-2%) scale(1)',
          transformOrigin: 'center center',
          imageRendering: 'auto',
        }}
      />
    </Box>
  )
}
