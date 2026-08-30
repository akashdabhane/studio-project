'use client';

import { useRef, useState } from 'react';
import { mhcuAssets, MHCUItem } from '@/data/filmsData';

interface MHCUProps {
  onSelectMHCU?: (item: MHCUItem) => void;
}

function MHCUCard({ asset, onSelectMHCU }: { asset: MHCUItem; onSelectMHCU?: (item: MHCUItem) => void }) {
  const images = asset.images.length > 0 ? asset.images : [''];
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
      className="mhcu-card"
      onClick={() => onSelectMHCU && onSelectMHCU(asset)}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
        {images.map((img, i) => (
          <picture key={i}>
            <img
              src={`/assets/${img}`}
              alt={asset.title}
              draggable={false}
            />
          </picture>
        ))}
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
  );
}

export default function MHCU({ onSelectMHCU }: MHCUProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('.mhcu-card')?.clientWidth || 400;
    const amount = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.isDown = true;
    dragState.current.moved = false;
    dragState.current.startX = e.pageX - track.offsetLeft;
    dragState.current.scrollLeft = track.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 5) dragState.current.moved = true;
    track.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const endDrag = () => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    if (dragState.current.moved) {
      // A drag just ended - swallow the click it would otherwise fire on the
      // card underneath the cursor so releasing the mouse doesn't open a modal.
      const suppressClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        window.removeEventListener('click', suppressClick, true);
      };
      window.addEventListener('click', suppressClick, true);
    }
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
        <div
          className="mhcu-track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {mhcuAssets.map((asset) => (
            <MHCUCard key={asset.id} asset={asset} onSelectMHCU={onSelectMHCU} />
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
