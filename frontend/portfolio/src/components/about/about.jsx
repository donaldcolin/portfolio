import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, createSplitText, } from '../../utils/gsapSetup';
import '../../utils/testGSAP'; // Import test to verify GSAP setup
import './about.css';

const About = () => {
  
   
  // Refs for Animation
  const containerRef = useRef(null); 
  const splashRef = useRef(null); 
  const bgRef = useRef(null); 
  const titleRef = useRef(null); 
  const contentWrapperRef = useRef(null); 
  const bioRef = useRef(null);


  

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
          scale: 5, 
          filter: 'blur(10px)',
          duration: 2,
          ease: 'sine.out'
        }, 0); 
         
        // Animation 2: Centered immersive zoom on the title
        tl.to(title, {
          opacity: 0,
          scale: 6,
          duration: 2,
          transformOrigin: 'center center',
          ease: 'sine.out',
          force3D: true,
          filter: 'blur(2px)'
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

        // Bio Background Reveal Animation - Words start at 50% opacity, reveal to 100%
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
              // Create split text
              let split = createSplitText(bioEl);
              
              // Set initial state for all words - 50% opacity (background state)
              if (split.words && split.words.length > 0) {
                gsap.set(split.words, {
                  opacity: 0.5,
                  color: 'rgba(255, 255, 255, 0.5)'
                });

                // Animate words to 100% opacity with scroll trigger - SLOW reveal
                gsap.to(split.words, {
                  scrollTrigger: {
                    trigger: bioEl,
                    start: "top 80%",
                    end: "bottom 10%",
                    scrub: 3,
                    markers: false,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                    id: "about-bio-animation",
                  },
                  opacity: 1,
                  color: 'rgba(255, 255, 255, 1)',
                  duration: 0.5,
                  ease: "none",
                  stagger: {
                    amount: 2.5,
                    from: "start",
                    ease: "none"
                  }
                });
              } else {
                console.warn('No words found for animation');
                throw new Error('No words found');
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


          
        </div>
      </div>
    </div>
  );
};

export default About;