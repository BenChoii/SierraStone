import LeadForm from '../components/LeadForm';
import './Contact.css';

export default function Contact() {
    return (
        <>
            <section className="contact-hero">
                <div className="container">
                    <span className="section-label">Get in Touch</span>
                    <h1>Contact Us</h1>
                    <p>
                        Ready to transform your space? Reach out for a free, no-obligation estimate.
                        We serve Kelowna, West Kelowna, Penticton, and everywhere in between.
                    </p>
                </div>
            </section>

            <section className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        {/* Form */}
                        <LeadForm />

                        {/* Info */}
                        <div className="contact-info">
                            <div className="contact-info-card">
                                <h3>Contact Information</h3>
                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📞</div>
                                    <div className="contact-detail__text">
                                        <h4>Phone</h4>
                                        <a href="tel:+12508089425">(250) 808-9425</a>
                                    </div>
                                </div>
                                <div className="contact-detail">
                                    <div className="contact-detail__icon">✉️</div>
                                    <div className="contact-detail__text">
                                        <h4>Email</h4>
                                        <a href="mailto:info@sierrastonesouthcentral.com">info@sierrastonesouthcentral.com</a>
                                    </div>
                                </div>
                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📍</div>
                                    <div className="contact-detail__text">
                                        <h4>Service Area</h4>
                                        <span>Kelowna, West Kelowna, Penticton & everywhere in between</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-info-card">
                                <h3>Business Hours</h3>
                                <div className="contact-hours">
                                    <div className="contact-hours__row">
                                        <span>Monday – Friday</span>
                                        <span>8:00 AM – 6:00 PM</span>
                                    </div>
                                    <div className="contact-hours__row">
                                        <span>Saturday</span>
                                        <span>9:00 AM – 4:00 PM</span>
                                    </div>
                                    <div className="contact-hours__row">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162716.0683581965!2d-119.6768!3d49.8880!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537d8cb6e3c4e3e3%3A0x2a3a4d5e6f7a8b9c!2sKelowna%2C+BC!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Sierra Stone service area map"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
