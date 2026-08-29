'use client';

import { Film } from '@/data/filmsData';

interface CatalogueProps {
  films: Film[];
  onSelectFilm: (film: Film) => void;
}

export default function FilmCatalogue({ films, onSelectFilm }: CatalogueProps) {
  return (
    <section id="films">
      <div className="section-header">
        <div>
          <div className="section-label reveal">The Catalogue</div>
          <h2 className="section-title reveal reveal-delay-1">All Films</h2>
        </div>
      </div>

      <div className="films-grid">
        {films.map((film) => {
          const poster = film.media[0] || film.spotlight_image || 'daf93eb13a04.CU1O9lDy.jpeg';
          const castNames = (film.cast_members || [])
            .map(c => c.name)
            .filter(Boolean)
            .slice(0, 4)
            .join(' · ');

          return (
            <button
              key={film.id}
              className="film-btn-wrapper reveal"
              onClick={() => onSelectFilm(film)}
            >
              <div className="film-card">
                <div className="film-card-header">
                  {film.release_date && (
                    <div className="film-card-badge">
                      {film.release_date.split('-')[0] || film.release_date}
                    </div>
                  )}
                  <div className="carousel-track">
                    <picture>
                      <img src={`/assets/${poster}`} alt={film.title} />
                    </picture>
                  </div>
                  <div className="film-card-header-overlay"></div>
                </div>

                <div className="film-card-body">
                  <div className="film-card-title">{film.title}</div>
                  <div className="film-card-meta">
                    {film.category && <span>{film.category}</span>}
                    <span>Feature</span>
                  </div>

                  <p className="film-card-summary">{film.description}</p>

                  <div className="film-card-crew">
                    {film.director && (
                      <div>
                        <strong>Director</strong> — {film.director}
                      </div>
                    )}
                    {film.writer && (
                      <div>
                        <strong>Writer</strong> — {film.writer}
                      </div>
                    )}
                  </div>

                  <div className="spacer"></div>

                  {castNames ? (
                    <div className="film-card-footer">
                      <div className="film-card-cast">
                        <strong>CAST:</strong> {castNames}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
