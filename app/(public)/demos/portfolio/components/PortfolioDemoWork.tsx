import ScrollReveal from '@/components/shared/ScrollReveal'
import { WORK } from '../portfolioDemoContent'
import styles from '../PortfolioDemo.module.css'
import PortfolioDemoWorkPreview from './PortfolioDemoWorkPreview'

export default function PortfolioDemoWork() {
  return (
    <section id="realisations" className={styles.section} aria-labelledby="work-heading">
      <ScrollReveal direction="up" distance={34}>
        <div>
          <p className={styles.sectionKicker}>{WORK.kicker}</p>
          <div className={styles.workHead}>
            <h2 id="work-heading">{WORK.title}</h2>
            <span>{WORK.aside}</span>
          </div>
          <div className={styles.bentoGrid}>
            <article className={styles.bentoFeatured}>
              <PortfolioDemoWorkPreview
                tone={WORK.featured.previewTone}
                label={WORK.featured.previewLabel}
                featured
              />
              <div className={styles.bentoCopy}>
                <p className={styles.bentoTag}>{WORK.featured.tag}</p>
                <h3>{WORK.featured.title}</h3>
                <p>{WORK.featured.body}</p>
              </div>
            </article>
            {WORK.compact.map((project) => (
              <article key={project.title} className={styles.bentoCompact}>
                <PortfolioDemoWorkPreview tone={project.previewTone} label={project.previewLabel} />
                <p className={styles.bentoTag}>{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
