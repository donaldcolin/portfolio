import React, { useState, useRef } from 'react';
// Removed: { useLayoutEffect }
// Removed: { gsap }
// Removed: { ScrollTrigger }
// Removed: { SplitText }
import './About.css';

// Removed: gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const [activeTab, setActiveTab] = useState('tech');
  // Refs are kept, but the animation logic they supported is gone
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);

  const experiences = [
    {
      company: "Travellicious",
      logo: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748803918/IMG_0068-removebg-preview_ynkqzh.png",
      role: "Software Development Engineer",
      duration: "2024 - Present",
      description: "Developed the Website of travellicious as a solo developer and maintained the website."
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

  // Removed useLayoutEffect and all GSAP animation logic

  return (
    <div id="about" ref={rootRef} className="about-container">
      <div className="about-content">
        {/* Note: The title and bio elements will now rely entirely on CSS for their styling and visibility. */}
        <h1 ref={titleRef}>About</h1>

        <div className="about-bio">
          {/* Removed style={{ opacity: 0 }} if it was present, as CSS should handle initial visibility. */}
          <p ref={bioRef} className="bio-paragraph">
            Donald <span className="pronouns">(HE/HIM)</span> loves building things that actually work and matter. He blends tech and strategy to turn ideas into products people enjoy using and businesses can grow with. From sketching out flows to shaping launches, he's all about speed, simplicity, and making an impact.
          </p>
        </div>

        <div className="experience-section">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item">
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
          <div className="tools-grid">
            {activeTab === 'tech' ? (
              <>
                <div className="tools-category">
                  <h3>Languages</h3>
                  <div className="tools-list">
                    {technicalSkills.languages.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
                <div className="tools-category">
                  <h3>Frameworks & Libraries</h3>
                  <div className="tools-list">
                    {technicalSkills.frameworks.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
                <div className="tools-category">
                  <h3>DevOps & Databases</h3>
                  <div className="tools-list">
                    {technicalSkills.tools.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="tools-category">
                  <h3>Sales Expertise</h3>
                  <div className="tools-list">
                    {businessSkills.sales.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
                <div className="tools-category">
                  <h3>Marketing</h3>
                  <div className="tools-list">
                    {businessSkills.marketing.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
                <div className="tools-category">
                  <h3>Business Development</h3>
                  <div className="tools-list">
                    {businessSkills.business.map((skill) => <span key={skill} className="tool-badge">{skill}</span>)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default About;