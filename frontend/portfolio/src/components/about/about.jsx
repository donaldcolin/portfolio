import React, { useState } from 'react';
import './about.css';
import { Mail } from 'lucide-react'; // Assuming Mail icon is still needed or similar icons might be used

const About = () => {
  const [activeTab, setActiveTab] = useState('tech');

  const experiences = [
    {
      company: "Travellicious",
      logo: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748803918/IMG_0068-removebg-preview_ynkqzh.png",
      role: "Software Developement Engineer",
      duration: "2024 - Present",
      description: "Developed the Website of travellicious as a solo developer and maintaned the website."
    },
    {
      company: "Kalvium",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFMvwlVTDLpEavp_RY959zJjT77ZLa8r7A_Q&s",
      role: "Business developer",
      duration: "2024 - Present",
      description: "Basically did B.tech admissions from lead handling to closing the deal."
    },
    {
      company: "Layla.Pets",
      logo: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749558/furspace_logo_yrsc42.jpg",
      role: "Co-Founder",
      description: "Building a safe, joyful space where pets and their people connect, share, and thrive together."
    }
  ];

  const technicalSkills = {
    languages: ["Swift", "Dart", "JavaScript", "Python"],
    frameworks: ["SwiftUI", "Flutter", "React", "Node.js", "Express"],
    tools: ["Git", "Docker", "Firebase", "MongoDB", "PostgreSQL"]
  };

  const businessSkills = {
    sales: [
      "Lead Generation",
      "Sales Pipeline Management",
      "Client Relationship Management",
      "Sales Strategy",
      "Revenue Growth"
    ],
    marketing: [
      "Content Strategy",
      "Growth Hacking",
      "Brand Development",
      "Market Analysis"
    ],
    business: [
      "Business Development",
      "Strategic Planning",
      "Project Management",
      "Performance Analytics"
    ]
  };

  return (
    <div id="about" className="projects-container">
      <div className="projects-content">
        <div className="projects-title-column">
          <h1>About</h1>
        </div>
        
        <div className="about-text-column">
          <div className="about-bio">
  <p>
    Donald <span className="pronouns">(HE/HIM)</span> is a full-stack developer and digital product strategist who bridges technology and business to build scalable, impact-driven applications. Skilled in Swift, Flutter, and React, he delivers high-performance mobile and web experiences tailored to both users and markets.
  </p>

  <p>
    With a sharp focus on product-market fit and business growth, Donald turns technical builds into strategic assets. He has experience leading end-to-end product developmentdefining roadmaps, shaping user flows, and aligning features with KPIs that matter. His solutions prioritize speed, usability, and measurable business outcomes.
  </p>

  <p>
    On the business front, Donald drives go-to-market strategies, optimizes conversion funnels, and leverages data to refine product decisions. As a remote-first collaborator, he excels in fast-paced environments, balancing hands-on coding with strategic input to create digital products that scale and sell.
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
                  <div className="timeline-dot"></div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <div className="experience-company-info">
                        <img src={exp.logo} alt={exp.company} className="company-logo" />
                        <div>
                          <h3>{exp.role}</h3>
                          <span className="experience-company">{exp.company}</span>
                          {exp.duration && <span className="experience-duration">{exp.duration}</span>}
                        </div>
                      </div>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="tools-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-toggle">
              <button 
                className={`toggle-btn ${activeTab === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                Technical
              </button>
              <button 
                className={`toggle-btn ${activeTab === 'business' ? 'active' : ''}`}
                onClick={() => setActiveTab('business')}
              >
                Business
              </button>
            </div>
            <div className="tools-grid" key={activeTab}>
              {activeTab === 'tech' ? (
                <>
                  <div className="tools-category">
                    <h3>Languages</h3>
                    <div className="tools-list">
                      {technicalSkills.languages.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Frameworks & Libraries</h3>
                    <div className="tools-list">
                      {technicalSkills.frameworks.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>DevOps & Databases</h3>
                    <div className="tools-list">
                      {technicalSkills.tools.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="tools-category">
                    <h3>Sales Expertise</h3>
                    <div className="tools-list">
                      {businessSkills.sales.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Marketing</h3>
                    <div className="tools-list">
                      {businessSkills.marketing.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Business Development</h3>
                    <div className="tools-list">
                      {businessSkills.business.map((skill, index) => (
                        <span key={index} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 