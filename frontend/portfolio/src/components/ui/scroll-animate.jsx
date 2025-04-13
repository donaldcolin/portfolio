import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from "../../lib/utils"; // Assuming you have this utility for class merging

const ScrollAnimate = ({ children, className, animation = 'fade-in-up', threshold = 0.1, triggerOnce = true, delay = 'delay-100' }) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: triggerOnce,
  });

  // Define animation classes based on the animation type
  const getAnimationClasses = () => {
    if (!inView) return 'opacity-0';
    
    switch (animation) {
      case 'fade-in':
        return 'opacity-100';
      case 'fade-in-up':
        return 'opacity-100 translate-y-0';
      case 'fade-in-down':
        return 'opacity-100 translate-y-0';
      case 'fade-in-left':
        return 'opacity-100 translate-x-0';
      case 'fade-in-right':
        return 'opacity-100 translate-x-0';
      case 'zoom-in':
        return 'opacity-100 scale-100';
      case 'slide-in-right':
        return 'opacity-100 translate-x-0';
      case 'slide-in-left':
        return 'opacity-100 translate-x-0';
      case 'fade-up':
        return 'opacity-100 translate-y-0';
      case 'fade-down':
        return 'opacity-100 translate-y-0';
      default:
        return 'opacity-100';
    }
  };

  // Define initial transformation states
  const getInitialStyles = () => {
    if (inView) return '';
    
    switch (animation) {
      case 'fade-in':
        return 'opacity-0';
      case 'fade-in-up':
        return 'opacity-0 translate-y-8';
      case 'fade-in-down':
        return 'opacity-0 -translate-y-8';
      case 'fade-in-left':
        return 'opacity-0 -translate-x-8';
      case 'fade-in-right':
        return 'opacity-0 translate-x-8';
      case 'zoom-in':
        return 'opacity-0 scale-95';
      case 'slide-in-right':
        return 'opacity-0 translate-x-16';
      case 'slide-in-left':
        return 'opacity-0 -translate-x-16';
      case 'fade-up':
        return 'opacity-0 translate-y-12';
      case 'fade-down':
        return 'opacity-0 -translate-y-12';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out', // Base transition
        delay, // Animation delay
        inView ? getAnimationClasses() : getInitialStyles(), // Apply animation when in view
        className // Allow additional classes
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate; 