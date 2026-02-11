"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { Leaf, Award, Recycle, Layers } from "lucide-react";
import CategoryHero from "@/components/CategoryHero";

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
                <CategoryHero
                    title="Advanced"
                    subtitle="Consumables."
                    description="From certified compostable films to heavy-duty kraft paper. Engineered for maximum protection with minimal environmental impact."
                    badgeText="PROTOCOL_DEPLOYED // MATERIALS"
                    icon={<Layers className="text-primary" size={24} />}
                />

                {/* Certifications Bar */}
                <section className="py-12 border-b border-foreground/5 bg-background">
                    <div className="mx-auto max-w-7xl px-5 lg:px-6 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* This would be logos in real app, text for now */}
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Award size={16} /> FSC Certified</div>
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Recycle size={16} /> CPCB Approved</div>
                        <div className="flex items-center gap-2 font-bold text-foreground/40 uppercase tracking-widest"><Leaf size={16} /> EN 13432</div>
                    </div>
                </section>

                {/* Materials Grid */}
                <section className="py-24 px-5 lg:px-8 bg-background">
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
