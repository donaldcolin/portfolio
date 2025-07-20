import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Home, Rocket, User, Heart } from 'lucide-react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Memoize navigation items to prevent re-creation
  const navItems = useMemo(() => [
    { id: 'hero', icon: Home, label: 'Home', href: '#hero' },
    { id: 'about', icon: User, label: 'About', href: '#about' },
    { id: 'projects', icon: Rocket, label: 'Projects', href: '#projects' },
    { id: 'life', icon: Heart, label: 'Life', href: '#life' }
  ], []);

  // Optimized scroll handler with debouncing
  const handleScrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveTab(id);
    }
  }, []);

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let rafId = null;
    let timeoutId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Hide navbar when scrolling down, show when scrolling up or at top
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY <= 150) {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);

        // Debounced section detection
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const sections = navItems
            .filter(item => !item.href.startsWith('http'))
            .map(item => ({
              id: item.id,
              element: document.getElementById(item.id)
            }))
            .filter(({ element }) => element);

          // Find the section closest to the top of the viewport
          let currentSection = null;
          let minDistance = Infinity;

          sections.forEach(({ id, element }) => {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            // Consider section active if it's in the upper portion of viewport
            if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0 && distance < minDistance) {
              minDistance = distance;
              currentSection = id;
            }
          });

          if (currentSection && currentSection !== activeTab) {
            setActiveTab(currentSection);
          }
        }, 100);

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY, activeTab, navItems]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, itemId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScrollTo(itemId);
    }
  }, [handleScrollTo]);

  return (
    <div 
      className={`fixed bottom-6 left-0 right-0 flex justify-center z-50 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <nav className="relative group">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
        
        {/* Main navigation container */}
        <div className="relative flex items-center gap-2 px-4 py-3">
          {navItems.map((item, index) => {
            const isExternal = item.href.startsWith('http');
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id} className="relative group/item">
                <button
                  onClick={() => !isExternal && handleScrollTo(item.id)}
                  onKeyDown={(e) => !isExternal && handleKeyDown(e, item.id)}
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl
                    transition-all duration-300 ease-out
                    focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
                    active:scale-90
                    ${isActive 
                      ? 'bg-white text-black shadow-lg scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    willChange: 'transform'
                  }}
                >
                  <item.icon 
                    className={`transition-all duration-300 ${
                      isActive ? 'h-5 w-5 stroke-2' : 'h-4.5 w-4.5 stroke-1.5'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                
                {/* Enhanced tooltip */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 pointer-events-none">
                  <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl border border-white/10">
                    {item.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 -mt-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;