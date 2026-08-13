'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'
import { MANIFESTO } from '../voltDemoContent'
import styles from '../VoltDemo.module.css'

export default function VoltManifesto() {
  return (
    <section id="manifeste" className={styles.manifesto}>
      <p className={styles.sectionEyebrow}>{MANIFESTO.eyebrow}</p>
      <div className={styles.manifestoLines}>
        {MANIFESTO.lines.map((line, i) => (
          <ScrollReveal key={line} delay={i * 0.12} direction="left" distance={60} uncappedDelay>
            <p className={styles.manifestoLine}>{line}</p>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.35} direction="up" distance={28}>
        <p className={styles.manifestoBody}>{MANIFESTO.body}</p>
      </ScrollReveal>
    </section>
  )
}
