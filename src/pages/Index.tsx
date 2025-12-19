
import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/projects';
import Services from '../components/Services';
// import Client from '../components/Client';
import Experience from '../components/Experience';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Services />
      {/* <Client /> */}
      <Experience />
      <Footer />
    </div>
  );
};

export default Index;
