import { PublicChromeShell } from '@/components/public-v2/chrome'
import { WebPageClient } from '@/components/public-v2/services/web'

/**
 * Création de sites web — landing Pop Atelier.
 * La page se construit devant le visiteur (Hero + sections au scroll).
 */
export default function CreationSiteWebMontrealPage() {
  return (
    <PublicChromeShell
      pathname="/creation-site-web-montreal"
      mainId="pv2-web-main"
      mainTestId="pv2-web-main"
    >
      <WebPageClient />
    </PublicChromeShell>
  )
}
