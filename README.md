# 🚀 Portfolio Web - Next.js

Portfolio moderne avec Next.js 14, Material-UI, TypeScript et Prisma.

## ⚡ Démarrage rapide

### 1. Prérequis
- **Node.js** 18+ 
- **Compte Neon.tech** (base de données PostgreSQL)

### 2. Configuration
```bash
# Cloner le projet
git clone [votre-repo]
cd Portfolio-2

# Créer le fichier .env
```

Créer un fichier `.env` à la racine :
```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="votre-clé-secrète-jwt"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="votre-mot-de-passe"
```

### 3. Installation & Lancement
```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Créer l'utilisateur admin
node scripts/createAdminVercel.js

# Lancer l'application
npm run dev
```

🌐 **Application disponible sur :** `http://localhost:3000`

## 🎯 Fonctionnalités
- ✅ Portfolio responsive avec dark mode
- ✅ Gestion des projets (CRUD)
- ✅ Interface d'administration
- ✅ Authentification JWT
- ✅ Base de données PostgreSQL

## 📁 Structure du projet
```
app/
├── api/          # API Routes (auth, projects)
├── components/   # Composants réutilisables
├── admin/        # Interface d'administration
├── projets/      # Page des projets
└── contact/      # Page de contact
```

## 🛠️ Commandes utiles
```bash
npm run dev      # Développement
npm run build    # Build de production
npx prisma studio # Interface BDD
```
