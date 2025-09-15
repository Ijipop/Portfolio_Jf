const { execSync } = require('child_process');

console.log('🚀 Démarrage du déploiement Vercel...');

try {
  // Vérifier les variables d'environnement
  console.log(' Vérification des variables d\'environnement...');
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL n\'est pas définie');
  }
  
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET n\'est pas défini');
  }

  // Générer le client Prisma
  console.log('📦 Génération du client Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Déployer les migrations
  console.log('🗄️ Déploiement des migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // Build de l'application
  console.log('🔨 Build de l\'application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Déploiement terminé avec succès!');
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}
