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
} as const

export type ContactMockScenario = 'success' | 'server' | 'rateLimit' | 'network'

export async function mockSubmitContactRequest(
  _body: Record<string, unknown>,
  scenario: ContactMockScenario = 'success',
  fallbackError: string = CONTACT_PAGE_COPY.sendError,
): Promise<import('@/components/contact/submitContactRequest').SubmitContactResult> {
  const delayMs = process.env.VITEST ? 40 : 650
  await new Promise((r) => setTimeout(r, delayMs))
  switch (scenario) {
    case 'success':
      return { ok: true }
    case 'rateLimit':
      return { ok: false, error: CONTACT_PAGE_COPY.rateLimitError, kind: 'api' }
    case 'network':
      return { ok: false, error: fallbackError, kind: 'network' }
    case 'server':
    default:
      return { ok: false, error: fallbackError, kind: 'api' }
  }
}
