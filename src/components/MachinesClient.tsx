"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MachineCard from "@/components/MachineCard";
import { Download, Zap } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";
import CategoryHero from "@/components/CategoryHero";
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
                <CategoryHero
                    title="Precision"
                    subtitle="Machinery."
                    description="High-velocity void fill systems engineered for the modern warehouse. Seamless integration, zero downtime."
                    badgeText="PROTOCOL_DEPLOYED // MACHINES"
                    icon={<Zap className="text-primary" size={24} />}
                />

                {/* Machines List */}
                <section className="py-24 px-5 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            {machines.map((machine, index) => (
                                <MachineCard key={machine.id} machine={machine} index={index} />
                            ))}
                        </div>
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
