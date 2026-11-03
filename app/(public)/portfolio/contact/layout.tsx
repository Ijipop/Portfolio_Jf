import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Demande de soumission : nouveau site web, refonte ou maintenance. Formulaire — réponse rapide, Montréal et mandats à distance.',
  openGraph: {
    title: 'Contact | Jean-François Lefebvre',
    description:
      'Contactez Ijipop pour une création de site vitrine, une refonte ou l’entretien de votre site — devis et échange.',
    url: '/portfolio/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
