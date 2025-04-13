import React, { useEffect, useRef } from 'react';
import './seprator-alt.css';

const SeparatorAlt = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrollPosition = window.scrollY;
        const speed = 0.2;
        const offset = scrollPosition * speed;
        textRef.current.style.transform = `translateX(${-offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="separator-alt-container">
      <div className="separator-alt-marquee" ref={textRef}>
        <div className="marquee-track">
          <span>// Projects</span>
          <span className="separator-dash">—</span>
          <span>Work</span>
          <span className="separator-dash">—</span>
          <span>Portfolio</span>
          <span className="separator-dash">—</span>
          <span>// Projects</span>
          <span className="separator-dash">—</span>
          <span>Work</span>
          <span className="separator-dash">—</span>
          <span>Portfolio</span>
          <span className="separator-dash">—</span>
          <span>// Projects</span>
          <span className="separator-dash">—</span>
          <span>Work</span>
          <span className="separator-dash">—</span>
          <span>Portfolio</span>
        </div>
      </div>
      
      <div className="separator-alt-line-container">
        <div className="separator-alt-line"></div>
        <div className="separator-alt-dot"></div>
        <div className="separator-alt-line"></div>
      </div>
    </div>
  );
};

export default SeparatorAlt; 