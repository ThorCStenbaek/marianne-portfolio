import React, { useEffect, useRef, useState } from 'react';
import './WorkTimeline.css';
import { hideSideHolder, resetSideHolder } from '../scripts/menuController';

function useIsMobile(breakpoint = 1000) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}

function Timeline({ data, title, doHide=false }) {
  const timelineRef = useRef(null);
  const timelineBarRef = useRef(null);
  const timelineHeaderBGRef = useRef(null);
  const lastScrollTopRef = useRef(-100000000); // Using a ref instead of state

  const mobile = useIsMobile();

  useEffect(() => {
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineItems.forEach((item) => observer.observe(item));

    const handleScroll = () => {
      if (timelineRef.current && timelineBarRef.current) {
        const timelinePosition = timelineRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollPercentage = (windowHeight/2) + timelinePosition*-1;
        
        if(doHide && mobile) {
          if (scrollPercentage < lastScrollTopRef.current - 25) {
            resetSideHolder();
          }
          else if (scrollPercentage > lastScrollTopRef.current + 25) {
            hideSideHolder();
          }
          console.log("PERC", scrollPercentage, lastScrollTopRef.current);
        }
        
        // Update the ref value
        lastScrollTopRef.current = scrollPercentage;

        if (scrollPercentage > -25) {
          timelineHeaderBGRef.current.style.height = '100%';
        } else {
          timelineHeaderBGRef.current.style.height = '0%';
        }

        timelineBarRef.current.style.height = scrollPercentage < 0 ? '0px' : `${scrollPercentage}px`;
      }
    };

    document.addEventListener('wheel', handleScroll);
    document.addEventListener('touchmove', handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [data, doHide, mobile]); // Added dependencies

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div style={{background: "white", position: 'relative', overflow: 'hidden'}}>
        <div className='edu-header-bg' ref={timelineHeaderBGRef}></div>
        <h2 className='edu-header'>{title}</h2>
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