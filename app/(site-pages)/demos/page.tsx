import Link from 'next/link'
import { PublicChromeShell } from '@/components/public-v2/chrome'
import { DEMOS_CATALOG, type DemoThumbToken } from '@/lib/content/demos-catalog'
import DemosAiVideoShowcase from './DemosAiVideoShowcase'
import DemosIndexAnimatedGrid from './DemosIndexAnimatedGrid'
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

/**
 * Hub /demos — chrome Pop Atelier (Phase 6C).
 * Catalogue DEMOS_CATALOG inchangé ; neuf liens directs vers les démos (public).
 */
export default function DemosIndexPage() {
  const cards = DEMOS_CATALOG.map((d) => ({
    href: d.href,
    title: d.title,
    desc: d.description,
    thumbClass: `${styles.thumb} ${THUMB_CLASS_BY_TOKEN[d.thumbToken]}`,
  }))

  return (
    <PublicChromeShell
      pathname="/demos"
      mainId="pv2-demos-main"
      mainTestId="pv2-demos-main"
    >
      <div className={styles.page} data-testid="demos-hub">
        <div className={styles.inner}>
          <span className={styles.kicker}>Exemples de style — pas des sites clients</span>
          <h1 className={styles.title}>Neuf directions créatives pour votre prochain site</h1>
          <p className={styles.lead}>
            Maquettes de démonstration pour montrer des ambiances et secteurs différents — pas des
            mandats livrés. Ouvrez celles qui vous parlent.
          </p>
          <DemosIndexAnimatedGrid cards={cards} />
          <DemosAiVideoShowcase />
          <DemosSeoCta />
          <Link href="/" className={styles.back}>
            ← Retour à l’accueil
          </Link>
        </div>
      </div>
    </PublicChromeShell>
  )
}
