import { useParams, Link } from 'react-router-dom';
import { getGuideBySlug } from '../data/guides';
import { getServiceBySlug } from '../data/services';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildArticleSchema, buildFAQSchema, buildBreadcrumbSchema } from '../components/JsonLd';
import './GuidePage.css';

export default function GuidePage() {
    const { guideSlug } = useParams();
    const guide = getGuideBySlug(guideSlug);

    if (!guide) {
        return (
            <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1>Guide Not Found</h1>
                <p><Link to="/guides">Browse all guides</Link></p>
            </section>
        );
    }

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides/' },
        { name: guide.title.length > 40 ? guide.title.slice(0, 40) + '...' : guide.title, url: `/guides/${guide.slug}/` },
    ];

    const relatedServices = (guide.relatedServices || [])
        .map(slug => getServiceBySlug(slug))
        .filter(Boolean);

    return (
        <>
            <PageMeta title={guide.metaTitle} description={guide.metaDescription} />
            <JsonLd data={buildArticleSchema(guide)} />
            <JsonLd data={buildFAQSchema(guide.faq)} />
            <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

            {/* Hero */}
            <section className="guide-hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link> <span>/</span>
                        <Link to="/guides">Guides</Link> <span>/</span>
                        <span>{guide.category}</span>
                    </nav>
                    <span className="guide-hero__category">{guide.category}</span>
                    <h1>{guide.title}</h1>
                    <p className="guide-hero__meta">{guide.readTime}</p>
                </div>
            </section>

            {/* Article Content */}
            <section className="section">
                <div className="container">
                    <article className="guide-article">
                        <p className="guide-article__intro">{guide.intro}</p>

                        {guide.sections.map((section, i) => (
                            <div className="guide-section" key={i}>
                                <h2>{section.heading}</h2>
                                {section.content.split('\n\n').map((para, j) => (
                                    <p key={j} dangerouslySetInnerHTML={{
                                        __html: para
                                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/^• (.+)/gm, '<span class="guide-bullet">$1</span>')
                                    }} />
                                ))}
                            </div>
                        ))}

                        {/* Verdict */}
                        <div className="guide-verdict">
                            <h2>The Bottom Line</h2>
                            <p>{guide.verdict}</p>
                        </div>

                        {/* FAQ */}
                        <div className="guide-faq">
                            <h2>Frequently Asked Questions</h2>
                            <div className="cs-faq">
                                {guide.faq.map((item, i) => (
                                    <details className="cs-faq__item" key={i}>
                                        <summary>{item.q}</summary>
                                        <p>{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* Related Services */}
                        {relatedServices.length > 0 && (
                            <div className="guide-related">
                                <h3>Related Services</h3>
                                <div className="guide-related__grid">
                                    {relatedServices.map(s => (
                                        <Link to={`/services/${s.slug}/`} className="guide-related__link" key={s.slug}>
                                            {s.name} Stone Coating →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Ready to See the Difference?</h2>
                    <p>Try our AI Visualizer to see Sierra Stone on your own home, or book a free estimate.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/visualizer" className="btn btn--dark">Try AI Visualizer</Link>
                        <Link to="/contact" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            Get Free Estimate
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
