'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

const STICKY_OFFSET = 72

/**
 * Conteneur scrollable de la démo : intercepte les ancres internes (#contact, etc.).
 */
export default function PortfolioDemoScrollShell({ className, children }: Props) {
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const scrollToTarget = (target: HTMLElement) => {
      const shellRect = shell.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const top = targetRect.top - shellRect.top + shell.scrollTop - STICKY_OFFSET
      shell.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest('a[href^="#"]')
      if (!anchor || !shell.contains(anchor)) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = shell.querySelector(href)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()

      if (window.matchMedia('(max-width: 639px)').matches) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      scrollToTarget(target)
    }

    shell.addEventListener('click', onClick)
    return () => shell.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={shellRef} className={className} tabIndex={-1}>
      {children}
    </div>
  )
}
