# Portfolio Web - Next.js avec Material-UI

Portfolio web moderne développé avec Next.js 14, Material-UI, TypeScript et Prisma.

## Démarrage rapide

### Prérequis
- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **Git** ([Télécharger](https://git-scm.com/))
- **Compte Neon.tech** pour la base de données PostgreSQL

### Installation en 3 étapes

```bash
# 1. Cloner le projet
git clone <votre-repo-github>
cd Portfolio-2

# 2. Installer toutes les dépendances (automatique)
npm run install

# 3. Lancer l'application
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Dépendances installées automatiquement

Le script `npm run install` installe automatiquement :

### Dependencies
- **Next.js 14** - Framework React
- **React 18** - Bibliothèque UI
- **Material-UI (MUI)** - Composants UI
- **@emotion/react & @emotion/styled** - CSS-in-JS pour MUI
- **@mui/icons-material** - Icônes Material Design
- **Prisma** - ORM pour base de données
- **Framer Motion** - Animations
- **bcryptjs** - Hachage de mots de passe
- **jsonwebtoken** - Authentification JWT

### DevDependencies
- **TypeScript** - Typage statique
- **ESLint** - Linting du code
- **@types/node, @types/react** - Types TypeScript

## 🗄️ Configuration de la base de données

1. **Créez un compte sur [Neon.tech](https://neon.tech)**
2. **Créez un projet PostgreSQL**
3. **Copiez l'URL de connexion**
4. **Créez un fichier `.env.local` :**

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

5. **Initialisez la base de données :**
```bash
npx prisma generate
npx prisma db push
```

## Scripts disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Compile pour la production
npm run start        # Lance l'application en production
npm run lint         # Vérifie le code avec ESLint
npm run install      # Installe toutes les dépendances du fichier install.txt
npm run db:seed      # Peuple la base de données avec des données de test
```

## Structure du projet

```
Portfolio-2/
├── app/                    # Pages et composants Next.js
│   ├── api/               # Routes API REST
│   ├── components/        # Composants réutilisables
│   ├── contexts/          # Contextes React (thème)
│   └── [pages]/           # Pages de l'application
├── prisma/                # Configuration Prisma
│   ├── schema.prisma      # Schéma de base de données
│   └── seed.ts           # Données de test
├── lib/                   # Utilitaires
├── documentation/         # Documentation complète
└── tests/                # Tests et collections Postman
```

## Fonctionnalités

- **Design responsive** avec Material-UI
- **Thème sombre/clair** avec persistance
- **API REST** pour gérer les projets
- **Base de données PostgreSQL** avec Prisma
- **TypeScript** pour la sécurité du typage
- **Animations fluides** avec Framer Motion

## 🔧 Développement

### Ajouter une nouvelle dépendance
1. Ajoutez-la dans `install.txt`
2. Exécutez `npm run install`

### Modifier le schéma de base de données
1. Modifiez `prisma/schema.prisma`
2. Exécutez `npx prisma generate`
3. Exécutez `npx prisma db push`

## Documentation complète

Consultez le dossier `documentation/` pour des guides détaillés :
- **01-DEMARRAGE_RAPIDE.md** - Installation en 5 minutes
- **02-GUIDE_ETUDIANT.md** - Guide pas-à-pas
- **03-README.md** - Documentation technique
- **CODE_ANALYSIS.md** - Analyse détaillée du code

## Dépannage

### Erreur "Cannot find module '@mui/icons-material'"
```bash
npm install @mui/icons-material @emotion/react @emotion/styled
```

### Erreur de base de données
```bash
npx prisma generate
npx prisma db push
```

### Erreur de cache Next.js
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---
