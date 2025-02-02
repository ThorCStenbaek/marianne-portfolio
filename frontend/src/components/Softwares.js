import React, { useEffect, useState } from 'react';
import './Softwares.css';
import { Software } from './mini/Software';
function Softwares() {
  const [technologies, setTechnologies] = useState([]);

  // Fetch technologies from the backend when the component mounts
  useEffect(() => {
    fetch('/technologies') // Update the URL as needed
      .then(response => response.json())
      .then(data => {
        setTechnologies(data); // Set fetched data to state
      })
      .catch(error => {
        console.error('Error fetching technologies:', error);
      });
  }, []);

  return (
    <div className="softwares-section">
      {technologies.map((tech, index) => (
<Software key={index} tech={tech}/>
      ))}
    </div>
  );
}

export default Softwares;
