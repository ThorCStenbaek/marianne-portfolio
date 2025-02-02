import React, { useEffect, useState, useRef } from 'react';
import './WorkTimeline.css'; // Import the CSS file for styling
import Timeline from './Timeline';
/*
const workTimelineData = [
  {
    job: "3D Generalist at Hydralab",
    date: "August 2024 - October 2024",
    description: "Bedache Commercial for Posturpedic, lookdev, modelling, grooming, texturing for little red furball character for American Client.",
    extraInfo: "",
  },
  {
    job: "Groom Artist at Pixel Zoo Animation",
    date: "May 2022 - March 2024",
    description: "Series Mermaze, Rainbow High, and L.O.L, lookdev and creation of grooms.",
    extraInfo: "",
  },
  {
    job: "Groom Artist at A Film Studios",
    date: "June 2021 - February 2022",
    description: 'Feature film, "Mugge og hans mærkelig hjerne." Grooming all characters, optimizing and making grooms that are transferable.',
    extraInfo: "",
  },
  {
    job: "3D Generalist Props (Game and Film) at Wired Fly",
    date: "August 2020 - February 2021",
    description: 'Qvisten "Folk og Røver i Kardemomme By" and Vokabulantis Game. Sculpting and modelling 3D print assets, printing and refining. Photogrammetry and transferring real-life textures.',
    extraInfo: "",
  },
];
*/
function WorkTimeline() {
  const timelineRef = useRef(null);
  const timelineBarRef = useRef(null);

  const [educationData, setEducationData] = useState([]);
  const [workTimelineData, setWorkTimelineData] = useState([])

  useEffect(() => {
    // Fetch the education data from the backend API
    fetch('/api/education')
      .then((response) => response.json())
      .then((data) => {
        console.log("Education data fetched:", data);
        setEducationData(data);
      })
      .catch((error) => console.error('Error fetching education data:', error));
  }, []);


  useEffect(() => {
    // Fetch the education data from the backend API
    fetch('/api/work')
      .then((response) => response.json())
      .then((data) => {
        console.log("Education data fetched:", data);
        setWorkTimelineData(data);
      })
      .catch((error) => console.error('Error fetching education data:', error));
  }, []);

  return (
    <div className='menu-section' id="experience">
      <Timeline data={workTimelineData} title="Work Experience" />
      <Timeline data={educationData} title="Education" />
    </div>
  );
}

export default WorkTimeline;
