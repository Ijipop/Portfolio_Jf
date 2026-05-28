import { PROJECTS, SITE } from '../galerieDemoContent'
import styles from '../GalerieDemo.module.css'

export default function GalerieDemoGrid() {
  return (
    <section id="projets" className={styles.grid} aria-label="Travaux sélectionnés">
      {PROJECTS.map((project) => (
        <a
          key={project.id}
          className={styles.tile}
          data-tone={project.tone}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${project.category}, ouvrir le projet`}
        >
          <span className={styles.tileVisual} aria-hidden="true" />
          <span className={styles.tileOverlay}>
            <span className={styles.tileOverlayInner}>
              <span className={styles.tileTitle}>{project.title}</span>
              <span className={styles.tileCategory}>{project.category}</span>
              <span className={styles.tileAction}>{SITE.viewProject} →</span>
            </span>
          </span>
        </a>
      ))}
    </section>
  )
}
