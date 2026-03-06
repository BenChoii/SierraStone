import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { STONE_CATEGORIES } from '../utils/data';
import { fileToBase64, transformImage } from '../utils/visualizer';
import MaskCanvas from '../components/MaskCanvas';
import './Visualizer.css';

export default function Visualizer() {
    const [searchParams] = useSearchParams();
    const allStones = useMemo(
        () => STONE_CATEGORIES.flatMap((c) => c.stones),
        []
    );

    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedStone, setSelectedStone] = useState(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [hasMask, setHasMask] = useState(false);
    const [maskConfirmed, setMaskConfirmed] = useState(false);
    const fileInputRef = useRef(null);
    const maskCanvasRef = useRef(null);

    // Pre-select stone from URL
    useEffect(() => {
        const stoneId = searchParams.get('stone');
        if (stoneId) {
            const found = allStones.find((s) => s.id === stoneId);
            if (found) setSelectedStone(found);
        }
    }, [searchParams, allStones]);

    const handleFile = useCallback(async (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setUploadedFile(file);
        const base64 = await fileToBase64(file);
        setUploadedImage(base64);
        setResult(null);
        setError(null);
        setHasMask(false);
        setMaskConfirmed(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleTransform = async () => {
        if (!uploadedImage || !selectedStone) return;
        setIsTransforming(true);
        setError(null);
        setResult(null);

        try {
            // Get mask from canvas
            let maskData = null;
            if (maskCanvasRef.current && hasMask) {
                maskData = maskCanvasRef.current.getMask();
            }
            const resultUrl = await transformImage(uploadedImage, selectedStone, maskData);
            setResult(resultUrl);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsTransforming(false);
        }
    };

    const handleDownload = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result;
        link.download = `sierra-stone-${selectedStone?.id || 'visualizer'}.png`;
        link.click();
    };

    const handleReset = () => {
        setUploadedImage(null);
        setUploadedFile(null);
        setResult(null);
        setError(null);
        setHasMask(false);
        setMaskConfirmed(false);
    };

    const handleConfirmMask = () => {
        setMaskConfirmed(true);
    };

    const handleEditMask = () => {
        setMaskConfirmed(false);
        setResult(null);
        setError(null);
    };

    // Determine which step is active
    const getStep = () => {
        if (!uploadedImage) return 1;
        if (!maskConfirmed) return 2;
        if (!selectedStone) return 3;
        return 4;
    };
    const currentStep = getStep();

    // Loading messages cycle
    const loadingMessages = [
        'Analyzing your photo...',
        'Identifying surfaces...',
        'Applying stone texture...',
        'Rendering photorealistic result...',
        'Almost there...'
    ];
    const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

    useEffect(() => {
        if (!isTransforming) { setLoadingMsgIndex(0); return; }
        const interval = setInterval(() => {
            setLoadingMsgIndex(prev =>
                prev < loadingMessages.length - 1 ? prev + 1 : prev
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [isTransforming, loadingMessages.length]);

    return (
        <>
            <section className="viz-hero">
                <div className="container">
                    <div className="viz-hero__badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                        Powered by AI
                    </div>
                    <h1>Stone Visualizer</h1>
                    <p>
                        Upload a photo, paint the exact area you want transformed, pick your
                        Sierra Stone colour, and watch the AI bring it to life.
                    </p>
                </div>
            </section>

            <section className="viz-tool">
                <div className="container">
                    <div className="viz-tool__inner">
                        {/* Steps Indicator */}
                        <div className="viz-steps">
                            <div className={`viz-step ${currentStep === 1 ? 'viz-step--active' : ''} ${uploadedImage ? 'viz-step--done' : ''}`}>
                                <div className="viz-step__num">{uploadedImage ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : '1'}</div>
                                <span>Upload Photo</span>
                            </div>
                            <div className="viz-step__connector" />
                            <div className={`viz-step ${currentStep === 2 ? 'viz-step--active' : ''} ${maskConfirmed ? 'viz-step--done' : ''}`}>
                                <div className="viz-step__num">{maskConfirmed ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : '2'}</div>
                                <span>Mark Area</span>
                            </div>
                            <div className="viz-step__connector" />
                            <div className={`viz-step ${currentStep === 3 ? 'viz-step--active' : ''} ${selectedStone ? 'viz-step--done' : ''}`}>
                                <div className="viz-step__num">{selectedStone ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : '3'}</div>
                                <span>Choose Stone</span>
                            </div>
                            <div className="viz-step__connector" />
                            <div className={`viz-step ${currentStep === 4 && uploadedImage && selectedStone ? 'viz-step--active' : ''} ${result ? 'viz-step--done' : ''}`}>
                                <div className="viz-step__num">{result ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : '4'}</div>
                                <span>Visualize</span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="viz-error">
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Step 1: Upload Zone */}
                        {!uploadedImage && (
                            <div
                                className={`viz-upload ${dragActive ? 'viz-upload--active' : ''}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={handleDrop}
                            >
                                <div className="viz-upload__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                                </div>
                                <h3>Upload a Photo of Your Space</h3>
                                <p>Drag and drop or click to select — patios, pools, driveways, steps</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFile(e.target.files?.[0])}
                                />
                            </div>
                        )}

                        {/* Step 2: Mark Area with Drawing Canvas */}
                        {uploadedImage && !maskConfirmed && !isTransforming && !result && (
                            <div className="viz-mask-section">
                                <div className="viz-mask-section__header">
                                    <h3>Mark the Area to Transform</h3>
                                    <p>Paint over the surfaces you want to apply Sierra Stone to. You can mark stairs, a driveway, patio — it's up to you.</p>
                                </div>
                                <MaskCanvas
                                    ref={maskCanvasRef}
                                    imageSrc={uploadedImage}
                                    onMaskChange={setHasMask}
                                />
                                <div className="viz-mask-section__actions">
                                    <button
                                        className="btn btn--gold viz-mask-section__confirm"
                                        onClick={handleConfirmMask}
                                        disabled={!hasMask}
                                        id="confirm-mask-btn"
                                    >
                                        {hasMask ? 'Confirm Selection & Continue' : 'Paint an area to continue'}
                                    </button>
                                    <button className="btn btn--outline viz-mask-section__skip" onClick={() => { setHasMask(false); setMaskConfirmed(true); }}>
                                        Skip — Transform All Surfaces Instead
                                    </button>
                                    <button className="viz-preview__change" onClick={handleReset} style={{ position: 'static', marginLeft: 'auto' }}>
                                        Change Photo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Stone Selector */}
                        {uploadedImage && maskConfirmed && !isTransforming && !result && (
                            <div className="viz-stones">
                                <div className="viz-stones__header">
                                    <h3>Select a Sierra Stone Colour</h3>
                                    <button className="viz-stones__edit-mask" onClick={handleEditMask}>
                                        ← Edit Area Selection
                                    </button>
                                </div>

                                {/* Small preview of the image with mask */}
                                <div className="viz-stones__preview-thumb">
                                    <img src={uploadedImage} alt="Selected space" />
                                    <div className="viz-stones__preview-badge">
                                        {hasMask ? 'Custom area selected' : 'All surfaces'}
                                    </div>
                                </div>

                                <div className="viz-stones__grid">
                                    {allStones.map((stone) => (
                                        <button
                                            key={stone.id}
                                            className={`viz-stone-btn ${selectedStone?.id === stone.id ? 'viz-stone-btn--selected' : ''}`}
                                            onClick={() => setSelectedStone(stone)}
                                        >
                                            <img src={stone.image} alt={stone.name} loading="lazy" />
                                            <span>{stone.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Transform Button */}
                        {uploadedImage && maskConfirmed && selectedStone && !isTransforming && !result && (
                            <button className="btn btn--gold viz-transform-btn" id="visualize-btn" onClick={handleTransform}>
                                Visualize with {selectedStone.name}
                            </button>
                        )}

                        {/* Loading State */}
                        {isTransforming && (
                            <div className="viz-loading">
                                <div className="viz-loading__spinner" />
                                <h3>Transforming Your Space...</h3>
                                <p>{loadingMessages[loadingMsgIndex]}</p>
                                <div className="viz-loading__progress">
                                    <div className="viz-loading__progress-bar" />
                                </div>
                                <p className="viz-loading__time">This may take 20–40 seconds</p>
                            </div>
                        )}

                        {/* Result + Lead Generation */}
                        {result && (
                            <div className="viz-result">
                                <h2>Your Space, Reimagined</h2>
                                <div className="viz-comparison">
                                    <div className="viz-comparison__panel">
                                        <div className="viz-comparison__label viz-comparison__label--before">Before</div>
                                        <img src={uploadedImage} alt="Original space" />
                                    </div>
                                    <div className="viz-comparison__panel">
                                        <div className="viz-comparison__label viz-comparison__label--after">
                                            After — {selectedStone?.name}
                                        </div>
                                        <img src={result} alt={`Space with ${selectedStone?.name} stone`} />
                                    </div>
                                </div>

                                {/* ===== CONVERSION PANEL ===== */}
                                <div className="viz-cta">
                                    <div className="viz-cta__header">
                                        <h3>Ready to Make It Real?</h3>
                                        <p>Love what you see? Let's bring this vision to life. Book a free in-home estimate — we'll assess your space, confirm your colour, and provide a detailed quote on the spot.</p>
                                    </div>

                                    <div className="viz-cta__buttons">
                                        <button
                                            className="btn btn--gold viz-cta__book"
                                            onClick={() => {
                                                if (window.Calendly) {
                                                    window.Calendly.initPopupWidget({
                                                        url: 'https://calendly.com/oktd-info/30min?hide_event_type_details=1&hide_gdpr_banner=1'
                                                    });
                                                }
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                            Book Your Free Estimate
                                        </button>
                                        <a href="tel:2508089425" className="btn btn--dark viz-cta__call">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            Call (250) 808-9425
                                        </a>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="viz-cta__trust">
                                        <div className="viz-cta__badge">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                            <span>25-Year Warranty</span>
                                        </div>
                                        <div className="viz-cta__badge">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                            <span>1–2 Day Install</span>
                                        </div>
                                        <div className="viz-cta__badge">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            <span>No Demolition Needed</span>
                                        </div>
                                        <div className="viz-cta__badge">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M5.5 7.5l13 9M5.5 16.5l13-9" /></svg>
                                            <span>Slip &amp; UV Resistant</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== WHY SIERRA STONE ===== */}
                                <div className="viz-why">
                                    <h3>Why Sierra Stone?</h3>
                                    <div className="viz-why__grid">
                                        <div className="viz-why__item">
                                            <strong>Applied Over Existing Surfaces</strong>
                                            <p>No costly demolition or removal. Sierra Stone bonds directly to concrete, wood, and vinyl — saving you time and money.</p>
                                        </div>
                                        <div className="viz-why__item">
                                            <strong>Built for Okanagan Weather</strong>
                                            <p>Engineered to handle freeze-thaw cycles, intense UV, and everything BC weather throws at it. Year-round durability.</p>
                                        </div>
                                        <div className="viz-why__item">
                                            <strong>Virtually Maintenance-Free</strong>
                                            <p>No sealing, no staining, no annual upkeep. Just hose it down. Your weekends are yours again.</p>
                                        </div>
                                        <div className="viz-why__item">
                                            <strong>Professional Installation</strong>
                                            <p>Our certified installers handle everything. Most projects are completed in just 1–2 days with minimal disruption.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== ACTION BAR ===== */}
                                <div className="viz-result__actions">
                                    <button className="btn btn--primary" onClick={handleDownload}>
                                        Download Result
                                    </button>
                                    <button className="btn btn--dark" onClick={() => { setResult(null); setError(null); }}>
                                        Try Another Colour
                                    </button>
                                    <button className="btn btn--outline" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }} onClick={handleEditMask}>
                                        Edit Selection Area
                                    </button>
                                    <button className="btn btn--outline" style={{ borderColor: 'var(--stone-grey)', color: 'var(--stone-grey)' }} onClick={handleReset}>
                                        Upload New Photo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
