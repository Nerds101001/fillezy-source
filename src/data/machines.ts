export interface Machine {
    id: string;
    title: string;
    description: string;
    image: string;
    specs: { label: string; value: string }[];
    features: string[];
}

export const machines: Machine[] = [
    {
        id: "fillezy-rapid",
        title: "Fillezy Rapid™",
        description: "The flagship high-velocity air cushion system. Designed for high-volume fulfillment centers requiring maximum throughput and cinematic packaging precision.",
        image: "/product/Air systems image.png",
        specs: [
            { label: "Speed", value: "37 m/min" },
            { label: "Film Thickness", value: "12μm - 70μm" },
            { label: "Weight", value: "<10 kg" },
            { label: "Programs", value: "10 Presets" },
            { label: "Variants", value: "Bubble/Tube/Quilt" }
        ],
        features: ["Auto-Start Protocol", "Digital Programmable Interface", "CE Approved Engineering"]
    },
    {
        id: "paper-shark",
        title: "Paper Shark™",
        description: "Ultra-high-speed paper void fill system. Engineered to eliminate transit damage using 100% recyclable materials at industry-leading speeds.",
        image: "/product/Paper Shark.webp",
        specs: [
            { label: "Speed", value: "50-150 m/min" },
            { label: "Material", value: "100% Recyclable Paper" },
            { label: "Output", value: "Eco-Friendly Void Fill" },
            { label: "Efficiency", value: "50% Plastic Reduction" }
        ],
        features: ["Systematic High-Speed Dispensing", "Eco-Friendly Operations", "Zero Puncture Technology"]
    },
    {
        id: "paper-smart",
        title: "Paper Smart™",
        description: "Industrial paper padding system. Converts multi-ply kraft paper into high-density cushions for heavy-duty structural transit protection.",
        image: "/product/Paper Smart machine.webp",
        specs: [
            { label: "Output Speed", value: "22 m/min" },
            { label: "Power", value: "220V / 50Hz / 16A" },
            { label: "Dimensions", value: "0.7 x 0.9 x 1.4 m" },
            { label: "Weight", value: "115 kg" }
        ],
        features: ["Twin-Ply Conversion", "Shock Absorption Pads", "Industrial Grade Durability"]
    },
    {
        id: "bio-aer",
        title: "Bio-Aer™ System",
        description: "Specialized heat-sealing unit for compostable films. Optimized for zero air-loss seals on sensitive corn-starch based polymers.",
        image: "/product/Bio-Aer.webp",
        specs: [
            { label: "Sealing Type", value: "Precision Thermal" },
            { label: "Temp Control", value: "±1°C Accuracy" },
            { label: "Speed", value: "15 m/min" },
            { label: "Material", value: "Starch-Based Films" }
        ],
        features: ["Low-Temperature Sealing", "Compostable Guard", "Zero Air-Loss Logic"]
    },
    {
        id: "paper-eco",
        title: "Paper Eco™",
        description: "Sustainable, manual paper dispenser for versatile packing stations. Requires zero electricity and provides instant, eco-friendly void fill.",
        image: "/product/Paper 01.webp",
        specs: [
            { label: "Operation", value: "Manual Plying" },
            { label: "Power", value: "Zero (No electricity)" },
            { label: "Maintenance", value: "Near Zero" },
            { label: "Footprint", value: "Minimal Station Space" }
        ],
        features: ["Eco-Friendly Dispensing", "No Maintenance Design", "Flexible Station Placement"]
    }
];
