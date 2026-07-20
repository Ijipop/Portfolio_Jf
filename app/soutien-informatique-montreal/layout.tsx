import type { Metadata } from 'next'
import { SUPPORT_LANDING_PATH } from '@/content/soutien-informatique-montreal.fr'

export const metadata: Metadata = {
  title: {
    absolute: 'Soutien informatique à Montréal et à distance',
  },
  description:
    'Technicien diplômé à Montréal et à distance. Prix clairs, aide humaine, sans centre d’appel. Appelez le (514) 447-3183.',
  alternates: { canonical: SUPPORT_LANDING_PATH },
  openGraph: {
    title: 'Soutien informatique à Montréal et à distance | Ijipop',
    description:
      'Aide informatique claire et humaine : dépannage, Windows, SSD, sauvegardes. Prix affichés. Montréal et à distance.',
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
      'Technicien diplômé : à distance ou sur l’île de Montréal. Prix clairs. (514) 447-3183.',
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
