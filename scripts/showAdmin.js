const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function showAdminInfo() {
  try {
    console.log('🔍 Recherche de l\'utilisateur admin...\n');
    
    // Récupérer tous les admins
    const admins = await prisma.user.findMany({
      where: { role: 'admin' }
    });

    if (admins.length === 0) {
      console.log('❌ Aucun utilisateur admin trouvé dans la base de données.');
      console.log('\n💡 Pour créer un admin, exécutez:');
      console.log('   node scripts/createAdminVercel.js');
      console.log('\n📝 Ou définissez dans votre fichier .env:');
      console.log('   ADMIN_EMAIL="votre-email@example.com"');
      console.log('   ADMIN_PASSWORD="votre-mot-de-passe"');
      return;
    }

    console.log(`✅ ${admins.length} utilisateur(s) admin trouvé(s):\n`);
    
    admins.forEach((admin, index) => {
      console.log(`--- Admin ${index + 1} ---`);
      console.log(`📧 Email: ${admin.email}`);
      console.log(`👤 Nom: ${admin.name}`);
      console.log(`🆔 ID: ${admin.id}`);
      console.log(`📅 Créé le: ${admin.createdAt}`);
      console.log(`🔒 Mot de passe: [HASHÉ - non récupérable]`);
      console.log('');
    });

    console.log('💡 Le mot de passe est hashé dans la base de données.');
    console.log('   Si vous avez oublié votre mot de passe:');
    console.log('   1. Vérifiez votre fichier .env pour ADMIN_PASSWORD');
    console.log('   2. Ou le mot de passe par défaut est: admin123');
    console.log('   3. Ou créez un nouvel admin avec le script createAdminVercel.js');
    
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

showAdminInfo();

