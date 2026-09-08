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
        <a href="https://linkedin.com/in/vijeshafilms" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://instagram.com/vijeshafilms" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://facebook.com/vijeshafilms" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://youtube.com/@vijeshafilms" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
        <a href="https://x.com/VijeshaFilms" target="_blank" rel="noopener noreferrer">
          X/Twitter
        </a>
      </div>
    </footer>
  );
}
