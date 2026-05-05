import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import './Services.css';

const COVERS = [
    { icon: '🧱', title: 'Cracked Concrete', desc: 'Chipping, peeling, pitting, or cracking concrete surfaces get a brand new life.' },
    { icon: '🎨', title: 'Faded Vinyl Decking', desc: 'Discoloured or stained old vinyl decking transformed into a stunning stone surface.' },
    { icon: '🪵', title: 'Wooden Decks', desc: 'Waterproofed wooden decks coated with durable, weather-resistant stone aggregate.' },
    { icon: '💎', title: 'Stamped Concrete', desc: 'Outdated exposed aggregate or stamped concrete gets a premium stone upgrade.' },
    { icon: '🏗️', title: 'New Builds', desc: 'Fresh cement, concrete, or wood surfaces on new construction projects.' },
    { icon: '🏠', title: 'Indoor Surfaces', desc: 'Sierra Stone can be applied indoors to basements, garages, and more.' },
];

const PRACTICAL = [
    {
        title: 'Maintenance',
        desc: 'Sierra Stone requires a simple re-coat of epoxy every 2-3 years depending on sun, moisture, and snow exposure. Most applications last 20+ years with minimal upkeep.',
    },
    {
        title: 'Repairs',
        desc: 'Any chipping can be fixed without being visible. It is difficult to spot a newly fixed area — chipping is rare due to the durability of the industrial-grade epoxy.',
    },
    {
        title: 'Installation',
        desc: 'Installation is done over a few days, with most jobs completed within a week. Your driveway, patio, or pool deck will be ready for use shortly after.',
    },
];

export default function Services() {
    return (
        <>
            <section className="services-hero">
                <div className="container">
                    <span className="section-label">What We Do</span>
                    <h1>Premium Stone Coating<br />Solutions</h1>
                    <p>
                        Natural stone aggregate and industrial-grade epoxy — a beautiful, unique,
                        and long-lasting surface for any outdoor or indoor space.
                    </p>
                </div>
            </section>

            {/* What is Sierra Stone */}
            <section className="section">
                <div className="container">
                    <div className="what-is">
                        <div className="what-is__text">
                            <span className="section-label">The Product</span>
                            <h2>What is Sierra Stone?</h2>
                            <p>
                                A mix of natural stone aggregate and industrial-grade epoxy creates the beautiful,
                                unique, and long-lasting Sierra Stone. Strong enough to withstand the toughest weather
                                conditions and made to last in high-traffic areas.
                            </p>
                            <p>
                                The Sierra Stone brand has had <strong>30 years of success</strong> all over North America
                                and Australia. Whether it's resurfacing during a renovation, on a new build, or just to add
                                sparkle to an area you spend a lot of time in — Sierra Stone delivers.
                            </p>
                            <p>
                                Add value to your home or beautify a space — Sierra Stone can be applied indoors or outdoors
                                to any solid surface.
                            </p>
                            <Link to="/colours" className="btn btn--primary" style={{ marginTop: '0.5rem' }}>
                                Explore Stone Colours
                            </Link>
                        </div>
                        <div className="what-is__image">
                            <img
                                src="https://static.wixstatic.com/media/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg/v1/fill/w_700,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg"
                                alt="Sierra Stone pool deck installation"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Grid */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span className="section-label">Where We Apply It</span>
                        <h2>Our Services</h2>
                        <p style={{ margin: '0.75rem auto 0', color: 'var(--text-secondary)' }}>
                            Six dedicated services across residential and commercial spaces — explore each
                            for specific applications, project examples, and FAQs.
                        </p>
                    </div>
                    <div className="services-grid">
                        {SERVICES.map((s) => (
                            <Link key={s.slug} to={`/services/${s.slug}`} className="service-link-card">
                                <h3>{s.name}</h3>
                                <p>{s.heroSubtitle}</p>
                                <span className="service-link-card__cta">Learn more →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Can We Cover */}
            <section className="section section--cream">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <span className="section-label">Versatile Application</span>
                        <h2>What Can We Cover?</h2>
                        <p style={{ margin: '0.75rem auto 0', color: 'var(--text-secondary)' }}>
                            Ask us about covering your trouble areas with an easy-to-maintain, versatile and
                            durable product that will liven up any uninspired surface.
                        </p>
                    </div>
                    <div className="cover-section__grid">
                        {COVERS.map((c) => (
                            <div className="cover-card" key={c.title}>
                                <div className="cover-card__icon">{c.icon}</div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Practical Info */}
            <section className="section section--dark">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <span className="section-label">Good to Know</span>
                        <h2>Practical Information</h2>
                    </div>
                    <div className="practical-info__grid">
                        {PRACTICAL.map((p) => (
                            <div className="practical-card" key={p.title}>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Interested in Sierra Stone?</h2>
                    <p>Get a free, no-obligation estimate for your unique space.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Get Free Estimate</Link>
                        <Link to="/visualizer" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            ✨ Try AI Visualizer
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
