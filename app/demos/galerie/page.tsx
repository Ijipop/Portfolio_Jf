import Link from 'next/link'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import GalerieDemoGrid from './components/GalerieDemoGrid'
import GalerieDemoHeader from './components/GalerieDemoHeader'
import GalerieDemoInfo from './components/GalerieDemoInfo'
import { FOOTER } from './galerieDemoContent'
import styles from './GalerieDemo.module.css'

export default function GalerieDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <GalerieDemoHeader />
        <GalerieDemoGrid />
        <GalerieDemoInfo />

        <p className={styles.demosBack}>
          <Link href="/demos">{FOOTER.backLabel}</Link>
        </p>

        <div className={styles.attributionWrap}>
          <DemoVitrineAttribution />
        </div>

        <footer className={styles.footer}>
          <span>{FOOTER.copyright}</span>
        </footer>
      </div>
    </div>
  )
}
