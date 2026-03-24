import { cookies } from 'next/headers'
import HomeClient from './HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export const metadata = {
  title: 'Jean-François Lefebvre | Web & Software',
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
