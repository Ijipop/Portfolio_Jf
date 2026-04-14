import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Parcours Ijipop — compétences web, confiance et accompagnement pour votre site PME ou votre petit outil sur mesure.',
  openGraph: {
    title: 'À propos | Jean-François Lefebvre',
    description:
      'Qui je suis, formation et façon de travailler avec les indépendants et PME du Grand Montréal.',
    url: '/portfolio/a-propos',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
