"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
    { name: "AMAZON", id: "P-01", logo: "/logos/clients/amazon.svg" },
    { name: "SNAPDEAL", id: "P-02", logo: "/logos/clients/snapdeal.png" },
    { name: "NYKAA", id: "P-03", logo: "/logos/clients/nykaa.png" },
    { name: "DELHIVERY", id: "P-04", logo: "/logos/clients/delhivery.png" },
    { name: "DHL", id: "P-05", logo: "/logos/clients/dhl.svg" },
    { name: "HEALTHKART", id: "P-06", logo: "/logos/clients/healthkart.png" },
    { name: "LIFESTYLE", id: "P-07", logo: "/logos/clients/lifestyle.png" },
    { name: "SAFE SHOP", id: "P-08", logo: "/logos/clients/safe-shop.png" },
    { name: "ADIDAS", id: "P-09", logo: "/logos/clients/adidas.svg" },
    { name: "REEBOK", id: "P-10", logo: "/logos/clients/reebok.svg" },
    { name: "HP", id: "P-11", logo: "/logos/clients/hp.svg" },
    { name: "PURPLLE", id: "P-12", logo: "/logos/clients/purplle.png" },
    { name: "PEPPERFRY", id: "P-13", logo: "/logos/clients/pepperfry.png" },
    { name: "THE BODY SHOP", id: "P-14", logo: "/logos/clients/the-body-shop.png" },
    { name: "BATH & BODY WORKS", id: "P-15", logo: "/logos/clients/bath-and-body-works.png" },
    { name: "BAGZONE", id: "P-16", logo: "/logos/clients/bagzone.png" },
    { name: "ADITYA BIRLA", id: "P-17", logo: "/logos/clients/aditya-birla.png" },
    { name: "KHADI ESSENTIALS", id: "P-18", logo: "/logos/clients/khadi-essentials.png" },
    { name: "LOUIS PHILIPPE", id: "P-19", logo: "/logos/clients/louis-philippe.png" },
    { name: "VLCC", id: "P-20", logo: "/logos/clients/vlcc.png" },
    { name: "VICTORIA'S SECRET", id: "P-21", logo: "/logos/clients/victorias-secret.svg" },
    { name: "CHARLES & KEITH", id: "P-22", logo: "/logos/clients/charles-and-keith.png" },
    { name: "ALDO", id: "P-23", logo: "/logos/clients/aldo.png" },
    { name: "SERVOTEC", id: "P-24", logo: "/logos/clients/servotec.png" },
    { name: "CATERPILLAR", id: "P-25", logo: "/logos/clients/caterpillar.png" },
    { name: "BOSCH", id: "P-26", logo: "/logos/clients/bosch.svg" },
    { name: "SMC", id: "P-27", logo: "/logos/clients/smc.svg" },
    { name: "SKF", id: "P-28", logo: "/logos/clients/skf.png" },
    { name: "THERMO KING", id: "P-29", logo: "/logos/clients/thermo-king.png" },
    { name: "MITUTOYO", id: "P-30", logo: "/logos/clients/mitutoyo.png" },
    { name: "HONDA", id: "P-31", logo: "/logos/clients/honda.svg" },
    { name: "EATON", id: "P-32", logo: "/logos/clients/eaton.svg" },
    { name: "MAN", id: "P-33", logo: "/logos/clients/man.png" },
];

export default function PartnersMarquee() {
    return (
        <section className="py-6 sm:py-16 bg-[#FAFAFA] relative overflow-hidden technical-grid hexa-pattern paper-grain">
            {/* Technical Labels */}
            <div className="absolute top-0 left-10 h-full w-px bg-black/5 hidden lg:block" />
            <div className="absolute top-0 right-10 h-full w-px bg-black/5 hidden lg:block" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-8 relative z-10">
                <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 px-4 sm:px-10 py-2 sm:py-4 rounded-2xl sm:rounded-full border border-black/10 bg-black font-mono text-[10px] sm:text-sm text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.5em] shadow-2xl max-w-full">
                    <span className="text-primary font-black whitespace-nowrap">Trusted_By:</span>
                    <span className="whitespace-nowrap">Industries & Retail Giants</span>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 350, repeat: Infinity, ease: "linear" }}
                        className="flex flex-none gap-40 py-10"
                    >
                        {[...partners, ...partners].map((partner, i) => (
                            <div key={`${partner.id}-${i}`} className="group/item relative h-20 w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain opacity-40 group-hover/item:opacity-100 transition-opacity"
                                    sizes="(max-width: 768px) 160px, 200px"
                                    priority={i < 4}
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
