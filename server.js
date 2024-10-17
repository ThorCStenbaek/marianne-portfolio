const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Node.js server!' });
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      title: 'Project 1',
      content: 'This is the first project, describing some cool work that was done.',
      categories: ['Category1', 'Art'],
      tags: ['Tag1', 'Tag2'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    },
    {
      title: 'Project 2',
      content: 'This is the second project, involving a complex system design.',
      categories: ['Category2', 'Development'],
      tags: ['JavaScript', 'React'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    },
    {
      title: 'Project 3',
      content: 'This project focuses on user experience design and accessibility improvements.',
      categories: ['UX Design', 'Accessibility'],
      tags: ['UI/UX', 'Design'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    },
    {
      title: 'Project 4',
      content: 'A creative project exploring 3D modeling and animation techniques.',
      categories: ['3D Art', 'Animation'],
      tags: ['Blender', 'Maya'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    },
    {
      title: 'Project 5',
      content: 'This project involves the creation of a full-stack web application.',
      categories: ['Full Stack', 'Web Development'],
      tags: ['Node.js', 'React', 'Express'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    },
    {
      title: 'Project 6',
      content: 'A game development project using Unreal Engine and focusing on AI mechanics.',
      categories: ['Game Development', 'AI'],
      tags: ['Unreal Engine', 'AI'],
      featured_image_url: 'https://thorstenbaek.com/wp-content/uploads/2023/03/Thelwells-Pony.webp',
    }
  ]);
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




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
