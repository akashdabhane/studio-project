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
          const poster = film.media[0] || film.spotlight_image || 'placeholder.jpeg';
          const castNames = (film.cast_members || []).map(c => c.name).slice(0, 3).join(', ');

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
                    <span>{film.category}</span>
                    <span>Feature</span>
                  </div>

                  <p className="film-card-summary">{film.description}</p>

                  <div className="film-card-crew">
                    {film.director && (
                      <>
                        <strong>Director</strong> — {film.director}
                        <br />
                      </>
                    )}
                    {film.writer && (
                      <>
                        <strong>Writer</strong> — {film.writer}
                        <br />
                      </>
                    )}
                  </div>

                  <div className="spacer"></div>

                  {castNames && (
                    <div className="film-card-footer">
                      <div className="film-card-cast">
                        <strong>Cast:</strong> {castNames}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
