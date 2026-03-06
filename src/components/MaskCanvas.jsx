import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

/**
 * MaskCanvas — interactive drawing overlay for selecting areas on an image.
 * Users paint on their photo to highlight areas they want transformed.
 * Exposes getMask() via ref to export a black/white mask image.
 */
const MaskCanvas = forwardRef(function MaskCanvas({ imageSrc, onMaskChange }, ref) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(30);
    const [history, setHistory] = useState([]);
    const [isEraser, setIsEraser] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const naturalDims = useRef({ w: 0, h: 0 });
    const lastPos = useRef(null);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100, visible: false });

    // Load image and size the canvas to match the rendered image
    useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.onload = () => {
            naturalDims.current = { w: img.width, h: img.height };
            requestAnimationFrame(() => {
                const imgEl = containerRef.current?.querySelector('.mask-canvas__image');
                if (!imgEl) return;

                // Wait for the image element to have actual dimensions
                const rect = imgEl.getBoundingClientRect();
                const w = Math.round(rect.width);
                const h = Math.round(rect.height);

                const canvas = canvasRef.current;
                if (!canvas || w === 0 || h === 0) return;

                canvas.width = w;
                canvas.height = h;
                canvas.style.width = w + 'px';
                canvas.style.height = h + 'px';

                setCanvasReady(true);
            });
        };
        img.src = imageSrc;
    }, [imageSrc]);

    // Also handle resize
    useEffect(() => {
        if (!canvasReady) return;
        const handleResize = () => {
            const imgEl = containerRef.current?.querySelector('.mask-canvas__image');
            const canvas = canvasRef.current;
            if (!imgEl || !canvas) return;

            const rect = imgEl.getBoundingClientRect();
            const w = Math.round(rect.width);
            const h = Math.round(rect.height);

            // Save current drawing
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

            canvas.width = w;
            canvas.height = h;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';

            // Restore drawing scaled
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempCanvas, 0, 0, w, h);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [canvasReady]);

    // Save a snapshot for undo
    const saveSnapshot = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const snapshot = canvas.toDataURL();
        setHistory(prev => [...prev, snapshot]);
    }, []);

    // Check if canvas has any paint
    const checkHasMask = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let hasPaint = false;
        for (let i = 3; i < data.length; i += 16) {
            if (data[i] > 0) { hasPaint = true; break; }
        }
        onMaskChange?.(hasPaint);
    }, [onMaskChange]);

    const getPos = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }, []);

    const paintDot = useCallback((ctx, x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }, [brushSize]);

    const paintLine = useCallback((ctx, from, to) => {
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }, [brushSize]);

    const startDraw = useCallback((e) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        saveSnapshot();
        setIsDrawing(true);

        const ctx = canvas.getContext('2d');
        const pos = getPos(e);
        lastPos.current = pos;

        if (isEraser) {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }
        ctx.fillStyle = 'rgba(212, 133, 106, 0.45)';
        ctx.strokeStyle = 'rgba(212, 133, 106, 0.45)';
        paintDot(ctx, pos.x, pos.y);
    }, [brushSize, getPos, saveSnapshot, isEraser, paintDot]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const pos = getPos(e);

        if (isEraser) {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
        }

        ctx.fillStyle = 'rgba(212, 133, 106, 0.45)';
        ctx.strokeStyle = 'rgba(212, 133, 106, 0.45)';

        if (lastPos.current) {
            paintLine(ctx, lastPos.current, pos);
        } else {
            paintDot(ctx, pos.x, pos.y);
        }
        lastPos.current = pos;
    }, [isDrawing, brushSize, getPos, isEraser, paintDot, paintLine]);

    const endDraw = useCallback(() => {
        if (isDrawing) {
            setIsDrawing(false);
            lastPos.current = null;
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.globalCompositeOperation = 'source-over';
            }
            checkHasMask();
        }
    }, [isDrawing, checkHasMask]);

    // Track cursor position relative to the container for custom brush cursor
    const handleCursorMove = useCallback((e) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            visible: true
        });
    }, []);

    const handleCursorLeave = useCallback(() => {
        setCursorPos(prev => ({ ...prev, visible: false }));
    }, []);

    const handleUndo = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || history.length === 0) return;

        const ctx = canvas.getContext('2d');
        const newHistory = [...history];
        newHistory.pop();

        if (newHistory.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            const prevSnap = newHistory[newHistory.length - 1];
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = prevSnap;
        }
        setHistory(newHistory);
        setTimeout(() => checkHasMask(), 100);
    }, [history, checkHasMask]);

    const handleClear = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHistory([]);
        onMaskChange?.(false);
    }, [onMaskChange]);

    // Expose getMask() to parent via ref
    useImperativeHandle(ref, () => ({
        getMask: () => {
            const canvas = canvasRef.current;
            if (!canvas) return null;

            const nw = naturalDims.current.w || canvas.width;
            const nh = naturalDims.current.h || canvas.height;

            // Create a black/white mask at natural image dimensions
            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = nw;
            maskCanvas.height = nh;
            const maskCtx = maskCanvas.getContext('2d');

            // Black background (keep areas)
            maskCtx.fillStyle = '#000000';
            maskCtx.fillRect(0, 0, nw, nh);

            // Draw the user's painting scaled to natural res
            maskCtx.drawImage(canvas, 0, 0, nw, nh);

            // Convert to pure black/white
            const maskData = maskCtx.getImageData(0, 0, nw, nh);
            const pixels = maskData.data;
            for (let i = 0; i < pixels.length; i += 4) {
                const alpha = pixels[i + 3];
                if (alpha > 10) {
                    pixels[i] = 255;
                    pixels[i + 1] = 255;
                    pixels[i + 2] = 255;
                    pixels[i + 3] = 255;
                } else {
                    pixels[i] = 0;
                    pixels[i + 1] = 0;
                    pixels[i + 2] = 0;
                    pixels[i + 3] = 255;
                }
            }
            maskCtx.putImageData(maskData, 0, 0);

            return maskCanvas.toDataURL('image/png');
        }
    }), []);

    return (
        <div className="mask-canvas" ref={containerRef} style={{ position: 'relative' }}>
            <div
                className="mask-canvas__wrapper"
                onMouseMove={handleCursorMove}
                onMouseLeave={handleCursorLeave}
            >
                <img
                    src={imageSrc}
                    alt="Your space — paint over areas to transform"
                    className="mask-canvas__image"
                    draggable={false}
                />
                <canvas
                    ref={canvasRef}
                    className="mask-canvas__canvas"
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={endDraw}
                    onMouseLeave={endDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={endDraw}
                    style={{ cursor: isEraser ? 'crosshair' : 'none' }}
                />
            </div>
            {/* Custom brush cursor — positioned outside overflow:hidden wrapper */}
            {!isEraser && cursorPos.visible && (
                <div
                    className="mask-canvas__cursor"
                    style={{
                        width: brushSize,
                        height: brushSize,
                        left: cursorPos.x,
                        top: cursorPos.y,
                    }}
                />
            )}

            {/* Toolbar */}
            <div className="mask-toolbar">
                <div className="mask-toolbar__group">
                    <button
                        className={`mask-toolbar__btn ${!isEraser ? 'mask-toolbar__btn--active' : ''}`}
                        onClick={() => setIsEraser(false)}
                        title="Brush"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.37 2.63a2.12 2.12 0 0 1 3 3L14 13l-4 1 1-4Z" /><path d="M20 7 17 4" /></svg>
                        Brush
                    </button>
                    <button
                        className={`mask-toolbar__btn ${isEraser ? 'mask-toolbar__btn--active' : ''}`}
                        onClick={() => setIsEraser(true)}
                        title="Eraser"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /><path d="M22 21H7" /><path d="m5 11 9 9" /></svg>
                        Eraser
                    </button>
                </div>

                <div className="mask-toolbar__group mask-toolbar__group--slider">
                    <label>
                        <span className="mask-toolbar__label">Size</span>
                        <input
                            type="range"
                            min="8"
                            max="80"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="mask-toolbar__slider"
                        />
                    </label>
                    <div className="mask-toolbar__size-preview"
                        style={{ width: Math.max(8, brushSize * 0.4), height: Math.max(8, brushSize * 0.4) }}
                    />
                </div>

                <div className="mask-toolbar__group">
                    <button
                        className="mask-toolbar__btn"
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        title="Undo last stroke"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>
                        Undo
                    </button>
                    <button
                        className="mask-toolbar__btn mask-toolbar__btn--danger"
                        onClick={handleClear}
                        title="Clear all"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        Clear
                    </button>
                </div>
            </div>

            <p className="mask-canvas__hint">
                Paint over the areas you want to transform with Sierra Stone. Use the eraser to fix mistakes.
            </p>
        </div>
    );
});

export default MaskCanvas;
