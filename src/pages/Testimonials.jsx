import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../utils/data';
import './Testimonials.css';

function getInitials(name) {
    return name.split(/[& ]+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function StarRating({ count = 5 }) {
    return (
        <div className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

// Google "G" icon SVG
function GoogleIcon() {
    return (
        <svg className="testimonial-card__google-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
    );
}

export default function Testimonials() {
    return (
        <>
            <section className="testimonials-hero">
                <div className="container">
                    <span className="section-label">What Our Clients Say</span>
                    <h1>Real Customer Reviews</h1>
                    <div className="testimonials-hero__rating">
                        <div className="testimonials-hero__stars">
                            {[1,2,3,4,5].map(i => (
                                <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <span className="testimonials-hero__score">5.0 · 6 Google Reviews</span>
                    </div>
                    <p>
                        Every review below is a real, unedited Google review from Okanagan homeowners
                        who've transformed their outdoor spaces with Sierra Stone.
                    </p>
                </div>
            </section>

            <section className="testimonials-grid">
                <div className="container">
                    <div className="testimonials-grid__inner">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.id} className="testimonial-card">
                                <div className="testimonial-card__header">
                                    <StarRating count={t.stars || 5} />
                                    <div className="testimonial-card__google-badge">
                                        <GoogleIcon />
                                        <span>Google Review</span>
                                    </div>
                                </div>
                                <div className="testimonial-card__quote">"</div>
                                <p className="testimonial-card__text">{t.text}</p>
                                <div className="testimonial-card__footer">
                                    <div className="testimonial-card__avatar">
                                        {getInitials(t.author)}
                                    </div>
                                    <div className="testimonial-card__info">
                                        <h4>{t.author}</h4>
                                        {t.date && <span className="testimonial-card__date">{t.date}</span>}
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
                    <div className="testimonials-google__badge">
                        <GoogleIcon />
                        <span>Verified on Google</span>
                    </div>
                    <div className="testimonials-google__stars">
                        <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                    </div>
                    <h3>Read All Our Reviews on Google</h3>
                    <p>100% of our reviews are 5 stars — see them all on our Google Business Profile</p>
                    <a
                        href="https://share.google/ciG7k768Mrunj4zF8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        View on Google
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
