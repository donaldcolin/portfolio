import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose
} from '../ui/dialog';
import MobileCase from './mobliehover';
import './projects.css';

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  
  const mobileProjects = [
    {
      id: 1,
      title: 'Layla.pets',
      description: 'Pet care and tracking application for pet owners. Helps users monitor health, activities, and schedule care for their pets.',
      thumbnail: '', 
      icon: 'https://placehold.co/200x200/5271ff/white?text=L',
      video: '/path/to/fitness-app-video.mp4',
      tech: ['Swift', 'SwiftUI', 'CoreData'],
      type: 'mobile',
      year: '2023'
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and customizable alerts for changing weather conditions.',
      thumbnail: '',
      icon: 'https://placehold.co/200x200/ff7a50/white?text=W',
      video: '/path/to/weather-app-video.mp4',
      tech: ['Swift', 'UIKit', 'CoreLocation'],
      type: 'mobile',
      year: '2022'
    },
    {
      id: 4,
      title: 'Task Manager',
      description: 'Minimal and elegant productivity application for organizing tasks, projects, and deadlines with customizable workflows.',
      thumbnail: '',
      icon: 'https://placehold.co/200x200/50c878/white?text=T',
      video: '/path/to/task-manager-video.mp4',
      tech: ['React Native', 'Expo', 'Firebase'],
      type: 'mobile',
      year: '2021'
    }
  ];
  
  const webProjects = [
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects and experience. Built with modern web technologies for optimal performance.',
      thumbnail: '',
      video: '/path/to/web-project-video.mp4',
      tech: ['React', 'Tailwind CSS', 'Vite'],
      type: 'web',
      year: '2023',
      image: 'https://placehold.co/800x500/1a1a1a/ffffff?text=Portfolio'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with product catalog, user accounts, and secure checkout process.',
      thumbnail: '',
      video: '/path/to/ecommerce-video.mp4',
      tech: ['React', 'Node.js', 'MongoDB'],
      type: 'web',
      year: '2022',
      image: 'https://placehold.co/800x500/1a1a1a/ffffff?text=E-Commerce'
    }
  ];

  const handleProjectClick = (project) => {
    setActiveProject(project);
    setOpen(true);
  };

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
                    <MobileCase project={project} onClick={() => {}} />
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
        <DialogContent className="project-dialog">
          <div className="project-dialog-content">
            <div className="project-dialog-header">
              <h2>{activeProject?.title}</h2>
              <p className="project-dialog-description">{activeProject?.description}</p>
            </div>
            
            <div className="project-dialog-media">
              {activeProject?.type === 'mobile' ? (
                <div className="iphone-frame">
                  <div className="iphone-notch"></div>
                  <video 
                    className="app-video" 
                    src={activeProject?.video} 
                    autoPlay 
                    muted 
                    loop
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
                  <video 
                    className="browser-video" 
                    src={activeProject?.video} 
                    autoPlay 
                    muted 
                    loop
                  />
                </div>
              )}
            </div>
            
            <div className="project-dialog-footer">
              <div className="project-tech-list">
                {activeProject?.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-year-tag">{activeProject?.year}</div>
            </div>
          </div>
          
          <DialogClose className="dialog-close-btn">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;