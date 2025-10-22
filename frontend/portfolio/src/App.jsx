import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Navbar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/about/about'
import Projects from './components/projects/projects'
import Footer from './components/Footer/Footer'
import SeparatorAlt from './components/seperator/seprator-alt'
import Life from './components/life/life'
import Preloader from './components/Preloader'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Register GSAP plugins once on app mount
    if (!gsap.core.globals().ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin)
    if (!gsap.core.globals().ScrollTrigger) gsap.registerPlugin(ScrollTrigger)
    if (!gsap.core.globals().ScrollSmoother) gsap.registerPlugin(ScrollSmoother)
    // Delegate anchor clicks to GSAP smooth scroll
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#' || href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      gsap.to(window, { duration: 1, scrollTo: { y: href, offsetY: 0 }, ease: 'power2.out' })
    }
    document.addEventListener('click', handleAnchorClick)
    
    // Create ScrollSmoother if available (Club plugin)
    let smoother
    try {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth:  10,
        effects: true
      })
    } catch (_) {
      // Fallback: no ScrollSmoother available; keep native scroll + ScrollTo anchors
    }
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleAnchorClick)
      if (smoother) smoother.kill()
    }
  }, []);

  return (
    <>
      <Preloader loading={loading} />
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Navbar/>
            <Hero/>
            <About/>
            <SeparatorAlt/>
            <Projects/>
            <SeparatorAlt/>
            <Life/>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App