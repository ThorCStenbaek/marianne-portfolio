import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import './Projects.css'; // Import or create CSS for styling
import { Software } from './mini/Software';
import { hideSideHolder } from '../scripts/menuController';
import { Circles } from './mini/Circles';
Modal.setAppElement('#root'); // Set the root element for accessibility

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] =useState("all")
  const [selectedIndex, setSelectedIndex] = useState(1)

  const [fullscreenImage, setFullscreenImage] = useState(null);
  const toggleFullscreen = (imageUrl) => {
    setFullscreenImage(fullscreenImage === imageUrl ? null : imageUrl);
  };



 /*
  useEffect(() => {
    // Fetch the projects data from your API
   
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);
  */

// Inside your component...
const [touchStart, setTouchStart] = useState(null);
const [touchEnd, setTouchEnd] = useState(null);
const modalContentRef = useRef(null);

// The minimum distance required to trigger a swipe
const minSwipeDistance = 50;

const onTouchStart = (e) => {
  setTouchEnd(null); // Reset touch end
  setTouchStart(e.targetTouches[0].clientX);
};

const onTouchMove = (e) => {
  setTouchEnd(e.targetTouches[0].clientX);
  
  // Prevent scrolling when swiping horizontally
  if (touchStart && touchEnd) {
    const difference = touchStart - touchEnd;
    if (Math.abs(difference) > minSwipeDistance / 2) {
      e.preventDefault();
    }
  }
};

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  
  if (isLeftSwipe) {
    setSelectedIndex(prev => prev === projects.length - 1 ? 0 : prev + 1);
  } else if (isRightSwipe) {
    setSelectedIndex(prev => prev === 0 ? projects.length - 1 : prev - 1);
  }
  
  // Reset touch positions
  setTouchStart(null);
  setTouchEnd(null);
};



  useEffect(() => {
    // Fetch the projects data from your API
    fetch('/projects')
      .then(response => response.json())
      .then(data => { 
        //remove first from data
        const first=[data[data.length-1], data[data.length-2]]
        const tiger= data.shift()
        data=data.slice(0, data.length-2)

        
        setProjects(first.concat(tiger).concat(data) );console.log("new projects:", first.concat(tiger).concat(data))})
 
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
    hideSideHolder()
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="projects-section menu-section" id="projects">
      <div className="projects-header">
      <div className="projects-menu-button"onClick={()=>setSelectedTag("all")}><p>ALL</p></div>
           
      
      <div className="projects-menu-button"onClick={()=>setSelectedTag("grooming")}><p>GROOMING</p></div>
      <div className="projects-menu-button"onClick={()=>setSelectedTag("environments")}><p>ENVIRONMENTS</p></div>

        <div className="projects-menu-button" onClick={()=>setSelectedTag("personal")}><p>PERSONAL</p></div>

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
  <div 
    className="modal-content" 
    style={{ overflowY: 'scroll', height: '80vh', width: '75vw' }}
    ref={modalContentRef}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
  >
    {/* Fullscreen overlay */}
    {fullscreenImage && (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          cursor: 'pointer'
        }}
        onClick={() => setFullscreenImage(null)}
      >
        <img 
        onClick={() => setFullscreenImage(null)}
          src={fullscreenImage} 
          style={{
            maxHeight: '90vh',
            maxWidth: '90vw',
            objectFit: 'contain'
          }}
          alt="Fullscreen" 
        />
      </div>
    )}

    {/* Navigation arrows */}
    <a className='arrow' onClick={()=>setSelectedIndex(prev=>prev== projects.length-1 ? 0: prev+1)} style={{position: 'absolute', right: -100,  top: "35vh"}}>
      <svg viewBox="0 0 12 13" width="100" height="100" fill="currentColor"><g fill-rule="evenodd" transform="translate(-450 -1073)"><path fill-rule="nonzero" d="M454.095 1083.47a.75.75 0 1 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 0 0-1.06 1.06l3.97 3.97-3.97 3.97z"></path></g></svg>
    </a>

    <a className='arrow' onClick={()=>setSelectedIndex(prev=> prev== 0 ? projects.length-1: prev-1)} style={{position: 'absolute', left: -100, top: "35vh"}}>
      <svg viewBox="0 0 12 13" width="100" height="100" fill="currentColor"><g fill-rule="evenodd" transform="translate(-450 -1073)"><path fill-rule="nonzero" d="M457.905 1075.53a.75.75 0 0 0-1.06-1.06l-4.5 4.5a.75.75 0 0 0 0 1.06l4.5 4.5a.75.75 0 0 0 1.06-1.06l-3.97-3.97 3.97-3.97z"></path></g></svg>
    </a>

    {/* Primary image with click handler */}
    <div style={{textAlign: 'center'}}>
      <img 
        className="modal-img" 
        src={selectedProject.primaryImage} 
        alt={selectedProject.title} 
        onClick={() => toggleFullscreen(selectedProject.primaryImage)}
        style={{ cursor: 'pointer' }}
      />
    </div>

    {/* Project info */}
    <h1 style={{marginTop:"0px"}}>{selectedProject.title}</h1>
    <div style={{display: "flex", justifyContent: 'center', flexWrap: "wrap"}}>
      {selectedProject.technologies.map((tech) => (
        <div style={{marginBottom: '5px', margin: "10px"}}>
          <Software key={tech.id} tech={tech} size={0.6} />
        </div>
      ))}
    </div>

    <div>
      <p><strong>Categories:</strong> {selectedProject.categories.join(', ')}</p>
      <p>{selectedProject.description}</p>
    </div>

    {/* Meta images with click handlers */}
    {selectedProject.metas.length > 0 && (
      <div>
        <div style={{textAlign: 'center'}} className="metas-list">
          {selectedProject.metas.map((meta, index) => (
            !meta.url.endsWith("mp4") && !meta.url.endsWith(".mov") ? (
              <img 
                key={index} 
                src={meta.url} 
                alt={`Media ${index + 1}`} 
                className="meta-image" 
                onClick={() => toggleFullscreen(meta.url)}
                style={{ cursor: 'pointer', maxWidth: '100%' }}
              />
            ) : (
              <video 
                key={index} 
                src={meta.url} 
                autoPlay 
                loop 
                muted 
                style={{height: 'auto', width: "100%"}}
              ></video>
            )
          ))}
        </div>
      </div>
    )}
  </div>
)}
    </Modal>

    </div>
  );
}

export default Projects;








