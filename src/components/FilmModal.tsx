'use client';

import { useState } from 'react';
import { Film } from '@/data/filmsData';

interface FilmModalProps {
  film: Film | null;
  onClose: () => void;
}

export default function FilmModal({ film, onClose }: FilmModalProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  if (!film) return null;

  const poster = film.media[0] || film.spotlight_image || 'placeholder.jpeg';

  const getEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-media">
          {isPlayingTrailer && film.trailer_url ? (
            <iframe
              className="trailer-embed"
              src={getEmbedUrl(film.trailer_url)}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <div className="carousel-track">
                <picture>
                  <img src={`/assets/${poster}`} alt={film.title} />
                </picture>
              </div>
              <div className="modal-media-overlay"></div>
              {film.trailer_url && (
                <button
                  className="play-btn"
                  onClick={() => setIsPlayingTrailer(true)}
                  aria-label="Play Trailer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>

        <div className="modal-data">
          <div className="modal-meta">{film.category}</div>
          <h2 className="modal-title">{film.title}</h2>
          <p className="modal-desc">{film.description}</p>

          <div className="modal-crew-grid">
            {film.director && (
              <div className="crew-item">
                <div className="crew-role">Director</div>
                <div className="crew-name">{film.director}</div>
              </div>
            )}
            {film.writer && (
              <div className="crew-item">
                <div className="crew-role">Writer</div>
                <div className="crew-name">{film.writer}</div>
              </div>
            )}
          </div>

          {film.cast_members && film.cast_members.length > 0 && (
            <div className="modal-cast-section">
              <div className="crew-role">Featured Cast</div>
              <div className="cast-grid">
                {film.cast_members.map((actor) => (
                  <div key={actor.id} className="cast-tile">
                    <div className="cast-avatar">
                      {actor.headshot ? (
                        <picture>
                          <img src={actor.headshot} alt={actor.name} />
                        </picture>
                      ) : (
                        <span className="cast-initials">{getInitials(actor.name)}</span>
                      )}
                    </div>
                    <span className="cast-name">{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
