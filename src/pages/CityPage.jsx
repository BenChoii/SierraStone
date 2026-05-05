import { useParams, Link } from 'react-router-dom';
import { getCityBySlug } from '../data/cities';
import { SERVICES } from '../data/services';
import { TESTIMONIALS } from '../utils/data';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildLocalBusinessSchema, buildBreadcrumbSchema } from '../components/JsonLd';
import './CityPage.css';

export default function CityPage() {
    const { citySlug } = useParams();
    const city = getCityBySlug(citySlug);

    if (!city) {
        return (
            <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1>City Not Found</h1>
                <p>We couldn't find that location. <Link to="/">Return to homepage</Link></p>
            </section>
        );
    }

    // Filter testimonials for this city (or show all if none match)
    const cityTestimonials = TESTIMONIALS.filter(t =>
        t.location.toLowerCase().includes(city.name.toLowerCase())
    );

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: city.name, url: `/${city.slug}/` },
    ];

    return (
        <>
            <PageMeta title={city.metaTitle} description={city.metaDescription} />
            <JsonLd data={buildLocalBusinessSchema(city)} />
            <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

            {/* Hero */}
            <section className="city-hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link> <span>/</span> <span>{city.name}</span>
                    </nav>
                    <h1>Stone Coating Services in {city.name}</h1>
                    <p>{city.intro}</p>
                    <div className="city-hero__actions">
                        <a href="tel:2508089425" className="btn btn--primary">
                            Call (250) 808-9425
                        </a>
                        <Link to="/contact" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Get Free Estimate
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <span className="section-label">Our Services</span>
                    <h2>What We Do in {city.name}</h2>
                    <p className="section-intro">
                        Sierra Stone provides premium stone coating for every outdoor and indoor surface.
                        Click any service below to learn more about how it works in {city.name}.
                    </p>
                    <div className="city-services__grid">
                        {SERVICES.map(service => (
                            <Link
                                to={`/${city.slug}/${service.slug}/`}
                                className="city-service-card"
                                key={service.slug}
                            >
                                <h3>{service.name}</h3>
                                <p>{service.heroSubtitle}</p>
                                <span className="city-service-card__link">
                                    Learn more about {service.shortName} in {city.name} →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Insight */}
            <section className="section section--cream">
                <div className="container">
                    <h2>Why {city.name} Homeowners Choose Sierra Stone</h2>
                    <div className="city-insight">
                        <p>{city.localInsight}</p>
                        <div className="city-neighborhoods">
                            <h3>Serving All {city.name} Neighborhoods</h3>
                            <div className="city-neighborhoods__list">
                                {city.neighborhoods.map(n => (
                                    <span key={n} className="city-neighborhood-tag">{n}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Local Factors — climate / surface conditions specific to this city */}
            {city.localFactors && city.localFactors.length > 0 && (
                <section className="section">
                    <div className="container">
                        <h2>What {city.name} Surfaces Have to Handle</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Local climate and substrate conditions that matter when choosing a coating system in {city.name}.
                        </p>
                        <ul className="city-factors">
                            {city.localFactors.map((factor, i) => (
                                <li className="city-factors__item" key={i}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <span>{factor}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Local Projects */}
            {city.localProjects && city.localProjects.length > 0 && (
                <section className="section section--cream">
                    <div className="container">
                        <h2>Recent {city.name} Projects</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            A sample of the kinds of installations we have completed in {city.name} and surrounding neighborhoods.
                        </p>
                        <ul className="city-projects">
                            {city.localProjects.map((proj, i) => (
                                <li className="city-projects__item" key={i}>
                                    <span className="city-projects__bullet" aria-hidden="true" />
                                    <span>{proj}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Testimonials (if available for this city) */}
            {cityTestimonials.length > 0 && (
                <section className="section">
                    <div className="container">
                        <h2>What {city.name} Customers Say</h2>
                        <div className="city-testimonials">
                            {cityTestimonials.map(t => (
                                <blockquote className="city-testimonial" key={t.id}>
                                    <p>"{t.text}"</p>
                                    <footer>— {t.author}, {t.location}</footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Visualizer CTA */}
            <section className="section section--dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>See Sierra Stone on Your {city.name} Home</h2>
                    <p style={{ maxWidth: '600px', margin: '1rem auto 1.5rem', color: 'var(--text-light)' }}>
                        Upload a photo of your space and our AI Visualizer will show you exactly how Sierra Stone
                        will look — before you commit.
                    </p>
                    <Link to="/visualizer" className="btn btn--primary">
                        Try AI Visualizer — Free
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Ready for a Free Estimate in {city.name}?</h2>
                    <p>Get a no-obligation quote for your project. We serve all of {city.name} and surrounding areas.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Get Free Estimate</Link>
                        <a href="tel:2508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
