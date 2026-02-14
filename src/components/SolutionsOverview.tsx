"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Box, Settings, Layers, Download, FileText } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";

const solutions = [
    {
        id: "SYS-M01",
        title: "Machines",
        description: "Industrial-grade air cushion systems. Engineered for speed, reliability, and seamless integration.",
        features: ["Rapid Production", "IoT Enabled", "Low Maintenance"],
        cta: "Explore Machines",
        icon: Settings,
        href: "/solutions#machines",
        image: "/product/Machines.webp"
    },
    {
        id: "MAT-C02",
        title: "Consumables",
        description: "High-performance consumables. From bio-degradable films to shock-absorbing paper pads.",
        features: ["Bio-AER Technology", "FSC Certified Paper", "Zero Plastic Option"],
        cta: "View Consumables",
        icon: Layers,
        href: "/materials",
        image: "/product/Cushion.webp"
    },
    {
        id: "INT-X03",
        title: "Integrations",
        description: "Custom-engineered packing line integrations. Designed for ergonomic efficiency and high-volume throughput.",
        features: ["Air Pipe Systems", "Overhead Bins", "Conveyor Hubs"],
        cta: "View Integrations",
        icon: Box,
        href: "/integrations",
        image: "/product/Integrations.webp"
    }
];

export default function SolutionsOverview() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("CATALOGUE");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <section className="py-6 sm:py-24 bg-[#FAFAFA] relative overflow-hidden technical-grid hexa-pattern paper-grain">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[9px] md:text-[11px] font-mono text-black/40 font-black uppercase tracking-[0.1em] md:tracking-[0.5em] mb-2 md:mb-4 whitespace-nowrap"
                        >
                            [ ECOSYSTEM_ENGINEERING ]
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black uppercase leading-[0.9]">
                            End-to-End <br />
                            <span className="text-primary italic font-serif font-light lowercase">Packaging Ecosystem.</span>
                        </h2>
                    </div>
                    <p className="text-lg md:text-xl text-black/80 font-medium max-w-md">
                        Machines, materials, and integrations designed to work together.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                    {solutions.map((solution, index) => {
                        return (
                            <SolutionCard key={solution.title} solution={solution} index={index} />
                        );
                    })}
                </div>

                {/* Catalogue CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 relative overflow-hidden rounded-[3rem] bg-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 group"
                >
                    <div className="absolute inset-0 opacity-[0.03] technical-grid pointer-events-none" />
                    <div className="relative z-10 max-w-2xl text-center lg:text-left">
                        <div className="text-[9px] md:text-[10px] font-mono text-primary font-black uppercase tracking-[0.1em] md:tracking-[0.5em] mb-2 md:mb-4 whitespace-nowrap">
                            [ CATALOGUE_V2024_RELEASE ]
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                            Global Solutions. <br />
                            <span className="text-white/40">In One Master Catalogue.</span>
                        </h3>
                        <p className="text-white/60 font-medium">
                            Comprehensive technical data for all machines, consumables, and custom integrations.
                            Available for immediate delivery to your inbox.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('OPEN_CONTACT_MODAL', {
                                    detail: {
                                        mode: 'CATALOGUE',
                                        fileUrl: '/Fillezy-Catalogue-Final.pdf'
                                    }
                                }));
                            }}
                            className="group/btn relative inline-flex items-center gap-4 px-10 py-6 bg-white text-foreground font-black text-xs uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        >
                            <Download size={18} className="text-primary group-hover/btn:translate-y-1 transition-transform" />
                            Get Full 2024 Catalogue
                        </button>
                    </div>

                    {/* Industrial Visual Element */}
                    <div className="absolute -right-20 -bottom-20 opacity-10 rotate-12 scale-150 transition-transform group-hover:rotate-0 duration-700">
                        <FileText size={400} />
                    </div>
                </motion.div>
            </div>
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                initialMode={contactMode}
            />
        </section>
    );
}

function SolutionCard({ solution, index }: { solution: any, index: number }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-[580px] overflow-hidden rounded-[2.5rem] bg-white border border-black/10 flex flex-col transition-all hover:shadow-2xl hover:shadow-black/5"
        >
            {/* Technical Header */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-30 pointer-events-none">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-black/60 font-black tracking-widest uppercase">ID: {solution.id}</span>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-background border border-black/10 text-black/60 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                    <solution.icon size={18} className="opacity-100" />
                </div>
            </div>

            {/* Glow Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,107,0,0.06), transparent 50%)`,
                }}
            />

            {/* Image Layer */}
            <div className="relative h-2/3 w-full overflow-hidden p-4">
                <div className="h-full w-full rounded-[2rem] overflow-hidden bg-black/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10" />
                    <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 shadow-inner"
                    />
                </div>
            </div>

            {/* Content Layer */}
            <div className="px-8 pb-8 flex flex-col flex-grow justify-end relative z-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-black mb-2">
                    {solution.title}
                </h3>
                <p className="text-black/60 font-medium leading-relaxed mb-4 text-xs">
                    {solution.description}
                </p>

                {/* Feature List */}
                <div className="flex flex-col gap-1.5 mb-6 border-l border-primary/20 pl-4">
                    {solution.features.map((feature: string) => (
                        <div key={feature} className="text-[9px] font-mono text-black/40 font-black uppercase tracking-widest">
                            {feature}
                        </div>
                    ))}
                </div>

                <Link
                    href={solution.href}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-primary transition-all group/link"
                >
                    {solution.cta} <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-2" />
                </Link>
            </div>

            {/* Structural Marker */}
            <div className="absolute bottom-10 right-10 z-30 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity">
                <div className="font-mono text-[60px] font-black tracking-tighter leading-none select-none text-black/20">
                    0{index + 1}
                </div>
            </div>
        </motion.div>
    );
}
