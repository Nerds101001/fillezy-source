"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { motion } from "framer-motion";
import { Leaf, Award, Recycle } from "lucide-react";

// Mock Data
const materials = [
    {
        id: "bio-aer",
        title: "Bio-Aer Film",
        description: "100% Home compostable air cushion film made from potato starch. Decomposes naturally within 90 days.",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png",
        type: "Bio" as const,
        features: ["Home Compostable", "Marine Degradable", "Potato Starch Base"],
        badges: ["EN 13432", "OK Compost"]
    },
    {
        id: "air-quilts",
        title: "Paper Wave",
        description: "FSC certified kraft paper with superior shock absorption properties. ideal for heavy automotive parts.",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png", // Placeholder
        type: "Paper" as const,
        features: ["100% Recyclable", "High Compression Strength", "FSC Certified"],
        badges: ["FSC Mix", "Recyclable"]
    },
    {
        id: "air-cushion",
        title: "HD-Performance",
        description: "Heavy-duty HDPE film for extreme protection. Thin gauge, maximum strength technology.",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png",
        type: "Film" as const,
        features: ["98% Air / 2% Film", "Puncture Resistant", "Multilayer"],
        badges: ["Recyclable"]
    },
    {
        id: "air-tubes",
        title: "Anti-Static AER",
        description: "Specialized ESD protection for electronics and circuit boards. Dissipates static charge safely.",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png",
        type: "Film" as const,
        features: ["ESD Protection", "Pink Tint Identifier", "Surface Resistance"],
        badges: ["Electronics Safe"]
    },
    {
        id: "hexa-papers",
        title: "Hexa-Paper",
        description: "Honeycomb structured paper wrap that interlocks without tape. Aesthetic protection for cosmetics.",
        image: "https://www.fillezy.com/wp-content/uploads/2019/11/1-1.png",
        type: "Paper" as const,
        features: ["Self-Locking", "No Tape Needed", "Premium Unboxing"],
        badges: ["Plastic Free"]
    }
];

export default function MaterialsClient() {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative pt-40 pb-20 px-6 border-b border-foreground/5 bg-foreground/5 grain">
                    <div className="mx-auto max-w-7xl text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest mb-6"
                        >
                            <Leaf size={14} /> Sustainable Materials Technology
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl mb-6 uppercase"
                        >
                            Advanced <br className="hidden sm:block" />
                            <span className="text-primary italic font-serif font-light">Consumables.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/60 font-light max-w-2xl mx-auto"
                        >
                            From certified compostable films to heavy-duty kraft paper.
                            Engineered for maximum protection with minimal environmental impact.
                        </motion.p>
                    </div>
                </section>

                {/* Certifications Bar */}
                <section className="py-12 border-b border-foreground/5 bg-background">
                    <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* This would be logos in real app, text for now */}
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Award size={16} /> FSC Certified</div>
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Recycle size={16} /> CPCB Approved</div>
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Leaf size={16} /> EN 13432</div>
                    </div>
                </section>

                {/* Materials Grid */}
                <section className="py-24 px-6 bg-background">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {materials.map((material, index) => (
                                <MaterialCard key={material.id} material={material} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
