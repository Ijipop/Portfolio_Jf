import { Instrument_Sans, Inter, Manrope } from 'next/font/google'

/**
 * Typographie du site : **Inter** pour le shell global (nav, pages hors home web).
 * Accueil `/portfolio` (home-v2) : **Instrument Sans** (titres) + **Manrope** (corps) — scoped via CSS vars.
 */

/** Police variable : une requête, graisses 100–900 pour MUI / sx. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Display home-v2 — pro 2026 (scoped `/portfolio`). */
export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/** Body home-v2 — scoped `/portfolio`. */
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
