import React, { useEffect, useRef } from 'react';
import './seprator-alt.css';

const SeparatorAlt = ({ text = "Life Updates" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const handleScroll = () => {
      if (textRef.current) {
        const scrollPosition = window.scrollY;
        const speed = 0.15; // Reduced speed for smoother movement
        const offset = scrollPosition * speed;
        
        // Use requestAnimationFrame for smoother animation
        animationFrame = requestAnimationFrame(() => {
          textRef.current.style.transform = `translateX(${-offset}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="separator-alt-container">
      <div className="separator-alt-marquee" ref={textRef}>
        <div className="marquee-track">
        <span>Work</span>
        <span className="separator-dash">—</span>
          <span>Life</span>
          <span className="separator-dash">—</span>
          <span>Updates</span>
          <span className="separator-dash">—</span>
          <span>Journey</span>
          <span className="separator-dash">—</span>
          <span> Life</span>
          <span className="separator-dash">—</span>
          <span>Work</span>
          <span className="separator-dash">—</span>
          <span>Updates</span>
          <span className="separator-dash">—</span>
          <span>Journey</span>
          <span className="separator-dash">—</span>
          <span>Life</span>
          <span className="separator-dash">—</span>
          <span>Work</span>
          <span className="separator-dash">—</span>
          <span>Updates</span>
          <span className="separator-dash">—</span>
          <span>Journey</span>
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