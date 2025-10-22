import React, { useState, useEffect, useRef } from 'react';
import './life.css';


const Life = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const photoViewerRef = useRef(null);

  const lifeUpdates = [
    {
      id: 1,
      date: "November 2024",
      title: "Moved to Bengaluru",
      description: "Moved to B'Luru for a  Better Full Time.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748806487/bangalore_hkxd2j.jpg",
      category: "Career"
    },
    {
      id: 2,
      date: "February 2024",
      title: "Kerala Road Trip",
      description: "Went to kerela on a road trip with a friend.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748806074/WhatsApp_Image_2025-06-01_at_22.08.29_hc09rt.jpg",
      category: "Adventure"
    },
    {
      id: 3,
      date: "January 2025",
      title: "New Project Launch",
      description: "Successfully launched a website that helps travelers plan their trips.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748789992/WhatsApp_Image_2025-06-01_at_20.29.22_catotm.jpg",
      category: "Work"
    },
    {
      id: 4,
      date: "March 2025",
      title: "Got a Onsite Oppurtunity In Yenepoya University",
      description: "",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748789719/WhatsApp_Image_2025-06-01_at_20.24.34_rhbih7.jpg",
      category: "Business"
    }
  ];

  useEffect(() => {
    // Simulate loading time for images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? lifeUpdates.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === lifeUpdates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div id="life" className="projects-container overlap-life">
      <div className="projects-content">
        <div className="projects-title-column">
          <h1>Life</h1>
        </div>

        <div className="life-gallery-column">
          <div 
            className={`photo-viewer ${isLoading ? 'loading' : ''}`}
            ref={photoViewerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="photo-viewer-image">
              <img 
                src={lifeUpdates[currentIndex].image} 
                alt={lifeUpdates[currentIndex].title}
                onLoad={handleImageLoad}
                style={{ opacity: isLoading ? 0 : 1 }}
              />
              <div className="photo-caption">
                <span className="photo-category">{lifeUpdates[currentIndex].category}</span>
                <h2 className="photo-title">{lifeUpdates[currentIndex].title}</h2>
                <p className="photo-description">{lifeUpdates[currentIndex].description}</p>
                <span className="photo-date">{lifeUpdates[currentIndex].date}</span>
              </div>
            </div>
            <div className="photo-navigation">
              <button 
                className="nav-btn prev" 
                onClick={handlePrevious}
                aria-label="Previous photo"
              >
                ←
              </button>
              <div className="photo-counter">
                {currentIndex + 1} / {lifeUpdates.length}
              </div>
              <button 
                className="nav-btn next" 
                onClick={handleNext}
                aria-label="Next photo"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Life;
