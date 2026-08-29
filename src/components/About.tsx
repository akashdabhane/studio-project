'use client';

export default function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="about-visual reveal">
          <picture>
            <img
              src="/assets/Dinesh Ver.hE2HMXfl.jpeg"
              alt="About Maddock Films - Dinesh Vijan"
              width="1536"
              height="2752"
            />
          </picture>
          <div className="about-visual-accent"></div>
          <div className="about-visual-label">Est. 2020</div>
        </div>

        <div className="about-text">
          <div className="section-label reveal">Who We Are</div>
          <h2 className="reveal reveal-delay-1">
            Cinema Without <em>Compromise</em>
          </h2>
          <p className="reveal reveal-delay-2">
            Maddock Films is an independent production company committed to bold storytelling and authentic human experiences. We champion directors with a distinct vision and stories that demand to be told.
          </p>
          <p className="reveal reveal-delay-3">
            From gritty dramas to sweeping epics, every frame we put on screen is a declaration of artistic intent. We don't make films — we make moments that outlast the credits.
          </p>
          <div className="about-stats reveal reveal-delay-4">
            <div>
              <div className="stat-num">36</div>
              <div className="stat-label">Features</div>
            </div>
            <div>
              <div className="stat-num">7</div>
              <div className="stat-label">Awards</div>
            </div>
            <div>
              <div className="stat-num">12</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
