'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './DemosIndex.module.css'

export type DemosIndexCard = {
  href: string
  title: string
  desc: string
  thumbClass: string
}

const ease = [0.25, 0.46, 0.45, 0.94] as const

type Props = {
  cards: readonly DemosIndexCard[]
}

export default function DemosIndexAnimatedGrid({ cards }: Props) {
  const reduced = useReducedMotion()

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: reduced ? 0 : 0.28,
        staggerChildren: reduced ? 0 : 0.17,
      },
    },
  }

  const item = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.62, ease },
    },
  }

  return (
    <motion.div
      className={styles.grid}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((c) => (
        <motion.div key={c.href} variants={item} className={styles.cardMotion}>
          <Link
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
        </motion.div>
      ))}
    </motion.div>
  )
}
