'use client'

import { ReactLenis } from 'lenis/react'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const LenisScrollTriggerBridge = dynamic(() => import('./LenisScrollTriggerBridge'), {
  ssr: false,
})

type LenisRootProps = {
  children: ReactNode
}

/** Lenis + pont GSAP — importé dynamiquement depuis SmoothScrollProvider. */
export default function LenisRoot({ children }: LenisRootProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
