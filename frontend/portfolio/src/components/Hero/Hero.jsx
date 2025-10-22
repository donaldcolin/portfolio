import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Github, Linkedin, Mail, Code, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowHeight, setWindowHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef(null);
  const imageRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized event handlers
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setIsVisible(true);

    let scrollTimeout;
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 16);
    };

    let mouseMoveTimeout;
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
      clearTimeout(mouseMoveTimeout);
    };
  }, [prefersReducedMotion]);

  const handleScrollDown = useCallback(() => {
    const target = document.getElementById('about');
    const scrollTarget = target ? '#about' : windowHeight;
    gsap.to(window, { duration: 1, scrollTo: { y: scrollTarget, offsetY: 0 }, ease: 'power2.out' });
  }, [windowHeight]);

  const animations = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        heroOpacity: 1,
        imageScale: 1,
        textTranslateY: 0,
        imageTranslateY: 0,
        parallaxOffset: 0,
      };
    }

    const heroOpacity = Math.max(0, 1 - scrollY / (windowHeight * 0.8));
    const imageScale = Math.max(0.98, 1 - scrollY / (windowHeight * 12));
    const textTranslateY = scrollY * 0.15;
    const imageTranslateY = scrollY * 0.08;
    const parallaxOffset = mousePosition.x * 0.001;

    return {
      heroOpacity,
      imageScale,
      textTranslateY,
      imageTranslateY,
      parallaxOffset,
    };
  }, [scrollY, mousePosition.x, windowHeight, prefersReducedMotion]);

  const handleSocialClick = useCallback((platform) => {
    const urls = {
      github: 'https://github.com/donaldcolin',
      linkedin: 'https://linkedin.com/in/donaldcolin',
      email: 'mailto:dcolin207@gmail.com' // Using mailto: for email clients
    };
    if (platform === 'email') {
      window.location.href = urls.email;
    } else {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  }, []);

  const socialLinks = useMemo(() => [
    { platform: 'github', icon: Github, label: 'GitHub' },
    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { platform: 'email', icon: Mail, label: 'Email' }
  ], []);

  if (!isVisible) {
    return <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-gray-100" />;
  }

  return (
    <div className="relative w-full">
      <div id="hero" className="w-full relative overflow-hidden">
        <div
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
          }}
        >
          {/* Background Gradients */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              zIndex: 2,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.06) 0%, transparent 60%),
                radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 60%)
              `
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              zIndex: 3,
              backgroundImage: `
                linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '140px 140px'
            }}
          />

          {/* Main Content */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 10 }}
          >
            <div
              className="relative"
              style={{
                transform: `translateY(${animations.imageTranslateY}px) scale(${animations.imageScale})`,
                opacity: animations.heroOpacity,
                willChange: 'transform, opacity'
              }}
            >
              <div className="relative w-80 h-106 md:w-96 md:h-[28rem]">
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/90"
                >
                  <img
                    ref={imageRef}
                    src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1759164079/WhatsApp_Image_2025-09-29_at_22.03.21_ragkdn.jpg"
                    alt="Donald Colin - Full Stack Developer & Strategist"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* UI Elements */}
          <div style={{ zIndex: 20 }}>
            {/* Top Left Info */}
            <div
              className="absolute top-6 left-6 md:top-8 md:left-8"
              style={{ opacity: animations.heroOpacity }}
            >
              <div className="py-2 px-4 rounded-xl shadow-lg bg-white/90">
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Code className="w-8 h-8 text-slate-600" />
                  Donald colin
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-2"
              style={{ opacity: animations.heroOpacity }}
            >
              {socialLinks.map(({ platform, icon: Icon, label }) => (
                <button
                  key={platform}
                  onClick={() => handleSocialClick(platform)}
                  className="relative group p-2.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 bg-white/90"
                  aria-label={`Visit ${label} Profile`}
                >
                  <Icon className="w-4 h-4 text-slate-600 group-hover:text-slate-800" />
                </button>
              ))}
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={handleScrollDown}
              className="absolute bottom-8 left-8 flex items-center gap-3 transition-opacity duration-300"
              style={{ opacity: animations.heroOpacity * 0.9 }}
              aria-label="Scroll down"
            >
              <div className="flex items-center gap-2 py-2 px-3 rounded-full shadow-lg bg-white/90">
                <ArrowDown size={16} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Scroll</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;