// Generate public/sitemap.xml + public/robots.txt from data/.
// Runs as `prebuild` so Vercel emits a fresh sitemap on every deploy.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = process.env.SITE_URL || 'https://sierra-stone.vercel.app';

const { SERVICES } = await import(url.pathToFileURL(path.join(root, 'src/data/services.js')).href);
const { CITIES }   = await import(url.pathToFileURL(path.join(root, 'src/data/cities.js')).href);
const { GUIDES }   = await import(url.pathToFileURL(path.join(root, 'src/data/guides.js')).href);

const today = new Date().toISOString().slice(0, 10);

const urls = [];
const add = (loc, priority, changefreq) => urls.push({ loc, priority, changefreq, lastmod: today });

// Core pages
add('/',              '1.0', 'weekly');
add('/services',      '0.9', 'monthly');
add('/gallery',       '0.8', 'monthly');
add('/colours',       '0.8', 'monthly');
add('/visualizer',    '0.7', 'monthly');
add('/testimonials',  '0.7', 'monthly');
add('/contact',       '0.8', 'monthly');
add('/guides',        '0.8', 'monthly');

// Services
for (const s of SERVICES) add(`/services/${s.slug}`, '0.9', 'monthly');

// Guides
for (const g of GUIDES) add(`/guides/${g.slug}`, '0.7', 'monthly');

// Cities
for (const c of CITIES) {
    add(`/${c.slug}`, '0.8', 'monthly');
    for (const s of SERVICES) add(`/${c.slug}/${s.slug}`, '0.7', 'monthly');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
fs.writeFileSync(path.join(root, 'public/robots.txt'), robots);

console.log(`Wrote sitemap with ${urls.length} URLs and robots.txt → ${SITE}`);
