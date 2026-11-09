/**
 * Copy FR québécois — page /portfolio/a-propos V2 (Phase 6B4).
 * Ne pas confondre avec aboutContent.ts (section À propos de l’accueil).
 * Récit personnel : trois paragraphes issus de fr.ts (about.personalStoryP1–P3),
 * publiés avec l’accord explicite de l’utilisateur.
 * Formations reprises de la V1 — à confirmer avant publication.
 */

export const ABOUT_PAGE_SKILLS = [
  'Python',
  'Java',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'SQL',
  'CSS3',
  'HTML5',
  'Git',
] as const

export const ABOUT_PAGE_COPY = {
  title: 'À propos',
  identityName: 'Jean-François Lefebvre',
  identityRole: 'Développeur indépendant à Montréal',
  lead:
    'Je conçois des sites web, je développe des logiciels et j’offre du soutien informatique.',
  portrait: {
    src: '/img/Jf.jpg',
    alt: 'Portrait de Jean-François Lefebvre',
    width: 640,
    height: 800,
  },
  storyTitle: 'Mon parcours',
  /** Textes originaux V1 — about.personalStoryP1–P3 (fr.ts). */
  storyParagraphs: [
    "Survivant d'un AVC à l'âge de 38 ans et père de deux enfants, j'ai dû réinventer ma trajectoire professionnelle pour bâtir un avenir qui me permet de travailler de la maison, près de ceux qui comptent le plus pour moi.",
    "Ce qui a d'abord commencé comme une réorientation de carrière est rapidement devenu une véritable passion. Aujourd'hui, je mets cette passion au service des autres en créant des sites web et des logiciels sur mesure, pensés avec soin, humanité et souci du détail.",
    "Chaque projet que je réalise est pour moi bien plus qu'un simple mandat : c'est l'occasion de créer quelque chose d'utile, de beau et de durable, qui reflète réellement les besoins et la vision de mes clients.",
  ] as const,
  workingTitle: 'Ma façon de travailler',
  workingParagraphs: [
    'Je commence par comprendre ce dont vous avez besoin. Ensuite, on regarde ensemble ce qui vaut la peine d’être développé et comment rendre le résultat simple à utiliser et à faire évoluer.',
    'Je porte attention aux détails et je préfère les solutions pratiques aux complications inutiles. Je reste aussi disponible après la livraison pour les ajustements, les mises à jour et le soutien.',
  ] as const,
  formationTitle: 'Formation',
  formationItems: [
    "DEP en soutien informatique à l'ÉMICA (2023-2024)",
    "AEC Développement de logiciels, sécurité d'applications de bureau, mobiles et Web au Cégep De Maisonneuve (2024-2026)",
  ] as const,
  toolsTitle: 'Outils et technologies',
  ctaTitle: 'Un projet ou une question?',
  ctaBody:
    'Vous avez besoin d’un site web, d’un logiciel ou d’un coup de main en informatique? Écrivez-moi pour m’expliquer ce que vous cherchez.',
  ctaContact: 'Me contacter',
  ctaContactHref: '/portfolio/contact',
  ctaProjects: 'Voir mes réalisations',
  ctaProjectsHref: '/portfolio/projets',
} as const
