"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Download, CheckCircle2, AlertCircle, Loader2, ChevronDown, Phone, Mail, MessageSquare, Check } from "lucide-react";
import { allProducts, ProductDetail } from "@/data/allProducts";
import Captcha from "./Captcha";

export type ModalMode = "QUOTATION" | "SPEC_SHEET" | "CATALOGUE" | "CERTIFICATE";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: ModalMode;
    initialProductId?: string;
    fileUrl?: string; // Optional download link for certificates
}

export default function ContactModal({ isOpen, onClose, initialMode = "QUOTATION", initialProductId, fileUrl }: ContactModalProps) {
    const [mode, setMode] = useState<ModalMode>(initialMode);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        product: initialProductId || "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    // Sync mode if changed from outside
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // Sync productId if changed
    useEffect(() => {
        if (initialProductId) {
            setFormData(prev => ({ ...prev, product: initialProductId }));
        }
    }, [initialProductId]);

    // Set mounted state and check mobile
    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCaptchaVerified) return;
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, mode, fileUrl }),
            });

            if (!response.ok) throw new Error("Submission failed. Please try again.");

            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "", product: "", message: "" });
            }, 3000);
        } catch (err: any) {
            setStatus("error");
            setErrorMessage(err.message || "Something went wrong.");
        }
    };

    const groupedProducts = allProducts.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, ProductDetail[]>);

    const isDownloadMode = ["SPEC_SHEET", "CATALOGUE", "CERTIFICATE"].includes(mode);

    if (!mounted) return null;

    const modalVariants = isMobile ? {
        initial: { y: "100%" },
        animate: {
            y: "0%",
            transition: {
                type: "spring" as const,
                damping: 30,
                stiffness: 300,
                mass: 0.8
            }
        },
        exit: {
            y: "100%",
            transition: {
                type: "spring" as const,
                damping: 30,
                stiffness: 300
            }
        }
    } : {
        initial: { opacity: 0, scale: 0.95, y: 30 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 30 }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto custom-scrollbar">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        variants={modalVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        drag={isMobile ? "y" : false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.2 }}
                        onDragEnd={(e, { offset, velocity }) => {
                            if (isMobile && (offset.y > 100 || velocity.y > 500)) {
                                onClose();
                            }
                        }}
                        className={`relative w-full ${isDownloadMode ? 'max-w-md' : 'max-w-5xl'} overflow-hidden rounded-t-[2.5rem] md:rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border-t border-white/20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] flex flex-col ${isDownloadMode ? '' : 'lg:flex-row'} max-h-[90vh] h-auto md:min-h-[500px] lg:bg-white lg:backdrop-blur-none lg:border-none`}
                    >
                        {/* Mobile Drag Handle & Close Arrow */}
                        <div className="lg:hidden absolute top-0 left-0 right-0 pt-3 pb-2 flex flex-col items-center justify-center z-50 cursor-pointer" onClick={onClose}>
                            {/* Drag Indicator */}
                            <div className="w-12 h-1 bg-black/10 rounded-full mb-1" />
                            {/* Down Arrow */}
                            <div className="text-black/30">
                                <ChevronDown size={20} />
                            </div>
                        </div>

                        {/* Left: Brand Sidebar (Gradient) - Hidden in Download Mode and Mobile */}
                        {!isDownloadMode && (
                            <div className="hidden lg:flex relative w-full lg:w-[42%] bg-gradient-to-br from-[#101214] via-[#1A1A1A] to-black h-auto lg:min-h-full p-8 lg:p-12 flex-col text-white overflow-hidden shrink-0">
                                {/* Visual foundation */}
                                <div className="absolute inset-0 paper-grain opacity-20 pointer-events-none" />
                                <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary mb-8 lg:mb-12">
                                        [ LEAD_CAPTURE_V1 ]
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                                        Have a bold <br />
                                        <span className="font-serif italic font-light text-primary">Requirement?</span>
                                    </h1>

                                    <p className="text-white/60 text-sm lg:text-base font-medium leading-relaxed mb-8 lg:mb-12 max-w-xs">
                                        Engineering high-velocity packaging systems and fulfillment protocols for the modern warehouse.
                                    </p>

                                    {/* Check List */}
                                    <div className="space-y-4 mb-12">
                                        {[
                                            "No hidden costs. We quote transparently.",
                                            "First response within one business day.",
                                            "Led by senior engineers and packing experts."
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                                                    <Check size={12} className="text-white" />
                                                </div>
                                                <span className="text-xs lg:text-sm font-bold text-white/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer info: Refined compact desktop layout */}
                                    <div className="mt-auto pt-6 border-t border-white/10 space-y-6">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="p-2.5 bg-white/10 rounded-xl border border-white/5 shadow-inner">
                                                <MessageSquare size={20} className="text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Reach the experts</div>
                                                <div className="text-xs font-black uppercase tracking-tight">Technical Specialists</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <a
                                                href="tel:+919814215000"
                                                className="group/btn flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                                            >
                                                <Phone size={12} className="group-hover/btn:animate-bounce" /> Call Now
                                            </a>
                                            <a
                                                href="https://wa.me/919814215000"
                                                target="_blank"
                                                className="group/btn flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#20bd5a] hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                                            >
                                                <MessageSquare size={12} className="group-hover/btn:scale-110" /> WhatsApp
                                            </a>
                                        </div>

                                        <div className="text-left py-1">
                                            <a href="mailto:info@fillezy.com" className="group text-[10px] text-white/40 font-bold hover:text-white transition-colors flex items-center gap-2">
                                                <div className="h-px w-3 bg-white/20 group-hover:w-6 transition-all" />
                                                Prefer email? <span className="text-primary underline decoration-primary/30 group-hover:decoration-primary transition-all">info@fillezy.com</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Right: Form Section */}
                        <div className={`relative flex-1 bg-transparent lg:bg-white p-6 pt-10 ${isDownloadMode ? 'lg:p-10' : 'lg:p-10'} flex flex-col justify-start overflow-y-auto custom-scrollbar`}>
                            {/* Close Button (Desktop Only) */}
                            <button
                                onClick={onClose}
                                className="hidden lg:block absolute top-4 right-4 lg:top-6 lg:right-8 p-2 lg:p-3 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 transition-all group z-50"
                            >
                                <X className="w-4 h-4 lg:w-5 lg:h-5 text-black/40 group-hover:text-black transition-colors" />
                            </button>

                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <h2 className="text-2xl lg:text-4xl font-black text-black tracking-tight mb-3 lg:mb-6 mt-4 lg:mt-2">
                                    {isDownloadMode ? (
                                        <>
                                            Unlock <span className="text-primary italic font-serif">Resource</span>
                                        </>
                                    ) : (
                                        <>
                                            Send us a <span className="text-primary italic font-serif">message</span>
                                        </>
                                    )}
                                </h2>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-10 lg:py-20 text-center"
                                    >
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-6 lg:mb-8 border border-primary/20">
                                            <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                                        </div>
                                        <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-3">
                                            {fileUrl ? "Access Granted" : "Transmission Received"}
                                        </h3>
                                        <p className="text-black/60 font-medium text-sm max-w-sm mb-8">
                                            {fileUrl
                                                ? "Your compliance documentation is ready for secure download."
                                                : "Your technical requirements have been logged using our secure protocol."}
                                        </p>

                                        {fileUrl && (
                                            <a
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                            >
                                                <Download size={16} />
                                                Download File
                                            </a>
                                        )}
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                                            <div className="space-y-1 lg:space-y-1.5">
                                                <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] ml-1">Full Name*</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-[#F8FAFC] border border-black/5 rounded-xl px-4 py-3 lg:px-6 lg:py-3 text-black font-semibold placeholder:text-black/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm"
                                                    placeholder="Your full name"
                                                    value={formData.name}
                                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                />
                                            </div>
                                            <div className="space-y-1 lg:space-y-1.5">
                                                <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] ml-1">Phone Number*</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    className="w-full bg-[#F8FAFC] border border-black/5 rounded-xl px-4 py-3 lg:px-6 lg:py-3 text-black font-semibold placeholder:text-black/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm"
                                                    placeholder="Your phone number"
                                                    value={formData.phone}
                                                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1 lg:space-y-1.5">
                                            <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] ml-1">Business Email*</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-[#F8FAFC] border border-black/5 rounded-xl px-4 py-3 lg:px-6 lg:py-3 text-black font-semibold placeholder:text-black/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            />
                                        </div>

                                        {!isDownloadMode && (
                                            <div className="space-y-1 lg:space-y-2">
                                                <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] ml-1">Project Details*</label>
                                                <textarea
                                                    required
                                                    rows={2}
                                                    className="w-full bg-[#F8FAFC] border border-black/5 rounded-xl px-4 py-3 lg:px-6 lg:py-3 text-black font-semibold placeholder:text-black/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm resize-none"
                                                    placeholder="Tell us about the products..."
                                                    value={formData.message}
                                                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                />
                                            </div>
                                        )}

                                        {!isDownloadMode && (
                                            <div className="space-y-1 lg:space-y-1.5">
                                                <label className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] ml-1">System Selection</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full bg-[#F8FAFC] border border-black/5 rounded-xl px-4 py-3 lg:px-6 lg:py-3 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm appearance-none"
                                                        value={formData.product}
                                                        onChange={e => setFormData(prev => ({ ...prev, product: e.target.value }))}
                                                    >
                                                        <option value="" className="bg-white">Select optional product interest</option>
                                                        {Object.entries(groupedProducts).map(([category, products]) => (
                                                            <optgroup key={category} label={category.toUpperCase()} className="bg-white text-primary font-black uppercase text-[10px] tracking-widest py-2">
                                                                {products.map(p => (
                                                                    <option key={p.id} value={p.id} className="text-black font-bold bg-white text-sm">
                                                                        {p.title}
                                                                    </option>
                                                                ))}
                                                            </optgroup>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="py-1">
                                            <Captcha onVerify={setIsCaptchaVerified} />
                                        </div>

                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 text-primary text-[10px] font-black uppercase bg-primary/5 p-3 rounded-lg border border-primary/10 tracking-widest"
                                            >
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                {errorMessage}
                                            </motion.div>
                                        )}

                                        <button
                                            disabled={status === "loading" || !isCaptchaVerified}
                                            type="submit"
                                            className="w-full group relative flex items-center justify-center gap-4 overflow-hidden rounded-xl bg-primary px-6 py-4 lg:px-10 lg:py-4 text-white font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    {isDownloadMode ? "Unlock Resource" : "Send Message"}
                                                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
