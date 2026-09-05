'use client';

import { useState, useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import UpcomingReleases from '@/components/UpcomingReleases';
import Services from '@/components/Services';
import FilmCatalogue from '@/components/FilmCatalogue';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FilmModal from '@/components/FilmModal';
import {
  allFilms,
  getSpotlightFilms,
  getUpcomingFilms,
  Film,
} from '@/data/filmsData';

export default function Home() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const spotlightFilms = getSpotlightFilms();
  const upcomingFilms = getUpcomingFilms();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main style={{ position: 'relative', overflowX: 'hidden' }}>
      <CustomCursor />
      <Navbar />
      
      <Hero
        spotlightFilms={spotlightFilms}
        onExploreFilm={(film) => setSelectedFilm(film)}
      />

      <About />

      <div className="divider"></div>

      <UpcomingReleases
        upcomingFilms={upcomingFilms}
        onSelectFilm={(film) => setSelectedFilm(film)}
      />

      <div className="divider"></div>

      <Services />

      <div className="divider"></div>

      <FilmCatalogue
        films={allFilms}
        onSelectFilm={(film) => setSelectedFilm(film)}
      />

      <Contact />

      <Footer />

      <FilmModal
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
      />
    </main>
  );
}
