"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail, Box, ShieldCheck, ArrowUpRight, MessageSquare, ShoppingBag, Sprout, Factory, Scroll, Blocks } from "lucide-react";
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
    { name: "Careers", href: "/careers" },
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
    const [contactFileUrl, setContactFileUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handleOpenModal = (e: any) => {
            const { mode, productId, fileUrl } = e.detail;
            setContactMode(mode || "QUOTATION");
            setContactProductId(productId);
            setContactFileUrl(fileUrl);
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
        <header
            suppressHydrationWarning
            className={`fixed w-full z-50 px-2 sm:px-6 transition-all duration-700 ${scrolled ? 'pt-2 md:pt-4' : 'pt-2 md:pt-8'}`}>
            <nav
                suppressHydrationWarning
                className={`mx-auto max-w-7xl px-2 rounded-2xl flex items-center justify-between transition-all duration-700 border relative ${scrolled
                    ? "h-14 md:h-20 bg-white shadow-2xl"
                    : "h-16 md:h-24 bg-white shadow-sm"
                    } border-black/5`}
            >
                {/* Visual Foundation */}
                <div className="absolute inset-0 paper-grain rounded-2xl opacity-5 pointer-events-none" />
                <div className="absolute inset-0 technical-grid rounded-2xl opacity-[0.03] pointer-events-none" />

                {/* Left Section: Logo */}
                <div className="flex items-center mr-auto pl-0 lg:pl-6 relative z-10">
                    <Link href="/" className="flex-shrink-0 group relative">
                        <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/5 rounded-xl transition-all duration-500 blur-xl" />
                        <Image
                            src="/fillezey logo.png"
                            alt="Fillezy"
                            width={160}
                            height={64}
                            priority
                            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 filter group-hover:contrast-125 relative z-10 ${scrolled ? "h-7 md:h-10" : "h-8 md:h-12"
                                }`}
                        />
                    </Link>
                </div>

                {/* Center Section: Products & Navigation */}
                <div className="hidden lg:flex flex-1 items-center gap-x-6 px-4 relative z-10 justify-start">
                    <div
                        className="relative"
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
                                    <div className="absolute top-[10px] left-14 w-4 h-4 bg-white rotate-45 border-l border-t border-black/5 z-0" />

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
                                        <div className="flex-1 bg-white p-10 flex flex-col min-w-0 text-left">
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
                                                                        <Image
                                                                            src={product.image}
                                                                            alt={product.name}
                                                                            fill
                                                                            className="object-contain mix-blend-multiply filter contrast-125 transition-transform duration-700 group-hover/item:scale-110"
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
                                                                    <div className="p-4 flex flex-col flex-1 text-left">
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

                    <div className="flex items-center gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors relative group whitespace-nowrap"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section: Communication CTAs */}
                <div className="flex items-center justify-end gap-2 pr-2 lg:pr-4 relative z-10 text-right">
                    <div className="hidden lg:flex items-center gap-3 border-r border-black/5 pr-4 mr-1">
                        <a
                            href="https://wa.me/919814215000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-[#25D366] hover:text-white transition-all inline-flex items-center justify-center"
                            title="WhatsApp Support"
                        >
                            <MessageSquare size={16} />
                        </a>
                        <a
                            href="tel:+919814215000"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center"
                            title="Call Support"
                        >
                            <Phone size={16} />
                        </a>
                        <a
                            href="mailto:info@fillezy.com"
                            className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center"
                            title="Email Inquiry"
                        >
                            <Mail size={16} />
                        </a>
                    </div>

                    <Link
                        href="https://www.purchasekart.com/collections/fillezy-protective-packaging-or-e-commerce-packaging-solutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:inline-flex rounded-xl bg-foreground px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-2xl shadow-black/10 hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all outline-none whitespace-nowrap"
                    >
                        Buy Now
                    </Link>

                    {/* Mobile Actions: Infographic Style Icons (White Buttons + Colored Icons) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Link
                            href="https://www.purchasekart.com/collections/fillezy-protective-packaging-or-e-commerce-packaging-solutions"
                            target="_blank"
                            className="w-10 h-10 rounded-xl bg-white text-[#FF6B35] shadow-[0_4px_12px_rgba(255,107,53,0.15)] border border-[#FF6B35]/10 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all inline-flex items-center justify-center relative overflow-hidden group active:scale-95"
                            title="Shop Now"
                        >
                            <ShoppingBag size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        </Link>
                        <a
                            href="tel:+919814215000"
                            className="w-10 h-10 rounded-xl bg-white text-[#0EA5E9] shadow-[0_4px_12px_rgba(14,165,233,0.15)] border border-[#0EA5E9]/10 hover:bg-[#0EA5E9] hover:text-white hover:border-[#0EA5E9] transition-all inline-flex items-center justify-center group active:scale-95"
                            title="Call"
                        >
                            <Phone size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                        </a>
                        <a
                            href="mailto:info@fillezy.com"
                            className="w-10 h-10 rounded-xl bg-white text-[#8B5CF6] shadow-[0_4px_12px_rgba(139,92,246,0.15)] border border-[#8B5CF6]/10 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all inline-flex items-center justify-center group active:scale-95"
                            title="Email"
                        >
                            <Mail size={20} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <button
                            type="button"
                            className="w-10 h-10 rounded-xl bg-black text-white shadow-lg hover:bg-primary transition-colors inline-flex items-center justify-center ml-1 border border-black/10 active:scale-95"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Refined */}
            {/* Mobile Menu Renewed: Command Center Style */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] lg:hidden flex flex-col bg-white/95 backdrop-blur-3xl"
                    >
                        {/* Technical Overlays */}
                        <div className="absolute inset-0 technical-grid opacity-[0.05] pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                        {/* Mobile Header */}
                        <div className="flex justify-between items-center p-6 border-b border-black/5 flex-none bg-white/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">F</div>
                                    <span className="font-black text-lg tracking-tight">FILLEZY</span>
                                </Link>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-10 h-10 rounded-xl bg-black/5 text-black hover:bg-black hover:text-white transition-all flex items-center justify-center active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content (Main Navigation) */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col custom-scrollbar">
                            <nav className="space-y-4 mb-6">
                                {navigation.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="group flex items-baseline gap-4"
                                        >
                                            <span className="text-xs font-mono font-bold text-primary/30 group-hover:text-primary transition-colors">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-4xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Mobile Footer (Products Grid) */}
                        <div className="p-4 border-t border-black/5 bg-white/50 backdrop-blur-sm flex-none pb-8 lg:pb-4">
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                SYSTEM_CATALOGUE
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {solutionCategories.map((cat, idx) => {
                                    // Dynamic Styling based on Category
                                    let icon = <Box size={20} strokeWidth={2} />;
                                    let colorClass = "text-black";
                                    let bgClass = "bg-white";
                                    let shadowClass = "shadow-sm";
                                    let borderClass = "border-black/5";

                                    if (cat.name === "Machines") {
                                        icon = <Factory size={20} strokeWidth={2} />;
                                        colorClass = "text-[#FF6B35]";
                                        shadowClass = "shadow-[0_2px_8px_rgba(255,107,53,0.1)]";
                                        borderClass = "border-[#FF6B35]/20";
                                    } else if (cat.name === "Materials") {
                                        icon = <Scroll size={20} strokeWidth={2} />;
                                        colorClass = "text-[#0EA5E9]";
                                        shadowClass = "shadow-[0_2px_8px_rgba(14,165,233,0.1)]";
                                        borderClass = "border-[#0EA5E9]/20";
                                    } else if (cat.name === "Bio Aer") {
                                        icon = <Sprout size={20} strokeWidth={2} />;
                                        colorClass = "text-[#22C55E]";
                                        shadowClass = "shadow-[0_2px_8px_rgba(34,197,94,0.1)]";
                                        borderClass = "border-[#22C55E]/20";
                                    } else {
                                        icon = <Blocks size={20} strokeWidth={2} />;
                                        colorClass = "text-[#8B5CF6]";
                                        shadowClass = "shadow-[0_2px_8px_rgba(139,92,246,0.1)]";
                                        borderClass = "border-[#8B5CF6]/20";
                                    }

                                    return (
                                        <Link
                                            key={cat.id}
                                            href={cat.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`h-16 rounded-xl ${bgClass} border ${borderClass} ${shadowClass} ${colorClass} flex items-center justify-start px-4 gap-3 hover:scale-[1.02] active:scale-95 transition-all`}
                                        >
                                            <div className="shrink-0">{icon}</div>
                                            <span className="text-[10px] font-black uppercase tracking-wider leading-tight">{cat.name}</span>
                                        </Link>
                                    )
                                })}
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
                fileUrl={contactFileUrl}
            />
        </header>
    );
}
