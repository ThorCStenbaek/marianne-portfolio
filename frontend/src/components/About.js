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
                        I'm a 3D artist with a background in animation and visual storytelling, currently focused on stylised environments, characters, and game-ready assets. My work blends artistic expression with structure — whether I'm sculpting, grooming, texturing, or building worlds with a strong narrative tone.
                      </p>
                      <p>
                        I enjoy working across disciplines and bringing attention to detail, atmosphere, and flow in everything I create. Recently, I've been diving into foliage creation and environment building, drawing on my experience with character grooming to shape organic, believable assets that feel both stylised and grounded.
                      </p>
                      <p>
                        I'm curious, collaborative, and motivated by meaningful visual design, whether it's for games, animation, or something in between.
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
