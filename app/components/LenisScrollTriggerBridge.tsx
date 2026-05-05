'use client'

import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sans scrollerProxy : ScrollTrigger suit le scroll **natif** du document.
 * (Le proxy + Lenis smoothWheel cassait souvent l’autoscroll au clic molette.)
 */
export default function LenisScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const onLenisScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onLenisScroll)

    const onStRefresh = () => {
      lenis.resize()
    }
    ScrollTrigger.addEventListener('refresh', onStRefresh)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onLenisScroll)
      ScrollTrigger.removeEventListener('refresh', onStRefresh)
    }
  }, [lenis])

  return null
}
