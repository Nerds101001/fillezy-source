"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Recycle, Wind, Droplets, ArrowUpRight } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const metrics = [
    { label: "CO2_REDUCTION", value: "40%", icon: Wind, id: "ENV-01" },
    { label: "BIO_DEGRADABLE", value: "100%", icon: Leaf, id: "ENV-02" },
    { label: "RECYCLED_CONTENT", value: "85%", icon: Recycle, id: "ENV-03" },
    { label: "WATER_OPTIMIZED", value: "2M+", icon: Droplets, id: "ENV-04" },
];

export default function SustainabilitySection() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <section className="relative pt-6 pb-24 md:py-24 bg-[#FAFAFA] paper-grain kraft-texture dots-pattern overflow-hidden border-t border-black/10 torn-edge-bottom">
            {/* Architectural Grid Line */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-black/5 pointer-events-none" />

            {/* Organic Corn Motifs - Bio AER Context */}
            <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none overflow-hidden z-0 opacity-[0.03]">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="absolute rotate-12" style={{ top: `${10 + i * 30}%`, right: `-20px` }}>
                        <svg width="200" height="400" viewBox="0 0 100 200" fill="currentColor">
                            <path d="M50 200 C50 150 20 100 50 50 C80 100 50 150 50 200 M30 80 Q50 60 70 80 M40 100 Q50 85 60 100" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Side: Storytelling */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 md:gap-6 text-[9px] md:text-[11px] font-mono text-black/40 font-black uppercase tracking-[0.1em] md:tracking-[0.5em] mb-4 md:mb-12 whitespace-nowrap"
                        >
                            <span className="h-px w-6 md:w-10 bg-black/10" />
                            ECO_SYSTEM_ETHOS
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black tracking-tight text-white lg:text-black mb-6 md:mb-12 uppercase leading-none lg:leading-[0.85]"
                        >
                            Designed for Protection. <br />
                            <span className="text-eco italic font-serif font-light lowercase">Sustainability Built-in.</span>
                        </motion.h2>

                        <div className="flex flex-col md:flex-row gap-12 mb-20">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-black/80 text-lg md:text-xl font-medium leading-relaxed max-w-sm"
                            >
                                Fillezy offers paper-based, recyclable, and compostable cushioning solutions that reduce plastic usage while maintaining industrial-grade protection.
                            </motion.p>
                            <div className="flex flex-col gap-4 font-mono text-[9px] text-black/40 uppercase tracking-[0.2em] pt-2">
                                <div className="flex items-center gap-2 text-eco">
                                    <span className="h-px w-6 bg-black/10" />
                                    FSC_COMPLIANT: 2024.1
                                </div>
                                <div className="flex items-center gap-2 text-eco">
                                    <span className="h-px w-6 bg-black/10" />
                                    ASTM_D6400: CERTIFIED
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Paper-based cushioning systems" },
                                { title: "FSC compliant paper options" },
                                { title: "Plant-based Bio AER materials" },
                                { title: "Reduced transport footprint" }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-black/10 group hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-black uppercase tracking-tight text-black">{item.title}</h4>
                                        <ArrowUpRight size={16} className="text-black/20 group-hover:text-eco transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Imagery & Metrics */}
                    <div className="lg:col-span-5 pt-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative rounded-[3.5rem] overflow-hidden bg-black aspect-square shadow-2xl shadow-black/20 group border border-black/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                            <Image
                                src="/product/Cushion.webp"
                                alt="Bio Film Spec"
                                fill
                                className="object-cover grayscale opacity-60 transition-transform duration-1000 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                                <div className="flex justify-between items-start font-mono text-[10px] text-white/40">
                                    <span>SPEC_NAME: BIO_AER_V1</span>
                                    <span>[ EN 13432 ]</span>
                                </div>

                                <div className="group-hover:translate-y-[-5px] transition-transform">
                                    <div className="h-12 w-12 rounded-2xl bg-white text-eco flex items-center justify-center mb-6 shadow-lg">
                                        <Leaf size={24} />
                                    </div>
                                    <h4 className="text-3xl font-black text-white uppercase mb-4 leading-none">
                                        Bio AER Technology
                                    </h4>
                                    <p className="text-white/80 text-sm font-bold max-w-xs leading-relaxed">
                                        Plant-based cushioning material made from renewable sources, designed to decompose naturally after use.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-12 grid grid-cols-2 gap-6 border-l-2 border-primary/20 pl-8">
                            {metrics.map((m) => (
                                <div key={m.label} className="space-y-1">
                                    <div className="text-[9px] font-mono text-black/40 font-black uppercase tracking-widest">{m.label.replace('_', ' ')}</div>
                                    <div className="text-3xl font-black text-black leading-none">{m.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 mb-8 md:mb-0">
                            <button
                                onClick={() => openContactModal("QUOTATION")}
                                className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-primary transition-all shadow-xl group/btn"
                            >
                                REQUEST_AUDIT <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
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
