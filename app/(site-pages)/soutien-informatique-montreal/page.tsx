import { PublicChromeShell } from '@/components/public-v2/chrome'
import { SupportPageClient } from '@/components/public-v2/services/support'

/**
 * Soutien informatique — landing Pop Atelier (Phase 6B5).
 * URL et SupportContactForm (POST /api/contact) conservés.
 */
export default function SoutienInformatiqueMontrealPage() {
  return (
    <PublicChromeShell
      pathname="/soutien-informatique-montreal"
      mainId="pv2-support-main"
      mainTestId="pv2-support-main"
    >
      <SupportPageClient />
    </PublicChromeShell>
  )
}
