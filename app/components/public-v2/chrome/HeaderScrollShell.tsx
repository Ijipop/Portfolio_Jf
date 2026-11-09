'use client'

import { useEffect, useState, type ReactNode } from 'react'
import styles from './PublicHeader.module.css'

export type HeaderScrollShellProps = {
  children: ReactNode
}

/**
 * Enveloppe client du header — état `scrolled` uniquement après mount
 * pour éviter toute divergence SSR/hydratation.
 */
export default function HeaderScrollShell({ children }: HeaderScrollShellProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const className = [styles.header, scrolled ? styles.headerScrolled : '']
    .filter(Boolean)
    .join(' ')

  return <header className={className}>{children}</header>
}
