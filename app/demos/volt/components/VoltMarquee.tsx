'use client'

import { MARQUEE } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltMarquee() {
  const loop = [...MARQUEE, ...MARQUEE]
  return (
    <div className={styles.marquee} aria-hidden>
      <div className={styles.marqueeTrack}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.marqueeDot}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
