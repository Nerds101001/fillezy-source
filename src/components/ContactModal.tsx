"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Download, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { allProducts, ProductDetail } from "@/data/allProducts";
import Captcha from "./Captcha";

export type ModalMode = "QUOTATION" | "SPEC_SHEET" | "CATALOGUE";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: ModalMode;
    initialProductId?: string;
}

export default function ContactModal({ isOpen, onClose, initialMode = "QUOTATION", initialProductId }: ContactModalProps) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCaptchaVerified) return;
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, mode }),
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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white border border-black/10 shadow-2xl flex flex-col"
                >
                    {/* Visual Foundation */}
                    <div className="absolute inset-0 paper-grain opacity-5 pointer-events-none" />
                    <div className="absolute inset-0 technical-grid opacity-[0.03] pointer-events-none" />

                    {/* Header */}
                    <div className="relative p-8 pb-4 flex flex-col justify-end border-b border-black/5">
                        <div className="absolute top-6 right-8 z-10">
                            <button
                                onClick={onClose}
                                className="p-3 rounded-2xl bg-black/5 hover:bg-black/10 border border-black/5 transition-all group"
                            >
                                <X className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
                            </button>
                        </div>
                        <div className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em] mb-4">
                            [ {mode}_PROTOCOL ]
                        </div>
                        <motion.h2
                            key={mode}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black text-black uppercase leading-none tracking-tight mb-2"
                        >
                            {mode === "QUOTATION" ? "Get a Quote" : mode === "CATALOGUE" ? "Download Catalogue" : "Request Spec Sheet"}
                        </motion.h2>
                        <p className="text-black/60 text-xs font-bold leading-relaxed max-w-sm">
                            {mode === "QUOTATION"
                                ? "Submit your technical requirements and our engineering team will provide a formal commercial quotation."
                                : mode === "CATALOGUE"
                                    ? "Access our complete 100+ page industrial packaging systems catalogue. Delivery via instant protocol."
                                    : "Enter your contact parameters to receive the official technical specification sheet via secure transmission."}
                        </p>
                    </div>

                    <div className="p-8">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-6 border border-primary/20">
                                    <CheckCircle2 className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Request Processed!</h3>
                                <p className="text-black/60 font-bold text-sm max-w-xs">
                                    {mode === "QUOTATION"
                                        ? "Acknowledgement sent. Our integration experts will contact you within 24 operational hours."
                                        : mode === "CATALOGUE"
                                            ? "Catalogue dispatched. Please verify your inbox for the Fillezy Master Document."
                                            : "Transmission complete. Technical specifications have been routed to your business email."}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Full Name *</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-[#FAFAFA] border border-black/5 rounded-2xl px-6 py-4 text-black font-bold placeholder:text-black/20 focus:outline-none focus:border-primary/30 transition-all text-sm shadow-inner"
                                            placeholder="Enter full name"
                                            value={formData.name}
                                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Phone Number *</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full bg-[#FAFAFA] border border-black/5 rounded-2xl px-6 py-4 text-black font-bold placeholder:text-black/20 focus:outline-none focus:border-primary/30 transition-all text-sm shadow-inner"
                                            placeholder="+91 00000 00000"
                                            value={formData.phone}
                                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Business Email *</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-[#FAFAFA] border border-black/5 rounded-2xl px-6 py-4 text-black font-bold placeholder:text-black/20 focus:outline-none focus:border-primary/30 transition-all text-sm shadow-inner"
                                        placeholder="email@company.com"
                                        value={formData.email}
                                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>

                                {mode !== "CATALOGUE" && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">System Selection *</label>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full bg-[#FAFAFA] border border-black/5 rounded-2xl px-6 py-4 text-black font-bold focus:outline-none focus:border-primary/30 transition-all text-sm appearance-none shadow-inner"
                                                value={formData.product}
                                                onChange={e => setFormData(prev => ({ ...prev, product: e.target.value }))}
                                            >
                                                <option value="" className="bg-white">Select a Product</option>
                                                {Object.entries(groupedProducts).map(([category, products]) => (
                                                    <optgroup key={category} label={category} className="bg-white text-primary font-black uppercase text-[10px] tracking-widest">
                                                        {products.map(p => (
                                                            <option key={p.id} value={p.id} className="text-black font-bold bg-white lowercase text-sm">
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

                                {mode === "QUOTATION" && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] ml-2">Message (Optional)</label>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-[#FAFAFA] border border-black/5 rounded-2xl px-6 py-4 text-black font-bold placeholder:text-black/20 focus:outline-none focus:border-primary/30 transition-all text-sm resize-none shadow-inner"
                                            placeholder="Describe your requirements..."
                                            value={formData.message}
                                            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        />
                                    </div>
                                )}

                                <div className="mt-4">
                                    <Captcha onVerify={setIsCaptchaVerified} />
                                </div>

                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-primary text-[10px] font-black uppercase bg-primary/5 p-4 rounded-2xl border border-primary/10 tracking-widest"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {errorMessage}
                                    </motion.div>
                                )}

                                <button
                                    disabled={status === "loading" || !isCaptchaVerified}
                                    type="submit"
                                    className="w-full group relative flex items-center justify-center gap-4 overflow-hidden rounded-[1.5rem] bg-black px-10 py-6 text-white font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-primary hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-black/10"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {mode === "QUOTATION" ? (
                                                <>
                                                    Submit Request
                                                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                                                </>
                                            ) : mode === "CATALOGUE" ? (
                                                <>
                                                    Receive Catalogue
                                                    <Download className="w-5 h-5 transition-transform group-hover:translate-y-2" />
                                                </>
                                            ) : (
                                                <>
                                                    Download Specs
                                                    <Download className="w-5 h-5 transition-transform group-hover:translate-y-2" />
                                                </>
                                            )}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
