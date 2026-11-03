'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'
import { DROPS } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltDrops() {
  return (
    <section id="drops" className={styles.drops}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionEyebrow}>Drop 09</p>
        <h2 className={styles.sectionTitle}>
          Pièces qui
          <span className={styles.titleAccent}> claquent.</span>
        </h2>
      </div>

      <div className={styles.dropGrid}>
        {DROPS.map((drop, i) => (
          <ScrollReveal key={drop.id} delay={i * 0.08} direction="up" distance={48} uncappedDelay>
            <article className={styles.dropCard}>
              <div className={styles.dropVisual} data-tone={drop.tag.toLowerCase()} aria-hidden>
                <span className={styles.dropGlyph}>{drop.name.slice(0, 1)}</span>
              </div>
              <div className={styles.dropBody}>
                <span className={styles.dropTag}>{drop.tag}</span>
                <h3 className={styles.dropName}>{drop.name}</h3>
                <p className={styles.dropNote}>{drop.note}</p>
                <p className={styles.dropPrice}>{drop.price}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
