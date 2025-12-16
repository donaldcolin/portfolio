import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './projects.css';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// PROJECT DATA - Add your projects here!
// ==========================================

const mobileProjects = [
  {
    id: 1,
    title: "vehicle expense tracker",
    description: "A comprehensive mobile application for tracking all vehicle-related expenses. Monitor fuel costs, maintenance, FASTag transactions, and generate detailed reports.",
    techStack: ["react native", "firebase", "chart.js"],
    features: ["real-time expense tracking", "monthly analytics dashboard", "export to PDF reports"],
    screenshot: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
    appLogo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    title: "fitness companion",
    description: "Personal fitness tracking app with workout plans, calorie counter, and progress visualization to help users achieve their health goals.",
    techStack: ["flutter", "sqlite", "health kit"],
    features: ["custom workout plans", "nutrition tracking", "progress photos timeline"],
    screenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=800&fit=crop",
    appLogo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    title: "task management pro",
    description: "Intuitive task manager with smart scheduling, team collaboration features, and productivity insights to boost efficiency.",
    techStack: ["react native", "mongodb", "websocket"],
    features: ["team collaboration", "smart notifications", "productivity analytics"],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop",
    appLogo: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    title: "meditation & mindfulness",
    description: "Guided meditation app with breathing exercises, sleep stories, and mood tracking to improve mental wellness.",
    techStack: ["swift", "core audio", "healthkit"],
    features: ["guided meditations", "sleep tracking", "mood journal"],
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop",
    appLogo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"
  }
];

const webProjects = [
  {
    id: 1,
    title: "portfolio website",
    description: "Modern portfolio website with smooth animations, dark mode support, and responsive design. Showcases projects with an elegant grid layout.",
    techStack: ["react", "gsap", "tailwind css"],
    features: ["smooth scroll animations", "project case studies", "contact form integration"],
    screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
  },
  {
    id: 2,
    title: "e-commerce platform",
    description: "Full-featured online store with cart management, payment integration, and admin dashboard for inventory management.",
    techStack: ["next.js", "stripe", "postgresql"],
    features: ["secure payment processing", "inventory management", "order tracking system"],
    screenshot: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop"
  },
  {
    id: 3,
    title: "analytics dashboard",
    description: "Real-time analytics platform with interactive charts, data visualization, and customizable reports for business intelligence.",
    techStack: ["react", "d3.js", "node.js"],
    features: ["real-time data updates", "custom report builder", "export to multiple formats"],
    screenshot: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
  }
];

// ==========================================
// COMPONENT
// ==========================================

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const webSectionRef = useRef(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [activeWebIndex, setActiveWebIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mobileScreens = gsap.utils.toArray('.mobile-section .screenshot');
      const mobileDescs = gsap.utils.toArray('.mobile-section .description');
      const mobileDots = gsap.utils.toArray('.mobile-section .nav-dot');
      const webScreens = gsap.utils.toArray('.website-section .website-screenshot');
      const webDescs = gsap.utils.toArray('.website-section .description');
      const webDots = gsap.utils.toArray('.website-section .nav-dot');

      // Only run animations on desktop
      if (window.innerWidth > 968) {

        // --- MOBILE APPS SECTION ---
        if (mobileScreens.length > 0 && mobileDescs.length > 0) {
          gsap.set(mobileScreens, { opacity: 0, yPercent: 50 });
          gsap.set(mobileDescs, { opacity: 0, y: 30 });
          gsap.set(mobileScreens[0], { opacity: 1, yPercent: 0 });
          gsap.set(mobileDescs[0], { opacity: 1, y: 0 });

          const numItems = mobileScreens.length;
          const pinDuration = numItems * 50;

          ScrollTrigger.create({
            trigger: mobileSectionRef.current,
            start: "top top",
            end: `+=${pinDuration}%`,
            pin: true,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (numItems - 1),
              duration: 0.3,
              ease: "power2.inOut"
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const currentIndex = Math.round(progress * (numItems - 1));
              setActiveMobileIndex(currentIndex);

              // Animate based on progress
              mobileScreens.forEach((screen, i) => {
                if (i === currentIndex) {
                  gsap.to(screen, { opacity: 1, yPercent: 0, duration: 0.3 });
                  gsap.to(mobileDescs[i], { opacity: 1, y: 0, duration: 0.3 });
                } else {
                  gsap.to(screen, { opacity: 0, yPercent: i < currentIndex ? -50 : 50, duration: 0.3 });
                  gsap.to(mobileDescs[i], { opacity: 0, y: i < currentIndex ? -20 : 20, duration: 0.3 });
                }
              });
            }
          });
        }

        // --- WEBSITES SECTION ---
        if (webScreens.length > 0 && webDescs.length > 0) {
          gsap.set(webScreens, { opacity: 0, scale: 1.1 });
          gsap.set(webDescs, { opacity: 0, x: 40 });
          gsap.set(webScreens[0], { opacity: 1, scale: 1 });
          gsap.set(webDescs[0], { opacity: 1, x: 0 });

          const numItems = webScreens.length;
          const pinDuration = numItems * 50;

          ScrollTrigger.create({
            trigger: webSectionRef.current,
            start: "top top",
            end: `+=${pinDuration}%`,
            pin: true,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (numItems - 1),
              duration: 0.3,
              ease: "power2.inOut"
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const currentIndex = Math.round(progress * (numItems - 1));
              setActiveWebIndex(currentIndex);

              webScreens.forEach((screen, i) => {
                if (i === currentIndex) {
                  gsap.to(screen, { opacity: 1, scale: 1, duration: 0.3 });
                  gsap.to(webDescs[i], { opacity: 1, x: 0, duration: 0.3 });
                } else {
                  gsap.to(screen, { opacity: 0, scale: i < currentIndex ? 0.9 : 1.1, duration: 0.3 });
                  gsap.to(webDescs[i], { opacity: 0, x: i < currentIndex ? -30 : 40, duration: 0.3 });
                }
              });
            }
          });
        }

      } else {
        // Mobile: Show all content statically
        gsap.set([mobileScreens, webScreens], { opacity: 1, yPercent: 0, scale: 1 });
        gsap.set([mobileDescs, webDescs], { opacity: 1, y: 0, x: 0 });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="project-container" ref={containerRef}>

      {/* Work Title */}
      <h1 className="work-title">work</h1>

      {/* Mobile Apps Section */}
      <div className="scroll-container mobile-section" ref={mobileSectionRef}>
        <div className="sticky-section">
          <div className="content-wrapper">
            <div className="phone-container">
              <div className="iphone-frame">
                <div className="dynamic-island"></div>
                <div className="screen">
                  {mobileProjects.map((project) => (
                    <img
                      key={project.id}
                      src={project.screenshot}
                      alt={project.title}
                      className="screenshot"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="description-container">
              {mobileProjects.map((project, index) => (
                <div key={project.id} className="description">
                  <div className="project-header">
                    {project.appLogo && (
                      <img src={project.appLogo} alt={`${project.title} logo`} className="app-logo" />
                    )}
                    <div>
                      <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                      <h2>{project.title}</h2>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <ul className="feature-list">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation - Mobile Section */}
          <div className="nav-dots">
            {mobileProjects.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeMobileIndex === index ? 'active' : ''}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transition Spacer */}
      <div className="transition-spacer"></div>

      {/* Websites Section */}
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
                  {webProjects.map((project) => (
                    <img
                      key={project.id}
                      src={project.screenshot}
                      alt={project.title}
                      className="website-screenshot"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="description-container">
              {webProjects.map((project, index) => (
                <div key={project.id} className="description">
                  <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <ul className="feature-list">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation - Web Section */}
          <div className="nav-dots">
            {webProjects.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeWebIndex === index ? 'active' : ''}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectShowcase;