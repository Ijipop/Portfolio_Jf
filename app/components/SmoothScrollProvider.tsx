'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const LenisRoot = dynamic(() => import('./LenisRoot'), { ssr: false })

/** Pages courtes : pas de Lenis (moins de RAF, scroll natif identique). */
const LENIS_SKIP_PATH_PREFIXES = [
  '/portfolio/contact',
  '/admin',
] as const

type SmoothScrollProviderProps = {
  children: ReactNode
}

function shouldSkipLenis(pathname: string | null): boolean {
  if (!pathname) return false
  return LENIS_SKIP_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

/**
 * Lenis en root sans lissage de la **molette** : scroll wheel = 100 % natif.
 * Lenis + GSAP pont chargés en chunks séparés (dynamic import).
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })

  if (reducedMotion || shouldSkipLenis(pathname)) {
    return children
  }

  return <LenisRoot>{children}</LenisRoot>
}
