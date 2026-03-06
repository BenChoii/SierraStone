import { Link } from 'react-router-dom';
import { GALLERY_IMAGES, TESTIMONIALS } from '../utils/data';
import './Home.css';

const SERVICE_CARDS = [
    {
        title: 'Pool Decks',
        desc: 'Resort-style stone finishes for your poolside oasis',
        image: 'https://static.wixstatic.com/media/c1b584_5925649289064fc6ab7a3185cf41e48c~mv2.jpg/v1/fill/w_600,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_5925649289064fc6ab7a3185cf41e48c~mv2.jpg',
    },
    {
        title: 'Patios & Decks',
        desc: 'Transform your outdoor living and entertaining spaces',
        image: 'https://static.wixstatic.com/media/c1b584_96ee902053cd4ce2a83e65c2888f53fe~mv2.jpg/v1/fill/w_600,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_96ee902053cd4ce2a83e65c2888f53fe~mv2.jpg',
    },
    {
        title: 'Driveways',
        desc: 'Durable, beautiful curb appeal that lasts 20+ years',
        image: 'https://static.wixstatic.com/media/c1b584_dd95d1fee311433b8f166e153ec6abd7~mv2.jpg/v1/fill/w_600,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_dd95d1fee311433b8f166e153ec6abd7~mv2.jpg',
    },
    {
        title: 'Front Steps',
        desc: 'Create a welcoming first impression for every guest',
        image: 'https://static.wixstatic.com/media/c1b584_d338d4cafa6042e59e8521f6a4ee6239~mv2.jpg/v1/fill/w_600,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_d338d4cafa6042e59e8521f6a4ee6239~mv2.jpg',
    },
];

export default function Home() {
    const featuredTestimonial = TESTIMONIALS[0];

    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero__bg" />
                <div className="hero__overlay" />
                <div className="hero__content">
                    <div className="hero__badge">
                        <span /> Serving the Central & South Okanagan
                    </div>
                    <h1>
                        Transform Your Outdoor<br />
                        Spaces with <em>Natural Stone</em>
                    </h1>
                    <p className="hero__subtitle">
                        Premium stone aggregate coatings for pool decks, patios, driveways and steps.
                        30+ years of proven beauty and durability across North America.
                    </p>
                    <div className="hero__buttons">
                        <Link to="/contact" className="btn btn--primary">Get Free Estimate</Link>
                        <Link to="/visualizer" className="btn btn--outline">
                            ✨ Try AI Visualizer
                        </Link>
                    </div>
                </div>
                <div className="hero__scroll-hint">
                    <span>Scroll</span>
                    <div className="hero__scroll-line" />
                </div>
            </section>

            {/* Service Cards */}
            <section className="services-strip container">
                <div className="services-strip__grid">
                    {SERVICE_CARDS.map((s) => (
                        <Link to="/gallery" key={s.title} className="service-card">
                            <div className="service-card__image">
                                <img src={s.image} alt={s.title} loading="lazy" />
                            </div>
                            <div className="service-card__content">
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Sierra Stone */}
            <section className="section why-section">
                <div className="container">
                    <div className="why-section__grid">
                        <div className="why-section__text">
                            <span className="section-label">Why Sierra Stone</span>
                            <h2>30+ Years of Proven<br />Excellence</h2>
                            <p>
                                A mix of natural stone aggregate and industrial-grade epoxy creates the beautiful,
                                unique, and long-lasting Sierra Stone. Strong enough to withstand weather and made
                                to last in high-traffic areas.
                            </p>
                            <div className="why-section__features">
                                <div className="why-feature">
                                    <div className="why-feature__icon">🪨</div>
                                    <div>
                                        <h4>Natural Stone</h4>
                                        <p>Real stone aggregate with industrial-grade epoxy</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="why-feature__icon">🛡️</div>
                                    <div>
                                        <h4>Weather Resistant</h4>
                                        <p>Built for Canadian seasons, sun, rain & snow</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="why-feature__icon">🔧</div>
                                    <div>
                                        <h4>Low Maintenance</h4>
                                        <p>Simple re-coat every 2-3 years, lasts 20+ years</p>
                                    </div>
                                </div>
                                <div className="why-feature">
                                    <div className="why-feature__icon">🏠</div>
                                    <div>
                                        <h4>Add Home Value</h4>
                                        <p>Instant curb appeal and property value boost</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="why-section__image-grid">
                            <img
                                src="https://static.wixstatic.com/media/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg/v1/fill/w_600,h_700,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg"
                                alt="Pool deck project"
                                loading="lazy"
                            />
                            <img
                                src="https://static.wixstatic.com/media/c1b584_123403186c9349ae8e344cbabb173436~mv2.jpg/v1/fill/w_400,h_340,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_123403186c9349ae8e344cbabb173436~mv2.jpg"
                                alt="Patio project"
                                loading="lazy"
                            />
                            <img
                                src="https://static.wixstatic.com/media/c1b584_4679da6f63fc43a8b0f4122e0a9350ec~mv2.jpg/v1/fill/w_400,h_340,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/new%20pool%20shiraz%202.jpg"
                                alt="Pool with stone"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Visualizer CTA */}
            <section className="section ai-cta">
                <div className="container">
                    <div className="ai-cta__inner">
                        <div className="ai-cta__text">
                            <span className="section-label">New — AI Powered</span>
                            <h2>See Your Space in<br />Sierra Stone</h2>
                            <p>
                                Upload a photo of your patio, driveway, pool deck, or steps and our AI
                                visualizer will show you exactly what it would look like with your chosen
                                Sierra Stone colour — in seconds.
                            </p>
                            <div className="ai-cta__steps">
                                <div className="ai-cta__step">
                                    <div className="ai-cta__step-num">1</div>
                                    <span>Upload a photo of your space</span>
                                </div>
                                <div className="ai-cta__step">
                                    <div className="ai-cta__step-num">2</div>
                                    <span>Choose your Sierra Stone colour</span>
                                </div>
                                <div className="ai-cta__step">
                                    <div className="ai-cta__step-num">3</div>
                                    <span>See the transformation instantly</span>
                                </div>
                            </div>
                            <Link to="/visualizer" className="btn btn--gold">
                                ✨ Try AI Visualizer — Free
                            </Link>
                        </div>
                        <div className="ai-cta__preview">
                            <img
                                src="https://static.wixstatic.com/media/c1b584_76562015dd0e492e806de2d153ec1213~mv2.jpg/v1/fill/w_700,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_76562015dd0e492e806de2d153ec1213~mv2.jpg"
                                alt="AI Visualizer preview"
                                loading="lazy"
                            />
                            <div className="ai-cta__preview-badge">✨ AI Enhanced</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Highlight */}
            <section className="section testimonial-highlight">
                <div className="container">
                    <span className="section-label">Customer Reviews</span>
                    <div className="testimonial-highlight__quote">
                        <blockquote>{featuredTestimonial.text}</blockquote>
                        <div className="testimonial-highlight__author">— {featuredTestimonial.author}</div>
                        <div className="testimonial-highlight__location">{featuredTestimonial.location}</div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Ready to Transform Your Space?</h2>
                    <p>Every space is unique. Get a free, no-obligation estimate for your project.</p>
                    <div className="cta-banner__buttons">
                        <Link to="/contact" className="btn btn--dark">Request Free Estimate</Link>
                        <a href="tel:+12508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            📞 Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
