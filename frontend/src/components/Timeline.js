import React, { useEffect, useRef } from 'react';
import './WorkTimeline.css'; // Import the CSS file for styling

function Timeline({ data, title }) {
  const timelineRef = useRef(null);
  const timelineBarRef = useRef(null);
  const timelineHeaderBGRef= useRef(null)

  useEffect(() => {
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');

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

    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    // Scroll handler to fill up the timeline bar
    const handleScroll = () => {
        if (timelineRef.current && timelineBarRef.current) {
          const timelinePosition = timelineRef.current.getBoundingClientRect().top;
          //const timelineHeight = timelineRef.current.getBoundingClientRect().height;
          const windowHeight = window.innerHeight;
  
          // Calculate how much the timeline container is visible within the window
          let scrollPercentage = (windowHeight/2) + timelinePosition*-1
          console.log("PERC", scrollPercentage)
            
         
            if (scrollPercentage> -25){
                 timelineHeaderBGRef.current.style.height='100%'
            }
            else
                timelineHeaderBGRef.current.style.height='0%'

          if (scrollPercentage<0)
            timelineBarRef.current.style.height = `0px`;
          else
          timelineBarRef.current.style.height = `${scrollPercentage}px`;
        }
      };
  
  
      document.addEventListener('wheel', handleScroll);
      document.addEventListener('touchmove', handleScroll);
  
      // Run the handleScroll to ensure the bar updates immediately after mounting
      handleScroll();

    return () => {
      document.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
  
    };
  }, [data]);

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div style={{background:"white", position: 'relative', overflow:'hidden'}}>
        <div className='edu-header-bg'  ref={timelineHeaderBGRef} style={{}}></div>
<h2 className='edu-header'>{title} </h2>
</div>
      <div className="timeline">
        <div className="timeline-bar" ref={timelineBarRef}></div>
        {data.map((item, index) => (
          <div key={`${title}-${index}`} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <h3>{item.job || item.name}</h3>
              <p className="timeline-date">{item.date || item.years}</p>
              <p>{item.description}</p>
              {item.extraInfo && <p className="extra-info">{item.extraInfo}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
