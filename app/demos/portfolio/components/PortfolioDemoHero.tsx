import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { HERO } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

export default function PortfolioDemoHero() {
  return (
    <section className={styles.hero} aria-labelledby="portfolio-hero-heading">
      <ScrollReveal direction="up" distance={32}>
        <div className={styles.heroGrid}>
          <div>
            <span className={styles.badge}>{HERO.badge}</span>
            <p className={styles.heroName}>{HERO.name}</p>
            <p className={styles.heroRole}>{HERO.role}</p>
            <h1 id="portfolio-hero-heading" className={styles.heroTitle}>
              {HERO.title}
            </h1>
            <p className={styles.heroLead}>{HERO.lead}</p>
            <div className={styles.row}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#contact">
                {HERO.primaryCta}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={HERO.secondaryHref}>
                {HERO.secondaryCta}
              </a>
            </div>
            <Link className={styles.heroDemosLink} href="/demos">
              Autres vitrines démo
            </Link>
          </div>
          <aside className={styles.metricsPanel} aria-label="Repères">
            <div className={styles.metricsGrid}>
              {HERO.metrics.map((metric) => (
                <div key={metric.label} className={styles.metric}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </ScrollReveal>
    </section>
  )
}
