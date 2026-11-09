import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAdvancedTheme } from '@/contexts/AdvancedThemeContext'
import { useBeigePresentationBg } from '@/contexts/BeigePresentationBgContext'
import AdminProviders from '../AdminProviders'

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/dashboard',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))

function AdminHookProbe() {
  const { customTheme } = useAdvancedTheme()
  const { beigePresentationBgUrl, setBeigePresentationBgUrl } = useBeigePresentationBg()
  return (
    <div>
      <span data-testid="admin-theme-primary">{customTheme?.primary ?? ''}</span>
      <span data-testid="admin-beige-bg">{beigePresentationBgUrl ?? 'null'}</span>
      <button type="button" onClick={() => setBeigePresentationBgUrl('/test-beige.png')}>
        set-beige
      </button>
    </div>
  )
}

describe('AdminProviders', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })
  })

  it('fournit AdvancedTheme et BeigePresentationBg au dashboard', () => {
    render(
      <AdminProviders initialBeigePresentationBgUrl={null}>
        <AdminHookProbe />
      </AdminProviders>,
    )

    expect(screen.getByTestId('admin-theme-primary').textContent).toBeTruthy()
    expect(screen.getByTestId('admin-beige-bg').textContent).toBe('null')

    fireEvent.click(screen.getByRole('button', { name: 'set-beige' }))
    expect(screen.getByTestId('admin-beige-bg').textContent).toBe('/test-beige.png')
  })

  it('hydrate le fond beige initial utilisé par l’éditeur d’apparence', () => {
    render(
      <AdminProviders initialBeigePresentationBgUrl="/images/OrangeBG.webp">
        <AdminHookProbe />
      </AdminProviders>,
    )
    expect(screen.getByTestId('admin-beige-bg').textContent).toBe('/images/OrangeBG.webp')
  })
})
