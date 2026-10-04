import React, { useEffect, useRef } from 'react';
import './About.css'; // Import the CSS file for styling
import ContactInformation from './ContactInformation';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location pin icon
import Softwares from './Softwares';
import { Circles } from './mini/Circles';

function About() {
  const detailsRef = useRef(null);

  useEffect(() => {
    const detailItems = detailsRef.current.querySelectorAll('.skills-section');

    // Intersection Observer for slide-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    detailItems.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  return (
    <div className="about-section context">
      <h1 style={{ marginTop: '0px' }}>About</h1>
<Circles/>
      <div className="about-container menu-section" id="about">
        <div className="profile-container">
          <img
            src="Images\profilepic\Marianne.jpg" // Replace with actual profile picture URL
            alt="Your Name"
            className="profile-picture"
          />
          <h2>Marianne Riss blaesbjerg</h2>
          <p className="role">Groom Artist & Environment Artist</p>
          <div className="location">
            <FaMapMarkerAlt className="location-icon" />
            <span>Copenhagen, Denmark</span>
          </div>
        </div>
        

        <div ref={detailsRef} className="details-container">
                    <div className="skills-section">
            <h3 className="box-title">Courses</h3>
            <p>Nordic Game Jam 2025 - participant - The Great Dreamer</p>

            <p>The Drawing Academy 2015 - Classical Drawing</p>

          </div>
          <div className="skills-section">
            <h3 className="box-title">Personal Skills</h3>
<ul>
  <li><strong>Creative</strong> – I approach tasks with a more complex mindset, working across contexts and creating synergy between different elements.</li>
  <li><strong>Responsible</strong> – I'm not afraid to take the lead to make things happen, and I'm motivated by progress and forward momentum in a process.</li>
  <li><strong>Reliable</strong> – I can be trusted with important tasks that require consistency and follow-through to create real value.</li>
  <li><strong>Detail-Oriented</strong> – I take pride in ensuring that even the smallest details — the ones others might overlook — are done just right.</li>
</ul>
          </div>

          <div className="skills-section">
            <h3 className="box-title">Resume</h3>
                      <p>
                        I'm a 3D Generalist based in Copenhagen with a background in animation, visualization, grooming, and game-related production.
                      </p>
                      <p>
                        Most recently, I spent a year at MOOD Publishing working on projects including HITMAN: The Board Game, Deep Rock Galactic figurines, and Satisfactory: The Board Game. My work covered 3D visualization, trailers and campaign scrollers, as well as playtesting, 3D printing, prototyping, table presence, and exploring board game mechanics.
                      </p>
                      <p>
                        Before moving into board games, I worked in animation and feature film production, including as Lead Groom on "Mugge og hans mærkelige hjerne" and as a Groom Artist on productions such as "Mermaze," "Rainbow High," and "L.O.L." This gave me experience working across production pipelines, collaborating with different departments, and balancing creative and technical problem-solving.
                      </p>
                      <p>
                        I enjoy working across different parts of the 3D process and especially like projects where I can combine visual storytelling, world-building, animation, prototyping, and hands-on problem solving.
                      </p>
                      <p>
                        My main tools include Maya, Blender, ZBrush, Substance Painter, Unreal Engine 5, Unity, Yeti, Houdini, After Effects.
                      </p>
                      <p>
                        I hold a Bachelor's degree in Computer Graphic Arts from The Animation Workshop and also studied classical drawing at The Drawing Academy.
                      </p>
          </div>
        </div>
      </div>

<Softwares/>
      <ContactInformation />
    </div>
  );
}

export default About;
