import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, createSplitText, } from '../../utils/gsapSetup';
import '../../utils/testGSAP'; // Import test to verify GSAP setup
import './about.css';

const About = () => {
  // Refs for Animation
  const containerRef = useRef(null);
  const bioRef = useRef(null);

  useLayoutEffect(() => {
    // Wait for everything to be ready before initializing
    const initAnimations = () => {
      const bioEl = bioRef.current;

      let ctx = gsap.context(() => {
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
                    end: "bottom 30%", // Adjusted end for better scroll feel
                    scrub: 1, // Smoothened scrub
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
                    amount: 1, // Faster stagger
                    from: "start",
                    ease: "none"
                  }
                });
              } else {
                console.warn('No words found for animation');
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

      const doInit = () => {
        requestAnimationFrame(() => {
          timeoutId = setTimeout(() => {
            animationContext = initAnimations();
          }, 50);
        });
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(doInit);
      } else {
        doInit();
      }
    };

    // Setup animations
    if (document.readyState === 'complete') {
      setupAnimations();
    } else {
      window.addEventListener('load', setupAnimations, { once: true });
      setupAnimations();
    }

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('load', setupAnimations);

      if (animationContext) {
        animationContext.revert();
      }

      // Kill all ScrollTriggers created in this component with unique IDs
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.id) {
          const triggerId = trigger.vars.id;
          if (triggerId === 'about-bio-animation' ||
            triggerId === 'about-bio-fallback') {
            trigger.kill();
          }
        }
      });
    };
  }, []);

  return (
    <div id="about" ref={containerRef} className="about-container">

      <div className="about-header">
        <h1 className="about-page-title">About</h1>
      </div>

      {/* CONTENT SECTION */}
      <div className="about-content-wrapper">
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