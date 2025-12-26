// ServicesPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import './processes.css';

gsap.registerPlugin(SplitText);

export default function ServicesPage() {
    const services = [
        {
            id: 1,
            title: 'Website Consultation',
            icon: '🖥️',
            process: [
                'Initial discovery call to understand your business goals and target audience',
                'Comprehensive site audit analyzing UX, performance, and conversion metrics',
                'Competitive analysis and industry best practices research',
                'Strategic recommendations document with prioritized action items',
                'Follow-up session to discuss implementation roadmap'
            ]
        },
        {
            id: 2,
            title: 'Apps',
            icon: '📱',
            process: [
                'Requirements gathering and feature specification workshop',
                'User flow mapping and wireframe development',
                'Native or cross-platform technology stack recommendation',
                'Iterative development with bi-weekly sprint reviews',
                'Quality assurance testing and app store deployment',
                'Post-launch monitoring and optimization support'
            ]
        },
        {
            id: 3,
            title: 'Design & Product Management',
            icon: '🎨',
            process: [
                'Stakeholder interviews to align vision and objectives',
                'User research and persona development',
                'Product roadmap creation with clear milestones',
                'Design system development for brand consistency',
                'Prototyping and user testing iterations',
                'Cross-functional team coordination and delivery management'
            ]
        }
    ];

    const [activeService, setActiveService] = useState(services[0]);
    const titleRefs = useRef([]);
    const splitInstances = useRef([]);

    // Initialize SplitText on mount
    useEffect(() => {
        titleRefs.current.forEach((el, index) => {
            if (el) {
                splitInstances.current[index] = new SplitText(el, {
                    type: 'chars',
                    charsClass: 'split-char'
                });
            }
        });

        return () => {
            splitInstances.current.forEach(split => {
                if (split) split.revert();
            });
        };
    }, []);

    const handleMouseEnter = (service, index) => {
        setActiveService(service);

        const split = splitInstances.current[index];
        if (split && split.chars) {
            gsap.killTweensOf(split.chars);
            gsap.fromTo(split.chars,
                {
                    yPercent: 0
                },
                {
                    yPercent: -20,
                    stagger: 0.02,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(split.chars, {
                            yPercent: 0,
                            stagger: 0.02,
                            duration: 0.2,
                            ease: 'power2.inOut'
                        });
                    }
                }
            );
        }
    };

    const handleMouseLeave = (index) => {
        const split = splitInstances.current[index];
        if (split && split.chars) {
            gsap.to(split.chars, {
                yPercent: 0,
                stagger: 0.01,
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    };

    return (
        <div className="processes-container">
            <div className="processes-content">
                <header className="processes-header">
                    <h1 className="processes-title">Services</h1>
                    <p className="processes-subtitle">Hover to explore the process</p>
                    <a
                        href="https://cal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                    >
                        <span className="cta-icon">📞</span>
                        Book a 5 min call
                    </a>
                </header>

                <div className="processes-split-layout">
                    {/* Left Column: Service Titles */}
                    <div className="services-list">
                        <nav className="services-nav">
                            <ul>
                                {services.map((service, index) => (
                                    <li
                                        key={service.id}
                                        onMouseEnter={() => handleMouseEnter(service, index)}
                                        onMouseLeave={() => handleMouseLeave(index)}
                                        className={activeService?.id === service.id ? 'active' : ''}
                                    >
                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                            <span
                                                className="service-link-text"
                                                ref={el => titleRefs.current[index] = el}
                                            >
                                                {service.title}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Right Column: Process Details */}
                    <div className="service-details">
                        {activeService ? (
                            <div className="details-card fade-in" key={activeService.id}>
                                <div className="details-header">
                                    <span className="details-icon">{activeService.icon}</span>
                                    <h2 className="details-title">{activeService.title}</h2>
                                </div>

                                <div className="process-steps">
                                    <h3 className="steps-heading">The Process</h3>
                                    <ul className="steps-list">
                                        {activeService.process.map((step, index) => (
                                            <li key={index} className="step-item">
                                                <span className="step-count">{index + 1}</span>
                                                <span className="step-text">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="details-placeholder">
                                <p>Select a service to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
