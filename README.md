# 🚀 Portfolio Web - Next.js

Portfolio moderne et interactif avec Next.js 14, Material-UI, TypeScript et Prisma. Effets visuels (fond VANTA Topology), cartes interactives, pages Projets / À propos / Contact, et interface d’administration pour la gestion des projets.

## ✨ Fonctionnalités

- 🎨 **Design** avec palettes de couleurs (thème default et personnalisables)
- 🌐 **Fond animé** VANTA Topology sur les pages du portfolio
- 🃏 **Cartes interactives** avec effet 3D et animations
- 📱 **Responsive** et chargement perçu instantané (animations raccourcies)
- 🔐 **Authentification JWT** pour l’admin
- 🛠️ **Interface d’administration** : projets (CRUD), upload d’images
- 📊 **Gestion des projets** (CRUD)
- 🎭 **Effets visuels** et animations (ScrollReveal, FadeIn, gradientShift)
- 🗄️ **PostgreSQL** avec Prisma (User, Project)

## ⚡ Démarrage rapide

### 1. Prérequis
- **Node.js** 18+ 
- **Compte Neon.tech** (base de données PostgreSQL)
- **Git**

### 2. Installation
```bash
# Cloner le projet
git clone [votre-repo]
cd Portfolio

# Installation des dépendances
npm install
```

### 3. Configuration
Créer un fichier `.env` à la racine :
```env
# Base de données PostgreSQL (Neon.tech)
DATABASE_URL="postgresql://user:password@host:port/database"

# Clé secrète JWT (générez une clé forte)
JWT_SECRET="votre-clé-secrète-jwt-très-longue-et-complexe"

# Informations admin (optionnel - sera créé via script)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="votre-mot-de-passe-sécurisé"
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma à la base de données
npx prisma db push

# Créer l'utilisateur administrateur
node scripts/createAdminVercel.js
```

### 5. Lancement
```bash
# Mode développement
npm run dev

# Build de production
npm run build
npm start
```

🌐 **Application disponible sur :** `http://localhost:3000`

## 📁 Structure du projet
```
Portfolio/
├── app/
│   ├── api/                  # API Routes
│   │   ├── auth/             # Login, logout
│   │   ├── projects/         # CRUD projets
│   │   └── upload/           # Upload images (admin)
│   ├── admin/
│   │   └── dashboard/        # Gestion des projets (CRUD, images)
│   ├── components/           # AppBar, Footer, LoginModal, VantaTopologyBackground, cartes, etc.
│   ├── portfolio/            # Projets, à-propos, contact
│   ├── design-system/        # Thèmes, constantes
│   ├── contexts/             # Langue, thème avancé
│   └── page.tsx              # Accueil
├── lib/prisma.ts
├── prisma/schema.prisma      # User, Project
├── scripts/
│   ├── createAdminVercel.js  # Créer l'admin
│   ├── createAdminWithEmail.js
│   ├── changeAdminPassword.js
│   └── showAdmin.js
└── public/
    └── imgs/projets/         # Images uploadées (projets)
```

## 🎯 Pages et fonctionnalités

### 🏠 Page d'accueil
- Cartes interactives (Projets, À propos, Contact)
- Fond VANTA Topology, apparition instantanée

### 👤 À propos
- Cartes flip 3D, contenu personnalisable

### 📁 Projets
- Grille de projets avec filtres (technologies, statut)
- Cartes avec image, description, technologies, lien

### 📞 Contact
- Informations et liens sociaux

### 🔐 Administration
- **Projets** : CRUD, upload d’images (JPEG/PNG/WEBP/GIF, max 5 Mo)
- Authentification JWT ; accès via menu « Admin » ou `/admin` puis `/admin/dashboard`

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production

# Base de données
npx prisma studio        # Interface graphique BDD
npx prisma generate      # Générer le client Prisma
npx prisma db push       # Appliquer le schéma
npx prisma migrate dev   # Créer une migration

# Admin (scripts)
npm run admin:create     # Créer un admin (createAdminWithEmail.js)
npm run admin:show       # Afficher les comptes admin
npm run admin:password   # Changer le mot de passe (changeAdminPassword.js)

# Utilitaires
npm run lint             # Vérifier le code
npm run type-check       # Vérifier TypeScript
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel :
   - `DATABASE_URL`
   - `JWT_SECRET`
3. Déployer automatiquement

### Variables d'environnement Vercel
```env
DATABASE_URL=postgresql://...
JWT_SECRET=votre-clé-secrète
```

## 🔧 Personnalisation

### Modifier les cartes "À propos"
Éditez le fichier `app/a-propos/page.tsx` pour personnaliser :
- Le contenu des cartes
- Les effets visuels
- Les animations

### Ajouter des projets
- **Interface** : `http://localhost:3000/admin/dashboard` → formulaire + upload image.
- **API** : `POST /api/projects` (Bearer JWT), `GET /api/projects`, `PUT/DELETE /api/projects/:id`.

### Modifier le design
- **Thème** : `app/components/ThemeWrapper.tsx`
- **Styles globaux** : `app/components/components.css`
- **Composants** : `app/components/`

## 🛡️ Sécurité

- ✅ Authentification JWT avec expiration
- ✅ Hachage des mots de passe (bcrypt)
- ✅ Protection des routes API
- ✅ Validation des données
- ✅ Variables d'environnement sécurisées

## 📝 Technologies utilisées

- **Frontend** : Next.js 14, React, TypeScript
- **UI** : Material-UI (MUI), design system (thèmes, constantes)
- **Effets** : VANTA Topology (p5.js), Framer Motion, ScrollReveal
- **i18n** : français / anglais
- **Base de données** : PostgreSQL (Neon), Prisma (User, Project)
- **Authentification** : JWT, bcrypt
- **Déploiement** : Vercel, Neon.tech
- **Styling** : CSS-in-JS, animations CSS, chargement optimisé (instantané)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---
Initialement créé dans le cadre d'un cours de programmation
**Créé par Jean-François Lefebvre, Natacha Meyer & Nadia Desjardins**
