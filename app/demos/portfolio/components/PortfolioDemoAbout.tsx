import ScrollReveal from '@/components/shared/ScrollReveal'
import { ABOUT } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'

export default function PortfolioDemoAbout() {
  return (
    <section id="apropos" className={styles.section} aria-labelledby="about-heading">
      <ScrollReveal direction="up" distance={30}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutVisual} aria-hidden>
            <div className={styles.aboutOrb}>
              <span className={styles.aboutInitials}>JFL</span>
            </div>
            <p className={styles.aboutCaption}>Montréal · Québec</p>
          </div>
          <div>
            <p className={styles.sectionKicker}>{ABOUT.kicker}</p>
            <h2 id="about-heading" className={styles.sectionTitle}>
              {ABOUT.title}
            </h2>
            <p className={styles.aboutBody}>{ABOUT.body}</p>
            <ul className={styles.skillList}>
              {ABOUT.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
