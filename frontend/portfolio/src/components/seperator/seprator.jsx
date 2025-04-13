import React from 'react';
import './seprator.css';

const Separator = () => {
  return (
    <div className="separator-container">
      <div className="separator-content">
        <div className="separator-line"></div>
        
        <div className="separator-elements">
          <div className="separator-dot"></div>
          <div className="separator-text">creative work</div>
          <div className="separator-circle"></div>
        </div>
        
        <div className="separator-line"></div>
      </div>
    </div>
  );
};

export default Separator;
