export interface MegamenuProduct {
    id: string;
    name: string;
    image: string;
    href: string;
    techId: string;
}

export interface MegamenuCategory {
    id: string;
    name: string;
    intro: string;
    products: MegamenuProduct[];
}

export const megamenuData: MegamenuCategory[] = [
    {
        id: "MAC-A01",
        name: "Machines",
        intro: "High-velocity void fill systems engineered for the modern warehouse. Seamless integration, zero downtime, and cinematic throughput.",
        products: [
            { id: "hexa-machine", name: "Fillezy® Hexa Paper Machine", techId: "HEX-M0", image: "/product/Fillezy-Hexa-Paper.webp", href: "/products/hexa-machine" },
            { id: "paper-shark", name: "Fillezy® Paper Shark Machine", techId: "SHK-M0", image: "/product/Paper Shark.webp", href: "/products/paper-shark" },
            { id: "fillezy-rapid", name: "Fillezy® Rapid Machine", techId: "RAP-M0", image: "/product/Fillezy Rapid.webp", href: "/products/fillezy-rapid" },
            { id: "paper-smart", name: "Fillezy® Paper Smart Machine", techId: "SMT-M0", image: "/product/Paper Smart machine.webp", href: "/products/paper-smart" },
            { id: "paper-eco", name: "Fillezy® Paper Eco Dispenser", techId: "ECO-M0", image: "/product/Fillezy Eco Machine.webp", href: "/products/paper-eco" }
        ]
    },
    {
        id: "MAT-P02",
        name: "Materials",
        intro: "Sustainable consumables engineered for maximum protection with minimal impact. FSC-certified paper and high-performance films.",
        products: [
            { id: "air-bubbles", name: "Fillezy® Air Bubbles", techId: "BUB-A1", image: "/product/Air Bubbles.webp", href: "/products/air-bubbles" },
            { id: "air-cushion", name: "Fillezy® Air Cushion", techId: "CSH-A2", image: "/product/Fillzy Air CUshion.webp", href: "/products/air-cushion" },
            { id: "air-quilts", name: "Fillezy® Air Quilts", techId: "QLT-A3", image: "/product/Fillezy Air QUilts.webp", href: "/products/air-quilts" },
            { id: "air-tubes", name: "Fillezy® Air Tubes", techId: "TUB-A4", image: "/product/Fillezy Air Tubes.webp", href: "/products/air-tubes" },
            { id: "double-cushion", name: "Fillezy® Double Cushion", techId: "DBL-C5", image: "/product/Fillezy Double CUshion.webp", href: "/products/double-cushion" },
            { id: "paper-aer", name: "Fillezy® Paper Aer", techId: "AER-P6", image: "/product/Aer Paper Cushion.webp", href: "/products/paper-aer" },
            { id: "smart-pads", name: "Fillezy® Paper Smart Pads", techId: "SMT-P7", image: "/product/Fillezy-Paper-Smart-Pads.webp", href: "/products/smart-pads" },
            { id: "hexa-papers", name: "Fillezy® Hexa Paper", techId: "HEX-P8", image: "/product/Fillezy Hexa Papers.webp", href: "/products/hexa-papers" }
        ]
    },
    {
        id: "MAT-B04",
        name: "Bio Aer",
        intro: "Specialized eco-friendly films for conscious fulfillment. 100% compostable materials with zero microplastic imprint.",
        products: [
            { id: "bio-film", name: "Fillezy® Bio Aer Film", techId: "BIO-F1", image: "/product/Bio-Aer.webp", href: "/products/bio-film" }
        ]
    },
    {
        id: "INT-X03",
        name: "Integrations",
        intro: "Advanced workflow automation and gravity-fed infrastructure. Optimize your warehouse throughput with modular technical bays.",
        products: [
            { id: "dunnage-bags", name: "Fillezy® Kraft Dunnage Bags", techId: "INT-D1", image: "/product/Dunnage Bags.webp", href: "/products/dunnage-bags" },
            { id: "jet-stream", name: "Fillezy® Jet Stream Overhead", techId: "INT-J2", image: "/product/FIlezy Handling Systems.webp", href: "/products/jet-stream" },
            { id: "movable-bins", name: "Fillezy® Movable Bins", techId: "INT-M3", image: "/product/Fillezy Bins.webp", href: "/products/movable-bins" },
            { id: "winders", name: "Fillezy® Industrial Winders", techId: "INT-W4", image: "/product/Fillezy-Winder.webp", href: "/products/winders" }
        ]
    }
];
