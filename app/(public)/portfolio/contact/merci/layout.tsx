import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message envoyé',
  description: 'Confirmation d’envoi du formulaire de contact.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Message envoyé | Contact',
    url: '/portfolio/contact/merci',
  },
}

export default function ContactMerciLayout({ children }: { children: React.ReactNode }) {
  return children
}
