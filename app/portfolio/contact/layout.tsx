import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Demande de soumission : nouveau site web, refonte ou mise à jour de site existant. Formulaire — réponse rapide, Montréal.',
  openGraph: {
    title: 'Contact | Jean-François Lefebvre',
    description:
      'Contactez Ijipop pour un site vitrine, une refonte ou la maintenance de votre site — devis et échange.',
    url: '/portfolio/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
