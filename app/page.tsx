import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import HomeClient from './HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

/** Titre absolu : ignore le template du layout racine (ordre « nom | métier » conservé). */
export const metadata: Metadata = {
  title: {
    absolute: 'Jean-François Lefebvre | Web & Software',
  },
  description: 'Web and software development — from idea to production. Clean code, clear UX.',
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  // Intro (rideau avec le nom) désactivée pour l'instant — remettre `!introSeen` pour réactiver
  const initialShowIntro = false

  void introSeen
  return <HomeClient initialShowIntro={initialShowIntro} />
}
