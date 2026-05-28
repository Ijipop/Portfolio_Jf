import Link from 'next/link'
import DemoResponsiveTopNav from '../../DemoResponsiveTopNav'
import { FOOTER, SITE } from '../galerieDemoContent'
import styles from '../GalerieDemo.module.css'

export default function GalerieDemoHeader() {
  return (
    <header className={styles.top}>
      <DemoResponsiveTopNav
        brand={
          <Link href="#projets" className={styles.brand}>
            {SITE.brand}
          </Link>
        }
        navAriaLabel="Navigation"
        menuSummaryLabel="Menu"
        desktopNavClassName={styles.nav}
        panelNavClassName={`${styles.nav} ${styles.navPanel}`}
      >
        <a href="#projets">{SITE.navProjects}</a>
        <a href="#info">{SITE.navInfo}</a>
        <Link href="/demos" className={styles.navDemosLink}>
          {FOOTER.backLabel}
        </Link>
      </DemoResponsiveTopNav>
    </header>
  )
}
