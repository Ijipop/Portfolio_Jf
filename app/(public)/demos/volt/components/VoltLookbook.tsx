'use client'

import { useRef } from 'react'
import { LOOKBOOK } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltLookbook() {
  const railRef = useRef<HTMLDivElement>(null)

  const nudge = (dir: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * Math.min(420, rail.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <section id="lookbook" className={styles.lookbook}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionEyebrow}>Lookbook</p>
        <h2 className={styles.sectionTitle}>Glisse. Zoom. Ressens.</h2>
        <div className={styles.lookbookNav}>
          <button type="button" className={styles.lookbookBtn} onClick={() => nudge(-1)} aria-label="Précédent">
            ←
          </button>
          <button type="button" className={styles.lookbookBtn} onClick={() => nudge(1)} aria-label="Suivant">
            →
          </button>
        </div>
      </div>

      <div className={styles.lookbookRail} ref={railRef}>
        {LOOKBOOK.map((shot, i) => (
          <figure key={shot.id} className={styles.lookCard} style={{ ['--i' as string]: i }}>
            <div className={styles.lookFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.title} className={styles.lookImg} loading="lazy" decoding="async" />
              <div className={styles.lookShine} aria-hidden />
            </div>
            <figcaption className={styles.lookCaption}>
              <span className={styles.lookTitle}>{shot.title}</span>
              <span className={styles.lookMeta}>{shot.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
