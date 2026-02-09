"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntegrationCard from "@/components/IntegrationCard";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

const systems = [
    {
        title: "Fillezy® Jet Stream Overhead",
        description: "Automated overhead delivery system clearing 100% of packing station floor space. Increases throughput by up to 25%.",
        image: "/product/FIlezy Handling Systems.webp",
        benefit: "Ergonomics & Efficiency",
        id: "jet-stream"
    },
    {
        title: "Fillezy® Industrial Winders",
        description: "High-speed synchronized winding attachments that automate the collection of inflated cushions for off-line distribution.",
        image: "/product/FIlezy Handling Systems.webp",
        benefit: "Centralized Production",
        id: "winders"
    },
    {
        title: "Fillezy® Movable Bins",
        description: "Industrial modular bins with 360-degree mobility and magnetic locks for flexible mobile fulfillment stations.",
        image: "/product/FIlezy Handling Systems.webp",
        benefit: "Flexibility",
        id: "movable-bins"
    },
    {
        title: "Fillezy® Dunnage Solutions",
        description: "Kraft and Woven PP structural cargo stabilizing systems for extreme heavy-duty rail and sea container transport.",
        image: "/product/Dunnage Bags.webp",
        benefit: "Logistics Security",
        id: "dunnage-bags"
    }
];

export default function IntegrationsClient() {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative pt-40 pb-24 px-6 border-b border-foreground/5 bg-foreground/5 grain overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-0 opacity-10">
                        <Box size={400} strokeWidth={0.5} />
                    </div>

                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="max-w-3xl">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6"
                            >
                                Workflow Optimization
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl mb-8 uppercase leading-[0.9]"
                            >
                                Seamless <br />
                                <span className="text-foreground/40 stroke-text">Integration.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-foreground/60 font-light max-w-xl leading-relaxed"
                            >
                                Don't just add machines; upgrade your entire packaging infrastructure.
                                Our systems integrate physically and digitally into your current workflow.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Systems Grid */}
                <section className="py-24 px-6 bg-background">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {systems.map((system, index) => (
                                <IntegrationCard key={system.title} system={system} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Diagram Section Placeholder */}
                <section className="py-24 px-6 border-t border-foreground/5 bg-foreground/5">
                    <div className="mx-auto max-w-7xl text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-wide mb-12 text-foreground">Custom Engineering Services</h2>
                        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-[2rem] glass border border-foreground/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#1A1C1E_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                            <div className="text-center p-8">
                                <Box size={64} className="mx-auto mb-4 text-foreground/20" />
                                <h3 className="text-xl font-bold text-foreground">Warehouse Layout Optimization</h3>
                                <p className="text-foreground/60 mt-2">We design custom layouts to maximize throughput per sqft.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
