import { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../utils/data';
import './Gallery.css';

const FILTERS = [
    { key: 'all', label: 'All Projects' },
    { key: 'before-after', label: 'Before & After' },
    { key: 'pool-decks', label: 'Pool Decks' },
    { key: 'decks-patios', label: 'Decks & Patios' },
    { key: 'driveways', label: 'Driveways' },
    { key: 'front-steps', label: 'Front Steps' },
];

/* ── Main Gallery Page ── */
export default function Gallery() {
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    /* Split B&A items into featured row, rest into masonry */
    const { featured, rest } = useMemo(() => {
        if (filter === 'before-after') {
            return { featured: [], rest: GALLERY_IMAGES.filter((i) => i.beforeImage) };
        }
        if (filter !== 'all') {
            return { featured: [], rest: GALLERY_IMAGES.filter((i) => i.category === filter) };
        }
        const ba = GALLERY_IMAGES.filter((i) => i.beforeImage);
        const others = GALLERY_IMAGES.filter((i) => !i.beforeImage);
        return { featured: ba, rest: others };
    }, [filter]);

    const isBA = lightbox?.beforeImage;

    const renderCard = (img) => (
        <div
            key={img.id}
            className={`gallery-item ${img.beforeImage ? 'gallery-item--ba' : ''}`}
            onClick={() => setLightbox(img)}
        >
            <img src={img.image} alt={img.title} loading="lazy" />
            {img.beforeImage && (
                <div className="gallery-item__ba-badge">
                    <span>⟺</span> Before &amp; After
                </div>
            )}
            <div className="gallery-item__overlay">
                <span>{img.title}</span>
                {img.beforeImage && <em>View transformation</em>}
            </div>
        </div>
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
                                className={`gallery-filter-btn ${filter === f.key ? 'gallery-filter-btn--active' : ''} ${f.key === 'before-after' ? 'gallery-filter-btn--ba' : ''}`}
                                onClick={() => setFilter(f.key)}
                            >
                                {f.key === 'before-after' && <span className="ba-icon">⟺</span>}
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="gallery-grid">
                <div className="container">
                    {/* Featured B&A row — side by side */}
                    {featured.length > 0 && (
                        <div className="gallery-featured-row">
                            {featured.map(renderCard)}
                        </div>
                    )}

                    <div className="gallery-masonry">
                        {rest.map(renderCard)}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>

                    {isBA ? (
                        <div className="lightbox__ba-wrap" onClick={(e) => e.stopPropagation()}>
                            <p className="lightbox__ba-title">{lightbox.title}</p>
                            <div className="lightbox__ba-panels">
                                <div className="ba-panel">
                                    <img src={lightbox.beforeImage} alt={`Before — ${lightbox.title}`} />
                                    <span className="ba-panel__label ba-panel__label--before">Before</span>
                                </div>
                                <div className="ba-panel">
                                    <img src={lightbox.image} alt={`After — ${lightbox.title}`} />
                                    <span className="ba-panel__label ba-panel__label--after">After</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <img src={lightbox.image} alt={lightbox.title} onClick={(e) => e.stopPropagation()} />
                    )}
                </div>
            )}
        </>
    );
}
