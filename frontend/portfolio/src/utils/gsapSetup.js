import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once globally to avoid conflicts
gsap.registerPlugin(ScrollTrigger);

// Global ScrollTrigger refresh function with proper timing
export const refreshScrollTrigger = () => {
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

// Enhanced refresh that waits for layout
export const refreshScrollTriggerAfterLayout = (callback) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (callback) callback();
    });
  });
};

// Initialize ScrollTrigger after page load
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'complete') {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, { once: true });
  }
  
  // Also refresh on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { passive: true });
}

// SplitText alternative function (since it's a premium plugin)
export const createSplitText = (element, options = {}) => {
  if (!element) return null;
  
  const text = element.textContent;
  const words = text.split(' ');
  
  // Clear the element
  element.innerHTML = '';
  
  // Create character spans for each word
  const allCharSpans = [];
  const allWordSpans = [];
  
  words.forEach((word, index) => {
    // Create word container
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.classList.add('word');
    wordSpan.style.marginRight = '0.25em'; // Add space between words
    allWordSpans.push(wordSpan);
    
    // Create character spans for this word
    const wordChars = word.split('').map(char => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';
      charSpan.classList.add('char');
      allCharSpans.push(charSpan);
      return charSpan;
    });
    
    // Add characters to word span
    wordChars.forEach(charSpan => wordSpan.appendChild(charSpan));
    
    // Add space after word (except for last word)
    if (index < words.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.textContent = ' ';
      spaceSpan.style.display = 'inline-block';
      spaceSpan.style.width = '0.25em'; // Ensure space is visible
      spaceSpan.classList.add('char');
      allCharSpans.push(spaceSpan);
      wordSpan.appendChild(spaceSpan);
    }
    
    // Add word to element
    element.appendChild(wordSpan);
  });
  
  return {
    words: allWordSpans,
    chars: allCharSpans,
    revert: () => {
      element.textContent = text;
    }
  };
};

// Export configured GSAP instance
export { gsap, ScrollTrigger };
