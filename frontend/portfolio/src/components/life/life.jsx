import React, { useEffect, useRef, useState } from 'react';

const HoverEffect = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const cursorImgRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const currentItemRef = useRef(null);
  
  const projects = [
    { id: 1, title: "The Space Between Notes", image: "https://assets.codepen.io/7558/bw-blurry-001.webp" },
    { id: 2, title: "Love as the Fourth Dimension", image: "https://assets.codepen.io/7558/bw-blurry-004.webp" },
    { id: 3, title: "The Art of Letting Go", image: "https://assets.codepen.io/7558/bw-blurry-007.webp" },
    { id: 4, title: "Creativity as Prayer", image: "https://assets.codepen.io/7558/bw-blurry-010.webp" },
    { id: 5, title: "The Universe Conspires", image: "https://assets.codepen.io/7558/bw-blurry-001.webp" }
  ];

  const defaultBg = "https://assets.codepen.io/7558/bw-blurry-005.webp";
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const getEventPos = (e) => {
    if (e.touches?.[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const getRandomRotation = () => (Math.random() - 0.5) * 20;

  const setDefaultBg = () => {
    if (!bgImageRef.current) return;
    bgImageRef.current.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    bgImageRef.current.src = defaultBg;
    bgImageRef.current.style.opacity = '0.6';
    bgImageRef.current.style.transform = 'scale(1.1)';
    bgImageRef.current.style.filter = 'blur(0)';
  };

  const updateContainerPos = (clientY) => {
    if (containerHeight > viewportHeight && containerRef.current) {
      const mouseYPercent = clientY / viewportHeight;
      const margin = 100;
      const translateYAtTop = margin;
      const translateYAtBottom = viewportHeight - containerHeight - margin;
      const translateY = translateYAtTop + mouseYPercent * (translateYAtBottom - translateYAtTop);
      containerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const calculateHeight = () => {
    setViewportHeight(window.innerHeight);
    const items = document.querySelectorAll('.project');
    const height = Array.from(items).reduce((acc, item) => acc + item.offsetHeight, 0);
    setContainerHeight(height);
  };

  const handleEnter = (imgSrc, e, itemElement) => {
    currentItemRef.current = itemElement;
    const rotation = getRandomRotation();

    if (bgImageRef.current) {
      bgImageRef.current.style.transition = 'none';
      bgImageRef.current.style.transform = `scale(1.2) rotate(${rotation}deg)`;
      bgImageRef.current.src = imgSrc;
      bgImageRef.current.style.opacity = '0.8';
    }

    const pos = getEventPos(e);
    if (cursorImgRef.current) {
      const img = cursorImgRef.current.querySelector('img');
      if (img) img.src = imgSrc;
      cursorImgRef.current.style.left = pos.x + 'px';
      cursorImgRef.current.style.top = pos.y + 'px';
      cursorImgRef.current.classList.add('visible');
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (bgImageRef.current) {
          bgImageRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          bgImageRef.current.style.transform = 'scale(1.0) rotate(0deg)';
          bgImageRef.current.style.filter = 'blur(0)';
        }
      });
    });
  };

  const handleLeave = (itemElement) => {
    setTimeout(() => {
      if (currentItemRef.current === itemElement) {
        currentItemRef.current = null;
        if (cursorImgRef.current) {
          cursorImgRef.current.classList.remove('visible');
        }
        setDefaultBg();
      }
    }, 30);
  };

  useEffect(() => {
    calculateHeight();
    setDefaultBg();
    
    // Animate in items
    const items = document.querySelectorAll('.project');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        requestAnimationFrame(() => {
          item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      }, i * 60);
    });

    const updateCursor = (e) => {
      const pos = getEventPos(e);
      if (cursorImgRef.current?.classList.contains('visible')) {
        cursorImgRef.current.classList.add('moving');
        cursorImgRef.current.style.left = pos.x + 'px';
        cursorImgRef.current.style.top = pos.y + 'px';
        setTimeout(() => cursorImgRef.current?.classList.remove('moving'), 150);
      }
      updateContainerPos(pos.y);
    };

    if (!isTouchDevice) {
      document.addEventListener('mousemove', updateCursor);
    } else {
      const touchMove = (e) => {
        e.preventDefault();
        updateCursor(e);
      };
      document.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchstart', updateCursor);
    }

    window.addEventListener('resize', calculateHeight);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <div className="hover-effect-section relative w-full h-screen overflow-hidden bg-[#1a1917] text-[#f8f5f2]">
      {/* Noise overlay - scoped to this section */}
      <div className="noise-overlay"></div>

      {/* H1 Title in top left corner */}
      <h1 className="absolute top-8 left-8 text-5xl font-extrabold uppercase tracking-tight z-[250] mix-blend-exclusion">
        Life
      </h1>

      {/* Background container - scoped to this section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img ref={bgImageRef} className="w-full h-full object-cover" crossOrigin="anonymous" alt="" />
      </div>

      {/* Main content */}
      <main className="w-full h-full flex items-center justify-center z-10 relative overflow-hidden">
        <section ref={containerRef} className="projects w-full relative z-10 flex flex-col justify-center items-center transition-transform duration-400">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project relative flex items-center justify-center text-center py-1 px-8 cursor-none transition-all duration-600 w-full overflow-hidden flex-shrink-0"
              data-image={project.image}
              onMouseEnter={(e) => !isTouchDevice && handleEnter(project.image, e, e.currentTarget)}
              onMouseLeave={(e) => !isTouchDevice && handleLeave(e.currentTarget)}
              onTouchStart={(e) => isTouchDevice && handleEnter(project.image, e, e.currentTarget)}
              onTouchEnd={(e) => isTouchDevice && setTimeout(() => handleLeave(e.currentTarget), 2000)}
            >
              <div className="project-title text-3xl font-extrabold uppercase tracking-tight whitespace-nowrap relative z-[2] mix-blend-exclusion transition-all duration-600">
                {project.title}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Gradients - scoped to this section */}
      <div className="gradient-top absolute top-0 left-0 w-full h-20 z-[200] pointer-events-none"></div>
      <div className="gradient-bottom absolute bottom-0 left-0 w-full h-20 z-[200] pointer-events-none"></div>

      {/* Cursor image - only visible within this section */}
      <div ref={cursorImgRef} className="cursor-image absolute w-[280px] h-[210px] z-[150] pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden origin-bottom-right">
        <img src="" alt="" className="w-full h-full object-cover scale-0 origin-bottom-right transition-transform duration-400" />
      </div>

      <style jsx>{`
        .hover-effect-section {
          position: relative;
          isolation: isolate;
        }

        .hover-effect-section .noise-overlay {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E") repeat;
          background-size: 200px;
          animation: noise 0.2s steps(8) infinite;
          opacity: 0.6;
          z-index: 100;
          pointer-events: none;
        }

        @keyframes noise {
          0% { transform: translate(0, 0); }
          12.5% { transform: translate(-1%, -2%); }
          25% { transform: translate(-2%, 1%); }
          37.5% { transform: translate(1%, -2%); }
          50% { transform: translate(-1%, 3%); }
          62.5% { transform: translate(-2%, 1%); }
          75% { transform: translate(2%, 0); }
          87.5% { transform: translate(0, 2%); }
          100% { transform: translate(-1%, 0); }
        }

        .project::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: #f8f5f2;
          z-index: 1;
          pointer-events: none;
          transition: height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project:hover::before {
          height: 100%;
        }

        .project:hover .project-title {
          transform: translateY(-2px);
          letter-spacing: 0.02em;
        }

        .gradient-top {
          background: linear-gradient(180deg, rgba(26, 25, 23, 0.8) 0%, transparent 100%);
        }

        .gradient-bottom {
          background: linear-gradient(0deg, rgba(26, 25, 23, 0.8) 0%, transparent 100%);
        }

        .cursor-image.moving {
          transition: left 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .cursor-image.visible img {
          transform: scale(1);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
            top: 1.5rem;
            left: 1.5rem;
          }
          .project-title {
            font-size: 1.5rem;
          }
          .project {
            padding: 0.75rem 1rem;
          }
          .cursor-image {
            width: 220px;
            height: 165px;
          }
          .gradient-top, .gradient-bottom {
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
            top: 1rem;
            left: 1rem;
          }
          .project-title {
            font-size: 1.2rem;
          }
          .project {
            padding: 0.5rem 0.5rem;
          }
          .cursor-image {
            width: 200px;
            height: 150px;
          }
          .gradient-top, .gradient-bottom {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default HoverEffect;
