"use client";

import { useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Globe, ShieldCheck, Factory, Users, Award, TrendingUp, ArrowRight, ArrowUpRight, Zap, Target } from "lucide-react";

// Counter Component for animated stats
function Counter({ value, label, sub }: { value: string, label: string, sub?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Extract number from string for animation (simple parsing)
    const number = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    return (
        <div ref={ref} className="text-center group">
            <div className="flex items-center justify-center text-5xl lg:text-7xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                {isInView ? (
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {number}{suffix}
                    </motion.span>
                ) : (
                    <span>0{suffix}</span>
                )}
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">{label}</div>
            {sub && <div className="text-[10px] uppercase tracking-widest text-foreground/40">{sub}</div>}
        </div>
    );
}

const verticals = [
    {
        name: "RUST-X",
        desc: "Manufacturing over 500+ corrosion protection products. Specializing in VCI master batches, oils, coatings, and structural emitters.",
        link: "https://rustx.net/",
        span: "lg:col-span-2 lg:row-span-2",
        color: "from-blue-600/20 to-blue-900/40 border-blue-500/30 text-blue-400",
        image: "/logo/Rustx Stack.png",
        icon: <ShieldCheck size={24} />
    },
    {
        name: "DR. BIO",
        desc: "India’s first approved bio-polymer manufacturer. 100% compostable packaging.",
        link: "https://www.drbiod.com/",
        span: "lg:col-span-1 lg:row-span-1",
        color: "from-green-600/20 to-green-900/40 border-green-500/30 text-green-400",
        image: "/logo/Dr.bio Stack.png",
        icon: <Zap size={24} />
    },
    {
        name: "KEEP IT FRESH",
        desc: "Specialized shelf-life extension solutions for global fresh produce export.",
        link: "https://keep-it-fresh.com/",
        span: "lg:col-span-1 lg:row-span-1",
        color: "from-teal-600/20 to-teal-900/40 border-teal-500/30 text-teal-400",
        image: "/logo/KIF Stack.png",
        icon: <Globe size={24} />
    },
    {
        name: "FILLEZY",
        desc: "High-speed protective automation and void-fill systems for global e-commerce.",
        link: "https://www.fillezy.com/",
        span: "lg:col-span-2 lg:row-span-1",
        color: "from-primary/20 to-orange-900/40 border-primary/30 text-primary",
        image: "/logo/Fillezy Stack.png",
        icon: <Factory size={24} />
    },
    {
        name: "TUFFPAULIN",
        desc: "Multi-layered cross-laminated weatherproof tarpaulins with 15-year durability.",
        link: "https://www.tuffpaulin.com/",
        span: "lg:col-span-1 lg:row-span-1",
        color: "from-yellow-600/20 to-yellow-900/40 border-yellow-500/30 text-yellow-400",
        image: "/logo/tuffpaulin.png",
        icon: <Target size={24} />
    },
    {
        name: "ZORBIT",
        desc: "Engineered pharma desiccants and moisture absorbers for sensitive supply chains.",
        link: "https://www.zorbitusa.com/",
        span: "lg:col-span-1 lg:row-span-1",
        color: "from-purple-600/20 to-purple-900/40 border-purple-500/30 text-purple-400",
        image: "/logo/Zorbit logo.png",
        icon: <ShieldCheck size={24} />
    }
];

export default function AboutClient() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="bg-background min-h-screen overflow-hidden selection:bg-primary selection:text-white">
            <Header />

            {/* Cinematic Sticky Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0A0A0B]" />
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen" />
                    </div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 technical-grid opacity-10" />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 mb-12"
                        >
                            <div className="h-px w-12 bg-primary" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-primary">
                                HI_TECH_GROUP // EST_1985
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white uppercase leading-[0.8] mb-12 drop-shadow-2xl">
                                Industrial <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary/50 italic font-serif font-light lowercase tracking-normal">
                                    DNA.
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-2xl"
                        >
                            <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed mb-12">
                                Since 1985, we've been architecting the future of industrial protection. A global ecosystem of 6 specialized brands unified by a mission of <strong className="text-white">Total Protection</strong>.
                            </p>

                            <div className="flex flex-wrap gap-8 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                <img src="/new-logo/footer-icons.png" alt="Group Brands" className="h-10 w-auto object-contain" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4 relative hidden lg:block">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/5 rounded-full"
                        />
                        <div className="p-16 rounded-full border border-white/10 backdrop-blur-3xl bg-white/5 relative z-10 overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 text-center">
                                <Globe className="w-16 h-16 text-primary mx-auto mb-6 animate-spin-slow" />
                                <div className="text-6xl font-black text-white mb-2 tracking-tighter">45+</div>
                                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-primary">COUNTRIES_SERVED</div>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-10 flex flex-col items-start gap-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-primary/40" />
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">SCROLL_FOR_DNA</span>
                    </div>
                </motion.div>
            </section>

            {/* Industrial Synergy: Content & Corporate Video */}
            <section className="py-20 bg-[#FAFAFA] relative overflow-hidden border-b border-black/[0.03]">
                <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Column 1: Detailed Group Description */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <div className="h-px w-8 bg-primary" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">CORPORATE_DNA</span>
                            </motion.div>
                            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black mb-8 leading-[0.9]">
                                Hi-Tech <br />
                                <span className="text-primary italic font-serif font-light lowercase">Synergy.</span>
                            </h2>
                            <p className="text-lg text-black/70 font-medium leading-relaxed mb-6">
                                Hi-Tech Group is a global leader in protective packaging and chemical automation. From its inception as a specialized VCI manufacturer, the group has evolved into a hyper-integrated industrial powerhouse.
                            </p>
                            <p className="text-sm text-black/50 leading-relaxed mb-8">
                                We engineer end-to-end reliability for global supply chains, controlling every atomic layer of protection—from proprietary polymer synthesis and VCI chemistry to the high-fidelity warehouse automation systems of <strong className="text-black">Fillezy</strong>.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <div className="px-6 py-3 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Target size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-0.5">ESTABLISHED</div>
                                        <div className="text-xs font-black text-black">1985 // LUDHIANA, INDIA</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-4">FLAGSHIP_DIVISIONS</div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {["RUST-X", "DR. BIO", "KEEP IT FRESH", "FILLEZY", "TUFFPAULIN", "ZORBIT"].map((brand) => (
                                        <div key={brand} className="px-4 py-2 rounded-xl bg-black/5 border border-black/5 text-[10px] font-black text-black/60 uppercase tracking-widest text-center">
                                            {brand}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Premium Video Console */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="relative z-10 p-6 rounded-[3.5rem] bg-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-b-xl" />
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-[#0A0A0B] group">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/UyZrtOo_DC0?autoplay=0&controls=1&rel=0&modestbranding=1"
                                        title="Hi-Tech Group Corporate Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />

                                    {/* Glassmorphic Brand Overlay */}
                                    <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3">
                                            <img src="/logo/Fillezy Stack.png" alt="Fillezy" className="h-4 w-auto brightness-0 invert" />
                                            <div className="w-px h-3 bg-white/20" />
                                            <span className="text-[8px] font-mono text-white/60 tracking-tighter">LIVE_FEED // HQ</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Console Controls (Visual Only) */}
                                <div className="mt-6 flex items-center justify-between px-4">
                                    <div className="flex gap-1.5 font-mono text-[8px] font-black text-white/20">
                                        <span className="text-primary tracking-widest uppercase">REC_</span>
                                        <span>00:02:45:12</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-px w-20 bg-white/5" />
                                        <img src="/logo/Fillezy Stack.png" alt="Fillezy" className="h-6 w-auto brightness-0 invert opacity-40" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Accents */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 rounded-full blur-[80px] -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Fillezy: The Automation Core */}
            <section id="fillezy-core" className="py-20 px-6 relative bg-white overflow-hidden">
                <div className="absolute inset-0 technical-grid opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                            >
                                THE STAR // FILLEZY®
                            </motion.div>
                            <h2 className="text-6xl md:text-[7rem] font-black uppercase tracking-tighter text-black mb-10 leading-[0.85]">
                                The Core of <br />
                                <span className="text-primary italic font-serif font-light lowercase">Automation.</span>
                            </h2>
                            <p className="text-2xl text-black/60 font-medium leading-relaxed mb-12 max-w-2xl">
                                Fillezy is the crown jewel of Hi-Tech Group's automation ecosystem. We engineer high-speed, precision-driven void-fill and protective packaging systems that define the standards of modern e-commerce fulfillment.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                {[
                                    { title: "Hexa Integration", desc: "Multimodal void-fill systems for high-volume logistics." },
                                    { title: "Rapid Precision", desc: "Industry-leading speed with smart resource optimization." }
                                ].map((feature) => (
                                    <div key={feature.title} className="p-8 rounded-3xl bg-[#F8F8F9] border border-black/[0.03]">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                            <Zap size={18} className="text-primary" />
                                        </div>
                                        <h4 className="text-xl font-black text-black mb-3">{feature.title}</h4>
                                        <p className="text-sm text-black/40 font-medium">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/products" className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-2xl group">
                                EXPLORE_FILLEZY_MACHINERY <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group">
                                <img
                                    src="/logo/Fillezy Stack.png"
                                    alt="Fillezy Machine"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-10 left-10">
                                    <div className="text-4xl font-black text-white tracking-tighter">HEXA_PROTOCOL</div>
                                    <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest mt-2">Next-Gen Void Fill Integration</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Science of RUST-X Section */}
            <section id="vci" className="py-20 px-6 relative bg-[#0A0A0B] overflow-hidden">
                <div className="absolute inset-0 technical-grid opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-5 relative">
                        <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full opacity-20 animate-pulse-slow" />
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-white shadow-2xl p-16 flex items-center justify-center group">
                            <motion.img
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                src="/logo/VCI TEST.png"
                                alt="RUST-X VCI Test"
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                            <div className="absolute inset-0 border-[20px] border-black/5 pointer-events-none" />
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                        >
                            DIVISION // RUST-X
                        </motion.div>
                        <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter text-white mb-10 leading-[0.9]">The Science <br /><span className="text-primary italic font-serif font-light lowercase">Verification.</span></h2>
                        <p className="text-xl text-white/50 leading-relaxed font-normal mb-8 max-w-2xl">
                            Our sister division, <strong className="text-white">RUST-X</strong>, is the global benchmark for corrosion engineering. The **Razor blade** and **VIA** tests are the only scientific methods to verify molecular protection.
                        </p>
                        <p className="text-lg text-white/30 leading-relaxed font-normal mb-12 max-w-2xl">
                            Fillezy systems are architected to integrate this RUST-X VCI technology, providing high-speed automation with the world's most trusted chemical protection.
                        </p>
                        <Link href="https://rustx.net" target="_blank" className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl group">
                            RUSTX_PROTOCOL_DEEPDIVE <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Verticals Grid: The 6 Pillars */}
            <section id="verticals" className="py-32 px-6 relative bg-[#0A0A0B] overflow-hidden">
                <div className="absolute inset-0 technical-grid opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                            >
                                SYSTEM_ARCHITECTURE // 6_PILLARS
                            </motion.div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">Ecosystem.</h2>
                            <p className="text-xl text-white/40 font-medium">
                                A hyper-integrated network of specialized brands ensuring <strong className="text-white">Zero Defect</strong> global supply chain protection.
                            </p>
                        </div>
                        <div className="hidden md:block w-32 h-[1px] bg-white/20 mb-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-[300px]">
                        {verticals.map((v, i) => (
                            <motion.a
                                key={v.name}
                                href={v.link}
                                target="_blank"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`group relative p-10 rounded-[3rem] border border-white/5 flex flex-col justify-between overflow-hidden ${v.span} bg-gradient-to-br ${v.color} backdrop-blur-3xl hover:border-white/20 transition-all duration-500`}
                            >
                                <div className="absolute inset-0 -z-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 technical-grid" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                                        {v.icon}
                                    </div>
                                    <ArrowUpRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none">{v.name}</h3>
                                    <p className="text-xs font-semibold text-white/40 group-hover:text-white/80 transition-colors leading-relaxed max-w-[250px]">
                                        {v.desc}
                                    </p>
                                </div>

                                {/* Floating Brand Logo */}
                                <div className="absolute -bottom-4 -right-4 w-40 h-40 opacity-10 group-hover:opacity-30 transition-all duration-1000 rotate-12 group-hover:rotate-0">
                                    <img src={v.image} alt={v.name} className="w-full h-full object-contain filter brightness-0 invert" />
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Certifications Row */}
                    <Link href="/certifications" className="mt-6 p-12 rounded-[4rem] bg-white text-black flex flex-wrap justify-between items-center gap-12 group overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 technical-grid opacity-[0.03]" />
                        <div className="relative z-10">
                            <h5 className="text-2xl font-black uppercase tracking-tighter mb-2">Technical Compliance Registry</h5>
                            <p className="text-[10px] text-black/30 font-mono uppercase tracking-[0.4em] leading-relaxed">
                                REACH_CERTIFIED • ROHS_PROTOCOL • ISO_9001/14001 • FSSC_COMPLIANT
                            </p>
                        </div>
                        <div className="relative z-10 flex items-center gap-12">
                            <img src="/new-logo/footer-icons.png" alt="Industrial Certifications" className="h-10 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-500" />
                            <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center group-hover:bg-primary transition-all shadow-xl">
                                <ArrowUpRight className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Modern Leadership Section */}
            <section className="py-20 bg-[#0A0A0B] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div>
                            <div className="h-px w-12 bg-primary mb-8" />
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">Visionaries.</h2>
                            <p className="text-xl text-white/30 max-w-md font-medium">Architecting the future of global supply chains with integrity.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Mr. Jasbeer Sareen",
                                role: "Managing Director",
                                bio: "The founding visionary. 40 years of steering exponential growth and establishing a legacy of industrial integrity.",
                                image: "/logo/JS-SIR-MD-1.jpg"
                            },
                            {
                                name: "Mr. Sidharth Sareen",
                                role: "Director Technical",
                                bio: "Chemical Engineer (Shell/Montell). The brain behind our sustainable formulations and patented breakthroughs.",
                                image: "/logo/SID SIR.jpg"
                            },
                            {
                                name: "Mr. Mukul Sareen",
                                role: "Director Business Dev.",
                                bio: "Supply Chain Expert (ex-Coca-Cola). Leading global expansion and technical integration strategies.",
                                badge: "🏆 Economic Times 40 Under 40",
                                image: "/logo/Mukul Sir.png"
                            }
                        ].map((leader, i) => (
                            <motion.div
                                key={leader.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative h-[550px] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10"
                            >
                                {leader.badge && (
                                    <div className="absolute top-8 right-8 z-30">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 5, -5, 0],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="px-6 py-2 bg-gradient-to-r from-primary to-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,102,0,0.5)] border border-white/20 backdrop-blur-md flex items-center gap-2"
                                        >
                                            <Award size={12} className="text-white animate-pulse" />
                                            {leader.badge}
                                        </motion.div>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-700 z-10" />

                                <div className="absolute bottom-0 left-0 right-0 p-12 transform translate-y-12 group-hover:translate-y-0 transition-all duration-700 z-20">
                                    <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-8">
                                        {leader.role}
                                    </div>
                                    <h3 className="text-5xl font-black text-white mb-8 leading-none tracking-tighter">{leader.name}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 font-medium max-w-xs">
                                        {leader.bio}
                                    </p>
                                </div>

                                <div className="absolute inset-0 -z-0">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top transition-all duration-[1.5s] group-hover:scale-110 filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Scale Section */}
            <section id="global" className="py-20 bg-white relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-5">
                            <h2 className="text-6xl font-black uppercase tracking-tighter mb-12 text-black leading-none">Global Scale.<br /><span className="text-primary italic font-serif font-light lowercase">Local Reach.</span></h2>
                            <p className="text-black/50 text-xl mb-12 leading-relaxed font-medium">
                                With manufacturing facilities across 4 continents and distributors in over 45 countries, we are everywhere your supply chain needs to be.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-black text-white rounded-2xl shadow-xl"><Factory size={24} /></div>
                                    <div>
                                        <h4 className="font-black text-black uppercase tracking-widest text-xs mb-4">Operations Matrix</h4>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                            {["Mumbai, India", "Delhi, India", "California, USA", "Lyon, France", "Nordic Region", "Australia", "Italy", "Ludhiana, India"].map((hub) => (
                                                <div key={hub} className="text-[11px] text-black/40 font-black flex items-center gap-3 uppercase tracking-tighter">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {hub}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-black text-white rounded-2xl shadow-xl"><Users size={24} /></div>
                                    <div>
                                        <h4 className="font-black text-black uppercase tracking-widest text-xs mb-4">Workforce Protocol</h4>
                                        <p className="text-sm text-black/40 font-medium">~1400 Specialists (47% Female Representation)</p>
                                        <p className="text-sm text-black/40 font-medium mt-1">150+ Technical Service Managers</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-[#F8F8F9] rounded-[4rem] p-16 border border-black/[0.03] relative overflow-hidden shadow-2xl shadow-black/[0.02]">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03]"><Globe size={180} /></div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-12 text-black relative z-10">Trusted Engineering Partners</h3>
                            <div className="flex flex-wrap gap-4 relative z-10">
                                {[
                                    "Coca-Cola", "Burger King", "Amazon", "KFC", "Zomato", "Samsung",
                                    "Honda", "Volvo", "Suzuki", "Yamaha", "Tata Steel",
                                    "Adidas", "Puma", "Amway", "Lockheed Martin"
                                ].map((client) => (
                                    <span key={client} className="px-6 py-3 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-black/40 shadow-sm border border-black/5 hover:text-primary transition-colors cursor-default">
                                        {client}
                                    </span>
                                ))}
                                <span className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary/40 self-center">
                                    + OVER 10,000 GLOBAL CLIENTS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
