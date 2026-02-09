"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Leaf, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

const certifications = [
    {
        name: "ISO 9001:2015",
        logo: "/logo/ISO logo.png",
        description: "Quality Management Systems",
        delay: 0.1,
        visualScale: "scale-100"
    },
    {
        name: "Intertek Certified",
        logo: "/logo/Interteklogo.jpg",
        description: "Global Quality Assurance",
        delay: 0.2,
        visualScale: "scale-[1.1]"
    },
    {
        name: "CE Approved",
        logo: "/logo/ce logo.png",
        description: "European Safety Conformity",
        delay: 0.3,
        visualScale: "scale-90"
    },
    {
        name: "REACH Compliant",
        logo: "/logo/reach_compliant_logo.jpg",
        description: "Chemical Safety Standards",
        delay: 0.4,
        visualScale: "scale-[1.25]"
    },
    {
        name: "RoHS Compliant",
        logo: "https://www.rohsguide.com/images/rohs-logo.jpg",
        description: "Restriction of Hazardous Substances",
        delay: 0.5,
        visualScale: "scale-[1.15]"
    },
    {
        name: "CPCB Certified",
        logo: "/logo/cpcb_logo.png",
        description: "Pollution Control Compliance",
        delay: 0.6,
        visualScale: "scale-[1.5]"
    }
];

export default function CertificationsSection() {
    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden technical-grid dots-pattern">
            {/* Architectural Grid Line */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-black/5 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-20">
                    <div className="text-left max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-start gap-4 text-[11px] font-mono text-black/40 font-black uppercase tracking-[0.3em] mb-12"
                        >
                            <span className="h-px w-12 bg-primary" />
                            [ COMPLIANCE_FRAMEWORK ]
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-black tracking-tighter text-black sm:text-5xl md:text-6xl leading-none uppercase mb-6"
                        >
                            Certified. Compliant.
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col gap-4"
                        >
                            <span className="text-primary italic font-serif font-light lowercase tracking-normal text-3xl sm:text-4xl md:text-5xl leading-none">
                                Global Trusted standards.
                            </span>
                            <p className="text-lg text-black/60 font-bold leading-relaxed max-w-2xl mt-4">
                                Fillezy products undergo rigorous testing and comply with leading global environmental and manufacturing standards for high-precision fulfillment.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="shrink-0 pt-12 lg:pt-16"
                    >
                        <Link
                            href="/certifications"
                            className="group relative inline-flex items-center gap-4 px-10 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Technical Registry <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center py-12 px-6 rounded-3xl bg-white border border-black/5 shadow-xl relative group w-full">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ delay: cert.delay, type: "spring", stiffness: 300 }}
                            className="relative z-10 flex flex-col items-center gap-6 group/item w-full"
                        >
                            <div className="relative w-24 h-24 flex items-center justify-center p-3 rounded-xl bg-white shadow-sm transition-all group-hover/item:shadow-md ring-1 ring-black/5 overflow-hidden">
                                <img
                                    src={cert.logo}
                                    alt={cert.name}
                                    loading="lazy"
                                    className={`w-full h-full object-contain grayscale transition-all duration-500 group-hover/item:grayscale-0 group-hover/item:scale-110 mix-blend-multiply ${cert.visualScale}`}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement?.classList.add('flex-col');
                                        const fallback = document.createElement('div');
                                        fallback.className = 'text-[10px] font-black text-center text-black/40 uppercase tracking-tighter bg-black/5 p-2 rounded';
                                        fallback.innerText = cert.name;
                                        e.currentTarget.parentElement?.appendChild(fallback);
                                    }}
                                />
                                {/* Detail Tooltip/Reveal */}
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-44 text-center opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none z-20">
                                    <p className="text-[10px] font-mono text-white font-bold uppercase tracking-tighter whitespace-nowrap bg-black px-3 py-2 rounded-lg shadow-xl">
                                        {cert.description}
                                    </p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono font-black text-black/30 uppercase tracking-[0.2em] text-center">
                                {cert.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
