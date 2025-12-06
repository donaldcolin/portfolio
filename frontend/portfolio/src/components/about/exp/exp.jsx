import React, { useEffect, useRef } from 'react';
import './exp.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Exp = () => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let lenis = null;
    let scrollTrigger = null;
    let splitInstances = [];
    let rafId = null;

    // Wait for DOM to be ready
    const initAnimation = () => {
      // Initialize Lenis smooth scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Split text into words
      const textBlocks = gsap.utils.toArray(".copy-block p");
      
      if (textBlocks.length === 0) {
        console.warn("No text blocks found");
        return;
      }

      splitInstances = textBlocks.map((block) => {
        try {
          return SplitText.create(block, { type: "words", mask: "words" });
        } catch (error) {
          console.warn("SplitText creation failed:", error);
          return null;
        }
      }).filter(instance => instance !== null);

      if (splitInstances.length < 3) {
        console.warn("Not enough split instances");
        return;
      }

      // Set initial states
      if (splitInstances[1] && splitInstances[1].words) {
        gsap.set(splitInstances[1].words, { yPercent: 100 });
      }
      if (splitInstances[2] && splitInstances[2].words) {
        gsap.set(splitInstances[2].words, { yPercent: 100 });
      }

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
        if (!outBlock || !outBlock.words || !inBlock || !inBlock.words) return;
        
        outBlock.words.forEach((word, i) => {
          const progress = getWordProgress(phaseProgress, i, outBlock.words.length);
          gsap.set(word, { yPercent: progress * 100 });
        });
        
        inBlock.words.forEach((word, i) => {
          const progress = getWordProgress(phaseProgress, i, inBlock.words.length);
          gsap.set(word, { yPercent: 100 - progress * 100 });
        });
      };

      // Create ScrollTrigger animation
      scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: (self) => {
          const scrollProgress = self.progress;

          if (scrollProgress <= 0.5) {
            const phase1 = scrollProgress / 0.5;
            animateBlock(splitInstances[0], splitInstances[1], phase1);
          } else {
            const phase2 = (scrollProgress - 0.5) / 0.5;
            if (splitInstances[0] && splitInstances[0].words) {
              gsap.set(splitInstances[0].words, { yPercent: 100 });
            }
            animateBlock(splitInstances[1], splitInstances[2], phase2);
          }
        }
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    };

    // Wait for next frame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        initAnimation();
      });
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      splitInstances.forEach(instance => {
        if (instance && instance.revert) {
          instance.revert();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="exp-container" ref={containerRef}>
      <h1 className="exp-title">Experience</h1>
      <section className="hero">
        <div className="about-copy">
          <div className="copy-block">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="copy-block"> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscihjbhbbjbibubububu iomomojmojmi ioninininiininini nijninininin nininnininini    inininininin  ibedxrtygvcdtrexcghjnbvgdxr buihuycyghjng elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="copy-block">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exp;
