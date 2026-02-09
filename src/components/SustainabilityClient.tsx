"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Leaf, Recycle, Wind, Droplets, ShieldCheck, Factory, Globe, ArrowDown, CheckCircle2, Zap } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const metrics = [
    { label: "CO2_REDUCTION", value: "40%", icon: Wind, id: "ENV-01" },
    { label: "BIO_DEGRADABLE", value: "100%", icon: Leaf, id: "ENV-02" },
    { label: "RECYCLED_CONTENT", value: "85%", icon: Recycle, id: "ENV-03" },
    { label: "WATER_OPTIMIZED", value: "2M+", icon: Droplets, id: "ENV-04" },
];

const certifications = [
    { name: "ISO 14001:2015", issuer: "Environmental Management", icon: ShieldCheck },
    { name: "ASTM D6400", issuer: "Compostability Standard", icon: Leaf },
    { name: "EN 13432", issuer: "European Biodegradability", icon: Globe },
    { name: "PCB Approved", issuer: "Pollution Control Board", icon: Factory },
];

export default function SustainabilityClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <div ref={containerRef} className="bg-white min-h-screen selection:bg-eco selection:text-white">
            <Header />

            <main>
                {/* HERO SECTION */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F4F4F5]">
                    {/* Background Visuals */}
                    <motion.div style={{ y }} className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white z-10" />
                        <div className="absolute inset-0 dots-pattern opacity-20" />
                        <img
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"
                            className="w-full h-full object-cover grayscale brightness-110 opacity-70 mix-blend-multiply"
                            alt="Nature Industrial Overlay"
                        />
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-eco/10 border border-eco/20 mb-4">
                                <Leaf size={12} className="text-eco animate-pulse" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-eco">PROTOCOL: ZERO_WASTE_V1</span>
                            </div>

                            <h1 className="text-7xl lg:text-[120px] font-black tracking-tighter text-black leading-[0.8] uppercase">
                                Smart <br />
                                <span className="text-eco italic font-serif font-light lowercase">Protection.</span> <br />
                                Zero Waste.
                            </h1>

                            <div className="flex flex-col items-center gap-12 pt-12">
                                <p className="text-xl text-black/60 font-medium max-w-2xl leading-relaxed">
                                    Engineering the next generation of industrial packaging. We replace plastic with plant-based automation to secure the world's products and the planet's future.
                                </p>

                                <div className="animate-bounce">
                                    <ArrowDown className="text-black/20" size={32} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Corner Technical Accents */}
                    <div className="absolute bottom-12 left-12 font-mono text-[9px] text-black/30 space-y-2 uppercase tracking-widest hidden lg:block">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-black/10" />
                            <span>LAT: SYST_ENVIRONMENTAL</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-black/10" />
                            <span>LONG: 100%_RECYCLABLE</span>
                        </div>
                    </div>
                </section>

                {/* THE CORE VISION - BENTO STYLE */}
                <section className="py-32 px-6 bg-white border-t border-black/5">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
                            <div className="lg:col-span-8">
                                <span className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-black/40 mb-8 block">VISIONARY_CORE</span>
                                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                    We don't just package. <br />
                                    We <span className="text-eco italic font-serif font-light lowercase">Restore.</span>
                                </h2>
                            </div>
                            <div className="lg:col-span-4">
                                <p className="text-lg text-black/60 font-medium leading-relaxed">
                                    Our industrial-grade paper systems provide exact-fit cushioning, eliminating the need for excessive plastic fillers.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-[#FAFAFA] border border-black/5 group hover:border-eco/30 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm border border-black/5 group-hover:bg-eco group-hover:text-white transition-all">
                                        <m.icon size={20} />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-mono font-black text-black/30 uppercase tracking-widest">{m.label}</span>
                                        <div className="text-4xl font-black text-black tracking-tight">{m.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* BIO-AER SPOTLIGHT */}
                <section className="py-32 px-6 bg-black relative overflow-hidden">
                    <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-eco/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />

                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
                            <div className="space-y-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md border border-white/10">
                                    <Zap size={14} className="text-eco" />
                                    <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest">TECHNOLOGY_BREAKTHROUGH</span>
                                </div>
                                <h3 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                    Bio-Aer <br />
                                    <span className="text-eco italic">Protocol</span>
                                </h3>
                                <div className="space-y-6 text-xl text-white/70 leading-relaxed font-medium">
                                    <p>
                                        Our flagship Bio-Aer material is derived from plant polymers, making it 100% house-compostable. It performs with the same lightweight velocity as plastic air pillows but returns to the earth in weeks.
                                    </p>
                                    <ul className="space-y-4">
                                        {["Naturally Decomposing", "Plant-Based Resin", "Marine Safe Validation", "Industrial Strength Performance"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm text-white">
                                                <CheckCircle2 size={18} className="text-eco" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-16 lg:mt-0 relative">
                                <div className="aspect-square rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative group">
                                    <img
                                        src="/product/Bio-Aer.webp"
                                        className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                        alt="Bio-Aer Product"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-10 left-10">
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] block mb-2">PRODUCT_ID: BIO_X1</span>
                                        <div className="text-2xl font-black text-white uppercase">COMPOSTABLE_PILOW_v1</div>
                                    </div>
                                </div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-eco/20 rounded-full blur-3xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* QUALITY & CERTIFICATIONS */}
                <section className="py-32 px-6 bg-[#FAFAFA]">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-24">
                            <span className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-black/40 mb-6 block">TRUSTED_STANDARDS</span>
                            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight">
                                Global <span className="text-eco italic font-serif font-light">Compliance.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {certifications.map((cert, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-white border border-black/5 hover:border-eco/30 transition-all group">
                                    <div className="w-16 h-16 rounded-[2rem] bg-black text-white flex items-center justify-center mb-8 group-hover:bg-eco transition-colors">
                                        <cert.icon size={28} />
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-tight mb-2">{cert.name}</h4>
                                    <p className="text-[11px] font-mono font-bold text-black/40 uppercase tracking-widest leading-relaxed">
                                        {cert.issuer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-32 bg-eco text-white relative overflow-hidden">
                    <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
                    <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
                            Switch to <br />
                            <span className="text-black italic font-serif font-light lowercase">Circular</span> Packaging.
                        </h2>
                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-eco font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-black hover:text-white transition-all shadow-2xl"
                        >
                            Request Sustainability Audit
                            <ArrowDown className="-rotate-90" size={18} />
                        </button>
                    </div>
                </section>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                />
            </main>

            <Footer />
        </div>
    );
}
