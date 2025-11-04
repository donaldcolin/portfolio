import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, createSplitText, } from '../../utils/gsapSetup';
import '../../utils/testGSAP'; // Import test to verify GSAP setup
import './about.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('tech');
   
  // Refs for Animation
  const containerRef = useRef(null); 
  const splashRef = useRef(null); 
  const bgRef = useRef(null); 
  const titleRef = useRef(null); 
  const contentWrapperRef = useRef(null); 
  const bioRef = useRef(null);


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
    // Wait for everything to be ready before initializing
    const initAnimations = () => {
      const splash = splashRef.current;
      const background = bgRef.current;
      const title = titleRef.current;
      const bioEl = bioRef.current;

      if (!splash || !background || !title) {
        console.warn('About: Required elements not found, retrying...');
        return null;
      }

      let ctx = gsap.context(() => {

        // Force title to be visible before any GSAP operations
        title.style.opacity = '1';
        title.style.transform = 'scale(1)';
        title.style.display = 'block';
        title.style.visibility = 'visible';
        title.style.color = '#fff';
        title.style.transformOrigin = 'center center';

        // Start the background slightly scaled
        gsap.set(background, { scale: 1.2 }); 
         
        // --- determine the appropriate trigger (prefer the hero's bottom) ---
        // Wait for DOM to be ready, then find hero
        const heroEl = document.querySelector('.hero-section');
        
        // Ensure hero is positioned correctly relative to splash
        if (heroEl) {
          // Ensure hero maintains its position and z-index
          gsap.set(heroEl, { 
            position: 'relative', 
            zIndex: 20,
            clearProps: 'transform' // Clear any transform that might affect positioning
          });
        }

        // Kill any existing ScrollTrigger with this ID to prevent duplicates
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.id === 'about-title-animation') {
            trigger.kill();
          }
        });

        // Create timeline immediately - ScrollTrigger will calculate on refresh
        const tl = gsap.timeline({
          scrollTrigger: {
            // Use hero as trigger - start when hero bottom reaches top of viewport
            trigger: heroEl || splash,
            pin: splash,                // pin the splash during the animation
            pinSpacing: true,         // preserve document flow so following content doesn't jump up
            scrub: 1,
            // Start when hero bottom reaches top of viewport
            start: heroEl ? "bottom top" : "top top",
            // End after 600px of scroll
            end: heroEl ? "bottom+=600 top" : "+=600",
            invalidateOnRefresh: true,
            refreshPriority: 1, // Higher priority to recalculate after layout
            id: "about-title-animation",
            // markers: true, // uncomment while debugging to visually confirm start/end
            anticipatePin: 1,
            onRefresh: () => {
              // Ensure hero positioning is correct on refresh
              if (heroEl) {
                // Reset hero position to ensure proper calculation
                gsap.set(heroEl, { 
                  position: 'relative', 
                  zIndex: 20,
                  clearProps: 'transform'
                });
              }
            },
          },
        });

        // Add animations to timeline
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
          transformOrigin: "center center",
          ease: "power2.out",
          force3D: true,
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
          // Kill existing bio animation triggers
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && 
                (trigger.vars.id === 'about-bio-animation' || 
                 trigger.vars.id === 'about-bio-fallback')) {
              trigger.kill();
            }
          });

          // Wait for fonts to load before splitting text
          const initBioAnimation = () => {
            try {
              // Create a more sophisticated split text animation
              let split = createSplitText(bioEl);
              
              // Debug: Check if elements were created
              console.log('Split text created:', {
                words: split.words.length,
                chars: split.chars.length,
                wordsArray: Array.from(split.words),
                charsArray: Array.from(split.chars)
              });

              // Set initial state for all characters
              if (split.chars && split.chars.length > 0) {
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
                    markers: true,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                    id: "about-bio-animation", // Unique ID to prevent conflicts
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
                if (split.words && split.words.length > 0) {
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
                }
              } else {
                console.warn('No characters found for animation');
                throw new Error('No characters found');
              }
            } catch (error) {
              console.warn('SplitText animation failed:', error);
              // Fallback: simple fade-in animation for the entire bio text
              gsap.from(bioEl, {
                scrollTrigger: {
                  trigger: bioEl,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                  id: "about-bio-fallback",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          };

          // Wait for fonts, then initialize
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              requestAnimationFrame(() => {
                setTimeout(initBioAnimation, 100);
              });
            });
          } else {
            requestAnimationFrame(() => {
              setTimeout(initBioAnimation, 200);
            });
          }
        }

      }, containerRef);

      // Store context for cleanup
      return ctx;
    };

    // Wait for window load and fonts to be ready
    let animationContext = null;
    let timeoutId = null;

      const setupAnimations = (retryCount = 0) => {
      // Clear any existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Max retries to prevent infinite loops
      const maxRetries = 5;
      
      // Wait for fonts to load and ensure layout is complete
      const doInit = () => {
        // Wait for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          // Wait another frame to ensure layout is complete
          requestAnimationFrame(() => {
            timeoutId = setTimeout(() => {
              const ctx = initAnimations();
              
              if (!ctx && retryCount < maxRetries) {
                // Retry if elements not found
                console.log(`About: Retrying animation setup (attempt ${retryCount + 1}/${maxRetries})...`);
                setTimeout(() => setupAnimations(retryCount + 1), 200);
                return;
              }
              
              animationContext = ctx;
              
              // Critical: Refresh ScrollTrigger multiple times to ensure proper calculation
              // This ensures all positions are calculated correctly
              const refreshScrollTrigger = () => {
                // Force a recalculation
                ScrollTrigger.refresh();
              };
              
              // Immediate refresh
              refreshScrollTrigger();
              
              // Refresh after layout settles
              setTimeout(refreshScrollTrigger, 50);
              setTimeout(refreshScrollTrigger, 150);
              setTimeout(refreshScrollTrigger, 300);
              
              // Final refresh after everything is settled
              setTimeout(() => {
                refreshScrollTrigger();
                // Ensure window is scrolled to top if needed
                if (window.scrollY === 0) {
                  window.scrollTo(0, 0);
                  setTimeout(refreshScrollTrigger, 50);
                }
              }, 500);
            }, 50);
          });
        });
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(doInit);
      } else {
        // Fallback if fonts API not available
        doInit();
      }
    };

    // Setup animations
    if (document.readyState === 'complete') {
      setupAnimations();
    } else {
      window.addEventListener('load', setupAnimations, { once: true });
      // Also try immediately in case load already fired
      setupAnimations();
    }

    // Handle window resize and orientation change
    let resizeTimeout;
    const handleResize = () => {
      if (animationContext) {
        // Debounce resize handler
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (animationContext) {
          ScrollTrigger.refresh();
        }
      }, 200);
    });
    
    // Also refresh on scroll end (handles zoom on some browsers)
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (animationContext) {
          ScrollTrigger.refresh();
        }
      }, 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('load', setupAnimations);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationContext) {
        animationContext.revert();
      }
      
      // Kill all ScrollTriggers created in this component with unique IDs
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.id) {
          const triggerId = trigger.vars.id;
          if (triggerId === 'about-title-animation' || 
              triggerId === 'about-bio-animation' || 
              triggerId === 'about-bio-fallback') {
            trigger.kill();
          }
        }
      });
    };
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