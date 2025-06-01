import React from 'react';
import './about.css';

const About = () => {
  const experiences = [
    {
      company: "Travellcious",
      logo: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748803918/IMG_0068-removebg-preview_ynkqzh.png",
      role: "Software Developement Engineer",
      duration: "2024 - Present",
      description: "Deveoloped the Website of travellcious as a solo developer and maintaned the website."
    },
    {
      company: "Kalvium",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFMvwlVTDLpEavp_RY959zJjT77ZLa8r7A_Q&s",
      role: "Bussiness developer",
      duration: "2024 - Present",
      description: "Basically did B.tech admissions from lead generation to closing the deal."
    },
    {
      company: "Layla.Pets",
      logo: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749558/furspace_logo_yrsc42.jpg",
      role: "Co-Founder",

      description: "Developed technical strategies and mentored junior developers in mobile and web technologies."
    }
  ];

  const tools = {
    languages: ["Swift", "Dart", "JavaScript", "Python"],
    frameworks: ["SwiftUI","Flutter", "React", "Node.js", "Express"],
    tools: ["Git", "Docker", "Firebase", "MongoDB", "PostgreSQL"]
  };

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

          {/* Experience Section */}
          <div className="experience-section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="timeline-dot">
                    <div className="dot-pulse"></div>
                  </div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <div className="experience-company-info">
                        <img src={exp.logo} alt={exp.company} className="company-logo" />
                        <div>
                          <h3>{exp.role}</h3>
                          <span className="experience-company">{exp.company}</span>
                          <span className="experience-duration">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p>{exp.description}</p>
                    <div className="experience-arrow">→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="tools-section">
            <h2 className="section-title">Tech Stack</h2>
            <div className="tools-grid">
              <div className="tools-category">
                <h3>Languages</h3>
                <div className="tools-list">
                  {tools.languages.map((tool, index) => (
                    <span key={index} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>
              <div className="tools-category">
                <h3>Frameworks & Libraries</h3>
                <div className="tools-list">
                  {tools.frameworks.map((tool, index) => (
                    <span key={index} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>
              <div className="tools-category">
                <h3>DevOps & Databases</h3>
                <div className="tools-list">
                  {tools.tools.map((tool, index) => (
                    <span key={index} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-position">
          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
