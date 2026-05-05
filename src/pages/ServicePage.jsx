import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug, SERVICES } from '../data/services';
import { CITIES } from '../data/cities';
import { GALLERY_IMAGES } from '../utils/data';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema } from '../components/JsonLd';
import LeadForm from '../components/LeadForm';
import '../pages/Contact.css';
import './CityServicePage.css'; // Reuses the same styles

export default function ServicePage() {
    const { serviceSlug } = useParams();
    const service = getServiceBySlug(serviceSlug);

    if (!service) {
        return (
            <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1>Service Not Found</h1>
                <p><Link to="/services">View all services</Link></p>
            </section>
        );
    }

    const metaTitle = `${service.heroTitle} — Okanagan's Trusted Stone Coating | Sierra Stone`;
    const metaDesc = `${service.heroSubtitle} Sierra Stone provides professional ${service.name.toLowerCase()} stone coating across the Okanagan. Free estimates — (250) 808-9425.`;

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services/' },
        { name: service.name, url: `/services/${service.slug}/` },
    ];

    const serviceGallery = service.galleryFilter
        ? GALLERY_IMAGES.filter(img => img.category === service.galleryFilter).slice(0, 4)
        : [];

    // Map service slug → LeadForm select option label
    const SERVICE_FORM_LABELS = {
        'pool-decks': 'Pool Deck',
        'patios-and-decks': 'Patio / Deck',
        'driveways': 'Driveway',
        'front-steps': 'Front Steps / Walkway',
        'indoor-surfaces': 'Indoor Surface',
        'concrete-repair': 'Concrete Repair',
    };
    const defaultFormService = SERVICE_FORM_LABELS[service.slug] || '';

    return (
        <>
            <PageMeta title={metaTitle} description={metaDesc} />
            <JsonLd data={buildServiceSchema(service)} />
            <JsonLd data={buildFAQSchema(service.faq)} />
            <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

            {/* Hero */}
            <section className="cs-hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link> <span>/</span>
                        <Link to="/services">Services</Link> <span>/</span>
                        <span>{service.name}</span>
                    </nav>
                    <h1>{service.heroTitle}</h1>
                    <p>{service.heroSubtitle}</p>
                    <div className="cs-hero__actions">
                        <button
                            className="btn btn--primary"
                            onClick={() => {
                                if (window.Calendly) {
                                    window.Calendly.initPopupWidget({
                                        url: 'https://calendly.com/oktd-info/30min?hide_event_type_details=1&hide_gdpr_banner=1'
                                    });
                                }
                            }}
                        >
                            Book Free Estimate
                        </button>
                        <a href="tel:2508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="section">
                <div className="container">
                    <div className="cs-intro">
                        <p className="cs-intro__first">
                            Sierra Stone provides expert {service.name.toLowerCase()} stone coating across the
                            Okanagan — from Kelowna to Penticton and everywhere in between.
                        </p>
                        <p>{service.intro}</p>
                    </div>
                </div>
            </section>

            {/* Warning Signs */}
            <section className="section section--cream">
                <div className="container">
                    <h2>{service.warningSignsTitle}</h2>
                    <div className="cs-warnings">
                        {service.warningSigns.map((sign, i) => (
                            <div className="cs-warning" key={i}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                <span>{sign}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section">
                <div className="container">
                    <h2>How {service.name} Stone Coating Works</h2>
                    <div className="cs-process">
                        {service.process.map((step, i) => (
                            <div className="cs-process__step" key={i}>
                                <div className="cs-process__num">{i + 1}</div>
                                <div>
                                    <h3>{step.step}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            {serviceGallery.length > 0 && (
                <section className="section section--cream">
                    <div className="container">
                        <h2>{service.name} Projects</h2>
                        <div className="cs-gallery">
                            {serviceGallery.map(img => (
                                <div className="cs-gallery__item" key={img.id}>
                                    <img
                                        src={img.image}
                                        alt={`${service.name} stone coating — ${img.title} — Sierra Stone Okanagan`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Link to="/gallery" className="btn btn--outline" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
                                View Full Gallery
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* City Links */}
            <section className="section">
                <div className="container">
                    <h2>{service.name} Stone Coating by City</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        We provide {service.name.toLowerCase()} services across the Okanagan.
                        Find your city below for local details and pricing.
                    </p>
                    <div className="city-services__grid">
                        {CITIES.map(city => (
                            <Link to={`/${city.slug}/${service.slug}/`} className="city-service-card" key={city.slug}>
                                <h3>{service.name} in {city.name}</h3>
                                <p>{city.intro.slice(0, 120)}...</p>
                                <span className="city-service-card__link">Learn more →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Form */}
            <section className="section">
                <div className="container">
                    <div className="service-lead-form">
                        <LeadForm
                            defaultService={defaultFormService}
                            title={`Get a Free ${service.name} Estimate`}
                            subtitle={`Tell us about your ${service.name.toLowerCase()} project and we'll be in touch with a no-obligation quote.`}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section section--cream">
                <div className="container">
                    <h2>Frequently Asked Questions About {service.name}</h2>
                    <div className="cs-faq">
                        {service.faq.map((item, i) => (
                            <details className="cs-faq__item" key={i}>
                                <summary>{item.q}</summary>
                                <p>{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Get a Free {service.name} Estimate</h2>
                    <p>No obligation. We serve all of the South &amp; Central Okanagan.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Get Free Estimate</Link>
                        <Link to="/visualizer" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Try AI Visualizer
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
