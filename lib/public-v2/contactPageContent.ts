/**
 * Copy FR québécois — page Contact V2 (questionnaire).
 * Différence i18n temporaire documentée dans docs/ijipop-v2/BACKLOG.md.
 */

import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_HREF,
  SUPPORT_SMS_HREF,
} from '@/content/soutien-informatique-montreal.fr'
import { CONTACT_SUBJECT_TECH_SUPPORT } from '@/i18n/contactSubjects'
import type { PublicV2Locale } from './locale'

export const CONTACT_PAGE_COPY = {
  title: 'Contact',
  subtitle: 'Une question ou quelque chose à discuter ? Vous pouvez m’écrire ici.',
  sendMessage: 'Envoyez-moi un message',
  sendMessageDesc:
    'Vous avez un projet, une question ou un problème informatique ? Expliquez-moi brièvement ce dont vous avez besoin.',
  optionalSectionsToggle: 'Options avancées (facultatif)',
  supportShortcut: 'Besoin de soutien technique ? Ouvrir le formulaire dédié',
  supportShortcutHref: `/portfolio/contact?subject=${encodeURIComponent(CONTACT_SUBJECT_TECH_SUPPORT.fr)}#soutien-technique`,
  formName: 'Nom complet',
  formEmail: 'Email',
  formSubject: 'Sujet',
  formPhoneOptional: 'N° de téléphone (optionnel)',
  formMessage: 'Message',
  sendButton: 'Envoyer mon message',
  sending: 'Envoi en cours…',
  /** Conservé pour éventuels usages a11y ; plus affiché en toast générique. */
  formErrors: 'Veuillez corriger les erreurs dans le formulaire',
  sendError: 'Erreur lors de l\'envoi du message',
  networkError: 'Erreur de connexion. Veuillez réessayer.',
  rateLimitError: 'Trop de messages envoyés depuis cette adresse. Réessayez plus tard.',
  phoneCta: 'Appeler',
  smsCta: 'Texter',
  writeCta: 'M’écrire',
  writeCtaHref: '#contact-form',
  phoneDisplay: SUPPORT_PHONE_DISPLAY,
  phoneHref: SUPPORT_PHONE_HREF,
  smsHref: SUPPORT_SMS_HREF,
  location: 'Localisation',
  locationCity: 'Montréal, Québec, Canada',
  followMe: 'Suivez-moi',
  merciTitle: 'Message bien reçu',
  merciBody:
    'Merci pour votre message! Je l’ai bien reçu et je vous répondrai dès que possible à l’adresse courriel indiquée.',
  merciClose: 'Fermer',
  mockBanner: 'Prévisualisation sandbox — aucune donnée n’est envoyée (pas de Resend, OpenAI ni analytics).',
  aiDisabledSandbox: 'Diagnostic IA désactivé en prévisualisation sandbox (aucun appel OpenAI).',
  loadingForm: 'Chargement du formulaire…',
  loadingMerci: 'Confirmation…',
} as const

const CONTACT_PAGE_COPY_EN = {
  title: 'Contact',
  subtitle: 'A question or something to discuss? You can reach me here.',
  sendMessage: 'Send me a message',
  sendMessageDesc:
    'Working on a project, have a question, or stuck on a tech issue? Briefly tell me what you need.',
  optionalSectionsToggle: 'Advanced options (optional)',
  supportShortcut: 'Need technical support? Open the dedicated form',
  supportShortcutHref: `/portfolio/contact?subject=${encodeURIComponent(CONTACT_SUBJECT_TECH_SUPPORT.en)}#soutien-technique`,
  formName: 'Full name',
  formEmail: 'Email',
  formSubject: 'Subject',
  formPhoneOptional: 'Phone number (optional)',
  formMessage: 'Message',
  sendButton: 'Send my message',
  sending: 'Sending…',
  formErrors: 'Please fix the errors in the form',
  sendError: 'Could not send your message',
  networkError: 'Connection error. Please try again.',
  rateLimitError: 'Too many messages from this address. Try again later.',
  phoneCta: 'Call',
  smsCta: 'Text',
  writeCta: 'Email me',
  writeCtaHref: '#contact-form',
  phoneDisplay: SUPPORT_PHONE_DISPLAY,
  phoneHref: SUPPORT_PHONE_HREF,
  smsHref: SUPPORT_SMS_HREF,
  location: 'Location',
  locationCity: 'Montreal, Quebec, Canada',
  followMe: 'Follow me',
  merciTitle: 'Message received',
  merciBody:
    'Thanks for your message! I have it and will reply as soon as I can at the email address you provided.',
  merciClose: 'Close',
  mockBanner:
    'Sandbox preview — no data is sent (no Resend, OpenAI, or analytics).',
  aiDisabledSandbox: 'AI diagnosis disabled in sandbox preview (no OpenAI calls).',
  loadingForm: 'Loading the form…',
  loadingMerci: 'Confirming…',
} as const

export type ContactPageCopy = { [K in keyof typeof CONTACT_PAGE_COPY]: string }

export function getContactPageContent(locale: PublicV2Locale = 'fr'): ContactPageCopy {
  return locale === 'en' ? CONTACT_PAGE_COPY_EN : CONTACT_PAGE_COPY
}

export type ContactMockScenario = 'success' | 'server' | 'rateLimit' | 'network'

export async function mockSubmitContactRequest(
  _body: Record<string, unknown>,
  scenario: ContactMockScenario = 'success',
  fallbackError: string = CONTACT_PAGE_COPY.sendError,
  locale: PublicV2Locale = 'fr',
): Promise<import('@/components/contact/submitContactRequest').SubmitContactResult> {
  const copy = getContactPageContent(locale)
  const delayMs = process.env.VITEST ? 40 : 650
  await new Promise((r) => setTimeout(r, delayMs))
  switch (scenario) {
    case 'success':
      return { ok: true }
    case 'rateLimit':
      return { ok: false, error: copy.rateLimitError, kind: 'api' }
    case 'network':
      return { ok: false, error: fallbackError, kind: 'network' }
    case 'server':
    default:
      return { ok: false, error: fallbackError, kind: 'api' }
  }
}