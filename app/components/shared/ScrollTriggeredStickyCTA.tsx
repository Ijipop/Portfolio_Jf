'use client'

import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import StickyCTA from './StickyCTA'

type ScrollTriggeredStickyCTAProps = {
  text: string
  href?: string
  threshold?: number
}

export default function ScrollTriggeredStickyCTA({
  text,
  href = '/portfolio/contact',
  threshold = 400,
}: ScrollTriggeredStickyCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  if (!visible) return null

  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        pointerEvents: 'none',
      }}
    >
      <StickyCTA text={text} href={href} embedded />
    </Box>
  )
}
