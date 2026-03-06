// City data for local SEO — Sierra Stone South & Central Okanagan
// Each city gets a landing page and city+service combo pages

export const CITIES = [
    {
        slug: 'kelowna',
        name: 'Kelowna',
        isCapital: true, // Primary hub — highest sitemap priority
        coordinates: { lat: 49.8880, lng: -119.4960 },
        population: '150,000+',
        neighborhoods: [
            'Glenmore', 'Rutland', 'Mission', 'Lower Mission', 'Upper Mission',
            'Dilworth Mountain', 'Black Mountain', 'Kettle Valley', 'South Pandosy',
            'North End', 'Downtown Kelowna', 'McKinley Landing'
        ],
        intro: `Kelowna homeowners know the Okanagan sun takes a toll on outdoor surfaces. Between scorching summers, freezing winters, and everything in between, your pool deck, patio, and driveway face year-round punishment. Sierra Stone provides Kelowna residents with a premium stone aggregate coating that transforms worn, cracked, or dated surfaces into stunning, durable finishes built to last 25+ years.`,
        localInsight: `From Glenmore to Kettle Valley, Kelowna homes face unique challenges — intense UV exposure that fades concrete, freeze-thaw cycles that cause cracking, and the desire to create resort-style outdoor living spaces that match the stunning lakeside setting. Sierra Stone is specifically engineered for these conditions.`,
        metaTitle: 'Stone Coating in Kelowna — Pool Decks, Patios & Driveways | Sierra Stone',
        metaDescription: 'Professional stone aggregate coating in Kelowna. Transform your pool deck, patio, driveway, or steps with durable, slip-resistant Sierra Stone. Free estimates — call (250) 808-9425.',
    },
    {
        slug: 'west-kelowna',
        name: 'West Kelowna',
        isCapital: false,
        coordinates: { lat: 49.8625, lng: -119.5833 },
        population: '36,000+',
        neighborhoods: [
            'Lakeview Heights', 'Westbank', 'Shannon Lake', 'Rose Valley',
            'Glenrosa', 'Smith Creek', 'Casa Loma', 'Gellatly'
        ],
        intro: `West Kelowna's lakeside communities deserve outdoor surfaces as beautiful as the views. Whether you're in Lakeview Heights overlooking Okanagan Lake or enjoying a backyard pool in Shannon Lake, Sierra Stone delivers premium stone coatings that elevate your home's curb appeal and outdoor living experience.`,
        localInsight: `West Kelowna properties often feature expansive outdoor entertaining areas and pool decks that take advantage of the lake views. Our stone coating solutions are designed to complement the natural beauty of the area while standing up to the steep terrain drainage patterns and intense sun exposure unique to the west side.`,
        metaTitle: 'Stone Coating in West Kelowna — Pool Decks, Patios & Steps | Sierra Stone',
        metaDescription: 'Transform your West Kelowna outdoor space with Sierra Stone. Premium stone aggregate coating for pool decks, patios, and driveways. Serving Lakeview Heights, Shannon Lake & more.',
    },
    {
        slug: 'penticton',
        name: 'Penticton',
        isCapital: false,
        coordinates: { lat: 49.4991, lng: -119.5937 },
        population: '37,000+',
        neighborhoods: [
            'Skaha Lake', 'Upper Bench', 'Wiltse', 'Columbia',
            'West Bench', 'Sage Mesa', 'Okanagan Falls', 'Naramata'
        ],
        intro: `Penticton sits between two stunning lakes, and its homes reflect a lifestyle built around outdoor living. Sierra Stone helps Penticton homeowners transform their patios, pool decks, and driveways into spaces that match the beauty of Okanagan and Skaha lakes — with surfaces engineered to handle the south Okanagan's hot, dry summers and snowy winters.`,
        localInsight: `Penticton's unique position between Okanagan and Skaha lakes means many properties feature pool areas and extensive outdoor entertaining spaces. The south Okanagan's hotter, drier climate puts extra demand on surface coatings — Sierra Stone's UV-resistant epoxy and natural aggregate are built specifically for these conditions.`,
        metaTitle: 'Stone Coating in Penticton — Pool Decks, Patios & Driveways | Sierra Stone',
        metaDescription: 'Professional stone coating services in Penticton. Sierra Stone transforms pool decks, patios, and driveways with durable, UV-resistant stone aggregate. Free estimates.',
    },
    {
        slug: 'summerland',
        name: 'Summerland',
        isCapital: false,
        coordinates: { lat: 49.6006, lng: -119.6778 },
        population: '12,000+',
        neighborhoods: [
            'Trout Creek', 'Lower Town', 'Prairie Valley',
            'Garnett Valley', 'Giant\'s Head'
        ],
        intro: `Summerland's charming community combines orchard living with lakeside beauty. Sierra Stone provides Summerland homeowners with premium stone coatings that enhance outdoor spaces — from poolside retreats in Trout Creek to welcoming front entryways in Lower Town. Every project is built to withstand the semi-arid Okanagan climate.`,
        localInsight: `Summerland properties often feature unique terrain with sloped lots and tiered outdoor spaces. Our stone coating application excels on steps, retaining walls, and multi-level patios that are common in the area's hillside developments.`,
        metaTitle: 'Stone Coating in Summerland — Patios, Steps & Pool Decks | Sierra Stone',
        metaDescription: 'Sierra Stone in Summerland — premium stone aggregate coating for patios, steps, pool decks, and driveways. Built for Okanagan weather. Free estimates.',
    },
    {
        slug: 'peachland',
        name: 'Peachland',
        isCapital: false,
        coordinates: { lat: 49.7706, lng: -119.7356 },
        population: '5,600+',
        neighborhoods: [
            'Trepanier', 'Todd\'s Landing', 'Deep Creek',
            'Antlers Beach', 'Downtown Peachland'
        ],
        intro: `Peachland's small-town lakeside charm makes it one of the Okanagan's most desirable communities. Sierra Stone helps Peachland homeowners protect and beautify their outdoor surfaces — from waterfront properties along Beach Avenue to hillside homes with panoramic lake views. Our premium stone coatings add lasting value and beauty.`,
        localInsight: `Many Peachland homes sit on steep terrain with significant elevation changes, making durable, slip-resistant step and walkway surfaces essential. Sierra Stone's textured aggregate finish provides excellent traction while looking beautiful.`,
        metaTitle: 'Stone Coating in Peachland — Steps, Patios & Driveways | Sierra Stone',
        metaDescription: 'Premium stone coating in Peachland. Sierra Stone transforms steps, patios, and driveways with slip-resistant, weather-proof stone aggregate. Free estimates.',
    },
    {
        slug: 'lake-country',
        name: 'Lake Country',
        isCapital: false,
        coordinates: { lat: 50.0553, lng: -119.4130 },
        population: '15,000+',
        neighborhoods: [
            'Winfield', 'Oyama', 'Carr\'s Landing', 'Okanagan Centre',
            'Wood Lake', 'Kalamalka Lake'
        ],
        intro: `Lake Country offers some of the Okanagan's most beautiful waterfront living. Sierra Stone serves homeowners across Winfield, Oyama, and Okanagan Centre with premium stone coatings that transform tired outdoor surfaces into stunning, resort-quality finishes — all backed by a 25-year warranty.`,
        localInsight: `Lake Country's growing communities feature many newer developments alongside established lakefront properties. Whether it's resurfacing an existing pool deck in Oyama or finishing a new build in Winfield, Sierra Stone adapts to both renovation and new construction projects.`,
        metaTitle: 'Stone Coating in Lake Country — Pool Decks, Patios & Driveways | Sierra Stone',
        metaDescription: 'Sierra Stone in Lake Country — premium stone aggregate coating for pool decks, patios, and driveways in Winfield, Oyama & Okanagan Centre. Free estimates.',
    },
    {
        slug: 'vernon',
        name: 'Vernon',
        isCapital: false,
        coordinates: { lat: 50.2670, lng: -119.2720 },
        population: '44,000+',
        neighborhoods: [
            'Coldstream', 'Lavington', 'BX', 'Okanagan Landing',
            'Predator Ridge', 'Foothills', 'East Hill'
        ],
        intro: `Vernon and the North Okanagan experience some of the region's most dramatic seasonal shifts — from hot summers perfect for poolside living to cold, snowy winters that test every outdoor surface. Sierra Stone provides Vernon homeowners with stone coatings engineered to handle these extremes while delivering stunning visual results.`,
        localInsight: `Vernon's colder winters mean more freeze-thaw cycles than the central Okanagan. Sierra Stone's industrial-grade epoxy and stone aggregate system is specifically designed to flex with temperature changes without cracking — critical for Vernon driveways, steps, and pool decks.`,
        metaTitle: 'Stone Coating in Vernon — Driveways, Steps & Pool Decks | Sierra Stone',
        metaDescription: 'Professional stone coating in Vernon & Coldstream. Sierra Stone transforms driveways, steps, and pool decks with freeze-thaw resistant stone aggregate. Free estimates.',
    },
];

// Helper to find a city by slug
export function getCityBySlug(slug) {
    return CITIES.find(c => c.slug === slug) || null;
}

// Get all city slugs for routing
export function getCitySlugs() {
    return CITIES.map(c => c.slug);
}
