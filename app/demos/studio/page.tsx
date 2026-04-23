import Link from 'next/link'
import ScrollReveal from '@/components/shared/ScrollReveal'
import DemoResponsiveTopNav from '../DemoResponsiveTopNav'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './StudioDemo.module.css'

export default function StudioDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.top}>
          <DemoResponsiveTopNav
            brand={<span className={styles.brand}>Marge ouverte</span>}
            navAriaLabel="Navigation"
            menuSummaryLabel="Ouvrir le menu"
            desktopNavClassName={styles.nav}
            panelNavClassName={`${styles.nav} ${styles.navPanel}`}
          >
            <a href="#atelier">Atelier</a>
            <a href="#selection">Sélection</a>
            <a href="#contact">Contact</a>
          </DemoResponsiveTopNav>
        </header>

        <section className={styles.hero}>
          <ScrollReveal direction="up" distance={32}>
            <div className={styles.heroReveal}>
              <div>
                <h1 className={styles.heroTitle}>Direction artistique, sans formule toute faite.</h1>
                <p className={styles.heroLead}>
                  Identités éditoriales, campagnes culturelles et signalétique sur mesure — pour institutions, éditeurs et
                  marques qui assument une voix singulière.
                </p>
                <div className={styles.row}>
                  <a className={`${styles.btn} ${styles.btnPrimary}`} href="#contact">
                    Parler du projet
                  </a>
                  <Link className={`${styles.btn} ${styles.btnGhost}`} href="/demos">
                    Autres vitrines
                  </Link>
                </div>
              </div>
              <p className={styles.heroAside} id="atelier">
                Bureau fictif pour cette vitrine. Nous travaillons en binôme directeur·rice + designer, avec des livrables
                imprimés et numériques coordonnés.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <section className={styles.darkBand} aria-labelledby="piliers-heading">
        <ScrollReveal direction="up" distance={30}>
          <div className={styles.darkBandInner}>
            <h2 id="piliers-heading">Trois axes</h2>
            <p className={styles.darkTitle}>Ce que l’on prend en charge, de la proposition à la remise des fichiers.</p>
            <div className={styles.grid}>
              <div className={styles.cell}>
                <h3>Identité & charte</h3>
                <p>Typographie, couleurs, rythme de page — manuel clair pour vos équipes et partenaires.</p>
              </div>
              <div className={styles.cell}>
                <h3>Campagnes</h3>
                <p>Affichage, réseaux, signalétique d’événement : une ligne graphique tenue sur tous les supports.</p>
              </div>
              <div className={styles.cell}>
                <h3>Édition</h3>
                <p>Brochures, rapports annuels, catalogues : mise en page soignée et iconographie encadrée.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <div className={`${styles.wrap} ${styles.wrapWithFooter}`}>
        <section id="selection" className={styles.work} aria-labelledby="work-heading">
          <ScrollReveal direction="up" distance={34}>
            <div>
              <div className={styles.workHead}>
                <h2 id="work-heading">Mandats récents</h2>
                <span>Extraits illustratifs — noms et contextes fictifs.</span>
              </div>
              <div className={styles.workGrid}>
                <div className={styles.workLarge}>
                  <h3>Saison 2026</h3>
                  <p>Identité visuelle pour un festival de musique actuelle.</p>
                </div>
                <div className={styles.workStack}>
                  <article className={styles.workCard}>
                    <h3>Maison d’édition</h3>
                    <p>Collection « Terrain sec » : couvertures, choix de papier et repères de foliotage.</p>
                  </article>
                  <article className={styles.workCard}>
                    <h3>Musée régional</h3>
                    <p>Exposition itinérante : affiches, panneaux et guide de salle bilingue.</p>
                  </article>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="contact" className={styles.cta} aria-labelledby="cta-heading">
          <ScrollReveal direction="up" distance={26}>
            <div>
              <h2 id="cta-heading">Un dossier à partager ?</h2>
              <p>Envoyez un court descriptif et vos contraintes de calendrier — réponse sous une semaine ouvrable (exemple).</p>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="mailto:bonjour@margeouverte.demo?subject=Projet%20cr%C3%A9atif">
                Écrire au studio
              </a>
            </div>
          </ScrollReveal>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 Marge ouverte</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
