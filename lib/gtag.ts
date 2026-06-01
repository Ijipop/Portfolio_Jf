/** Chemin utilisé comme objectif de conversion (Google Analytics / Ads — page de destination). */
export const CONTACT_MERCI_PATH = '/portfolio/contact/merci'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Envoie une page_view pour l’URL merci (navigation App Router + objectifs « contient l’URL »). */
export function trackContactMerciPageView(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'page_view', {
    page_path: CONTACT_MERCI_PATH,
    page_title: 'Contact — merci',
    page_location: `${window.location.origin}${CONTACT_MERCI_PATH}`,
  })

  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION?.trim()
  if (sendTo) {
    window.gtag('event', 'conversion', { send_to: sendTo })
  }
}
