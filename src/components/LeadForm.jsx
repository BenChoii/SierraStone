import { useState } from 'react';

/**
 * Lead capture form, reused on Contact and every ServicePage.
 * Submit handler matches Contact's existing behavior (no backend yet —
 * sets local submitted state). When a real endpoint is wired up, update
 * this single handler and every form on the site picks up the change.
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to a backend.
        // Update this single function to wire all lead forms on the site.
        setSubmitted(true);
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
                    <button type="submit" className="btn btn--primary form-submit">
                        Send Request
                    </button>
                </form>
            )}
        </div>
    );
}
