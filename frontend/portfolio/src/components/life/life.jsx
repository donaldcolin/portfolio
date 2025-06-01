import React, { useState } from 'react';
import './life.css';
import '../about/about.css';

const Life = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lifeUpdates = [
    {
      id: 1,
      date: "November 2024",
      title: "Moved to Bengaluru",
      description: "Moved to B'Luru for Better a Full Time.",
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

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? lifeUpdates.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === lifeUpdates.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div id="life" className="about-container">
      <div className="about-content">
        <div className="about-title-column">
          <h1>Life</h1>
        </div>

        <div className="life-gallery-column">
          <div className="photo-viewer">
            <div className="photo-viewer-image">
              <img 
                src={lifeUpdates[currentIndex].image} 
                alt={lifeUpdates[currentIndex].title} 
              />
              <div className="photo-caption">
                <span className="photo-category">{lifeUpdates[currentIndex].category}</span>
                <h2 className="photo-title">{lifeUpdates[currentIndex].title}</h2>
                <p className="photo-description">{lifeUpdates[currentIndex].description}</p>
                <span className="photo-date">{lifeUpdates[currentIndex].date}</span>
              </div>
            </div>
            <div className="photo-navigation">
              <button className="nav-btn prev" onClick={handlePrevious}>←</button>
              <div className="photo-counter">
                {currentIndex + 1} / {lifeUpdates.length}
              </div>
              <button className="nav-btn next" onClick={handleNext}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Life;
