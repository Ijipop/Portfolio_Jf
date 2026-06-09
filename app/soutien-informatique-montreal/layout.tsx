import type { Metadata } from 'next'
import { SUPPORT_LANDING_PATH } from '@/content/soutien-informatique-montreal.fr'

export const metadata: Metadata = {
  title: {
    absolute: 'Soutien informatique à Montréal et à distance',
  },
  description:
    'Dépannage Windows, migration SSD, sécurité de comptes, sauvegardes et assistance informatique pour particuliers, travailleurs autonomes et petites entreprises à Montréal ou à distance.',
  alternates: { canonical: SUPPORT_LANDING_PATH },
  openGraph: {
    title: 'Soutien informatique à Montréal et à distance | Ijipop',
    description:
      'Support technique simple, clair et abordable : dépannage PC, installation Windows, migration SSD, sécurité et accompagnement informatique.',
    url: SUPPORT_LANDING_PATH,
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre - Ijipop',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Soutien informatique à Montréal et à distance - Ijipop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soutien informatique à Montréal et à distance | Ijipop',
    description:
      'Support technique humain pour particuliers et petites entreprises : à distance ou en déplacement sur l’île de Montréal.',
    images: ['/og-default.png'],
  },
}

export default function SoutienInformatiqueMontrealLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
