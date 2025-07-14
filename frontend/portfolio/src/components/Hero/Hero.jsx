import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Code, Eye } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    setIsVisible(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Update time every minute for better performance
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearInterval(timeInterval);
    };
  }, []);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Calculations for parallax and scroll effects
  const nameText = " Donald Colin • Software Developer • Business Developer •";
  const doubledNameText = nameText.repeat(4);
  
  const heroOpacity = Math.max(0, 1 - scrollY / (windowDimensions.height * 0.8));
  const imageScale = Math.max(0.95, 1 - scrollY / (windowDimensions.height * 8));
  const textTranslateY = scrollY * 0.3;
  const imageTranslateY = scrollY * 0.15;
  const parallaxOffset = mousePosition.x * 0.005; // Reduced for subtlety
  
  // Professional greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleSocialClick = (platform) => {
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
  };

  return (
    <div id="hero" className="w-full relative overflow-hidden">
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 grid-bg gpu-accelerated">
        
        {/* Subtle Floating Decoration Elements */}
        <div className="floating-element top-20 left-10 w-2 h-2 bg-slate-300" />
        <div className="floating-element top-40 right-20 w-1.5 h-1.5 bg-slate-400" />
        <div className="floating-element bottom-40 left-20 w-2.5 h-2.5 bg-slate-300" />
        <div className="floating-element top-60 right-40 w-1.5 h-1.5 bg-slate-400" />
        
        {/* Professional Background Text */}
        <div 
          className="hero-text-container absolute w-full top-1/2 left-0 -translate-y-1/2 pointer-events-none gpu-accelerated"
          style={{ 
            transform: `translateY(${textTranslateY}px) translateX(${parallaxOffset}px)`,
            opacity: heroOpacity * 0.6
          }}
        >
          <div className="animate-marquee">
            <h1 className="hero-text text-[100vw] sm:text-[120vw] md:text-[140vw] lg:text-[160vw]">
              {doubledNameText}
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
                src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1752495748/WhatsApp_Image_2025-07-14_at_17.44.04_nxrq1g.jpg" 
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
          className="absolute top-6 left-6 md:top-8 md:left-8 z-20 space-y-3 fade-in-up-delay-1"
          style={{ opacity: heroOpacity }}
        >
          <div className="glass-card py-2 px-4 rounded-xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-600" />
              Software and Business Developer
            </p>
          </div>
          <div className="glass-card py-1.5 px-3 rounded-lg">
            <p className="text-xs text-slate-600">{getGreeting()}</p>
          </div>
        </div>

        {/* Professional Social Links */}
        <div 
          className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex gap-2 fade-in-up-delay-2"
          style={{ opacity: heroOpacity }}
        >
          <button 
            onClick={() => handleSocialClick('github')}
            className="social-link glass-card p-2 rounded-lg group"
            aria-label="Visit GitHub Profile"
          >
            <Github className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
          </button>
          <button 
            onClick={() => handleSocialClick('linkedin')}
            className="social-link glass-card p-2 rounded-lg group"
            aria-label="Visit LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
          </button>
          <button 
            onClick={() => handleSocialClick('email')}
            className="social-link glass-card p-2 rounded-lg group"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
          </button>
        </div>

        {/* Bottom Right Time Info */}
        <div 
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 space-y-2 fade-in-up-delay-3"
          style={{ opacity: heroOpacity }}
        >
         
       
        </div>

        {/* Professional Scroll Indicator */}
        <button 
          onClick={scrollToAbout}
          className="scroll-down-btn absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 group fade-in-up-delay-3"
          style={{ opacity: heroOpacity * 0.9 }}
          aria-label="Scroll to explore portfolio"
        >
          <div className="glass-card rounded-xl p-3 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-semibold mb-2 text-slate-600 group-hover:text-slate-800 transition-colors">
              Explore
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-400 group-hover:border-slate-600 flex items-center justify-center scroll-animation transition-colors">
              <ChevronDown size={16} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
            </div>
          </div>
        </button>

        {/* Professional Status Indicator */}
        <div 
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 fade-in-up-delay-1"
          style={{ opacity: heroOpacity }}
        >
          <div className="glass-card rounded-lg py-2 px-3 flex items-center gap-2 status-indicator">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-xs font-medium text-slate-600">Available for projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
