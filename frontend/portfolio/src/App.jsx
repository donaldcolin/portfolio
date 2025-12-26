import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Navbar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/about/about'
import Projects from './components/projects/projects'
import Footer from './components/Footer/Footer'
import SeparatorAlt from './components/seperator/seprator-alt'
import Life from './components/life/life'
import Preloader from './components/Preloader'
import LifeTimeline from './components/about/exp/exp'
import TestimonialSection from './components/testimonials/testimonial'
import Processes from './components/processes/processes'

gsap.registerPlugin(ScrollTrigger);

// add smooth scrool animation to the website
// fix the experience section animation
// add tesitimonials section

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    const timer = setTimeout(() => setLoading(false), 4000);
    return () => {
      clearTimeout(timer)
    }
  }, []);

  // Refresh ScrollTrigger and scroll to top after preloader finishes
  useEffect(() => {
    if (!loading) {
      // Scroll to top when content becomes visible
      window.scrollTo(0, 0);

      // Small delay to ensure DOM has rendered
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(refreshTimer);
    }
  }, [loading]);

  return (
    <>
      <Preloader loading={loading} />
      <div style={{ display: loading ? 'none' : 'block' }}>


        <Navbar />
        <Hero />
        <About />
        <LifeTimeline />
        {/* <TestimonialSection/> */}
        <Processes />
        <Projects />
        <SeparatorAlt />
        <Life />
        <Footer />
      </div>


    </>
  )
}

export default App