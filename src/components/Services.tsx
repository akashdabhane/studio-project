'use client';

export interface ServicePillar {
  num: string;
  title: string;
  tagline: string;
  description: string;
}

const servicesData: ServicePillar[] = [
  {
    num: '01',
    title: 'PRE-PRODUCTION',
    tagline: 'Where every vision begins.',
    description:
      'From the first idea to the final plan, we shape concepts, scripts, storyboards, casting, locations, and production strategy into a clear creative vision.',
  },
  {
    num: '02',
    title: 'PRODUCTION',
    tagline: 'Where ideas come to life.',
    description:
      'With thoughtful direction, cinematic visuals, and meticulous execution, we transform concepts into compelling stories that leave a lasting impression.',
  },
  {
    num: '03',
    title: 'POST-PRODUCTION',
    tagline: 'Where the story finds its soul.',
    description:
      'Through precise editing, cinematic color grading, immersive sound design, motion graphics, and VFX, we craft every frame into a finished visual experience.',
  },
  {
    num: '04',
    title: 'DIGITAL CONTENT & AI FILMS',
    tagline: 'Stories made to move at the speed of culture.',
    description:
      'We create sharp, engaging, and platform-first content that captures attention, builds brand presence, and turns everyday moments into memorable digital stories.',
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      {/* Section Header */}
      <div className="section-header">
        <div>
          <div className="section-label reveal">What We Do</div>
          <h2 className="section-title reveal reveal-delay-1">Services</h2>
        </div>
        <a href="#contact" className="section-link reveal">
          Start a Project →
        </a>
      </div>

      {/* Services Grid */}
      <div className="new-services-grid">
        {servicesData.map((item, idx) => (
          <div
            key={item.num}
            className={`new-service-card reveal reveal-delay-${(idx % 4) + 1}`}
          >
            <div className="new-service-card-inner">
              <div className="new-service-top">
                <span className="new-service-num">{item.num}</span>
                <div className="new-service-line"></div>
              </div>
              <h3 className="new-service-title">{item.title}</h3>
              <p className="new-service-tagline">{item.tagline}</p>
              <p className="new-service-desc">{item.description}</p>
            </div>
            <div className="new-service-card-accent"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
