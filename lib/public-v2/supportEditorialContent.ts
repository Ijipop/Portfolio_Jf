/**
 * Soutien informatique 3.0 — copy éditorial « L’Atelier de dépannage ».
 * Piliers 01–04 alignés sur getSupportLandingContent('fr').pillars ; 05 dédié organisations.
 */

import { getSupportLandingContent } from '@/content/soutien-informatique-montreal.fr'

const landing = getSupportLandingContent('fr')
const [pDepannage, pComptes, pMiseEnPlace, pInitiation] = landing.pillars

export type SupportEditorialService = {
  num: string
  id: string
  title: string
  lead: string
  items: readonly string[]
  /** Mention secondaire (ex. crédibilité org) — une seule ligne. */
  aside?: string
  /** Variante de mise en page (rythme visuel, pas une carte). */
  tone?: 'default' | 'accent'
}

export const SUPPORT_EDITORIAL = {
  hero: {
    eyebrow: 'L’atelier de dépannage',
    titleLine1: 'Un problème informatique\u00a0?',
    titleLine2: 'On va démêler ça.',
    lead: 'Parlez directement à un technicien diplômé, sans centre d’appels.',
    ctaForm: 'Décrire mon problème',
    ctaFormHint: 'vers le formulaire',
    ctaCall: 'M’appeler',
    phoneHint: landing.phoneHint,
    signatureName: landing.identityName,
    signatureTitle: landing.identityTitle,
    signaturePlace: landing.identityPlace,
  },
  services: {
    title: 'Ce que je peux régler avec vous',
    lead: 'Cinq domaines d’intervention — chez vous, à distance, ou pour votre organisation.',
    domains: [
      {
        num: '01',
        id: 'depannage',
        title: 'Dépannage informatique',
        lead: pDepannage.lead,
        items: pDepannage.items,
      },
      {
        num: '02',
        id: 'securite',
        title: 'Comptes et fichiers',
        lead: pComptes.lead,
        items: pComptes.items,
      },
      {
        num: '03',
        id: 'mise-en-place',
        title: 'Installation et configuration',
        lead: pMiseEnPlace.lead,
        items: pMiseEnPlace.items,
      },
      {
        num: '04',
        id: 'initiation',
        title: 'Initiation à l’informatique',
        lead: pInitiation.lead,
        items: pInitiation.items,
      },
      {
        num: '05',
        id: 'organisations',
        title: 'Solutions informatiques pour organisations',
        lead:
          'Vous gérez une petite entreprise ou un organisme ? Je peux aussi vous accompagner dans la mise en place et la modernisation de vos outils informatiques.',
        items: [
          'Microsoft 365 et messagerie professionnelle',
          'SharePoint et organisation documentaire',
          'Configuration des accès et permissions',
          'Accompagnement et modernisation informatique',
        ],
        aside:
          'Expérience concrète notamment auprès d’Expression LaSalle, organisme communautaire montréalais.',
        tone: 'accent',
      },
    ] satisfies SupportEditorialService[],
  },
  process: {
    title: 'Comment ça se passe',
    lead: 'Trois étapes simples — sans promesse de délai fixe.',
    steps: [
      {
        num: '1',
        title: 'Vous décrivez la situation',
        body: 'Par téléphone ou via le formulaire : ce qui se passe, depuis quand, et comment vous préférez être aidé.',
      },
      {
        num: '2',
        title: 'On clarifie la suite',
        body: 'Je vous explique ce que je propose, ce que ça implique, et le coût avant toute intervention.',
      },
      {
        num: '3',
        title: 'Intervention',
        body: 'À distance ou sur l’île de Montréal — toujours avec votre accord avant d’accéder à vos appareils.',
      },
    ],
  },
  trust: {
    title: 'Pourquoi passer par IJIPOP',
    kicker: 'Pas de centre d’appels. Un seul technicien, des explications claires.',
    statements: [
      landing.trustSignals[0],
      'Chaque situation est évaluée avant d’agir',
      landing.trustSignals[2],
    ],
    quoteTitle: landing.reassuranceTitle,
    quote: landing.reassurance,
    scopeTitle: landing.travelTitle,
    scope: landing.travelNote,
  },
  pricingNote:
    'Chaque situation est différente. Nous discutons du coût avant toute intervention.',
  contact: {
    title: 'On regarde ça ensemble\u00a0?',
    lead: 'Décrivez votre problème en quelques lignes — je vous réponds avec une prochaine étape claire.',
  },
} as const