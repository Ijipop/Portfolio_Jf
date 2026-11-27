'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { Container } from '@/components/public-v2/primitives'
import { useSoftwareProgress } from './useSoftwareProgress'
import styles from './SoftwarePage.module.css'

type OfferItem = { id: string; title: string; lead: string }

type SoftwareOffersProps = {
  eyebrow: string
  title: string
  items: readonly OfferItem[]
}

/** ~1.7s — une fois au scroll */
const DURATION = 1.7

export default function SoftwareOffers({ eyebrow, title, items }: SoftwareOffersProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useSoftwareProgress({
    mode: 'inView',
    duration: DURATION,
    targetRef: rootRef,
  })

  const headOp = useTransform(progress, [0, 0.2, 0.4], [0, 0.85, 1])
  const headY = useTransform(progress, [0, 0.35], [14, 0])
  const card0 = useTransform(progress, [0.15, 0.4, 0.55], [0, 0.85, 1])
  const card0Y = useTransform(progress, [0.15, 0.5], [18, 0])
  const card1 = useTransform(progress, [0.35, 0.55, 0.7], [0, 0.85, 1])
  const card1Y = useTransform(progress, [0.35, 0.65], [18, 0])
  const card2 = useTransform(progress, [0.5, 0.7, 0.88], [0, 0.85, 1])
  const card2Y = useTransform(progress, [0.5, 0.82], [18, 0])

  const cards = [
    { op: card0, y: card0Y },
    { op: card1, y: card1Y },
    { op: card2, y: card2Y },
  ]

  return (
    <section
      ref={rootRef}
      className={styles.offers}
      aria-labelledby="software-offers-title"
      data-testid="pv2-software-offers"
    >
      <Container variant="wide">
        <motion.p className={styles.sectionEyebrow} style={{ opacity: headOp, y: headY }}>
          {eyebrow}
        </motion.p>
        <motion.h2
          id="software-offers-title"
          className={styles.sectionTitle}
          style={{ opacity: headOp, y: headY }}
        >
          {title}
        </motion.h2>
        <ul className={styles.offerGrid}>
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              className={styles.offerCard}
              style={{ opacity: cards[i]?.op, y: cards[i]?.y }}
            >
              <h3 className={styles.offerTitle}>{item.title}</h3>
              <p className={styles.offerLead}>{item.lead}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
