"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Globe, ShieldCheck, ArrowRight, MessageSquare, Download } from "lucide-react";
import ContactModal, { ModalMode } from "./ContactModal";
import { useState } from "react";

const footerLinks = {
    products: [
        { name: "Paper Aer v1", id: "P-AER", href: "/products/paper-aer" },
        { name: "Smart-Pads", id: "S-PAD", href: "/products/paper-smart" },
        { name: "Bio Aer Cushion", id: "B-AER", href: "/products/bio-aer" },
        { name: "Air Cushion", id: "A-CSH", href: "/products/air-cushion" },
    ],
    company: [
        { name: "Full Catalogue", id: "CAT", action: "CATALOGUE" },
        { name: "Technical Support", href: "/contact" },
        { name: "Global Presence", href: "/about#global" },
        { name: "Engineering Careers", href: "/careers" },
        { name: "Privacy Protocol", href: "/privacy" },
    ],
};

export default function Footer() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactMode, setContactMode] = useState<ModalMode>("QUOTATION");

    const openContactModal = (mode: ModalMode) => {
        setContactMode(mode);
        setIsContactModalOpen(true);
    };

    return (
        <footer className="bg-background text-foreground relative overflow-hidden technical-grid paper-grain border-t border-black/5">
            {/* CTA Banner Section */}
            <div className="relative bg-gradient-to-r from-primary via-orange-600 to-primary bg-[length:200%_100%] animate-gradient overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

                <div className="mx-auto max-w-7xl px-6 py-12 relative z-10">
                    {/* Stats Row - Minimal Horizontal Design */}
                    <div className="flex items-center justify-center gap-8 mb-10 pb-8 border-b border-white/20">
                        <div className="flex items-center gap-2">
                            <div className="text-4xl font-black text-white">140+</div>
                            <div className="text-white/60 text-xs font-mono uppercase tracking-wider">Sales & Service</div>
                        </div>
                        <div className="h-8 w-px bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <div className="text-4xl font-black text-white">1,150</div>
                            <div className="text-white/60 text-xs font-mono uppercase tracking-wider">Team Members</div>
                        </div>
                        <div className="h-8 w-px bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <div className="text-4xl font-black text-white">7</div>
                            <div className="text-white/60 text-xs font-mono uppercase tracking-wider">Mfg Plants</div>
                        </div>
                    </div>

                    {/* CTA Content */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                                Ready to Protect Your Products?
                            </h3>
                            <p className="text-white/80 text-lg font-medium">
                                Join 1,150+ companies worldwide using Fillezy solutions
                            </p>
                        </div>

                        <button
                            onClick={() => openContactModal("QUOTATION")}
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-black text-base uppercase tracking-wider rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-110"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Get A Quote
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                        </button>

                        <ContactModal
                            isOpen={isContactModalOpen}
                            onClose={() => setIsContactModalOpen(false)}
                            initialMode={contactMode}
                        />
                    </div>
                </div>
            </div>

            {/* Structural Marker */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-black/5 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
                <div className="xl:grid xl:grid-cols-4 xl:gap-24">
                    {/* Brand Meta */}
                    <div className="space-y-5 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img
                                src="/fillezey logo.png"
                                alt="Fillezy"
                                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                        <div className="hidden lg:flex items-center gap-3 border-r border-black/5 pr-4 mr-1">
                            <button
                                onClick={() => {
                                    // @ts-ignore - We'll handle state in a global way or local if needed
                                    // Actually, Header needs a ContactModal too if we want it to work everywhere
                                    window.dispatchEvent(new CustomEvent('OPEN_CONTACT_MODAL', { detail: { mode: 'CATALOGUE' } }));
                                }}
                                className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all"
                                title="Download Catalogue"
                            >
                                <Download size={16} />
                            </button>
                            <a
                                href="https://wa.me/919814215000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-black/5 text-foreground hover:bg-primary hover:text-white transition-all"
                                title="Chat on WhatsApp"
                            >
                                <MessageSquare size={16} />
                            </a>
                        </div>

                        <div className="space-y-4">
                            <div className="text-[10px] font-mono text-foreground/40 font-black uppercase tracking-[0.4em]">[ SYSTEM_MISSION ]</div>
                            <p className="text-base leading-relaxed font-medium text-foreground/60 max-w-xs">
                                Delivering vertically integrated, high-precision protective packaging solutions designed to ensure 100% damage prevention for global logistics.
                            </p>
                        </div>

                        <div className="flex space-x-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground/5 text-foreground/40 hover:bg-primary hover:text-white transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-16">
                            <div>
                                <h3 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-primary mb-10">CAPABILITIES</h3>
                                <ul role="list" className="space-y-4">
                                    {footerLinks.products.map((item) => (
                                        <li key={item.name} className="group">
                                            <Link href={item.href} className="flex flex-col">
                                                <span className="text-sm font-black text-foreground/60 group-hover:text-primary transition-colors uppercase tracking-tighter">{item.name}</span>
                                                <span className="text-[9px] font-mono text-foreground/20 font-bold">[ {item.id} ]</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-foreground/30 mb-10">RESOURCES</h3>
                                <ul role="list" className="space-y-4">
                                    {footerLinks.company.map((item) => (
                                        <li key={item.name}>
                                            {item.action ? (
                                                <button
                                                    onClick={() => openContactModal(item.action as ModalMode)}
                                                    className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors uppercase tracking-tight"
                                                >
                                                    {item.name}
                                                </button>
                                            ) : (
                                                <Link href={item.href!} className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors uppercase tracking-tight">
                                                    {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Global Nodes */}
                        <div className="border-l border-black/5 pl-8 md:pl-12">
                            <h3 className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-foreground/30 mb-10">GLOBAL_NODES</h3>
                            <ul role="list" className="space-y-8">
                                <li className="flex gap-x-5">
                                    <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-foreground text-background"><MapPin size={12} /></div>
                                    <div className="text-sm">
                                        <strong className="text-foreground font-black text-[10px] uppercase tracking-widest block mb-1">USA_LSC</strong>
                                        <span className="text-foreground/40 font-medium block">14310 Gannet Street, CA 90638</span>
                                        <a href="mailto:info@fillezy.com" className="text-foreground/40 font-medium block mt-1 hover:text-primary transition-colors">Email: info@fillezy.com</a>
                                        <a href="tel:+16573252090" className="text-foreground/40 font-medium block mt-1 hover:text-primary transition-colors">Tel: +1 657 3252 090</a>
                                    </div>
                                </li>
                                <li className="flex gap-x-5">
                                    <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-foreground text-background"><MapPin size={12} /></div>
                                    <div className="text-sm">
                                        <strong className="text-foreground font-black text-[10px] uppercase tracking-widest block mb-1">INDIA_HQ</strong>
                                        <span className="text-foreground/40 font-medium block">IMT Manesar Sector 18, Gurugram</span>
                                        <a href="mailto:info@fillezy.com" className="text-foreground/40 font-medium block mt-1 hover:text-primary transition-colors">Email: info@fillezy.com</a>
                                        <a href="tel:+919814215000" className="text-foreground/40 font-medium block mt-1 hover:text-primary transition-colors">Tel: +91 98142 15000</a>
                                    </div>
                                </li>
                                <li className="flex gap-x-5">
                                    <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-foreground text-background"><Mail size={12} /></div>
                                    <div className="text-sm">
                                        <strong className="text-foreground font-black text-[10px] uppercase tracking-widest block mb-1">SECURE_COMMS</strong>
                                        <a href="mailto:info@fillezy.com" className="text-foreground/40 font-medium hover:text-primary transition-colors">info@fillezy.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Technical Bottom Bar */}
                <div className="mt-24 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background font-mono text-[9px] font-black tracking-[0.3em]">
                            <ShieldCheck size={12} className="text-primary" />
                            ISO_9001-2015_CERTIFIED
                        </div>
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-foreground/20">
                            &copy; 2024 FILLEZY_INDUSTRIAL. NODE_V1.0
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link href="/certifications" className="group flex items-center">
                            <img
                                src="/new-logo/footer-icons.png"
                                alt="Certifications"
                                className="h-8 object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                            />
                        </Link>
                        <div className="h-8 w-[1px] bg-black/5" />
                        <Link href="/certifications" className="flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 text-[9px] font-mono font-black text-foreground tracking-[0.3em] uppercase hover:bg-black/5 transition-all">
                            <Globe size={11} className="text-primary animate-pulse" />
                            Secure_Access
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
