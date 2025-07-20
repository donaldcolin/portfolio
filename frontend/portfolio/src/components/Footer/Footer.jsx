import React, { useEffect, useState, useCallback } from 'react';
import { Linkedin, Instagram, Mail, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const updateTime = useCallback(() => {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    };
    setCurrentTime(now.toLocaleTimeString('en-US', options));
  }, []);
  
  useEffect(() => {
    setMounted(true);
    updateTime();
    const timer = setInterval(updateTime, 1000); // Update every second for smoother experience
    return () => clearInterval(timer);
  }, [updateTime]);

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/aldified/', 
      icon: Instagram,
      ariaLabel: 'Follow Donald Colin on Instagram',
      color: '#E4405F'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/donaldcolin/', 
      icon: Linkedin,
      ariaLabel: 'Connect with Donald Colin on LinkedIn',
      color: '#0077B5'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/donaldcolin', 
      icon: Github,
      ariaLabel: 'Check out Donald Colin\'s GitHub profile',
      color: '#333'
    }
  ];

  const handleEmailClick = (e) => {
    e.preventDefault();
    // Replace with actual email
    const email = 'donald.colin@example.com';
    const subject = encodeURIComponent('Hello from your website!');
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

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
              <time dateTime={new Date().toISOString()} suppressHydrationWarning>
                {currentTime}
              </time>
            </div>
          </div>
        </div>
        
        <div className="footer-contact-section">
          <h3 className="contact-heading">Let's Connect</h3>
          <p className="contact-text">
            Interested in working together or just want to say hi? Send me a message.
          </p>
          <button 
            onClick={handleEmailClick}
            className="contact-email-link"
            aria-label="Send Donald Colin an email"
          >
            Get In Touch
            <Mail size={18} style={{ marginLeft: '8px' }} aria-hidden="true" />
          </button>
          
          <div className="contact-socials" role="list" aria-label="Social media links">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.ariaLabel}
                role="listitem"
                style={{ '--hover-color': link.color }}
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