import React, { useState, useEffect } from 'react';
import { Home, Rocket, User, Heart } from 'lucide-react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter(item => !item.href.startsWith('http'))
        .map(item => ({
          id: item.id,
          element: document.getElementById(item.id)
        }));

      // Find the section that's currently in view
      const currentSection = sections.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        // Consider a section "active" when it's in the middle of the viewport
        return rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3;
      });

      if (currentSection) {
        setActiveTab(currentSection.id);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'hero', icon: Home, href: '#hero' },
    { id: 'about', icon: User, href: '#about' },
    { id: 'projects', icon: Rocket, href: '#projects' },
    { id: 'life', icon: Heart, href: '#life' }
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
      <nav className="bg-gradient-to-r from-black/90 via-black/85 to-black/90 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xl border border-gray-800">
        <div className="flex items-center">
          {navItems.map((item) => {
            const isExternal = item.href.startsWith('http');
            return (
              <a
                key={item.id}
                href={isExternal ? item.href : `#${item.id}`}
                onClick={(e) => {
                  if (!isExternal) {
                    e.preventDefault();
                    handleScrollTo(item.id);
                  }
                }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                  activeTab === item.id 
                    ? 'bg-white text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                } transition-all duration-200 mx-1`}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                <item.icon className={`h-4.5 w-4.5 ${activeTab === item.id ? 'stroke-2' : 'stroke-1'}`} />
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;