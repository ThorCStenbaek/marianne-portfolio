import React from 'react';
import './ContactInformation.css'; // Import the CSS file for styling
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaTwitter, FaInstagram, FaArtstation } from 'react-icons/fa'; // Import icons from react-icons

function ContactInformation() {
  return (
    <div className="contact-information-section menu-section" id="contact">
        <div style={{zIndex:5, position: 'relative'}}>
      <h1 style={{marginTop: 0}}>Contact Information</h1>
      <div className="contact-container">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <div className="contact-details">
            <h3>Email</h3>
            <p><a href="mailto:your.email@example.com">m.blaesbjerg@hotmail.com</a></p>
          </div>
        </div>
        
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <div className="contact-details">
            <h3>Phone</h3>
            <p><a href="tel:+1234567890">+45 60228695</a></p>
          </div>
        </div>

        <div className="contact-item">
          <FaLinkedin className="contact-icon" />
          <div className="contact-details">
            <h3>LinkedIn</h3>
            <p><a href="https://www.linkedin.com/in/marianne-riis-bl%C3%A6sbjerg-2282656a/" target="_blank" rel="noopener noreferrer">linkedin.com/in/marianne-riis-blæsbjerg-2282656a/</a></p>
          </div>
        </div>

        <div className="contact-item">
          <FaInstagram className="contact-icon" />
          <div className="contact-details">
            <h3>Instagram</h3>
            <p><a href="https://www.instagram.com/marianne_artblaes/" target="_blank" rel="noopener noreferrer">@marianne_artblaes</a></p>
          </div>
        </div>

        <div className="contact-item">
          <FaArtstation className="contact-icon" />
          <div className="contact-details">
            <h3>ArtStation</h3>
            <p><a href="https://blaesbjerg.artstation.com/" target="_blank" rel="noopener noreferrer">@blaesbjerg</a></p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ContactInformation;
