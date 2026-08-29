'use client';

import { Film } from '@/data/filmsData';

interface UpcomingProps {
  upcomingFilms: Film[];
  onSelectFilm: (film: Film) => void;
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
        {upcomingFilms.map((film) => {
          const mainImg = film.media[0] || film.spotlight_image;
          return (
            <button
              key={film.id}
              className="upcoming-item reveal"
              onClick={() => onSelectFilm(film)}
            >
              <div className="carousel-track">
                <picture>
                  <img src={`/assets/${mainImg}`} alt={film.title} />
                </picture>
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
        })}
      </div>
    </section>
  );
}
