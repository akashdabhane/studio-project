'use client';

export default function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="about-visual reveal">
          <picture>
            <img
              src="/assets/raj-photo.jpg"
              alt="About Vijesha Films - Raj"
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
            Vijesha Films is an independent production house founded by Raaj Dhoundiyal, a filmmaker with a strong background in cinematography, editing, writing, and color grading, trained at institutions including MAAC, SIFT, and ZIMA. We are committed to bold, authentic storytelling that gives voice to communities and experiences rarely seen on screen.
          </p>
          <p className="reveal reveal-delay-3">
            From gritty realities to sweeping mountain landscapes, every frame we put out is a declaration of intent. We don't just make films — we build stories that carry the weight of the places and people they come from.
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
