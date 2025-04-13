import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Text for marquee - capitalize for cursive
  const nameText = "   Donald Colin      "; 
  const doubledNameText = nameText.repeat(4); // Reduced repetition

  // Calculate reduced opacity based on scroll
  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));
  const imageScale = Math.max(0.9, 1 - scrollY / (window.innerHeight * 3));
  const textTranslateY = scrollY * 0.4; // Parallax for the container
  const imageTranslateY = scrollY * 0.2;

  return (
    <div id="hero" className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden bg-[#f9f9f9] grid-bg">
        {/* Large typography in background - Marquee Effect */}
        <div 
          className="hero-text-container absolute w-full top-1/2 left-0 -translate-y-1/2 pointer-events-none"
          style={{ 
            transform: `translateY(${textTranslateY}px)`,
            opacity: heroOpacity
          }}
        >
          <div className="animate-marquee">
            {/* Increased font size significantly */}
            <h1 className="hero-text text-[150vw] sm:text-[180vw] md:text-[200vw] lg:text-[220vw]">
              {doubledNameText}
            </h1>
          </div>
        </div>

        {/* Centered profile image */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ 
            transform: `translateY(${imageTranslateY}px) scale(${imageScale})`,
            opacity: heroOpacity
          }}
        >
          <div className="profile-image-container w-[55vw] sm:w-[45vw] md:w-[35vw] lg:w-[30vw] max-w-md aspect-[3/4] relative rounded-lg overflow-hidden">
            {/* TODO: Replace with your actual profile photo URL */}
            <img 
              src="https://placehold.co/800x1000/e2e8f0/000000?text=YOUR+PHOTO" 
              alt="Profile" 
              className="w-full h-full object-cover profile-image"
            />
          </div>
        </div>

        {/* Subtitle/Creative text */}
        <div 
          className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border border-gray-200">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-800">
             Developer & Strategist {/* Shortened subtitle */}
            </p>
          </div>
        </div>

        {/* Year and additional branding */}
        <div 
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full py-1 px-3 border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-600">©{new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Scroll down button */}
        <button 
          onClick={scrollToAbout}
          className="scroll-down-btn absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center transition-opacity"
          style={{ opacity: heroOpacity }}
        >
          <span className="text-[10px] uppercase tracking-widest font-medium mb-1.5 text-gray-600">Scroll</span>
          <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center">
            <ChevronDown size={16} className="text-gray-600 animate-bounce" style={{ animationDuration: '1.5s' }}/>
          </div>
        </button>
      </div>

      
    </div>
  );
};

export default Hero;