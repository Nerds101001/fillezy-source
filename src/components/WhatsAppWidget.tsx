"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "919814215000";
const WHATSAPP_MESSAGE_DEFAULT = "Hello! I'm interested in Fillezy's packaging solutions. Can you help me?";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    const openWhatsApp = (message: string = WHATSAPP_MESSAGE_DEFAULT) => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const quickQuestions = [
        { text: "Update_Subscription", msg: "I'm interested in subscribing to Fillezy updates." },
        { text: "Book_Demo_Call", msg: "I'd like to book a demo call for Fillezy automation solutions." },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="pointer-events-auto w-[350px] md:w-[400px] mb-4 bg-background/80 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-primary/10 relative"
                    >
                        {/* Branded Header Section */}
                        <div className="bg-primary p-8 pb-12 relative text-white overflow-hidden uppercase">
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                            <button
                                onClick={toggleChat}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/10 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>
                            <div className="relative z-10">
                                <span className="text-[10px] font-mono font-black tracking-[0.3em] opacity-60 block mb-2">[ SYSTEM_SUPPORT ]</span>
                                <h2 className="text-3xl font-black leading-[0.9] tracking-tighter max-w-[200px]">
                                    Hey 👋, how can we help?
                                </h2>
                            </div>
                        </div>

                        {/* Main Interaction Cards Area */}
                        <div className="px-5 -mt-6 pb-6 space-y-4 relative z-10 overflow-y-auto max-h-[400px] scrollbar-hide">
                            {/* Start Conversation Card */}
                            <div className="bg-background rounded-[24px] p-6 shadow-2xl border border-primary/5 relative group/card">
                                <div className="absolute inset-0 paper-grain opacity-5 pointer-events-none" />
                                <h3 className="text-lg font-black text-foreground uppercase tracking-tight mb-1">Start_Protocol</h3>
                                <p className="text-foreground/40 text-[10px] font-mono uppercase tracking-widest mb-6">Response_Time: &lt; 10_MIN</p>

                                <button
                                    onClick={() => openWhatsApp()}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 group shadow-lg shadow-primary/20"
                                >
                                    <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    Initialize_Chat
                                </button>
                            </div>

                            {/* WhatsApp Direct Row */}
                            <button
                                onClick={() => openWhatsApp()}
                                className="w-full bg-background rounded-[24px] p-5 shadow-xl border border-primary/5 flex items-center justify-between hover:bg-primary/5 transition-all group group/btn"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover/btn:bg-primary/20">
                                        <MessageSquare size={20} className="text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-black text-foreground/80 text-[10px] uppercase tracking-widest block mb-0.5">External_Link</span>
                                        <span className="font-sans font-bold text-foreground/60 text-xs">Direct WhatsApp Protocol</span>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-primary opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>

                            {/* Quick Questions Section */}
                            <div className="pt-2">
                                <div className="flex items-center gap-2 mb-4 px-2">
                                    <div className="h-px bg-primary/10 flex-1" />
                                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Quick_Actions</p>
                                    <div className="h-px bg-primary/10 flex-1" />
                                </div>
                                <div className="flex flex-wrap gap-2 px-1">
                                    {quickQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => openWhatsApp(q.msg)}
                                            className="px-4 py-2 bg-foreground/5 hover:bg-primary/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all border border-transparent hover:border-primary/20"
                                        >
                                            {q.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="p-4 bg-foreground/5 border-t border-primary/5 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-primary/10 flex items-center justify-center">
                                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                            </div>
                            <span className="text-[8px] font-mono text-foreground/30 font-black tracking-[0.2em] uppercase">
                                ENGINE: <span className="text-foreground/50">FILLEZY_V1.1_OS</span>
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="pointer-events-auto"
                    >
                        <button
                            onClick={toggleChat}
                            className={`h-16 w-16 rounded-full flex items-center justify-center shadow-[0_16px_48px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-110 active:scale-95 group ${isOpen ? 'bg-background text-primary' : 'bg-primary text-white'
                                }`}
                        >
                            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:scale-110 transition-transform" />
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="open"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="relative"
                                    >
                                        <MessageCircle size={28} fill="currentColor" className="relative z-10" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
