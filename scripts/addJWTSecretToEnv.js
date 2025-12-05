// Script pour ajouter JWT_SECRET au fichier .env
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '..', '.env');

try {
  // Générer une clé JWT
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  
  // Lire le fichier .env s'il existe
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Vérifier si JWT_SECRET existe déjà
  if (envContent.includes('JWT_SECRET=')) {
    console.log('⚠️  JWT_SECRET existe déjà dans le fichier .env');
    console.log('💡 Utilisez: node scripts/showJWTSecret.js pour voir la valeur actuelle');
    console.log('💡 Ou modifiez manuellement le fichier .env');
    process.exit(0);
  }
  
  // Ajouter JWT_SECRET au fichier
  const newLine = `JWT_SECRET="${jwtSecret}"`;
  
  // Ajouter une ligne vide si le fichier n'est pas vide et ne se termine pas par une nouvelle ligne
  if (envContent && !envContent.endsWith('\n')) {
    envContent += '\n';
  }
  
  envContent += `\n# Clé secrète JWT (générée automatiquement)\n${newLine}\n`;
  
  // Écrire le fichier
  fs.writeFileSync(envPath, envContent, 'utf8');
  
  console.log('✅ JWT_SECRET ajouté au fichier .env avec succès!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 Clé générée:', jwtSecret);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📍 Fichier modifié:', envPath);
  console.log('⚠️  Ne partagez JAMAIS cette clé publiquement!');
  console.log('\n💡 Redémarrez votre serveur de développement pour que les changements prennent effet.');
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.log('\n💡 Assurez-vous que vous avez les permissions d\'écriture sur le fichier .env');
}

