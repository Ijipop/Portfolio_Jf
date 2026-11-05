import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ContactFormV2 from '../ContactFormV2'

function fillRequiredFields() {
  fireEvent.change(screen.getByRole('textbox', { name: /Nom complet/i }), {
    target: { name: 'name', value: 'Jean Test' },
  })
  fireEvent.change(screen.getByRole('textbox', { name: /^Email/i }), {
    target: { name: 'email', value: 'jean@example.com' },
  })
  fireEvent.change(screen.getByRole('textbox', { name: /^Sujet/i }), {
    target: { name: 'subject', value: 'Demande site' },
  })
  fireEvent.change(screen.getByRole('textbox', { name: /^Message/i }), {
    target: { name: 'message', value: 'Bonjour, j’aimerais un devis clair.' },
  })
}

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('@/components/contact/ProjectWebBriefSection', () => ({
  __esModule: true,
  default: () => <div data-testid="brief-web">brief-web</div>,
  emptyProjectWebBrief: () => ({}),
}))

vi.mock('@/components/contact/TechnicalSupportBriefSection', () => ({
  __esModule: true,
  default: () => <div data-testid="brief-tech">brief-tech</div>,
  emptyTechnicalSupportBrief: () => ({}),
}))

vi.mock('@/components/contact/AiLeadDiagnosis', () => ({
  __esModule: true,
  default: () => null,
}))

describe('ContactFormV2', () => {
  it('affiche les libellés polyvalents (pas de devis marketing)', () => {
    render(
      <ContactFormV2
        submitMode="mock"
        disableAiFetch
        onSendError={vi.fn()}
        onNetworkError={vi.fn()}
        onSuccess={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: /Envoyez-moi un message/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Envoyer mon message/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Obtenir une estimation/i })).not.toBeInTheDocument()
  })

  it('bloque la soumission si champs obligatoires invalides et focus le premier', async () => {
    const user = userEvent.setup()
    const onValidationError = vi.fn()
    const onSuccess = vi.fn()

    render(
      <ContactFormV2
        submitMode="mock"
        mockScenario="success"
        disableAiFetch
        onValidationError={onValidationError}
        onSendError={vi.fn()}
        onNetworkError={vi.fn()}
        onSuccess={onSuccess}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Envoyer mon message/i }))
    expect(onValidationError).toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
    expect(screen.getByText(/Le nom est requis/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(document.getElementById('pv2-contact-name')).toHaveFocus()
    })
    expect(document.getElementById('pv2-contact-name')).toHaveAttribute('aria-invalid', 'true')
  })

  it('soumet en mock succès et appelle onSuccess', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    const onValidationError = vi.fn()

    render(
      <ContactFormV2
        submitMode="mock"
        mockScenario="success"
        disableAiFetch
        onValidationError={onValidationError}
        onSendError={vi.fn()}
        onNetworkError={vi.fn()}
        onSuccess={onSuccess}
      />,
    )

    fillRequiredFields()
    await user.click(screen.getByRole('button', { name: /Envoyer mon message/i }))

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
    expect(onValidationError).not.toHaveBeenCalled()
  })

  it('signale une erreur API mock (429)', async () => {
    const user = userEvent.setup()
    const onSendError = vi.fn()

    render(
      <ContactFormV2
        submitMode="mock"
        mockScenario="rateLimit"
        disableAiFetch
        onValidationError={vi.fn()}
        onSendError={onSendError}
        onNetworkError={vi.fn()}
        onSuccess={vi.fn()}
      />,
    )

    fillRequiredFields()
    await user.click(screen.getByRole('button', { name: /Envoyer mon message/i }))

    await waitFor(() => expect(onSendError).toHaveBeenCalled())
    expect(String(onSendError.mock.calls[0]?.[0])).toMatch(/Trop de messages/i)
  })

  it('ouvre les options avancées', async () => {
    const user = userEvent.setup()
    render(
      <ContactFormV2
        submitMode="mock"
        disableAiFetch
        onValidationError={vi.fn()}
        onSendError={vi.fn()}
        onNetworkError={vi.fn()}
        onSuccess={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Options avancées/i }))
    expect(screen.getByTestId('brief-web')).toBeInTheDocument()
    expect(screen.getByTestId('brief-tech')).toBeInTheDocument()
  })

  it('empêche la double soumission pendant le chargement', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()

    render(
      <ContactFormV2
        submitMode="mock"
        mockScenario="success"
        disableAiFetch
        onValidationError={vi.fn()}
        onSendError={vi.fn()}
        onNetworkError={vi.fn()}
        onSuccess={onSuccess}
      />,
    )

    fillRequiredFields()

    const btn = screen.getByRole('button', { name: /Envoyer mon message/i })
    await user.click(btn)
    await user.click(btn)

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
  })
})
