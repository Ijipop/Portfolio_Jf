import type { ReactNode } from 'react'
import PublicChromeI18n from '@/components/public-v2/chrome/PublicChromeI18n'

/**
 * Layout sandbox IJIPOP 2.0 — hors chrome vitrine historique.
 * Pas de thème MUI, topology, FAB ni lecture d’apparence en base.
 * LanguageProvider via PublicChromeI18n pour SupportContactForm / sections
 * rendues hors PublicChromeShell (ex. aperçus Sur /v2-design-preview).
 * Le groupe (v2-sandbox) ne change pas l’URL : /v2-design-preview.
 */
export default function V2SandboxLayout({ children }: { children: ReactNode }) {
  return <PublicChromeI18n>{children}</PublicChromeI18n>
}
