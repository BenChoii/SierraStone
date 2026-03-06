import { Link } from 'react-router-dom';
import './Footer.css';

const LOGO_URL = 'https://static.wixstatic.com/media/c1b584_06e8da2a49e242caab61cb5f811e2e87~mv2.png/v1/fill/w_375,h_281,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SS%20logo%20No%20background.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <img src={LOGO_URL} alt="Sierra Stone South & Central Okanagan — premium stone coating" />
                        <p>
                            Premium natural stone aggregate coatings for pool decks, patios, driveways, and steps. Serving the Central &amp; South Okanagan since 2015.
                        </p>
                        <div className="footer__socials">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer__heading">Quick Links</h4>
                        <div className="footer__links">
                            <Link to="/">Home</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/gallery">Gallery</Link>
                            <Link to="/colours">Stone Colours</Link>
                            <Link to="/visualizer">AI Visualizer</Link>
                            <Link to="/guides">Guides</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer__heading">Services</h4>
                        <div className="footer__links">
                            <Link to="/services/pool-decks">Pool Decks</Link>
                            <Link to="/services/patios-and-decks">Patios &amp; Decks</Link>
                            <Link to="/services/driveways">Driveways</Link>
                            <Link to="/services/front-steps">Front Steps &amp; Walkways</Link>
                            <Link to="/services/indoor-surfaces">Indoor Surfaces</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer__heading">Service Areas</h4>
                        <div className="footer__links">
                            <Link to="/kelowna">Kelowna</Link>
                            <Link to="/west-kelowna">West Kelowna</Link>
                            <Link to="/penticton">Penticton</Link>
                            <Link to="/summerland">Summerland</Link>
                            <Link to="/peachland">Peachland</Link>
                            <Link to="/lake-country">Lake Country</Link>
                            <Link to="/vernon">Vernon</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer__heading">Contact Us</h4>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                            <a href="tel:+12508089425">(250) 808-9425</a>
                        </div>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <a href="mailto:info@sierrastonesouthcentral.com">info@sierrastonesouthcentral.com</a>
                        </div>
                        <div className="footer__contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            <span>Kelowna, West Kelowna, Penticton<br />&amp; everywhere in between</span>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>© {new Date().getFullYear()} Sierra Stone South & Central Okanagan Ltd.</span>
                    <span>Powered by natural stone & epoxy innovation</span>
                </div>
            </div>
        </footer>
    );
}
