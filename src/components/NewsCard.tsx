"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";

interface NewsProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    link?: string;
}

export default function NewsCard({ news, index }: { news: NewsProps; index: number }) {
    const isFeatured = index === 0 || index === 7;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`group relative flex flex-col h-full overflow-hidden transition-all duration-500 rounded-xl ${isFeatured
                ? "md:col-span-2 md:row-span-2 bg-white shadow-lg border border-black/10 hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.25)]"
                : "col-span-1 bg-white hover:bg-white/50 border border-black/10 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(255,107,53,0.2)]"
                }`}
        >
            {isFeatured ? (
                // [FEATURED LAYOUT - MAGAZINE STYLE]
                <div className="flex flex-col h-full relative z-20">
                    {/* Large Image Area - Mobile: same height as standard (h-24) */}
                    <div className="h-24 md:h-[55%] relative flex items-center justify-center p-2 md:p-12 bg-[#F5F5F7] group-hover:bg-[#EFEFF1] transition-colors">
                        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]" />
                        <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-contain mix-blend-multiply filter contrast-125 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 md:top-6 md:left-6 z-30">
                            <span className="px-1.5 py-0.5 md:px-4 md:py-2 rounded bg-black text-white text-[6px] md:text-[10px] font-black uppercase tracking-widest shadow-lg">
                                {news.category}
                            </span>
                        </div>
                        {/* Date Badge */}
                        <div className="absolute top-2 right-2 md:top-6 md:right-6 z-30">
                            <span className="inline-flex items-center gap-1 md:gap-2 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md bg-white/90 backdrop-blur-md border border-black/5 shadow-sm text-[6px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-black/60">
                                <Calendar size={8} className="text-primary md:w-[10px] md:h-[10px]" />
                                {news.date}
                            </span>
                        </div>
                    </div>

                    {/* Content Area - Mobile: Compact styles identical to standard */}
                    <div className="flex-1 md:h-[45%] p-2 md:p-10 flex flex-col justify-between bg-white relative">
                        <div>
                            <span className="text-primary text-[6px] md:text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5 md:mb-3 block truncate">
                                TOP_STORY // {news.id.split('-')[0].toUpperCase()}
                            </span>
                            <h3 className="text-xs md:text-4xl font-black text-[#1A1C1E] uppercase leading-[1] md:leading-[0.9] mb-1 md:mb-6 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
                                {news.title}
                            </h3>
                            <p className="text-[#1A1C1E]/60 text-[8px] md:text-lg font-medium leading-[1.4] mb-1.5 md:mb-6 line-clamp-3">
                                {news.excerpt}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-1.5 md:pt-6 border-t border-black/5 mt-auto">
                            <span className="text-[7px] md:text-xs font-black uppercase tracking-widest text-[#1A1C1E]">Read Feature</span>
                            <Link href={news.link || `/news/${news.id}`} target="_blank" className="w-5 h-5 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-primary transition-colors">
                                <ArrowUpRight size={10} className="md:w-5 md:h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // [STANDARD LAYOUT - ARCHITECTURAL CARD]
                <>
                    {/* Technical Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-black/20 group-hover:border-primary transition-colors z-10" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-black/20 group-hover:border-primary transition-colors z-10" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-black/20 group-hover:border-primary transition-colors z-10" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-black/20 group-hover:border-primary transition-colors z-10" />

                    <div className="relative overflow-hidden h-24 md:h-48 bg-[#F4F4F5] flex items-center justify-center p-2 md:p-8 group-hover:bg-[#F0F0F0] transition-colors">
                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                        <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-contain mix-blend-multiply filter contrast-125 transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Floating Tag */}
                        <div className="absolute top-2 left-2 md:top-4 md:left-4">
                            <span className="inline-flex items-center gap-1 md:gap-2 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md bg-white/80 backdrop-blur-md border border-black/5 shadow-sm">
                                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[6px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-black/70">
                                    {news.category}
                                </span>
                            </span>
                        </div>
                        {/* Date Badge */}
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-30">
                            <span className="inline-flex items-center gap-1 md:gap-2 px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md bg-white/90 backdrop-blur-md border border-black/5 shadow-sm text-[6px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-black/60">
                                <Calendar size={8} className="text-primary md:w-[10px] md:h-[10px]" />
                                {news.date}
                            </span>
                        </div>
                    </div>

                    <div className="p-2 md:p-6 flex flex-col flex-grow relative border-t border-black/5">
                        <div className="mb-1 md:mb-4">
                            <span className="text-[6px] md:text-[9px] font-mono text-primary font-bold uppercase tracking-widest mb-0.5 md:mb-2 block opacity-100 md:opacity-0 group-hover:opacity-100 transform md:-translate-y-2 group-hover:translate-y-0 transition-all duration-300 truncate">
                                ID: {news.id.split('-')[0].toUpperCase()}
                            </span>
                            <h3 className="font-black text-[#1A1C1E] uppercase leading-[1] md:leading-[0.9] group-hover:text-primary transition-colors font-sans text-xs md:text-lg line-clamp-2">
                                {news.title}
                            </h3>
                        </div>

                        <p className="text-[#1A1C1E]/60 font-medium text-[8px] md:text-xs leading-[1.4] mb-1.5 md:mb-6 line-clamp-3">
                            {news.excerpt}
                        </p>

                        <div className="mt-auto pt-1.5 md:pt-4 border-t border-dashed border-black/10 flex items-center justify-between">
                            <span className="text-[6px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-[#1A1C1E]/40 group-hover:text-[#1A1C1E] transition-colors">
                                Read
                            </span>
                            <Link
                                href={news.link || `/news/${news.id}`}
                                target="_blank"
                                className="w-5 h-5 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-black/5 text-black group-hover:bg-primary group-hover:text-white transition-all"
                            >
                                <ArrowUpRight size={10} className="md:w-[14px] md:h-[14px]" />
                            </Link>
                        </div>
                    </div>
                </>
            )
            }
        </motion.div >
    );
}
