"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ImageZoomOverlay() {
    const [zoomImage, setZoomImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleOpen = (e: CustomEvent) => {
            setZoomImage(e.detail.image);
            setScale(1);
        };
        window.addEventListener("OPEN_IMAGE_ZOOM", handleOpen as EventListener);
        return () => window.removeEventListener("OPEN_IMAGE_ZOOM", handleOpen as EventListener);
    }, []);

    if (!mounted || !zoomImage) return null;

    // Use Portal to render outside of parent stacking contexts
    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] isolate pointer-events-none"
            >
                {/* 1. BACKDROP (Clickable) */}
                <div
                    className="absolute inset-0 bg-black/95 cursor-pointer pointer-events-auto"
                    onClick={() => setZoomImage(null)}
                />

                {/* 2. CONTROLS (Clickable, Top Layer) */}
                <div
                    className="fixed top-8 right-24 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 z-[1000000] pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setScale(Math.max(1, scale - 0.5))} className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white"><ZoomOut size={20} /></button>
                    <span className="text-xs font-mono font-bold w-12 text-center select-none text-white">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(scale + 0.5)} className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white"><ZoomIn size={20} /></button>
                </div>

                {/* 3. CLOSE BUTTON (Clickable, Top Layer) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage(null);
                    }}
                    className="fixed top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer z-[1000000] pointer-events-auto"
                >
                    <X size={24} />
                </button>

                {/* 4. IMAGE CONTAINER (Passthrough) */}
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[999999]">
                    <motion.div
                        animate={{ scale }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full max-w-7xl max-h-[85vh] p-10 pointer-events-auto flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {zoomImage && (
                            <Image
                                src={zoomImage}
                                alt="Zoomed View"
                                fill
                                className="object-contain"
                            />
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
