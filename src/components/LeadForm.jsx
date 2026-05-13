import { useState } from 'react';

/**
 * Lead capture form, reused on Contact and every ServicePage.
 * POSTs to /api/lead, which is a Vercel serverless function that
 * delivers the lead to the business via Twilio SMS.
 *
 * Props:
 *  - defaultService: pre-fill the Service select with this service name
 *  - title:          optional heading override
 *  - subtitle:       optional intro paragraph override
 *  - compact:        when true, removes the contact-form padding/shadow
 *                    so the form can be embedded inside another card
 */
export default function LeadForm({
    defaultService = '',
    title = 'Request a Free Estimate',
    subtitle = 'Fill out the form below and our team will get back to you promptly.',
    compact = false,
}) {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setError(null);
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const payload = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
            company: formData.get('company'), // honeypot — humans leave blank
        };

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
                throw new Error(data.error || `Request failed (${res.status})`);
            }
            setSubmitted(true);
        } catch (err) {
            setError(
                "Sorry — we couldn't send your message. Please try again, or call (250) 808-9425."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={compact ? 'lead-form lead-form--compact' : 'contact-form'}>
            <h2>{title}</h2>
            <p>{subtitle}</p>

            {submitted ? (
                <div className="form-success">
                    <h3>Thank you</h3>
                    <p>We've received your request and will be in touch soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Honeypot: hidden from real users via inline styles. Bots
                        that auto-fill every field will populate it and get
                        silently dropped by /api/lead. */}
                    <div
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
                    >
                        <label htmlFor="lf-company">Company (leave blank)</label>
                        <input id="lf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="lf-firstName">First Name *</label>
                            <input id="lf-firstName" name="firstName" type="text" required placeholder="John" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lf-lastName">Last Name *</label>
                            <input id="lf-lastName" name="lastName" type="text" required placeholder="Smith" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="lf-email">Email *</label>
                            <input id="lf-email" name="email" type="email" required placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lf-phone">Phone</label>
                            <input id="lf-phone" name="phone" type="tel" placeholder="(250) 555-1234" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lf-service">Service Interested In</label>
                        <select id="lf-service" name="service" defaultValue={defaultService || ''}>
                            <option value="" disabled>Select a service...</option>
                            <option>Pool Deck</option>
                            <option>Patio / Deck</option>
                            <option>Driveway</option>
                            <option>Front Steps / Walkway</option>
                            <option>Indoor Surface</option>
                            <option>Concrete Repair</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lf-message">Tell Us About Your Project</label>
                        <textarea
                            id="lf-message"
                            name="message"
                            placeholder="Describe the surface you'd like to cover, approximate size, and any other details..."
                        />
                    </div>
                    {error && (
                        <div className="form-error" role="alert" style={{ color: '#b00020', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn--primary form-submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending…' : 'Send Request'}
                    </button>
                </form>
            )}
        </div>
    );
}
