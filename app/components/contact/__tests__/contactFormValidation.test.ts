import { describe, expect, it } from 'vitest'
import {
  EMPTY_CONTACT_FORM_DATA,
  EMPTY_CONTACT_FORM_ERRORS,
  contactFormErrorsEqual,
  validateAllContactFields,
  validateContactField,
} from '../contactFormValidation'

const validForm = {
  name: 'Jean Test',
  email: 'jean.test@example.com',
  phone: '514-555-0100',
  subject: 'Demande de site',
  message: 'Bonjour, je voudrais un site vitrine.',
  bm_verify: '',
}

describe('validateContactField', () => {
  it('accepte une soumission valide', () => {
    expect(validateAllContactFields(validForm)).toEqual(EMPTY_CONTACT_FORM_ERRORS)
  })

  it('exige les champs obligatoires', () => {
    expect(validateContactField('name', '')).toBe('Le nom est requis')
    expect(validateContactField('email', '   ')).toBe("L'email est requis")
    expect(validateContactField('subject', '')).toBe('Le sujet est requis')
    expect(validateContactField('message', '')).toBe('Le message est requis')
  })

  it('rejette les données trop courtes ou mal formées', () => {
    expect(validateContactField('name', 'J')).toBe('Le nom doit contenir au moins 2 caractères')
    expect(validateContactField('email', 'pas-un-email')).toBe("Format d'email invalide")
    expect(validateContactField('subject', 'ab')).toBe('Le sujet doit contenir au moins 3 caractères')
    expect(validateContactField('message', 'tropcour')).toBe(
      'Le message doit contenir au moins 10 caractères',
    )
  })

  it('valide le téléphone seulement s’il est renseigné', () => {
    expect(validateContactField('phone', '')).toBe('')
    expect(validateContactField('phone', '123')).toBe('Le numéro semble trop court')
    expect(validateContactField('phone', 'a'.repeat(51))).toBe('Le numéro est trop long')
    expect(validateContactField('phone', 'abcdef')).toBe('Indiquez au moins un chiffre')
    expect(validateContactField('phone', '514-555-0100')).toBe('')
  })

  it('n’applique aucune règle au honeypot bm_verify', () => {
    expect(validateContactField('bm_verify', 'bot-filled')).toBe('')
    expect(validateAllContactFields({ ...validForm, bm_verify: 'http://spam' })).toEqual(
      EMPTY_CONTACT_FORM_ERRORS,
    )
  })
})

describe('contactFormErrorsEqual', () => {
  it('compare les messages champ par champ', () => {
    expect(contactFormErrorsEqual(EMPTY_CONTACT_FORM_ERRORS, EMPTY_CONTACT_FORM_ERRORS)).toBe(true)
    expect(
      contactFormErrorsEqual(EMPTY_CONTACT_FORM_ERRORS, { ...EMPTY_CONTACT_FORM_ERRORS, name: 'x' }),
    ).toBe(false)
  })

  it('part d’un formulaire vide invalide', () => {
    const errors = validateAllContactFields(EMPTY_CONTACT_FORM_DATA)
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.subject).toBeTruthy()
    expect(errors.message).toBeTruthy()
    expect(errors.phone).toBe('')
  })
})
