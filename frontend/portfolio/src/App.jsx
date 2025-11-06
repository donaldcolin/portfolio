import { useState, useEffect } from 'react'
import Navbar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/about/about'
import Projects from './components/projects/projects'
import Footer from './components/Footer/Footer'
import SeparatorAlt from './components/seperator/seprator-alt'
import Life from './components/life/life'
import Preloader from './components/Preloader'
import LifeTimeline from './components/about/exp/exp'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => {
      clearTimeout(timer)
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
            <LifeTimeline/>
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