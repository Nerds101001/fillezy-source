"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, ShieldCheck, Check, MessageSquare, Download, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

interface MaterialProps {
    id: string; // Added ID
    title: string;
    description: string;
    image: string;
    type: "Bio" | "Paper" | "Film" | "Hybrid";
    features: string[];
    badges: string[];
}

export default function MaterialCard({ material, index }: { material: MaterialProps; index: number }) {
    const isEco = material.type === "Bio" || material.type === "Paper";
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] glass border border-foreground/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl"
        >
            <div className="aspect-video md:aspect-square relative overflow-hidden bg-foreground/5">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    className="object-cover mix-blend-multiply dark:mix-blend-overlay opacity-80 transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {material.badges.map(badge => (
                        <span key={badge} className="inline-flex items-center px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-foreground/10 text-[10px] font-bold uppercase tracking-widest text-foreground">
                            {badge}
                        </span>
                    ))}
                </div>

                {isEco && (
                    <div className="absolute top-6 right-6 z-20">
                        <div className="p-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 backdrop-blur-md">
                            <Leaf size={16} />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-3">
                    {material.title}
                </h3>
                <p className="text-foreground/60 font-light text-sm leading-relaxed mb-6">
                    {material.description}
                </p>

                <div className="space-y-2 mb-8">
                    {material.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-xs font-bold text-foreground/50 uppercase tracking-wider">
                            <Check size={12} className="text-primary" />
                            {feature}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/products/${material.id}`}
                        className="flex items-center justify-center gap-3 py-3 rounded-xl bg-primary text-white font-mono font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-black transition-all"
                    >
                        VIEW_DATA_SHEET
                        <ArrowUpRight size={14} />
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black/5 text-foreground/60 border border-black/5 hover:bg-black hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                        >
                            <MessageSquare size={13} />
                            QUOTE
                        </button>
                        <button
                            onClick={() => openContactModal("SPEC_SHEET")}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black/5 text-foreground/60 border border-black/5 hover:bg-black hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                        >
                            <Download size={13} />
                            SPECS
                        </button>
                    </div>
                </div>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                    initialProductId={material.id}
                />
            </div>
        </motion.div>
    );
}
