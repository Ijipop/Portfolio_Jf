import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Parcours Ijipop — compétences en création de sites web et logiciels, approche claire et accompagnement pour votre projet au Québec.',
  openGraph: {
    title: 'À propos | Jean-François Lefebvre',
    description:
      'Parcours, formation et façon de collaborer avec les indépendants et PME du Grand Montréal et du Québec.',
    url: '/portfolio/a-propos',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
