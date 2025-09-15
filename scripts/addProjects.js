const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addProjects() {
  try {
    console.log('🚀 Ajout de projets...');
    
    // Projets à ajouter
    const projects = [
      {
        name: 'Portfolio Web',
        description: 'Application de portfolio moderne avec Next.js, React et TypeScript',
        technologies: 'Next.js, React, TypeScript, Material-UI',
        status: 'Terminé',
        url: 'https://github.com/votre-username/portfolio',
        imageUrl: '/imgs/readme/accueil.png'
      },
      {
        name: 'E-commerce React',
        description: 'Site de vente en ligne avec panier et paiement',
        technologies: 'React, Node.js, MongoDB, Stripe',
        status: 'En cours',
        url: 'https://github.com/votre-username/ecommerce',
        imageUrl: '/imgs/readme/projets.png'
      },
      {
        name: 'Application Mobile',
        description: 'App mobile de gestion de tâches avec notifications',
        technologies: 'React Native, Firebase, Redux',
        status: 'Terminé',
        url: 'https://github.com/votre-username/mobile-app',
        imageUrl: '/imgs/readme/admin_page.png'
      },
      {
        name: 'API REST',
        description: 'API RESTful pour gestion d\'utilisateurs et authentification',
        technologies: 'Node.js, Express, JWT, PostgreSQL',
        status: 'Terminé',
        url: 'https://github.com/votre-username/api-rest',
        imageUrl: '/imgs/readme/admin_connect.png'
      }
    ];

    // Ajouter chaque projet
    for (const project of projects) {
      const newProject = await prisma.project.create({
        data: project
      });
      console.log(`✅ Projet ajouté: ${newProject.name}`);
    }

    console.log('🎉 Tous les projets ont été ajoutés avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProjects();
