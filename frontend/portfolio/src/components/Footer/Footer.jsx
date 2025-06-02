import React, { useEffect, useState, useCallback } from 'react';
import { Linkedin, Instagram, Mail, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  
  const updateTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);
  
  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [updateTime]);

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/aldified/', 
      icon: Instagram,
      ariaLabel: 'Follow me on Instagram'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/donaldcolin/', 
      icon: Linkedin,
      ariaLabel: 'Connect with me on LinkedIn'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/donaldcolin', 
      icon: Github,
      ariaLabel: 'Check out my GitHub profile'
    }
  ];

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:your.email@example.com';
  };

  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <h2>DONALD COLIN</h2>
          </div>
          
          <div className="footer-info">
            <p className="footer-location">
              Made with <span role="img" aria-label="love">❤️</span> in Bangalore, India.
            </p>
            
            <div className="footer-time">
              <span className="time-label">Local time —</span> 
              <time dateTime={new Date().toISOString()}>{currentTime}</time>
            </div>
          </div>
        </div>
        
        <div className="footer-contact-section">
          <h3 className="contact-heading">Let's Connect</h3>
          <p className="contact-text">
            Interested in working together or just want to say hi? Send me a message.
          </p>
          <a 
            href="mailto:your.email@example.com"
            className="contact-email-link"
            onClick={handleEmailClick}
            aria-label="Send me an email"
          >
            Get In Touch
            <Mail size={18} style={{ marginLeft: '8px' }} aria-hidden="true" />
          </a>
          
          <div className="contact-socials" role="list">
            {socialLinks.map((link, index) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.ariaLabel}
                role="listitem"
              >
                <link.icon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        © {new Date().getFullYear()} DONALD COLIN. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
