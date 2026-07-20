export const SUPPORT_LANDING_PATH = '/soutien-informatique-montreal'

/** Remplacer ici pour une nouvelle photo plus tard. */
export const SUPPORT_PORTRAIT_SRC = '/img/Jf.jpg'

export const SUPPORT_PHONE_DISPLAY = '(514) 447-3183'
export const SUPPORT_PHONE_TEL = '+15144473183'
export const SUPPORT_PHONE_HREF = `tel:${SUPPORT_PHONE_TEL}`
export const SUPPORT_SMS_HREF = `sms:${SUPPORT_PHONE_TEL}`
export const SUPPORT_FORM_ANCHOR = 'demande-soutien'

export type SupportPriceRow = {
  service: string
  price: string
  /** Lien optionnel (ex. ancre formulaire pour un devis). */
  href?: string
}

type SupportLocaleCopy = {
  h1: string
  heroLead: string
  contactSubject: string
  ctaPrimary: string
  ctaCall: string
  ctaText: string
  phoneHint: string
  trustSignals: readonly [string, string, string]
  identityName: string
  identityTitle: string
  identityPlace: string
  portraitAlt: string
  pricesTitle: string
  pricesNote: string
  prices: readonly SupportPriceRow[]
  formTitle: string
  formLead: string
  formName: string
  formEmail: string
  formPhone: string
  formDevice: string
  formDevicePlaceholder: string
  formMode: string
  formModeRemote: string
  formModeHome: string
  formModeEither: string
  formNeed: string
  formNeedFix: string
  formNeedLearn: string
  formNeedRequired: string
  formMessage: string
  formMessagePlaceholder: string
  formMessagePlaceholderLearn: string
  formSubmit: string
  formSending: string
  formSuccessTitle: string
  formSuccessBody: string
  formSuccessAgain: string
  formPhoneRequired: string
  formModeRequired: string
  serviceTitle: string
  serviceLead: string
  reassuranceTitle: string
  reassurance: string
  travelTitle: string
  travelNote: string
  services: readonly string[]
  pillars: readonly {
    id: string
    title: string
    lead: string
    items: readonly string[]
  }[]
}

const fr: SupportLocaleCopy = {
  /** NBSP avant « ? » pour éviter un point d’interrogation seul en fin de ligne. */
  h1: 'Un problème avec votre ordinateur\u00a0?',
  heroLead: 'Parlez directement à un technicien diplômé — sans centre d’appel.',
  contactSubject: 'Demande : soutien informatique (Montréal / à distance)',
  ctaPrimary: 'Demander de l’aide',
  ctaCall: 'Appeler',
  ctaText: 'Texter',
  phoneHint: 'Réponse généralement le jour même',
  trustSignals: [
    'Technicien diplômé',
    'Prix fixé avant de commencer',
    'Aucun accès sans votre accord',
  ],
  identityName: 'Jean-François Lefebvre',
  identityTitle: 'Technicien diplômé en soutien informatique',
  identityPlace: 'Montréal et à distance',
  portraitAlt: 'Portrait de Jean-François Lefebvre',
  pricesTitle: 'Prix clairs',
  pricesNote: 'Taxes en sus. Visites sur l’île de Montréal.',
  prices: [
    { service: 'Diagnostic à distance, 30 min', price: '35 $' },
    { service: 'Intervention à distance, jusqu’à 1 h', price: '65 $' },
    { service: 'Visite à domicile, 1ʳᵉ heure', price: '89 $' },
    { service: 'Heure supplémentaire', price: '60 $' },
    { service: 'Installation propre de Windows', price: '99 $' },
    { service: 'Configuration ordinateur neuf', price: '89 $' },
    { service: 'Migration ou clonage vers SSD', price: '119 $ + pièce' },
    { service: 'Nettoyage et optimisation', price: '79 $' },
    { service: 'Transfert de fichiers', price: '79 $' },
    { service: 'Récupération de données simple', price: 'dès 99 $' },
    { service: 'Sauvegarde avant intervention', price: '40 $ à 60 $' },
    { service: 'Initiation à l’ordinateur (à l’heure)', price: '60 $' },
    {
      service: 'Toute autre demande',
      price: 'Sur devis',
      href: `#${SUPPORT_FORM_ANCHOR}`,
    },
  ],
  formTitle: 'Décrivez votre problème',
  formLead: 'Je vous réponds rapidement avec une suite claire.',
  formName: 'Nom',
  formEmail: 'Courriel',
  formPhone: 'Téléphone',
  formDevice: 'Type d’appareil',
  formDevicePlaceholder: 'Ex. : PC Windows, Mac, portable…',
  formMode: 'Où souhaitez-vous l’aide ?',
  formModeRemote: 'À distance',
  formModeHome: 'À domicile (Montréal)',
  formModeEither: 'Peu importe',
  formNeed: 'De quoi avez-vous besoin\u00a0?',
  formNeedFix: 'Dépannage ou mise en place',
  formNeedLearn: 'Apprendre à utiliser mon ordinateur',
  formNeedRequired: 'Choisissez une option',
  formMessage: 'Description du problème',
  formMessagePlaceholder: 'Que se passe-t-il ? Depuis quand ?',
  formMessagePlaceholderLearn: 'Qu’aimeriez-vous apprendre ?',
  formSubmit: 'Envoyer la demande',
  formSending: 'Envoi…',
  formSuccessTitle: 'Demande envoyée',
  formSuccessBody: 'Merci. Je vous réponds rapidement.',
  formSuccessAgain: 'Envoyer une autre demande',
  formPhoneRequired: 'Le téléphone est requis',
  formModeRequired: 'Choisissez une option',
  serviceTitle: 'Comment je peux vous aider',
  serviceLead: 'Des solutions simples, sans pression.',
  reassuranceTitle: 'Honnêteté d’abord',
  reassurance:
    'Si je ne peux pas vous aider, je vous le dirai avant de vous faire perdre temps ou argent.',
  travelTitle: 'Montréal et à distance',
  travelNote: 'Visites sur l’île de Montréal. Aide à distance partout au Québec.',
  services: [
    'Ordinateur lent ou qui plante',
    'Installation de Windows',
    'Passage à un disque SSD',
    'Récupération de fichiers simple',
    'Configuration d’un ordinateur neuf',
    'Courriels et comptes',
    'Mots de passe et double vérification',
    'Sauvegardes',
    'Aide pour travailleurs autonomes et petites entreprises',
    'Initiation à l’ordinateur — accessible à tous',
  ],
  pillars: [
    {
      id: 'depannage',
      title: 'Dépannage',
      lead: 'Ordinateur lent, qui plante, ou qui ne démarre plus.',
      items: [
        'Ordinateur lent ou qui plante',
        'Installation de Windows',
        'Passage à un disque SSD',
      ],
    },
    {
      id: 'securite',
      title: 'Comptes et fichiers',
      lead: 'Protéger vos accès et ce qui compte pour vous.',
      items: [
        'Mots de passe et double vérification',
        'Sauvegardes',
        'Récupération de fichiers simple',
      ],
    },
    {
      id: 'mise-en-place',
      title: 'Mise en place',
      lead: 'Démarrer du bon pied, ou garder un outil fiable.',
      items: [
        'Configuration d’un ordinateur neuf',
        'Courriels et comptes',
        'Aide pour travailleurs autonomes',
      ],
    },
    {
      id: 'initiation',
      title: 'Initiation à l’ordinateur',
      lead: 'Petit cours pour tous ceux qui veulent apprendre — pour rendre l’ordinateur accessible à tous.',
      items: [
        'Allumer, fichiers, dossiers',
        'Courriel et navigation sur internet',
        'Sécurité de base (mots de passe, arnaques)',
      ],
    },
  ],
}

const en: SupportLocaleCopy = {
  h1: 'Computer trouble\u00a0?',
  heroLead: 'Talk directly to a trained technician — no call centre.',
  contactSubject: 'Request: technical support (Montreal / remote)',
  ctaPrimary: 'Ask for help',
  ctaCall: 'Call',
  ctaText: 'Text',
  phoneHint: 'Usually same-day reply',
  trustSignals: [
    'Trained technician',
    'Price agreed before we start',
    'No access without your OK',
  ],
  identityName: 'Jean-François Lefebvre',
  identityTitle: 'Trained IT support technician',
  identityPlace: 'Montreal and remote',
  portraitAlt: 'Portrait of Jean-François Lefebvre',
  pricesTitle: 'Clear prices',
  pricesNote: 'Taxes extra. Home visits on Montreal Island.',
  prices: [
    { service: 'Remote check-up, 30 min', price: '$35' },
    { service: 'Remote help, up to 1 hour', price: '$65' },
    { service: 'Home visit, first hour', price: '$89' },
    { service: 'Extra hour', price: '$60' },
    { service: 'Clean Windows install', price: '$99' },
    { service: 'New computer setup', price: '$89' },
    { service: 'SSD move or clone', price: '$119 + parts' },
    { service: 'Cleanup and speed-up', price: '$79' },
    { service: 'File transfer', price: '$79' },
    { service: 'Simple data recovery', price: 'from $99' },
    { service: 'Full backup before work', price: '$40–$60' },
    { service: 'Computer basics (hourly)', price: '$60' },
    {
      service: 'Any other request',
      price: 'Get a quote',
      href: `#${SUPPORT_FORM_ANCHOR}`,
    },
  ],
  formTitle: 'Describe the problem',
  formLead: 'I’ll reply quickly with a clear next step.',
  formName: 'Name',
  formEmail: 'Email',
  formPhone: 'Phone',
  formDevice: 'Device type',
  formDevicePlaceholder: 'e.g. Windows PC, Mac, laptop…',
  formMode: 'Where do you want help?',
  formModeRemote: 'Remote',
  formModeHome: 'At home (Montreal)',
  formModeEither: 'Either works',
  formNeed: 'What do you need\u00a0?',
  formNeedFix: 'Fix or set up',
  formNeedLearn: 'Learn to use my computer',
  formNeedRequired: 'Please choose an option',
  formMessage: 'What is wrong?',
  formMessagePlaceholder: 'What happens? Since when?',
  formMessagePlaceholderLearn: 'What would you like to learn?',
  formSubmit: 'Send request',
  formSending: 'Sending…',
  formSuccessTitle: 'Request sent',
  formSuccessBody: 'Thank you. I’ll get back to you soon.',
  formSuccessAgain: 'Send another request',
  formPhoneRequired: 'Phone is required',
  formModeRequired: 'Please choose an option',
  serviceTitle: 'How I can help',
  serviceLead: 'Simple solutions, no pressure.',
  reassuranceTitle: 'Honesty first',
  reassurance: 'If I can’t help, I’ll say so before you waste time or money.',
  travelTitle: 'Montreal and remote',
  travelNote: 'Home visits on Montreal Island. Remote help across Quebec.',
  services: [
    'Slow or crashing computer',
    'Windows install',
    'Move to an SSD',
    'Simple file recovery',
    'New computer setup',
    'Email and accounts',
    'Passwords and two-step login',
    'Backups',
    'Help for freelancers and small businesses',
    'Computer basics — accessible to all',
  ],
  pillars: [
    {
      id: 'depannage',
      title: 'Fixes',
      lead: 'Slow, crashing, or won’t start.',
      items: ['Slow or crashing computer', 'Windows install', 'Move to an SSD'],
    },
    {
      id: 'securite',
      title: 'Accounts and files',
      lead: 'Protect access and what matters to you.',
      items: ['Passwords and two-step login', 'Backups', 'Simple file recovery'],
    },
    {
      id: 'mise-en-place',
      title: 'Setup',
      lead: 'A clean start, or a reliable daily tool.',
      items: ['New computer setup', 'Email and accounts', 'Help for freelancers'],
    },
    {
      id: 'initiation',
      title: 'Computer basics',
      lead: 'Short lessons for anyone who wants to learn — making the computer feel accessible to all.',
      items: [
        'Turn on, files, folders',
        'Email and browsing the web',
        'Basic safety (passwords, scams)',
      ],
    },
  ],
}

/** @deprecated Prefer getSupportLandingContent(locale) — kept for SEO layout imports. */
export const supportLandingContent = fr

export function getSupportLandingContent(locale: string): SupportLocaleCopy {
  return locale === 'en' ? en : fr
}
