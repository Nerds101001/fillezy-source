"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "APPLE", id: "P-01", logo: "https://cdn.simpleicons.org/apple/000000" },
    { name: "AMAZON", id: "P-02", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "WALMART", id: "P-03", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png" },
    { name: "PHILIPS", id: "P-04", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png" },
    { name: "KENCO", id: "P-05", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kenco_logo.svg/2560px-Kenco_logo.svg.png" },
    { name: "FEDEX", id: "P-06", logo: "https://cdn.simpleicons.org/fedex/4D148C" },
    { name: "DELL", id: "P-07", logo: "https://cdn.simpleicons.org/dell/007DB8" },
    { name: "COLGATE", id: "P-08", logo: "https://cdn.simpleicons.org/colgate/D01625" },
    { name: "BOSCH", id: "P-09", logo: "https://cdn.simpleicons.org/bosch/000000" }
];

export default function PartnersMarquee() {
    return (
        <section className="py-20 sm:py-24 bg-[#FAFAFA] relative overflow-hidden technical-grid hexa-pattern paper-grain">
            {/* Technical Labels */}
            <div className="absolute top-0 left-10 h-full w-px bg-black/5 hidden lg:block" />
            <div className="absolute top-0 right-10 h-full w-px bg-black/5 hidden lg:block" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-12 relative z-10">
                <div className="inline-flex items-center gap-6 px-10 py-4 rounded-full border border-black/10 bg-black font-mono text-sm text-white/50 uppercase tracking-[0.5em] shadow-2xl">
                    <span className="text-primary font-black">Trusted_By:</span> 1000+ Enterprises Worldwide
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex flex-none gap-40 py-10"
                    >
                        {[...partners, ...partners].map((partner, i) => (
                            <div key={`${partner.id}-${i}`} className="group/item flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-20 w-auto object-contain opacity-40 group-hover/item:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Subtle Industrial Accent */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center opacity-20">
                <div className="h-px bg-black w-24" />
                <div className="font-mono text-[8px] uppercase tracking-[1em] text-black">Global_Network_Operations</div>
                <div className="h-px bg-black w-24" />
            </div>

            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-60 bg-gradient-to-l from-background to-transparent z-10" />
        </section>
    );
}
