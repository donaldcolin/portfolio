import React from 'react'
import Navbar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/about/about'
import Projects from './components/projects/projects'
import Footer from './components/Footer/Footer'
import SeparatorAlt from './components/seperator/seprator-alt'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <SeparatorAlt/>
      <Projects/>
      <Footer/>
    </div>
  )
}

export default App