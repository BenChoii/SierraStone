import { useEffect } from 'react';

/**
 * Injects JSON-LD structured data into the page <head>.
 * Accepts a `data` prop which is the schema object (will be serialized).
 * Cleans up on unmount so schemas don't persist between page navigations.
 */
export default function JsonLd({ data }) {
    useEffect(() => {
        if (!data) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        script.setAttribute('data-jsonld', 'true');
        document.head.appendChild(script);

        return () => {
            script.remove();
        };
    }, [data]);

    return null;
}

/**
 * LocalBusiness schema for Sierra Stone.
 * Pass city for city-specific coordinates, or omit for general.
 */
export function buildLocalBusinessSchema(city = null) {
    const base = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://sierrastonesouthcentral.com/#business',
        name: 'Sierra Stone South & Central Okanagan',
        description: 'Premium natural stone aggregate coating for pool decks, patios, driveways, steps, and indoor surfaces in the Okanagan.',
        telephone: '+12508089425',
        url: 'https://sierrastonesouthcentral.com',
        image: 'https://static.wixstatic.com/media/c1b584_06e8da2a49e242caab61cb5f811e2e87~mv2.png',
        priceRange: '$$',
        knowsAbout: [
            'Stone coating', 'Pool deck resurfacing', 'Patio stone coating',
            'Driveway resurfacing', 'Front step coating', 'Stone aggregate',
            'Epoxy stone flooring', 'Concrete resurfacing', 'Slip-resistant surfaces',
        ],
        areaServed: [
            { '@type': 'City', name: 'Kelowna', '@id': 'https://en.wikipedia.org/wiki/Kelowna' },
            { '@type': 'City', name: 'West Kelowna', '@id': 'https://en.wikipedia.org/wiki/West_Kelowna' },
            { '@type': 'City', name: 'Penticton', '@id': 'https://en.wikipedia.org/wiki/Penticton' },
            { '@type': 'City', name: 'Summerland', '@id': 'https://en.wikipedia.org/wiki/Summerland,_British_Columbia' },
            { '@type': 'City', name: 'Peachland', '@id': 'https://en.wikipedia.org/wiki/Peachland' },
        ],
    };

    if (city) {
        base.address = {
            '@type': 'PostalAddress',
            addressLocality: city.name,
            addressRegion: 'BC',
            addressCountry: 'CA',
        };
        if (city.coordinates) {
            base.geo = {
                '@type': 'GeoCoordinates',
                latitude: city.coordinates.lat,
                longitude: city.coordinates.lng,
            };
        }
    }

    return base;
}

/**
 * FAQPage schema from an array of { q, a } items.
 */
export function buildFAQSchema(faqItems) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: a,
            },
        })),
    };
}

/**
 * Service schema.
 */
export function buildServiceSchema(service, city = null) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: city ? `${service.name} Stone Coating in ${city.name}` : `${service.name} Stone Coating`,
        description: service.intro,
        provider: {
            '@type': 'LocalBusiness',
            '@id': 'https://sierrastonesouthcentral.com/#business',
            name: 'Sierra Stone South & Central Okanagan',
        },
        areaServed: city ? { '@type': 'City', name: city.name } : undefined,
        serviceType: 'Stone Coating',
    };

    return schema;
}

/**
 * Article schema for guides.
 */
export function buildArticleSchema(guide) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.intro,
        author: {
            '@type': 'Organization',
            '@id': 'https://sierrastonesouthcentral.com/#business',
            name: 'Sierra Stone South & Central Okanagan',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Sierra Stone South & Central Okanagan',
        },
        about: {
            '@type': 'Thing',
            name: 'Stone Coating',
        },
    };
}

/**
 * BreadcrumbList schema.
 * @param {Array} items - Array of { name, url } objects
 */
export function buildBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
