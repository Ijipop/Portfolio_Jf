import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { DEMOS_HUB_LINK_LABEL } from '../demoLabels'
import DemoResponsiveTopNav from '../DemoResponsiveTopNav'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './SpectacleDemo.module.css'

export default function SpectacleDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <DemoResponsiveTopNav
            brand={<span className={styles.venue}>Théâtre des Hautes lumières</span>}
            navAriaLabel="Navigation"
            menuSummaryLabel="Ouvrir le menu"
            desktopNavClassName={styles.nav}
            panelNavClassName={`${styles.nav} ${styles.navPanel}`}
            panelVariant="spectacle"
            summaryTone="spectacle"
          >
            <a href="#programme">Programme</a>
            <a href="#infos">Infos</a>
            <a href="#billets">Billetterie</a>
          </DemoResponsiveTopNav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroMedia} aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/demos/spectacle/hero.jpg" alt="" loading="eager" decoding="async" />
          </div>
          <ScrollReveal direction="up" distance={34}>
            <div className={styles.heroInner}>
              <p className={styles.season}>Saison 2025–2026 · vitrine fictive</p>
              <h1 className={styles.title}>Une scène pour les voix qui prennent le temps.</h1>
              <p className={styles.lead}>
                Théâtre, musique de chambre et récits — programmation exigeante, accueil chaleureux, au cœur du quartier
                (exemple).
              </p>
              <div className={styles.actions}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#billets">
                  Réserver des places
                </a>
                <Link className={`${styles.btn} ${styles.btnGhost}`} href="/demos">
                  {DEMOS_HUB_LINK_LABEL}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="programme" className={styles.program} aria-labelledby="prog-heading">
          <ScrollReveal direction="up" distance={36}>
            <div>
              <h2 id="prog-heading">À l’affiche</h2>
              <div className={styles.list}>
                <article className={styles.row}>
                  <span className={styles.date}>14 nov.</span>
                  <div className={styles.rowBody}>
                    <div className={styles.rowThumb} aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/demos/spectacle/show-01.jpg" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <p className={styles.show}>Les Heures creuses</p>
                      <p className={styles.detail}>Création québécoise · mise en scène A. Lefrançois</p>
                    </div>
                  </div>
                  <span className={styles.tag}>Théâtre</span>
                </article>
                <article className={styles.row}>
                  <span className={styles.date}>22 nov.</span>
                  <div className={styles.rowBody}>
                    <div className={styles.rowThumb} aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/demos/spectacle/show-02.jpg" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <p className={styles.show}>Quatuor Mélilot</p>
                      <p className={styles.detail}>Haydn · Bartók · une œuvre commande locale</p>
                    </div>
                  </div>
                  <span className={styles.tag}>Musique</span>
                </article>
                <article className={styles.row}>
                  <span className={styles.date}>6 déc.</span>
                  <div>
                    <p className={styles.show}>Contes sous la neige</p>
                    <p className={styles.detail}>Spectacle familial · durée 1 h 10, sans entracte</p>
                  </div>
                  <span className={styles.tag}>Jeune public</span>
                </article>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="infos" className={styles.infoBand} aria-label="Informations pratiques">
          <ScrollReveal direction="up" distance={28}>
            <div className={styles.infoReveal}>
              <div>
                <h3>Adresse</h3>
                <p>480, rue fictive · Montréal — accès métro à proximité</p>
              </div>
              <div>
                <h3>Caisse</h3>
                <p>Mar–Ven 12 h – 18 h · Sam 11 h – 17 h · ouverture soir 1 h avant le spectacle</p>
              </div>
              <div>
                <h3>Accessibilité</h3>
                <p>Places PMR sur réservation · boucles magnétiques à la caisse (exemple)</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal direction="up" distance={24}>
          <blockquote className={styles.quote}>
            « Une salle où l’on entend tout : le silence compte autant que la musique. »
            <footer>— Revue Scène & Lieu (fictif)</footer>
          </blockquote>
        </ScrollReveal>

        <section id="billets" className={styles.cta} aria-labelledby="billets-heading">
          <ScrollReveal direction="up" distance={28}>
            <div>
              <h2 id="billets-heading">Billetterie</h2>
              <p>Écrivez-nous pour choisir une date ou un forfait saison — confirmation par courriel sous 48 h (exemple).</p>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="mailto:billets@hautes-lumieres.demo?subject=R%C3%A9servation">
                Acheter des billets
              </a>
            </div>
          </ScrollReveal>
        </section>

        <DemoSocialIconsDecorative variant="dark" />
        <DemoVitrineAttribution variant="dark" />

        <footer className={styles.footer}>
          <span>© 2026 Théâtre des Hautes lumières</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
