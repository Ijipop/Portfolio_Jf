import Link from 'next/link'
import { DEMOS_CATALOG, type DemoThumbToken } from '@/lib/content/demos-catalog'
import DemosAiVideoShowcase from './DemosAiVideoShowcase'
import DemosIndexAnimatedGrid from './DemosIndexAnimatedGrid'
import DemosIndexShell from './DemosIndexShell'
import DemosSeoCta from './DemosSeoCta'
import styles from './DemosIndex.module.css'

/** Mapping explicite et typé thumbToken → classes CSS du hub (identité visuelle préservée). */
const THUMB_CLASS_BY_TOKEN: Record<DemoThumbToken, string> = {
  construction: styles.thumbConstruction,
  restaurant: styles.thumbRestaurant,
  tech: styles.thumbTech,
  wellness: styles.thumbWellness,
  studio: styles.thumbStudio,
  spectacle: styles.thumbSpectacle,
  portfolio: styles.thumbPortfolio,
  galerie: styles.thumbGalerie,
  volt: styles.thumbVolt,
}

export default function DemosIndexPage() {
  const cards = DEMOS_CATALOG.map((d) => ({
    href: d.href,
    title: d.title,
    desc: d.description,
    thumbClass: `${styles.thumb} ${THUMB_CLASS_BY_TOKEN[d.thumbToken]}`,
  }))

  return (
    <DemosIndexShell>
      <div className={styles.page}>
        <div className={styles.inner}>
          <span className={styles.kicker}>Exemples de style — pas des sites clients</span>
          <h1 className={styles.title}>Neuf directions créatives pour votre prochain site</h1>
          <p className={styles.lead}>
            Maquettes de démonstration pour montrer des ambiances et secteurs différents — pas des
            mandats livrés. Ouvrez celles qui vous parlent.
          </p>
          <DemosAiVideoShowcase />
          <DemosIndexAnimatedGrid cards={cards} />
          <DemosSeoCta />
          <Link href="/" className={styles.back}>
            ← Retour à l’accueil
          </Link>
        </div>
      </div>
    </DemosIndexShell>
  )
}
