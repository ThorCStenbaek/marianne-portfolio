import React, { useEffect, useState } from 'react';


function Menu({active=null}) {
  const [activeSection, setActiveSection] = useState(active);

  const handleScroll = () => {
      
    const sections = document.querySelectorAll('.menu-section');
    const menuElements = document.querySelectorAll('.side-nav-element');
    let currentSection = null;
    let sectionIndex = null;

    sections.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;
      console.log("SECTION TOP:", sectionTop, section)
      if (sectionTop < 60) {
        currentSection = section;
        sectionIndex = index;
      }
    });

    menuElements.forEach((menuElement, index) => {
      if (index === sectionIndex) {
        menuElement.classList.add('current');
      } else {
        menuElement.classList.remove('current');
      }
    });
  }; 

  useEffect(() => {
  


    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  
  


  }, [activeSection]); 

  return (
    <div className="side-holder" >
    <div className="side-menu">
      <div className="side-menu-innerdiv">
        <img className="menu-profile-picture"             src="Images\profilepic\Marianne.jpg" // Replace with actual profile picture URL
            alt="Your Name"
             />
             <div style= {{textAlign: 'center', color: 'white'}}>
             <h3 style={{margin:"5px"}}>Marianne Blæsbjerg</h3>
             <h6 style={{margin:"5px"}}> Groom Artist & 3D Generalist</h6>
             </div>
        <nav className="sidebar-nav">
          <a className="side-nav-element current" onClick={()=>{document.querySelector("#home").scrollIntoView(); handleScroll()}}>Home</a>
          <a className="side-nav-element" onClick={()=>{document.querySelector("#projects").scrollIntoView(); handleScroll()} }>Projects</a>
          <a className="side-nav-element" onClick={()=>{document.querySelector("#experience").scrollIntoView(); handleScroll()}}>Experience</a>
          <a className="side-nav-element" onClick={()=>{document.querySelector("#about").scrollIntoView(); handleScroll()}}>About</a>
          <a className="side-nav-element" onClick={()=>{document.querySelector("#contact").scrollIntoView(); handleScroll()}}>Contact</a>
        </nav>
      </div>
    </div>
    </div>
  );
}

export default Menu;
