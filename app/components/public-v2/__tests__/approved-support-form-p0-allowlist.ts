/**
 * Files changed by PR #229 (support form mobile hotfix) and merged to Production.
 * Allowed to diverge from Phase 6B6+ / 6C readonly baselines without weakening
 * other frozen surfaces.
 */
export const SUPPORT_FORM_P0_FILES = new Set([
  'app/(site-pages)/soutien-informatique-montreal/layout.tsx',
  'app/components/public-v2/services/support/SupportFormMuiIsland.tsx',
  'app/components/public-v2/services/support/SupportPage.module.css',
  'app/components/public-v2/services/support/SupportPageClient.tsx',
  'app/components/public-v2/services/support/SupportStickyCta.tsx',
  'app/components/public-v2/services/support/__tests__/SupportPageClient.test.tsx',
])
