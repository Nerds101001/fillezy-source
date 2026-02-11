"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Download } from "lucide-react";
import BrandName from "./BrandName";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

interface ProductCardProps {
    id?: string;
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    techId?: string;
    category?: string;
}

export default function ProductCard({ id, title, description, imageSrc, href, techId, category }: ProductCardProps) {
    const isShark = id?.includes('shark') || title?.toLowerCase().includes('shark') || techId === 'SHK-M0';
    const isMachine = category === 'Machines' && !isShark;

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col bg-white border border-black/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.15)] h-full"
        >
            {/* Technical Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-black/20 group-hover:border-primary transition-colors z-10" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-black/20 group-hover:border-primary transition-colors z-10" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-black/20 group-hover:border-primary transition-colors z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-black/20 group-hover:border-primary transition-colors z-10" />

            {/* Visual Section */}
            <div className={`relative h-48 md:h-64 bg-[#F4F4F5] flex items-center justify-center transition-colors group-hover:bg-[#F0F0F0] ${isShark ? 'p-12 md:p-20' : (isMachine ? 'p-8 md:p-12' : 'p-6 md:p-8')}`}>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-contain mix-blend-multiply filter contrast-125 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Fillezy Brand Tag - Right Side */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black/50 group-hover:text-primary transition-colors">
                        <BrandName name="FILLEZY®" />
                    </span>
                </div>

                {/* ID Tag */}
                {techId && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-md border border-black/5 shadow-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-black/70">
                                {techId}
                            </span>
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative border-t border-black/5 bg-white">
                <div className="mb-6">
                    {category && (
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-[0.3em]">
                                CAT_{category.toUpperCase()}
                            </span>
                            <div className="flex-1 h-[1px] border-t border-dashed border-black/10" />
                        </div>
                    )}
                    <h3 className="text-xl md:text-2xl font-black text-[#1A1C1E] uppercase leading-none group-hover:text-primary transition-colors mb-3 md:mb-4">
                        <BrandName name={title} />
                    </h3>
                    <p className="text-[#1A1C1E]/60 text-sm font-medium leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-dashed border-black/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="p-2 rounded-lg bg-black/5 text-[#1A1C1E]/40 hover:bg-black hover:text-white transition-all group/btn"
                            title="Request Quotation"
                        >
                            <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={() => openContactModal("SPEC_SHEET")}
                            className="p-2 rounded-lg bg-black/5 text-[#1A1C1E]/40 hover:bg-black hover:text-white transition-all group/btn"
                            title="Get Spec Sheet"
                        >
                            <Download size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>

                    <Link
                        href={href}
                        className="flex-1 flex items-center justify-center gap-3 py-2.5 rounded-xl bg-black/5 text-black group-hover:bg-primary group-hover:text-white transition-all shadow-sm font-mono font-black text-[9px] uppercase tracking-widest"
                    >
                        VIEW_SPECS
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                    initialProductId={id}
                />
            </div>
        </motion.div>
    );
}
