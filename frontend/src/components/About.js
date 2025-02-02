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
          <p className="role">Groom Artist & 3D Generalist</p>
          <div className="location">
            <FaMapMarkerAlt className="location-icon" />
            <span>Copenhagen, Denmark</span>
          </div>
        </div>

        <div ref={detailsRef} className="details-container">
          <div className="skills-section">
            <h3 className="box-title">Personal Skills</h3>
            <ul>
              <li>Team Player</li>
              <li>Proactive</li>
              <li>Creative Problem Solver</li>
              <li>Detail Oriented</li>
              <li>Adaptable</li>
            </ul>
          </div>

          <div className="skills-section">
            <h3 className="box-title">Resume</h3>
            <p>
          
            As a 3D Generalist and Groom Artist based in Copenhagen, Denmark, I have extensive experience leading grooming projects for feature films and animated series. Notably, I served as Lead Groom on "Mugge og hans mærkelige hjerne" and contributed to the "Mermaze" series, "Rainbow High," and "L.O.L." My professional journey includes roles at Pixel Zoo Animation and A. Film Studios, where I honed my skills across the entire CG pipeline. I am proficient in various software, including Maya, ZBrush, Mari, Substance Painter, Yeti, After Effects, Marvelous Designer, Premiere Pro, Photoshop, Houdini, and Nuke. I hold a Bachelor's degree in Computer Graphic Arts from The Animation Workshop and have a background in classical drawing from The Drawing Academy. Beyond my professional pursuits, I am a Kung-Fu enthusiast and a food lover with a passion for movies and games. My diverse experiences have shaped me into a proactive, responsible, and solution-oriented team player who remains calm under pressure.
          
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
