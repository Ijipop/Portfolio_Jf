import Link from 'next/link'
import DemoResponsiveTopNav from '../DemoResponsiveTopNav'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import PortfolioDemoAbout from './components/PortfolioDemoAbout'
import PortfolioDemoContact from './components/PortfolioDemoContact'
import PortfolioDemoHero from './components/PortfolioDemoHero'
import PortfolioDemoProcess from './components/PortfolioDemoProcess'
import PortfolioDemoScrollLock from './components/PortfolioDemoScrollLock'
import PortfolioDemoScrollShell from './components/PortfolioDemoScrollShell'
import PortfolioDemoServices from './components/PortfolioDemoServices'
import PortfolioDemoWork from './components/PortfolioDemoWork'
import { FOOTER, NAV_LINKS } from './portfolioDemoContent'
import styles from './PortfolioDemo.module.css'

export default function PortfolioDemoPage() {
  return (
    <>
      <PortfolioDemoScrollLock />
      <div className={styles.stage}>
        <PortfolioDemoScrollShell className={styles.scrollShell}>
          <div className={styles.root}>
            <div className={styles.wrap}>
              <header className={styles.top}>
                <DemoResponsiveTopNav
                  brand={<span className={styles.brand}>Ijipop</span>}
                  navAriaLabel="Navigation"
                  menuSummaryLabel="Ouvrir le menu"
                  desktopNavClassName={styles.nav}
                  panelNavClassName={`${styles.nav} ${styles.navPanel}`}
                >
                  {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </DemoResponsiveTopNav>
              </header>

              <PortfolioDemoHero />
              <PortfolioDemoWork />
              <PortfolioDemoAbout />
              <PortfolioDemoServices />
              <PortfolioDemoProcess />
            </div>

            <div className={`${styles.wrap} ${styles.wrapWithFooter}`}>
              <PortfolioDemoContact />
              <DemoSocialIconsDecorative />
              <DemoVitrineAttribution />

              <footer className={styles.footer}>
                <span>{FOOTER.copyright}</span>
                <Link href="/demos">{FOOTER.backLabel}</Link>
              </footer>
            </div>
          </div>
        </PortfolioDemoScrollShell>
        <div className={styles.scrollFrame} aria-hidden="true" />
      </div>
    </>
  )
}
