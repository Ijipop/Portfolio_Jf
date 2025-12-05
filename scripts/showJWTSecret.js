// Script pour afficher la clé JWT depuis le fichier .env
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

try {
  if (!fs.existsSync(envPath)) {
    console.log('❌ Fichier .env non trouvé à:', envPath);
    console.log('💡 Créez un fichier .env à la racine du projet Portfolio/');
    console.log('💡 Utilisez: node scripts/generateJWTSecret.js pour générer une clé');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  let jwtSecretFound = false;
  
  console.log('🔍 Recherche de JWT_SECRET dans .env...\n');
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('JWT_SECRET=') || trimmedLine.startsWith('JWT_SECRET =')) {
      jwtSecretFound = true;
      const match = trimmedLine.match(/JWT_SECRET\s*=\s*["']?([^"'\n]+)["']?/);
      if (match && match[1]) {
        const secret = match[1];
        console.log('✅ JWT_SECRET trouvé:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(secret);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📍 Ligne ${index + 1} du fichier .env`);
      } else {
        console.log('⚠️  JWT_SECRET trouvé mais valeur vide ou invalide');
        console.log(`📍 Ligne ${index + 1}: ${trimmedLine}`);
      }
    }
  });
  
  if (!jwtSecretFound) {
    console.log('❌ JWT_SECRET non trouvé dans le fichier .env');
    console.log('\n💡 Ajoutez cette ligne dans votre fichier .env:');
    console.log('   JWT_SECRET="votre-clé-secrète-ici"');
    console.log('\n💡 Pour générer une clé sécurisée, utilisez:');
    console.log('   node scripts/generateJWTSecret.js');
  }
  
} catch (error) {
  console.error('❌ Erreur lors de la lecture du fichier .env:', error.message);
  console.log('\n💡 Vérifiez que le fichier .env existe à la racine du projet Portfolio/');
}

