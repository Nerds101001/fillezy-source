"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Settings, Layers, Box, ChevronRight } from "lucide-react";

const solutions = [
    {
        title: "Machines",
        description: "Industrial-grade air cushion systems. Engineered for speed, reliability, and seamless integration.",
        icon: Settings,
        href: "/machines",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/2.png",
        features: ["Rapid Production", "IoT Enabled", "Low Maintenance"]
    },
    {
        title: "Materials",
        description: "High-performance consumables. From bio-degradable films to shock-absorbing paper pads.",
        icon: Layers,
        href: "/materials",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png",
        features: ["Bio-AER Technology", "FSC Certified Paper", "Zero Plastic Options"]
    },
    {
        title: "Integrations",
        description: "Workflow optimization. Overhead bins, winders, and conveyor systems for ergonomic packing.",
        icon: Box,
        href: "/integrations",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/3.png",
        features: ["Custom Layouts", "Overhead Storage", "Automated Delivery"]
    }
];

export default function SolutionsClient() {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden grain border-b border-foreground/5">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block py-2 px-4 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                                End-to-End Ecosystem
                            </span>
                            <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl mb-8 leading-[0.9]">
                                Engineered <br />
                                <span className="text-foreground/80">Packaging</span> <span className="text-primary italic font-serif font-light">Solutions.</span>
                            </h1>
                            <p className="text-xl text-foreground/60 font-light leading-relaxed max-w-2xl">
                                A comprehensive suite of machines, materials, and integrations designed to optimize your fulfillment workflow from the ground up.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-24 bg-background relative">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            {solutions.map((solution, index) => (
                                <motion.div
                                    key={solution.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex flex-col justify-between h-[600px] overflow-hidden rounded-[2.5rem] bg-foreground/5 border border-foreground/5 glass hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* Background Image / Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10" />
                                    <img
                                        src={solution.image}
                                        alt={solution.title}
                                        className="absolute inset-0 h-3/4 w-full object-cover opacity-60 mix-blend-multiply dark:mix-blend-overlay transition-transform duration-700 group-hover:scale-110 grayscale"
                                    />

                                    {/* Icon Top */}
                                    <div className="relative z-20 p-8">
                                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-md text-primary shadow-lg border border-foreground/5">
                                            <solution.icon size={28} />
                                        </div>
                                    </div>

                                    {/* Content Bottom */}
                                    <div className="relative z-20 p-8 pt-0 mt-auto">
                                        <h3 className="text-3xl font-bold uppercase tracking-widest text-foreground mb-4">
                                            {solution.title}
                                        </h3>
                                        <p className="text-foreground/70 font-light leading-relaxed mb-8">
                                            {solution.description}
                                        </p>

                                        <ul className="space-y-2 mb-8 border-l-2 border-primary/20 pl-4">
                                            {solution.features.map(feature => (
                                                <li key={feature} className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={solution.href}
                                            className="group/btn inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-primary hover:text-white"
                                        >
                                            Explore {solution.title}
                                            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
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
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all"
                        >
                            Consult an Expert <ChevronRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
