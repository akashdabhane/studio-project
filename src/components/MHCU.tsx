'use client';

import { useRef } from 'react';
import { mhcuAssets, MHCUItem } from '@/data/filmsData';

interface MHCUProps {
  onSelectMHCU?: (item: MHCUItem) => void;
}

export default function MHCU({ onSelectMHCU }: MHCUProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('.mhcu-card')?.clientWidth || 400;
    const amount = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="mhcu">
      <div className="section-header">
        <div>
          <div className="section-label reveal">From The Studio</div>
          <h2 className="section-title reveal reveal-delay-1">MHCU</h2>
        </div>
        <a href="#films" className="section-link reveal">
          All articles →
        </a>
      </div>

      <div className="mhcu-track-wrapper">
        <div className="mhcu-track" ref={trackRef}>
          {mhcuAssets.map((asset) => (
            <button
              key={asset.id}
              className="mhcu-card"
              onClick={() => onSelectMHCU && onSelectMHCU(asset)}
            >
              <div className="carousel-track">
                <picture>
                  <img
                    src={`/assets/${asset.images[0]}`}
                    alt={asset.title}
                    draggable={false}
                  />
                </picture>
              </div>
              <div className="mhcu-card-overlay">
                <div className="mhcu-tag">MHCU Asset</div>
                <div className="mhcu-card-title">{asset.title}</div>
                <div className="mhcu-card-excerpt">{asset.excerpt}</div>
                <div className="mhcu-card-meta">
                  <span>{asset.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mhcu-nav">
        <button aria-label="Scroll left" onClick={() => scroll('left')}>
          ←
        </button>
        <button aria-label="Scroll right" onClick={() => scroll('right')}>
          →
        </button>
      </div>
    </section>
  );
}
