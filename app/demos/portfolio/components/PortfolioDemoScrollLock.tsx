'use client'

import { useEffect } from 'react'

const DESKTOP_SCROLL_LOCK_MQ = '(min-width: 640px)'

/**
 * Verrouille le scroll du document sur desktop : le défilement se fait dans `.scrollShell`.
 * Sur mobile, le document scroll normalement (cadre fixe désactivé en CSS).
 */
export default function PortfolioDemoScrollLock() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_SCROLL_LOCK_MQ)
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevHtmlHeight = html.style.height
    const prevBodyHeight = body.style.height

    const apply = () => {
      if (!mq.matches) {
        html.style.overflow = prevHtmlOverflow
        body.style.overflow = prevBodyOverflow
        html.style.height = prevHtmlHeight
        body.style.height = prevBodyHeight
        return
      }
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      html.style.height = '100%'
      body.style.height = '100%'
    }

    apply()
    mq.addEventListener('change', apply)

    return () => {
      mq.removeEventListener('change', apply)
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      html.style.height = prevHtmlHeight
      body.style.height = prevBodyHeight
    }
  }, [])

  return null
}
