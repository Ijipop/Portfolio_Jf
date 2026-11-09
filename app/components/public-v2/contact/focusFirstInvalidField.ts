import type { ContactFormErrors, ValidatableContactField } from '@/components/contact/contactFormValidation'

/** Ordre DOM / lecture du formulaire Contact V2. */
export const CONTACT_V2_FIELD_ORDER: ValidatableContactField[] = [
  'name',
  'email',
  'phone',
  'subject',
  'message',
]

export const CONTACT_V2_FIELD_IDS: Record<ValidatableContactField, string> = {
  name: 'pv2-contact-name',
  email: 'pv2-contact-email',
  phone: 'pv2-contact-phone',
  subject: 'pv2-contact-subject',
  message: 'pv2-contact-message',
}

export type FocusFirstInvalidOptions = {
  /** Ouvre Options avancées si une cible conditionnelle est encore repliée. */
  openAdvancedPanel?: () => void
  formRoot?: HTMLElement | null
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Masqué / désactivé = non ciblable. getClientRects vide (jsdom) n’exclut pas. */
export function isFocusableField(el: HTMLElement): boolean {
  if (el.getAttribute('aria-hidden') === 'true') return false
  if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') return false
  if ((el as HTMLInputElement).disabled) return false
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden') return false
  return true
}

function focusElement(el: HTMLElement, behavior: ScrollBehavior): void {
  if (typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ block: 'center', behavior })
  }
  el.focus({ preventScroll: true })
}

function schedule(fn: () => void): void {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(fn)
  })
}

/**
 * Focus le premier champ invalide disponible après soumission.
 * N’ouvre le panneau avancé que pour des cibles conditionnelles (pas les champs principaux).
 */
export function focusFirstInvalidContactField(
  errors: ContactFormErrors,
  options: FocusFirstInvalidOptions = {},
): void {
  const { openAdvancedPanel, formRoot } = options
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth'
  const hasMainError = CONTACT_V2_FIELD_ORDER.some((name) => Boolean(errors[name]))

  const focusMain = (): boolean => {
    for (const name of CONTACT_V2_FIELD_ORDER) {
      if (!errors[name]) continue
      const el = document.getElementById(CONTACT_V2_FIELD_IDS[name])
      if (el instanceof HTMLElement && isFocusableField(el)) {
        focusElement(el, behavior)
        return true
      }
    }
    return false
  }

  const focusConditional = (): boolean => {
    const scope = formRoot ?? document.getElementById('contact-form')
    if (!scope) return false
    const invalids = scope.querySelectorAll<HTMLElement>('[aria-invalid="true"]')
    for (const el of invalids) {
      if (el.getAttribute('name') === 'bm_verify') continue
      // Ignorer les champs principaux déjà couverts
      if (Object.values(CONTACT_V2_FIELD_IDS).includes(el.id)) continue
      if (!isFocusableField(el)) continue
      focusElement(el, behavior)
      return true
    }
    return false
  }

  schedule(() => {
    if (hasMainError) {
      if (focusMain()) return
      // React n’a pas encore peint : un nouvel essai court
      schedule(() => {
        focusMain()
      })
      return
    }

    if (focusConditional()) return

    if (openAdvancedPanel) {
      openAdvancedPanel()
      schedule(() => {
        focusConditional()
      })
    }
  })
}
