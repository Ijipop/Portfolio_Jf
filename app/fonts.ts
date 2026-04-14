import { Cormorant_Garamond, Inter } from 'next/font/google'

/**
 * Typographie du site (cohérence accueil / pageweb, tous modes beige·dev) :
 * - Titres de section « chapitre » → Cormorant via `SectionDisplayTitle` (pas le hero Ijipop ni les CTA).
 * - Corps, cartes, formulaires → Inter (famille du thème MUI, défaut Typography).
 * - CTA → `CTAButton` : sans-serif = même stack que le thème, fontWeight 600.
 * Ne pas utiliser Cormorant pour les boutons ni pour remplacer le corps sans raison.
 */

/** Police variable : une requête, graisses 100–900 pour MUI / sx. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Titres de section éditoriaux (Cormorant) — une instance pour tout le bundle. */
export const sectionDisplaySerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-section-display',
})
