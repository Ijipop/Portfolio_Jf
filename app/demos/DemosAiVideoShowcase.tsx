'use client'

import { useState } from 'react'
import AutoplayLoopVideo from '@/components/shared/AutoplayLoopVideo'
import styles from './DemosIndex.module.css'

const DEMO2_SRC = '/img/demo2.mp4'

export default function DemosAiVideoShowcase() {
  const [hovered, setHovered] = useState(false)
  const caption = hovered
    ? 'Possibilité d’ajouter des vidéos IA personnalisées à votre site — sur mesure, propres et modernes.'
    : 'Exemple de rendu vidéo pour une vitrine web (génération IA, intégrée au design du site).'

  return (
    <section
      className={styles.aiSection}
      aria-labelledby="demos-ai-video-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.aiSectionGrid}>
        <div className={styles.aiSectionCopy}>
          <span className={styles.aiKicker}>Animation &amp; IA</span>
          <h2 id="demos-ai-video-title" className={styles.aiTitle}>
            Donnez vie à votre site avec une vidéo sur mesure
          </h2>
          <p className={styles.aiLead}>
            Au-delà des mises en page statiques, on peut intégrer des{' '}
            <strong>vidéos IA personnalisées</strong> — accueil, bandeau, mise en avant d’un
            service — pensées pour votre marque.
          </p>
          <p className={`${styles.aiCaption} ${hovered ? styles.aiCaptionActive : ''}`}>{caption}</p>
        </div>

        <div className={styles.aiVideoFrame}>
          <AutoplayLoopVideo
            src={DEMO2_SRC}
            ariaLabel={caption}
            ioThreshold={0.15}
            title={caption}
          />
        </div>
      </div>
    </section>
  )
}
