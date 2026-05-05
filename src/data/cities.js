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
        intro: `Kelowna homeowners know the Okanagan sun takes a toll on outdoor surfaces. Between scorching summers, freezing winters, and everything in between, your pool deck, patio, and driveway face year-round punishment. Sierra Stone provides Kelowna residents with a premium stone aggregate coating that transforms worn, cracked, or dated surfaces into stunning, durable finishes built to last 25+ years.

Kelowna is a city of distinct neighborhoods, and each one creates its own demands on outdoor surfaces. In Lower Mission and Upper Mission, homes near the lake face the highest UV exposure in the region — direct sun off the water reflects back onto patios and pool decks, accelerating fading on stamped concrete and painted surfaces. In Glenmore and Dilworth Mountain, the elevation and slope create drainage challenges that punish poorly built paver patios and crack rigid concrete driveways along their slope lines. In Rutland and Black Mountain, slightly more affordable lots often pair with older homes that have first-generation stamped concrete or broom-finish slabs nearing the end of their useful life. In Kettle Valley and the upper neighborhoods, newer construction means owners want a finish that matches the architectural quality of the home itself, not a builder-grade slab.

Sierra Stone fits all of these realities. The natural river-stone aggregate and industrial-grade epoxy bond directly over the existing surface — no demolition, no week-long re-pour, no debris haul. We have installed across Kelowna for years and know the substrate conditions to expect: post-tension slab pool decks, sloped Glenmore driveways, lakefront Mission patios with sustained UV, finished basements in Dilworth, and everything in between. The flexible epoxy matrix handles Kelowna's freeze-thaw cycles without cracking. The UV-stable topcoat protects the surface against the 2,000+ hours of direct sunlight per year. The natural stone aggregate stays cooler underfoot than dark pavers — a real difference around Kelowna pools where kids run barefoot all summer. Free in-home estimates anywhere in the city.`,
        localFactors: [
            'High UV exposure year-round, especially on south-facing and lakefront lots — accelerates fading and chalking on stamped concrete and painted surfaces.',
            'Freeze-thaw cycles from late October through early April crack rigid concrete and shift paver bases, especially on sloped Glenmore and Dilworth lots.',
            'Lake reflection in Lower and Upper Mission doubles effective UV exposure on pool decks and lakefront patios.',
            'Older Rutland and central Kelowna homes typically have 25-40 year-old concrete slabs that benefit from resurfacing rather than replacement.',
            'Newer Kettle Valley and Wilden builds often have premium homes paired with builder-grade slabs that visually undersell the property.',
        ],
        localProjects: [
            'Pool deck resurfacing in Lower Mission overlooking Okanagan Lake — full sun, lakefront UV, and chlorine exposure handled by the UV-stable topcoat.',
            'Driveway stone coating in Glenmore on a steeply sloped lot, replacing first-generation stamped concrete that had cracked along the control joints.',
            'Front steps and walkway in Kettle Valley — slip-resistant aggregate finish in a warm-toned blend matching the home\'s natural stone exterior.',
            'Garage floor stone coating in Dilworth Mountain — hot-tire-resistant indoor formulation over a previously painted slab that had been peeling.',
            'Patio resurfacing in Rutland over a 35-year-old broom-finish concrete slab — substrate sound, finish completely transformed in three days.',
            'Pool surround and walkway in Upper Mission, integrating the existing flagstone coping with a seamless natural-stone deck finish.',
        ],
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
        intro: `West Kelowna's lakeside communities deserve outdoor surfaces as beautiful as the views. Whether you're in Lakeview Heights overlooking Okanagan Lake or enjoying a backyard pool in Shannon Lake, Sierra Stone delivers premium stone coatings that elevate your home's curb appeal and outdoor living experience.

West Kelowna sits on the western slope of Okanagan Lake, and that geography defines what outdoor surfaces have to handle. In Lakeview Heights, lots are tiered down toward the water, and patios and pool decks are typically multi-level — meaning steps, retaining wall caps, and walkways are as critical as the main deck itself. In Glenrosa, lots run higher and steeper, with longer driveways and front-step approaches that bear the brunt of every winter freeze-thaw cycle. In Westbank and along Highway 97, older established homes often have 30-plus-year-old slabs that show their age even where the home itself has been beautifully maintained. In Shannon Lake and Rose Valley, newer builds and rebuilds mean owners want a finish that matches the upscale quality of the home rather than a generic broom-finish concrete deck.

The west side also sees more sustained afternoon sun than the east shore — the sun rises behind the hills and then beats directly onto west-facing lakefront patios for the longest part of the day. That makes UV stability a particular concern for outdoor coatings here. Sierra Stone's natural stone aggregate is unaffected by UV (the colour is the stone itself, not a dye), and the UV-stable topcoat is engineered for sustained sun exposure. The flexible epoxy matrix handles the soil movement common on tiered Lakeview Heights lots without cracking. The textured aggregate provides inherent slip resistance critical on sloped Glenrosa walkways and West Kelowna step approaches. Free in-home estimates throughout West Kelowna and surrounding communities — we will tell you straight whether resurfacing is the right call for your project, or whether something else would serve you better.`,
        localFactors: [
            'Sustained afternoon and evening sun on west-facing lakefront lots — among the highest UV exposure in the South Okanagan.',
            'Tiered properties in Lakeview Heights and Casa Loma create multi-level deck and step layouts where slip-resistance matters as much as aesthetics.',
            'Steeper Glenrosa lots stress driveways and walkways with concentrated runoff and freeze-thaw movement.',
            'Older Westbank-area slabs (30+ years) are typically structurally sound but cosmetically tired — ideal resurfacing candidates rather than replacement.',
            'Soil movement on hillside lots cracks rigid stamped concrete; a flexible coating system holds up where rigid systems fail.',
        ],
        localProjects: [
            'Multi-level pool deck and tiered patio in Lakeview Heights — full west-facing exposure, integrated step and walkway coating in matching aggregate.',
            'Steep driveway resurfacing in Glenrosa, replacing cracked stamped concrete with a slip-resistant natural-stone finish over the existing slab.',
            'Front steps and entry walkway in Shannon Lake — slip-resistant nosing finish on stairs descending to a lakefront walkout.',
            'Pool deck and surround in Casa Loma overlooking Okanagan Lake, with light-aggregate colour selected for cooler underfoot temperature in afternoon sun.',
            'Patio resurfacing in Westbank over an aging broom-finish slab — three-day install with the home\'s outdoor entertaining season unaffected.',
            'Garage floor finish in Rose Valley pairing the indoor stone aggregate with a coordinated outdoor walkway approach.',
        ],
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
        intro: `Penticton sits between two stunning lakes, and its homes reflect a lifestyle built around outdoor living. Sierra Stone helps Penticton homeowners transform their patios, pool decks, and driveways into spaces that match the beauty of Okanagan and Skaha lakes — with surfaces engineered to handle the south Okanagan's hot, dry summers and snowy winters.

Penticton is the hottest, driest part of the Okanagan corridor, and outdoor surfaces reflect that. Summers regularly push past +35°C in July and August, with sustained UV exposure that fades, chalks, or peels most consumer-grade coatings inside of a decade. Up on the Naramata Bench, lots benefit from elevated views and orchard-adjacent settings, but they also catch the longest evening sun in the region — west-facing patios there see direct sustained UV until well past dinner. In the Upper Bench and Wiltse neighborhoods, mid-century homes often have original concrete that has held up structurally but lost its surface integrity. Around Skaha Lake and the Lake Drive areas, lakefront pool decks face direct sun reflection off the water, doubling the effective UV load. In Columbia and West Bench, longer driveways and approach paths take more concentrated freeze-thaw movement than the main south-side neighborhoods.

The natural stone aggregate in Sierra Stone is unaffected by UV — the colour is the stone itself, not a dye that bleaches out — and the UV-stable topcoat is purpose-built for sustained South Okanagan sun. The flexible industrial-grade epoxy bonds directly over existing concrete (no demolition), and the textured aggregate stays cooler underfoot than dark pavers, which matters in Penticton more than almost anywhere else in BC. We have installed across Penticton, Naramata, and Okanagan Falls and know what to expect from the substrates and the climate. Free in-home estimates with no obligation — and honest assessments. If a project is structurally beyond resurfacing, we will tell you so and point you toward the right contractor.`,
        localFactors: [
            'Hottest summers in the Okanagan corridor — sustained +35°C heat and 2,000+ hours of direct UV per year accelerate failure on most consumer-grade coatings.',
            'Naramata Bench lots see the longest evening sun in the region — west-facing patios there are particularly hard on UV-sensitive finishes.',
            'Skaha Lake and Okanagan Lake reflection effectively doubles UV exposure on lakefront pool decks.',
            'Mid-century Upper Bench and Wiltse homes typically have original concrete slabs that are structurally sound but cosmetically aged — strong resurfacing candidates.',
            'South Okanagan winters are milder than the central and north Okanagan, but freeze-thaw still occurs from late November through early March on exposed surfaces.',
        ],
        localProjects: [
            'Pool deck resurfacing along Skaha Lake — full sun, lakefront UV reflection, and chlorine exposure handled by the UV-stable topcoat.',
            'Patio and walkway in Naramata Bench overlooking the orchards — west-facing sustained sun, light-aggregate colour selected for heat reflection.',
            'Driveway stone coating in West Bench, replacing a tired exposed-aggregate slab with a seamless natural-stone finish.',
            'Front steps and entry resurfacing in the Upper Bench — slip-resistant nosing finish over a 1970s concrete approach that had spalled at the edges.',
            'Pool surround on a lakefront property near Lake Drive, with a coordinated patio extension running back toward the home.',
            'Patio resurfacing in Columbia over a sound but visually dated 30-year-old broom-finish slab.',
        ],
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
        intro: `Vernon and the North Okanagan experience some of the region's most dramatic seasonal shifts — from hot summers perfect for poolside living to cold, snowy winters that test every outdoor surface. Sierra Stone provides Vernon homeowners with stone coatings engineered to handle these extremes while delivering stunning visual results.

Vernon is the cold-winter capital of the Okanagan corridor, and that single fact shapes everything about how outdoor surfaces age there. The North Okanagan typically sees more snowfall and lower January lows than Kelowna or Penticton, which means more freeze-thaw cycles per year, more snowplowing, more road-salt exposure on driveways, and more ice on front steps and walkways. In Coldstream, lots run larger with longer driveways and walkway approaches, all of which take the brunt of every winter cycle. In Predator Ridge and the Foothills, premium homes deserve a finish that matches the architectural quality but also has to survive elevated, exposed conditions. In the BX and East Hill neighborhoods, established homes often have aging concrete that has cycled through 30-40 winters and is showing every one of them. Around Okanagan Landing and Kalamalka Lake, lakefront pool decks face the same UV and chlorine punishment as the rest of the corridor, plus the additional freeze-thaw load.

Sierra Stone is engineered specifically for these conditions. The flexible industrial-grade epoxy matrix moves with thermal expansion instead of fighting it — that is the single most important property for any North Okanagan surface. The natural stone aggregate is unaffected by salt, de-icer chemicals, or UV. Standard winter de-icers (calcium chloride, magnesium chloride) are safe on the surface — no special winter products required, though we recommend plastic-edge snow blades over metal to extend the life of any decorative finish. The system bonds directly over your existing slab, eliminating the cost and disruption of a full re-pour. Free in-home estimates anywhere in Vernon, Coldstream, Lavington, and surrounding areas.`,
        localFactors: [
            'Coldest winters and most freeze-thaw cycles in the Okanagan corridor — flexible coating systems significantly outperform rigid concrete or stamped finishes here.',
            'Heavier snowfall means more snowplowing and salt exposure than central or south Okanagan; finishes need to handle de-icer chemicals without breaking down.',
            'Larger Coldstream and BX lots typically have longer driveways and walkway approaches that magnify cycle-related damage.',
            'Predator Ridge and Foothills elevation increases UV intensity in summer and freeze-thaw frequency in winter.',
            'Many Vernon and East Hill homes have 30-40 year-old original concrete — typically structurally sound but cosmetically aged, ideal for resurfacing rather than replacement.',
        ],
        localProjects: [
            'Driveway stone coating in Coldstream over a long, straight slab that had cracked along control joints from decades of freeze-thaw.',
            'Pool deck resurfacing on a Kalamalka Lake lakefront property — chlorine, UV, and freeze-thaw exposure all handled in one finish.',
            'Front steps and walkway in East Hill — slip-resistant aggregate finish replacing painted concrete that had been peeling each winter.',
            'Patio resurfacing in BX over a 1980s broom-finish slab that was structurally fine but visually exhausted.',
            'Garage floor stone coating in the Foothills — indoor formulation with hot-tire and chemical resistance over a previously unfinished slab.',
            'Front entry steps and approach walkway in Predator Ridge — exposed elevated location, with extra epoxy build at step nosings to handle winter wear.',
            'Pool surround in Okanagan Landing pairing the deck finish with a coordinated walkway down to the dock.',
        ],
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
