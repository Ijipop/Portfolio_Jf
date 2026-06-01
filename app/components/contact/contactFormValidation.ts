export type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  /** Honeypot anti-bot : doit rester vide (champ masqué). */
  bm_verify: string
}

export type ContactFormErrors = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type ValidatableContactField = keyof ContactFormErrors

export const EMPTY_CONTACT_FORM_ERRORS: ContactFormErrors = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export const EMPTY_CONTACT_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  bm_verify: '',
}

export function validateContactField(name: string, value: string): string {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Le nom est requis'
      if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères'
      break
    case 'email':
      if (!value.trim()) return "L'email est requis"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format d'email invalide"
      break
    case 'phone': {
      const v = value.trim()
      if (!v) break
      if (v.length < 6) return 'Le numéro semble trop court'
      if (v.length > 50) return 'Le numéro est trop long'
      if (!/\d/.test(v)) return 'Indiquez au moins un chiffre'
      break
    }
    case 'subject':
      if (!value.trim()) return 'Le sujet est requis'
      if (value.trim().length < 3) return 'Le sujet doit contenir au moins 3 caractères'
      break
    case 'message':
      if (!value.trim()) return 'Le message est requis'
      if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères'
      break
    case 'bm_verify':
      break
    default:
      break
  }
  return ''
}

export function validateAllContactFields(formData: ContactFormData): ContactFormErrors {
  return {
    name: validateContactField('name', formData.name),
    email: validateContactField('email', formData.email),
    phone: validateContactField('phone', formData.phone),
    subject: validateContactField('subject', formData.subject),
    message: validateContactField('message', formData.message),
  }
}

export function contactFormErrorsEqual(a: ContactFormErrors, b: ContactFormErrors): boolean {
  return (
    a.name === b.name &&
    a.email === b.email &&
    a.phone === b.phone &&
    a.subject === b.subject &&
    a.message === b.message
  )
}
