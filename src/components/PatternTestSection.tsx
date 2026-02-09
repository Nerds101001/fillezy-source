"use client";

import { motion } from "framer-motion";

const patterns = [
    { name: "Bubble Wrap", class: "bubble-pattern", description: "Standard protective cushioning texture." },
    { name: "Hexagon Grid", class: "hexa-pattern", description: "Industrial geometry for structural integrity." },
    { name: "Technical Grid", class: "technical-grid", description: "Precise engineering and manufacturing grid." },
    { name: "Dot Matrix", class: "dots-pattern", description: "Industrial output and bio-material focus." },
    { name: "Paper Grain", class: "paper-grain", description: "Tactile natural paper feeling." }
];

export default function PatternTestSection() {
    return (
        <section className="py-24 bg-white border-t border-black/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4">
                        [ PATTERN_VISIBILITY_TEST ]
                    </h2>
                    <p className="text-black/40 text-[10px] font-mono uppercase">
                        Verifying robust pure-CSS industrial textures across all environments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {patterns.map((pattern) => (
                        <div key={pattern.name} className="flex flex-col gap-4">
                            <div className={`aspect-square rounded-3xl border border-black/10 bg-white ${pattern.class} shadow-inner flex items-center justify-center p-8`}>
                                <div className="text-[10px] font-black uppercase tracking-widest text-black/20 text-center">
                                    {pattern.name}<br />VISIBLE_CHECK
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-1">{pattern.name}</h4>
                                <p className="text-[10px] text-black/40 font-bold leading-tight">{pattern.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
