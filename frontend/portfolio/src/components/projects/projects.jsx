import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './projects.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const webSectionRef = useRef(null);

  useLayoutEffect(() => {
    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {

      // Get elements
      const mobileScreens = gsap.utils.toArray('.mobile-section .screenshot');
      const mobileDescs = gsap.utils.toArray('.mobile-section .description');
      const webScreens = gsap.utils.toArray('.website-section .website-screenshot');
      const webDescs = gsap.utils.toArray('.website-section .description');

      // Check if we're on desktop
      if (window.innerWidth > 968) {

        // --- MOBILE APPS SECTION ---
        if (mobileScreens.length > 0 && mobileDescs.length > 0) {
          // Initial State - hide all
          gsap.set(mobileScreens, { opacity: 0 });
          gsap.set(mobileDescs, { opacity: 0, visibility: 'hidden' });

          // Show first item
          gsap.set(mobileScreens[0], { opacity: 1 });
          gsap.set(mobileDescs[0], { opacity: 1, visibility: 'visible' });

          // Calculate pin duration based on number of items
          const numItems = mobileScreens.length;
          const pinDuration = numItems * 100; // 100vh per item

          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: mobileSectionRef.current,
              start: "top top",
              end: `+=${pinDuration}%`,
              pin: true,
              scrub: 0.5,
              // markers: true, // Uncomment for debugging
            }
          });

          // Create transitions between items
          for (let i = 0; i < mobileScreens.length - 1; i++) {
            const next = i + 1;

            // Add hold time, then transition
            tlMobile
              .to({}, { duration: 1 }) // Hold current
              .to(mobileDescs[i], { opacity: 0, duration: 0.5 })
              .to(mobileScreens[next], { opacity: 1, duration: 0.5 }, "<")
              .to(mobileDescs[next], { opacity: 1, visibility: 'visible', duration: 0.5 });
          }
          // Final hold
          tlMobile.to({}, { duration: 1 });
        }

        // --- WEBSITES SECTION ---
        if (webScreens.length > 0 && webDescs.length > 0) {
          // Initial State
          gsap.set(webScreens, { opacity: 0 });
          gsap.set(webDescs, { opacity: 0, visibility: 'hidden' });

          // Show first item
          gsap.set(webScreens[0], { opacity: 1 });
          gsap.set(webDescs[0], { opacity: 1, visibility: 'visible' });

          const numItems = webScreens.length;
          const pinDuration = numItems * 100;

          const tlWeb = gsap.timeline({
            scrollTrigger: {
              trigger: webSectionRef.current,
              start: "top top",
              end: `+=${pinDuration}%`,
              pin: true,
              scrub: 0.5,
              // markers: true,
            }
          });

          for (let i = 0; i < webScreens.length - 1; i++) {
            const next = i + 1;

            tlWeb
              .to({}, { duration: 1 })
              .to(webDescs[i], { opacity: 0, duration: 0.5 })
              .to(webScreens[next], { opacity: 1, duration: 0.5 }, "<")
              .to(webDescs[next], { opacity: 1, visibility: 'visible', duration: 0.5 });
          }
          tlWeb.to({}, { duration: 1 });
        }

      } else {
        // Mobile fallback - show all content stacked
        gsap.set([mobileScreens, webScreens], { opacity: 1 });
        gsap.set([mobileDescs, webDescs], { opacity: 1, visibility: 'visible' });
      }

    }, containerRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div className="project-container" ref={containerRef}>

      {/* Work Title */}
      <h1 className="work-title">work</h1>

      {/* Mobile Apps Section */}
      <div className="section-label">mobile applications</div>
      <div className="scroll-container mobile-section" ref={mobileSectionRef}>
        <div className="sticky-section">
          <div className="content-wrapper">
            <div className="phone-container">
              <div className="iphone-frame">
                <div className="dynamic-island"></div>
                <div className="screen">
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop" alt="App 1" className="screenshot" id="mobile1" />
                  <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=800&fit=crop" alt="App 2" className="screenshot" id="mobile2" />
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop" alt="App 3" className="screenshot" id="mobile3" />
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop" alt="App 4" className="screenshot" id="mobile4" />
                </div>
              </div>
            </div>

            <div className="description-container">
              <div className="description" id="mobileDesc1">
                <span className="project-number">01</span>
                <h2>vehicle expense tracker</h2>
                <p>a comprehensive mobile application for tracking all vehicle-related expenses. monitor fuel costs, maintenance, FASTag transactions, and generate detailed reports.</p>
                <div className="tech-stack">
                  <span>react native</span>
                  <span>firebase</span>
                  <span>chart.js</span>
                </div>
                <ul className="feature-list">
                  <li>real-time expense tracking</li>
                  <li>monthly analytics dashboard</li>
                  <li>export to PDF reports</li>
                </ul>
              </div>

              <div className="description" id="mobileDesc2">
                <span className="project-number">02</span>
                <h2>fitness companion</h2>
                <p>personal fitness tracking app with workout plans, calorie counter, and progress visualization. helps users achieve their health goals.</p>
                <div className="tech-stack">
                  <span>flutter</span>
                  <span>sqlite</span>
                  <span>health kit</span>
                </div>
                <ul className="feature-list">
                  <li>custom workout plans</li>
                  <li>nutrition tracking</li>
                  <li>progress photos timeline</li>
                </ul>
              </div>

              <div className="description" id="mobileDesc3">
                <span className="project-number">03</span>
                <h2>task management pro</h2>
                <p>intuitive task manager with smart scheduling, team collaboration features, and productivity insights to boost efficiency.</p>
                <div className="tech-stack">
                  <span>react native</span>
                  <span>mongodb</span>
                  <span>websocket</span>
                </div>
                <ul className="feature-list">
                  <li>team collaboration</li>
                  <li>smart notifications</li>
                  <li>productivity analytics</li>
                </ul>
              </div>

              <div className="description" id="mobileDesc4">
                <span className="project-number">04</span>
                <h2>meditation & mindfulness</h2>
                <p>guided meditation app with breathing exercises, sleep stories, and mood tracking to improve mental wellness.</p>
                <div className="tech-stack">
                  <span>swift</span>
                  <span>core audio</span>
                  <span>healthkit</span>
                </div>
                <ul className="feature-list">
                  <li>guided meditations</li>
                  <li>sleep tracking</li>
                  <li>mood journal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Spacer */}
      <div className="transition-spacer"></div>

      {/* Websites Section */}
      <div className="section-label">web applications</div>
      <div className="scroll-container website-section" ref={webSectionRef}>
        <div className="sticky-section">
          <div className="content-wrapper">
            <div className="browser-container">
              <div className="browser-frame">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="browser-url">www.myproject.com</div>
                </div>
                <div className="browser-screen">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop" alt="Website 1" className="website-screenshot" id="web1" />
                  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop" alt="Website 2" className="website-screenshot" id="web2" />
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop" alt="Website 3" className="website-screenshot" id="web3" />
                </div>
              </div>
            </div>

            <div className="description-container">
              <div className="description" id="webDesc1">
                <span className="project-number">01</span>
                <h2>portfolio website</h2>
                <p>modern portfolio website with smooth animations, dark mode support, and responsive design. showcases projects with an elegant grid layout.</p>
                <div className="tech-stack">
                  <span>react</span>
                  <span>gsap</span>
                  <span>tailwind css</span>
                </div>
                <ul className="feature-list">
                  <li>smooth scroll animations</li>
                  <li>project case studies</li>
                  <li>contact form integration</li>
                </ul>
              </div>

              <div className="description" id="webDesc2">
                <span className="project-number">02</span>
                <h2>e-commerce platform</h2>
                <p>full-featured online store with cart management, payment integration, and admin dashboard for inventory management.</p>
                <div className="tech-stack">
                  <span>next.js</span>
                  <span>stripe</span>
                  <span>postgresql</span>
                </div>
                <ul className="feature-list">
                  <li>secure payment processing</li>
                  <li>inventory management</li>
                  <li>order tracking system</li>
                </ul>
              </div>

              <div className="description" id="webDesc3">
                <span className="project-number">03</span>
                <h2>analytics dashboard</h2>
                <p>real-time analytics platform with interactive charts, data visualization, and customizable reports for business intelligence.</p>
                <div className="tech-stack">
                  <span>react</span>
                  <span>d3.js</span>
                  <span>node.js</span>
                </div>
                <ul className="feature-list">
                  <li>real-time data updates</li>
                  <li>custom report builder</li>
                  <li>export to multiple formats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectShowcase;