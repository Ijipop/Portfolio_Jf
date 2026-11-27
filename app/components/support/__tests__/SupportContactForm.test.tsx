import { createTheme, ThemeProvider } from '@mui/material/styles'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SupportContactForm from '../SupportContactForm'

const submitContactRequest = vi.fn()

vi.mock('@/components/contact/submitContactRequest', () => ({
  submitContactRequest: (...args: unknown[]) => submitContactRequest(...args),
}))

vi.mock('@/hooks/useSiteDarkChrome', () => ({
  useSiteDarkChrome: () => false,
}))

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    locale: 'fr',
    t: (key: string) => key,
  }),
}))

vi.mock('@/components/shared/CTAButton', () => ({
  __esModule: true,
  default: ({
    children,
    type = 'button',
    disabled,
    onClick,
  }: {
    children: React.ReactNode
    type?: 'button' | 'submit'
    disabled?: boolean
    onClick?: () => void
    fullWidth?: boolean
    variant?: string
    size?: string
  }) => (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}))

const theme = createTheme()

function renderForm() {
  return render(
    <ThemeProvider theme={theme}>
      <SupportContactForm />
    </ThemeProvider>,
  )
}

async function waitReady() {
  await waitFor(() => {
    expect(screen.getByTestId('support-contact-form')).toHaveAttribute('data-form-ready', 'true')
  })
}

function fillRequiredExceptPhone() {
  const form = screen.getByTestId('support-contact-form')
  fireEvent.change(form.querySelector('input[name="name"]')!, {
    target: { value: 'Jean Test' },
  })
  fireEvent.change(form.querySelector('input[name="email"]')!, {
    target: { value: 'jean@example.com' },
  })
  fireEvent.click(screen.getByRole('radio', { name: /Dépannage ou mise en place/i }))
  fireEvent.click(screen.getByRole('radio', { name: /^À distance$/i }))
  fireEvent.change(form.querySelector('textarea[name="message"]')!, {
    target: { value: 'Ordinateur très lent depuis une semaine.' },
  })
}

describe('SupportContactForm', () => {
  beforeEach(() => {
    submitContactRequest.mockReset()
    submitContactRequest.mockResolvedValue({ ok: true })
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('accepte une demande valide sans téléphone', async () => {
    renderForm()
    await waitReady()

    expect(screen.getByLabelText(/N° de téléphone \(optionnel\)/i)).toBeInTheDocument()

    fillRequiredExceptPhone()
    fireEvent.click(screen.getByRole('button', { name: /Envoyer la demande/i }))

    await waitFor(() => expect(submitContactRequest).toHaveBeenCalledOnce())
    const payload = submitContactRequest.mock.calls[0]?.[0] as { phone: string }
    expect(payload.phone).toBe('')
    expect(screen.getByText(/Demande envoyée/i)).toBeInTheDocument()
  })

  it('accepte une demande valide avec téléphone', async () => {
    renderForm()
    await waitReady()

    fillRequiredExceptPhone()
    fireEvent.change(screen.getByLabelText(/N° de téléphone \(optionnel\)/i), {
      target: { value: '514-555-0100' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Envoyer la demande/i }))

    await waitFor(() => expect(submitContactRequest).toHaveBeenCalledOnce())
    const payload = submitContactRequest.mock.calls[0]?.[0] as { phone: string }
    expect(payload.phone).toBe('514-555-0100')
  })

  it('rejette un téléphone invalide sans appeler l’API', async () => {
    renderForm()
    await waitReady()

    fillRequiredExceptPhone()
    fireEvent.change(screen.getByLabelText(/N° de téléphone \(optionnel\)/i), {
      target: { value: 'abcdef' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Envoyer la demande/i }))

    expect(submitContactRequest).not.toHaveBeenCalled()
    expect(screen.getByText(/Indiquez au moins un chiffre/i)).toBeInTheDocument()
  })

  it('garde description et radios obligatoires', async () => {
    renderForm()
    await waitReady()

    fireEvent.change(screen.getByLabelText(/^Nom/i), { target: { value: 'Jean' } })
    fireEvent.change(screen.getByLabelText(/^Courriel/i), {
      target: { value: 'jean@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Envoyer la demande/i }))

    expect(submitContactRequest).not.toHaveBeenCalled()
    expect(screen.getAllByText(/Choisissez une option/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Le message est requis|au moins 10/i)).toBeInTheDocument()
  })
})
