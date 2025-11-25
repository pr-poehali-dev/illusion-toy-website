import { useState } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Experiments from '@/components/Experiments';
import Effects from '@/components/Effects';
import Gallery from '@/components/Gallery';
import About from '@/components/About';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-900/20 to-background">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <section id="home">
        <Hero />
      </section>

      <section id="experiments">
        <Experiments />
      </section>

      <section id="effects">
        <Effects />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  );
};

export default Index;
