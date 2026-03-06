import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../utils/data';
import './Testimonials.css';

function getInitials(name) {
    return name.split(/[& ]+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function Testimonials() {
    return (
        <>
            <section className="testimonials-hero">
                <div className="container">
                    <span className="section-label">What Our Clients Say</span>
                    <h1>Testimonials</h1>
                    <p>
                        Hear from homeowners across the Okanagan who've transformed their
                        outdoor spaces with Sierra Stone.
                    </p>
                </div>
            </section>

            <section className="testimonials-grid">
                <div className="container">
                    <div className="testimonials-grid__inner">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.id} className="testimonial-card">
                                <div className="testimonial-card__quote">"</div>
                                <p className="testimonial-card__text">{t.text}</p>
                                <div className="testimonial-card__footer">
                                    <div className="testimonial-card__avatar">
                                        {getInitials(t.author)}
                                    </div>
                                    <div className="testimonial-card__info">
                                        <h4>{t.author}</h4>
                                        <span>{t.location}</span>
                                    </div>
                                </div>
                                <div className="testimonial-card__service">{t.service}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="testimonials-google">
                <div className="container">
                    <div className="testimonials-google__stars">
                        <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                    </div>
                    <h3>See More on Google</h3>
                    <p>Read all of our reviews on our Google Business Profile</p>
                    <a
                        href="https://share.google/ciG7k768Mrunj4zF8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        Read Google Reviews
                    </a>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <h2>Ready for Your Transformation?</h2>
                    <p>Join our happy customers — get a free estimate for your project today.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" className="btn btn--dark">Get Free Estimate</Link>
                        <a href="tel:+12508089425" className="btn btn--outline" style={{ borderColor: 'white', color: 'white' }}>
                            📞 Call (250) 808-9425
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
