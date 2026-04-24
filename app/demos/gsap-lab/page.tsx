import type { Metadata } from 'next'
import Link from 'next/link'
import GsapLabHero from './GsapLabHero'
import GsapLabScrollGrid from './GsapLabScrollGrid'
import styles from './GsapLab.module.css'

export const metadata: Metadata = {
  title: 'Lab GSAP',
  description: 'Expérimentation GSAP (@gsap/react), ScrollTrigger et prefers-reduced-motion — démos.',
  robots: { index: false, follow: false },
}

export default function GsapLabPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.notice}>
          Page de test interne : animations limitées, accessibilité motion respectée, revert GSAP au changement de
          page (SPA).
        </p>
        <GsapLabHero />
        <GsapLabScrollGrid />
        <Link href="/demos" className={styles.back}>
          ← Retour aux démos
        </Link>
      </div>
    </div>
  )
}
