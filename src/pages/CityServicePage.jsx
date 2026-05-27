import { useParams, Link } from 'react-router-dom';
import { getCityBySlug } from '../data/cities';
import { getServiceBySlug } from '../data/services';
import { GALLERY_IMAGES } from '../utils/data';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema, buildLocalBusinessSchema } from '../components/JsonLd';
import TldrBlock from '../components/TldrBlock';
import WeatherWidget from '../components/WeatherWidget';
import '../components/TldrBlock.css';
import './CityServicePage.css';

export default function CityServicePage() {
    const { citySlug, serviceSlug } = useParams();
    const city = getCityBySlug(citySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!city || !service) {
        return (
            <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1>Page Not Found</h1>
                <p><Link to="/">Return to homepage</Link></p>
            </section>
        );
    }

    const h1 = service.h1City
        ? service.h1City.replace('{city}', city.name)
        : `${service.heroTitle} in ${city.name}`;

    // City-localized tldr — same answer, with the city named in the first sentence
    // for snippet capture on "{service} {city}" queries.
    const cityTldr = service.tldr
        ? service.tldr.replace(/\bSierra Stone\b/, `Sierra Stone in ${city.name}`)
        : null;

    const metaTitle = service.metaTitleTemplate
        ? service.metaTitleTemplate
            .replace('{service}', `${service.name} Stone Coating`)
            .replace('{city}', city.name)
        : `${h1} | Sierra Stone Southcentral`;
    const metaDesc = cityTldr
        ? `${cityTldr} Free estimates — (250) 808-9425.`
        : service.metaDescTemplate.replace('{city}', city.name);

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: city.name, url: `/${city.slug}/` },
        { name: service.name, url: `/${city.slug}/${service.slug}/` },
    ];

    // Filter gallery for this service
    const serviceGallery = service.galleryFilter
        ? GALLERY_IMAGES.filter(img => img.category === service.galleryFilter).slice(0, 4)
        : [];

    return (
        <>
            <PageMeta title={metaTitle} description={metaDesc} />
            <JsonLd data={buildServiceSchema(service, city)} />
            <JsonLd data={buildLocalBusinessSchema(city)} />
            <JsonLd data={buildFAQSchema(service.faq)} />
            <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

            {/* Hero */}
            <section className="cs-hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link> <span>/</span>
                        <Link to={`/${city.slug}/`}>{city.name}</Link> <span>/</span>
                        <span>{service.name}</span>
                    </nav>
                    <h1>{h1}</h1>
                    {cityTldr ? (
                        <TldrBlock answer={cityTldr} points={service.keyPoints} />
                    ) : (
                        <p>{service.heroSubtitle}</p>
                    )}
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
                            Sierra Stone provides expert {service.name.toLowerCase()} stone coating in {city.name} featuring
                            premium natural stone aggregate and industrial-grade epoxy to transform your outdoor space.
                        </p>
                        <p>{service.intro}</p>
                    </div>
                    <WeatherWidget city={city} />
                </div>
            </section>

            {/* Why Sierra Stone (when defined) */}
            {service.whyUs && service.whyUs.length > 0 && (
                <section className="section section--cream">
                    <div className="container">
                        <h2>Why Sierra Stone for {service.name} in {city.name}</h2>
                        <ul className="cs-whyus">
                            {service.whyUs.map((reason, i) => (
                                <li className="cs-whyus__item" key={i}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Warning Signs */}
            <section className={service.whyUs && service.whyUs.length > 0 ? 'section' : 'section section--cream'}>
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
                    <h2>How {service.name} Stone Coating Works in {city.name}</h2>
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
                        <h2>{service.name} Projects in the Okanagan</h2>
                        <div className="cs-gallery">
                            {serviceGallery.map(img => (
                                <div className="cs-gallery__item" key={img.id}>
                                    <img
                                        src={img.image}
                                        alt={`${service.name} stone coating project — ${img.title} — Sierra Stone ${city.name}`}
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

            {/* FAQ */}
            <section className="section">
                <div className="container">
                    <h2>Frequently Asked Questions About {service.name} in {city.name}</h2>
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

            {/* Visualizer CTA */}
            <section className="section section--dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>See How Sierra Stone {service.name} Looks on Your {city.name} Home</h2>
                    <p style={{ maxWidth: '550px', margin: '1rem auto 1.5rem', color: 'var(--text-light)' }}>
                        Upload a photo and our AI will instantly show you the transformation.
                    </p>
                    <Link to="/visualizer" className="btn btn--primary">Try AI Visualizer — Free</Link>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Get a Free {service.name} Estimate in {city.name}</h2>
                    <p>No obligation. We'll visit your home, assess your surfaces, and provide a detailed quote.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn--dark"
                            onClick={() => {
                                if (window.Calendly) {
                                    window.Calendly.initPopupWidget({
                                        url: 'https://calendly.com/oktd-info/30min?hide_event_type_details=1&hide_gdpr_banner=1'
                                    });
                                }
                            }}
                        >
                            Schedule Visit
                        </button>
                        <a href="tel:2508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
