"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

interface IndustryProps {
    title: string;
    image: string;
    challenge: string;
    solution: string;
    products: string[];
}

export default function IndustryCard({ industry, index }: { industry: IndustryProps; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-foreground text-background h-[500px] flex flex-col justify-end"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 p-8 sm:p-10">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                        {industry.title}
                    </span>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-4">
                        {industry.challenge}
                    </h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed border-l-2 border-primary/40 pl-4 mb-6">
                        {industry.solution}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wide text-white/40">
                        {industry.products.slice(0, 2).map(prod => (
                            <span key={prod} className="flex items-center gap-1">
                                <Check size={10} className="text-primary" /> {prod}
                            </span>
                        ))}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <ArrowRight size={16} className="text-white" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
