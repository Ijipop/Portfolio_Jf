/** Perso / pro pour les projets web uniquement ; null pour logiciel ou non applicable. */
export type ProjectTypeLite = 'logiciel' | 'web'

export function resolveWebAudience(
  input: unknown,
  projectType: ProjectTypeLite,
): 'personal' | 'professional' | null {
  if (projectType === 'logiciel') return null
  if (input === 'personal') return 'personal'
  return 'professional'
}
