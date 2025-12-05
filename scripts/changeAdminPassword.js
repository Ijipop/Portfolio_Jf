// Script pour changer le mot de passe d'un admin
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function changeAdminPassword() {
  try {
    // Email et nouveau mot de passe depuis les arguments
    const email = process.argv[2];
    const newPassword = process.argv[3];
    
    if (!email || !newPassword) {
      console.log('❌ Usage: node scripts/changeAdminPassword.js <email> <nouveau-mot-de-passe>');
      console.log('\n💡 Exemple:');
      console.log('   node scripts/changeAdminPassword.js jfthebeanz@hotmail.com MonNouveauMotDePasse123');
      process.exit(1);
    }
    
    console.log('🔍 Recherche de l\'utilisateur...\n');
    
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    
    if (!user) {
      console.log(`❌ Utilisateur avec l'email ${email} non trouvé.`);
      console.log('\n💡 Utilisez: node scripts/showAdmin.js pour voir les admins existants');
      process.exit(1);
    }
    
    if (user.role !== 'admin') {
      console.log(`⚠️  L'utilisateur ${email} n'est pas un admin.`);
      console.log('💡 Mise à jour du rôle en admin...\n');
    }
    
    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        role: 'admin' // S'assurer qu'il est admin
      }
    });
    
    console.log('✅ Mot de passe changé avec succès!\n');
    console.log('📧 Email:', user.email);
    console.log('🔑 Nouveau mot de passe:', newPassword);
    console.log('🆔 ID:', user.id);
    console.log('\n💡 Vous pouvez maintenant vous connecter avec le nouveau mot de passe.');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que:');
    console.log('   1. Votre fichier .env contient DATABASE_URL');
    console.log('   2. La base de données est accessible');
    console.log('   3. Vous avez exécuté: npx prisma generate');
  } finally {
    await prisma.$disconnect();
  }
}

changeAdminPassword();

