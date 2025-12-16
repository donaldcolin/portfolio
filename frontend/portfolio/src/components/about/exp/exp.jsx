import React, { useEffect, useRef } from 'react';
import './exp.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';


gsap.registerPlugin(ScrollTrigger, SplitText);

const Exp = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Wait for container to be ready
    if (!containerRef.current) {
      return;
    }

    // Ensure ScrollTrigger is properly refreshed
    ScrollTrigger.refresh();

    // Split text into words - scope to this component only
    const textBlocks = gsap.utils.toArray(
      containerRef.current.querySelectorAll(".copy-block p")
    );

    if (textBlocks.length === 0) {
      console.warn('Exp: No text blocks found');
      return;
    }

    const splitInstances = textBlocks.map((block) =>
      SplitText.create(block, { type: "words", mask: "words" })
    );

    gsap.set(splitInstances[1].words, { yPercent: 100 });
    gsap.set(splitInstances[2].words, { yPercent: 100 });

    const overlapCount = 3;

    const getWordProgress = (phaseProgress, wordIndex, totalWords) => {
      const totalLength = 1 + overlapCount / totalWords;
      const scale = 1 / Math.min(
        totalLength,
        1 + (totalWords - 1) / totalWords + overlapCount / totalWords
      );
      const startTime = (wordIndex / totalWords) * scale;
      const endTime = startTime + (overlapCount / totalWords) * scale;
      const duration = endTime - startTime;

      if (phaseProgress <= startTime) return 0;
      if (phaseProgress >= endTime) return 1;
      return (phaseProgress - startTime) / duration;
    };

    const animateBlock = (outBlock, inBlock, phaseProgress) => {
      outBlock.words.forEach((word, i) => {
        const progress = getWordProgress(phaseProgress, i, outBlock.words.length);
        gsap.set(word, { yPercent: progress * 100 });
      });

      inBlock.words.forEach((word, i) => {
        const progress = getWordProgress(phaseProgress, i, inBlock.words.length);
        gsap.set(word, { yPercent: 100 - progress * 100 });
      });
    };

    // Initially hide scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        x: -20,
        visibility: 'hidden'
      });
    }

    // Create ScrollTrigger animation with pinning
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=2000%", // Pin for longer scroll distance to slow down animation
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => {
        // Fade out title and fade in scroll indicator when animation starts
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power2.out"
          });
        }
        if (scrollIndicatorRef.current) {
          gsap.set(scrollIndicatorRef.current, { visibility: 'visible' });
          gsap.to(scrollIndicatorRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3
          });
        }
      },
      onLeave: () => {
        // Section left - no action needed
      },
      onLeaveBack: () => {
        // Fade in title and fade out scroll indicator when scrolling back
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        }
        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              if (scrollIndicatorRef.current) {
                gsap.set(scrollIndicatorRef.current, { visibility: 'hidden' });
              }
            }
          });
        }
      },
      onUpdate: (self) => {
        const scrollProgress = self.progress;

        // Update progress bar width
        if (progressRef.current) {
          gsap.set(progressRef.current, { width: `${scrollProgress * 100}%` });
        }

        if (scrollProgress <= 0.5) {
          const phase1 = scrollProgress / 0.5;
          animateBlock(splitInstances[0], splitInstances[1], phase1);
        } else {
          const phase2 = (scrollProgress - 0.5) / 0.5;
          gsap.set(splitInstances[0].words, { yPercent: 100 });
          animateBlock(splitInstances[1], splitInstances[2], phase2);
        }
      }
    });

    // Cleanup
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      splitInstances.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      // Refresh ScrollTrigger after cleanup to ensure other components work
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="exp-container" ref={containerRef}>
      <h1 className="exp-title" ref={titleRef}>Experience</h1>
      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <div className="scroll-progress-track">
          <div className="scroll-progress-fill" ref={progressRef}></div>
        </div>
      </div>
      <section className="hero">
        <div className="about-copy">
          <div className="copy-block">
            <p>Started my journey as a Freelance Software Developer, building custom web applications and digital solutions for clients across various industries.</p>
          </div>
          <div className="copy-block">
            <p>Transitioned into a full-time role as Business Development Executive, driving growth strategies and building meaningful client relationships.</p>
          </div>
          <div className="copy-block">
            <p>Currently serving as a Relationship Manager, combining technical expertise with business acumen to deliver exceptional client experiences.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exp;
