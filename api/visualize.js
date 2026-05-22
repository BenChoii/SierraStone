// Vercel serverless function — Sierra Stone AI Visualizer
//
// SECURITY: This function replaces the previous client-side OpenRouter
// call. The previous architecture used VITE_OPENROUTER_API_KEY which
// Vite bakes into the client bundle, making the key extractable by
// anyone viewing the deployed site. Bad actors were extracting the
// key and using it for arbitrary OpenRouter models (Claude, GPT, etc.)
// not just the Gemini image model the visualizer requires.
//
// This function:
//   1. Reads the API key from a SERVER-SIDE env var (no VITE_ prefix)
//      so it never reaches the browser bundle.
//   2. Hardcodes the model to google/gemini-2.5-flash-image — anyone
//      who hits this endpoint cannot use it to call other (more
//      expensive) models.
//   3. Validates required fields before forwarding to OpenRouter.
//   4. Parses the multi-format Gemini-via-OpenRouter response so the
//      client gets a clean { imageUrl } payload.
//
// Required env var:
//   OPENROUTER_API_KEY — server-side OpenRouter key (no VITE_ prefix)

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-2.5-flash-image';
const MAX_TOKENS = 4096;

function buildPrompt({ stoneName, stonePromptDesc, hasMask }) {
    if (hasMask) {
        return `You are an expert architectural visualization AI. I'm providing two images:

1. FIRST IMAGE: The original photo of an outdoor space
2. SECOND IMAGE: A black-and-white mask image. The WHITE areas indicate exactly which surfaces I want you to change. The BLACK areas must remain completely untouched and unmodified.

Apply Sierra Stone "${stoneName}" stone coating ONLY to the surfaces marked in WHITE on the mask. The stone is a natural stone aggregate mixed with industrial-grade epoxy. It looks like: ${stonePromptDesc}.

CRITICAL RULES:
- ONLY modify the surfaces that correspond to the WHITE areas in the mask image
- The BLACK areas in the mask must stay EXACTLY as they appear in the original photo — do not change their color, texture, lighting, or any detail whatsoever
- The stone surface should look photorealistic with visible natural stone aggregate texture
- Maintain the same lighting, shadows, and perspective in the modified areas
- The stone coating should follow the contours and shape of the existing surface
- Make it look like a professional before-and-after photo for a stone coating company
- Output ONLY the transformed image, no text`;
    }
    return `You are an expert architectural visualization AI. Take this photo of an outdoor space and reimagine it with Sierra Stone "${stoneName}" stone coating applied to all the ground/floor surfaces (patio, deck, driveway, pool deck, steps, walkway, or whatever ground surface is visible).

The stone is a natural stone aggregate mixed with industrial-grade epoxy. It looks like: ${stonePromptDesc}.

IMPORTANT RULES:
- Only change the ground/floor surfaces — keep walls, furniture, plants, sky, pool water, railings, and all other elements exactly the same
- The stone surface should look photorealistic with visible natural stone aggregate texture
- Maintain the same lighting, shadows, and perspective
- The stone coating should follow the contours and shape of the existing surface
- Make it look like a professional before-and-after photo for a stone coating company
- Output ONLY the transformed image, no text`;
}

function extractImageUrl(data) {
    const message = data.choices?.[0]?.message;

    // Format 1: images array on message (Gemini via OpenRouter)
    if (message?.images && Array.isArray(message.images)) {
        for (const img of message.images) {
            if (img.image_url?.url) return img.image_url.url;
            if (img.url) return img.url;
            if (img.data) return `data:image/png;base64,${img.data}`;
        }
    }

    // Format 2: content is a string containing base64
    const content = message?.content;
    if (typeof content === 'string') {
        const match = content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
        if (match) return match[0];
        if (content.length > 1000 && /^[A-Za-z0-9+/=\s]+$/.test(content.trim())) {
            return `data:image/png;base64,${content.trim()}`;
        }
    }

    // Format 3: content is array of parts
    if (Array.isArray(content)) {
        for (const part of content) {
            if (part.type === 'image_url') return part.image_url?.url;
            if (part.type === 'image') return part.image?.url || `data:image/png;base64,${part.image?.data}`;
            if (part.type === 'text') {
                const match = part.text?.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
                if (match) return match[0];
            }
        }
    }

    // Format 4: inline_data in parts (Google AI native format)
    if (Array.isArray(message?.parts)) {
        for (const part of message.parts) {
            if (part.inline_data?.data) {
                const mime = part.inline_data.mime_type || 'image/png';
                return `data:${mime};base64,${part.inline_data.data}`;
            }
        }
    }

    return null;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.error('Missing OPENROUTER_API_KEY env var');
        return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    const { imageBase64, maskBase64, stoneName, stonePromptDesc } = req.body || {};

    if (!imageBase64 || !stoneName || !stonePromptDesc) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // Defence: only allow base64 data URLs, no remote URL fetching
    if (!imageBase64.startsWith('data:image/')) {
        return res.status(400).json({ ok: false, error: 'imageBase64 must be a data URL' });
    }
    if (maskBase64 && !maskBase64.startsWith('data:image/')) {
        return res.status(400).json({ ok: false, error: 'maskBase64 must be a data URL' });
    }

    const prompt = buildPrompt({ stoneName, stonePromptDesc, hasMask: !!maskBase64 });

    const contentParts = [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: imageBase64 } },
    ];
    if (maskBase64) {
        contentParts.push({ type: 'image_url', image_url: { url: maskBase64 } });
    }

    try {
        const referer = req.headers.origin || req.headers.referer || 'https://sierrastonesouthcentral.com';
        const upstream = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': referer,
                'X-Title': 'Sierra Stone Visualizer',
            },
            body: JSON.stringify({
                model: MODEL, // hardcoded — can only call this one model
                modalities: ['image', 'text'],
                messages: [{ role: 'user', content: contentParts }],
                max_tokens: MAX_TOKENS,
            }),
        });

        const data = await upstream.json().catch(() => ({}));

        if (!upstream.ok) {
            const errMsg = data.error?.message || `OpenRouter ${upstream.status}`;
            console.error('OpenRouter error:', errMsg);
            return res.status(502).json({ ok: false, error: errMsg });
        }

        const imageUrl = extractImageUrl(data);
        if (!imageUrl) {
            console.error('No image in OpenRouter response:', JSON.stringify(data).slice(0, 500));
            return res.status(502).json({ ok: false, error: 'No image was returned by the AI. Please try again.' });
        }

        return res.status(200).json({ ok: true, imageUrl });
    } catch (err) {
        console.error('Visualize handler error:', err);
        return res.status(500).json({ ok: false, error: err?.message || String(err) });
    }
}
