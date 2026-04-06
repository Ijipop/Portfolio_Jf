/**
 * Lab Vanta BIRDS — débrancher :
 * - retirer NEXT_PUBLIC_VANTA_BIRDS_TEST de .env.local, ou la mettre à autre chose que '1'
 * - supprimer ce dossier app/test/vanta-birds/
 * - supprimer app/components/test/VantaBirdsLab.tsx
 * - optionnel : retirer VANTA_BIRDS_CDN de app/utils/vantaAssets.ts
 */

import VantaBirdsTestClient from './VantaBirdsTestClient'

export default function VantaBirdsTestPage() {
  const enabled = process.env.NEXT_PUBLIC_VANTA_BIRDS_TEST === '1'

  if (!enabled) {
    return (
      <div style={{ padding: '2.5rem 1rem', maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Lab Vanta BIRDS désactivé</h1>
        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.5 }}>
          Ajoutez dans <code style={{ background: '#f1f5f9', padding: '0.12rem 0.35rem' }}>.env.local</code>{' '}
          :{' '}
          <code style={{ background: '#f1f5f9', padding: '0.12rem 0.35rem' }}>
            NEXT_PUBLIC_VANTA_BIRDS_TEST=1
          </code>{' '}
          puis redémarrez le serveur de dev.
        </p>
      </div>
    )
  }

  return <VantaBirdsTestClient />
}
