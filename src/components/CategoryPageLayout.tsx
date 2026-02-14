"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, MessageSquare, Check, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal, { ModalMode } from "@/components/ContactModal";
import { useState } from "react";
import clsx from "clsx";
import { ProductDetail } from "@/data/allProducts";

interface CategoryPageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    products: ProductDetail[];
    categoryTag: string;
}

export default function CategoryPageLayout({
    title,
    subtitle,
    description,
    icon,
    products,
    categoryTag
}: CategoryPageLayoutProps) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");
    const [contactProductId, setContactProductId] = useState<string | undefined>(undefined);

    const openContactModal = (mode: ModalMode, productId?: string) => {
        setContactMode(mode);
        setContactProductId(productId);
        setIsContactModalOpen(true);
    };

    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                {/* HERO SECTION */}
                <div className="bg-[#F8F8F9] pt-48 pb-24 md:pt-64 md:pb-32 relative overflow-hidden border-b border-black/[0.03]">
                    <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

                    {/* ASYMMETRIC BACKGROUND ACCENTS */}
                    <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[60%] bg-primary/5 rounded-full blur-[120px] -rotate-12" />
                    <div className="absolute bottom-[20%] -left-[5%] w-[20%] h-[40%] bg-black/5 rounded-full blur-[100px] rotate-45" />

                    <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-black/5 shadow-sm mb-10"
                        >
                            <div className="p-1.5 rounded-md bg-primary/10">
                                {icon}
                            </div>
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
                                {categoryTag}
                            </span>
                        </motion.div>

                        <div className="lg:flex lg:items-end lg:justify-between">
                            <div className="max-w-4xl">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl md:text-7xl font-black tracking-tighter text-foreground sm:text-8xl uppercase leading-[0.85] mb-8"
                                >
                                    {title} <span className="text-primary italic font-serif font-light lowercase">{subtitle}</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed max-w-xl"
                                >
                                    {description}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCTS LIST */}
                <section className="py-24 px-5 lg:px-8 bg-background relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 gap-20">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                                >
                                    {/* Image Side - Alternating */}
                                    <div className={clsx(
                                        "lg:col-span-7 relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden bg-[#F8F8F9] border border-black/5",
                                        index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                                    )}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.white),transparent)] z-10 opacity-50" />
                                        <div className="absolute inset-0 technical-grid opacity-[0.05]" />

                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain p-12 lg:p-20 relative z-20 transition-transform duration-1000 group-hover:scale-105 group-hover:-rotate-3 mix-blend-multiply dark:mix-blend-normal"
                                        />

                                        {/* Floating Badge */}
                                        <div className="absolute top-8 left-8 z-30">
                                            <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/5 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                                {product.techId}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={clsx(
                                        "lg:col-span-5 flex flex-col justify-center",
                                        index % 2 === 1 ? "lg:order-1 lg:pr-10" : "lg:order-2 lg:pl-10"
                                    )}>
                                        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 uppercase leading-none">
                                            {product.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-primary mb-8" />

                                        <p className="text-foreground/60 text-lg leading-relaxed mb-8 font-light">
                                            {product.longDescription || product.description}
                                        </p>

                                        {/* Specs Preview */}
                                        <div className="grid grid-cols-2 gap-4 mb-10">
                                            {product.specs.slice(0, 4).map((spec) => (
                                                <div key={spec.label} className="border-l-2 border-primary/20 pl-4">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{spec.label}</p>
                                                    <p className="text-sm font-bold text-foreground">{spec.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-4">
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300"
                                            >
                                                Details
                                                <ArrowUpRight className="w-4 h-4 text-background/50 group-hover/btn:text-white group-hover/btn:rotate-45 transition-all" />
                                            </Link>

                                            <button
                                                onClick={() => openContactModal("QUOTATION", product.id)}
                                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-foreground/10 text-foreground text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 transition-all duration-300"
                                            >
                                                Get Quote
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="py-24 bg-foreground text-background relative overflow-hidden">
                    <div className="absolute inset-0 technical-grid opacity-[0.05] pointer-events-none invert" />

                    <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
                            Need Full Specifications?
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 font-light">
                            Download our complete product catalogue containing detailed technical data sheets, integration protocols, and sustainability metrics.
                        </p>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('OPEN_CONTACT_MODAL', {
                                    detail: {
                                        mode: 'CATALOGUE',
                                        fileUrl: '/Fillezy-Catalogue-Final.pdf'
                                    }
                                }));
                            }}
                            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-primary/20"
                        >
                            Download Catalogue <Download size={16} />
                        </button>
                    </div>
                </section>

                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialMode={contactMode}
                    initialProductId={contactProductId}
                />
            </main>
            <Footer />
        </div>
    );
}
