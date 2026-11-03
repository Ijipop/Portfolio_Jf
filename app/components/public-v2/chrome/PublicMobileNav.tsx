'use client'

import Link from 'next/link'
import { useEffect, useId, useRef } from 'react'
import type { PublicV2NavItem } from '@/lib/public-v2/nav'
import { Button } from '@/components/public-v2/primitives'
import styles from './PublicMobileNav.module.css'

export type PublicMobileNavProps = {
  items: PublicV2NavItem[]
  cta: { label: string; href: string }
}

/**
 * Menu mobile natif `<details>` — utilisable sans JS.
 * Enrichissement : Échap, focus retour, fermeture après sélection.
 */
export default function PublicMobileNav({ items, cta }: PublicMobileNavProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const summaryRef = useRef<HTMLElement>(null)
  const panelId = useId()

  useEffect(() => {
    const details = detailsRef.current
    if (!details) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !details.open) return
      e.preventDefault()
      details.open = false
      summaryRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = () => {
    const details = detailsRef.current
    if (!details?.open) return
    details.open = false
    summaryRef.current?.focus()
  }

  return (
    <details ref={detailsRef} className={styles.details}>
      <summary
        ref={summaryRef}
        className={styles.summary}
        aria-controls={panelId}
        aria-label="Menu de navigation"
      >
        <span className={styles.bar} aria-hidden />
        <span className={styles.bar} aria-hidden />
        <span className={styles.bar} aria-hidden />
      </summary>
      <div id={panelId} className={styles.panel}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href={cta.href} variant="primary" size="sm" onClick={closeMenu}>
          {cta.label}
        </Button>
      </div>
    </details>
  )
}
