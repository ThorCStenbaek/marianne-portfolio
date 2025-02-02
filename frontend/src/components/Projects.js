import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Projects.css'; // Import or create CSS for styling
import { Software } from './mini/Software';

import { Circles } from './mini/Circles';
Modal.setAppElement('#root'); // Set the root element for accessibility

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] =useState("all")
  const [selectedIndex, setSelectedIndex] = useState(1)
 /*
  useEffect(() => {
    // Fetch the projects data from your API
   
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);
  */

  useEffect(() => {
    // Fetch the projects data from your API
    fetch('/projects')
      .then(response => response.json())
      .then(data => {setProjects(data);console.log("new projects:", data)})
 
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(()=>{
    console.log("hello outside", projects.length, selectedIndex)
    if (projects && projects.length> selectedIndex-1){
      console.log("hello")
    setSelectedProject(projects[selectedIndex])
  }
  }, [selectedIndex])

  const openModal = (project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="projects-section menu-section" id="projects">
      <div className="projects-header">
        <div className="projects-menu-button" onClick={()=>setSelectedTag("personal")}><p>PERSONAL</p></div>
        <div className="projects-menu-button"onClick={()=>setSelectedTag("enviroments")}><p>ENVIROMENTS</p></div>
        <div className="projects-menu-button"onClick={()=>setSelectedTag("all")}><p>ALL</p></div>
        <div className="projects-menu-button"onClick={()=>setSelectedTag("generalist")}><p>GENERALIST</p></div>
        <div className="projects-menu-button"onClick={()=>setSelectedTag("grooming")}><p>GROOMING</p></div>
      </div>

      <div className="allProjects">
        {projects.length > 0 ? (

          projects.map((project, index) =>
            {
              if (selectedTag!="all"){
                let found=false
            project.categories.forEach(element => {
              
              if (element.toLowerCase()==selectedTag)
                found=true
            });
            if (!found) return null
          }


           return (

            <div 
              key={index} 
              className={`post ${project.categories.join(' ')}`} 
              onClick={() => openModal(project, index)} 
              style={{ cursor: 'pointer' }}
            >
              <img className="post-img" src={project.primaryImage} alt={project.title} />
              <div className="cover">
                <h2>{project.title}</h2>
                <div className="categories">
                  {project.categories.join(', ')}
                </div>
                <div style={{marginTop: "15px", width: "80%"}} className="categories">
                  {project.technologies.map(tech=>tech.name).join(', ')}
                </div>
              </div>
            </div>
          )})
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      {/* Modal to show project details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Project Details"
        className="project-modal"
        overlayClassName="project-modal-overlay"
      >
      {selectedProject && (
        <div className="modal-content" style={{ overflowY: 'scroll', height: '80vh', width: '75vw' }}>
          <a className='arrow' onClick={()=>setSelectedIndex(prev=>prev== projects.length-1 ? 0: prev+1)} style={{position: 'absolute', right: -100,  top: "35vh"}}>
          <svg viewBox="0 0 12 13" width="100" height="100" fill="currentColor"  ><g fill-rule="evenodd" transform="translate(-450 -1073)"><path fill-rule="nonzero" d="M454.095 1083.47a.75.75 0 1 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 0 0-1.06 1.06l3.97 3.97-3.97 3.97z"></path></g></svg>


          </a>

          <a className='arrow' onClick={()=>setSelectedIndex(prev=> prev== 0 ? projects.length-1: prev-1)} style={{position: 'absolute', left: -100, top: "35vh"}}>
          <svg viewBox="0 0 12 13" width="100" height="100" fill="currentColor" ><g fill-rule="evenodd" transform="translate(-450 -1073)"><path fill-rule="nonzero" d="M457.905 1075.53a.75.75 0 0 0-1.06-1.06l-4.5 4.5a.75.75 0 0 0 0 1.06l4.5 4.5a.75.75 0 0 0 1.06-1.06l-3.97-3.97 3.97-3.97z"></path></g></svg>
          </a>
          {/* Display primary image as main focus */}
         {false && <button onClick={closeModal} className="close-modal-button">Close</button>}
          <div style={{textAlign: 'center'}}>
          <img className="modal-img" src={selectedProject.primaryImage} alt={selectedProject.title} />
          </div>
          {/* Display project title */}
          <h1 style={{marginTop:"0px"}}>{selectedProject.title}</h1>
          <div style={{display: "flex", justifyContent: 'center'}}>
              {selectedProject.technologies.map((tech) => (
                <div style={{marginBottom: '5px', margin: "10px"}}>
                <Software key={tech.id} tech={tech} size={0.6} />
                </div>
              ))}
            </div>

          {/* Display categories */}
          <div>
          <p><strong>Categories:</strong> {selectedProject.categories.join(', ')}</p>

          {/* Display technologies with Software component */}
          <p> {selectedProject.description}</p>
          </div>
          <div>
          

            </div>
         

          {/* Display project description */}
     

          {/* Display metas if available */}
          {selectedProject.metas.length > 0 && (
            <div>
              
              <div  style={{textAlign: 'center'}}className="metas-list">
                {selectedProject.metas.map((meta, index) => (
                  !meta.url.endsWith("mp4") ? (
                    <img key={index} src={meta.url} alt={`Media ${index + 1}`} className="meta-image" />
                  ) :      <video key={index} src={meta.url} autoPlay loop muted style={{heigh: 'auto', width: "100%"}}></video>
                ))}
              </div>
            </div>
          )}

          {/* Close button */}
       
        </div>
      )}
    </Modal>

    </div>
  );
}

export default Projects;








