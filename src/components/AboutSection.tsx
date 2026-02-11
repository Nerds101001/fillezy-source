"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Factory, Zap, Target } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const features = [
    {
        title: "Industrial Precision",
        desc: "Manufacturing systems that operate with micron-level accuracy.",
        icon: Factory,
    },
    {
        title: "Peak Efficiency",
        desc: "Optimized throughput with Reach Approved, biodegradable corn starch materials.",
        icon: Zap,
    },
    {
        title: "Global Standards",
        desc: "Certified compliance with international safety and quality protocols.",
        icon: Target,
    },
];

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="relative bg-background py-32 overflow-hidden grain">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div style={{ scale, opacity }} className="relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-foreground/10 shadow-2xl">
                            <Image
                                src="/product/Paper Smart machine.webp"
                                alt="Fillezy Facility"
                                fill
                                priority
                                className="object-cover grayscale dark:brightness-50 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        </div>

                        <div className="absolute -bottom-10 -right-10 p-8 rounded-3xl glass hidden md:block">
                            <h4 className="text-4xl font-black text-foreground">25+</h4>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary">Years Experience</p>
                        </div>
                    </motion.div>

                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
                        >
                            Our Heritage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tight text-foreground sm:text-7xl mb-12 leading-tight"
                        >
                            Engineering <br /><span className="text-primary italic font-serif font-light">Integrity.</span>
                        </motion.h2>

                        <div className="space-y-10">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-8 group"
                                >
                                    <div className="flex-none p-5 rounded-2xl bg-foreground/5 border border-foreground/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <feature.icon size={26} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
                                        <p className="text-foreground/50 font-light leading-relaxed text-lg group-hover:text-foreground/70 transition-colors">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 p-10 rounded-[2.5rem] glass border border-foreground/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
                            <p className="text-foreground italic font-serif text-xl leading-relaxed relative z-10">
                                "Our mission is to be a knowledge-based provider, backed by scientists and engineers, delivering protective solutions that prevent damages up to 100% while prioritizing global sustainability."
                            </p>
                            <div className="mt-8 flex items-center gap-4 relative z-10">
                                <div className="h-[1px] w-10 bg-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Fillezy Leadership Team</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function FeatureItem({ feature, index }: { feature: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
            <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-2">
                <CheckCircle2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    )
}
