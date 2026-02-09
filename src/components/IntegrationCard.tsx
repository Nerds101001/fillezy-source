"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface IntegrationProps {
    title: string;
    description: string;
    image: string;
    benefit: string;
    id?: string;
}

export default function IntegrationCard({ system, index }: { system: IntegrationProps; index: number }) {
    const CardContent = (
        <div className="group relative h-[400px] overflow-hidden rounded-[2rem] bg-foreground text-background">
            <div className="absolute inset-0 z-0">
                <img
                    src={system.image}
                    alt={system.title}
                    className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-transparent" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="mb-auto flex justify-end">
                    <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <ArrowUpRight size={18} className="text-white" />
                    </div>
                </div>

                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-2">{system.benefit}</span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                    {system.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed max-w-sm">
                    {system.description}
                </p>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {system.id ? (
                <Link href={`/products/${system.id}`} className="block">
                    {CardContent}
                </Link>
            ) : CardContent}
        </motion.div>
    );
}
