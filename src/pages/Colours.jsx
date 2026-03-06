import { Link } from 'react-router-dom';
import { STONE_CATEGORIES } from '../utils/data';
import './Colours.css';

export default function Colours() {
    return (
        <>
            <section className="colours-hero">
                <div className="container">
                    <span className="section-label">Choose Your Stone</span>
                    <h1>Stone Colours & Blends</h1>
                    <p>
                        Explore our full range of natural stone colours and blends.
                        Each one is recommended for outdoor applications and built to last.
                    </p>
                </div>
            </section>

            {STONE_CATEGORIES.map((category) => (
                <section key={category.name} className="colours-category">
                    <div className="container">
                        <div className="colours-category__title">
                            <span className="section-label">{category.name.includes('Blend') ? 'Blends' : 'Solid Colours'}</span>
                            <h2>{category.name}</h2>
                        </div>
                        <div className="colours-grid">
                            {category.stones.map((stone) => (
                                <div key={stone.id} className="colour-card">
                                    <div className="colour-card__image">
                                        <img src={stone.image} alt={stone.name} loading="lazy" />
                                        <div
                                            className="colour-card__swatch"
                                            style={{ backgroundColor: stone.colorHex }}
                                            title={stone.name}
                                        />
                                    </div>
                                    <div className="colour-card__content">
                                        <h3>{stone.name}</h3>
                                        <p>{stone.description}</p>
                                        <Link to={`/visualizer?stone=${stone.id}`} className="colour-card__cta">
                                            Try in AI Visualizer →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <section className="cta-banner">
                <div className="container">
                    <h2>Want to See Samples In Person?</h2>
                    <p>Book a quote to see samples of all colours & sizes of stone and discuss your unique space.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Book a Quote</Link>
                        <Link to="/visualizer" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            ✨ Try AI Visualizer
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
