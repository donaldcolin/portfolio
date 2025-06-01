import React, { useState } from 'react';
import './life.css';
import '../about/about.css';

const Life = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lifeUpdates = [
    {
      id: 1,
      date: "March 2024",
      title: "Tech Conference Speaker",
      description: "Shared insights on mobile development at the annual tech summit in Bangalore.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748705872/WhatsApp_Image_2025-05-31_at_21.05.41_a2nd4q.jpg",
      category: "Career"
    },
    {
      id: 2,
      date: "February 2024",
      title: "Kerala Road Trip",
      description: "Went to kerela on a road trip with a friend.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748790162/YTD0lAdjeXLvEzNN-WhatsApp_20Image_202024-08-13_20at_2019.51.59_qnaatx.jpg",
      category: "Adventure"
    },
    {
      id: 3,
      date: "January 2024",
      title: "New Project Launch",
      description: "Successfully launched a new mobile app that helps travelers plan their trips.",
      image: "https://res.cloudinary.com/dt9apeyvy/image/upload/v1748789992/WhatsApp_Image_2025-06-01_at_20.29.22_catotm.jpg",
      category: "Work"
    },
    {
      id: 4,
      date: "March 2025",
      title: "Got a onsite oppurtunity in Yenepoya university",
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
    <div id="about" className="about-container">
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
