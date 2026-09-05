'use client';

import { useRef, useState } from 'react';
import { Film } from '@/data/filmsData';

interface UpcomingProps {
  upcomingFilms: Film[];
  onSelectFilm: (film: Film) => void;
}

function UpcomingItem({ film, onSelectFilm }: { film: Film; onSelectFilm: (film: Film) => void }) {
  const images = film.media.length > 0 ? film.media : [film.spotlight_image].filter(Boolean) as string[];
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (images.length < 2) return;
    intervalRef.current = setInterval(() => {
      setSlide(prev => (prev + 1) % images.length);
    }, 1400);
  };

  const stopCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSlide(0);
  };

  return (
    <button
      className="upcoming-item"
      onClick={() => onSelectFilm(film)}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
        {images.map((img, i) => (
          <picture key={i}>
            <img src={`/assets/${img}`} alt={film.title} width="100%" height="100%" style={{ objectFit: 'fill' }} />
          </picture>
        ))}
      </div>
      <div className="upcoming-item-info">
        {film.release_date && (
          <div className="upcoming-date">{film.release_date}</div>
        )}
        <div className="upcoming-name">{film.title}</div>
        <div className="upcoming-director">Dir. {film.director}</div>
      </div>
      <div className="upcoming-arrow">↗</div>
    </button>
  );
}

export default function UpcomingReleases({ upcomingFilms, onSelectFilm }: UpcomingProps) {
  return (
    <section id="upcoming">
      <div className="section-header">
        <div>
          <div className="section-label reveal">On The Horizon</div>
          <h2 className="section-title reveal reveal-delay-1">Upcoming Releases</h2>
        </div>
        <a href="#films" className="section-link reveal">
          Full schedule →
        </a>
      </div>

      <div className="upcoming-grid">
        {upcomingFilms.map((film) => (
          <UpcomingItem key={film.id} film={film} onSelectFilm={onSelectFilm} />
        ))}
      </div>
    </section>
  );
}
