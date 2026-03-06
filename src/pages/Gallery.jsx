import { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../utils/data';
import './Gallery.css';

const FILTERS = [
    { key: 'all', label: 'All Projects' },
    { key: 'pool-decks', label: 'Pool Decks' },
    { key: 'decks-patios', label: 'Decks & Patios' },
    { key: 'driveways', label: 'Driveways' },
    { key: 'front-steps', label: 'Front Steps' },
];

export default function Gallery() {
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    const filtered = useMemo(
        () => (filter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((i) => i.category === filter)),
        [filter]
    );

    return (
        <>
            <section className="gallery-hero">
                <div className="container">
                    <span className="section-label">Our Work</span>
                    <h1>Project Gallery</h1>
                    <p>
                        Browse our recent installations — pool decks, patios, driveways, and front steps
                        transformed with Sierra Stone across the Okanagan.
                    </p>
                    <div className="gallery-filters">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                className={`gallery-filter-btn ${filter === f.key ? 'gallery-filter-btn--active' : ''}`}
                                onClick={() => setFilter(f.key)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="gallery-grid">
                <div className="container">
                    <div className="gallery-masonry">
                        {filtered.map((img) => (
                            <div
                                key={img.id}
                                className="gallery-item"
                                onClick={() => setLightbox(img)}
                            >
                                <img src={img.image} alt={img.title} loading="lazy" />
                                <div className="gallery-item__overlay">
                                    <span>{img.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
                    <img src={lightbox.image} alt={lightbox.title} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </>
    );
}
