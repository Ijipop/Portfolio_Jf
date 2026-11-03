import Link from 'next/link'
import styles from './DemoVitrineAttribution.module.css'

type Props = {
  /** Sur fond sombre (démo SaaS), meilleur contraste du bandeau. */
  variant?: 'light' | 'dark'
}

/**
 * Bandeau commun en bas des pages démo : renvoie vers le créateur (portfolio) sans voler la vedette au style de la vitrine.
 */
export default function DemoVitrineAttribution({ variant = 'light' }: Props) {
  return (
    <aside
      className={styles.wrap}
      data-demo-attribution-theme={variant === 'dark' ? 'dark' : undefined}
      aria-label="À propos de cette page d’exemple"
    >
      <p className={styles.text}>
        Exemple de mise en page — réalisé par{' '}
        <span className={styles.brand}>Ijipop</span>
        {' · '}
        <Link href="/portfolio/contact">Discuter de votre projet</Link>
      </p>
    </aside>
  )
}
