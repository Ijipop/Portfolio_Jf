import { Instrument_Sans, Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google'

/**
 * Typographie du site :
 * - Shell global : Inter (compat MUI / pages legacy)
 * - Funnel vendeur (home-v2, gateway) : Outfit (display) + Plus Jakarta Sans (corps)
 *   → lisibles, modernes, appréciées des clients PME
 * - Instrument Sans conservé pour compat scoped existante
 */

/** Police variable : une requête, graisses 100–900 pour MUI / sx. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Display funnel — chaleureux, pro, très lisible. */
export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

/** @deprecated Alias → outfit (CSS var --font-display). */
export const syne = outfit

/** Display legacy home-v2 — conservé pour pages déjà scopées. */
export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/** Body funnel — confiance, excellent en FR/EN. */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

/** @deprecated Alias → plusJakarta (CSS var --font-body). */
export const manrope = plusJakarta
