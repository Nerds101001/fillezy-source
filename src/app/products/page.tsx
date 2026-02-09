"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo } from "react";
import { allProducts } from "@/data/allProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Cpu, Layers, GitBranch, Leaf } from "lucide-react";

const categories = [
    { name: "All", icon: Cpu, label: "ALL_SYSTEMS" },
    { name: "Machines", icon: GitBranch, label: "PROTO_MACH" },
    { name: "Materials", icon: Layers, label: "PROTO_MATS" },
    { name: "Integrations", icon: Info, label: "PROTO_INTS" },
    { name: "Bio Aer", icon: Leaf, label: "PROTO_BIO" },
];

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Calculate item counts for the matrix
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: allProducts.length };
        allProducts.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.techId.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    // Dynamic Hero Content
    const activeCategoryLabel = categories.find(c => c.name === activeCategory)?.label || "ALL_SYSTEMS";

    return (
        <div className="bg-white">
            <Header />

            <main className="isolate min-h-screen">
                {/* Dynamic Architectural Hero */}
                <div className="bg-[#F4F4F5] pt-56 pb-20 relative overflow-hidden border-b border-black/5">
                    <div className="absolute inset-0 technical-grid opacity-[0.05]" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 mb-6"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">
                                        ACTIVE_PROTOCOL: {activeCategoryLabel}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-6xl font-black tracking-tighter text-foreground sm:text-8xl uppercase leading-[0.85]"
                                >
                                    THE <span className="text-primary italic font-serif font-light">INVENTORY.</span>
                                </motion.h1>
                                <p className="mt-8 text-lg text-foreground/50 font-medium uppercase tracking-tight max-w-xl">
                                    Strategic deployment of industrial-scale protection protocols. High-fidelity conversion systems for global fulfillment.
                                </p>
                            </div>

                            {/* Technical Search Protocol */}
                            <div className="relative w-full md:w-80 group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Search size={16} className="text-foreground/30 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="SEARCH_BY_MODEL_OR_ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-black/10 rounded-2xl py-5 pl-12 pr-6 text-[10px] font-mono font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    {/* Industrial Category Matrix */}
                    <div className="flex flex-wrap items-center gap-3 mb-16 pb-8 border-b border-dashed border-black/10">
                        <span className="text-[9px] font-mono font-black text-foreground/30 uppercase tracking-[0.4em] mr-4">
                            PROTO_MATRIX //
                        </span>
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`group flex items-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all duration-300 border ${isActive
                                        ? "bg-black text-white border-black shadow-xl scale-105"
                                        : "bg-white border-black/5 text-foreground/40 hover:text-primary hover:border-primary/30"
                                        }`}
                                >
                                    <Icon size={14} className={isActive ? "text-primary" : "text-foreground/20 group-hover:text-primary transition-colors"} />
                                    {cat.name}
                                    <span className={`ml-2 px-1.5 py-0.5 rounded bg-foreground/5 text-[8px] ${isActive ? "text-white/40 bg-white/10" : "text-foreground/20"}`}>
                                        {categoryCounts[cat.name].toString().padStart(2, '0')}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Product Grid Area */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
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
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-40 bg-[#FAFAFA] rounded-[3rem] border border-black/5 border-dashed">
                            <Cpu size={48} className="mx-auto mb-6 text-foreground/10" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground/20 block">
                                NO_RECORDS_MATCH_PROTOCOL
                            </span>
                            <button
                                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                className="mt-8 text-primary font-mono text-[10px] font-black uppercase tracking-widest hover:underline"
                            >
                                [ RESET_SYSTEM ]
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
