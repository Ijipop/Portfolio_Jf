// Script pour générer une clé JWT secrète
const crypto = require('crypto');

// Générer une clé aléatoire de 64 caractères
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('🔑 Clé JWT générée:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(jwtSecret);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n📝 Ajoutez cette ligne dans votre fichier .env:');
console.log(`JWT_SECRET="${jwtSecret}"`);
console.log('\n💡 Le fichier .env doit être à la racine du projet Portfolio/');
console.log('⚠️  Ne partagez JAMAIS cette clé publiquement!');

