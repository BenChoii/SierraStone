// AI Visualizer client — Sierra Stone
//
// As of the May 2026 security hardening, all OpenRouter calls go
// through /api/visualize (a Vercel serverless function) so the API
// key stays server-side. The old VITE_OPENROUTER_API_KEY pattern
// was leaking the key into the client bundle, where third parties
// were extracting it and using it on their own OpenRouter calls
// for arbitrary models (Claude, GPT, etc.) — fully draining the
// quota.

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
 * Transform an image via the /api/visualize serverless function.
 * Same external interface as before — internally now goes through
 * a server-side proxy that holds the OpenRouter key.
 *
 * @param {string} imageBase64 - base64 data URL of the uploaded image
 * @param {object} stone - stone object from data.js with name + promptDesc
 * @param {string|null} maskBase64 - optional base64 data URL of a black/white mask image
 * @returns {Promise<string>} - data URL or remote URL of the transformed image
 */
export async function transformImage(imageBase64, stone, maskBase64 = null) {
    const response = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageBase64,
            maskBase64: maskBase64 || undefined,
            stoneName: stone.name,
            stonePromptDesc: stone.promptDesc,
        }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
        throw new Error(data.error || `Visualizer error (${response.status})`);
    }

    if (!data.imageUrl) {
        throw new Error('No image was returned by the AI. Please try again.');
    }

    return data.imageUrl;
}
