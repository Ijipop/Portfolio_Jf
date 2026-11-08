/**
 * Fichiers touchés par la préparation médias clients autorisés (prépublication).
 * Les gardes readonly des phases antérieures doivent les ignorer.
 */
export const APPROVED_CLIENT_MEDIA_FILES = new Set([
  'lib/public-v2/heroContent.ts',
  'lib/public-v2/workContent.ts',
  'app/components/public-v2/sections/Hero/__tests__/Hero.test.tsx',
  'app/components/public-v2/sections/Work/__tests__/WorkSection.test.tsx',
])
