"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MachineCard from "@/components/MachineCard";
import { motion } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

import { machines } from "../data/machines";

export default function MachinesClient() {
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
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl mb-6 uppercase"
                        >
                            Precision <span className="text-primary italic font-serif font-light">Machinery.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/60 font-light max-w-2xl mx-auto"
                        >
                            High-velocity void fill systems engineered for the modern warehouse.
                            Seamless integration, zero downtime.
                        </motion.p>
                    </div>
                </section>

                {/* Machines List */}
                <section className="py-24 px-6">
                    <div className="mx-auto max-w-7xl space-y-12">
                        {machines.map((machine, index) => (
                            <MachineCard key={machine.id} machine={machine} index={index} />
                        ))}
                    </div>
                </section>

                {/* Brochure Download CTA */}
                <section className="py-20 bg-foreground text-background">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <h2 className="text-3xl font-bold uppercase tracking-wide mb-8">Detailed Specifications</h2>
                        <button
                            onClick={() => openContactModal("SPEC_SHEET")}
                            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-colors"
                        >
                            Download Product Catalogue <Download size={16} />
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
