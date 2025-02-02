import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import YouTubeEmbed from './components/YoutubeEmbed';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import EducationTimeline from './components/EducationTimeline';
import WorkTimeline from './components/WorkTimeline';
import CreateProjectForm from './components/CreateProjectForm'; // Admin form component
import './App.css';  // For CSS styles
import ChooseVideo from './components/ChooseVideo';
function App() {
  const [active, setActive] = useState(false);

  return (
    <Router>
      <div className="App menu-section" id="home">
        <Menu active={active} />
        <div id="primary">
          <Routes>
            {/* Default route for the main page */}
            <Route
              path="/"
              element={
                <>
                <ChooseVideo/>
             
                  <Projects />
                  <WorkTimeline />
                  <About />
                </>
              }
            />
            {/* Admin route for managing projects */}
            <Route path="/admin" element={<CreateProjectForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
