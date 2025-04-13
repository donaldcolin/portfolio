import React, { useState, useEffect } from 'react';
import { Home, Rocket, Layout, User, Mail, Instagram, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop; 
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const sections = navItems
      .filter(item => !item.href.startsWith('http'))
      .map(item => document.getElementById(item.id));

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);
  
  const navItems = [
    { id: 'hero', icon: Home, href: '#hero' },
    { id: 'about', icon: User, href: '#about' },
    { id: 'projects', icon: Rocket, href: '#projects' },
  
    { id: 'contact', icon: Mail, href: '#contact' },
    { id: 'linkedin', icon: Linkedin, href: 'https://www.linkedin.com/in/donaldcolin/' },
    { id: 'instagram', icon: Instagram, href: 'https://www.instagram.com/aldified/' }
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