import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil v2 (preview)',
  robots: { index: false, follow: false },
}

export default function AccueilV2Layout({ children }: { children: React.ReactNode }) {
  return children
}
