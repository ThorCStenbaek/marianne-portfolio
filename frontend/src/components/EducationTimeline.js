import React, { useEffect, useState } from 'react';


function EducationTimeline() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    // Fetch the education data from the backend API
    fetch('/api/education')
      .then(response => response.json())
      .then((data) => {console.log("edu", education); setEducation(data)})
      .catch(error => console.error('Error fetching education data:', error));
  }, []);

  return (
    <div className="edu-container">
      <h2>Education</h2>
      <div className="timeline-edu-container">
        <div className="timeline-edu">
          {education.length > 0 ? (
            education.map((item, index) => (
              <div 
                key={index} 
                className={`container-timeline edu ${index % 2 === 0 ? 'left' : 'left'}`} /* Alternate left and right */
              >
                <div className="content-timeline">
                  <p className="timeline-job">{item.name}</p>
                  <p className="timeline-date">{item.years}</p>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No education data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationTimeline;
