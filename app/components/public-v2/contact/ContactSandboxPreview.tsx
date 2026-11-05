'use client'

import { useState } from 'react'
import { Button } from '@/components/public-v2/primitives'
import ContactPageClient from './ContactPageClient'
import type { ContactMockScenario } from '@/lib/public-v2/contactPageContent'

const SCENARIOS: { id: ContactMockScenario; label: string }[] = [
  { id: 'success', label: 'Succès' },
  { id: 'server', label: 'Erreur 500' },
  { id: 'rateLimit', label: 'Rate-limit 429' },
  { id: 'network', label: 'Réseau' },
]

/**
 * Prévisualisation sandbox uniquement — submitMode mock, pas d’analytics ni Resend.
 */
export default function ContactSandboxPreview() {
  const [scenario, setScenario] = useState<ContactMockScenario>('success')

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          justifyContent: 'center',
        }}
      >
        {SCENARIOS.map((s) => (
          <Button
            key={s.id}
            type="button"
            size="sm"
            variant={scenario === s.id ? 'primary' : 'ghost'}
            aria-pressed={scenario === s.id}
            onClick={() => setScenario(s.id)}
          >
            Mock : {s.label}
          </Button>
        ))}
      </div>
      <ContactPageClient
        key={scenario}
        submitMode="mock"
        mockScenario={scenario}
        mockLocalMerci
        disableAiFetch
      />
    </div>
  )
}
