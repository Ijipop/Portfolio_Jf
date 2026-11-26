/**
 * Gate d’activation publique du sélecteur FR/EN Pop Atelier.
 * Défaut : désactivé — le toggle ne doit pas s’afficher tant que le
 * parcours principal n’est pas bilingue (voir docs/ijipop-v2/I18N-V2-AUDIT.md).
 */
export function isPublicI18nToggleEnabled(): boolean {
  return process.env.NEXT_PUBLIC_I18N_TOGGLE_ENABLED === 'true'
}
