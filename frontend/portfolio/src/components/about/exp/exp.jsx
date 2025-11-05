import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapSetup';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register plugin
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// Life event data
const lifeEvents = [
  {
    year: '2018',
    title: 'Joined College',
    description: 'Started my B.Tech in Computer Science at Example University.',
  },
  {
    year: '2022',
    title: 'Graduated',
    description: 'Completed my degree with a specialization in web development.',
  },
  {
    year: '2022',
    title: 'First Job',
    description: 'Joined XYZ Corp as a Junior Frontend Developer.',
  },
  {
    year: '2024',
    title: 'Changed Fields',
    description: 'Pivoted to follow my passion for UI/UX and product design.',
  },
  {
    year: 'Present',
    title: 'Freelancing',
    description: 'Building cool projects (like this portfolio!) for clients.',
  },
];

const LifeTimeline = () => {
  const mainContainerRef = useRef(null);
  const horizontalRef = useRef(null);
  const planeRef = useRef(null);
  const pathRef = useRef(null);
  const maskPathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create mask path for dotted line animation
      if (pathRef.current && maskPathRef.current) {
        const clone = pathRef.current.cloneNode(true);
        clone.removeAttribute('id');
        clone.setAttribute('stroke', 'white');
        clone.setAttribute('stroke-width', '6');
        clone.removeAttribute('opacity');
        maskPathRef.current.appendChild(clone);

        gsap.set(maskPathRef.current.querySelector('path'), {
          attr: { 'stroke-dasharray': '10 10' },
        });
      }

      const sections = gsap.utils.toArray('.timeline-card');

      // ✅ Horizontal scroll animation (Right ➜ Left)
      gsap.to(horizontalRef.current, {
        x: () => horizontalRef.current.scrollWidth - window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Set initial plane origin
      gsap.set(planeRef.current, {
        transformOrigin: '50% 50%',
        xPercent: -50,
        yPercent: -50,
      });

      // ✅ Plane animation (Right ➜ Left direction)
      gsap.to(planeRef.current, {
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
          scrub: 1,
          id: 'plane-animation',
        },
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 1,
          end: 0, // Reverse direction
        },
        ease: 'none',
      });

      // Path reveal animation
      gsap.to(maskPathRef.current.querySelector('path'), {
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
          scrub: 1,
          id: 'path-reveal',
        },
        attr: {
          'stroke-dashoffset': function () {
            const path = maskPathRef.current.querySelector('path');
            return -path.getTotalLength() * 2;
          },
        },
        ease: 'none',
      });

      // Fade-in animation for cards
      sections.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: 'top top',
            end: () => `+=${horizontalRef.current.scrollWidth - window.innerWidth}`,
            scrub: 1,
            id: `card-${i}`,
          },
          opacity: 0,
          y: 100,
          ease: 'none',
        });
      });

      // Smooth refresh after layout stabilization
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, mainContainerRef);

    // Refresh on resize
    const handleResize = () => {
      clearTimeout(window._resizeTimeout);
      window._resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={mainContainerRef}
      className="relative bg-black text-white overflow-hidden min-h-screen"
    >
      <div
        ref={horizontalRef}
        className="flex items-center h-screen relative"
        style={{ width: 'max-content' }}
      >
        {/* SVG Path Background */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5000 800"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <mask id="pathMask" maskUnits="userSpaceOnUse">
                <g ref={maskPathRef}></g>
              </mask>
            </defs>

            {/* Base path */}
            <path
              d="M 200 400 
                 C 400 400, 500 200, 700 200
                 C 900 200, 1000 600, 1200 600
                 C 1400 600, 1500 300, 1700 300
                 C 1900 300, 2000 550, 2200 550
                 C 2400 550, 2500 250, 2700 250
                 C 2900 250, 3000 500, 3200 500
                 C 3400 500, 3500 350, 3700 350
                 C 3900 350, 4000 450, 4200 450
                 C 4400 450, 4600 400, 4800 400"
              fill="none"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.2"
            />

            {/* Masked path */}
            <g mask="url(#pathMask)">
              <path
                ref={pathRef}
                id="motionPath"
                d="M 200 400 
                   C 400 400, 500 200, 700 200
                   C 900 200, 1000 600, 1200 600
                   C 1400 600, 1500 300, 1700 300
                   C 1900 300, 2000 550, 2200 550
                   C 2400 550, 2500 250, 2700 250
                   C 2900 250, 3000 500, 3200 500
                   C 3400 500, 3500 350, 3700 350
                   C 3900 350, 4000 450, 4200 450
                   C 4400 450, 4600 400, 4800 400"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="10 10"
              />
            </g>

            {/* Plane */}
            <g ref={planeRef}>
              <svg x="-25" y="-25" width="50" height="50" viewBox="0 0 40 40">
                <path
                  d="M 20 5 L 30 25 L 20 23 L 20 32 L 17 30 L 17 23 L 10 25 L 20 5 Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </svg>
            </g>
          </svg>
        </div>

        {/* Title Section */}
        <div
          className="flex-shrink-0 h-screen flex flex-col items-center justify-center px-20 relative z-20"
          style={{ width: '100vw' }}
        >
          <h2 className="text-7xl font-bold text-white mb-6">
            My Life's Journey
          </h2>
        </div>

        {/* Timeline Cards */}
        {lifeEvents.map((event, index) => (
          <div
            key={index}
            className="timeline-card flex-shrink-0 h-screen flex items-center justify-center px-10 relative z-20"
            style={{ width: '60vw' }}
          >
            <div className="max-w-xl bg-zinc-900 p-12 rounded-2xl border border-zinc-800">
              <span className="text-8xl font-bold text-white block mb-6">
                {event.year}
              </span>
              <h3 className="text-5xl font-bold text-white mb-6">
                {event.title}
              </h3>
              <p className="text-2xl text-zinc-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}

        {/* End Section */}
        <div
          className="flex-shrink-0 h-screen flex items-center justify-center px-20"
          style={{ width: '100vw' }}
        >
          <div className="text-center">
            <h3 className="text-6xl font-bold text-white mb-4">
              The Journey Continues...
            </h3>
            <p className="text-2xl text-zinc-400">More adventures ahead</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeTimeline;
