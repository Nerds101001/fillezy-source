"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Settings, Layers, Box, ChevronRight, Zap } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import CategoryHero from "@/components/CategoryHero";
import Image from "next/image";

const solutions = [
    {
        id: "SYS-M01",
        title: "Machines",
        description: "Industrial-grade air cushion systems. Engineered for speed, reliability, and seamless integration.",
        features: ["Rapid Production", "IoT Enabled", "Low Maintenance"],
        cta: "Explore Machines",
        icon: Settings,
        href: "/machines",
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

export default function SolutionsClient() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                <CategoryHero
                    title="Engineered"
                    subtitle="Solutions."
                    description="A comprehensive suite of machines, materials, and integrations designed to optimize your fulfillment workflow from the ground up."
                    badgeText="PROTOCOL_DEPLOYED // SOLUTIONS"
                    icon={<Zap className="text-primary" size={24} />}
                />

                {/* Categories Grid */}
                <section className="py-24 bg-[#FAFAFA] relative overflow-hidden technical-grid hexa-pattern paper-grain">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            {solutions.map((solution, index) => (
                                <SolutionCard key={solution.title} solution={solution} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-foreground/5 border-t border-foreground/5">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-black text-foreground sm:text-5xl mb-8">
                            Not sure what you need?
                        </h2>
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all"
                        >
                            Consult an Expert <ChevronRight size={16} />
                        </button>
                    </div>
                </section>
            </main>
            <Footer />

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                initialMode="QUOTATION"
            />
        </div>
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
                        className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 shadow-inner"
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
