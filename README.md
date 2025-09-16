# 🚀 Portfolio Web - Next.js

Portfolio moderne et interactif avec Next.js 14, Material-UI, TypeScript et Prisma. Inclut des effets visuels avancés, des cartes interactives et une interface d'administration complète.

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec dark/light mode
- 🃏 **Cartes interactives** avec effet de flip 3D
- 📱 **Responsive design** adaptatif
- 🔐 **Authentification JWT** sécurisée
- 🛠️ **Interface d'administration** complète
- 📊 **Gestion des projets** (CRUD)
- 🎭 **Effets visuels** et animations fluides
- 🗄️ **Base de données PostgreSQL** avec Prisma

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
│   ├── api/              # API Routes
│   │   ├── auth/         # Authentification (login, logout)
│   │   └── projects/     # Gestion des projets (CRUD)
│   ├── admin/            # Interface d'administration
│   │   └── dashboard/    # Tableau de bord admin
│   ├── components/       # Composants réutilisables
│   │   ├── appBar.tsx    # Barre de navigation
│   │   ├── Footer.tsx    # Pied de page
│   │   └── LoginModal.tsx # Modal de connexion
│   ├── a-propos/         # Page "À propos" avec cartes flip
│   ├── contact/          # Page de contact
│   ├── projets/          # Page des projets
│   └── page.tsx          # Page d'accueil
├── lib/
│   └── prisma.ts         # Configuration Prisma
├── prisma/
│   └── schema.prisma     # Schéma de base de données
├── scripts/
│   └── createAdminVercel.js # Script de création admin
└── public/
    └── imgs/             # Images et assets
```

## 🎯 Pages et fonctionnalités

### 🏠 Page d'accueil
- Présentation avec cartes interactives
- Effets visuels et animations
- Navigation fluide

### 👤 À propos
- **Cartes flip 3D** avec informations personnelles
- Effets de hover et animations
- Contenu personnalisable

### 📁 Projets
- Affichage des projets avec filtres
- Cartes avec effets visuels
- Liens vers les projets

### 📞 Contact
- Informations de contact
- Liens sociaux interactifs
- Design responsive

### 🔐 Administration
- Interface sécurisée pour gérer les projets
- Authentification JWT
- CRUD complet des projets

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev              # Serveur de développement
npm run build           # Build de production
npm run start           # Serveur de production

# Base de données
npx prisma studio       # Interface graphique BDD
npx prisma generate     # Générer le client Prisma
npx prisma db push      # Appliquer le schéma
npx prisma migrate dev  # Créer une migration

# Utilitaires
npm run lint            # Vérifier le code
npm run type-check      # Vérifier TypeScript
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
Utilisez l'interface d'administration ou l'API :
```bash
# Via l'interface web
http://localhost:3000/admin/dashboard

# Via l'API (avec authentification)
POST /api/projects
```

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
- **UI** : Material-UI (MUI)
- **Base de données** : PostgreSQL, Prisma ORM
- **Authentification** : JWT, bcrypt
- **Déploiement** : Vercel, Neon.tech
- **Styling** : CSS-in-JS, animations CSS

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Créé par Jean-François Lefebvre**
