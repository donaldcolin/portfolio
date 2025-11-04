// Test file to verify GSAP is working correctly
import { gsap, ScrollTrigger, createSplitText } from './gsapSetup.js';

export const testGSAP = () => {
  console.log('Testing GSAP setup...');
  
  // Test 1: Check if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    console.log('✅ GSAP is loaded');
  } else {
    console.error('❌ GSAP is not loaded');
    return false;
  }
  
  // Test 2: Check if ScrollTrigger is registered
  if (gsap.core.globals().ScrollTrigger) {
    console.log('✅ ScrollTrigger is registered');
  } else {
    console.error('❌ ScrollTrigger is not registered');
    return false;
  }
  
  // Test 3: Check if createSplitText function works
  try {
    const testElement = document.createElement('div');
    testElement.textContent = 'Test text';
    const split = createSplitText(testElement);
    
    if (split && split.words && split.chars) {
      console.log('✅ createSplitText function works');
    } else {
      console.error('❌ createSplitText function failed');
      return false;
    }
  } catch (error) {
    console.error('❌ createSplitText test failed:', error);
    return false;
  }
  
  console.log('🎉 All GSAP tests passed!');
  return true;
};

// Auto-run test when imported
if (typeof window !== 'undefined') {
  setTimeout(testGSAP, 1000);
}
