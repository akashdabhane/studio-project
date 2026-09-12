'use client';

import { useState, useEffect, useMemo } from 'react';
import { servicesData, ServiceItem } from '@/data/servicesData';

// ─── Video Modal Component ──────────────────────────────────────────────────

function VideoModal({
  service,
  onClose,
}: {
  service: ServiceItem | null;
  onClose: () => void;
}) {
  if (!service) return null;

  return (
    <div
      className="video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Responsive YouTube Player */}
        <div className="video-modal-player">
          <iframe
            src={`https://www.youtube.com/embed/${service.youtubeId}?autoplay=1&rel=0`}
            title={service.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="video-modal-info">
          {service.categories && service.categories.length > 0 && (
            <div className="video-modal-tags">
              {service.categories.map((cat) => (
                <span key={cat} className="video-modal-tag">
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h2 id="video-modal-title" className="video-modal-title">
            {service.title}
          </h2>

          {service.description && (
            <p className="video-modal-desc">{service.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Service Video Card Component ──────────────────────────────────────────

function ServiceVideoCard({
  service,
  onSelect,
}: {
  service: ServiceItem;
  onSelect: (s: ServiceItem) => void;
}) {
  const [imgSrc, setImgSrc] = useState<string>(
    service.thumbnail || `https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`
  );

  useEffect(() => {
    setImgSrc(
      service.thumbnail || `https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`
    );
  }, [service.id, service.thumbnail, service.youtubeId]);

  const handleError = () => {
    setImgSrc(`https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`);
  };

  const isCustomThumbnail = Boolean(service.thumbnail && !service.thumbnail.includes('youtube.com'));

  return (
    <button
      className="service-video-card"
      onClick={() => onSelect(service)}
      aria-label={`Play video for ${service.title}`}
    >
      <div className={`service-card-media ${isCustomThumbnail ? 'contain-media' : ''}`}>
        <img
          src={imgSrc}
          alt={service.title}
          onError={handleError}
          loading="lazy"
        />

        <div className="service-play-overlay">
          <div className="service-play-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="service-card-overlay">
          <h3 className="service-card-title">{service.title}</h3>
          
          {service.categories && service.categories.length > 0 && (
            <div className="service-card-tags">
              {service.categories.map((cat) => (
                <span key={cat} className="service-tag-pill">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Main Work Section Component ──────────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const availableCategories = useMemo(() => {
    const preferredOrder = ['ALL', 'PRE-PRODUCTION', 'PRODUCTION', 'POST-PRODUCTION'];
    const set = new Set<string>();
    servicesData.forEach((item) => {
      if (item.categories) {
        item.categories.forEach((cat) => set.add(cat.toUpperCase()));
      }
    });
    
    const extracted = Array.from(set);
    const sortedPreferred = preferredOrder.filter(
      (cat) => cat === 'ALL' || extracted.some((c) => c.replace('-', ' ') === cat.replace('-', ' '))
    );
    const customCats = extracted.filter(
      (cat) => !preferredOrder.some((p) => p.replace('-', ' ') === cat.replace('-', ' '))
    );
    
    return [...sortedPreferred, ...customCats];
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'ALL') {
      return servicesData;
    }
    const targetNorm = activeCategory.toLowerCase().replace(/[\s-]/g, '');
    return servicesData.filter((item) => {
      const matchCategoryName = item.categories?.some(
        (c) => c.toLowerCase().replace(/[\s-]/g, '') === targetNorm
      );
      const matchCategorySlug = item.categorySlugs?.some(
        (s) => s.toLowerCase().replace(/[\s-]/g, '') === targetNorm
      );
      return matchCategoryName || matchCategorySlug;
    });
  }, [activeCategory]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const visibleServices = useMemo(
    () => filteredServices.slice(0, visibleCount),
    [filteredServices, visibleCount]
  );

  const hasMore = visibleCount < filteredServices.length;

  return (
    <section id="our-work" className="our-work-section">
      {/* Section Header */}
      <div className="section-header">
        <div>
          <div className="section-label reveal">Our Portfolio</div>
          <h2 className="section-title reveal reveal-delay-1">Our Work</h2>
        </div>
        <a href="#contact" className="section-link reveal">
          Work With Us →
        </a>
      </div>

      {/* Category Tabs */}
      <div className="services-tabs-wrapper reveal reveal-delay-2">
        <div className="services-tabs" role="tablist" aria-label="Work categories">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`services-tab-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="services-grid">
        {visibleServices.map((service) => (
          <ServiceVideoCard
            key={service.id}
            service={service}
            onSelect={setSelectedService}
          />
        ))}
      </div>

      {/* Load More Pagination Button */}
      {hasMore && (
        <div className="services-load-more-wrapper">
          <button
            className="services-load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
          >
            See More
          </button>
        </div>
      )}

      {/* Video Modal Player */}
      <VideoModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
