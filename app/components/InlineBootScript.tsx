'use client'

/**
 * Script bloquant avant paint (FOUC / boot).
 * Pattern Next.js : type javascript côté serveur, text/plain à l’hydratation
 * pour éviter le warning React 19 « Encountered a script tag… ».
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export default function InlineBootScript({
  id,
  html,
}: {
  id: string
  html: string
}) {
  return (
    <script
      id={id}
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
