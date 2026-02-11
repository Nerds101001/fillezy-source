"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CategoryHeroProps {
    title: string;
    subtitle: string;
    description: string;
    badgeText: string;
    icon: React.ReactNode;
}

export default function CategoryHero({ title, subtitle, description, badgeText, icon }: CategoryHeroProps) {
    return (
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
                        {badgeText}
                    </span>
                </motion.div>

                <div className="lg:flex lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground sm:text-9xl uppercase leading-[0.85] mb-8"
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
    );
}
