import React, { useState, useRef, useLayoutEffect } from 'react';


// the title zoom effect is not working,fix it,css is the problem
// and ther gsap features should be done

import { gsap } from 'gsap';

import { SplitText } from 'gsap/SplitText';
import './about.css';

// Don't register plugins here - they're already registered in App.jsx
// gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const [activeTab, setActiveTab] = useState('tech');
   
  // Refs for Animation
  const containerRef = useRef(null); 
  const splashRef = useRef(null); 
  const bgRef = useRef(null); 
  const titleRef = useRef(null); 
  const contentWrapperRef = useRef(null); 
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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const splash = splashRef.current;
      const background = bgRef.current;
      const title = titleRef.current;
      const bioEl = bioRef.current;

      if (!splash || !background || !title) return;

      // Force title to be visible before any GSAP operations
      title.style.opacity = '1';
      title.style.transform = 'scale(1)';
      title.style.display = 'block';
      title.style.visibility = 'visible';
      title.style.color = '#fff';
      title.style.transformOrigin = 'center center';

      // Start the background slightly scaled
      gsap.set(background, { scale: 1.2 }); 
       
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splash,
          pin: true, 
          scrub: 1, 
          start: "top top",
          end: "+=600", // Further reduced to 300px
          invalidateOnRefresh: true,
          refreshPriority: -1, // Lower priority to work with ScrollSmoother
        },
      });

      // Animation 1: Massive zoom of the background and blurring it 
      tl.to(background, {
        scale: 4, 
        filter: 'blur(8px)',
        duration: 2,
      }, 0); 
       
      // Animation 2: Scale UP (Zoom In) and fade out the title text
      tl.to(title, {
        opacity: 0,
        scale: 3,
        y: -100,
        duration: 1.5,
        transformOrigin: "center top",
        ease: "power2.out"
      }, 0); 
       
      // Animation 3: Fade in the scrolling content
      if (contentWrapperRef.current) {
        gsap.set(contentWrapperRef.current, { opacity: 0, y: 100 });
         
        tl.to(contentWrapperRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, 0.5);
      }

      // Bio SplitText Animation
      if (bioEl) {
        // Wait for fonts to load before splitting text
        document.fonts.ready.then(() => {
          try {
            // Create a more sophisticated split text animation
            let split = new SplitText(bioEl, { 
              type: "words,chars",
              charsClass: "char",
              wordsClass: "word"
            });

            // Set initial state for all characters
            gsap.set(split.chars, {
              opacity: 0,
              y: 20,
              rotationX: 90
            });

            // Animate characters with scroll trigger
            gsap.to(split.chars, {
              scrollTrigger: {
                trigger: bioEl,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false,
                invalidateOnRefresh: true,
                refreshPriority: -1,
              },
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.5,
                from: "start"
              }
            });

            // Add a subtle hover effect for individual words
            split.words.forEach((word, index) => {
              word.addEventListener('mouseenter', () => {
                gsap.to(word, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out"
                });
              });
              
              word.addEventListener('mouseleave', () => {
                gsap.to(word, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              });
            });
          } catch (error) {
            console.warn('SplitText animation failed:', error);
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="about-container">
       
      {/* PINNED SPLASH SECTION */}
      <section ref={splashRef} className="splash-pin-wrapper">
        <div ref={bgRef} className="zooming-bg-layer"></div>
         
        <div ref={titleRef} className="splash-title-layer">
          <h1 className="about-page-title">About</h1>
        </div>
      </section>

      {/* SCROLLING CONTENT SECTION */}
      <div ref={contentWrapperRef} className="about-content-wrapper">
        <div className="about-content">
           
          {/* Bio Section */}
          <div className="about-bio">
            <p ref={bioRef} className="bbh">
              Donald <span className="pronouns">(HE/HIM)</span> loves building things that actually work and matter. He blends tech and strategy to turn ideas into products people enjoy using and businesses can grow with. From sketching out flows to shaping launches, he's all about speed, simplicity, and making an impact.
            </p>
          </div>

          {/* Experience Section */}
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
            <div className="tools-grid">
              {activeTab === 'tech' ? (
                <>
                  <div className="tools-category">
                    <h3>Languages</h3>
                    <div className="tools-list">
                      {technicalSkills.languages.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Frameworks & Libraries</h3>
                    <div className="tools-list">
                      {technicalSkills.frameworks.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>DevOps & Databases</h3>
                    <div className="tools-list">
                      {technicalSkills.tools.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="tools-category">
                    <h3>Sales Expertise</h3>
                    <div className="tools-list">
                      {businessSkills.sales.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Marketing</h3>
                    <div className="tools-list">
                      {businessSkills.marketing.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tools-category">
                    <h3>Business Development</h3>
                    <div className="tools-list">
                      {businessSkills.business.map((skill) => (
                        <span key={skill} className="tool-badge">{skill}</span>
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