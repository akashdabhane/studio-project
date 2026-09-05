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

        {/* Video Info & External Link */}
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

          {/* <a
            href={`https://www.youtube.com/watch?v=${service.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-modal-yt-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube ↗
          </a> */}
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

  // Synchronize thumbnail state when props change
  useEffect(() => {
    setImgSrc(
      service.thumbnail || `https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`
    );
  }, [service.id, service.thumbnail, service.youtubeId]);

  const handleError = () => {
    // Fallback to standard YouTube HQ thumbnail if image path fails to load
    setImgSrc(`https://img.youtube.com/vi/${service.youtubeId}/hqdefault.jpg`);
  };

  return (
    <button
      className="service-video-card"
      onClick={() => onSelect(service)}
      aria-label={`Play video for ${service.title}`}
    >
      {/* Thumbnail Container */}
      <div className="service-card-media">
        <img
          src={imgSrc}
          alt={service.title}
          onError={handleError}
          loading="lazy"
        />

        {/* Play Icon Overlay */}
        <div className="service-play-overlay">
          <div className="service-play-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Gradient Overlay & Tags at Bottom of Card */}
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

// ─── Main Services Section Component ────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Dynamically extract and order available categories (PRE-PRODUCTION, PRODUCTION, POST-PRODUCTION)
  const availableCategories = useMemo(() => {
    const preferredOrder = ['ALL', 'PRE-PRODUCTION', 'PRODUCTION', 'POST-PRODUCTION'];
    const set = new Set<string>();
    servicesData.forEach((item) => {
      if (item.categories) {
        item.categories.forEach((cat) => set.add(cat.toUpperCase()));
      }
    });
    
    // Sort extracted categories prioritizing the preferred order
    const extracted = Array.from(set);
    const sortedPreferred = preferredOrder.filter(
      (cat) => cat === 'ALL' || extracted.some((c) => c.replace('-', ' ') === cat.replace('-', ' '))
    );
    const customCats = extracted.filter(
      (cat) => !preferredOrder.some((p) => p.replace('-', ' ') === cat.replace('-', ' '))
    );
    
    return [...sortedPreferred, ...customCats];
  }, []);

  // Filter items based on selected category (case-insensitive check against categories and categorySlugs)
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

  // Reset pagination count back to initial 12 when active category tab changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const visibleServices = useMemo(
    () => filteredServices.slice(0, visibleCount),
    [filteredServices, visibleCount]
  );

  const hasMore = visibleCount < filteredServices.length;

  return (
    <section id="services">
      {/* Section Header */}
      <div className="section-header">
        <div>
          <div className="section-label reveal">Our Capabilities</div>
          <h2 className="section-title reveal reveal-delay-1">Services</h2>
        </div>
        <a href="#contact" className="section-link reveal">
          Work With Us →
        </a>
      </div>

      {/* Category Tabs */}
      <div className="services-tabs-wrapper reveal reveal-delay-2">
        <div className="services-tabs" role="tablist" aria-label="Service categories">
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
