'use client'

import { useEffect, useId, useRef, useState } from 'react'
import {
  isPublicV2NavChildActive,
  isPublicV2NavItemActive,
  type PublicV2NavItem,
} from '@/lib/public-v2/nav'
import styles from './PublicNavDropdown.module.css'

type PublicNavDropdownProps = {
  item: PublicV2NavItem
  pathname: string
  search?: string
}

/**
 * Menu déroulant desktop — hover / focus / clavier.
 * Le parent reste un lien (aperçu section) ; les enfants sont les destinations.
 */
export default function PublicNavDropdown({
  item,
  pathname,
  search = '',
}: PublicNavDropdownProps) {
  const children = item.children ?? []
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()
  const active = isPublicV2NavItemActive(item, pathname)

  const clearCloseTimer = () => {
    if (!closeTimer.current) return
    clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  const openMenu = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }

  useEffect(() => () => clearCloseTimer(), [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      setOpen(false)
    }
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  if (children.length === 0) {
    return (
      <li>
        <a
          href={item.href}
          className={[styles.trigger, active ? styles.triggerActive : '']
            .filter(Boolean)
            .join(' ')}
          aria-current={active ? 'page' : undefined}
        >
          {item.label}
        </a>
      </li>
    )
  }

  return (
    <li
      ref={rootRef}
      className={[styles.item, open ? styles.itemOpen : ''].filter(Boolean).join(' ')}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) scheduleClose()
      }}
    >
      <a
        href={item.href}
        className={[styles.trigger, active ? styles.triggerActive : '']
          .filter(Boolean)
          .join(' ')}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            openMenu()
            const first = rootRef.current?.querySelector<HTMLAnchorElement>(
              '[data-nav-child]',
            )
            first?.focus()
          }
        }}
      >
        {item.label}
        <span className={styles.chevron} aria-hidden />
      </a>

      <div
        id={panelId}
        className={styles.panel}
        role="menu"
        aria-label={item.label}
        aria-hidden={!open}
      >
        <ul className={styles.panelList}>
          {children.map((child) => {
            const childActive = isPublicV2NavChildActive(child, pathname, search)
            return (
              <li key={child.id} role="none">
                <a
                  href={child.href}
                  role="menuitem"
                  data-nav-child
                  className={[
                    styles.panelLink,
                    childActive ? styles.panelLinkActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={childActive ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.panelLabel}>{child.label}</span>
                  {child.description ? (
                    <span className={styles.panelDesc}>{child.description}</span>
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}
