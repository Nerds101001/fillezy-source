"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndustryCard from "@/components/IndustryCard";
import { motion } from "framer-motion";
import { Factory } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const industries = [
    {
        title: "E-Commerce",
        challenge: "High Velocity Fulfillment",
        solution: "Automated void fill systems that keep pace with peak season throughput while minimizing returns due to damage.",
        image: "/product/Fillezy Rapid.webp",
        products: ["Fillezy Rapid", "Bio-AER"]
    },
    {
        title: "Automotive",
        challenge: "Heavy Component Protection",
        solution: "High-density kraft paper padding designed to immobilize heavy parts and prevent metal-on-metal contact.",
        image: "/product/Fillezy-Hexa-Paper.webp",
        products: ["Paper Wave", "Heavy Duty Film"]
    },
    {
        title: "Pharmaceuticals",
        challenge: "Temperature & Hygiene",
        solution: "Clean-room compatible films and thermal insulating options for sensitive medical shipments.",
        image: "/product/Bio-Aer.webp",
        products: ["Clean-Tech Film", "Bio-AER"]
    },
    {
        title: "Electronics",
        challenge: "Static Discharge (ESD)",
        solution: "Specialized anti-static films that dissipate electrical charges to protect sensitive circuit boards.",
        image: "/product/Fillezy Air QUilts.webp",
        products: ["ESD Film", "Air Sacs"]
    },
    {
        title: "FMCG / Retail",
        challenge: "Brand Experience",
        solution: "Aesthetically pleasing Hexa-Paper and Bio-AER solutions for a premium unboxing experience.",
        image: "/product/Fillezy Hexa Papers.webp",
        products: ["Hexa-Paper", "Bio-AER"]
    },
    {
        title: "Industrial Manufacturing",
        challenge: "Rugged Durability",
        solution: "Extreme-duty films and paper systems for securing machinery and loose parts during transit.",
        image: "/product/Fillezy-Kraft-Dunnage-Bags.webp",
        products: ["Paper Smart", "HD Film"]
    }
];

export default function IndustriesClient() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest mb-6"
                        >
                            <Factory size={14} /> Sector-Specific Intelligence
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl mb-6 uppercase leading-[0.9]"
                        >
                            Tailored <span className="text-primary italic font-serif font-light">Solutions.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/60 font-light max-w-2xl mx-auto"
                        >
                            Every industry has unique packaging demands. We engineer specific protocols to meet the velocity, protection, and sustainability standards of your sector.
                        </motion.p>
                    </div>
                </section>

                {/* Industries Grid */}
                <section className="py-24 px-6 bg-background">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industries.map((industry, index) => (
                                <IndustryCard key={industry.title} industry={industry} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-24 bg-foreground tex-background relative overflow-hidden">
                    <div className="absolute inset-0 bg-foreground grain opacity-100 z-0"></div>
                    <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
                        <h2 className="text-3xl font-black text-background sm:text-5xl mb-6">
                            Don't see your industry?
                        </h2>
                        <p className="text-background/60 text-lg mb-10 font-light">
                            Our engineers thrive on custom challenges. Contact us to design a bespoke packaging protocol for your specific product line.
                        </p>
                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="inline-block rounded-full bg-primary px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-colors"
                        >
                            Request Custom Analysis
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
