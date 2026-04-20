import Link from 'next/link'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './ConstructionDemo.module.css'

export default function ConstructionDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <span className={styles.logo}>Structura</span>
          <nav className={styles.nav} aria-label="Navigation">
            <a href="#services">Services</a>
            <a href="#realisations">Réalisations</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div>
            <p className={styles.heroEyebrow}>Génie civil & rénovation</p>
            <h1 className={styles.heroTitle}>On bâtit solide. On livre dans les temps.</h1>
            <p className={styles.heroLead}>
              Chantiers résidentiels et commerciaux, rénovations clé en main et suivi terrain — calendrier clair, équipe
              dédiée.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.btnPrimary} href="#contact">
                Demander une soumission
              </a>
              <Link className={styles.btnGhost} href="/demos">
                Autres vitrines
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>180+</div>
                <div className={styles.statLabel}>chantiers livrés</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>24 h</div>
                <div className={styles.statLabel}>délai de rappel moyen</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>RBQ</div>
                <div className={styles.statLabel}>conformité & assurances</div>
              </div>
            </div>
            <p className={styles.statsDisclaimer}>Chiffres illustratifs pour cette vitrine d’exemple.</p>
          </div>
          <div className={styles.heroVisual} role="presentation" />
        </section>

        <section id="services" className={styles.section}>
          <h2 className={styles.sectionTitle}>Ce qu’on fait sur le terrain</h2>
          <p className={styles.sectionLead}>
            Trois axes : structure, rénovation complète et chantiers pour commerces — avec un interlocuteur unique.
          </p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <h3>Structure & agrandissement</h3>
              <p>Extensions, charpente, ouvertures mur porteur — planification et exécution coordonnées.</p>
            </div>
            <div className={styles.card}>
              <h3>Rénovation clé en main</h3>
              <p>Cuisine, salle de bain, sous-sol : une équipe, un calendrier, une facture lisible.</p>
            </div>
            <div className={styles.card}>
              <h3>Projets commerciaux</h3>
              <p>Bureaux, commerces légers : respect des normes, site sécurisé, communication pro avec vos locataires.</p>
            </div>
          </div>
        </section>

        <section id="realisations" className={styles.section}>
          <h2 className={styles.sectionTitle}>Réalisations récentes</h2>
          <p className={styles.sectionLead}>Aperçu de chantiers et finitions — sous toutes les saisons.</p>
          <div className={styles.grid3}>
            <div className={styles.card} style={{ minHeight: 120, background: 'linear-gradient(120deg,#44403c,#78716c)' }} />
            <div className={styles.card} style={{ minHeight: 120, background: 'linear-gradient(120deg,#b45309,#d97706)' }} />
            <div className={styles.card} style={{ minHeight: 120, background: 'linear-gradient(120deg,#57534e,#a8a29e)' }} />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Notre processus en 3 étapes</h2>
          <div className={styles.process}>
            <div className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <h3>Visite & devis</h3>
              <p className={styles.sectionLead} style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                On prend les mesures, on clarifie le budget, on vous rend une fourchette réaliste.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <h3>Planning</h3>
              <p className={styles.sectionLead} style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                Jalons, matériaux, équipe sur place : vous savez quoi attendre chaque semaine.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <h3>Livraison</h3>
              <p className={styles.sectionLead} style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                Visite de livraison, garanties, photos avant / après pour vos communications.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <blockquote className={styles.quote}>
            « Réponse rapide, chantier propre, zéro mauvaise surprise sur la facture. »
            <cite>— Martin T., propriétaire</cite>
          </blockquote>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>FAQ express</h2>
          <div className={styles.faqItem}>
            <strong>Travaillez-vous l’hiver ?</strong>
            <span>Oui, la plupart des travaux intérieurs et plusieurs types de chantiers extérieurs se poursuivent toute l’année.</span>
          </div>
          <div className={styles.faqItem}>
            <strong>Zone desservie ?</strong>
            <span>Grand Montréal et environs — nous confirmer votre adresse lors de la demande.</span>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>Parlons de votre projet</h2>
          <p className={styles.sectionLead}>
            Décrivez votre besoin : on vous rappelle pour fixer une visite et une soumission.
          </p>
          <a
            className={styles.btnPrimary}
            href="mailto:devis@structura.demo?subject=Demande%20de%20soumission"
          >
            Écrire à Structura
          </a>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 Structura</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
