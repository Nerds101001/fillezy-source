"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const products = [
    {
        title: "Fillezy Films",
        tag: "High Performance",
        description: "Next-gen air cushion films with rapid-fill tech. Engineered for zero-leakage and maximum shock absorption.",
        image: "/product/Cushion.webp",
        link: "/products/films",
        colSpan: "lg:col-span-2 lg:row-span-2",
        icon: ShieldCheck,
        accent: "from-orange-500/20 to-transparent"
    },
    {
        title: "Fillezy Machines",
        tag: "Automation",
        description: "Industrial-grade sealing precision. Built for 24/7 high-volume throughput.",
        image: "/product/Paper Shark.webp",
        link: "/products/machines",
        colSpan: "lg:col-span-1 lg:row-span-1",
        icon: Zap,
        accent: "from-blue-500/20 to-transparent"
    },
    {
        title: "Custom Handling",
        tag: "Optimization",
        description: "Ergonomic conveyor and intake systems tailored to warehouse scale.",
        image: "/product/Paper 01.webp",
        link: "/products/handling",
        colSpan: "lg:col-span-1 lg:row-span-1",
        icon: Globe,
        accent: "from-green-500/20 to-transparent"
    },
    {
        title: "Rapid Production",
        tag: "Scalability",
        description: "Speed redefined. The most efficient void-fill system in the industrial market.",
        image: "/product/Paper Smart machine.webp",
        link: "/products/rapid",
        colSpan: "lg:col-span-2 lg:row-span-1",
        icon: Zap,
        accent: "from-purple-500/20 to-transparent"
    },
];

export default function ProductsSection() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <section className="relative bg-background py-32 grain overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                        >
                            Industrial Solutions
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-foreground font-sans"
                        >
                            The Bento of <br /><span className="text-primary italic font-light font-serif">Protection.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-foreground/60 text-lg max-w-sm leading-relaxed font-light"
                    >
                        Every product we manufacture is a promise of integrity. High-fidelity packaging for global industries.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-4 lg:grid-rows-2">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className={clsx(
                                "group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] glass border border-foreground/5 p-6 md:p-8 lg:p-12 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-primary/10 hover:-translate-y-2",
                                product.colSpan
                            )}
                        >
                            {/* Accent Glow */}
                            <div className={clsx(
                                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                product.accent
                            )} />

                            <div className="flex h-full flex-col justify-between relative z-10">
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-primary text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
                                            {product.tag}
                                        </span>
                                        <product.icon size={22} className="text-foreground/20 group-hover:text-primary transition-all duration-500 group-hover:rotate-12" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {product.title}
                                    </h3>
                                    <p className="mt-4 md:mt-6 text-foreground/50 font-light leading-relaxed group-hover:text-foreground/70 transition-colors text-sm md:text-base lg:text-lg">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="mt-12 flex items-center justify-between gap-4">
                                    <Link
                                        href={product.link}
                                        className="group/btn flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground"
                                    >
                                        Details
                                        <div className="w-10 h-[1px] bg-foreground/20 group-hover/btn:w-16 group-hover/btn:bg-primary transition-all duration-500" />
                                        <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover/btn:text-primary transition-colors" />
                                    </Link>
                                    <button
                                        onClick={() => openContactModal("QUOTATION")}
                                        className="px-6 py-3 rounded-xl bg-foreground text-background text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
                                    >
                                        Get Quote
                                    </button>
                                </div>
                            </div>

                            <Image
                                src={product.image}
                                alt={product.title}
                                width={600}
                                height={600}
                                className={clsx(
                                    "absolute bottom-0 right-0 w-3/4 object-contain opacity-20 transition-all duration-1000 ease-in-out",
                                    "group-hover:scale-105 group-hover:opacity-100 group-hover:-translate-x-8 group-hover:-translate-y-8 translate-x-12 translate-y-12",
                                    "filter drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] dark:brightness-110"
                                )}
                            />
                        </motion.div>
                    ))}
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
