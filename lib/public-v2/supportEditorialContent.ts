/**
 * Soutien informatique 3.0 — copy éditorial « L’Atelier de dépannage ».
 * Piliers 01–04 alignés sur getSupportLandingContent(locale).pillars ; 05 dédié organisations.
 */

import { getSupportLandingContent } from '@/content/soutien-informatique-montreal.fr'
import type { PublicV2Locale } from './locale'

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

const EDITORIAL_PILLAR_TITLES_FR = [
  'Dépannage informatique',
  'Comptes et fichiers',
  'Installation et configuration',
  'Initiation à l’informatique',
] as const

const EDITORIAL_PILLAR_TITLES_EN = [
  'IT troubleshooting',
  'Accounts and files',
  'Installation and setup',
  'Getting comfortable with computers',
] as const

export type SupportEditorialContent = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    lead: string
    ctaForm: string
    ctaFormHint: string
    ctaCall: string
    phoneHint: string
    signatureName: string
    signatureTitle: string
    signaturePlace: string
  }
  services: {
    eyebrow: string
    title: string
    lead: string
    domains: SupportEditorialService[]
  }
  process: {
    title: string
    lead: string
    steps: { num: string; title: string; body: string }[]
  }
  trust: {
    title: string
    kicker: string
    statements: string[]
    quoteTitle: string
    quote: string
    scopeTitle: string
    scope: string
  }
  pricingNote: string
  contact: { title: string; lead: string }
}

export function getSupportEditorialContent(locale: PublicV2Locale = 'fr'): SupportEditorialContent {
  const landing = getSupportLandingContent(locale)
  const [pDepannage, pComptes, pMiseEnPlace, pInitiation] = landing.pillars
  const pillarTitles = locale === 'en' ? EDITORIAL_PILLAR_TITLES_EN : EDITORIAL_PILLAR_TITLES_FR

  const orgDomainFr: SupportEditorialService = {
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
  }

  const orgDomainEn: SupportEditorialService = {
    num: '05',
    id: 'organisations',
    title: 'IT solutions for organizations',
    lead:
      'Running a small business or non-profit? I can help you set up and modernize your IT tools.',
    items: [
      'Microsoft 365 and business email',
      'SharePoint and document organization',
      'Access and permissions setup',
      'Guidance and IT modernization',
    ],
    aside:
      'Hands-on experience with Expression LaSalle, a community organization in Montreal.',
    tone: 'accent',
  }

  if (locale === 'en') {
    return {
      hero: {
        eyebrow: 'The troubleshooting workshop',
        titleLine1: 'Computer trouble\u00a0?',
        titleLine2: 'Let’s get it sorted.',
        lead: 'Talk directly to a trained technician — no call centre.',
        ctaForm: 'Describe my issue',
        ctaFormHint: 'to the form',
        ctaCall: 'Call me',
        phoneHint: landing.phoneHint,
        signatureName: landing.identityName,
        signatureTitle: landing.identityTitle,
        signaturePlace: landing.identityPlace,
      },
      services: {
        eyebrow: 'Services',
        title: 'What I can sort out with you',
        lead: 'Five areas — at your place, remotely, or for your organization.',
        domains: [
          {
            num: '01',
            id: 'depannage',
            title: pillarTitles[0],
            lead: pDepannage.lead,
            items: pDepannage.items,
          },
          {
            num: '02',
            id: 'securite',
            title: pillarTitles[1],
            lead: pComptes.lead,
            items: pComptes.items,
          },
          {
            num: '03',
            id: 'mise-en-place',
            title: pillarTitles[2],
            lead: pMiseEnPlace.lead,
            items: pMiseEnPlace.items,
          },
          {
            num: '04',
            id: 'initiation',
            title: pillarTitles[3],
            lead: pInitiation.lead,
            items: pInitiation.items,
          },
          orgDomainEn,
        ],
      },
      process: {
        title: 'How it works',
        lead: 'Three simple steps — no fixed timeline promises.',
        steps: [
          {
            num: '1',
            title: 'You describe the situation',
            body: 'By phone or through the form: what is happening, since when, and how you would like help.',
          },
          {
            num: '2',
            title: 'We clarify next steps',
            body: 'I explain what I propose, what it involves, and the cost before any work starts.',
          },
          {
            num: '3',
            title: 'The fix',
            body: 'Remote or on Montreal Island — always with your OK before I access your devices.',
          },
        ],
      },
      trust: {
        title: 'Why work with IJIPOP',
        kicker: 'No call centre. One technician, plain-language explanations.',
        statements: [
          landing.trustSignals[0],
          'Every situation is assessed before we act',
          landing.trustSignals[2],
        ],
        quoteTitle: landing.reassuranceTitle,
        quote: landing.reassurance,
        scopeTitle: landing.travelTitle,
        scope: landing.travelNote,
      },
      pricingNote:
        'Every situation is different. We discuss cost before any intervention.',
      contact: {
        title: 'Let’s take a look together\u00a0?',
        lead: 'Describe your issue in a few lines — I’ll reply with a clear next step.',
      },
    }
  }

  return {
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
      eyebrow: 'Prestations',
      title: 'Ce que je peux régler avec vous',
      lead: 'Cinq domaines d’intervention — chez vous, à distance, ou pour votre organisation.',
      domains: [
        {
          num: '01',
          id: 'depannage',
          title: pillarTitles[0],
          lead: pDepannage.lead,
          items: pDepannage.items,
        },
        {
          num: '02',
          id: 'securite',
          title: pillarTitles[1],
          lead: pComptes.lead,
          items: pComptes.items,
        },
        {
          num: '03',
          id: 'mise-en-place',
          title: pillarTitles[2],
          lead: pMiseEnPlace.lead,
          items: pMiseEnPlace.items,
        },
        {
          num: '04',
          id: 'initiation',
          title: pillarTitles[3],
          lead: pInitiation.lead,
          items: pInitiation.items,
        },
        orgDomainFr,
      ],
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
  }
}

/** @deprecated Prefer getSupportEditorialContent(locale). */
export const SUPPORT_EDITORIAL = getSupportEditorialContent('fr')