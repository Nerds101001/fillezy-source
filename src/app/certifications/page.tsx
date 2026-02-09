import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle2, Leaf, Award, FileCheck, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certifications & Compliance | Fillezy",
    description: "Fillezy products comply with global environmental and manufacturing standards including CE, CPCB, FSC, and biodegradable material certifications.",
};

const certifications = [
    {
        icon: Shield,
        title: "CE Approved Machines",
        category: "Machinery Safety",
        description: "All Fillezy machines comply with European Conformity (CE) standards for machinery safety, electromagnetic compatibility, and low voltage directives.",
        standards: ["EN ISO 12100", "EN 60204-1", "EMC Directive 2014/30/EU"],
        scope: "All air cushioning and paper cushioning machines"
    },
    {
        icon: Leaf,
        title: "CPCB Certified",
        category: "Environmental Compliance",
        description: "Manufacturing facilities approved by the Central Pollution Control Board (India) for environmental management and pollution control.",
        standards: ["Air Act 1981", "Water Act 1974", "Environment Protection Act 1986"],
        scope: "Manufacturing plants in India"
    },
    {
        icon: CheckCircle2,
        title: "FSC Compliant Paper",
        category: "Sustainable Materials",
        description: "Paper-based cushioning materials sourced from Forest Stewardship Council (FSC) certified suppliers ensuring responsible forestry practices.",
        standards: ["FSC Chain of Custody", "FSC Forest Management"],
        scope: "Paper cushioning consumables"
    },
    {
        icon: Leaf,
        title: "Oxo-Biodegradable Films",
        category: "Degradable Materials",
        description: "Cushioning films engineered with oxo-biodegradable additives that enable controlled degradation in natural environments.",
        standards: ["ASTM D6954", "BS 8472"],
        scope: "Select AER film products"
    },
    {
        icon: Award,
        title: "Compostable & Biodegradable",
        category: "Bio-Based Materials",
        description: "Plant-based Bio AER films made from corn and cassava starch that are fully compostable and biodegradable.",
        standards: ["EN 13432", "ASTM D6400", "ISO 17088"],
        scope: "Bio AER product line"
    },
    {
        icon: FileCheck,
        title: "ISO Quality Management",
        category: "Quality Systems",
        description: "Manufacturing operations follow ISO quality management principles for consistent product quality and continuous improvement.",
        standards: ["ISO 9001 principles", "Quality management systems"],
        scope: "All manufacturing facilities"
    }
];

export default function CertificationsPage() {
    return (
        <div className="bg-background">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-foreground/5 to-background">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-7xl mb-6 uppercase">
                            Certifications & <span className="text-primary italic font-serif font-light">Compliance.</span>
                        </h1>
                        <p className="text-xl text-foreground/60 font-light leading-relaxed max-w-3xl mx-auto">
                            Fillezy products comply with applicable environmental and manufacturing standards for protective packaging solutions, ensuring safe adoption across industries and regions.
                        </p>
                    </div>
                </section>

                {/* Certifications Grid */}
                <section className="py-24 px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {certifications.map((cert, index) => {
                                const Icon = cert.icon;
                                return (
                                    <div
                                        key={index}
                                        className="p-8 rounded-3xl glass border border-foreground/5 dark:border-white/5 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="text-primary" size={32} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                                                    {cert.category}
                                                </div>
                                                <h3 className="text-2xl font-black text-foreground mb-3">
                                                    {cert.title}
                                                </h3>
                                                <p className="text-foreground/60 font-light leading-relaxed mb-4">
                                                    {cert.description}
                                                </p>
                                                <div className="mb-4">
                                                    <div className="text-sm font-bold text-foreground mb-2">Standards:</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cert.standards.map((standard, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs px-3 py-1 rounded-full bg-foreground/5 text-foreground/70 font-mono"
                                                            >
                                                                {standard}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-foreground/50">
                                                    <span className="font-bold">Scope:</span> {cert.scope}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Compliance Statement */}
                <section className="py-24 px-6 lg:px-8 bg-foreground/5">
                    <div className="mx-auto max-w-4xl">
                        <div className="p-12 rounded-3xl glass border border-foreground/5 dark:border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <Globe className="text-primary" size={40} />
                                <h2 className="text-3xl font-black text-foreground">Global Compliance</h2>
                            </div>
                            <p className="text-foreground/60 font-light leading-relaxed mb-6">
                                Fillezy maintains compliance with applicable regulations across all operating regions. Our products are designed to meet environmental, safety, and quality standards relevant to protective packaging solutions.
                            </p>
                            <p className="text-foreground/60 font-light leading-relaxed mb-6">
                                Manufacturing facilities follow local environmental regulations and implement quality management systems to ensure consistent product performance.
                            </p>
                            <div className="pt-6 border-t border-foreground/10">
                                <p className="text-sm text-foreground/50 font-light">
                                    For specific certification documentation or compliance queries, please contact our technical team at{" "}
                                    <a href="mailto:info@fillezy.com" className="text-primary hover:underline">
                                        info@fillezy.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
