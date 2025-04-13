import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Linkedin, Instagram, Twitter, Mail, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/aldified/', icon: Instagram },
    { name: 'Twitter', url: 'https://twitter.com/', icon: Twitter },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/your-username', icon: Github }
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <h2>DONALD COLIN</h2>
          </div>
          
          <div className="footer-info">
            <p className="footer-location">
              Made with love in Bangalore, India.
            </p>
            
            <div className="footer-time">
              <span className="time-label">Local time —</span> {currentTime}
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
          >
            Get In Touch
            <Mail size={18} style={{ marginLeft: '8px' }} />
          </a>
          
          <div className="contact-socials">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.name}
              >
                <link.icon size={20} />
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
