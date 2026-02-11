"use client";

import { allProducts } from "@/data/allProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Box, Filter, Layers, Zap, ArrowLeft } from "lucide-react";

interface CategoryContentProps {
    category: string;
}

export default function CategoryContent({ category }: CategoryContentProps) {
    const decodedCategory = decodeURIComponent(category);

    const products = allProducts.filter(
        p => p.category.toLowerCase() === decodedCategory.toLowerCase()
    );

    // Dynamic icon selection based on category
    const getCategoryIcon = () => {
        switch (decodedCategory.toLowerCase()) {
            case "machines": return <Zap className="text-primary" size={24} />;
            case "materials": return <Layers className="text-primary" size={24} />;
            case "bio films":
            case "bio aer": return <Box className="text-primary" size={24} />;
            default: return <Activity className="text-primary" size={24} />;
        }
    };

    return (
        <div className="bg-white selection:bg-primary selection:text-white" suppressHydrationWarning>
            <Header />

            <main className="isolate min-h-screen">
                {/* ARCHITECTURAL CATEGORY HERO */}
                <div className="bg-[#F8F8F9] pt-32 lg:pt-64 pb-16 lg:pb-32 relative overflow-hidden border-b border-black/[0.03]">
                    <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

                    {/* ASYMMETRIC BACKGROUND ACCENTS */}
                    <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[60%] bg-primary/5 rounded-full blur-[120px] -rotate-12" />
                    <div className="absolute bottom-[20%] -left-[5%] w-[20%] h-[40%] bg-black/5 rounded-full blur-[100px] rotate-45" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-black/5 shadow-sm mb-6 lg:mb-10"
                        >
                            <div className="p-1.5 rounded-md bg-primary/10">
                                {getCategoryIcon()}
                            </div>
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
                                PROTOCOL_DEPLOYED // {decodedCategory.toUpperCase()}
                            </span>
                        </motion.div>

                        <div className="lg:flex lg:items-end lg:justify-between">
                            <div className="max-w-3xl">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-9xl uppercase leading-[0.85] mb-6 lg:mb-8"
                                >
                                    {decodedCategory} <span className="text-primary italic font-serif font-light lowercase">Systems.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg lg:text-xl text-foreground/50 font-medium leading-relaxed max-w-xl"
                                >
                                    High-fidelity {decodedCategory.toLowerCase()} solutions engineered for industrial-scale fulfillment and global protection.
                                </motion.p>
                            </div>

                            {/* CATEGORY STATS */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mt-12 lg:mt-0 flex gap-8 lg:gap-12 border-l border-black/5 pl-8 lg:pl-12"
                            >
                                <div>
                                    <span className="block text-[10px] font-mono font-black text-black/20 uppercase tracking-widest mb-1">AVAILABLE_SYSTEMS</span>
                                    <span className="text-3xl lg:text-4xl font-black text-foreground">{products.length.toString().padStart(2, '0')}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-mono font-black text-black/20 uppercase tracking-widest mb-1">DEPLOYMENT_READY</span>
                                    <span className="text-3xl lg:text-4xl font-black text-primary italic font-serif leading-none">Global</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID SECTION */}
                <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 lg:mb-16 gap-4">
                        <div className="flex items-center gap-4">
                            <Filter size={14} className="text-primary" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground/40">SYSTEM_INVENTORY</span>
                        </div>
                        <div className="hidden md:block h-[1px] flex-1 bg-black/5 mx-8" />
                        <span className="text-[10px] font-mono font-black text-foreground/40 uppercase tracking-widest">PAGE_01 // REF_772</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-x-8 gap-y-12 lg:gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    description={product.description}
                                    imageSrc={product.image}
                                    href={`/products/${product.id}`}
                                    techId={product.techId}
                                    category={product.category}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* TECHNICAL CTA SECTION */}
                <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24 lg:px-8">
                    <div className="bg-black rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-20 relative overflow-hidden text-center group">
                        <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 lg:mb-8 leading-tight">
                                Need a custom <span className="text-primary italic font-serif font-light lowercase">integration</span>?
                            </h2>
                            <p className="text-white/50 text-base lg:text-xl font-medium mb-10 lg:mb-12">
                                Our engineering team can architect a bespoke {decodedCategory.toLowerCase()} system tailored specifically to your warehouse layout and throughput requirements.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 rounded-xl lg:rounded-2xl bg-primary px-8 lg:px-10 py-5 lg:py-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-primary transition-all shadow-2xl shadow-primary/20"
                            >
                                [ START_TECHNICAL_CONSULT ]
                                <ArrowLeft className="rotate-180" size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
