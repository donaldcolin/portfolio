import React, { useState, useEffect } from 'react'
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
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader loading={loading} />
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Navbar/>
        <Hero/>
        <About/>
        <SeparatorAlt/>
        <Projects/>
        <SeparatorAlt/>
        <Life/>
        <Footer/>
      </div>
    </>
  )
}

export default App