"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-black text-white shadow-2xl border border-white/10 group hover:bg-primary transition-all active:scale-95"
                    aria-label="Back to top"
                >
                    <ChevronUp className="group-hover:-translate-y-1 transition-transform" size={20} />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                        Top_of_Page
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
