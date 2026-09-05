'use client';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/assets/vijesha-films-logo.jpeg" alt="Vijesha Films" />
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Vijesha Films. All rights reserved.
      </div>
      <div className="footer-socials">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          X/Twitter
        </a>
        <a href="https://letterboxd.com" target="_blank" rel="noopener noreferrer">
          Letterboxd
        </a>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
          Vimeo
        </a>
      </div>
    </footer>
  );
}
