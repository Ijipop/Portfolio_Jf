'use client'

import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { loadGsapWithScrollTrigger } from '@/utils/gsapScrollTrigger'

/**
 * Sans scrollerProxy : ScrollTrigger suit le scroll **natif** du document.
 * GSAP chargé à la demande (même synchro scroll qu’avant une fois monté).
 */
export default function LenisScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void loadGsapWithScrollTrigger().then(({ ScrollTrigger }) => {
      if (disposed) return

      const onLenisScroll = () => {
        ScrollTrigger.update()
      }
      lenis.on('scroll', onLenisScroll)

      const onStRefresh = () => {
        lenis.resize()
      }
      ScrollTrigger.addEventListener('refresh', onStRefresh)
      ScrollTrigger.refresh()

      cleanup = () => {
        lenis.off('scroll', onLenisScroll)
        ScrollTrigger.removeEventListener('refresh', onStRefresh)
      }
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [lenis])

  return null
}
