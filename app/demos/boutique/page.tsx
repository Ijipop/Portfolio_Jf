import Link from 'next/link'
import DemoSocialIconsDecorative from '../DemoSocialIconsDecorative'
import DemoVitrineAttribution from '../DemoVitrineAttribution'
import styles from './BoutiqueDemo.module.css'

export default function BoutiqueDemoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <div>
            <p className={styles.kicker}>Épicerie fine · Montréal</p>
            <h1 className={styles.title}>Nordic &amp; Roots</h1>
            <p className={styles.lead}>
              Produits d’ici et d’ailleurs choisis pour leur goût — du terrain à votre table, avec traçabilité et petits
              producteurs mis en avant.
            </p>
            <div className={styles.actions}>
              <a className={styles.cta} href="#produits">
                Voir la sélection
              </a>
              <Link className={styles.secondary} href="/demos">
                Autres vitrines
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden />
        </header>

        <section className={styles.story} aria-labelledby="notre-histoire">
          <h2 id="notre-histoire">Notre histoire</h2>
          <p>
            Tout a commencé sur un marché public : deux amis, des paniers trop lourds et l’envie de rapprocher les
            gens des artisans qu’on croise une fois l’été. Aujourd’hui, la boutique prolonge cette même curiosité — sans
            blabla marketing, juste des fiches claires et des dégustations le samedi (exemple fictif).
          </p>
        </section>

        <section className={styles.metaBand} aria-label="Horaires et retrait">
          <div className={styles.metaCard}>
            <h3>Horaires</h3>
            <p>
              Mar–Ven · 10 h – 19 h
              <br />
              Sam · 9 h – 17 h
              <br />
              Dim · fermé
            </p>
          </div>
          <div className={styles.metaCard}>
            <h3>Retrait &amp; livraison</h3>
            <p>Commande en ligne — retrait gratuit sous 24 h ou livraison le lendemain (zone illustrative).</p>
          </div>
          <div className={styles.metaCard}>
            <h3>Confiance</h3>
            <p>Emballages compostables · Fournisseurs listés sur chaque fiche produit (démo).</p>
          </div>
        </section>

        <section id="produits" aria-labelledby="titre-produits">
          <div className={styles.productsHead}>
            <h2 id="titre-produits">En ce moment</h2>
            <span>Exemples de fiches — aucune vente réelle</span>
          </div>
          <div className={styles.products}>
            <article className={styles.product}>
              <div className={styles.productVisual} aria-hidden />
              <div className={styles.productBody}>
                <h3>Miel brut forêt boréale</h3>
                <p>Notes boisées, pot verre consigné — petit apiculteur du nord du Québec.</p>
                <span className={styles.price}>24,95 $</span>
              </div>
            </article>
            <article className={styles.product}>
              <div className={styles.productVisual} aria-hidden />
              <div className={styles.productBody}>
                <h3>Fromage affiné 12 mois</h3>
                <p>Pâte ferme, croûte lavée — laiterie familiale, lot limité.</p>
                <span className={styles.price}>11,50 $ / 100 g</span>
              </div>
            </article>
            <article className={styles.product}>
              <div className={styles.productVisual} aria-hidden />
              <div className={styles.productBody}>
                <h3>Panier « Découverte »</h3>
                <p>Cinq produits surprise, carte postale incluse — idée cadeau.</p>
                <span className={styles.price}>52,00 $</span>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.reviews} aria-label="Avis clients fictifs">
          <article className={styles.review}>
            <p>« Enfin une fiche où on voit d’où vient le produit. Le retrait était prêt en dix minutes. »</p>
            <footer>— Thomas L., Rosemont</footer>
          </article>
          <article className={styles.review}>
            <p>« Ambiance chaleureuse sans être gadget — on sent que derrière il y a du choix, pas du volume. »</p>
            <footer>— Amélie K. (exemple)</footer>
          </article>
        </section>

        <section className={styles.ctaBand}>
          <h2>Passer en boutique</h2>
          <p>Écrivez-nous pour une dégustation privée ou une commande entreprise — réponse sous un jour ouvrable.</p>
          <a className={styles.cta} href="mailto:bonjour@nordic-roots.demo?subject=Visite%20boutique">
            Nous écrire
          </a>
        </section>

        <DemoSocialIconsDecorative />
        <DemoVitrineAttribution />

        <footer className={styles.footer}>
          <span>© 2026 Nordic &amp; Roots — vitrine fictive</span>
          <Link href="/demos">Plus d’exemples</Link>
        </footer>
      </div>
    </div>
  )
}
