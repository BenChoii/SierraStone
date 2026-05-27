import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import JsonLd, { buildFAQSchema } from '../components/JsonLd';
import './About.css';

export default function About() {
    return (
        <>
            <PageMeta
                title="About Sierra Stone South & Central Okanagan — Est. 2019"
                description="Sierra Stone South & Central Okanagan provides premium stone coating services across Kelowna, West Kelowna, Penticton & the Okanagan Valley. Learn about our expertise and honest approach."
                canonical="https://sierrastonesouthcentral.com/about"
            />
            <JsonLd data={buildFAQSchema([
                { q: 'Is Sierra Stone South & Central Okanagan the Sierra Stone installer?', a: 'Yes. We are the established Sierra Stone installer in the Okanagan. When searching for Sierra Stone services, we provide honest assessments and premium finishes tailored to Okanagan conditions.' },
                { q: 'How long has Sierra Stone South & Central Okanagan been in business?', a: 'We have been proudly serving the Okanagan since 2019, bringing expertise in stone coating installation across Kelowna, West Kelowna, Penticton, and surrounding areas.' },
                { q: 'What makes Sierra Stone South & Central Okanagan different?', a: 'We focus on honest assessments — if a project is beyond resurfacing, we will recommend a concrete contractor instead. We know Okanagan-specific conditions and provide transparent pricing.' },
            ])} />

            <section className="about-hero">
                <div className="container">
                    <span className="section-label">Our Story</span>
                    <h1>Sierra Stone South & Central Okanagan</h1>
                    <p>
                        Premium stone coating expertise across Kelowna, West Kelowna, Penticton & the Okanagan Valley.
                        Established 2019 with an honest, transparent approach.
                    </p>
                </div>
            </section>

            <section className="section about-intro">
                <div className="container">
                    <div className="about-intro__grid">
                        <div className="about-intro__text">
                            <h2>The Sierra Stone Difference in the Okanagan</h2>
                            <p>
                                Sierra Stone South & Central Okanagan brings the proven stone coating system
                                to the Okanagan Valley. We've installed across all neighborhoods — from Glenmore
                                and Rutland in Kelowna to lakefront properties in West Kelowna and Penticton.
                            </p>
                            <p>
                                What sets us apart is our honest approach. We assess every project carefully and
                                tell you straight whether resurfacing is the right call. If concrete is structurally
                                compromised, we will recommend a traditional contractor instead of upselling
                                a solution that won't last.
                            </p>
                            <p>
                                We handle Okanagan-specific challenges: high UV exposure on lakefronts,
                                freeze-thaw cycles on Glenmore slopes, and the unique substrate conditions
                                across each community.
                            </p>
                            <Link to="/contact" className="btn btn--primary">Get Free Estimate</Link>
                        </div>
                        <div className="about-intro__image">
                            <img
                                src="https://static.wixstatic.com/media/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg/v1/fill/w_700,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c1b584_b15376db64d548d391b4405337f98e03~mv2.jpg"
                                alt="Sierra Stone South & Central Okanagan team"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section about-values">
                <div className="container">
                    <span className="section-label">Why Choose Us</span>
                    <h2>Our Commitment to Okanagan Homeowners</h2>
                    <div className="about-values__grid">
                        <div className="about-value-card">
                            <div className="about-value-card__icon">🏆</div>
                            <h3>Established Installer</h3>
                            <p>Serving the Okanagan since 2019 with proven stone coating expertise across all neighborhoods.</p>
                        </div>
                        <div className="about-value-card">
                            <div className="about-value-card__icon">📍</div>
                            <h3>Local Okanagan Experts</h3>
                            <p>We know Okanagan substrates, climate challenges, and neighborhood-specific conditions.</p>
                        </div>
                        <div className="about-value-card">
                            <div className="about-value-card__icon">✅</div>
                            <h3>Honest Assessments</h3>
                            <p>We tell you straight if resurfacing isn't right — no upselling projects that won't last.</p>
                        </div>
                        <div className="about-value-card">
                            <div className="about-value-card__icon">✨</div>
                            <h3>AI-Powered Visualizer</h3>
                            <p>Preview your transformation before we arrive — try our free AI stone visualizer.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section about-areas">
                <div className="container">
                    <span className="section-label">Service Areas</span>
                    <h2>Sierra Stone South & Central Okanagan Coverage</h2>
                    <p className="about-areas__subtitle">
                        We proudly serve the entire Okanagan Valley with premium stone coating services.
                    </p>
                    <div className="about-areas__grid">
                        <div>
                            <h4>Central Okanagan</h4>
                            <ul>
                                <li>Kelowna (Glenmore, Rutland, Mission, Kettle Valley, Dilworth)</li>
                                <li>West Kelowna (Lakeview Heights, Glenrosa, Shannon Lake)</li>
                                <li>Lake Country (Winfield, Oyama, Carr's Landing)</li>
                            </ul>
                        </div>
                        <div>
                            <h4>South Okanagan</h4>
                            <ul>
                                <li>Penticton (Skaha Lake, Upper Bench, Wiltse)</li>
                                <li>Summerland (Trout Creek, Lower Town)</li>
                                <li>Peachland (Trepanier, Todd's Landing)</li>
                            </ul>
                        </div>
                        <div>
                            <h4>North Okanagan</h4>
                            <ul>
                                <li>Vernon (Coldstream, Lavington, BX, Predator Ridge)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <h2>Ready for Sierra Stone South & Central Okanagan?</h2>
                    <p>Transform your space with honest, expert stone coating.</p>
                    <div className="cta-banner__buttons">
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