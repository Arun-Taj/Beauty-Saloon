import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/landing/Hero';
import ServiceMenu from '@/components/landing/ServiceMenu';
import Lookbook from '@/components/landing/Lookbook';
import Testimonials from '@/components/landing/Testimonials';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = hash.replace('#', '');

    // Delay to ensure sections are mounted before attempting to scroll.
    const timer = setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;

      const navbarOffset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 60);

    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main>
      <Hero />
      <ServiceMenu />
      <Lookbook />
      <Testimonials />
    </main>
  );
};

export default Home;