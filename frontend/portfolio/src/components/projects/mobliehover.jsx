import React, { useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { ArrowUpRight } from 'lucide-react';
import './projects.css';

const MobileCase = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <div 
      className="app-icon-container cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* App Icon (always visible) */}
      <div className="app-icon-wrapper">
        <div className={`app-icon-display ${isHovered ? 'hovered' : ''}`}>
          <AspectRatio ratio={1/1}>
            <img 
              src={project.icon || 'https://placehold.co/200x200/gray/white?text=App'} 
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        <p className="app-icon-title">{project.title}</p>
      </div>
      
      {/* Mobile Case Preview (visible on hover) */}
      {isHovered && (
        <div className="hover-preview">
          <div className="mobile-case-preview">
            <div className="mobile-case-inner-preview">
              <div className="mobile-notch-preview"></div>
              <div className="mobile-screen-preview">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="mobile-screen-content-preview"
                  />
                ) : (
                  <div className="mobile-placeholder-preview">
                    <div className="app-icon-small-preview">
                      <img 
                        src={project.icon || 'https://placehold.co/200x200/gray/white?text=App'} 
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCase;
