import React, { useEffect, useState } from "react";
import "./Preloader.css";

const greetings = [
  "Hello",
  "Hola",
  "வணக்கம்",
  "Bonjour",
  "こんにちは",
  "Ciao",
  "مرحبا",
  "Привет",
  "你好",
 
];

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 500);

    // Duration before exit (cycles + reveal)
    const totalDuration = greetings.length * 500 + 1000;

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setActive(false);
        onComplete?.();
      }, 1200); // match CSS transition
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!active) return null;

  return (
    <div className={`splash-container ${exiting ? "splash-exit" : ""}`}>
      <div className="splash-inner">
        <h1 className="splash-greeting" key={index}>
          {greetings[index]}
        </h1>
      </div>
      <div className="splash-reveal" />
    </div>
  );
};

export default Preloader;
