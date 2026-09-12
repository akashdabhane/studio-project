'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Upcoming', href: '#upcoming', num: '02' },
  { label: 'Services', href: '#services', num: '03' },
  { label: 'All Films', href: '#films', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav id="nav" className={`${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={handleNavClick}>
          <img src="/assets/vijesha-films-logo.jpeg" alt="Vijesha Films" />
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </button>
      </nav>

      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <span className="mobile-menu-label">Navigation</span>
          </div>
          <ul className="mobile-nav-links">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="mobile-nav-item"
                style={{ transitionDelay: mobileMenuOpen ? `${0.1 + index * 0.07}s` : '0s' }}
              >
                <a href={item.href} onClick={handleNavClick}>
                  <span className="mobile-nav-num">{item.num}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <p className="mobile-footer-tag">VIJESHA FILMS</p>
            <p className="mobile-footer-sub">Cinematic Entertainment</p>
          </div>
        </div>
      </div>
    </>
  );
}

