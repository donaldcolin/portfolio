import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '../ui/dialog';
import MobileCase from './mobliecase';
import './projects.css';

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMobileVideoLoading, setIsMobileVideoLoading] = useState(true);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  
  const mobileProjects = [
    {
      id: 1,
      title: 'FurSpace',
      description: 'Pet care and tracking application for pet owners. Helps users monitor health, activities, and schedule care for their pets.',
      thumbnail: '', 
      icon: 'https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749558/furspace_logo_yrsc42.jpg',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
      tech: ['Swift', 'SwiftUI', 'CoreData','Firebase'],
      type: 'Mobile',
      year: '2024'
    },
    {
      id: 3,
      title: 'Wave',
      description: 'Minimal and elegant productivity application for organizing tasks, projects, and deadlines with customizable workflows.',
      thumbnail: '',
      icon: 'https://cdn-icons-png.flaticon.com/512/5832/5832887.png',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
      tech: ['Swift', 'SwiftUI'],
      type: 'Mobile',
      year: '2023'
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'Minimal and elegant productivity application for organizing tasks, projects, and deadlines with customizable workflows.',
      thumbnail: '',
      icon: 'https://cdn-icons-png.flaticon.com/512/7133/7133364.png',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
      tech: ['Flutter', 'Dart', 'Firebase'],
      type: 'Mobile',
      year: '2023'
    }
  ];
  
  const webProjects = [
    {
      id: 5,
      title: 'Travellicious',
      description: 'A website for a travel agency that allows users to Tours and Treks in and around Bengaluru.',
      thumbnail: '',
      video: 'https://res.cloudinary.com/dt9apeyvy/video/upload/v1748806790/Screen_Recording_2025-06-02_at_1.07.53_AM_ce40fa.mov',
      tech: ['React', 'Node.js', 'MongoDB','Tailwind CSS','Express',],
      type: 'web',
      year: '2023',
      image: 'https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749303/Screenshot_2025-06-01_at_9.10.43_AM_xwatsv.png'
    }
  ];
  
  const handleProjectClick = (project) => {
    setActiveProject(project);
    setOpen(true);
    setIsVideoLoading(true);
    setIsMobileVideoLoading(true);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleMobileVideoLoad = () => {
    setIsMobileVideoLoading(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.load();
    }
  }, [activeProject]);

  return (
    <div id="projects" className="projects-container">
      <div className="projects-content">
        <div className="projects-title-column">
          <h1>Work</h1>
        </div>
        
        <div className="projects-grid-column">
          <div className="projects-intro">
            <p>Selected projects Donald has created throughout his career. Each piece represents a unique challenge and solution in mobile development and web applications.</p>
          </div>
          
          {/* Mobile Projects */}
          <div className="project-category">
            <h2>Mobile Applications</h2>
            
            <div className="mobile-projects-grid">
              {mobileProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-item mobile-project"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="project-item-content">
                    <MobileCase project={project} />
                    <div className="project-info">
                      <div className="project-year">{project.year}</div>
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-tech">
                        {project.tech.join(' · ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Web Projects */}
          <div className="project-category">
            <h2>Web Projects</h2>
            
            <div className="web-projects-grid">
              {webProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-item web-project"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <div className="project-year">{project.year}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tech">
                      {project.tech.join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="project-dialog" hideClose>
          <button 
            className="dialog-close-btn"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="project-dialog-content">
            <div className="project-dialog-left">
              <div className="project-dialog-header">
                <div className="project-year-tag">{activeProject?.year}</div>
                <h2>{activeProject?.title}</h2>
                <p className="project-dialog-description">{activeProject?.description}</p>
              </div>
              
              <div className="project-dialog-footer">
                <div className="project-tech-list">
                  {activeProject?.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {activeProject?.type === 'web' && (
                  <a 
                    href="https://travellicious.co.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="visit-button"
                  >
                    Visit Website
                    <svg 
                      className="visit-arrow" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="project-dialog-media">
              {activeProject?.type === 'Mobile' ? (
                <div className="iphone-frame">
                  <div className="iphone-notch"></div>
                  {isMobileVideoLoading && (
                    <div className="video-preloader">
                      <div className="preloader-spinner"></div>
                      <span>Loading preview...</span>
                    </div>
                  )}
                  <video 
                    ref={mobileVideoRef}
                    className="app-video" 
                    src={activeProject?.video} 
                    autoPlay 
                    muted 
                    loop
                    playsInline
                    onLoadedData={handleMobileVideoLoad}
                  />
                  <div className="iphone-home-indicator"></div>
                </div>
              ) : (
                <div className="browser-frame">
                  <div className="browser-header">
                    <div className="browser-controls">
                      <span className="browser-dot"></span>
                      <span className="browser-dot"></span>
                      <span className="browser-dot"></span>
                    </div>
                    <div className="browser-address-bar">
                      <span>https://myproject.com</span>
                    </div>
                  </div>
                  <div className="browser-content">
                    {isVideoLoading && (
                      <div className="video-preloader">
                        <div className="preloader-spinner"></div>
                        <span>Loading preview...</span>
                      </div>
                    )}
                    <video 
                      ref={videoRef}
                      className="browser-video" 
                      src={activeProject?.video} 
                      autoPlay 
                      muted 
                      loop
                      playsInline
                      onLoadedData={handleVideoLoad}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;