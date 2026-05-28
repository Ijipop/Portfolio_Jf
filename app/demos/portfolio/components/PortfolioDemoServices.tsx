import ScrollReveal from '@/components/shared/ScrollReveal'
import { SERVICES } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

export default function PortfolioDemoServices() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <ScrollReveal direction="up" distance={30}>
        <div>
          <p className={styles.sectionKicker}>{SERVICES.kicker}</p>
          <h2 id="services-heading" className={styles.sectionTitle}>
            {SERVICES.title}
          </h2>
          <div className={styles.servicesGrid}>
            {SERVICES.items.map((item) => (
              <article key={item.title} className={styles.serviceCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
