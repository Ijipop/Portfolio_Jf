import Link from 'next/link'
import DemosAiVideoShowcase from './DemosAiVideoShowcase'
import DemosIndexAnimatedGrid from './DemosIndexAnimatedGrid'
import DemosIndexShell from './DemosIndexShell'
import DemosSeoCta from './DemosSeoCta'
import styles from './DemosIndex.module.css'

const demos = [
  {
    href: '/demos/construction',
    title: 'Construction & rénovation',
    desc: 'Ton industriel, preuves terrain, devis clair — chantiers mis en avant.',
    thumb: styles.thumbConstruction,
  },
  {
    href: '/demos/restaurant',
    title: 'Restaurant & chef',
    desc: 'Chaleur, menu, réservation — ambiance « carte postale ».',
    thumb: styles.thumbRestaurant,
  },
  {
    href: '/demos/tech',
    title: 'Produit SaaS tech',
    desc: 'Sombre, contraste fort, sections produit et confiance.',
    thumb: styles.thumbTech,
  },
  {
    href: '/demos/wellness',
    title: 'Bien-être & spa',
    desc: 'Ambiance douce et aérée — spa, yoga ou coaching.',
    thumb: styles.thumbWellness,
  },
  {
    href: '/demos/studio',
    title: 'Studio créatif',
    desc: 'Éditorial fort, serif & contrastes — direction artistique et édition.',
    thumb: styles.thumbStudio,
  },
  {
    href: '/demos/spectacle',
    title: 'Saison & spectacle',
    desc: 'Salle culturelle, affiche et or — programmation et billetterie.',
    thumb: styles.thumbSpectacle,
  },
  {
    href: '/demos/portfolio',
    title: 'Portfolio créateur',
    desc: 'Sobre, premium, bento — vitrine développeur web à Montréal.',
    thumb: styles.thumbPortfolio,
  },
  {
    href: '/demos/galerie',
    title: 'Galerie minimaliste',
    desc: 'Créatif punchy — grille serrée, overlay sombre, projets cliquables.',
    thumb: styles.thumbGalerie,
  },
] as const

export default function DemosIndexPage() {
  const cards = demos.map((d) => ({
    href: d.href,
    title: d.title,
    desc: d.desc,
    thumbClass: `${styles.thumb} ${d.thumb}`,
  }))

  return (
    <DemosIndexShell>
      <div className={styles.page}>
        <div className={styles.inner}>
        <span className={styles.kicker}>Exemples de style — pas des sites clients</span>
        <h1 className={styles.title}>Huit directions créatives pour votre prochain site</h1>
        <p className={styles.lead}>
          Maquettes de démonstration pour montrer des ambiances et secteurs différents — pas des mandats livrés.
          Ouvrez celles qui vous parlent.
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
