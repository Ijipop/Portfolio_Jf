import type { ReactNode } from 'react'

/**
 * Accueil Pop Atelier — hors chrome vitrine historique `(public)`.
 * Pas de thème MUI, topology, FAB ni lecture d’apparence en base.
 * Le groupe (site-home) ne change pas l’URL : `/`.
 */
export default function SiteHomeLayout({ children }: { children: ReactNode }) {
  return children
}
