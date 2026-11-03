'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './DemosIndex.module.css'

export type DemosIndexCard = {
  href: string
  title: string
  desc: string
  thumbClass: string
}

type Props = {
  cards: readonly DemosIndexCard[]
}

export default function DemosIndexAnimatedGrid({ cards }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className={styles.grid} data-testid={mounted ? 'demos-grid-ready' : undefined}>
      {cards.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className={styles.card}
          data-testid={`demo-link-${c.href.replace('/demos/', '')}`}
        >
          <div className={c.thumbClass} aria-hidden />
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{c.title}</h2>
            <p className={styles.cardDesc}>{c.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
