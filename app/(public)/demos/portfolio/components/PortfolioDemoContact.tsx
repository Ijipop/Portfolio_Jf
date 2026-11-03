import ScrollReveal from '@/components/shared/ScrollReveal'
import { CONTACT, CONTACT_MAILTO } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

export default function PortfolioDemoContact() {
  return (
    <section id="contact" className={styles.cta} aria-labelledby="contact-heading">
      <ScrollReveal direction="up" distance={26}>
        <div>
          <h2 id="contact-heading">{CONTACT.title}</h2>
          <p>{CONTACT.body}</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={CONTACT_MAILTO}>
            {CONTACT.cta}
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
