import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-tl-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-tl-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Timelendr — Planification visuelle | Windows & macOS',
  description:
    'Calendrier, timelines collaboratives et tâches dans une app desktop native. Par Ijipop.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/logiciel/timelendr' },
  openGraph: {
    title: 'Timelendr — Planification visuelle',
    description: 'Calendrier, timelines et tâches pour petites équipes et PME.',
    url: '/logiciel/timelendr',
  },
}

export default function TimelendrLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fraunces.variable} ${manrope.variable}`}>{children}</div>
}
