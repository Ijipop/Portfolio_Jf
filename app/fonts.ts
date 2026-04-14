import { Inter } from 'next/font/google'

/**
 * Typographie du site : **Inter** pour tout le contenu (corps, titres de section, CTA via le thème MUI).
 * Les titres de section utilisent `SectionDisplayTitle` avec la même famille que `theme.typography.fontFamily`.
 */

/** Police variable : une requête, graisses 100–900 pour MUI / sx. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
