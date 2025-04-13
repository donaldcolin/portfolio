import React from 'react';
import './about.css';

const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="about-content">
        <div className="about-title-column">
          <h1>About</h1>
        </div>
        
        <div className="about-text-column">
          <div className="about-bio">
            <p>
              Donald <span className="pronouns">(HE/HIM)</span> is a mobile developer and business strategist creating exceptional digital experiences. With Swift, Flutter, and React in his toolkit, he builds products that merge technical excellence with market relevance.
            </p>
            <p>
              Working remotely from anywhere with a good internet connection, Donald brings global perspective to local challenges. His unique ability to navigate both development and business landscapes allows him to create solutions that resonate with users while delivering measurable impact for companies.
            </p>
          </div>
          
          <div className="about-tagline">
            BUILDING PRODUCTS AT THE CROSSROADS OF MOBILE — WEB — BUSINESS.
          </div>
          
          <div className="about-position">
            <div className="position-logo">DC</div>
            <div className="position-details">
              <div className="position-title">Mobile Developer & Strategist</div>
              <div className="position-company">TravelTriangle & Kalvium</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
