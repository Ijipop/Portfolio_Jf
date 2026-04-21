import Link from 'next/link'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './CabinetProDemo.module.css'

export default function CabinetProDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Comptabilité · fiscalité · conseil</p>
          <h1 className={styles.title}>Marchand &amp; Associés</h1>
          <p className={styles.lead}>
            Un cabinet à taille humaine : clarté des honoraires, délais annoncés et un interlocuteur dédié pour les PME
            et les familles qui veulent des réponses actionnables, pas du jargon.
          </p>
          <div className={styles.actions}>
            <a className={styles.cta} href="mailto:accueil@marchand-associes.demo?subject=Rendez-vous">
              Prendre rendez-vous
            </a>
            <Link className={styles.secondary} href="/demos">
              Autres vitrines
            </Link>
          </div>
          <div className={styles.stats} aria-label="Indicateurs de confiance (exemples fictifs)">
            <div className={styles.stat}>
              <strong>18</strong>
              <span>années d’expérience cumulée (équipe)</span>
            </div>
            <div className={styles.stat}>
              <strong>240+</strong>
              <span>dossiers PME suivis (illustration)</span>
            </div>
            <div className={styles.stat}>
              <strong>48 h</strong>
              <span>délai cible de premier retour</span>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="pour-qui">
          <h2 id="pour-qui">Pour qui nous intervenons</h2>
          <p>
            PME en croissance, professions libérales et situations familiales complexes : nous structurons vos
            obligations et vos choix, avec des documents lisibles et des échéanciers partagés.
          </p>
          <ul className={styles.list}>
            <li>Tenue de livres et états financiers</li>
            <li>Planification fiscale personnelle et sociétés</li>
            <li>Accompagnement lors d’audit ou de restructuration (exemple)</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="processus">
          <h2 id="processus">Notre processus</h2>
          <div className={styles.process}>
            <article className={styles.step}>
              <span className={styles.stepNum} aria-hidden>
                1
              </span>
              <div>
                <h3>Rencontre découverte</h3>
                <p>30 à 45 minutes — vos objectifs, vos échéances et ce que vous attendez comme livrables.</p>
              </div>
            </article>
            <article className={styles.step}>
              <span className={styles.stepNum} aria-hidden>
                2
              </span>
              <div>
                <h3>Proposition écrite</h3>
                <p>Mandat, fourchettes d’honoraires et calendrier. Vous validez avant le moindre travail facturable.</p>
              </div>
            </article>
            <article className={styles.step}>
              <span className={styles.stepNum} aria-hidden>
                3
              </span>
              <div>
                <h3>Suivi et points fixes</h3>
                <p>Compte-rendus courts après chaque étape — vous savez toujours où en est le dossier.</p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="references">
          <h2 id="references">Ils nous confient leurs chiffres (fictif)</h2>
          <p>Quelques organisations avec lesquelles nous travaillons ou avons travaillé — logos génériques pour la démo.</p>
          <div className={styles.logos} aria-hidden>
            <span className={styles.logoFake}>Industrie</span>
            <span className={styles.logoFake}>Coop</span>
            <span className={styles.logoFake}>Clinique</span>
            <span className={styles.logoFake}>PME tech</span>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq">
          <h2 id="faq">Questions fréquentes</h2>
          <div className={styles.faq}>
            <div className={styles.faqItem}>
              <h3>Comment sont fixés les honoraires ?</h3>
              <p>
                Forfait pour les missions délimitées, sinon temps passé avec plafond mensuel convenu — toujours
                expliqué par écrit avant engagement.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>Travaillez-vous à distance ?</h3>
              <p>Oui : documents sécurisés, visioconférence et signature électronique selon les cas (vitrine fictive).</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Cette page est-elle un vrai cabinet ?</h3>
              <p>Non — texte et marque d’exemple pour illustrer une direction « cabinet pro / confiance ».</p>
            </div>
          </div>
        </section>

        <section className={styles.ctaBand}>
          <h2>Un premier échange sans engagement</h2>
          <p>Décrivez votre situation en deux phrases — nous vous proposons un créneau sous trois jours ouvrables.</p>
          <a className={styles.cta} href="mailto:accueil@marchand-associes.demo?subject=Premier%20contact">
            Écrire au cabinet
          </a>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 Marchand &amp; Associés — vitrine fictive</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
