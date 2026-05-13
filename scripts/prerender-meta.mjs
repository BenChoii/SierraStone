// Per-route pre-rendering for SEO meta tags.
//
// The site is a client-rendered React SPA: without this script every URL
// serves the same `dist/index.html` with the same default <title> and
// <meta description>. Googlebot eventually executes JS and reads the
// React-updated meta tags, but slowly and unreliably — which is why our
// GSC impressions are so low across 70+ URLs.
//
// This script post-processes `dist/` by writing a per-route
// `dist/<path>/index.html` for every known route. Each file is the
// original template with route-specific <title>, <meta description>,
// canonical URL, Open Graph tags, and JSON-LD structured data baked in.
//
// Vercel's routing serves filesystem matches before applying the SPA
// rewrite in vercel.json, so a request to /kelowna gets the
// kelowna-specific HTML directly. When React hydrates client-side, it
// renders the same content over top — no user-visible difference, but
// dramatically better crawler indexing on the first hit.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const SITE_URL = 'https://sierrastonesouthcentral.com';
const BRAND = 'Sierra Stone Southcentral';

const TEMPLATE = readFileSync(resolve(DIST, 'index.html'), 'utf8');

// Load route data from the same files React uses. We use Vite's built-in
// resolution via dynamic import on the source files since they're plain
// ESM modules with no runtime dependencies.
const { SERVICES } = await import(resolve(ROOT, 'src/data/services.js').toString());
const { CITIES } = await import(resolve(ROOT, 'src/data/cities.js').toString());
const { GUIDES } = await import(resolve(ROOT, 'src/data/guides.js').toString());

// ---------- helpers ----------

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function pageHead({ title, description, canonical, jsonLd }) {
    const tags = [];
    tags.push(`<title>${escapeHtml(title)}</title>`);
    tags.push(`<meta name="description" content="${escapeHtml(description)}">`);
    tags.push(`<link rel="canonical" href="${canonical}">`);
    tags.push(`<meta property="og:title" content="${escapeHtml(title)}">`);
    tags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
    tags.push(`<meta property="og:url" content="${canonical}">`);
    tags.push(`<meta property="og:type" content="website">`);
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (jsonLd) {
        for (const schema of [].concat(jsonLd)) {
            tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
        }
    }
    return tags.join('\n    ');
}

function render(path, { title, description, jsonLd }) {
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
    // Strip default title/meta from template (they would conflict)
    let html = TEMPLATE
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/<meta name="description"[^>]*>/i, '')
        .replace(/<link rel="canonical"[^>]*>/i, '');

    const head = pageHead({ title, description, canonical, jsonLd });
    html = html.replace('</head>', `    ${head}\n  </head>`);

    // Write to dist/<path>/index.html (or dist/index.html for root)
    const filePath = path === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, path.replace(/^\//, ''), 'index.html');
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, html, 'utf8');
}

// ---------- schemas ----------

const ORGANIZATION_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    legalName: 'Sierra Stone Southcentral',
    alternateName: ['Sierra Stone Okanagan', 'Sierra Stone Kelowna'],
    url: SITE_URL,
    telephone: '+1-250-808-9425',
    areaServed: CITIES.map(c => c.name).concat(['Okanagan', 'British Columbia']),
};

function localBusinessSchema(city) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: city ? `${BRAND} — ${city.name}` : BRAND,
        url: city ? `${SITE_URL}/${city.slug}` : SITE_URL,
        telephone: '+1-250-808-9425',
        address: {
            '@type': 'PostalAddress',
            addressLocality: city ? city.name : 'Kelowna',
            addressRegion: 'BC',
            addressCountry: 'CA',
        },
        areaServed: CITIES.map(c => c.name),
    };
}

function serviceSchema(service, city) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: service.name,
        provider: { '@type': 'LocalBusiness', name: BRAND, telephone: '+1-250-808-9425' },
        areaServed: city ? city.name : 'Okanagan',
        description: service.tldr || service.heroSubtitle,
    };
}

function faqSchema(faq) {
    if (!faq || !faq.length) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };
}

function articleSchema(guide) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        author: { '@type': 'Organization', name: BRAND },
        publisher: { '@type': 'Organization', name: BRAND },
    };
}

// ---------- route generation ----------

const routes = [];

// Homepage
routes.push({
    path: '/',
    title: `${BRAND} — Pool Decks, Patios & Driveways in the Okanagan`,
    description: `${BRAND} provides natural stone aggregate coating across the Okanagan — pool decks, patios, driveways, front steps, epoxy flooring, and concrete repair. Coats over existing concrete in 2-3 days; 20-25+ year service life. Free estimates — (250) 808-9425.`,
    jsonLd: [ORGANIZATION_SCHEMA, localBusinessSchema()],
});

// Static pages
const staticPages = [
    { path: '/services', title: `Services | ${BRAND}`, description: `All stone coating services from ${BRAND} — pool decks, patios, driveways, front steps, epoxy flooring, and concrete repair across the Okanagan.` },
    { path: '/gallery', title: `Project Gallery | ${BRAND}`, description: `Photos of completed Sierra Stone installations across Kelowna, West Kelowna, Penticton, and the South Okanagan.` },
    { path: '/colours', title: `Stone Colours & Finishes | ${BRAND}`, description: `Choose from natural stone aggregate colours for your pool deck, patio, driveway, or indoor flooring. Real samples from completed Okanagan projects.` },
    { path: '/visualizer', title: `AI Stone Coating Visualizer | ${BRAND}`, description: `Upload a photo of your concrete surface and see how Sierra Stone will look. Free AI-powered visualizer — no signup required.` },
    { path: '/testimonials', title: `Customer Reviews | ${BRAND}`, description: `What Okanagan homeowners say about working with Sierra Stone Southcentral on their pool decks, patios, and driveways.` },
    { path: '/contact', title: `Contact Us | ${BRAND}`, description: `Request a free in-home estimate for stone coating anywhere in the Okanagan. Call (250) 808-9425 or fill out the form.` },
    { path: '/guides', title: `Stone Coating Guides | ${BRAND}`, description: `In-depth guides on stone coating, concrete repair, and surface options for Okanagan homeowners. Comparisons, durability, and decision-making help.` },
];
for (const p of staticPages) {
    routes.push({ ...p, jsonLd: ORGANIZATION_SCHEMA });
}

// Service pages
for (const service of SERVICES) {
    const h1 = service.h1 || service.heroTitle;
    routes.push({
        path: `/services/${service.slug}`,
        title: `${h1} | ${BRAND}`,
        description: `${service.tldr || service.heroSubtitle} Free estimates — (250) 808-9425.`,
        jsonLd: [serviceSchema(service), faqSchema(service.faq)].filter(Boolean),
    });
}

// City pages
for (const city of CITIES) {
    routes.push({
        path: `/${city.slug}`,
        title: `Sierra Stone Coating in ${city.name} — Pool Decks, Patios & Driveways | ${BRAND}`,
        description: `${BRAND} provides natural stone aggregate coating services across ${city.name}. Pool decks, patios, driveways, front steps, epoxy flooring, and concrete repair. Free in-home estimates — (250) 808-9425.`,
        jsonLd: [localBusinessSchema(city), ORGANIZATION_SCHEMA],
    });
}

// City × service combos
for (const city of CITIES) {
    for (const service of SERVICES) {
        const h1 = service.h1City
            ? service.h1City.replace('{city}', city.name)
            : `${service.heroTitle} in ${city.name}`;
        const cityTldr = service.tldr
            ? service.tldr.replace(/\bSierra Stone\b/, `Sierra Stone in ${city.name}`)
            : service.heroSubtitle;
        routes.push({
            path: `/${city.slug}/${service.slug}`,
            title: `${h1} | ${BRAND}`,
            description: `${cityTldr} Free estimates — (250) 808-9425.`,
            jsonLd: [serviceSchema(service, city), localBusinessSchema(city), faqSchema(service.faq)].filter(Boolean),
        });
    }
}

// Guide pages
for (const guide of GUIDES) {
    routes.push({
        path: `/guides/${guide.slug}`,
        title: guide.metaTitle || `${guide.title} | ${BRAND}`,
        description: guide.metaDescription,
        jsonLd: [articleSchema(guide), faqSchema(guide.faq)].filter(Boolean),
    });
}

// ---------- render all ----------

let count = 0;
for (const route of routes) {
    render(route.path, route);
    count++;
}

console.log(`Pre-rendered ${count} HTML files with route-specific meta + JSON-LD to ${DIST}`);
