import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-cpuze-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-cpuze-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CPU-ZE — Voir CPU, RAM et températures | Windows',
  description:
    'Mini gestionnaire de tâches Windows : CPU, mémoire et températures, clair et léger. Par Ijipop.',
  alternates: { canonical: '/cpu-ze' },
  openGraph: {
    title: 'CPU-ZE — Voir CPU, RAM et températures',
    description: 'Mini gestionnaire de tâches Windows, clair et léger.',
    url: '/cpu-ze',
  },
}

export default function CpuZeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${jetbrains.variable} ${dmSans.variable}`}>{children}</div>
}
