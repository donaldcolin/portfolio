import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './projects.css';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// PROJECT DATA
// ==========================================

const projects = [
  {
    id: 1,
    title: "Vehicle Expense Tracker",
    category: "Mobile App",
    description: "Comprehensive expense tracking for all vehicle-related costs",
    techStack: ["React Native", "Firebase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    size: "large",
    url: "#" // Replace with actual project URL
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Web Development",
    description: "Modern portfolio with smooth animations and dark mode",
    techStack: ["React", "GSAP", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    size: "medium",
    url: "#" // Replace with actual project URL
  },
  {
    id: 3,
    title: "Fitness Companion",
    category: "Mobile App",
    description: "Personal fitness tracking with workout plans",
    techStack: ["Flutter", "SQLite", "HealthKit"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    size: "medium",
    url: "#" // Replace with actual project URL
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Full-featured online store with payment integration",
    techStack: ["Next.js", "Stripe", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    size: "large",
    url: "#" // Replace with actual project URL
  },
  {
    id: 5,
    title: "Analytics Dashboard",
    category: "Web App",
    description: "Real-time analytics with interactive visualizations",
    techStack: ["React", "D3.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    size: "medium",
    url: "#" // Replace with actual project URL
  },
  {
    id: 6,
    title: "Task Management Pro",
    category: "Mobile App",
    description: "Smart scheduling with team collaboration",
    techStack: ["React Native", "MongoDB", "WebSocket"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    size: "medium",
    url: "#" // Replace with actual project URL
  }
];

// ==========================================
// PROJECT CARD COMPONENT
// ==========================================

const ProjectCard = ({ project, index }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card project-card--${project.size}`}
    >
      <div className="project-card__image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
        />
        <div className="project-card__overlay" />
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <span className="project-card__category">{project.category}</span>
      </div>
    </a>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 60,
          clipPath: "inset(100% 0% 0% 0%)"
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards stagger animation
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.05
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-header">
        <h1 className="projects-title" ref={titleRef}>

          <span className="projects-title__main">Work</span>
        </h1>
      </div>

      <div className="projects-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;