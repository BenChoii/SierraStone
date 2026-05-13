// Vercel serverless function: receives lead form submissions and sends
// an SMS to the business via Twilio. Credentials live ONLY in Vercel env
// vars — never in client code, never committed.
//
// Required env vars (set in Vercel project settings):
//   TWILIO_ACCOUNT_SID  — starts with "AC..."
//   TWILIO_AUTH_TOKEN
//   TWILIO_FROM         — Twilio-purchased number in E.164, e.g. +12364629799
//   LEAD_TO             — destination phone in E.164, e.g. +12508089425

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const { firstName, lastName, email, phone, service, message, company } = req.body || {};

    // Honeypot: the form ships a hidden "company" input that real users leave
    // empty. Bots that scrape and auto-fill every field will populate it.
    if (company) {
        return res.status(200).json({ ok: true });
    }

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;
    const to = process.env.LEAD_TO;

    if (!accountSid || !authToken || !from || !to) {
        console.error('lead: missing Twilio env vars', {
            hasSid: !!accountSid,
            hasToken: !!authToken,
            hasFrom: !!from,
            hasTo: !!to,
        });
        return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    const lines = [
        'New Sierra Stone lead',
        `${firstName} ${lastName}`,
        email,
        phone ? phone : '(no phone)',
        `Service: ${service || '(unspecified)'}`,
    ];
    if (message && message.trim()) {
        lines.push('');
        lines.push(message.trim());
    }
    const body = lines.join('\n');

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    try {
        const twilioRes = await fetch(twilioUrl, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
        });

        if (!twilioRes.ok) {
            const errText = await twilioRes.text();
            console.error('lead: twilio non-2xx', twilioRes.status, errText);
            return res.status(502).json({ ok: false, error: 'SMS provider error' });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('lead: handler exception', err);
        return res.status(500).json({ ok: false, error: 'Internal error' });
    }
}
