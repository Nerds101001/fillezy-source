"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail, Box, ShieldCheck, ArrowUpRight } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import BrandName from "./BrandName";
import { megamenuData, MegamenuCategory, MegamenuProduct } from "../data/megamenu";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries" },
    { name: "Sustainability", href: "/sustainability" },
    {
        name: "About",
        href: "/about",
        children: [
            { name: "Company Profile", href: "/about" },
            { name: "Brand Verticals", href: "/about#verticals" },
            { name: "VCI Expertise", href: "/about#vci" },
            { name: "Global Presence", href: "/about#global" },
        ]
    },
    { name: "News", href: "/news" },
];

const solutionCategories = [
    {
        name: "Machines",
        id: "MAC-A01",
        href: "/products/category/Machines",
        description: "High-velocity void fill systems.",
        spotlight: {
            title: "Air_Cushion_V3",
            image: "/product/Fillezy Rapid.webp",
            description: "High-speed air pillows for high-volume fulfillment throughput."
        }
    },
    {
        name: "Materials",
        id: "MAT-P02",
        href: "/products/category/Materials",
        description: "Industrial-grade consumables & padding.",
        spotlight: {
            title: "Paper_Shark_Elite",
            image: "/product/Paper Shark.webp",
            description: "Industrial paper cushioning for heavy-duty transit protection."
        }
    },
    {
        name: "Bio Aer",
        id: "MAT-B04",
        href: "/products/category/Bio%20Aer",
        description: "Compostable eco-fulfillment materials.",
        spotlight: {
            title: "Bio_Shield_Film",
            image: "/product/Bio-Aer.webp",
            description: "100% compostable materials for the conscious global supply chain."
        }
    },
    {
        name: "Integrations",
        id: "INT-X03",
        href: "/products/category/Integrations",
        description: "Packing line automation.",
        spotlight: {
            title: "Auto_Line_X1",
            image: "/product/FIlezy Handling Systems.webp",
            description: "Seamless packing line automation for maximum operational efficiency."
        }
    }
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(solutionCategories[0]);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");
    const [contactProductId, setContactProductId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handleOpenModal = (e: any) => {
            const { mode, productId } = e.detail;
            setContactMode(mode || "QUOTATION");
            setContactProductId(productId);
            setIsContactModalOpen(true);
        };
        window.addEventListener('OPEN_CONTACT_MODAL', handleOpenModal);
        return () => window.removeEventListener('OPEN_CONTACT_MODAL', handleOpenModal);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 px-4 sm:px-6 transition-all duration-700 ${scrolled ? 'pt-4' : 'pt-8'}`}>
            <nav
                className={`mx-auto max-w-7xl px-2 rounded-2xl flex items-center justify-between transition-all duration-700 border relative ${scrolled
                    ? "h-20 bg-white backdrop-blur-2xl border-black/5 shadow-2xl"
                    : "h-24 bg-white backdrop-blur-md border-black/5 shadow-sm"
                    }`}
            >
                {/* Visual Foundation */}
                <div className="absolute inset-0 paper-grain rounded-2xl opacity-5 pointer-events-none" />
                <div className="absolute inset-0 technical-grid rounded-2xl opacity-[0.03] pointer-events-none" />

                {/* Left Section: Logo & Mega Menu Toggle */}
                <div className="flex items-center gap-6 lg:flex-1 pl-6 relative z-10">
                    <Link href="/" className="flex-shrink-0 group">
                        <img
                            src="/fillezey logo.png"
                            alt="Fillezy"
                            className={`w-auto object-contain transition-all duration-700 group-hover:scale-105 contrast-125 mr-8 ${scrolled ? "h-10" : "h-12"
                                }`}
                        />
                    </Link>

                    <div
                        className="relative hidden lg:block"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                        <button
                            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-foreground text-background text-[9px] font-black uppercase tracking-[0.3em] hover:bg-foreground/80 transition-all group"
                        >
                            <Box size={12} className="group-hover:rotate-12 transition-transform" />
                            PRODUCTS <ChevronDown size={10} className={`ml-2 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mega Menu Popover */}
                        <AnimatePresence>
                            {megaMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                    className="absolute left-0 top-full pt-4 z-50"
                                >
                                    {/* Precision Pointer (Architectural Nose) */}
                                    <div className="absolute top-[10px] left-10 w-4 h-4 bg-white rotate-45 border-l border-t border-black/5 z-0" />

                                    <div className="bg-white rounded-b-[3rem] rounded-t-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-black/5 border-t-primary/30 border-t-2 w-[1100px] flex paper-grain relative z-10 max-h-[85vh] overflow-hidden">
                                        {/* Left: Component Matrix */}
                                        <div className="w-[320px] bg-foreground/5 p-8 border-r border-black/5 overflow-y-auto custom-scrollbar">
                                            <div className="flex items-center gap-3 text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em] mb-10">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                SYSTEM_MATRIX
                                            </div>
                                            <div className="space-y-2">
                                                {solutionCategories.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        onMouseEnter={() => setActiveCategory(cat)}
                                                        className={`w-full flex flex-col p-6 rounded-xl transition-all text-left border ${activeCategory.id === cat.id
                                                            ? 'bg-white shadow-lg border-black/5 ring-1 ring-black/5'
                                                            : 'hover:bg-white hover:shadow-md border-transparent hover:border-black/5'}`}
                                                    >
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <span className={`text-[12px] font-black uppercase transition-colors ${activeCategory.id === cat.id ? 'text-primary' : 'text-foreground'}`}>{cat.name}</span>
                                                            <span className="text-[9px] font-mono text-foreground/20 font-bold">{cat.id}</span>
                                                        </div>
                                                        <span className="text-[11px] text-foreground/40 font-medium line-clamp-1">{cat.description}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Product Navigator */}
                                        <div className="flex-1 bg-white p-10 flex flex-col min-w-0">
                                            {/* Category Header */}
                                            <div className="flex justify-between items-start mb-4 border-b border-black/5 pb-4">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeCategory.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="max-w-xl"
                                                    >
                                                        <h4 className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.3em] mb-2">[ {activeCategory.name.toUpperCase()}_PROTOCOL ]</h4>
                                                        <p className="text-foreground/60 text-[12px] font-medium leading-relaxed">
                                                            {megamenuData.find((d: MegamenuCategory) => d.id === activeCategory.id)?.intro || activeCategory.description}
                                                        </p>
                                                    </motion.div>
                                                </AnimatePresence>

                                                {activeCategory.id !== 'MAT-B04' && (
                                                    <Link
                                                        href={activeCategory.href}
                                                        className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-all group"
                                                    >
                                                        View All <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                                                    </Link>
                                                )}
                                            </div>

                                            {/* Product Grid Area with Dynamic Height for Scroll */}
                                            <div className="relative overflow-y-auto pr-3 -mr-3 custom-scrollbar flex-1 min-h-0">
                                                <div className="grid grid-cols-3 gap-3 pb-4">
                                                    <AnimatePresence mode="wait">
                                                        {megamenuData.find((d: MegamenuCategory) => d.id === activeCategory.id)?.products.map((product: MegamenuProduct, pIdx: number) => {
                                                            const isShark = product.id.includes('shark') || product.name.toLowerCase().includes('shark') || product.techId === 'SHK-M0';
                                                            const isMachine = activeCategory.name === 'Machines';
                                                            const paddingClass = isShark ? 'p-10' : (isMachine ? 'p-7' : 'p-4');

                                                            return (
                                                                <motion.div
                                                                    key={product.id}
                                                                    initial={{ opacity: 0, y: 15 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: pIdx * 0.04 }}
                                                                    className="group/item relative flex flex-col bg-white border border-black/10 rounded-xl p-0 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(255,107,53,0.2)] transition-all overflow-hidden"
                                                                >
                                                                    {/* Technical Corner Accents */}
                                                                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-black/20 group-hover/item:border-primary transition-colors z-10" />
                                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-black/20 group-hover/item:border-primary transition-colors z-10" />
                                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-black/20 group-hover/item:border-primary transition-colors z-10" />
                                                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-black/20 group-hover/item:border-primary transition-colors z-10" />

                                                                    {/* Image Section */}
                                                                    <div className={`relative h-32 w-full bg-[#F4F4F5] flex items-center justify-center group-hover/item:bg-[#F0F0F0] transition-colors ${paddingClass}`}>
                                                                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:0.75rem_0.75rem]" />
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.name}
                                                                            className="h-full w-full object-contain mix-blend-multiply filter contrast-125 transition-transform duration-700 group-hover/item:scale-110"
                                                                        />
                                                                        {/* Floating ID Tag */}
                                                                        <div className="absolute top-3 left-3">
                                                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/80 backdrop-blur-md border border-black/5 shadow-sm">
                                                                                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                                                                <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-black/70">
                                                                                    {product.techId}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Content Section */}
                                                                    <div className="p-4 flex flex-col flex-1">
                                                                        <div className="text-[10px] font-black uppercase text-foreground mb-3 leading-tight group-hover/item:text-primary transition-colors line-clamp-2 min-h-[1.5rem]">
                                                                            <BrandName name={product.name} />
                                                                        </div>

                                                                        <div className="mt-auto pt-3 border-t border-dashed border-black/10 flex items-center justify-between">
                                                                            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-foreground/40 group-hover/item:text-foreground transition-colors">
                                                                                Specs
                                                                            </span>
                                                                            <Link
                                                                                href={product.href}
                                                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 text-black group-hover/item:bg-primary group-hover/item:text-white transition-all shadow-sm"
                                                                            >
                                                                                <ArrowUpRight size={12} />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Center Section: Navigation */}
                <div className="hidden lg:flex items-center gap-x-10 px-8 relative z-10">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Right Section: Communication CTAs */}
                <div className="flex items-center justify-end gap-3 lg:flex-1 pr-4 relative z-10">
                    <div className="hidden lg:flex items-center gap-3 border-r border-black/5 pr-4 mr-1">
                        <a
                            href="https://wa.me/919814215000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-[#25D366] hover:text-white transition-all"
                            title="WhatsApp Support"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.875 1.215 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                        <a
                            href="tel:+919814215000"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all"
                            title="Call Support"
                        >
                            <Phone size={16} />
                        </a>
                        <a
                            href="mailto:info@fillezy.com"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all"
                            title="Email Inquiry"
                        >
                            <Mail size={16} />
                        </a>
                    </div>

                    <Link
                        href="https://www.purchasekart.com/collections/fillezy-protective-packaging-or-e-commerce-packaging-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex rounded-xl bg-foreground px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-2xl shadow-black/10 hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Buy Now
                    </Link>

                    <button
                        type="button"
                        className="lg:hidden p-2 text-foreground"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Refined */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[60] lg:hidden"
                    >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
                        <div className="absolute right-0 top-0 h-full w-[85%] bg-white shadow-2xl p-12 paper-grain flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-20">
                                    <img src="/fillezey logo.png" alt="Fillezy" className="h-7 w-auto" />
                                    <button onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl bg-black/5"><X size={20} /></button>
                                </div>

                                <div className="space-y-10">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-4xl font-black text-foreground hover:text-primary transition-colors block uppercase tracking-tighter"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-10 border-t border-black/5 space-y-6">
                                <div className="text-[10px] font-mono text-foreground/40 font-bold uppercase tracking-widest">[ GLOBAL_ACCESS ]</div>
                                <div className="flex flex-col gap-4">
                                    <a href="tel:+919814215000" className="flex items-center gap-4 text-xs font-black uppercase text-foreground">
                                        <Phone size={16} className="text-primary" /> +91 98142 15000
                                    </a>
                                    <a href="mailto:info@fillezy.com" className="flex items-center gap-4 text-xs font-black uppercase text-foreground">
                                        <Mail size={16} className="text-primary" /> info@fillezy.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                initialMode={contactMode}
                initialProductId={contactProductId}
            />
        </header>
    );
}
