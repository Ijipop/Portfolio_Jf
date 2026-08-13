import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import Link from 'next/link'
import DemoResponsiveTopNav from '../DemoResponsiveTopNav'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import VoltDrops from './components/VoltDrops'
import VoltHero from './components/VoltHero'
import VoltLookbook from './components/VoltLookbook'
import VoltManifesto from './components/VoltManifesto'
import VoltMarquee from './components/VoltMarquee'
import VoltUnderHero from './components/VoltUnderHero'
import VoltVisit from './components/VoltVisit'
import { BRAND, FOOTER, NAV_LINKS } from './voltDemoContent'
import styles from './VoltDemo.module.css'

const voltDisplay = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-volt-display',
  display: 'swap',
})

const voltBody = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-volt-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function VoltDemoPage() {
  return (
    <div className={`${styles.root} ${voltDisplay.variable} ${voltBody.variable}`}>
      <div className={styles.heroStage}>
        <div className={styles.wrap}>
          <header className={styles.top}>
            <DemoResponsiveTopNav
              brand={<span className={styles.brand}>{BRAND}</span>}
              navAriaLabel="Navigation VOLT"
              menuSummaryLabel="Ouvrir le menu"
              desktopNavClassName={styles.nav}
              panelNavClassName={`${styles.nav} ${styles.navPanel}`}
              panelVariant="tech"
              summaryTone="dark"
            >
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </DemoResponsiveTopNav>
          </header>
        </div>
        <VoltHero />
      </div>

      <VoltUnderHero />

      <div className={styles.takeover}>
        <VoltMarquee />
        <VoltLookbook />
        <VoltDrops />
        <VoltManifesto />
        <VoltVisit />

        <div className={styles.footerWrap}>
          <DemoSocialIconsDecorative />
          <DemoVitrineAttribution variant="dark" />
          <footer className={styles.footer}>
            <span>{FOOTER.copyright}</span>
            <Link href="/demos">{FOOTER.backLabel}</Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
