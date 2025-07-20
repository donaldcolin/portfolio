import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Github, Linkedin, Mail, Code, ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowHeight, setWindowHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setIsVisible(true);

    // Optimized scroll handler with RAF throttling
    let rafId = null;
    const handleScroll = () => {
      if (rafId === null && !prefersReducedMotion) {
        rafId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          rafId = null;
        });
      }
    };

    // Throttled mouse move handler (reduced frequency)
    let mouseRafId = null;
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || mouseRafId !== null) return;
      
      mouseRafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        mouseRafId = null;
      });
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Passive event listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
    };
  }, [prefersReducedMotion]);

  const handleScrollDown = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: windowHeight, left: 0, behavior: 'smooth' });
    }
  }, [windowHeight]);

  // Memoized calculations for better performance
  const animations = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        heroOpacity: 1,
        imageScale: 1,
        textTranslateY: 0,
        imageTranslateY: 0,
        parallaxOffset: 0,
        nameText: " Donald Colin • Software Developer • Business Developer •".repeat(4)
      };
    }

    const nameText = " Donald Colin • Software Developer • Business Developer •";
    const heroOpacity = Math.max(0, 1 - scrollY / (windowHeight * 0.8));
    const imageScale = Math.max(0.95, 1 - scrollY / (windowHeight * 8));
    const textTranslateY = scrollY * 0.3;
    const imageTranslateY = scrollY * 0.15;
    const parallaxOffset = mousePosition.x * 0.003; // Reduced for subtlety

    return {
      nameText: nameText.repeat(4),
      heroOpacity,
      imageScale,
      textTranslateY,
      imageTranslateY,
      parallaxOffset
    };
  }, [scrollY, mousePosition.x, windowHeight, prefersReducedMotion]);

  const handleSocialClick = useCallback((platform) => {
    const urls = {
      github: 'https://github.com/donaldcolin',
      linkedin: 'https://linkedin.com/in/donaldcolin',
      email: 'mailto:donald@example.com'
    };
    
    if (platform === 'email') {
      window.location.href = urls[platform];
    } else {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  }, []);

  const socialLinks = useMemo(() => [
    { platform: 'github', icon: Github, label: 'GitHub' },
    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { platform: 'email', icon: Mail, label: 'Email' }
  ], []);

  // Early return if not visible
  if (!isVisible) {
    return <div className="w-full h-screen bg-slate-50" />;
  }

  return (
    <div className="hero-container">
      <div id="hero" className="w-full relative overflow-hidden">
        <div 
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 grid-bg"
          style={{ willChange: 'transform' }}
        >
          
          {/* Simplified Floating Decoration Elements */}
          <div className="floating-element top-20 left-10 w-2 h-2 bg-gradient-to-r from-blue-300 to-purple-300" />
          <div className="floating-element top-40 right-20 w-1.5 h-1.5 bg-gradient-to-r from-green-300 to-blue-300" />
          <div className="floating-element bottom-40 left-20 w-2.5 h-2.5 bg-gradient-to-r from-purple-300 to-pink-300" />
          
          {/* Background Text */}
          <div 
            className="hero-text-container absolute w-full top-1/2 left-0 -translate-y-1/2 pointer-events-none"
            style={{ 
              transform: `translateY(${animations.textTranslateY}px) translateX(${animations.parallaxOffset}px)`,
              opacity: animations.heroOpacity * 0.6,
              willChange: 'transform, opacity'
            }}
          >
            <div className="animate-marquee">
              <h1 className="hero-text text-[100vw] sm:text-[120vw] md:text-[140vw] lg:text-[160vw]">
                {animations.nameText}
              </h1>
            </div>
          </div>

        {/* Professional Profile Image */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 gpu-accelerated fade-in-up"
          style={{ 
            transform: `translateY(${imageTranslateY}px) scale(${imageScale}) translateX(${-parallaxOffset}px)`,
            opacity: heroOpacity
          }}
        >
          <div className="profile-image-container aspect-[3/4] relative">
            <div className="profile-image-wrapper">
              <img 
                ref={imageRef}
                src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1748705872/WhatsApp_Image_2025-05-31_at_21.05.41_a2nd4q.jpg" 
                alt="Donald Colin - Full Stack Developer & Strategist" 
                className="profile-image gpu-accelerated"
                loading="eager"
              />
              <div className="profile-image-overlay" />
              
              
            </div>
          </div>
        </div>

          {/* Top Left Info */}
          <div 
            className="absolute top-6 left-6 md:top-8 md:left-8 z-20 fade-in-up-delay-1"
            style={{ opacity: animations.heroOpacity }}
          >
            <div className="glass-card py-2 px-4 rounded-xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 flex items-center gap-2">
                <Code className="w-4 h-4 text-slate-600" />
                Software and Business Developer
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div 
            className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex gap-2 fade-in-up-delay-2"
            style={{ opacity: animations.heroOpacity }}
          >
            {socialLinks.map(({ platform, icon: Icon, label }) => (
              <button 
                key={platform}
                onClick={() => handleSocialClick(platform)}
                className="social-link glass-card p-2 rounded-lg group"
                aria-label={`Visit ${label} Profile`}
              >
                <Icon className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <span className="tooltip">{label}</span>
              </button>
            ))}
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={handleScrollDown}
            className="absolute bottom-8 left-8 z-20 flex items-center gap-3 fade-in-up-delay-3 floating-scroll-btn transition-opacity"
            style={{ opacity: animations.heroOpacity * 0.9 }}
            aria-label="Scroll down"
          >
            <div className="flex items-center">
              <div className="scroll-btn-circle flex items-center justify-center rounded-full">
                <ArrowDown size={22} className="text-slate-400" />
              </div>
              <span className="scroll-down-label">Scroll Down</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
