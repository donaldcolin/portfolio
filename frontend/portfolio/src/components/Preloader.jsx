import React, { useEffect, useState } from 'react';
import './Preloader.css';

const greetings = [
  'Hello',        // English
  'வணக்கம்',      // Tamil
  'Hola',         // Spanish
  'Bonjour',      // French
  'Hallo',        // German
  'こんにちは',     // Japanese
  'Привет',       // Russian
  'مرحبا',        // Arabic
  '你好',          // Chinese
  'Ciao',         // Italian
];

const Preloader = ({ loading = true, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(loading);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!loading) {
      handleExit();
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 600); // Slower, more readable timing

    // Start exit animation before hiding
    const exitTimer = setTimeout(() => {
      handleExit();
    }, greetings.length * 600 + 1000); // Show each greeting + extra time

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [loading]);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      onComplete?.(); // Callback when preloader is complete
    }, 800); // Match CSS transition duration
  };

  if (!show) return null;

  return (
    <div className={`preloader-overlay ${isExiting ? 'fade-out' : ''}`}>
      <div className="preloader-hello" key={index}>
        {greetings[index]}
      </div>
    </div>
  );
};

export default Preloader;