const express = require('express');
const app = express();
const port = 5000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');


// Middleware to parse JSON
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'Images')));


// Serve React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));


const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'Images/projects'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('File uploaded!');
});


// Serve static files from the "public" directory

app.get('/technologies', async (req, res) => {
  try {
    const technologies = await prisma.technology.findMany();
    res.json(technologies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching technologies.' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

/*
app.get('/reset-database', async (req, res) => {
  try {
    console.log("Resetting database...");

    // **Step 1:** Delete all related entries first due to foreign key constraints
    await prisma.projectMeta.deleteMany();
    await prisma.projectCategory.deleteMany();
    await prisma.projectTechnology.deleteMany();

    // **Step 2:** Delete projects (since dependent relations are removed)
    await prisma.project.deleteMany();

    // **Step 3:** Delete all categories (but keep technologies as requested)
    await prisma.category.deleteMany();

    // **Step 4:** Reinitialize default categories
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Grooming' },
        { name: 'Generalist' },
        { name: 'Environments' },
        { name: 'Personal' },
      ],
    });

    console.log("Database reset complete.");
    res.json({ message: 'Database reset successfully', categoriesInserted: categories.count });
  } catch (error) {
    console.error("Error resetting database:", error);
    res.status(500).json({ error: 'An error occurred while resetting the database.' });
  }
});

*/


// Handle project creation with file 
/*
app.post('/projects', upload.fields([
  { name: 'primaryImage', maxCount: 1 }, 
  { name: 'projectMeta', maxCount: 10 }  // Adjust maxCount as needed
]), async (req, res) => {
  console.log(req.files);  // Log what Multer is receiving
  console.log(req.body);   // Log form fields
  */
 
app.post('/projects', upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'projectMeta', maxCount: 10 }
]), async (req, res) => {
  console.log(req.files);  // Log to see what files are being sent
  console.log(req.body);   // Log to see other form fields

  try {
    // Parse categoryNames and technologyNames as arrays if they are not already arrays
    let { title, description, link, categoryNames, technologyNames } = req.body;

    // Ensure categoryNames and technologyNames are arrays
    categoryNames = Array.isArray(categoryNames) ? categoryNames : [categoryNames];
    technologyNames = Array.isArray(technologyNames) ? technologyNames : [technologyNames];

    // Handle primary image
    const primaryImageFile = req.files['primaryImage'] ? req.files['primaryImage'][0].filename : null;

    // Handle projectMeta files
    const projectMetaFiles = req.files['projectMeta'] || [];

    // 1. Find or create categories
    const categories = await Promise.all(
      categoryNames.map(async (name) => {
        return prisma.category.upsert({
          where: { name },
          update: {}, // No updates needed if category exists
          create: { name },
        });
      })
    );

    // 2. Find or create technologies
    const technologies = await Promise.all(
      technologyNames.map(async (name) => {
        return prisma.technology.upsert({
          where: { name },
          update: {}, // No updates needed if technology exists
          create: { name },
        });
      })
    );

    // 3. Create project meta with uploaded files
    const projectMeta = projectMetaFiles.map((file, index) => {
      const type = req.body[`projectMeta[${index}][type]`];  // Correctly access the type
      return {
        type: "IMAGE",
        url: `/Images/projects/${file.filename}`,  // Correctly form the URL
      };
    });

    // 4. Create the project and link categories, technologies, and projectMeta
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        primaryImage: primaryImageFile ? `/Images/projects/${primaryImageFile}` : null,  // Use backticks
        link,
        categories: {
          create: categories.map((category) => ({
            category: { connect: { id: category.id } },
          })),
        },
        technologies: {
          create: technologies.map((technology) => ({
            technology: { connect: { id: technology.id } },
          })),
        },
        metas: {
          create: projectMeta,
        },
      },
    });

    // Return the newly created project
    res.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'An error occurred while creating the project.' });
  }
});



app.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        categories: {
          include: {
            category: true, // Include category details
          },
        },
        technologies: {
          include: {
            technology: true, // Include technology details
          },
        },
        metas: true, // Include project meta (images, videos, etc.)
      },
    });
    
    // Transform the result to get a cleaner response if necessary
    const transformedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      primaryImage: project.primaryImage,
      link: project.link,
      createdAt: project.createdAt,
      categories: project.categories.map((cat) => cat.category.name), // Get category names
      technologies: project.technologies.map(tech=>tech.technology), // Get technology names
      metas: project.metas.map((meta) => ({
        type: meta.type,
        url: meta.url,
      })), // Get meta details (type and url)
    }));

    res.json(transformedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching projects.' });
  }
});




// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Node.js server!' });
});


app.get('/api/education', (req, res) => {
  const educationData = [
    {
      name: 'High School',
      date: '2006 - 2010',
      description: 'Graduated with honors, focusing on sciences and mathematics.',
      extraInfo:""
    },
    {
      name: 'Bachelor of Computer Science',
      date: '2010 - 2014',
      description: 'Completed a bachelor\'s degree in Computer Science with a focus on software engineering.',
      extraInfo: ""
    },
    {
      name: 'Master of Computer Science',
      date: '2014 - 2016',
      description: 'Specialized in artificial intelligence and machine learning.',
      extraInfo: ""
    }
  ];

  res.json(educationData);
});


app.get('/api/work', (req, res) => {
  const workTimeline = [
    {
      job: 'Software Developer',
      date: '2018 - 2020',
      description: 'Worked on developing web applications using React and Node.js.',
      extraInfo: 'Key Projects: Project A, Project B',
    },
    {
      job: 'Lead Developer',
      date: '2020 - 2022',
      description: 'Led a team of developers for large-scale projects.',
      extraInfo: 'Technologies: React, Node.js, AWS',
    },
    {
      job: 'Senior Engineer',
      date: '2022 - Present',
      description: 'Specialized in cloud-based solutions and mentoring junior developers.',
      extraInfo: 'Key Achievements: Optimized CI/CD pipelines, Reduced cloud costs by 20%',
    },
  ];

  res.json(workTimeline);
});

app.post("/isMarianne",(req, res) =>{

  const answer=req.body.password=="Toiletpapir1"

  res.json({answer})
})



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
