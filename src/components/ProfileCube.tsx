import { useRef, useEffect, useState, useCallback } from "react";

interface ProfileCubeProps {
    imageSrc: string;
    size?: number;
    onFaceClick?: () => void;
}

const ProfileCube = ({ imageSrc, size = 112, onFaceClick }: ProfileCubeProps) => {
    const rotX = useRef(-20);
    const rotY = useRef(35);
    const velX = useRef(0);
    const velY = useRef(0);
    const dragging = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const rafId = useRef<number>(0);
    const lastFrame = useRef(0);
    const cubeRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const half = size / 2;

    // Detect mobile once
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // Detect reduced motion preference
    const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Target FPS: 60 on desktop, 30 on mobile, 0 (static) if reduced motion
    const targetFPS = prefersReduced ? 0 : isMobile ? 30 : 60;
    const frameInterval = targetFPS > 0 ? 1000 / targetFPS : Infinity;

    const applyTransform = useCallback(() => {
        if (cubeRef.current) {
            cubeRef.current.style.transform =
                `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
        }
    }, []);

    // Animation loop with FPS cap
    const loop = useCallback((timestamp: number) => {
        if (targetFPS === 0) return; // reduced motion: no animation

        const elapsed = timestamp - lastFrame.current;
        if (elapsed >= frameInterval) {
            lastFrame.current = timestamp - (elapsed % frameInterval);

            if (!dragging.current) {
                if (Math.abs(velX.current) > 0.05 || Math.abs(velY.current) > 0.05) {
                    rotX.current += velX.current;
                    rotY.current += velY.current;
                    velX.current *= 0.92;
                    velY.current *= 0.92;
                } else {
                    velX.current = 0;
                    velY.current = 0;
                    // Slower auto-spin on mobile to save battery
                    rotY.current += isMobile ? 0.15 : 0.25;
                }
                applyTransform();
            }
        }
        rafId.current = requestAnimationFrame(loop);
    }, [applyTransform, frameInterval, isMobile, targetFPS]);

    useEffect(() => {
        if (targetFPS === 0) return;
        rafId.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId.current);
    }, [loop, targetFPS]);

    /* ── Mouse handlers (desktop only) ─────────────────────────── */
    const onMouseDown = (e: React.MouseEvent) => {
        if (isMobile) return;
        dragging.current = true;
        setIsDragging(true);
        lastX.current = e.clientX;
        lastY.current = e.clientY;
        velX.current = 0;
        velY.current = 0;
        e.preventDefault();
    };

    useEffect(() => {
        if (isMobile) return;
        const onMouseMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            const dx = e.clientX - lastX.current;
            const dy = e.clientY - lastY.current;
            velY.current = dx * 0.5;
            velX.current = -dy * 0.5;
            rotY.current += dx * 0.5;
            rotX.current -= dy * 0.5;
            lastX.current = e.clientX;
            lastY.current = e.clientY;
            applyTransform();
        };
        const onMouseUp = () => {
            dragging.current = false;
            setIsDragging(false);
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [applyTransform, isMobile]);

    /* ── Touch handlers ─────────────────────────────────────────── */
    const onTouchStart = (e: React.TouchEvent) => {
        dragging.current = true;
        setIsDragging(true);
        lastX.current = e.touches[0].clientX;
        lastY.current = e.touches[0].clientY;
        velX.current = 0;
        velY.current = 0;
    };

    useEffect(() => {
        const el = cubeRef.current?.parentElement?.parentElement;
        if (!el) return;
        const onTouchMove = (e: TouchEvent) => {
            if (!dragging.current) return;
            e.preventDefault();
            const dx = e.touches[0].clientX - lastX.current;
            const dy = e.touches[0].clientY - lastY.current;
            velY.current = dx * 0.6;
            velX.current = -dy * 0.6;
            rotY.current += dx * 0.6;
            rotX.current -= dy * 0.6;
            lastX.current = e.touches[0].clientX;
            lastY.current = e.touches[0].clientY;
            applyTransform();
        };
        const onTouchEnd = () => {
            dragging.current = false;
            setIsDragging(false);
        };
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [applyTransform]);

    const face = (transform: string, brightness = 1) => (
        <div
            style={{
                position: "absolute",
                width: size,
                height: size,
                transform,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                borderRadius: "20%",
                overflow: "hidden",
                border: "2.5px solid rgba(249,115,22,0.55)",
                boxShadow: "inset 0 0 18px rgba(249,115,22,0.2), 0 0 24px rgba(249,115,22,0.15)",
                filter: `brightness(${brightness})`,
                // GPU layer per face
                willChange: "transform",
            }}
        >
            <img
                src={imageSrc}
                alt="Nahush Patel"
                draggable={false}
                width={size}
                height={size}
                // Above-fold image: eager load
                loading="eager"
                decoding="async"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            />
            {/* Glass sheen */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                borderRadius: "inherit",
            }} />
        </div>
    );

    return (
        <div
            style={{
                width: size,
                height: size,
                perspective: size * 4,
                perspectiveOrigin: "50% 50%",
                cursor: prefersReduced ? "pointer" : isDragging ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "none",
                // Isolate this subtree into its own compositor layer
                contain: "layout style",
                willChange: "transform",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onClick={() => !isDragging && onFaceClick?.()}
        >
            <div style={{
                width: "100%", height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
            }}>
                <div
                    ref={cubeRef}
                    style={{
                        width: size,
                        height: size,
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`,
                        willChange: "transform",
                    }}
                >
                    {face(`translateZ(${half}px)`, 1)}
                    {face(`rotateY(180deg) translateZ(${half}px)`, 0.85)}
                    {face(`rotateY(-90deg) translateZ(${half}px)`, 0.9)}
                    {face(`rotateY(90deg)  translateZ(${half}px)`, 0.9)}
                    {face(`rotateX(90deg)  translateZ(${half}px)`, 0.8)}
                    {face(`rotateX(-90deg) translateZ(${half}px)`, 0.75)}
                </div>
            </div>
        </div>
    );
};

export default ProfileCube;
