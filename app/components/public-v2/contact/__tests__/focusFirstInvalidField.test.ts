import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  focusFirstInvalidContactField,
  isFocusableField,
} from '../focusFirstInvalidField'
import { EMPTY_CONTACT_FORM_ERRORS } from '@/components/contact/contactFormValidation'

describe('focusFirstInvalidContactField', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('focus le premier champ principal invalide sans ouvrir le panneau avancé', async () => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="pv2-contact-name" />
        <input id="pv2-contact-email" />
      </form>
    `
    const openAdvancedPanel = vi.fn()
    const name = document.getElementById('pv2-contact-name') as HTMLInputElement
    name.focus = vi.fn()
    name.scrollIntoView = vi.fn()

    focusFirstInvalidContactField(
      { ...EMPTY_CONTACT_FORM_ERRORS, name: 'Le nom est requis', email: "L'email est requis" },
      { openAdvancedPanel },
    )

    await vi.waitFor(() => {
      expect(name.focus).toHaveBeenCalled()
    })
    expect(openAdvancedPanel).not.toHaveBeenCalled()
  })

  it('ouvre le panneau avancé puis focus un champ conditionnel invalide', async () => {
    document.body.innerHTML = `<form id="contact-form"></form>`
    const form = document.getElementById('contact-form') as HTMLFormElement
    const openAdvancedPanel = vi.fn(() => {
      const input = document.createElement('input')
      input.setAttribute('aria-invalid', 'true')
      input.id = 'brief-conditional'
      input.focus = vi.fn()
      input.scrollIntoView = vi.fn()
      form.appendChild(input)
    })

    focusFirstInvalidContactField({ ...EMPTY_CONTACT_FORM_ERRORS }, { openAdvancedPanel, formRoot: form })

    await vi.waitFor(() => {
      expect(openAdvancedPanel).toHaveBeenCalled()
      const el = document.getElementById('brief-conditional') as HTMLInputElement
      expect(el.focus).toHaveBeenCalled()
    })
  })

  it('refuse un champ display:none', () => {
    const el = document.createElement('input')
    document.body.appendChild(el)
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      display: 'none',
      visibility: 'visible',
    } as CSSStyleDeclaration)
    expect(isFocusableField(el)).toBe(false)
  })
})
