import { useEffect } from 'react';

/**
 * Sets per-page <title> and <meta name="description"> for SEO.
 * Also sets canonical URL and Open Graph tags.
 */
export default function PageMeta({ title, description, canonical }) {
    useEffect(() => {
        // Set document title
        document.title = title;

        // Set or create meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        } else {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = description;
            document.head.appendChild(metaDesc);
        }

        // Set or create canonical link
        if (canonical) {
            let link = document.querySelector('link[rel="canonical"]');
            if (link) {
                link.setAttribute('href', canonical);
            } else {
                link = document.createElement('link');
                link.rel = 'canonical';
                link.href = canonical;
                document.head.appendChild(link);
            }
        }

        // Open Graph tags
        const ogTags = {
            'og:title': title,
            'og:description': description,
            'og:type': 'website',
        };
        if (canonical) ogTags['og:url'] = canonical;

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) {
                tag.setAttribute('content', content);
            } else {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                tag.content = content;
                document.head.appendChild(tag);
            }
        });
    }, [title, description, canonical]);

    return null;
}
