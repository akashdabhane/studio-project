'use client';

import { useState, useEffect } from 'react';
import { Film } from '@/data/filmsData';

interface HeroProps {
  spotlightFilms: Film[];
  onExploreFilm: (film: Film) => void;
}

export default function Hero({ spotlightFilms, onExploreFilm }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState<string | null>(null);

  const films = spotlightFilms.length > 0 ? spotlightFilms : [
    {
      id: 'eetha',
      title: 'Eetha',
      director: 'Laxman Utekar',
      writer: 'Kshitij Patwardhan',
      description: 'Follows Vithabai Narayangaonkar, a renowned Marathi Tamasha and Lavani performer who rose from humble beginnings to become one of Maharashtra\'s most celebrated folk theatre artists.',
      spotlight_image: 'daf93eb13a04.C_Eh7kJK.jpeg',
      trailer_url: 'https://www.youtube.com/watch?v=zfopTfY3lBU',
      category: 'Historical, Biopic, Musical',
      flags: { spotlight: true },
      media: ['daf93eb13a04.C_Eh7kJK.jpeg', 'ccdb67c1de18.eafRkhPC.jpeg'],
      release_date: null,
      brand_color: null,
      cast_ids: []
    }
  ];

  const currentFilm = films[currentIndex % films.length];

  useEffect(() => {
    if (activeTrailerUrl || films.length <= 1) return; // Pause auto rotation when trailer modal is open or only 1 film
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % films.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, films.length, activeTrailerUrl]);

  useEffect(() => {
    if (!activeTrailerUrl) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTrailerUrl(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTrailerUrl]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + films.length) % films.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % films.length);
  };

  const getEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  return (
    <>
      <section id="hero">
        <div className="hero-bg">
          <picture>
            <img
              src={`/assets/${currentFilm.spotlight_image || currentFilm.media[0]}`}
              alt={currentFilm.title}
              key={currentFilm.id}
            />
          </picture>
        </div>
        <div className="hero-gradient"></div>
        <div className="hero-gradient-side"></div>

        <div className="hero-content" key={currentFilm.id}>
          <div className="hero-label">
            Dir. {currentFilm.director} · Wri. {currentFilm.writer}
          </div>
          <h1 className="hero-title">{currentFilm.title}</h1>
          <p className="hero-tagline">{currentFilm.description}</p>
          <div className="hero-cta">
            <button
              className="btn-primary"
              onClick={() => onExploreFilm(currentFilm)}
            >
              Explore Film
            </button>
            {currentFilm.trailer_url && (
              <button
                className="btn-secondary"
                onClick={() => setActiveTrailerUrl(currentFilm.trailer_url)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-controls">
            <button onClick={handlePrev} aria-label="Previous Slide">←</button>
            <div className="slide-indicator">
              0{(currentIndex % films.length) + 1}
              <span className="indicator-line" key={currentIndex}></span>
              0{films.length}
            </div>
            <button onClick={handleNext} aria-label="Next Slide">→</button>
          </div>
          <div className="hero-scroll-hint">
            <span className="hero-scroll-line"></span> Scroll
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeTrailerUrl && (
        <div className="video-overlay" onClick={() => setActiveTrailerUrl(null)}>
          <button className="close-video-btn" onClick={() => setActiveTrailerUrl(null)}>
            Close ✕
          </button>
          <div className="video-cover-wrapper" onClick={e => e.stopPropagation()}>
            <iframe
              src={getEmbedUrl(activeTrailerUrl)}
              title="Watch Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
