"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { label: "Manufacturing Units", value: 15, suffix: "+" },
    { label: "Global Distributors", value: 120, suffix: "+" },
    { label: "Happy Clients", value: 500, suffix: "+" },
    { label: "Countries Served", value: 25, suffix: "+" },
];

export default function StatsSection() {
    return (
        <section className="relative py-32 bg-background overflow-hidden grain border-t border-foreground/5">
            <div className="absolute inset-0 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] text-foreground" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl font-sans leading-tight">
                            Global Scale. <br /><span className="text-primary italic font-serif font-light">Technical Precision.</span>
                        </h2>
                        <p className="mt-6 text-xl leading-relaxed text-foreground/60 font-light max-w-2xl mx-auto">
                            Our extensive network ensures that wherever you are, Fillezy is there to protect your products with industrial reliability.
                        </p>
                    </div>
                    <dl className="grid grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Counter key={stat.label} stat={stat} index={index} />
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}

function Counter({ stat, index }: { stat: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="group flex flex-col items-center justify-center glass p-12 rounded-[3rem] border border-foreground/5 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
            <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 mb-6 group-hover:text-primary transition-colors">{stat.label}</dt>
            <dd className="order-first text-7xl font-black tracking-tighter text-foreground mb-2 group-hover:scale-110 transition-transform duration-500">
                {isInView ? (
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                        {stat.value}<span className="text-primary italic font-serif font-light">{stat.suffix}</span>
                    </motion.span>
                ) : (
                    <span>0</span>
                )}
            </dd>
        </div>
    );
}
