"use client";

import { motion } from "framer-motion";
import { Gauge, TrendingDown, ShieldCheck, Activity } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const stats = [
    {
        label: "90% Space Optimization",
        value: "90%",
        id: "PRD-SPC",
        icon: TrendingDown,
        description: "On-demand production eliminates the need for bulky air bubble storage."
    },
    {
        label: "Vertically Integrated",
        value: "END-2-END",
        id: "PRD-INT",
        icon: Activity,
        description: "We manufacture everything from resins to high-speed machines."
    },
    {
        label: "100% Damage Prevention",
        value: "100%",
        id: "PRD-PRO",
        icon: ShieldCheck,
        description: "Engineered cushioning designed for zero transit-related damages."
    },
    {
        label: "Global Compliance",
        value: "REACH/RoHS",
        id: "PRD-STD",
        icon: Gauge,
        description: "All materials are REACH, RoHS, and Biodegradability certified."
    },
];

export default function WhyFillezy() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <section className="py-20 bg-[#0B0F14] relative overflow-hidden technical-grid industrial-dark-section">
            {/* Blueprint Grid Accents */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.1]">
                <div className="absolute top-1/2 left-0 w-full h-px bg-primary" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-primary" />
                <div className="absolute top-20 left-20 w-4 h-4 border border-white/40" />
                <div className="absolute bottom-20 right-20 w-4 h-4 border border-white/40" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

                    {/* Left: Industrial Value Proposition */}
                    <div className="lg:col-span-5 pt-8 flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[11px] font-mono text-white/40 font-black uppercase tracking-[0.5em] mb-8"
                        >
                            [ WHY_ENTERPRISES_CHOOSE_FILLEZY ]
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl font-black tracking-tight text-white sm:text-7xl mb-10 uppercase leading-[0.85]"
                        >
                            Knowledge <br />
                            Engineered<br />
                            <span className="text-primary italic font-serif font-light lowercase">Protection.</span>
                        </motion.h2>
                        <p className="text-xl text-white/70 font-bold leading-relaxed mb-12 max-w-md">
                            Led by a core team of scientists and engineers, Fillezy provides application-specific protective solutions from our 9 global plants, serving 45+ countries with 100% damage prevention.
                        </p>

                        <div className="flex flex-col gap-6 mb-12">
                            {[
                                "Custom engineered by Scientists & Engineers",
                                "9 Manufacturing Plants / 45+ Countries",
                                "REACH, RoHS & Biodegradable Compliance"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/40"
                                >
                                    <span className="h-px w-6 bg-primary" />
                                    {text}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={() => openContactModal("QUOTATION")}
                                className="group flex items-center gap-4 px-10 py-6 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-primary-hover hover:scale-105 transition-all shadow-2xl shadow-primary/20"
                            >
                                Secure Your Supply Chain <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Metrics Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 gap-px bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-12 bg-[#0B0F14] hover:bg-white/[0.02] transition-colors relative flex flex-col justify-center"
                            >
                                {/* Metric Glow Corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 w-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-[10px] font-mono text-white/20 font-black uppercase tracking-[0.3em]">METRIC_{stat.id}</div>
                                        <stat.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white mb-4 tracking-tighter group-hover:text-primary transition-colors leading-none">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                                        {stat.label}
                                    </div>
                                    <p className="text-sm text-white/40 font-bold leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                />
            </div>
        </section>
    );
}
