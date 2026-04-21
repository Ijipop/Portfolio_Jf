import Link from 'next/link'
import { THEMES } from '@/design-system/themes'
import { getBeigePresentationTopologyBackground } from '@/utils/syncPortfolioThemeToDocument'
import styles from './DemosIndex.module.css'

const hubBackground = getBeigePresentationTopologyBackground(THEMES.latte)

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
    href: '/demos/cabinet-pro',
    title: 'Cabinet pro & confiance',
    desc: 'Ton éditorial, preuves chiffrées, processus clair — comptable, conseil ou mandat réglementé.',
    thumb: styles.thumbCabinetPro,
  },
  {
    href: '/demos/boutique',
    title: 'Commerce local premium',
    desc: 'Histoire de marque, grille produits, horaires — épicerie, atelier ou boutique indépendante.',
    thumb: styles.thumbBoutique,
  },
] as const

export default function DemosIndexPage() {
  return (
    <div className={styles.page} style={{ background: hubBackground }}>
      <div className={styles.inner}>
        <span className={styles.kicker}>Exemples de styles</span>
        <h1 className={styles.title}>Six directions créatives pour votre prochain site</h1>
        <p className={styles.lead}>
          Chaque page illustre une direction graphique et une ambiance différentes. Ouvrez celles qui vous parlent.
        </p>
        <div className={styles.grid}>
          {demos.map((d) => (
            <Link key={d.href} href={d.href} className={styles.card}>
              <div className={`${styles.thumb} ${d.thumb}`} aria-hidden />
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{d.title}</h2>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/" className={styles.back}>
          ← Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
