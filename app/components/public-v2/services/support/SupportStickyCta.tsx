'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/public-v2/primitives'
import { SUPPORT_FORM_ANCHOR } from '@/lib/public-v2/supportPageContent'
import styles from './SupportPage.module.css'

const FORM_ID = SUPPORT_FORM_ANCHOR

type SupportStickyCtaProps = {
  label: string
}

/** CTA fixe mobile — masqué lorsque le formulaire est visible (évite de recouvrir « Envoyer »). */
export default function SupportStickyCta({ label }: SupportStickyCtaProps) {
  const [hidden, setHidden] = useState(false)
  const formHref = `#${FORM_ID}`

  useEffect(() => {
    const node = document.getElementById(FORM_ID)
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting)
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-testid="support-mobile-sticky-cta"
      data-sticky-hidden={hidden ? 'true' : 'false'}
      className={[styles.sticky, hidden ? styles.stickyHidden : ''].filter(Boolean).join(' ')}
      aria-hidden={hidden}
    >
      <Button href={formHref} variant="primary" size="sm">
        {label}
      </Button>
    </div>
  )
}