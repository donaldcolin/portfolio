import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import './projects.css';

const MobileCase = ({ project, onClick }) => {
  return (
    <div 
      className="app-icon-container cursor-pointer"
      onClick={onClick}
    >
      {/* App Icon (always visible) */}
      <div className="app-icon-wrapper">
        <div className="app-icon-display">
          <AspectRatio ratio={1/1}>
            <img 
              src={project.icon || 'https://placehold.co/200x200/gray/white?text=App'} 
              alt={project.title}
              className="object-cover w-full h-full rounded-2xl"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default MobileCase;
