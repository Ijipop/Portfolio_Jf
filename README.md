# Portfolio Ijipop — Next.js

Site vitrine et portfolio (Jean-François Lefebvre / Ijipop) : Next.js, Material UI, TypeScript, Prisma. Fond animé (VANTA Topology) sur les pages portfolio, cartes 3D, pages Projets / À propos / Contact, formulaire de contact (e-mail via API), page logiciel **Timelendr**, administration des projets et des versions Timelendr.

## Fonctionnalités

- **Design** : thèmes (clair / sombre / personnalisés), design system partagé
- **Fond animé** : VANTA Topology sur les routes portfolio / logiciel (selon configuration)
- **Cartes** : effet 3D, animations (Framer Motion, ScrollReveal, etc.)
- **Internationalisation** : français / anglais (`app/i18n/translations.ts`)
- **Authentification** : JWT pour l’admin
- **Admin** : CRUD projets, uploads images ; versions Timelendr (liens `.zip` externes + Vercel Blob optionnel)
- **Contact** : `POST /api/contact` (Resend selon configuration)
- **Base de données** : PostgreSQL, Prisma (User, Project, TimelendrRelease, etc.)

Les **textes affichés sur la page d’accueil** (hero, cartes, sections) ne sont pas dans ce README : ils sont éditables dans **`app/i18n/translations.ts`** (clés `home.*`, `heroTagline`, etc.).

## Prérequis

- **Node.js** 18.18+ (recommandé : LTS 20+)
- **PostgreSQL** (ex. Neon)
- **Git**

## Installation

```bash
git clone <votre-repo>
cd <dossier-du-projet>   # souvent « Portfolio » si le repo contient ce sous-dossier ; sinon la racine du clone où se trouve package.json
npm install
```

Le script `postinstall` exécute `prisma generate`.  
**Important** : ouvrez le dossier qui contient **`package.json`** (celui du site Next.js), pas un parent vide.

Après `npm install`, pour un premier run local complet (admin, API projets, etc.) : créez un **`.env`** avec au moins **`DATABASE_URL`** et **`JWT_SECRET`**, puis `npx prisma db push` (ou migrations). Sans base, le site peut quand même afficher les pages statiques, mais l’admin et les données Prisma ne fonctionneront pas.

## Configuration

Créer un fichier **`.env`** à la racine du dossier `Portfolio` :

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="clé-longue-et-aléatoire"

# Optionnel — création admin (voir scripts)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="…"

# Contact (e-mails depuis le formulaire)
# RESEND_API_KEY=…
# CONTACT_TO_EMAIL=…

# Timelendr sur Vercel : gros fichiers → Vercel Blob
# BLOB_READ_WRITE_TOKEN="vercel_blob_rw_…"

# URL publique du site (SEO, métadonnées)
# NEXT_PUBLIC_SITE_URL="https://votre-domaine.com"
```

## Base de données

```bash
npx prisma generate
npx prisma db push
# ou en prod : npm run build:prod (migrate deploy + build)

# Création d’un compte admin (adapter selon le script utilisé)
node scripts/createAdminWithEmail.js
```

## Lancement

```bash
npm run dev          # http://localhost:3000
npm run build
npm start
```

## Structure (aperçu)

```
Portfolio/
├── app/
│   ├── api/                 # auth, contact, projects, upload, timelendr, …
│   ├── admin/               # login, dashboard
│   ├── components/          # UI partagée, hero, VANTA, etc.
│   ├── portfolio/           # accueil portfolio, projets, à-propos, contact
│   ├── logiciel/timelendr/  # page produit Timelendr
│   ├── i18n/translations.ts # textes FR/EN (dont page d’accueil)
│   └── page.tsx             # accueil racine
├── prisma/schema.prisma
├── public/                  # assets statiques (servis à la racine)
└── scripts/                 # admin, favicon, utilitaires
```

## Pages principales

| Zone            | Rôle |
|-----------------|------|
| `/`             | Accueil (hero, cartes vers portfolio) |
| `/portfolio/projets` | Grille projets + filtres |
| `/portfolio/a-propos` | À propos |
| `/portfolio/contact` | Formulaire + coordonnées |
| `/logiciel/timelendr` | Présentation Timelendr + téléchargements |
| `/logiciel/timelendr/merci` | Page de remerciement après paiement (Stripe) — `noindex`, non listée dans le menu ; URL de succès checkout à configurer côté Stripe / Render vers cette adresse (alias `/logiciel/timelendar/merci` → même page) |
| `/admin` → `/admin/dashboard` | Gestion (JWT) |

## Commandes utiles

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check          # lint + typecheck + tests unitaires
npm run test:unit
npm run test:e2e

npm run admin:create
npm run admin:show
npm run admin:password

npx prisma studio
```

## Déploiement (Vercel)

1. Lier le dépôt GitHub à Vercel ; **root directory** = dossier contenant ce `package.json` (souvent `Portfolio`).
2. Définir les variables d’environnement (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`, etc.).
3. Build : `npm run build` (ou `build:prod` si migrations en CI).

## Personnalisation rapide

- **Textes du site (dont accueil)** : `app/i18n/translations.ts`
- **Thème / MUI** : `app/components/ThemeWrapper.tsx`, `app/globals.css`
- **À propos** : `app/portfolio/a-propos/` (composants sous `components/`)
- **Projets** : données en base + admin ; images sous `public/` ou URLs distantes

## Sécurité (rappel)

- JWT avec expiration, mots de passe hashés (bcrypt)
- Routes API protégées pour l’admin
- Secrets uniquement dans l’environnement, jamais commités

## Technologies

- **App** : Next.js 16, React 18, TypeScript
- **UI** : MUI 7, Emotion
- **Données** : Prisma 6, PostgreSQL
- **Qualité** : ESLint 9 (flat config), Vitest, Playwright (e2e)
- **Déploiement** : Vercel (typique), analytics optionnelle (`@vercel/analytics`)

## Licence

Voir le fichier `LICENSE` (MIT, sauf mention contraire).

---

Initialement créé dans le cadre d’un cours de programmation (Jean-François Lefebvre, Natacha Meyer, Nadia Desjardins).  
Développement et maintenance actuels : **Jean-François Lefebvre** — Ijipop.
