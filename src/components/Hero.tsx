"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Box, Compass, Zap, MessageSquare } from "lucide-react";
import { useRef, useState } from "react";
import ContactModal, { ModalMode } from "./ContactModal";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#FAFAFA]/80">
            {/* Subtle Pattern Overlay Layer */}
            {/* Architectural Grid Overlay - Minimal for light theme */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]">
                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-black" />
                <div className="absolute top-0 right-1/4 h-full w-[1px] bg-black" />
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black" />
                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-black" />
            </div>

            {/* Floating Cushions - Thematic Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 1.5,
                        }}
                        className="absolute opacity-[0.04]"
                        style={{
                            top: `${15 + i * 12}%`,
                            left: `${10 + (i % 3) * 30}%`,
                        }}
                    >
                        {/* Custom Air Cushion SVG Silhouette */}
                        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                            <rect x="10" y="20" width="80" height="60" rx="20" stroke="black" strokeWidth="2" fill="none" />
                            <circle cx="35" cy="50" r="5" fill="black" />
                            <circle cx="65" cy="50" r="5" fill="black" />
                            <path d="M20 50 Q50 30 80 50" stroke="black" strokeWidth="1" fill="none" opacity="0.3" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Background Layer */}
            <motion.div
                style={{ y, opacity, scale }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-[#FAFAFA] z-10" />
                <div
                    className="h-full w-full bg-cover bg-center opacity-10 grayscale contrast-125 mix-blend-multiply"
                    style={{ backgroundImage: "url('/product/Fillezy Rapid.webp')" }}
                />
            </motion.div>

            {/* Technical Specs Accents */}
            <div className="absolute top-40 left-10 z-30 hidden lg:block font-mono text-[10px] text-black/40 space-y-2 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-black/10" />
                    <span>ORIGIN: GLOBAL_FULFILLMENT_HUB</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-black/10" />
                    <span>SPEC: ISO 9001-2015</span>
                </div>
            </div>

            <div className="absolute top-40 right-10 z-30 hidden lg:block font-mono text-[10px] text-black/40 space-y-2 uppercase tracking-[0.2em] text-right">
                <div className="flex items-center justify-end gap-2">
                    <span>SECTOR: INDUSTRIAL_PACKAGING</span>
                    <span className="w-8 h-[1px] bg-black/10" />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <span>VER: 2024.v1.02</span>
                    <span className="w-8 h-[1px] bg-black/10" />
                </div>
            </div>

            <div className="absolute bottom-40 left-10 z-30 hidden lg:block font-mono text-[10px] text-black/40 space-y-2 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-black/10" />
                    <span>ENGINEERED: BY_SCIENTISTS</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-black/10" />
                    <span>PLATFORM: V.2024_HYBRID</span>
                </div>
            </div>

            <div className="absolute bottom-40 right-10 z-30 hidden lg:block font-mono text-[10px] text-black/40 space-y-2 uppercase tracking-[0.2em] text-right">
                <div className="flex items-center justify-end gap-2">
                    <span>COMPLIANCE: REACH_ROHS</span>
                    <span className="w-8 h-[1px] bg-black/10" />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <span>CAPACITY: 45+_COUNTRIES</span>
                    <span className="w-8 h-[1px] bg-black/10" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 pt-12">
                <div className="max-w-7xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side: Headline */}
                        <div className="lg:col-span-8 text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-8"
                            >
                                <span className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-black/40">
                                    <Box size={14} className="text-primary" /> FILLEZY SYSTEMS
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl font-black tracking-tighter text-black sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.8] uppercase flex flex-col"
                            >
                                <span>Smart</span>
                                <span className="">Packaging.</span>
                                <div className="mt-6 flex flex-col gap-2">
                                    <span className="text-xl sm:text-2xl font-mono font-bold tracking-[0.2em] text-black/40 uppercase">
                                        [ 100%_DAMAGE_PREVENTION ]
                                    </span>
                                    <span className="text-primary italic font-serif font-light lowercase tracking-normal text-4xl sm:text-5xl">
                                        Knowledge-Based Protection.
                                    </span>
                                </div>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="mt-8 max-w-xl text-lg font-bold leading-relaxed text-black/80"
                            >
                                Vertically integrated manufacturing of high-precision air and paper cushioning systems. Designed by engineers to eliminate transit damage and optimize global fulfillment.
                            </motion.p>
                        </div>

                        {/* Right Side: Features & CTA */}
                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center lg:text-right gap-12 pt-12">
                            <div className="space-y-8">
                                {[
                                    { icon: Zap, text: "On-Demand Production", label: "0.1 SEC START" },
                                    { icon: Compass, text: "Global Compliance", label: "ISO CERTIFIED" }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        whileHover={{ scale: 1.05, x: -5 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                        key={item.text}
                                        className="flex items-center lg:justify-end gap-6 group cursor-pointer"
                                    >
                                        <div className="hidden lg:block">
                                            <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">{item.label}</p>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-black/80">{item.text}</h4>
                                        </div>
                                        <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg transition-transform group-hover:bg-primary group-hover:rotate-6">
                                            <item.icon size={20} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Link
                                        href="/solutions"
                                        className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-2xl bg-primary px-10 py-6 text-xs font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/30"
                                    >
                                        Explore Solutions <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <button
                                        onClick={() => openContactModal("QUOTATION")}
                                        className="group flex items-center justify-center gap-4 rounded-2xl border-2 border-black/10 bg-white px-10 py-6 text-xs font-black uppercase tracking-[0.3em] text-black hover:bg-black hover:text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
                                    >
                                        Talk to an Expert
                                    </button>
                                    <button
                                        onClick={() => openContactModal("CATALOGUE")}
                                        className="group flex items-center justify-center gap-4 rounded-2xl border-2 border-primary/20 bg-primary/5 px-10 py-6 text-xs font-black uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm whitespace-nowrap"
                                    >
                                        Download Catalogue
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                />
            </div>

            {/* Centered Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
            >
                <div className="relative w-[1px] h-16 bg-black/10 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-primary"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest text-black/40">EXPLORE SYSTEM</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowRight className="rotate-90 text-primary w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
