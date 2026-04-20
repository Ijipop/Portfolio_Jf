import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import HomeClient from './HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

/** Titre absolu : ignore le template du layout racine (ordre « nom | métier » conservé). */
export const metadata: Metadata = {
  title: {
    absolute:
      'Jean-François Lefebvre | Ijipop — sites web & logiciels pour PME au Québec',
  },
  description:
    'Création et refonte de sites web pour PME et indépendants : site vitrine, performance, accessibilité, maintenance. Montréal et mandats à distance.',
  openGraph: {
    title:
      'Jean-François Lefebvre | Ijipop — sites web & logiciels pour PME au Québec',
    description:
      'Création et refonte de sites web pour PME et travailleurs autonomes au Québec. Petits logiciels et outils sur mesure — Montréal.',
    url: '/',
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre — Ijipop',
  },
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  // Intro (rideau avec le nom) désactivée pour l'instant — remettre `!introSeen` pour réactiver
  const initialShowIntro = false

  void introSeen
  return <HomeClient initialShowIntro={initialShowIntro} />
}
