export const CONTACT_MAILTO =
  'mailto:bonjour@ijipop.demo?subject=Projet%20web&body=Bonjour%2C%0A%0A'

export const NAV_LINKS = [
  { href: '#realisations', label: 'Projets' },
  { href: '#apropos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
] as const

export const HERO = {
  badge: 'Disponible · Montréal & Québec',
  name: 'Jean-François Lefebvre',
  role: 'Développeur web freelance',
  title: 'Je conçois des sites clairs, rapides et pensés pour convertir.',
  lead:
    'Sites vitrine, refontes et petits outils sur mesure pour indépendants et PME — avec un accompagnement direct après la mise en ligne.',
  primaryCta: 'Parler du projet',
  secondaryCta: 'Voir les projets',
  secondaryHref: '#realisations',
  metrics: [
    { label: 'Mandats livrés', value: '12+' },
    { label: 'Stack', value: 'Next.js · React' },
    { label: 'Délai type', value: '4–8 sem.' },
    { label: 'Zone', value: 'Québec' },
  ],
} as const

export const ABOUT = {
  kicker: 'À propos',
  title: 'Un seul interlocuteur, du brief à la mise en ligne.',
  body:
    'Basé à Montréal, j’accompagne travailleurs autonomes et petites entreprises partout au Québec. Mon approche : écouter le besoin réel, proposer une structure simple, livrer un site fiable — puis rester disponible pour les mises à jour.',
  skills: ['Next.js', 'React', 'TypeScript', 'SEO local', 'UI responsive', 'Maintenance'],
} as const

export const SERVICES = {
  kicker: 'Services',
  title: 'Ce que je prends en charge concrètement.',
  items: [
    {
      title: 'Vitrine & refonte',
      body: 'Pages claires, navigation intuitive et identité visuelle cohérente — pour que vos visiteurs comprennent votre offre en quelques secondes.',
    },
    {
      title: 'SEO & performance',
      body: 'Structure sémantique, temps de chargement maîtrisé et bases SEO pour être trouvé localement — sans promesses miracles.',
    },
    {
      title: 'Maintenance & outils',
      body: 'Mises à jour, contenu et petits outils sur mesure lorsque c’est le bon complément à votre site.',
    },
  ],
} as const

export type WorkPreviewTone = 'thermo' | 'cabinet' | 'atelier'

export const WORK = {
  kicker: 'Réalisations',
  title: 'Projets sélectionnés',
  aside: 'Extraits illustratifs — contextes fictifs sauf mention contraire.',
  featured: {
    title: 'Thermo-Trappeur',
    tag: 'PME · services · site vitrine',
    body: 'Site vitrine pour Thermo-Trap — évents de ventilation étanches et isolants au Québec : bénéfices produits, formulaire de contact et structure pensée pour rassurer et convertir.',
    previewTone: 'thermo' as WorkPreviewTone,
    previewLabel: 'Accueil · services · contact',
  },
  compact: [
    {
      title: 'Cabinet Laval & Associés',
      tag: 'Professionnel',
      body: 'Refonte sobre pour un cabinet comptable : services, équipe et prise de rendez-vous simplifiée.',
      previewTone: 'cabinet' as WorkPreviewTone,
      previewLabel: 'Services · équipe',
    },
    {
      title: 'Atelier Nord',
      tag: 'Outil interne',
      body: 'Tableau de bord léger pour suivre les commandes et les délais — sans ERP lourd.',
      previewTone: 'atelier' as WorkPreviewTone,
      previewLabel: 'Dashboard · suivi',
    },
  ],
} as const

export const PROCESS = {
  kicker: 'Processus',
  title: 'Quatre étapes, une collaboration directe.',
  steps: [
    {
      num: '01',
      title: 'Échange',
      body: 'Objectifs, contenu disponible et calendrier — pour cadrer le mandat sans jargon.',
    },
    {
      num: '02',
      title: 'Maquette',
      body: 'Structure et direction visuelle validées avant le développement.',
    },
    {
      num: '03',
      title: 'Développement',
      body: 'Intégration responsive, performance et SEO de base intégrés dès le départ.',
    },
    {
      num: '04',
      title: 'Mise en ligne',
      body: 'Lancement, formation rapide et option de maintenance selon vos besoins.',
    },
  ],
} as const

export const CONTACT = {
  title: 'Un projet à lancer ?',
  body: 'Décrivez votre besoin en quelques lignes — réponse sous une semaine ouvrable (exemple de vitrine).',
  cta: 'Écrire à Ijipop',
} as const

export const FOOTER = {
  copyright: '© 2026 Ijipop',
  backLabel: 'Plus d’exemples',
} as const
