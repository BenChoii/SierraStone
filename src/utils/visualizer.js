// AI Visualizer API utility — Sierra Stone
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = 'google/gemini-2.5-flash-image';

/**
 * Convert a File to base64 data URL
 */
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Transform an image using Gemini via OpenRouter.
 * @param {string} imageBase64 - base64 data URL of the uploaded image
 * @param {object} stone - stone object from data.js with name, promptDesc, etc.
 * @param {string|null} maskBase64 - optional base64 data URL of a black/white mask image
 * @returns {Promise<string>} - base64 data URL of the transformed image
 */
export async function transformImage(imageBase64, stone, maskBase64 = null) {
    // Build prompt based on whether a mask is provided
    let prompt;

    if (maskBase64) {
        prompt = `You are an expert architectural visualization AI. I'm providing two images:

1. FIRST IMAGE: The original photo of an outdoor space
2. SECOND IMAGE: A black-and-white mask image. The WHITE areas indicate exactly which surfaces I want you to change. The BLACK areas must remain completely untouched and unmodified.

Apply Sierra Stone "${stone.name}" stone coating ONLY to the surfaces marked in WHITE on the mask. The stone is a natural stone aggregate mixed with industrial-grade epoxy. It looks like: ${stone.promptDesc}.

CRITICAL RULES:
- ONLY modify the surfaces that correspond to the WHITE areas in the mask image
- The BLACK areas in the mask must stay EXACTLY as they appear in the original photo — do not change their color, texture, lighting, or any detail whatsoever
- The stone surface should look photorealistic with visible natural stone aggregate texture
- Maintain the same lighting, shadows, and perspective in the modified areas
- The stone coating should follow the contours and shape of the existing surface
- Make it look like a professional before-and-after photo for a stone coating company
- Output ONLY the transformed image, no text`;
    } else {
        prompt = `You are an expert architectural visualization AI. Take this photo of an outdoor space and reimagine it with Sierra Stone "${stone.name}" stone coating applied to all the ground/floor surfaces (patio, deck, driveway, pool deck, steps, walkway, or whatever ground surface is visible). 

The stone is a natural stone aggregate mixed with industrial-grade epoxy. It looks like: ${stone.promptDesc}. 

IMPORTANT RULES:
- Only change the ground/floor surfaces — keep walls, furniture, plants, sky, pool water, railings, and all other elements exactly the same
- The stone surface should look photorealistic with visible natural stone aggregate texture
- Maintain the same lighting, shadows, and perspective
- The stone coating should follow the contours and shape of the existing surface
- Make it look like a professional before-and-after photo for a stone coating company
- Output ONLY the transformed image, no text`;
    }

    // Build content parts
    const contentParts = [
        { type: 'text', text: prompt },
        {
            type: 'image_url',
            image_url: { url: imageBase64 }
        }
    ];

    // If mask provided, add as second image
    if (maskBase64) {
        contentParts.push({
            type: 'image_url',
            image_url: { url: maskBase64 }
        });
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Sierra Stone Visualizer',
        },
        body: JSON.stringify({
            model: MODEL,
            modalities: ['image', 'text'],
            messages: [
                {
                    role: 'user',
                    content: contentParts
                }
            ],
            max_tokens: 4096,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;

    // Format 1: images array on message (Gemini via OpenRouter)
    // e.g. message.images[0].image_url.url
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

        // Could be raw base64 without data URL prefix
        if (content.length > 1000 && /^[A-Za-z0-9+/=\s]+$/.test(content.trim())) {
            return `data:image/png;base64,${content.trim()}`;
        }
    }

    // Format 3: content is array of parts
    if (Array.isArray(content)) {
        for (const part of content) {
            if (part.type === 'image_url') {
                return part.image_url?.url;
            }
            if (part.type === 'image') {
                return part.image?.url || `data:image/png;base64,${part.image?.data}`;
            }
            if (part.type === 'text') {
                const match = part.text?.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
                if (match) return match[0];
            }
        }
    }

    // Format 4: inline_data in parts (Google AI native format)
    const parts = message?.parts;
    if (Array.isArray(parts)) {
        for (const part of parts) {
            if (part.inline_data?.data) {
                const mime = part.inline_data.mime_type || 'image/png';
                return `data:${mime};base64,${part.inline_data.data}`;
            }
        }
    }

    console.error('Unrecognized AI response format:', JSON.stringify(data).slice(0, 500));
    throw new Error('No image was returned by the AI. Please try again.');
}
