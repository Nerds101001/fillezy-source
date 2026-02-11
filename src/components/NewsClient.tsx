"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { Newspaper, BellRing, Radio, Globe, Cast, Tv, FileText, Mic } from "lucide-react";

import { newsItems } from "@/data/news";

export default function NewsClient() {
    return (
        <div className="bg-background min-h-screen" suppressHydrationWarning>
            <Header />
            <main>
                {/* [CRAZY HERO SECTION] */}
                <section className="relative h-[60vh] md:h-[75vh] pt-24 md:pt-40 pb-12 md:pb-16 bg-[#FF6B00] overflow-hidden flex items-center justify-center">
                    {/* 1. Background Pattern - Tilted Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px]" />

                    {/* 2. Floating Vector Icons (Low Opacity) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[Newspaper, Mic, Radio, Globe, Cast, Tv, FileText].map((Icon, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0.1, 0.2, 0.1],
                                    scale: [0.8, 1, 0.8],
                                    y: [0, -20, 0],
                                    x: [0, Math.random() * 20 - 10, 0]
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="absolute text-black"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                            >
                                <Icon size={24 + Math.random() * 30} />
                            </motion.div>
                        ))}
                    </div>

                    {/* 3. Diagonal Marquees (Rotated Filmstrips) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 md:gap-8 opacity-30 rotate-[-12deg] scale-125 pointer-events-none select-none">
                        {/* Top Line */}
                        <div className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap">
                            {[...Array(5)].map((_, repeatIndex) => (
                                <div key={repeatIndex} className="flex gap-4 md:gap-8">
                                    {newsItems.map((news, i) => (
                                        <div key={`${repeatIndex}-${i}`} className="relative w-24 h-16 md:w-48 md:h-32 bg-white p-2 md:p-6 shadow-lg rotate-3 flex items-center justify-center border-2 md:border-4 border-white transform hover:scale-110 transition-transform overflow-hidden">
                                            <Image
                                                src={news.image}
                                                alt={news.category}
                                                fill
                                                className="object-contain grayscale opacity-80 p-2 md:p-6"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {/* Bottom Line (Reverse) */}
                        <div className="flex gap-4 md:gap-8 animate-marquee-reverse whitespace-nowrap">
                            {[...Array(5)].map((_, repeatIndex) => (
                                <div key={repeatIndex} className="flex gap-4 md:gap-8">
                                    {newsItems.slice().reverse().map((news, i) => (
                                        <div key={`${repeatIndex}-${i}`} className="relative w-24 h-16 md:w-48 md:h-32 bg-white p-2 md:p-6 shadow-lg -rotate-2 flex items-center justify-center border-2 md:border-4 border-white transform hover:scale-110 transition-transform overflow-hidden">
                                            <Image
                                                src={news.image}
                                                alt={news.category}
                                                fill
                                                className="object-contain grayscale opacity-80 p-2 md:p-6"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Central "Sticker" Typography */}
                    <div className="relative z-20 text-center transform rotate-[-2deg] py-4 md:py-8 px-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white px-4 py-1.5 md:px-8 md:py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-2 md:mb-4 inline-block transform -rotate-2 mt-4 md:mt-8"
                        >
                            <span className="text-xs md:text-2xl font-black uppercase tracking-widest text-black">
                                Latest Updates
                            </span>
                        </motion.div>

                        <div className="relative">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl md:text-9xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] leading-[0.9] md:leading-[0.85]"
                            >
                                NEWS <span className="text-black">&</span><br /> MEDIA
                            </motion.h1>

                            {/* "Articles" Sticker */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-4 md:-bottom-8 right-0 md:-right-12 bg-white/90 backdrop-blur px-3 py-1 md:px-6 md:py-2 shadow-xl transform rotate-3"
                            >
                                <span className="text-sm md:text-2xl font-black uppercase text-[#FF6B00]">
                                    ARTICLES
                                </span>
                            </motion.div>
                        </div>

                        {/* Description below ARTICLES - Two-tone color */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs md:text-base font-medium mt-8 md:mt-16 max-w-2xl mx-auto px-4 pb-6 md:pb-12"
                        >
                            <p className="text-white font-bold leading-relaxed">
                                <span className="text-black">Hi-Tech Group</span> and its brands featured across leading national and international media, celebrating innovations in <span className="text-black">sustainable packaging</span>, <span className="text-black">bio-materials</span>, and industrial excellence.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* News Grid - Bento Layout */}
                <section className="py-6 md:py-24 px-2 md:px-8 bg-[#FAFAFA] relative">
                    <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 auto-rows-fr">
                            {newsItems.map((news, index) => (
                                <NewsCard key={news.id} news={news} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-6 md:py-24 bg-foreground text-background">
                    <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
                        <BellRing size={24} className="mx-auto mb-3 md:mb-6 text-primary md:w-12 md:h-12" />
                        <h2 className="text-2xl font-black sm:text-5xl mb-3 md:mb-6">
                            Media Inquiries
                        </h2>
                        <p className="text-background/60 text-sm md:text-lg mb-6 md:mb-10 font-light max-w-xl mx-auto">
                            For press releases, media kits, or interview requests, please contact our communications team.
                        </p>


                        <a
                            href="mailto:media@fillezy.com"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-colors"
                        >
                            Contact Media Team
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
