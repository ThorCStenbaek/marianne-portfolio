const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const category1 = await prisma.category.create({
    data: { name: '3D Art' },
  });

  const category2 = await prisma.category.create({
    data: { name: '2D Art' },
  });

  const category3 = await prisma.category.create({
    data: { name: 'Professional' },
  });

  const category4 = await prisma.category.create({
    data: { name: 'Personal' },
  });

  // Create technologies with specified image paths
  const technologies = [
    { name: 'MAYA & xgen', image: 'Images/Softwares/maya.webp' },
    { name: 'Z-BRUSH', image: 'Images/Softwares/zBrush3.webp' },
    { name: 'MARI', image: 'Images/Softwares/Mari.webp' },
    { name: 'SUBSTANCE PAINTER', image: 'Images/Softwares/Substance_Painter_Icon.webp' },
    { name: 'YETI', image: 'Images/Softwares/yetilogo.webp' },
    { name: 'AFTER EFFECTS', image: 'Images/Softwares/aftereffects.webp' },
    { name: 'MARVELOUS', image: 'Images/Softwares/marvelousdesigner.webp' },
    { name: 'PREMIERE PRO', image: 'Images/Softwares/premierepro.webp' },
    { name: 'PHOTOSHOP', image: 'Images/Softwares/Photoshop.webp' },
    { name: 'HOUDINI', image: 'Images/Softwares/Houdini-Logo.webp' },
    { name: 'NUKE', image: 'Images/Softwares/Nuke.webp' }
  ];

  // Seed the technologies
  for (const tech of technologies) {
    await prisma.technology.create({ data: tech });
  }

  // Example: Create a project and associate it with a category and technology
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
