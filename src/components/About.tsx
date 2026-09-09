'use client';

export default function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="about-visual reveal">
          <picture>
            <img
              src="/assets/about-section-1536X1920.jpg"
              alt="About Vijesha Films - Raj"
              width="1536"
              height="2752"
            />
          </picture>
          {/* <div className="about-visual-accent"></div> */}
          <div className="about-visual-label">Est. 2019</div>
        </div>

        <div className="about-text">
          <div className="section-label reveal">Who We Are</div>
          <h2 className="reveal reveal-delay-1">
            Real Stories. <em>Honest Cinema.</em>
          </h2>
          <p className="reveal reveal-delay-2">
            Vijesha Films is an independent production house helmed by filmmaker Raaj Dhoundiyal, known for raw, socially rooted storytelling that captures real lives with honesty and depth. A graduate of MAAC, SIFT, and ZIMA, Raaj has built a body of work recognized on multiple platforms — his short film GLAANI earned an Official Selection at the 5th Pune Short Film Festival (2015), while PARWAAZ EK UDAAN won "Best Trailer #1" at the IFP 2014 – 50 Hours Filmmaking Challenge.
          </p>
          <p className="reveal reveal-delay-3">
            The production house's upcoming feature documentary HIMLAANS — exploring nature, culture, and human struggle across the villages of the Uttarakhand Himalayas — is currently in post-production.
          </p>
          {/* <div className="about-stats reveal reveal-delay-4">
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
          </div> */}
        </div>
      </div>
    </section>
  );
}
