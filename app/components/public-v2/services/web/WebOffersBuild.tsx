'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { Container } from '@/components/public-v2/primitives'
import BlueprintBars from './BlueprintBars'
import { useBuildProgress, useBuildVarStyle } from './useBuildProgress'
import styles from './WebPage.module.css'
import buildSlot from './buildSlot.module.css'

type OfferItem = { id: string; title: string; lead: string }

type WebOffersBuildProps = {
  eyebrow: string
  title: string
  items: readonly OfferItem[]
}

export default function WebOffersBuild({ eyebrow, title, items }: WebOffersBuildProps) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useBuildProgress({
    mode: 'inView',
    duration: 3.6,
    targetRef: rootRef,
  })

  /* Head puis cartes successives (léger overlap) — chaque carte TRACE→RÉVÉLER */
  const headB = useTransform(progress, [0, 0.12, 0.28, 0.5, 0.75, 1], [0, 0.28, 0.48, 0.72, 0.95, 1])
  const card0 = useTransform(progress, [0.12, 0.28, 0.42, 0.58, 0.78, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const card1 = useTransform(progress, [0.28, 0.42, 0.55, 0.7, 0.88, 1], [0, 0.3, 0.48, 0.72, 0.94, 1])
  const card2 = useTransform(progress, [0.42, 0.55, 0.68, 0.82, 0.95, 1], [0, 0.3, 0.48, 0.72, 0.95, 1])

  const headStyle = useBuildVarStyle(headB)
  const cardStyles = [useBuildVarStyle(card0), useBuildVarStyle(card1), useBuildVarStyle(card2)]

  return (
    <section
      ref={rootRef}
      className={styles.offers}
      aria-labelledby="web-offers-title"
      data-build-root
      data-testid="pv2-web-offers"
    >
      <Container variant="wide">
        <motion.div className={buildSlot.slot} data-slot="text" style={headStyle}>
          <BlueprintBars kind="text" />
          <p className={styles.sectionEyebrow} data-copy>
            {eyebrow}
          </p>
        </motion.div>
        <motion.div className={buildSlot.slot} data-slot="title" style={headStyle}>
          <BlueprintBars kind="title" />
          <h2 id="web-offers-title" className={styles.sectionTitle} data-copy>
            {title}
          </h2>
        </motion.div>
        <ul className={styles.offerGrid}>
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              className={styles.offerCard}
              data-slot="card"
              style={{
                ...cardStyles[i],
                ['--card-bg' as string]: 'var(--color-surface)',
              }}
            >
              <BlueprintBars kind="card" />
              <h3 className={styles.offerTitle} data-copy>
                {item.title}
              </h3>
              <p className={styles.offerLead} data-copy>
                {item.lead}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
