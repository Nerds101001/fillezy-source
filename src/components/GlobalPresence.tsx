"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Globe, Compass, Navigation, Radio } from "lucide-react";

const locations = [
    {
        city: "Headquarters",
        country: "Global",
        type: "CORP_HQ",
        coords: "28.7041° N, 77.1025° E",
        id: "NODE-01",
        info: "Corporate headquarters and strategic operations centers in India and USA.",
        metric: "EST. 40YRS",
        delay: 0.1
    },
    {
        city: "Manufacturing",
        country: "Global",
        type: "PROD_HUB",
        coords: "9_PLUS_PLANTS_INDIA",
        id: "NODE-02",
        info: "9+ Manufacturing plants across India supporting global supply chains.",
        metric: "1250+ TEAM",
        delay: 0.2
    },
    {
        city: "Partner Network",
        country: "45+ Countries",
        type: "TECH_SUPPORT",
        coords: "GLOBAL_SCOPE",
        id: "NODE-03",
        info: "Specialized partners supporting customers across 45+ countries.",
        metric: "24/7 SUPPORT",
        delay: 0.3
    }
];

export default function GlobalPresence() {
    return (
        <section className="relative py-6 md:py-32 bg-[#0B0F14] overflow-hidden technical-grid industrial-dark-section">
            {/* Architectural Grid Line */}
            <div className="absolute top-0 right-1/4 w-px h-full bg-primary/10 pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-primary/10 pointer-events-none" />

            {/* Technical Labels */}
            <div className="absolute top-12 left-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.1em] md:tracking-[0.4em] hidden lg:block whitespace-nowrap">
                GLOBAL_OPERATIONS_HUB [ LAT: 28.61, LONG: 77.23 ]
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-24 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[11px] font-mono text-white/40 font-black uppercase tracking-[0.1em] md:tracking-[0.5em] mb-4 md:mb-8 whitespace-nowrap"
                        >
                            <span className="h-px w-8 bg-primary" />
                            NETWORK_INFRASTRUCTURE
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none lg:leading-[0.85]"
                        >
                            Manufacturing & <br /> <span className="text-primary italic font-serif font-light lowercase">Partner Network</span>
                        </motion.h2>
                        <p className="text-lg md:text-xl text-white/80 font-medium uppercase tracking-widest mt-4">
                            Vertically integrated manufacturing supported by a global partner ecosystem.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 self-start font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] pt-4">
                        <div className="flex items-center gap-2">
                            <Radio size={12} className="text-primary" />
                            LIVE_SIGNAL: ACTIVE
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-px w-6 bg-white/10" />
                            9+ manufacturing plants · 1250+ team members · 24×7 support
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {locations.map((loc) => (
                        <Link href="/contact" key={loc.id} className="block group h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: loc.delay, ease: [0.16, 1, 0.3, 1] }}
                                className="relative p-10 rounded-[2.5rem] bg-[#0B0F14] border border-white/10 group-hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/40 h-full flex flex-col"
                            >
                                {/* Structural Header */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-4 rounded-2xl bg-white text-[#0B0F14] group-hover:bg-primary group-hover:text-white transition-all">
                                        <MapPin size={22} className="opacity-100" />
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] font-mono text-white/40 font-black tracking-tighter uppercase">{loc.id}</span>
                                        <span className="block text-[9px] font-mono text-primary font-black uppercase tracking-widest mt-1">{loc.type}</span>
                                    </div>
                                </div>

                                <div className="relative z-10 mb-12">
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{loc.city}</h3>
                                    <p className="text-[11px] text-white/30 font-black tracking-[0.4em] uppercase">{loc.country}</p>
                                </div>

                                <p className="text-white/60 font-bold leading-relaxed text-base mb-12 flex-grow whitespace-pre-line">
                                    {loc.info}
                                </p>

                                <div className="pt-8 border-t border-white/10 space-y-4 mt-auto">
                                    <div className="flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Compass size={14} className="text-primary" />
                                            <span>{loc.coords}</span>
                                        </div>
                                        <span className="text-white/20 group-hover:text-primary/40">{loc.metric}</span>
                                    </div>
                                </div>

                                {/* Background Overlay */}
                                <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000 rotate-12">
                                    <Navigation size={200} className="text-white" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
