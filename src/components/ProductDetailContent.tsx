"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Check, Shield, Zap, Box, Activity, Cpu, Gauge, Share2, Download, Terminal, Settings, ChevronRight, ChevronLeft, Play, FileText, ChevronDown, Copy } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ProductDetail, allProducts } from "@/data/allProducts";
import BrandName from "./BrandName";
import ContactModal, { ModalMode } from "./ContactModal";
import ImageZoomOverlay from "./ImageZoomOverlay";

const renderTitle = (title: string) => {
    const parts = title.split("®");
    if (parts.length > 1) {
        return (
            <>
                {parts[0]}
                <sup className="text-[0.4em] top-[-1.5em] font-black tracking-normal">®</sup>
                {parts[1]}
            </>
        );
    }
    return title;
};

interface ProductDetailContentProps {
    product: ProductDetail;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTable, setActiveTable] = useState<number | null>(0);
    const [activeImage, setActiveImage] = useState(product.image);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Reset states when product changes
    useEffect(() => {
        setActiveImage(product.image);
        setCurrentVideoIndex(0);
    }, [product.id, product.image]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    // Find related products (e.g., if this is a machine, find materials; if material, find machines)
    const relatedProducts = allProducts
        .filter(p => {
            if (product.category === "Machines") return p.category === "Materials" || p.category === "Bio Aer";
            if (product.category === "Materials" || product.category === "Bio Aer") return p.category === "Machines";
            return p.id !== product.id && p.category === product.category;
        })
        .slice(0, 3);

    return (
        <main ref={containerRef} className="isolate min-h-screen bg-white selection:bg-primary selection:text-white" suppressHydrationWarning>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* ZOOM MODAL */}
            <ImageZoomOverlay />

            {/* BREADCRUMB / UTILITY NAV - Calibrated clearance */}
            <div className="pt-32 md:pt-44 mb-[15px] relative z-30">
                <div className="bg-white/90 backdrop-blur-md border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4 flex items-center justify-between">
                        <Link href="/products" className="group flex items-center text-[10px] font-mono font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors">
                            <ArrowLeft className="mr-3 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                            [ EXIT_TO_INVENTORY ]
                        </Link>

                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-black/5 border border-black/5">
                                <Terminal size={10} className="text-foreground/40" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-foreground/40">SYS_PATH: /{product.category.toLowerCase()}/{product.id}</span>
                            </div>
                            <button className="text-foreground/40 hover:text-primary transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-0 pb-12">
                <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-16 items-start">

                    {/* LEFT COLUMN: VISUAL SYSTEM (8 COLS) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* CINEMATIC GALLERY */}
                        {/* CINEMATIC GALLERY WITH NAV & ZOOM */}
                        <section className="relative group space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative overflow-hidden rounded-[3rem] bg-[#F8F8F9] border border-black/[0.03] aspect-[16/10] flex items-center justify-center shadow-2xl shadow-black/5 group/image"
                            >
                                <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

                                {/* DYNAMIC BACKGROUND ACCENTS */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
                                    <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[100px]" />
                                </div>

                                {/* TECHNICAL CORNER BRACKETS */}
                                <div className="absolute top-12 left-12 w-8 h-8 border-l-2 border-t-2 border-black/10 group-hover/image:border-primary/40 transition-colors duration-700" />
                                <div className="absolute bottom-12 right-12 w-8 h-8 border-r-2 border-b-2 border-black/10 group-hover/image:border-primary/40 transition-colors duration-700" />

                                {/* MAIN IMAGE WITH ZOOM CLICK */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative w-[85%] h-[85%] cursor-zoom-in"
                                        onClick={() => {
                                            // Simple Zoom Logic: Open in new tab or modal. For now, we'll use a basic lightbox state if we had one, 
                                            // but user asked for "zoom option". Let's implement a toggle state for a full-screen overlay.
                                            // We will add a state 'isZoomOpen' in the component scope.
                                            window.dispatchEvent(new CustomEvent("OPEN_IMAGE_ZOOM", { detail: { image: activeImage } }));
                                        }}
                                    >
                                        <Image
                                            src={activeImage}
                                            alt={product.title}
                                            fill
                                            priority
                                            className="object-contain mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* NAVIGATION ARROWS */}
                                {product.gallery && product.gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const idx = product.gallery!.indexOf(activeImage);
                                                const prevIdx = idx === 0 ? product.gallery!.length - 1 : idx - 1;
                                                setActiveImage(product.gallery![prevIdx]);
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-lg flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white transition-all opacity-0 group-hover/image:opacity-100 z-20"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const idx = product.gallery!.indexOf(activeImage);
                                                const nextIdx = (idx + 1) % product.gallery!.length;
                                                setActiveImage(product.gallery![nextIdx]);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-black/5 shadow-lg flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-white transition-all opacity-0 group-hover/image:opacity-100 z-20"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}

                                <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 pointer-events-none">
                                    <span className="text-[9px] md:text-[10px] font-mono font-black text-black/20 uppercase tracking-[0.1em] md:tracking-[0.5em] whitespace-nowrap">SYSTEM_VIEW_ACTIVE</span>
                                    <Shield size={20} className="text-primary/40" />
                                </div>
                            </motion.div>

                            {/* THUMBNAIL STRIP (REFINED STYLING) */}
                            {product.gallery && product.gallery.length > 0 && (
                                <div className="flex gap-3 justify-center overflow-x-auto pb-2 px-4 scrollbar-hide">
                                    {product.gallery.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`relative flex-shrink-0 w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImage === img
                                                ? 'border-primary opacity-100'
                                                : 'border-transparent opacity-60 hover:opacity-100 hover:border-black/5'
                                                }`}
                                        >
                                            <div className="absolute inset-0 bg-[#F8F8F9]" />
                                            <Image
                                                src={img}
                                                alt={`${product.title} view ${idx + 1}`}
                                                fill
                                                className="object-contain mix-blend-multiply p-2"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* MOBILE CONTROLLER (VISIBLE ONLY ON MOBILE) */}
                        <div className="block lg:hidden space-y-4 w-full">
                            <div className="p-5 rounded-[1.5rem] bg-white border border-black/5 shadow-xl shadow-black/5 relative overflow-hidden text-left">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="flex items-center justify-start gap-2 mb-3">
                                    <Box size={12} className="text-primary" />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-primary">{product.category}</span>
                                </div>
                                <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase leading-[0.9] mb-3">
                                    <BrandName name={product.title} />
                                </h1>
                                <p className="text-xs text-foreground/60 font-medium leading-relaxed mb-5">
                                    {product.description}
                                </p>
                                <div className="space-y-3">
                                    {/* Primary Action */}
                                    <Link
                                        href="https://www.purchasekart.com/collections/fillezy-protective-packaging-or-e-commerce-packaging-solutions"
                                        target="_blank"
                                        className="block w-full rounded-xl bg-primary px-6 py-3 text-center text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        BUY_NOW
                                    </Link>

                                    {/* Secondary Actions */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => openContactModal("QUOTATION")}
                                            className="block w-full rounded-xl bg-white border border-black/10 px-4 py-3 text-center text-[9px] font-mono font-black uppercase tracking-widest text-foreground hover:bg-black/5 transition-all active:scale-[0.98]"
                                        >
                                            GET_QUOTE
                                        </button>
                                        <button
                                            onClick={() => openContactModal("SPEC_SHEET")}
                                            className="block w-full rounded-xl bg-white border border-black/10 px-4 py-3 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest text-foreground hover:bg-black/5 transition-all active:scale-[0.98]"
                                        >
                                            <Download size={12} /> SPEC_SHEET
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SPECIAL OFFER SPOTLIGHT (REPOSITIONED) */}
                        {product.specialOffer && (
                            <section className="mt-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-5 md:p-8 rounded-[2.5rem] bg-primary text-white border border-primary shadow-[0_0_50px_rgba(255,107,0,0.2)] group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
                                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 text-left">
                                        <div className="flex flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0">
                                                <Zap size={20} className="fill-current animate-pulse text-white md:w-7 md:h-7" />
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-[8px] md:text-[10px] font-mono font-black uppercase tracking-[0.1em] md:tracking-[0.4em] opacity-80 mb-1 md:mb-2 whitespace-nowrap">PROMOTIONAL_ASSET // ACTIVE_DEAL</span>
                                                <span className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">{product.specialOffer}</span>
                                            </div>
                                        </div>
                                        <Link href="/contact" className="w-full md:w-auto text-center px-6 py-3 md:px-8 md:py-4 rounded-xl bg-white text-primary text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5">
                                            SECURE_OFFER
                                        </Link>
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* DESCRIPTION & NARRATIVE */}
                        <section className="max-w-3xl text-left mx-0 px-5 md:px-0">
                            <div className="flex items-center justify-start gap-4 mb-6 md:mb-8">
                                <div className="h-[2px] w-12 bg-primary" />
                                <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.1em] md:tracking-[0.4em] text-primary whitespace-nowrap">ENGINEERING_OVERVIEW</span>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase leading-none mb-6 md:mb-8">
                                Advanced <span className="text-primary italic font-serif font-light lowercase">protection</span> protocols
                            </h2>

                            <div className="space-y-4 md:space-y-6 text-sm md:text-xl text-foreground/70 leading-relaxed font-medium mb-8 md:mb-12">
                                <p>{product.longDescription}</p>
                            </div>

                            {/* INDUSTRY PULSE (NEW) */}
                            {product.suitableIndustries && (
                                <div className="space-y-8 md:space-y-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">SUITABLE_INDUSTRIES // APPLICATION_PULSE</span>
                                        </div>
                                        <div className="flex flex-wrap justify-start gap-2">
                                            {product.suitableIndustries.map((ind, i) => (
                                                <div key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/5 border border-black/5 text-[10px] md:text-[11px] font-black uppercase tracking-tight text-foreground/60 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all cursor-default">
                                                    {ind}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </section>

                        {/* SPECS HIGHLIGHTS (Exactly 4 Cards) */}
                        <section className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                            {product.specs.slice(0, 4).map((spec, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="p-5 md:p-8 rounded-2xl md:rounded-[2rem] bg-black/[0.02] border border-black/[0.05] group hover:border-primary/20 transition-all text-left"
                                >
                                    <div className="flex flex-row items-center justify-between mb-3 md:mb-4 gap-0">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-black/5 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {idx % 2 === 0 ? <Cpu size={16} className="md:w-5 md:h-5" /> : <Settings size={16} className="md:w-5 md:h-5" />}
                                        </div>
                                        <span className="text-[8px] md:text-[9px] font-mono font-black text-black/10">PROP_{idx + 1}</span>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/40 block mb-1">{spec.label}</span>
                                    <span className="text-sm md:text-2xl font-black text-foreground uppercase tracking-tight break-words">{spec.value}</span>
                                </motion.div>
                            ))}
                        </section>

                        <section>
                            {(product.moreSpecs || product.applicationTables) && (
                                <div className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-black/5 bg-white relative overflow-hidden group hover:border-primary/20 transition-all">
                                    <div className="absolute top-0 right-0 p-8">
                                        <Terminal size={40} className="text-black/[0.02] group-hover:text-primary/5 transition-colors" />
                                    </div>
                                    <div className="relative z-10">
                                        {/* HEADER */}
                                        <div className="flex items-center gap-3 mb-10">
                                            <Terminal size={14} className="text-primary" />
                                            <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.1em] md:tracking-[0.4em] text-foreground/40 whitespace-nowrap">TECHNICAL_DEEP_DIVE // EXTENDED_PARAMS</span>
                                        </div>

                                        {/* NESTED ACCORDIONS (INSIDE DOTTED BOX) */}
                                        {product.applicationTables && (
                                            <div className="space-y-4">
                                                {product.applicationTables.map((table, tIdx) => (
                                                    <div
                                                        key={tIdx}
                                                        className={`rounded-3xl border border-black/5 transition-colors duration-300 ${activeTable === tIdx ? 'bg-white shadow-xl shadow-black/5 border-primary/20 z-10 relative' : 'bg-[#F8F9FA] hover:bg-white'}`}
                                                    >
                                                        <button
                                                            onClick={() => setActiveTable(activeTable === tIdx ? null : tIdx)}
                                                            className="w-full px-5 py-4 md:px-8 md:py-6 flex items-center justify-between group"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${activeTable === tIdx ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-black/5 text-foreground/40 group-hover:text-primary'}`}>
                                                                    <FileText size={18} />
                                                                </div>
                                                                <span className={`text-sm md:text-lg font-black uppercase tracking-tighter transition-colors text-left ${activeTable === tIdx ? 'text-primary' : 'text-foreground/60'}`}>
                                                                    {table.title}
                                                                </span>
                                                            </div>
                                                            <ChevronDown className={`transition-transform duration-500 ${activeTable === tIdx ? 'rotate-180 text-primary' : 'text-foreground/20'}`} size={22} />
                                                        </button>

                                                        <AnimatePresence>
                                                            {activeTable === tIdx && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                    className="overflow-hidden bg-white border-t border-black/5"
                                                                >
                                                                    <div className="p-5 md:p-8 grid grid-cols-1">
                                                                        <div className="overflow-x-auto border border-black/5 rounded-xl md:rounded-[2rem] bg-white shadow-sm">
                                                                            <table className="w-full text-left border-collapse min-w-max">
                                                                                <thead>
                                                                                    <tr className="bg-black text-white">
                                                                                        {table.headers.map((header, hIdx) => (
                                                                                            <th key={hIdx} className="px-3 py-3 md:px-6 md:py-5 text-[8px] md:text-[10px] font-mono font-black uppercase tracking-widest border-r border-white/10 last:border-0 whitespace-nowrap">{header}</th>
                                                                                        ))}
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {table.rows.map((row, rIdx) => {
                                                                                        const isSpecialOffer = row.some(cell => cell.includes("Free Machine"));
                                                                                        const isEfficiencyHighlight = table.title.includes("Efficiency Protocol") && row.some(cell => cell.includes("Savings") || cell.includes("Productivity"));
                                                                                        return (
                                                                                            <tr key={rIdx} className={`border-b border-black/5 last:border-0 transition-colors ${isSpecialOffer || isEfficiencyHighlight ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-black/[0.02]'}`}>
                                                                                                {row.map((cell, cIdx) => (
                                                                                                    <td key={cIdx} className="px-3 py-3 md:px-6 md:py-5 border-r border-black/5 last:border-0">
                                                                                                        <span className={`text-[9px] md:text-sm tracking-tight block min-w-max ${isSpecialOffer || isEfficiencyHighlight ? 'text-primary font-black uppercase' : cIdx === 0 ? 'font-black uppercase text-foreground' : 'font-medium text-foreground/60'}`}>
                                                                                                            {cell}
                                                                                                        </span>
                                                                                                        {isSpecialOffer && cIdx === 0 && <span className="ml-1 md:ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary text-[7px] md:text-[8px] font-black text-white animate-pulse">OFFER</span>}
                                                                                                    </td>
                                                                                                ))}
                                                                                            </tr>
                                                                                        );
                                                                                    })}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* FEATURES LIST */}
                        <section className="bg-black text-white rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 lg:p-16 overflow-hidden relative text-left">
                            <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] -rotate-12 translate-x-1/2" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/10 mb-6 md:mb-8">
                                    <Activity size={12} className="text-primary animate-pulse" />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-widest text-primary">CORE_CAPABILITIES</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 md:mb-12">Technical Advantages</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex flex-row items-start gap-4 md:gap-6 group text-left">
                                            <div className="flex-none w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                <Check size={18} className="md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <span className="text-base md:text-lg font-black uppercase tracking-tight block mb-1">{feature.split(' ')[0]}</span>
                                                <span className="text-xs md:text-sm font-medium text-white/50">{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* CINEMATIC VIDEO HUB (NEW) */}
                        {/* CINEMATIC VIDEO HUB (NEW) */}
                        {(product.videoGallery || product.videoUrl) && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 px-5 md:px-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">SYSTEM_IN_MOTION // CINEMATIC_PREVIEW</span>
                                </div>
                                <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black border border-black/5 group shadow-2xl">
                                    <iframe
                                        src={product.videoGallery ? product.videoGallery[currentVideoIndex] : product.videoUrl}
                                        className="absolute inset-0 w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[3rem]" />

                                    {/* VIDEO CONTROLS */}
                                    {product.videoGallery && product.videoGallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setCurrentVideoIndex(prev => (prev === 0 ? product.videoGallery!.length - 1 : prev - 1))}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary transition-all z-20"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={() => setCurrentVideoIndex(prev => (prev === product.videoGallery!.length - 1 ? 0 : prev + 1))}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary transition-all z-20"
                                            >
                                                <ChevronRight size={20} />
                                            </button>

                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                                {product.videoGallery.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentVideoIndex(idx)}
                                                        className={`w-2 h-2 rounded-full transition-all ${currentVideoIndex === idx ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/60'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    <div className="absolute top-8 right-8 pointer-events-none z-10">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[8px] font-mono font-black text-white tracking-[0.3em]">REC_LIVE</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}


                        {/* SYSTEM MATCHING */}
                        {relatedProducts.length > 0 && (
                            <section className="py-12 border-t border-black/5 text-left">
                                <h4 className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.1em] md:tracking-[0.4em] text-foreground/40 mb-8 md:mb-10 whitespace-nowrap px-5 md:px-0">
                                    SYSTEM_MATCHING // RECOMMENDED_EXTENSIONS
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    {relatedProducts.map((related) => (
                                        <Link key={related.id} href={`/products/${related.id}`} className="group block">
                                            <div className="aspect-square rounded-[1.5rem] md:rounded-[2rem] bg-black/[0.02] border border-black/5 flex items-center justify-center p-5 md:p-8 mb-3 md:mb-4 group-hover:border-primary/20 transition-all relative overflow-hidden">
                                                <Image src={related.image} alt={related.title} fill className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 p-8" />
                                            </div>
                                            <span className="text-[8px] md:text-[9px] font-mono font-black text-primary uppercase tracking-widest block mb-0.5 md:mb-1">{related.category}</span>
                                            <h5 className="text-xs md:text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                                <BrandName name={related.title} />
                                            </h5>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT COLUMN: STICKY CONTROLLER */}
                    <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="p-8 rounded-[2.5rem] bg-white border border-black/5 shadow-2xl shadow-black/5 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            {/* CATEGORY TAG */}
                            <div className="flex items-center gap-2 mb-4">
                                <Box size={14} className="text-primary" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary">{product.category}</span>
                            </div>

                            {/* TITLE */}
                            <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-4">
                                <BrandName name={product.title} />
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(product.techId);
                                        // Optional: Add a temporary success state here
                                    }}
                                    className="group/id flex items-center gap-2 text-[9px] font-mono font-black py-1 px-2 bg-black/[0.03] rounded border border-black/5 text-foreground/60 uppercase tracking-widest hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all"
                                >
                                    ID_{product.techId}
                                    <div className="flex items-center gap-1 opacity-0 group-hover/id:opacity-100 transition-opacity">
                                        <div className="w-[1px] h-2 bg-primary/20" />
                                        <Terminal size={10} />
                                    </div>
                                </button>
                                <div className="h-[1px] flex-1 bg-black/5" />
                            </div>

                            <p className="text-sm text-foreground/60 font-medium leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* PRODUCT VARIANTS (NEW) */}
                            {product.variants && (
                                <div className="space-y-6 mb-10 pt-6 border-t border-black/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-primary">SYSTEM_DESIGNER</span>
                                        <div className="h-[1px] w-12 bg-primary/20" />
                                    </div>
                                    <div className="space-y-4">
                                        {product.variants.map((variant, i) => (
                                            <VariantSelector
                                                key={i}
                                                variant={variant}
                                                onSelect={(option) => {
                                                    if (product.colorImages && product.colorImages[option]) {
                                                        setActiveImage(product.colorImages[option]);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* QUICK STATS */}
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-end pb-3 border-b border-black/5">
                                    <span className="text-[10px] font-mono font-bold text-foreground/40 uppercase">Global_Availability</span>
                                    <span className="text-xs font-black uppercase">Immediate Deployment</span>
                                </div>
                                <div className="flex justify-between items-end pb-3 border-b border-black/5">
                                    <span className="text-[10px] font-mono font-bold text-foreground/40 uppercase">Impact_Rating</span>
                                    <span className="text-xs font-black uppercase">Industrial Grade</span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => openContactModal("QUOTATION")}
                                    className="block w-full rounded-2xl bg-primary px-6 py-5 text-center text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white hover:bg-black transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
                                >
                                    GET_QUOTATION // REQUEST
                                </button>
                                <button
                                    onClick={() => openContactModal("SPEC_SHEET")}
                                    className="block w-full rounded-2xl border-2 border-black/5 px-6 py-5 text-center text-[10px] font-mono font-black uppercase tracking-[0.3em] text-foreground hover:bg-black hover:text-white transition-all active:scale-[0.98]"
                                >
                                    [ DOWNLOAD_SPEC_SHEET ]
                                </button>
                            </div>

                            <ContactModal
                                isOpen={isContactModalOpen}
                                onClose={() => setIsContactModalOpen(false)}
                                initialMode={contactMode}
                                initialProductId={product.id}
                            />

                            {/* FOOTER ACCENT */}
                            <div className="mt-8 flex items-center justify-center gap-4 border-t border-black/5 pt-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#F4F4F5] flex items-center justify-center">
                                            <Zap size={10} className="text-primary" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[8px] font-mono font-bold uppercase text-foreground/40 tracking-widest">300+ Trusted Partners</span>
                            </div>
                        </div>

                        {/* SECONDARY STICKY ELEMENT: SUPPORT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-6 p-6 rounded-3xl bg-black transition-all hover:bg-primary group hidden lg:block"
                        >
                            <Link href="/contact" className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                                        <Gauge size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest block">Live_Expert_Assist</span>
                                        <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Connect to engineering</span>
                                    </div>
                                </div>
                                <ArrowLeft className="rotate-180 text-white group-hover:translate-x-1 transition-transform" size={16} />
                            </Link>
                        </motion.div>
                    </aside>
                </div>
            </div >
        </main >
    );
}

function VariantSelector({ variant, onSelect }: { variant: { label: string, options: string[] }, onSelect?: (option: string) => void }) {
    const [selectedOption, setSelectedOption] = useState(variant.options[0]);
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-mono font-bold uppercase text-foreground/30 tracking-widest">{variant.label}</label>
            <div className="flex flex-wrap gap-2">
                {variant.options.map((opt, j) => (
                    <button
                        key={j}
                        onClick={() => {
                            setSelectedOption(opt);
                            onSelect?.(opt);
                        }}
                        className={`px-3 py-1.5 rounded-lg border border-black/10 text-[10px] font-black uppercase transition-all ${selectedOption === opt ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-foreground/60 hover:border-primary/50'}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
