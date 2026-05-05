import { Link } from 'react-router-dom';
import './StickyMobileCTA.css';

/**
 * Fixed-position bottom bar shown only on mobile (<= 768px).
 * Left: tel: link. Right: link to /contact.
 * Body gets bottom padding via the global rule in StickyMobileCTA.css
 * so footer content is never covered.
 */
export default function StickyMobileCTA() {
    return (
        <div className="sticky-mobile-cta" role="complementary" aria-label="Quick contact">
            <a href="tel:+12508089425" className="sticky-mobile-cta__call">
                <span className="sticky-mobile-cta__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </span>
                <span className="sticky-mobile-cta__label">
                    <span className="sticky-mobile-cta__small">Call</span>
                    <span className="sticky-mobile-cta__big">(250) 808-9425</span>
                </span>
            </a>
            <Link to="/contact" className="sticky-mobile-cta__quote">
                Free Estimate
            </Link>
        </div>
    );
}
