/**
 * Fichiers Phase 8 (Premium Finish) explicitement autorisés.
 * Les gardes readonly des phases antérieures doivent les ignorer.
 */
export const PHASE8_PREMIUM_FILES = new Set([
  // À propos
  'app/components/public-v2/about/AboutPageClient.tsx',
  'app/components/public-v2/about/AboutPage.module.css',
  // Navbar / chrome
  'app/components/public-v2/chrome/PublicHeader.tsx',
  'app/components/public-v2/chrome/PublicHeader.module.css',
  'app/components/public-v2/chrome/BrandLockup.module.css',
  'app/components/public-v2/chrome/PublicMobileNav.tsx',
  'app/components/public-v2/chrome/PublicMobileNav.module.css',
  'app/components/public-v2/chrome/HeaderScrollShell.tsx',
  'app/components/public-v2/chrome/__tests__/PublicHeader.test.tsx',
  'lib/public-v2/nav.ts',
  'lib/public-v2/__tests__/nav.test.ts',
  // Galerie Réalisations — composition filtres
  'app/components/public-v2/projects/ProjectsCatalog.tsx',
  'app/components/public-v2/projects/ProjectsCatalog.module.css',
  'lib/public-v2/projectsContent.ts',
  // Contact V2 — Switch géométrie (+ AiLeadDiagnosis hors garde path contact/)
  'app/components/public-v2/contact/ContactFormV2.module.css',
  'app/components/contact/AiLeadDiagnosis.tsx',
  // Phase 8B — Traducteur + DeskDot
  'app/(site-pages)/traducteur/TraducteurLandingClient.tsx',
  'app/(site-pages)/traducteur/TraducteurLanding.module.css',
  'app/(site-pages)/deskdot/DeskDotPhotoStack.tsx',
  'app/(site-pages)/deskdot/DeskDotLanding.module.css',
  'app/i18n/locales/fr.ts',
  'app/i18n/locales/en.ts',
  // Allowlist + garde 6C
  'app/components/public-v2/__tests__/phase8-premium-allowlist.ts',
  'app/components/public-v2/__tests__/sections-readonly-6c.test.ts',
])
