"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { newsItems } from "@/data/news";
import NewsCard from "@/components/NewsCard";

export default function NewsMediaSection() {
    return (
        <section className="py-24 bg-[#FAFAFA] relative overflow-hidden border-y border-black/5">
            {/* Background Grid */}
            <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* [ HEADER: News & Media Feed - NEW INDUSTRIAL LIGHT STYLE ] */}
                <div className="mb-20">
                    <div className="text-[10px] font-mono text-black/30 font-black uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
                        <span className="h-px w-8 bg-primary" />
                        MEDIA_COMMUNICATIONS_FEED
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black tracking-tight text-black sm:text-6xl uppercase leading-[0.9] mb-4">
                                Media Presence <br />
                                <span className="text-primary italic font-serif font-light lowercase">In global markets.</span>
                            </h2>
                        </div>
                        <div className="max-w-md pb-2">
                            <p className="text-lg text-black/60 font-bold leading-[1.3] mb-2">
                                Discover the latest innovations, expansion news, and industrial insights from Fillezy's global operations.
                            </p>
                            <Link href="/news" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-5 transition-all">
                                View News Archive <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* [ CONTENT: Using NewsCard Component - 3 Standard Cards ] */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.slice(1, 4).map((item, i) => (
                        <NewsCard key={item.id} news={item} index={i + 1} />
                    ))}
                </div>

                {/* Press & News Agency Registry - ARCHITECTURAL LOGO STRIP */}
                <div className="mt-8 pt-8 border-t border-black/10 relative overflow-hidden">
                    <div className="flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            className="flex flex-none py-8"
                        >
                            {[
                                { name: "Financial Express", logo: "/new-logo/financial.jpg" },
                                { name: "Economic Times", logo: "/new-logo/Economic-Times.png" },
                                { name: "The Better India", logo: "/new-logo/Better-India.jpg" },
                                { name: "The Indian Express", logo: "/new-logo/Indian-Express.jpg" },
                                { name: "Your Story", logo: "/new-logo/the-truth-one-main1.png" },
                                { name: "360 Packaging", logo: "/new-logo/360-Packaging-1.jpg" },
                                { name: "Plex Concil", logo: "/new-logo/Plex-Concil.jpg" },
                                { name: "Business India", logo: "/new-logo/Business-India1-2.png" },
                                { name: "Forbes", logo: "/new-logo/forbes1-1.png" },
                                { name: "SME World", logo: "/new-logo/SME-World.png" },
                                { name: "Manufacturing Today", logo: "/new-logo/manufacturing-Today.jpg" },
                                { name: "ANI", logo: "/new-logo/ANI.png" },
                                { name: "Bio Spectrum", logo: "/new-logo/Bio-Spectrum.png" },
                                { name: "The Business Line", logo: "/new-logo/The-Business-Line.jpg" }
                            ].concat([
                                { name: "Financial Express", logo: "/new-logo/financial.jpg" },
                                { name: "Economic Times", logo: "/new-logo/Economic-Times.png" },
                                { name: "The Better India", logo: "/new-logo/Better-India.jpg" },
                                { name: "The Indian Express", logo: "/new-logo/Indian-Express.jpg" },
                                { name: "Your Story", logo: "/new-logo/the-truth-one-main1.png" },
                                { name: "360 Packaging", logo: "/new-logo/360-Packaging-1.jpg" },
                                { name: "Plex Concil", logo: "/new-logo/Plex-Concil.jpg" },
                                { name: "Business India", logo: "/new-logo/Business-India1-2.png" },
                                { name: "Forbes", logo: "/new-logo/forbes1-1.png" },
                                { name: "SME World", logo: "/new-logo/SME-World.png" },
                                { name: "Manufacturing Today", logo: "/new-logo/manufacturing-Today.jpg" },
                                { name: "ANI", logo: "/new-logo/ANI.png" },
                                { name: "Bio Spectrum", logo: "/new-logo/Bio-Spectrum.png" },
                                { name: "The Business Line", logo: "/new-logo/The-Business-Line.jpg" }
                            ]).map((agency, idx) => (
                                <div key={`${agency.name}-${idx}`} className="flex items-center justify-center w-[240px] h-32 grayscale hover:grayscale-0 transition-all duration-700 opacity-40 hover:opacity-100">
                                    <img
                                        src={agency.logo}
                                        alt={agency.name}
                                        className="max-h-20 max-w-[200px] w-auto h-auto object-contain"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
