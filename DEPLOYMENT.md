# Guide de Déploiement Vercel

## Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Base de données PostgreSQL** : 
   - [Neon](https://neon.tech) (recommandé)
   - [Supabase](https://supabase.com)
   - [PlanetScale](https://planetscale.com)

## Étapes de déploiement

### 1. Préparation de la base de données

1. Créez une nouvelle base de données PostgreSQL
2. Copiez l'URL de connexion (format : `postgresql://username:password@host:port/database?sslmode=require`)

### 2. Configuration des variables d'environnement

Dans votre dashboard Vercel, ajoutez ces variables :

```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
JWT_SECRET=votre-clé-secrète-jwt-très-longue-et-sécurisée
NODE_ENV=production
```

### 3. Déploiement

1. **Connectez votre repository GitHub à Vercel**
2. **Sélectionnez le dossier `Portfolio-2`** comme racine du projet
3. **Vercel détectera automatiquement Next.js**
4. **Cliquez sur "Deploy"**

### 4. Configuration post-déploiement

1. **Migrations de base de données** : Vercel exécutera automatiquement `prisma generate` et `prisma migrate deploy`
2. **Création d'un admin** : Utilisez le script `createAdmin.js` si nécessaire

## Scripts disponibles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Déploiement complet
node scripts/deploy.js
```

## Vérification du déploiement

1. Vérifiez que l'application se charge correctement
2. Testez la connexion admin
3. Vérifiez que les API fonctionnent
4. Testez l'ajout/suppression de projets

## Dépannage

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correcte
- Assurez-vous que la base de données accepte les connexions externes

### Erreur JWT
- Vérifiez que `JWT_SECRET` est défini
- Assurez-vous que la clé est suffisamment longue et sécurisée

### Erreur de build
- Vérifiez que toutes les dépendances sont installées
- Consultez les logs de build dans Vercel

## ✅ **Résumé des modifications effectuées :**

1. **✅ package.json** : Ajout de `prisma generate` dans le script de build
2. **✅ vercel.json** : Configuration Vercel optimisée
3. **✅ .env.example** : Template pour les variables d'environnement
4. **✅ API login** : Correction de la gestion du JWT_SECRET
5. **✅ Script deploy** : Amélioration avec vérifications
6. **✅ DEPLOYMENT.md** : Guide complet de déploiement

##  **Prochaines étapes pour déployer :**

1. **Créez un fichier `.env.local`** avec vos vraies variables :
   ```env
   DATABASE_URL="votre_url_postgresql"
   JWT_SECRET="votre_clé_secrète_longue"
   ```

2. **Pushez tout sur GitHub**

3. **Connectez votre repo à Vercel**

4. **Ajoutez les variables d'environnement dans Vercel Dashboard**

5. **Déployez !**

Votre projet est maintenant 100% prêt pour Vercel ! 🎉
