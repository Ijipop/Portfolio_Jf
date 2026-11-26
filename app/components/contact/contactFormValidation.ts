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

type ContactValidationLocale = 'fr' | 'en'

const FIELD_MSG: Record<ContactValidationLocale, Record<string, string>> = {
  fr: {
    nameRequired: 'Le nom est requis',
    nameShort: 'Le nom doit contenir au moins 2 caractères',
    emailRequired: "L'email est requis",
    emailInvalid: "Format d'email invalide",
    phoneShort: 'Le numéro semble trop court',
    phoneLong: 'Le numéro est trop long',
    phoneDigit: 'Indiquez au moins un chiffre',
    subjectRequired: 'Le sujet est requis',
    subjectShort: 'Le sujet doit contenir au moins 3 caractères',
    messageRequired: 'Le message est requis',
    messageShort: 'Le message doit contenir au moins 10 caractères',
  },
  en: {
    nameRequired: 'Name is required',
    nameShort: 'Name must be at least 2 characters',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    phoneShort: 'Phone number seems too short',
    phoneLong: 'Phone number is too long',
    phoneDigit: 'Include at least one digit',
    subjectRequired: 'Subject is required',
    subjectShort: 'Subject must be at least 3 characters',
    messageRequired: 'Message is required',
    messageShort: 'Message must be at least 10 characters',
  },
}

export function validateContactField(
  name: string,
  value: string,
  locale: ContactValidationLocale = 'fr',
): string {
  const m = FIELD_MSG[locale]
  switch (name) {
    case 'name':
      if (!value.trim()) return m.nameRequired
      if (value.trim().length < 2) return m.nameShort
      break
    case 'email':
      if (!value.trim()) return m.emailRequired
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return m.emailInvalid
      break
    case 'phone': {
      const v = value.trim()
      if (!v) break
      if (v.length < 6) return m.phoneShort
      if (v.length > 50) return m.phoneLong
      if (!/\d/.test(v)) return m.phoneDigit
      break
    }
    case 'subject':
      if (!value.trim()) return m.subjectRequired
      if (value.trim().length < 3) return m.subjectShort
      break
    case 'message':
      if (!value.trim()) return m.messageRequired
      if (value.trim().length < 10) return m.messageShort
      break
    case 'bm_verify':
      break
    default:
      break
  }
  return ''
}

export function validateAllContactFields(
  formData: ContactFormData,
  locale: ContactValidationLocale = 'fr',
): ContactFormErrors {
  return {
    name: validateContactField('name', formData.name, locale),
    email: validateContactField('email', formData.email, locale),
    phone: validateContactField('phone', formData.phone, locale),
    subject: validateContactField('subject', formData.subject, locale),
    message: validateContactField('message', formData.message, locale),
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
