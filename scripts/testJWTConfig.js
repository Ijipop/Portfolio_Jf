// Script pour tester la configuration JWT
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const jwt = require('jsonwebtoken');

console.log('🔍 Test de la configuration JWT...\n');

// Vérifier JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.log('❌ JWT_SECRET non trouvé dans les variables d\'environnement');
  console.log('💡 Assurez-vous que:');
  console.log('   1. Le fichier .env existe à la racine du projet Portfolio/');
  console.log('   2. JWT_SECRET est défini dans .env');
  console.log('   3. Vous avez redémarré le serveur après l\'ajout de JWT_SECRET');
  console.log('\n💡 Utilisez: node scripts/addJWTSecretToEnv.js pour ajouter JWT_SECRET');
  process.exit(1);
}

console.log('✅ JWT_SECRET trouvé');
console.log('📏 Longueur:', process.env.JWT_SECRET.length, 'caractères');
console.log('🔑 Premiers caractères:', process.env.JWT_SECRET.substring(0, 20) + '...\n');

// Tester la génération d'un token
try {
  const testPayload = {
    userId: 1,
    email: 'test@example.com',
    role: 'admin'
  };
  
  const token = jwt.sign(testPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log('✅ Génération de token réussie');
  console.log('📝 Token généré:', token.substring(0, 30) + '...\n');
  
  // Tester la vérification du token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Vérification de token réussie');
  console.log('📋 Payload décodé:', JSON.stringify(decoded, null, 2));
  
  console.log('\n✅ Configuration JWT valide!');
  console.log('💡 Si vous avez toujours des erreurs 401:');
  console.log('   1. Redémarrez votre serveur Next.js (Ctrl+C puis npm run dev)');
  console.log('   2. Déconnectez-vous et reconnectez-vous via le menu Admin');
  console.log('   3. Vérifiez que votre token dans localStorage n\'est pas expiré');
  
} catch (error) {
  console.error('❌ Erreur lors du test:', error.message);
  process.exit(1);
}

