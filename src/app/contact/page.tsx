"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, ArrowUpRight, MessageSquare, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Captcha from "@/components/Captcha";

// Dynamic import for map to avoid SSR issues
const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
    ssr: false,
    loading: () => (
        <div className="h-[700px] flex items-center justify-center bg-[#0B0F14] rounded-2xl border border-white/10">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                <p className="text-sm font-medium text-white/40">Loading interactive map...</p>
            </div>
        </div>
    )
});

export default function Contact() {
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        captchaInput: "",
    });

    const [countryCode, setCountryCode] = useState("+91");
    const [captchaValue, setCaptchaValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const countryCodes = [
        { code: "+91", label: "IND", name: "India", flag: "🇮🇳" },
        { code: "+1", label: "USA", name: "United States", flag: "🇺🇸" },
        { code: "+44", label: "GBR", name: "United Kingdom", flag: "🇬🇧" },
        { code: "+971", label: "ARE", name: "UAE", flag: "🇦🇪" },
        { code: "+49", label: "DEU", name: "Germany", flag: "🇩🇪" },
        { code: "+33", label: "FRA", name: "France", flag: "🇫🇷" },
        { code: "+61", label: "AUS", name: "Australia", flag: "🇦🇺" },
        { code: "+81", label: "JPN", name: "Japan", flag: "🇯🇵" },
        { code: "+65", label: "SGP", name: "Singapore", flag: "🇸🇬" },
        { code: "+1", label: "CAN", name: "Canada", flag: "🇨🇦" },
        { code: "+39", label: "ITA", name: "Italy", flag: "🇮🇹" },
        { code: "+34", label: "ESP", name: "Spain", flag: "🇪🇸" },
        { code: "+31", label: "NLD", name: "Netherlands", flag: "🇳🇱" },
        { code: "+41", label: "CHE", name: "Switzerland", flag: "🇨🇭" },
        { code: "+46", label: "SWE", name: "Sweden", flag: "🇸🇪" },
        { code: "+7", label: "RUS", name: "Russia", flag: "🇷🇺" },
        { code: "+86", label: "CHN", name: "China", flag: "🇨🇳" },
        { code: "+82", label: "KOR", name: "South Korea", flag: "🇰🇷" },
        { code: "+55", label: "BRA", name: "Brazil", flag: "🇧🇷" },
        { code: "+52", label: "MEX", name: "Mexico", flag: "🇲🇽" },
        { code: "+966", label: "SAU", name: "Saudi Arabia", flag: "🇸🇦" },
        { code: "+974", label: "QAT", name: "Qatar", flag: "🇶🇦" },
        { code: "+20", label: "EGY", name: "Egypt", flag: "🇪🇬" },
        { code: "+27", label: "ZAF", name: "South Africa", flag: "🇿🇦" },
        { code: "+60", label: "MYS", name: "Malaysia", flag: "🇲🇾" },
        { code: "+66", label: "THA", name: "Thailand", flag: "🇹🇭" },
        { code: "+62", label: "IDN", name: "Indonesia", flag: "🇮🇩" },
        { code: "+63", label: "PHL", name: "Philippines", flag: "🇵🇭" },
        { code: "+84", label: "VNM", name: "Vietnam", flag: "🇻🇳" },
        { code: "+92", label: "PAK", name: "Pakistan", flag: "🇵🇰" },
        { code: "+880", label: "BGD", name: "Bangladesh", flag: "🇧🇩" },
        { code: "+94", label: "LKA", name: "Sri Lanka", flag: "🇱🇰" },
        { code: "+90", label: "TUR", name: "Turkey", flag: "🇹🇷" },
        { code: "+972", label: "ISR", name: "Israel", flag: "🇮🇱" },
    ];

    // Generate random captcha string
    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaValue(result);
    };

    // Initialize captcha on mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isCaptchaVerified) {
            alert("Please complete the verification protocol.");
            return;
        }

        // --- STRICT VALIDATION PROTOCOL ---

        // 1. Name Validation: Min 2 chars, alphabetic only
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        if (!nameRegex.test(formData.name)) {
            alert("Invalid NAME_PROTOCOL. Please use alphabetic characters (min 2).");
            return;
        }

        // 2. Email Validation: Strict Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Invalid DIGITAL_LINK protocol. Please enter a valid work email.");
            return;
        }

        // 3. Strict Phone Validation (Length check 8-15 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 8 || phoneDigits.length > 15) {
            alert("Invalid VOICE_LINK detected. Protocol requires 8-15 digits.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        const submissionData = {
            ...formData,
            phone: `${countryCode} ${formData.phone}`
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    captchaInput: "",
                });
                setIsCaptchaVerified(false);
            } else {
                setSubmitStatus('error');
                alert(data.error || "Failed to initiate protocol. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus('error');
            alert("Network error. Could not connect to the industrial server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-background">
            <Header />

            <main className="isolate min-h-screen">
                {/* [CRAZY CONTACT HERO SECTION] */}
                <section className="relative min-h-[60vh] md:h-[75vh] pt-24 pb-12 md:pt-40 md:pb-16 bg-primary overflow-hidden flex items-center justify-center">
                    {/* 1. Background Pattern - Tilted Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* 2. Floating Vector Icons (Low Opacity) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[Phone, Mail, Send, Globe, MessageSquare, ArrowUpRight, MapPin].map((Icon, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0.1, 0.2, 0.1],
                                    scale: [1, 1.2, 1],
                                    y: [0, -20, 0],
                                    x: [0, Math.random() * 40 - 20, 0]
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
                                <Icon size={40 + Math.random() * 60} />
                            </motion.div>
                        ))}
                    </div>

                    {/* 3. Diagonal Marquees (Rotated Filmstrips) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 opacity-20 rotate-[-12deg] scale-125 pointer-events-none select-none">
                        {/* Top Line */}
                        <div className="flex gap-8 animate-marquee whitespace-nowrap">
                            {[...Array(5)].map((_, repeatIndex) => (
                                <div key={repeatIndex} className="flex gap-8">
                                    {['/fillezey logo.png', '/fillezey logo.png', '/fillezey logo.png'].map((imgSrc, i) => (
                                        <div key={`${repeatIndex}-${i}`} className="relative w-64 h-24 bg-white/10 backdrop-blur-sm p-6 shadow-xl rotate-3 flex items-center justify-center border-2 border-white/20 transform hover:scale-110 transition-transform overflow-hidden">
                                            <Image
                                                src={imgSrc}
                                                alt="Fillezy"
                                                fill
                                                className="object-contain invert opacity-40 p-6"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {/* Bottom Line (Reverse) */}
                        <div className="flex gap-8 animate-marquee-reverse whitespace-nowrap">
                            {[...Array(5)].map((_, repeatIndex) => (
                                <div key={repeatIndex} className="flex gap-8">
                                    {['/fillezey logo.png', '/fillezey logo.png', '/fillezey logo.png'].map((imgSrc, i) => (
                                        <div key={`${repeatIndex}-${i}`} className="relative w-64 h-24 bg-black/10 backdrop-blur-sm p-6 shadow-xl -rotate-2 flex items-center justify-center border-2 border-black/20 transform hover:scale-110 transition-transform overflow-hidden">
                                            <Image
                                                src={imgSrc}
                                                alt="Fillezy"
                                                fill
                                                className="object-contain opacity-40 p-6"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Central "Sticker" Typography */}
                    <div className="relative z-20 text-center transform rotate-[-1deg] py-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white px-8 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4 inline-block transform -rotate-2"
                        >
                            <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-black">
                                Support Desk
                            </span>
                        </motion.div>

                        <div className="relative">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-4xl md:text-9xl font-black text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)] leading-[0.85] uppercase"
                            >
                                CONTACT <span className="text-black">&</span><br /> SUPPORT
                            </motion.h1>

                            {/* "Global" Sticker */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-8 right-0 md:-right-12 bg-black px-6 py-2 shadow-xl transform rotate-3"
                            >
                                <span className="text-2xl font-black uppercase text-white">
                                    GLOBAL
                                </span>
                            </motion.div>
                        </div>

                        {/* Description below - Two-tone color */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm md:text-base font-medium mt-16 max-w-2xl mx-auto px-4"
                        >
                            <p className="text-white font-bold leading-relaxed">
                                <span className="text-black">Industrial Scale Support.</span> Have questions about our packaging solutions? Our team is here to help you find the <span className="text-black">perfect fit</span> for your business with a typical <span className="text-black">12H response time.</span>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* [PREMIUM CONTACT BENTO INTERFACE] */}
                <section className="relative py-12 md:py-32 bg-background overflow-hidden">
                    {/* Subtle Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-px bg-black/[0.03]" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-black/[0.03]" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
                            {/* Left Column: Industrial Info Bento */}
                            <div className="lg:col-span-5 space-y-12">
                                {/* Section Header: Relocated for natural balance */}
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="inline-flex items-center gap-4 text-[10px] font-mono text-black/30 font-black uppercase tracking-[0.5em]"
                                    >
                                        <span className="h-px w-8 bg-primary" />
                                        PROTECT_ASSETS_PROTOCOL
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="text-3xl md:text-6xl font-black text-black uppercase leading-[0.85] tracking-tighter"
                                    >
                                        Guard Your <br />
                                        <span className="text-primary italic font-serif font-light lowercase text-4xl md:text-7xl">Value.</span>
                                    </motion.h2>
                                </div>
                                {/* Global HQ Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="group relative bg-[#F9F9F9] border border-black/5 p-8 rounded-2xl hover:bg-white hover:border-primary/20 transition-all duration-700 overflow-hidden"
                                >
                                    {/* Large Background Artwork */}
                                    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:text-primary transition-all duration-700 pointer-events-none">
                                        <MapPin size={160} strokeWidth={1} />
                                    </div>

                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all">
                                        <MapPin size={24} strokeWidth={1} />
                                    </div>
                                    <div className="text-[9px] font-mono font-black text-black/30 uppercase tracking-[0.3em] mb-4">
                                        Location_Global_HQ
                                    </div>
                                    <h4 className="text-lg font-black text-black uppercase mb-4">Headquarters</h4>
                                    <div className="space-y-4 text-sm font-medium text-black/60 leading-relaxed">
                                        <div className="flex gap-4">
                                            <span className="text-xs font-mono text-primary font-black">IND</span>
                                            <p>IMT Manesar Sector 18, <br />Gurugram, Haryana</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-xs font-mono text-primary font-black">USA</span>
                                            <p>14310 Gannet Street, <br />La Mirada, CA 90638</p>
                                        </div>
                                    </div>

                                    {/* Architectural Corner */}
                                    <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-primary" />
                                    </div>
                                </motion.div>

                                {/* Communication Bento Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="group relative bg-[#F9F9F9] border border-black/5 p-8 rounded-2xl hover:bg-white hover:border-primary/20 transition-all duration-700 overflow-hidden"
                                    >
                                        {/* Large Background Artwork */}
                                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:text-primary transition-all duration-700 pointer-events-none">
                                            <Phone size={100} strokeWidth={1} />
                                        </div>

                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all">
                                            <Phone size={20} strokeWidth={1} />
                                        </div>

                                        <div className="text-[9px] font-mono font-black text-black/30 uppercase tracking-[0.3em] mb-4">Voice_Link</div>
                                        <h4 className="text-lg font-black text-black uppercase mb-2">Call Us</h4>
                                        <div className="space-y-1">
                                            <a href="tel:+919814215000" className="block text-sm font-bold text-black/70 hover:text-primary transition-colors">+91 98142 15000</a>
                                            <a href="tel:+16573252090" className="block text-sm font-bold text-black/70 hover:text-primary transition-colors">+1 657 3252 090</a>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="group relative bg-[#F9F9F9] border border-black/5 p-8 rounded-2xl hover:bg-white hover:border-primary/20 transition-all duration-700 overflow-hidden"
                                    >
                                        {/* Large Background Artwork */}
                                        <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:text-primary transition-all duration-700 pointer-events-none">
                                            <Mail size={100} strokeWidth={1} />
                                        </div>

                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all">
                                            <Mail size={20} strokeWidth={1} />
                                        </div>

                                        <div className="text-[9px] font-mono font-black text-black/30 uppercase tracking-[0.3em] mb-4">Digital_Inquiry</div>
                                        <h4 className="text-lg font-black text-black uppercase mb-2">Email</h4>
                                        <a href="mailto:info@fillezy.com" className="block text-sm font-bold text-black/70 hover:text-primary transition-colors break-all">info@fillezy.com</a>
                                    </motion.div>
                                </div>

                                {/* Availability Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-primary p-8 rounded-2xl text-white relative overflow-hidden group"
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <div className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.3em] mb-2">Current_SLA</div>
                                            <h4 className="text-xl font-black uppercase italic leading-none">Under 12H Response</h4>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                            <ArrowUpRight size={24} />
                                        </div>
                                    </div>
                                    {/* Animated Grid Overlay */}
                                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                                </motion.div>
                            </div>

                            {/* Right Column: Premium Interactive Form */}
                            <div className="lg:col-span-7 pt-0 md:pt-28">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="relative bg-white border border-black/10 p-5 md:p-14 rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
                                >
                                    {/* Technical Markers */}
                                    <div className="absolute top-8 right-8 text-[8px] font-mono font-black text-black/10 tracking-[0.5em] hidden md:block">
                                        FORM_VER_2.1_INDUSTRIAL
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                            {/* Name Field */}
                                            <div className="relative group/field">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="peer w-full bg-transparent border-b-2 border-black/10 py-3 text-lg font-black text-black placeholder-transparent focus:outline-none focus:border-primary transition-all"
                                                    placeholder="Full Name"
                                                />
                                                <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-black/30 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-placeholder-shown:text-black/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary pointer-events-none uppercase">
                                                    Full Name
                                                </label>
                                            </div>

                                            {/* Email Field */}
                                            <div className="relative group/field">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="peer w-full bg-transparent border-b-2 border-black/10 py-3 text-lg font-black text-black placeholder-transparent focus:outline-none focus:border-primary transition-all"
                                                    placeholder="Work Email"
                                                />
                                                <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-black/30 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-placeholder-shown:text-black/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary pointer-events-none uppercase">
                                                    Work Email
                                                </label>
                                            </div>

                                            {/* Mobile Number Field with Technical Country Code Selector */}
                                            <div className="relative group/field flex items-end gap-6">
                                                <div className="relative w-[110px] shrink-0">
                                                    <div className="flex items-center gap-2 border-b-2 border-black/10 py-3 text-lg font-black text-black group/select">
                                                        <select
                                                            value={countryCode}
                                                            onChange={(e) => setCountryCode(e.target.value)}
                                                            className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer relative z-10 font-mono"
                                                        >
                                                            {countryCodes.map((c) => (
                                                                <option key={`${c.code}-${c.label}`} value={c.code} className="bg-white text-black">
                                                                    {c.flag} {c.code}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-0 bottom-4 pointer-events-none text-black/20 group-hover/select:text-primary transition-colors">
                                                            <ArrowUpRight size={14} className="rotate-45" />
                                                        </div>
                                                    </div>
                                                    <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-primary transition-all pointer-events-none">
                                                        Protocol_Code
                                                    </label>
                                                </div>

                                                <div className="flex-1 relative">
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="peer w-full bg-transparent border-b-2 border-black/10 py-3 text-lg font-black text-black placeholder-transparent focus:outline-none focus:border-primary transition-all"
                                                        placeholder="Mobile Number"
                                                    />
                                                    <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-black/30 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-placeholder-shown:text-black/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary pointer-events-none uppercase">
                                                        Mobile Number
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Subject Field */}
                                            <div className="relative group/field">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="peer w-full bg-transparent border-b-2 border-black/10 py-3 text-lg font-black text-black placeholder-transparent focus:outline-none focus:border-primary transition-all"
                                                    placeholder="Inquiry Subject"
                                                />
                                                <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-black/30 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-placeholder-shown:text-black/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary pointer-events-none uppercase">
                                                    Inquiry Subject
                                                </label>
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div className="relative group/field">
                                            <textarea
                                                name="message"
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="peer w-full bg-transparent border-b-2 border-black/10 py-3 text-lg font-black text-black placeholder-transparent focus:outline-none focus:border-primary transition-all resize-none"
                                                placeholder="Detailed Message"
                                            />
                                            <label className="absolute left-0 -top-4 text-[9px] font-mono font-black uppercase tracking-[0.2em] text-black/30 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-bold peer-placeholder-shown:text-black/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary pointer-events-none uppercase">
                                                Detailed Message
                                            </label>
                                        </div>

                                        {/* CAPTCHA SECTION */}
                                        <div className="pt-4 border-t border-black/5">
                                            <Captcha onVerify={setIsCaptchaVerified} />
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !isCaptchaVerified}
                                                className={`group relative flex items-center justify-center w-full md:w-auto px-12 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 ${isSubmitting || !isCaptchaVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            >
                                                {/* Button Fill Animation */}
                                                <div className={`absolute inset-0 bg-primary transition-transform duration-500 ease-out ${isSubmitting ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />

                                                <span className="relative z-10 font-black uppercase text-xs tracking-[0.3em] flex items-center gap-4">
                                                    {isSubmitting ? 'INITIATING...' : 'INITIATE_CONTACT'}
                                                    <ArrowUpRight className={`transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} size={18} />
                                                </span>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Architectural Corner Accents */}
                                    <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-[2rem] pointer-events-none" />
                                    <div className="absolute -bottom-[1px] -right-[1px] w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-[2rem] pointer-events-none" />

                                    {/* Success Message Overlay */}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-0 z-50 bg-white rounded-[2rem] flex flex-col items-center justify-center p-12 text-center"
                                        >
                                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                                                <Send className="text-primary w-10 h-10" />
                                            </div>
                                            <h3 className="text-3xl font-black text-black uppercase mb-4 tracking-tighter">Protocol Initiated</h3>
                                            <p className="text-black/50 font-medium max-w-sm mb-12 uppercase text-xs tracking-widest leading-loose">
                                                The PROTECT_ASSETS_PROTOCOL has been established. <br />
                                                Your value intake has been forwarded to our <br />
                                                global response desk.
                                            </p>
                                            <button
                                                onClick={() => setSubmitStatus('idle')}
                                                className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] hover:opacity-70 transition-opacity"
                                            >
                                                SEND_ANOTHER_MESSAGE
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Network Map Section - Dark Minimalist Theme */}
                <section className="relative py-12 md:py-32 bg-black border-t border-white/5">
                    <div className="absolute inset-0 bg-[#FF6B35]/5 blur-[200px] opacity-20 pointer-events-none" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="mb-8 md:mb-16">
                            <div className="text-[10px] font-mono text-[#FF6B35] font-black uppercase tracking-[0.5em] mb-4 md:mb-6 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#FF6B35]" />
                                GLOBAL_NETWORK
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase mb-4 leading-tight">
                                Our Worldwide <span className="text-[#FF6B35] italic font-serif font-light lowercase">Presence</span>
                            </h2>
                            <p className="text-lg text-white/50 font-medium max-w-2xl">
                                Hi-Tech International Group operates across multiple continents with headquarters, manufacturing facilities, and partner offices serving customers in 45+ countries.
                            </p>
                        </div>

                        <InteractiveMap />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
