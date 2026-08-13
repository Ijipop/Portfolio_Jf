'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'
import { VISIT } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltVisit() {
  return (
    <section id="visite" className={styles.visit}>
      <ScrollReveal direction="up" distance={40}>
        <div className={styles.visitPanel}>
          <p className={styles.sectionEyebrow}>Atelier</p>
          <h2 className={styles.visitTitle}>{VISIT.title}</h2>
          <p className={styles.visitAddress}>{VISIT.address}</p>
          <p className={styles.visitHours}>{VISIT.hours}</p>
          <div className={styles.visitCtas}>
            <a className={styles.ctaPrimary} href={`mailto:${VISIT.email}`}>
              {VISIT.cta}
            </a>
            <a className={styles.ctaGhost} href={`mailto:${VISIT.email}`}>
              {VISIT.email}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
