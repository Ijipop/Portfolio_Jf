import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Prenons contact : formulaire, localisation à Montréal et liens vers GitHub et LinkedIn. Réponse rapide pour votre projet web ou logiciel.',
  openGraph: {
    title: 'Contact | Jean-François Lefebvre',
    description:
      'Envoyez un message ou demandez une estimation — discussion de projet web et accompagnement technique.',
    url: '/portfolio/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
