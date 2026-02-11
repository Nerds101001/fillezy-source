'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Users,
    Zap,
    ShieldCheck,
    HeartPulse,
    TrendingUp,
    Globe,
    ArrowUpRight,
    FileText,
    MapPin,
    Building2
} from 'lucide-react';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import CareerModal from './CareerModal';

import { careerJobs } from '@/data/career_jobs';

const benefits = [
    {
        title: "Health & Wellness",
        desc: "Comprehensive medical and personal insurance for you and your family.",
        icon: <HeartPulse className="text-red-500" />,
        color: "from-red-500/10 to-transparent"
    },
    {
        title: "Financial Security",
        desc: "Provident Fund membership and annual performance-linked bonuses.",
        icon: <ShieldCheck className="text-blue-500" />,
        color: "from-blue-500/10 to-transparent"
    },
    {
        title: "Incentive Plans",
        desc: "Structured pay plans that reward high-impact results and dedication.",
        icon: <Zap className="text-yellow-500" />,
        color: "from-yellow-500/10 to-transparent"
    },
    {
        title: "Global Reach",
        desc: "Immense growth potential within a rapidly expanding global vertical integrator.",
        icon: <Globe className="text-primary" />,
        color: "from-primary/10 to-transparent"
    }
];

export default function CareersPageClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    const openModal = (role?: string) => {
        setSelectedRole(role || '');
        setIsModalOpen(true);
    };

    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <main className="bg-white min-h-screen selection:bg-primary selection:text-white" suppressHydrationWarning>
            <Header />

            {/* Cinematic Industrial Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                        alt="Join Fillezy"
                        fill
                        priority
                        className="object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-0 technical-grid opacity-20" />

                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="relative z-10 text-center px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <div className="h-px w-8 bg-primary" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">CAREERS_DNA</span>
                        <div className="h-px w-8 bg-primary" />
                    </motion.div>

                    <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] md:leading-[0.85] mb-6 md:mb-8">
                        Architects Of <br />
                        <span className="text-primary italic font-serif font-light lowercase">Automation.</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-white/50 text-sm md:text-base font-medium leading-relaxed tracking-wide mb-8 md:mb-0">
                        Fillezy is the core of industrial innovation. Join our mission to re-engineer global efficiency through high-fidelity machinery and chemical automation.
                    </p>

                    <div className="mt-8 md:mt-12">
                        <motion.button
                            onClick={() => openModal()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] inline-flex items-center gap-3 md:gap-4 transition-all shadow-2xl shadow-primary/20"
                        >
                            VIEW_VACANCIES <ArrowUpRight size={14} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Vertical Text Scroll Indicator */}
                <div className="absolute left-10 bottom-20 z-10 hidden lg:block origin-left -rotate-90">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-mono">SCROLL_TO_JOIN_CORE</span>
                </div>
            </section>

            {/* Culture: The Pulse Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div>
                            <div className="h-px w-10 bg-primary mb-6 md:mb-8" />
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-6 md:mb-8 leading-none">
                                We Are Looking For <br />
                                <span className="text-primary italic font-serif font-light lowercase underline decoration-black/5">Individuals.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-black/60 leading-relaxed font-medium mb-8">
                                People with the courage to take chances. Who understand that making a difference takes passion, patience, and persistence.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 rounded-3xl bg-black/5 border border-black/[0.03]">
                                    <div className="text-3xl font-black text-black mb-2">01</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">PASSION</div>
                                    <p className="text-xs text-black/40 font-medium">Fueled by industrial excellence.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-black/5 border border-black/[0.03]">
                                    <div className="text-3xl font-black text-black mb-2">02</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">PERSISTENCE</div>
                                    <p className="text-xs text-black/40 font-medium">Relentless technical optimization.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                    fill
                                    className="object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-1000"
                                    alt="Our Team"
                                />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 p-12 bg-black rounded-[3rem] shadow-2xl hidden lg:block">
                                <Users size={40} className="text-primary" />
                                <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">HI-TECH_GROUP</div>
                                <div className="text-xl font-bold text-white">45+ Years Legacy.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Bento Grid */}
            <section className="py-24 px-6 bg-[#0A0A0B] relative overflow-hidden">
                <div className="absolute inset-0 technical-grid opacity-5" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">Core Benefits.</h2>
                        <p className="text-white/30 text-lg max-w-lg">We invest in the people who build our future.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br ${b.color} backdrop-blur-3xl hover:border-white/20 transition-all group`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                    {b.icon}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{b.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Internship Program Callout */}
                    <div className="mt-12 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-r from-primary to-orange-600 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 text-center lg:text-left">
                            <div>
                                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Internship Program</h3>
                                <p className="text-white/80 max-w-xl font-medium text-sm md:text-base">Are you a student looking for real-world impact? Join our internship program and solve actual industrial challenges alongside veteran engineers.</p>
                            </div>
                            <button
                                onClick={() => openModal('Internship Program')}
                                className="px-8 py-4 md:px-12 md:py-5 bg-black text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-colors whitespace-nowrap w-full md:w-auto"
                            >
                                START_JOURNEY
                            </button>
                        </div>
                        <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
                    </div>
                </div>
            </section>

            {/* Openings: Technical Datasheets */}
            <section id="openings" className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                        <div>
                            <div className="h-px w-10 bg-primary mb-6 md:mb-8" />
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black mb-4 md:mb-6 leading-none">Open <br />Opportunities.</h2>
                            <p className="text-black/40 text-base md:text-lg">Select a component to view the role datasheet.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={12} /> PAN_INDIA
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {careerJobs.map((job, i) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-black/[0.05] bg-white hover:bg-[#FAFAFA] hover:border-black/10 transition-all duration-500 overflow-hidden"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12 relative z-10">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                                            <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/5 border border-black/5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black/40">
                                                {job.dept}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary">
                                                <TrendingUp size={10} /> HIGH_GROWTH
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter mb-3 md:mb-4 group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-black/50 text-sm md:text-base font-medium leading-relaxed mb-6 italic">
                                            &quot;{job.description}&quot;
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                            <div className="flex items-center gap-2 text-black/30 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                                <MapPin size={12} className="text-black/20" /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-black/30 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                                <Building2 size={12} className="text-black/20" /> {job.type}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                                        <a
                                            href={job.link}
                                            target="_blank"
                                            className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-black text-white hover:bg-primary transition-all shadow-xl group/btn flex-shrink-0"
                                        >
                                            <FileText size={20} className="md:w-6 md:h-6 group-hover/btn:scale-110 transition-transform" />
                                        </a>
                                        <button
                                            onClick={() => openModal(job.title)}
                                            className="flex-1 md:flex-none px-6 py-4 md:px-10 md:py-6 bg-primary text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-black transition-all shadow-2xl shadow-primary/20 whitespace-nowrap"
                                        >
                                            APPLY_NOW
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative Background Job ID */}
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 text-[120px] font-black text-black/[0.02] pointer-events-none select-none italic tracking-tighter hidden lg:block uppercase">
                                    JOB_00{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industrial Bottom Divider */}
            <div className="h-px w-full bg-black/[0.03]" />

            <Footer />

            <CareerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialRole={selectedRole}
            />
        </main>
    );
}
