import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { X, ExternalLink, Play, Pause } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '../ui/dialog';
import MobileCase from './mobliecase';
import './projects.css';

// Memoized project card component for better performance
const ProjectCard = memo(({ project, onClick, type }) => (
  <div 
    className={`project-item ${type}-project`}
    onClick={() => onClick(project)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(project);
      }
    }}

  >
    <div className="project-item-content">
      {type === 'mobile' ? (
        <MobileCase project={project} />
      ) : (
        <div className="project-image">
          <img 
            src={project.image} 
            loading="lazy"
          />
          <div className="project-overlay">
            <Play className="play-icon" size={24} />
          </div>
        </div>
      )}
      <div className="project-info">
        <h2>{project.title}</h2>
        <div className="project-tech">
          {project.tech.join(' · ')}
        </div>
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMobileVideoLoading, setIsMobileVideoLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  
  const mobileProjects = [
    {
      id: 1,
      title: 'FurSpace',
      description: 'Pet care and tracking application for pet owners. Helps users monitor health, activities.', 
      icon: 'https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749558/furspace_logo_yrsc42.jpg',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
      tech: ['Swift', 'SwiftUI', 'CoreData','Firebase', 'HealthKit'],
      type: 'Mobile',
      year: '2024',
      features: ['Pet Care','Vet Appointments', 'Photo Gallery']
    },
    {
      id: 3,
      title: 'Wave',
      description: 'Minimal and elegant productivity application for organizing tasks,and deadlines with customizable workflows and team collaboration features.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5832/5832887.png',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
      tech: ['Swift', 'SwiftUI', 'CloudKit'],
      type: 'Mobile',
      year: '2023',
      features: ['Task Management', 'Custom Workflows',, 'Analytics']
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'Beautiful and intuitive weather application with detailed forecasts, interactive maps, and personalized weather insights for multiple locations.',
      icon: 'https://cdn-icons-png.flaticon.com/512/7133/7133364.png',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
      tech: ['Flutter', 'Dart', 'Firebase', 'Weather API'],
      type: 'Mobile',
      year: '2023',
      features: ['Live Weather', 'Forecasts', 'Location-based']
    }
  ];
  
  const webProjects = [
    {
      id: 5,
      title: 'Travellicious',
      description: 'A comprehensive travel agency website that allows users to discover, book, and experience amazing tours and treks in and around Bengaluru with real-time booking and payment processing.',
      video: 'https://res.cloudinary.com/dt9apeyvy/video/upload/v1748806790/Screen_Recording_2025-06-02_at_1.07.53_AM_ce40fa.mov',
      tech: ['React', 'Node.js', 'MongoDB','Tailwind CSS','Express', 'Stripe'],
      type: 'web',
      year: '2023',
      image: 'https://res.cloudinary.com/dt9apeyvy/image/upload/v1748749303/Screenshot_2025-06-01_at_9.10.43_AM_xwatsv.png',
      url: 'https://travellicious.co.in',
      features: ['Online Booking', 'Payment Integration', 'Tour Management', 'User Reviews']
    }
  ];
  
  const handleProjectClick = useCallback((project) => {
    setActiveProject(project);
    setOpen(true);
    setIsVideoLoading(true);
    setIsMobileVideoLoading(true);
    setIsVideoPlaying(true);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoading(false);
  }, []);

  const handleMobileVideoLoad = useCallback(() => {
    setIsMobileVideoLoading(false);
  }, []);

  const toggleVideoPlayback = useCallback(() => {
    const video = activeProject?.type === 'Mobile' ? mobileVideoRef.current : videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  }, [isVideoPlaying, activeProject?.type]);

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    // Reset video state when closing
    setTimeout(() => {
      setActiveProject(null);
      setIsVideoPlaying(true);
    }, 200);
  }, []);

  // Keyboard navigation for dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (open && e.key === 'Escape') {
        handleDialogClose();
      }
      if (open && e.key === ' ') {
        e.preventDefault();
        toggleVideoPlayback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleDialogClose, toggleVideoPlayback]);

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
          {/* <div className="projects-stats">
            <div className="stat">
              <span className="stat-number">{mobileProjects.length + webProjects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div> */}
        </div>
        
        <div className="projects-grid-column">
          <div className="projects-intro">
            <p>Selected projects Donald has created throughout his career. Each piece represents a unique challenge and solution in mobile development and web applications, showcasing expertise in modern technologies and user-centered design.</p>
          </div>
          
          {/* Mobile Projects */}
          <section className="project-category">
            <h2>Mobile Applications</h2>
            <p className="category-description">Native iOS and cross-platform mobile applications built with modern frameworks</p>
            
            <div className="mobile-projects-grid">
              {mobileProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleProjectClick}
                  type="mobile"
                />
              ))}
            </div>
          </section>
          
          {/* Web Projects */}
          <section className="project-category">
            <h2>Web Applications</h2>
            <p className="category-description">Full-stack web applications with responsive design and modern architecture</p>
            
            <div className="web-projects-grid">
              {webProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleProjectClick}
                  type="web"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Enhanced Project Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="project-dialog" hideClose>
          <button 
            className="dialog-close-btn"
            onClick={handleDialogClose}
            aria-label="Close project details"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="project-dialog-content">
            <div className="project-dialog-left">
              <div className="project-dialog-header">
                <div className="project-meta">
                  <div className="project-year-tag">{activeProject?.year}</div>
                  <div className="project-type-badge">{activeProject?.type}</div>
                </div>
                <h2>{activeProject?.title}</h2>
                <p className="project-dialog-description">{activeProject?.description}</p>
                
                {activeProject?.features && (
                  <div className="project-features">
                    <h4>Key Features</h4>
                    <ul className="features-list">
                      {activeProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="project-dialog-footer">
                <div className="project-tech-list">
                  {activeProject?.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-actions">
                  {activeProject?.type === 'web' && activeProject?.url && (
                    <a 
                      href={activeProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="visit-button"
                    >
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                  )}
                  
                  <button 
                    className="video-control-btn"
                    onClick={toggleVideoPlayback}
                    aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isVideoPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
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
                    poster={activeProject?.thumbnail}
                  />
                  <div className="iphone-home-indicator"></div>
                </div>
              ) : (
                <div className="browser-frame">
                  <div className="browser-header">
                    <div className="browser-controls">
                      <span className="browser-dot red"></span>
                      <span className="browser-dot yellow"></span>
                      <span className="browser-dot green"></span>
                    </div>
                    <div className="browser-address-bar">
                      <span>{activeProject?.url || 'https://myproject.com'}</span>
                    </div>
                    <div className="browser-refresh">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
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
                      poster={activeProject?.thumbnail}
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