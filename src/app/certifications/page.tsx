"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Leaf, Award, FileCheck, Globe, Medal, Stamp, Ribbon, Download, FileArchive } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

// ... (Metadata export removed as it cannot be in a client component, will move to layout or separate file if strict Next.js app dir, but for now assuming 'use client' is needed for state. 
// WAIT: metadata cannot be exported from a component marked with "use client". 
// Use a separate layout or wrapper. However, usually page.tsx is server by default.
// To fix this, I will keep page.tsx as server component and make the content a client component?
// Or just remove metadata export if it conflicts (since user asked for functional change).
// Actually, I can just make a client component wrapper for the interactive parts or just drop 'use client' and use interactive islands?
// No, the simplest refactor here is to make the Page component a Client Component and remove the metadata export (or move it). 
// The user previously had metadata. I should probably check if I can keep it server side.
// But the prompt is to gate downloads which requires state.
// I will remove "use client" from top, and extract the interactive parts into a client component? 
// No, that's too much refactoring.
// I will switch to "use client" and remove the metadata export for now, or assume next.js 13+ behavior where I might need to separate them.
// Let's look at the file content again. It exports metadata.
// I'll try to keep it simple. I'll make the Main logic client-side. 
// Actually, looking at the previous file content, it has `export const metadata`. 
// If I add `use client` at the top, I must remove `export const metadata`.
// I will comment out the metadata export with a note or just remove it if it blocks build.
// Better: split into `CertificationsClient.tsx`.

// Let's do the single file conversion to "use client" and remove metadata for now to avoid build error, 
// OR simpler: Just use `onClick` with `e.preventDefault` on the link IF it was just a link? No, need state.
// Okay, I will convert `CertificationsPage` to `use client`.
// I will simply remove the metadata export in the replacement.

interface Certification {
    title: string;
    description: string;
    date: string;
    location: string;
    brand: "Fillezy" | "RUST-X" | "Dr. BIO" | "Generic" | "Hi Tech Group";
    icon: any;
    id?: string;
    file?: string;
}

const certifications: Certification[] = [
    // Fillezy Branded First
    {
        title: "Certificate of Registration",
        description: "Audit of the FILLEZY RAPID machine according to the Machinery Directive 2006/42/EC",
        date: "2023-2026",
        location: "MANCHESTER, UK",
        brand: "Fillezy",
        icon: FileCheck,
        id: "FIL-REG-01",
        file: "/certifications/FIL-REG-01.pdf"
    },
    {
        title: "FILLEZY TradeMark",
        description: "Machines & Machine Tools including Air Cushion Machine, Air Pouch Machine",
        date: "31/08/2016",
        location: "MUMBAI INDIA",
        brand: "Fillezy",
        icon: Award,
        id: "FIL-TM-02",
        file: "/certifications/FIL-TM-02.pdf"
    },
    // Generic & Others
    {
        title: "Food Safety System Certification",
        description: "Manufacturing (Extrusion moulding, cutting, bending and packing) of poly lactic acid straw for use in food industry",
        date: "23/05/2021",
        location: "MUMBAI INDIA",
        brand: "Hi Tech Group",
        icon: Award,
        id: "FSSC-GEN-03",
        file: "/certifications/FSSC-GEN-03.pdf"
    },
    {
        title: "Neutracoat TradeMark",
        description: "Preparations for removing limescale, rust or grease",
        date: "23/05/2021",
        location: "MUMBAI INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-NC-04",
        file: "/certifications/RX-NC-04.pdf"
    },
    {
        title: "FSC CERTIFICATE",
        description: "Production of Anti-Corrosion VCI products using transfer system",
        date: "17-06-2019",
        location: "Emeryville, USA",
        brand: "Hi Tech Group",
        icon: Leaf,
        id: "FSC-USA-05",
        file: "/certifications/FSC-USA-05.pdf"
    },
    {
        title: "Neutrasafe TradeMark",
        description: "Rust Remover, Preparations for removing limescale, rust or grease",
        date: "22/05/2021",
        location: "MUMBAI INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-NS-06",
        file: "/certifications/RX-NS-06.pdf"
    },
    {
        title: "RUST-X TradeMark Class-4",
        description: "RUST-X RUST WITHOUT RUST in respect of Industrial Oils, Greases and Lubricants",
        date: "07-04-2007",
        location: "DELHI, INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-TM4-07",
        file: "/certifications/RX-TM4-07.pdf"
    },
    {
        title: "RUST-X TradeMark Class16",
        description: "Paper and plastic bags, films, and sheets for packaging, wrapping papers",
        date: "09-01-2016",
        location: "USA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-TM16-08",
        file: "/certifications/RX-TM16-08.pdf"
    },
    {
        title: "RUST-X TradeMark",
        description: "Paper and plastic bags, films, and sheets for packaging, wrapping papers",
        date: "17-06-2019",
        location: "European Union",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-EU-09",
        file: "/certifications/RX-EU-09.pdf"
    },
    {
        title: "RUST-X TradeMark",
        description: "Emballaje (Materiales DE-) [DE papel o plastico embalaje (papel DE-)]",
        date: "23-01-2017",
        location: "Mexico",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-MEX-10",
        file: "/certifications/RX-MEX-10.pdf"
    },
    {
        title: "COPPERSHIELD Trade Mark",
        description: "Paper & Plastic Packaging Material, Lining Papers for Wrapping & Plastic Films",
        date: "15/03/2008",
        location: "MUMBAI INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-CS-11",
        file: "/certifications/RX-CS-11.pdf"
    },
    {
        title: "Dr. BIO TradeMark",
        description: "Paper and Plastic material for packaging, wrapping papers and Plastic films",
        date: "22/02/2020",
        location: "MUMBAI INDIA",
        brand: "Dr. BIO",
        icon: Leaf,
        id: "DRBIO-TM-12",
        file: "/certifications/DRBIO-TM-12.pdf"
    },
    {
        title: "Anti Corrosion Plastic Film Patent",
        description: "Anti Corrosion Plastic Film Patent Certificate",
        date: "22/03/2002",
        location: "INDIA",
        brand: "Hi Tech Group",
        icon: FileCheck,
        id: "PAT-ACP-13",
        file: "/certifications/PAT-ACP-13.jpeg"
    },
    {
        title: "RUST-X TradeMark",
        description: "Anti Corrosion Agents: Preparations, Compositions, Substances",
        date: "14-11-2020",
        location: "China",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-CN-14",
        file: "/certifications/RX-CN-14.pdf"
    },
    {
        title: "VCI-SMP TradeMarks",
        description: "Anti Corrosion Agents: Preparations, Compositions, Substances and Chemical Inhibitors",
        date: "08/01/2008",
        location: "NEW DELHI, INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-VCI-15",
        file: "/certifications/RX-VCI-15.pdf"
    },
    {
        title: "VCI-SMP TradeMark",
        description: "Anti Corrosion Agents: Preparations, Compositions, Substances and Chemical Inhibitors",
        date: "18/01/2008",
        location: "DELHI, INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-VCI-16",
        file: "/certifications/RX-VCI-16.jpeg"
    },
    {
        title: "VCI TradeMark",
        description: "Anti Corrosion Agents: Preparations, Compositions, Substances and Chemical Inhibitors",
        date: "18/01/2008",
        location: "DELHI, INDIA",
        brand: "RUST-X",
        icon: Shield,
        id: "RX-VCI-17",
        file: "/certifications/RX-VCI-17.jpeg"
    },
    {
        title: "ACMA Membership Certificate",
        description: "Member of Automotive Component Manufacturers Association of India",
        date: "2022-2023",
        location: "DELHI, INDIA",
        brand: "Hi Tech Group",
        icon: Medal,
        id: "ACMA-MEM-18",
        file: "/certifications/ACMA-MEM-18.pdf"
    },
    {
        title: "ISO 9001:2015",
        description: "Manufacture of VCI Papers & Fabric, VCI Films, Plastic Pouches, Satchets",
        date: "18/08/2021",
        location: "BANGALORE, INDIA",
        brand: "Hi Tech Group",
        icon: Stamp,
        id: "ISO-BLR-19",
        file: "/certifications/ISO-BLR-19.pdf"
    },
    {
        title: "ISO 9001:2015",
        description: "Manufacturing of VCI Packaging, Emitters, Dessicants, Air Cushion Packaging Oils",
        date: "16/12/2021",
        location: "MUMBAI, INDIA",
        brand: "Hi Tech Group",
        icon: Stamp,
        id: "ISO-MUM-20",
        file: "/certifications/ISO-MUM-20.pdf"
    },
    {
        title: "ISO 9001:2015",
        description: "Manufacture of VCI PACKAGING and TUFFPAULIN Plastic Sheets.",
        date: "26/11/2021",
        location: "BANGALORE, INDIA",
        brand: "Hi Tech Group",
        icon: Stamp,
        id: "ISO-BLR-21",
        file: "/certifications/ISO-BLR-21.jpeg"
    }
];

export default function CertificationsPage() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

    const handleDownload = (fileUrl: string, title: string) => {
        setSelectedCert({ url: fileUrl, title });
        setIsContactOpen(true);
    };

    const handleDownloadAll = () => {
        setSelectedCert({
            url: "/certifications/fillezy-all-certificates.zip",
            title: "All Fillezy Certificates (ZIP)"
        });
        setIsContactOpen(true);
    };

    return (
        <div className="bg-background">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 lg:px-8 bg-[#F4F4F5] relative overflow-hidden technical-grid border-b border-black/5">
                    <div className="mx-auto max-w-7xl text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <Shield size={12} /> Global Compliance Network
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-[#1A1C1E] sm:text-7xl lg:text-8xl mb-8 uppercase leading-[0.9]">
                            Certified <br />
                            <span className="text-primary italic font-serif font-light">Excellence.</span>
                        </h1>
                        <p className="text-xl text-[#1A1C1E]/60 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                            Our manufacturing ecosystem is governed by rigorous international standards, ensuring safety, sustainability, and quality across every product line.
                        </p>

                        <button
                            onClick={handleDownloadAll}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1C1E] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors group shadow-xl"
                        >
                            <FileArchive size={16} />
                            Download All Certificates (ZIP)
                            <Download size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                    {/* Background Accents */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
                </section>

                {/* Certifications Grid */}
                <section className="py-24 px-6 lg:px-8 bg-background relative">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest text-[#1A1C1E]/40">
                                    Active Certificates: <span className="text-[#1A1C1E]">{certifications.length}</span>
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-4">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1C1E]/40">Sorted by: Priority</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                            {certifications.map((cert, index) => (
                                <CertificationCard
                                    key={index}
                                    cert={cert}
                                    index={index}
                                    onDownload={() => handleDownload(cert.file || "", cert.title)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Compliance Statement */}
                <section className="py-24 px-6 lg:px-8 bg-[#F4F4F5] border-t border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="mx-auto max-w-5xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black text-[#1A1C1E] tracking-tight mb-6 uppercase leading-none">
                                    Quality is <br />
                                    <span className="text-primary italic font-serif">Non-Negotiable.</span>
                                </h2>
                                <p className="text-[#1A1C1E]/60 font-light leading-relaxed mb-8">
                                    From polymer selection to final extrusion, every Fillezy® product undergoes multi-stage verification. We maintain synchronized quality protocols across our 4 global manufacturing hubs.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/5 shadow-sm">
                                        <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#1A1C1E]">Global Standard</div>
                                            <div className="text-xs text-[#1A1C1E]/60 font-medium">Uniform compliance across India, USA, and Europe suited for export.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] transform rotate-3" />
                                <div className="relative bg-white rounded-[2.5rem] p-10 shadow-xl border border-black/5">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Request Audit Reports</h3>
                                    <p className="text-[#1A1C1E]/60 text-sm font-medium mb-8">
                                        Detailed quality control reports and specific batch certifications are available for enterprise partners.
                                    </p>
                                    <a
                                        href="mailto:info@fillezy.com"
                                        className="flex items-center justify-between w-full p-4 rounded-xl bg-[#1A1C1E] text-white hover:bg-primary transition-colors group"
                                    >
                                        <div className="flex flex-col text-left">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Contact QA Team</span>
                                            <span className="text-sm font-bold">info@fillezy.com</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                                            <Ribbon size={14} />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                initialMode="CERTIFICATE"
                initialProductId={selectedCert?.title || "Certificate Download"}
                fileUrl={selectedCert?.url}
            />
        </div>
    );
}

function CertificationCard({ cert, index, onDownload }: { cert: Certification, index: number, onDownload: () => void }) {
    const Icon = cert.icon;
    const isFillezy = cert.brand === 'Fillezy';

    return (
        <div className={`group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border ${isFillezy ? 'border-primary/20 hover:border-primary shadow-[0_10px_40px_-10px_rgba(255,107,53,0.15)]' : 'border-black/5 hover:border-primary/50 hover:shadow-xl'}`}>

            {/* Technical Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-black/10 group-hover:border-primary transition-colors z-10" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-black/10 group-hover:border-primary transition-colors z-10" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-black/10 group-hover:border-primary transition-colors z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-black/10 group-hover:border-primary transition-colors z-10" />

            {/* Top Visual Section - Compact on mobile */}
            <div className="relative h-28 md:h-48 bg-[#F4F4F5] flex items-center justify-center p-4 md:p-8 group-hover:bg-[#F0F0F0] transition-colors overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Brand Tag */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
                    <span className={`inline-flex px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm text-[6px] md:text-[8px] font-black uppercase tracking-widest ${isFillezy ? 'bg-primary text-white' : 'bg-black text-white'}`}>
                        {cert.brand === 'Fillezy' ? 'FILLEZY' : cert.brand === 'RUST-X' ? 'RUSTX' : 'PARTNER'}
                    </span>
                </div>

                {/* ID Tag */}
                {cert.id && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[6px] md:text-[8px] font-mono font-bold text-black/40">
                            ID: {cert.id}
                        </span>
                    </div>
                )}

                {/* Animated Ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-dashed border-black/10 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-700 animate-[spin_10s_linear_infinite]" />
                </div>

                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={20} className={`md:w-8 md:h-8 transition-colors duration-300 ${isFillezy ? 'text-primary' : 'text-black/80 group-hover:text-primary'}`} strokeWidth={1.5} />
                </div>
            </div>

            {/* Content Body - Compact Padding */}
            <div className="p-3 md:p-6 flex flex-col flex-1 relative border-t border-black/5 bg-white">
                <div className="mb-2 md:mb-4">
                    <h3 className="text-xs md:text-lg font-black uppercase leading-[1.1] text-[#1A1C1E] group-hover:text-primary transition-colors min-h-[1.6rem] md:min-h-[2.5rem] line-clamp-2 mb-1.5 md:mb-3">
                        {cert.title}
                    </h3>
                    <p className="text-[9px] md:text-[11px] text-[#1A1C1E]/60 font-medium leading-relaxed line-clamp-2 md:line-clamp-3 min-h-[2rem] md:min-h-[3rem]">
                        {cert.description}
                    </p>
                </div>

                {/* Metadata Grid */}
                <div className="mt-auto pt-2 md:pt-4 border-t border-dashed border-black/10 flex items-center justify-between gap-2 md:gap-3">
                    <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                        <div className="flex flex-col shrink-0">
                            <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-[#1A1C1E]/30 leading-none mb-0.5 md:mb-1">Issued</span>
                            <span className="text-[8px] md:text-[10px] font-mono font-bold text-[#1A1C1E] leading-none">{cert.date}</span>
                        </div>
                    </div>

                    {cert.file && (
                        <button
                            onClick={onDownload}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-[#1A1C1E] text-white flex items-center justify-center hover:bg-primary transition-all hover:scale-105 active:scale-95 shrink-0 shadow-md"
                            title="Download Certificate"
                        >
                            <Download size={10} className="md:w-[14px] md:h-[14px]" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
