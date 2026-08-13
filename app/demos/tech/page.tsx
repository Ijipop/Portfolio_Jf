import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'
import DemoResponsiveTopNav from '../DemoResponsiveTopNav'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './TechDemo.module.css'

const CONTACT_MAILTO =
  'mailto:sales@nimbusops.demo?subject=Contact%20commercial&body=Bonjour%2C%0A%0A'

export default function TechDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.nav}>
          <DemoResponsiveTopNav
            brand={<span className={styles.brand}>NimbusOps</span>}
            navAriaLabel="Navigation principale"
            menuSummaryLabel="Ouvrir le menu"
            desktopNavClassName={styles.navLinks}
            panelNavClassName={`${styles.navLinks} ${styles.navPanel}`}
            panelVariant="tech"
            summaryTone="dark"
          >
            <a href="#features">Produit</a>
            <a href="#trust">Confiance</a>
            <a href="#cta">Contact</a>
          </DemoResponsiveTopNav>
        </header>

        <section className={styles.hero}>
          <div>
            <span className={styles.badge}>SaaS · SLA 99,9 % · multi-régions</span>
            <h1 className={styles.title}>L’infrastructure que vos clients ne voient pas — mais adorent.</h1>
            <p className={styles.lead}>
              Une plateforme pensée pour la disponibilité, la sécurité et la clarté opérationnelle — pour équipes produit
              et IT.
            </p>
            <div className={styles.row}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#cta">
                Réserver une démo
              </a>
              <Link className={`${styles.btn} ${styles.btnGhost}`} href="/demos">
                {DEMOS_HUB_LINK_LABEL}
              </Link>
            </div>
          </div>
          <div className={styles.panel} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/tech/dashboard.jpg"
              alt=""
              className={styles.panelPhoto}
              loading="eager"
              decoding="async"
            />
            <div className={styles.panelGlow} />
            <div className={styles.panelGrid}>
              <div className={styles.metric}>
                <span>Latence API</span>
                <strong>&lt; 42 ms</strong>
              </div>
              <div className={styles.metric}>
                <span>Intégrations</span>
                <strong>Slack · Jira · OIDC</strong>
              </div>
              <div className={styles.metric}>
                <span>Journalisation</span>
                <strong>Export SOC2-ready</strong>
              </div>
              <div className={styles.metric}>
                <span>Équipes</span>
                <strong>RBAC granulaire</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className={styles.section}>
          <ScrollReveal direction="up" distance={36}>
            <div>
              <h2 className={styles.h2}>Trois piliers produit</h2>
              <p className={styles.p}>Une vision claire des bénéfices : détail en dessous.</p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <h3>Observabilité</h3>
                  <p>Tableaux de bord, alertes intelligentes, rétention des logs configurable.</p>
                </div>
                <div className={styles.feature}>
                  <h3>Sécurité</h3>
                  <p>SSO, MFA, politiques IP — contrôle fin des accès pour les équipes B2B.</p>
                </div>
                <div className={styles.feature}>
                  <h3>Automatisation</h3>
                  <p>Webhooks, playbooks, intégrations sans code pour les équipes opérationnelles.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="trust" className={styles.section}>
          <ScrollReveal direction="up" distance={32}>
            <div>
              <h2 className={styles.h2}>Ils nous font confiance</h2>
              <p className={styles.p}>Des équipes techniques et directions IT qui exigent fiabilité et traçabilité.</p>
              <div className={styles.logos}>
                <span className={styles.logoPill}>Groupe Noville</span>
                <span className={styles.logoPill}>Retail Nord</span>
                <span className={styles.logoPill}>LogiTransit</span>
                <span className={styles.logoPill}>SantéCollectif</span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="cta" className={styles.section} aria-labelledby="cta-heading">
          <ScrollReveal direction="up" distance={28}>
            <div>
              <h2 id="cta-heading" className={styles.h2}>
                Prêt à passer en prod ?
              </h2>
              <p className={styles.p}>
                Parlez à notre équipe commerciale pour planifier un appel ou une démo produit.
              </p>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={CONTACT_MAILTO}>
                Contacter l’équipe NimbusOps
              </a>
            </div>
          </ScrollReveal>
        </section>

        <DemoSocialIconsDecorative variant="dark" />
        <DemoVitrineAttribution variant="dark" />

        <footer className={styles.footer}>
          <span>© 2026 NimbusOps</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
