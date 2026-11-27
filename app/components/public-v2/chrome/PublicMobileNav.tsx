'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import type { PublicV2NavItem } from '@/lib/public-v2/nav'
import {
  isPublicV2NavChildActive,
  isPublicV2NavItemActive,
} from '@/lib/public-v2/nav'
import { Button } from '@/components/public-v2/primitives'
import PublicLocaleToggle from './PublicLocaleToggle'
import styles from './PublicMobileNav.module.css'

export type PublicMobileNavProps = {
  items: PublicV2NavItem[]
  cta: { label: string; href: string }
  pathname: string
  search?: string
  menuLabel?: string
}

/**
 * Menu mobile natif `<details>` — utilisable sans JS.
 * Enrichissement : Échap, focus retour, fermeture après sélection, sous-menus.
 */
export default function PublicMobileNav({
  items,
  cta,
  pathname,
  search = '',
  menuLabel = 'Menu de navigation',
}: PublicMobileNavProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const summaryRef = useRef<HTMLElement>(null)
  const panelId = useId()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

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

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <details ref={detailsRef} className={styles.details}>
      <summary
        ref={summaryRef}
        className={styles.summary}
        aria-controls={panelId}
        aria-label={menuLabel}
      >
        <span className={styles.bar} aria-hidden />
        <span className={styles.bar} aria-hidden />
        <span className={styles.bar} aria-hidden />
      </summary>
      <div id={panelId} className={styles.panel}>
        <ul className={styles.list}>
          {items.map((item) => {
            const active = isPublicV2NavItemActive(item, pathname)
            const children = item.children ?? []
            if (children.length === 0) {
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={active ? styles.linkActive : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            const groupOpen = openGroups[item.id] ?? active
            return (
              <li key={item.id} className={styles.group}>
                <button
                  type="button"
                  className={[styles.groupTrigger, active ? styles.linkActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-expanded={groupOpen}
                  onClick={() => toggleGroup(item.id)}
                >
                  <span>{item.label}</span>
                  <span
                    className={[styles.groupChevron, groupOpen ? styles.groupChevronOpen : '']
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden
                  />
                </button>
                {groupOpen ? (
                  <ul className={styles.subList}>
                    {children.map((child) => {
                      const childActive = isPublicV2NavChildActive(
                        child,
                        pathname,
                        search,
                      )
                      return (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            className={childActive ? styles.linkActive : undefined}
                            aria-current={childActive ? 'page' : undefined}
                          >
                            <span className={styles.subLabel}>{child.label}</span>
                            {child.description ? (
                              <span className={styles.subDesc}>{child.description}</span>
                            ) : null}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
        <div className={styles.localeRow}>
          <PublicLocaleToggle />
        </div>
        <Button href={cta.href} variant="primary" size="sm" onClick={closeMenu}>
          {cta.label}
        </Button>
      </div>
    </details>
  )
}
