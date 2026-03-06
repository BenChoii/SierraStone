import { Link } from 'react-router-dom';
import { GUIDES } from '../data/guides';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildBreadcrumbSchema } from '../components/JsonLd';
import './GuidePage.css';

export default function GuidesHub() {
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides/' },
    ];

    return (
        <>
            <PageMeta
                title="Stone Coating Guides — Tips, Comparisons & Expert Advice | Sierra Stone"
                description="Expert guides on stone coating for the Okanagan — comparisons, maintenance tips, cost guides, and everything you need to make the right decision for your home."
            />
            <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

            <section className="guide-hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link> <span>/</span> <span>Guides</span>
                    </nav>
                    <h1>Stone Coating Guides &amp; Expert Advice</h1>
                    <p>
                        Everything you need to know about stone coating — from comparing surfaces to
                        maintenance tips and cost breakdowns. Written by our experts for Okanagan homeowners.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="guides-grid">
                        {GUIDES.map(guide => (
                            <Link to={`/guides/${guide.slug}/`} className="guide-card" key={guide.slug}>
                                <span className="guide-card__category">{guide.category}</span>
                                <h2>{guide.title}</h2>
                                <p>{guide.intro.slice(0, 160)}...</p>
                                <div className="guide-card__meta">
                                    <span>{guide.readTime}</span>
                                    <span className="guide-card__link">Read guide →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <h2>Have a Question We Haven't Answered?</h2>
                    <p>Our stone coating experts are happy to help. Reach out for a free, no-pressure conversation.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Contact Us</Link>
                        <a href="tel:2508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
