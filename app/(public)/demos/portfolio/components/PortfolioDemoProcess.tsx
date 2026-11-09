import ScrollReveal from '@/components/shared/ScrollReveal'
import { PROCESS } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

export default function PortfolioDemoProcess() {
  return (
    <section id="processus" className={styles.processBand} aria-labelledby="process-heading">
      <ScrollReveal direction="up" distance={28}>
        <div className={styles.processInner}>
          <div className={styles.processHead}>
            <p className={styles.sectionKicker}>{PROCESS.kicker}</p>
            <h2 id="process-heading" className={styles.processTitle}>
              {PROCESS.title}
            </h2>
          </div>

          <div className={styles.processTrack}>
            <div className={styles.processRail} aria-hidden="true" />
            {PROCESS.steps.map((step) => (
              <article key={step.num} className={styles.processCard}>
                <div className={styles.processMarker}>
                  <span>{step.num}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
