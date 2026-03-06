import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const LOGO_URL = 'https://static.wixstatic.com/media/c1b584_06e8da2a49e242caab61cb5f811e2e87~mv2.png/v1/fill/w_375,h_281,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SS%20logo%20No%20background.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/colours', label: 'Stone Colours' },
  { to: '/visualizer', label: 'AI Visualizer' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={LOGO_URL} alt="Sierra Stone South & Central Okanagan" />
        </Link>

        <div className="navbar__links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="navbar__cta">
          <a href="tel:+12508089425" className="navbar__phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            (250) 808-9425
          </a>
          <Link to="/contact" className="btn btn--primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
            Free Estimate
          </Link>
        </div>

        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link key={to} to={to} className="navbar__mobile-link">{label}</Link>
        ))}
        <a href="tel:+12508089425" className="navbar__mobile-phone">
          📞 (250) 808-9425
        </a>
        <Link to="/contact" className="btn btn--primary" style={{ marginTop: '1rem', textAlign: 'center' }}>
          Get Free Estimate
        </Link>
      </div>
    </nav>
  );
}
