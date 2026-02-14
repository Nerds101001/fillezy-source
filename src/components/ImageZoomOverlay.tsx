"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageZoomOverlay() {
    const [zoomImage, setZoomImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleOpen = (e: CustomEvent) => {
            setZoomImage(e.detail.image);
            setScale(1);
        };
        window.addEventListener("OPEN_IMAGE_ZOOM", handleOpen as EventListener);
        return () => window.removeEventListener("OPEN_IMAGE_ZOOM", handleOpen as EventListener);
    }, []);

    if (!zoomImage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                onClick={() => setZoomImage(null)}
            >
                <div className="absolute top-8 right-8 flex items-center gap-4 z-50">
                    <div className="flex items-center gap-2 bg-black/5 rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setScale(Math.max(1, scale - 0.5))} className="p-3 hover:bg-white rounded-full transition-colors"><ZoomOut size={20} /></button>
                        <span className="text-xs font-mono font-bold w-8 text-center">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(scale + 0.5)} className="p-3 hover:bg-white rounded-full transition-colors"><ZoomIn size={20} /></button>
                    </div>
                    <button
                        onClick={() => setZoomImage(null)}
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div
                    className="relative w-full h-full overflow-auto flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.div
                        animate={{ scale }}
                        className="relative w-full h-full max-w-5xl max-h-[85vh]"
                    >
                        <Image
                            src={zoomImage}
                            alt="Zoomed View"
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
