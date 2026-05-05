'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import LenisScrollTriggerBridge from './LenisScrollTriggerBridge'

type SmoothScrollProviderProps = {
  children: ReactNode
}

/**
 * Lenis en root sans lissage de la **molette** : scroll wheel = 100 % natif
 * (clic molette / autoscroll, Shift+molette, etc.).
 * Lenis reste utile pour la synchro scroll + Resize / intégrations futures (scrollTo).
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  if (reducedMotion) {
    return children
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        /** Désactivé volontairement : évite preventDefault sur wheel (réparation autoscroll molette). */
        smoothWheel: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
