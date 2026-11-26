/**
 * Files changed by PR #227 (disable public SMS) and merged to Production.
 * Allowed to diverge from Phase 6B4+ / 6C contact readonly baselines.
 */
export const CONTACT_SMS_DISABLE_FILES = new Set([
  'app/components/public-v2/contact/ContactPageClient.tsx',
  'app/components/public-v2/contact/__tests__/ContactPageClient.sms.test.tsx',
  'lib/public-v2/contactPageContent.ts',
])
