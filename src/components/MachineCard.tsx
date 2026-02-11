"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Check, MessageSquare } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

interface MachineProps {
    id: string;
    title: string;
    description: string;
    image: string;
    specs: { label: string; value: string }[];
    features: string[];
}

export default function MachineCard({ machine, index }: { machine: MachineProps; index: number }) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[3rem] bg-white dark:bg-[#1A1C1E] border border-foreground/5 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[400px] lg:h-full bg-foreground/5 overflow-hidden">
                    <Image
                        src={machine.image}
                        alt={machine.title}
                        fill
                        className="object-contain p-12 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-overlay opacity-90"
                    />
                    <div className="absolute top-8 left-8">
                        <span className="px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-foreground/10 text-[10px] font-bold uppercase tracking-widest text-primary">
                            Series {index + 1}00
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                            {machine.title}
                        </h3>
                        <p className="text-foreground/60 font-light leading-relaxed mb-8">
                            {machine.description}
                        </p>

                        {/* Specs Table */}
                        <div className="mb-8 overflow-hidden rounded-xl border border-foreground/5">
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-foreground/5 bg-foreground/[0.02]">
                                    {machine.specs.map((spec) => (
                                        <tr key={spec.label}>
                                            <td className="px-4 py-3 font-bold text-foreground/40 uppercase tracking-wider text-[10px]">
                                                {spec.label}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-foreground text-right font-medium">
                                                {spec.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Features List */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                            {machine.features.map(feature => (
                                <div key={feature} className="flex items-center gap-2 text-xs font-bold text-foreground/70 uppercase tracking-wider">
                                    <Check size={12} className="text-primary" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-foreground/5 mt-auto">
                        <Link
                            href={`/products/${machine.id}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-all hover:bg-primary hover:text-white"
                        >
                            View Details <ArrowRight size={14} />
                        </Link>
                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/5"
                        >
                            Get Quote <MessageSquare size={14} />
                        </button>
                        <button
                            onClick={() => openContactModal("SPEC_SHEET")}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/5"
                        >
                            Spec Sheet <Download size={14} />
                        </button>
                    </div>

                    <ContactModal
                        isOpen={isContactModalOpen}
                        onClose={() => setIsContactModalOpen(false)}
                        initialMode={contactMode}
                        initialProductId={machine.id}
                    />
                </div>
            </div>
        </motion.div>
    );
}
