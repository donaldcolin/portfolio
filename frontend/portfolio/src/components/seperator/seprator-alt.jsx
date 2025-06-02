import React, { useEffect, useRef } from 'react';

const SeparatorAlt = ({ text = "Life Updates" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const handleScroll = () => {
      if (textRef.current) {
        const scrollPosition = window.scrollY;
        const speed = 0.05;
        const offset = scrollPosition * speed;
        
        animationFrame = requestAnimationFrame(() => {
          textRef.current.style.transform = `translateX(${-offset}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '20vh',
      minHeight: '120px',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      
      {/* Subtle background text */}
      <div 
        ref={textRef}
        style={{
          position: 'absolute',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          top: '50%',
          transform: 'translateY(-50%)',
          willChange: 'transform'
        }}
      >
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          paddingRight: '100px'
        }}>
          {['WORK', 'LIFE', 'UPDATES', 'JOURNEY', 'PROGRESS'].map((word, index) => (
            <React.Fragment key={index}>
              <span style={{
                display: 'inline-block',
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.02)',
                padding: '0 3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {word}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main separator line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 2
      }}>
        
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
        }} />

        <div style={{
          width: '4px',
          height: '4px',
          margin: '0 2rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            animation: 'gentlePulse 4s infinite ease-in-out'
          }} />
        </div>

        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
        }} />
      </div>

      <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }
        
        @media (max-width: 768px) {
          .separator-container {
            height: 15vh;
            min-height: 100px;
          }
        }
        
        @media (max-width: 480px) {
          .separator-container {
            height: 12vh;
            min-height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default SeparatorAlt;