export interface TechnicalSpec {
    label: string;
    value: string;
}

export interface ProductVariant {
    label: string;
    options: string[];
}

export interface ApplicationTable {
    title: string;
    headers: string[];
    rows: string[][];
}

export interface ProductDetail {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    gallery?: string[]; // Optional array of additional cinematic images
    videoUrl?: string; // Optional cinematic video URL
    videoGallery?: string[]; // Optional array of multiple cinematic video URLs
    techId: string;
    category: string;
    specs: TechnicalSpec[];
    features: string[];
    suitableIndustries?: string[];
    variants?: ProductVariant[];
    colorImages?: Record<string, string>; // Map variant options to specific images
    moreSpecs?: TechnicalSpec[];
    applicationTables?: ApplicationTable[];
    specialOffer?: string; // High-impact promotional highlight
}

export const allProducts: ProductDetail[] = [
    // MACHINES
    {
        id: "hexa-machine",
        title: "Fillezy® Hexa Paper Machine",
        techId: "HEX-M0",
        description: "Industrial hexagonal paper padding system for high-density shock absorption.",
        longDescription: "The Fillezy® Hexa Paper machine is a breakthrough in paper cushioning technology. It converts specialized kraft paper into high-density hexagonal pads that provide superior shock absorption for heavy industrial components. Engineered for zero downtime and maximum throughput, it eliminates the need for plastic bubble wrap by providing a 100% recyclable alternative.",
        image: "/product/Fillezy-Hexa-Paper.webp",
        gallery: [
            "/product/Fillezy-Hexa-Paper.webp",
            "/product/Fillezy-Hexa-Papers.webp",
            "/product/Hexa Paper Application.webp",
            "/product/Hexa Paper Application 1.webp",
            "/product/Hexa Paper Application 2.webp",
            "/product/Hexa Paper Application 3.webp",
            "/product/Hexa Paper Application 4.png"
        ],
        videoUrl: "https://www.youtube.com/embed/WjgrvyX6p6A",
        videoGallery: [
            "https://www.youtube.com/embed/WjgrvyX6p6A",
            "https://www.youtube.com/embed/KlkxCoTnPVI"
        ],
        category: "Machines",
        specialOffer: "Free Dispenser with 100 rolls*",
        specs: [
            { label: "Gsm Rating", value: "90 GSM" },
            { label: "Paper Burst", value: "30-40 Factor" },
            { label: "Core ID", value: "2 inches" },
            { label: "Format", value: "3D Honeycomb" }
        ],
        features: ["Interlocking Hex-Plying", "Volumetric Expansion Logic", "100% Biodegradable Output", "Abrasion Resistance Shield"],
        suitableIndustries: ["Automotive Spare Parts", "Ceramics & Glass", "Electronics", "Fragile Luxury Goods"],
        variants: [
            { label: "Paper Width", options: ["300mm", "400mm", "600mm"] },
            { label: "Color Options", options: ["Brown", "White", "Red", "Black"] }
        ],
        applicationTables: [
            {
                title: "Engineering Protocol: Hexa Specifications",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Material Type", "FSC Kraft / Recycled"],
                    ["Roll Width", "Upto 600mm"],
                    ["Flat Length", "250 mtr"],
                    ["Expanded Length", "420 mtr"],
                    ["Burst Factor", "30-40"]
                ]
            },
            {
                title: "Operational Protocol: System Features",
                headers: ["Feature Matrix", "Status"],
                rows: [
                    ["FSC Complaint", "CERTIFIED"],
                    ["Eco-Friendly", "YES"],
                    ["Compostable", "YES"],
                    ["Anti Corrosion", "YES"],
                    ["CO2 Reduction 70%", "VERIFIED"],
                    ["Degradable", "100%"],
                    ["Pollution Control Board", "APPROVED"]
                ]
            }
        ]
    },
    {
        id: "paper-shark",
        title: "Fillezy® Paper Shark",
        techId: "SHK-M3",
        description: "Next-gen high-speed paper cushioning system for rapid fulfillment.",
        longDescription: "The Fillezy® Paper Shark is designed for speed and versatility. It rapidly converts kraft paper into effective void fill and cushioning, featuring a unique 'Shark' tear-assist mechanism for quick, effortless packing. Ideal for high-volume e-commerce environments requiring sustainable, fast-paced protection.",
        image: "/product/Paper-Shark.webp",
        gallery: [
            "/product/Paper-Shark.webp",
            "/product/Paper-Shark-Application.webp",
            "/product/Paper-Shark-Application-1.webp",
            "/product/Paper-Shark-Application-2.webp",
            "/product/Paper-Shark-Application-3.webp"
        ],
        category: "Machines",
        specs: [
            { label: "Dimension", value: "621x621x1500mm" },
            { label: "Color", value: "Brown Kraft Paper" },
            { label: "Power", value: "200-230V" },
            { label: "Productivity", value: "50-150 m/min" }
        ],
        features: ["100% Recyclable/Compostable", "Systematic High-Speed Flow", "Pre-Perforation Technology", "Protective Shield Logic", "Cost Reduction Matrix"],
        suitableIndustries: ["High-Volume E-commerce", "Industrial Logistics", "Electronics Fulfillment", "Global 3PL"],
        moreSpecs: [
            { label: "System Weight", value: "20 kg" },
            { label: "CO2 Reduction", value: "70% Certified" },
            { label: "Instant Start", value: "Supported" },
            { label: "Certification", value: "Pollution Control Board (IN)" },
            { label: "Integrations", value: "Bins & Conveyors Ready" }
        ],
        applicationTables: [
            {
                title: "Efficiency Protocol: Shark vs Bubble",
                headers: ["System", "Manual Packing", "Paper Shark"],
                rows: [
                    ["Seconds per Box", "45 sec", "4 sec"],
                    ["Throughput", "1X", "11X Productivity"],
                    ["Cost Comparison", "100%", "50% Savings vs Bubble"]
                ]
            },
            {
                title: "Technical Matrix: Paper Shark Specifications",
                headers: ["Parameter", "Industrial Value"],
                rows: [
                    ["Dimension (L x W x H)", "621x621x1500mm."],
                    ["Color", "Brown Kraft Paper"],
                    ["Power Consumption", "200-230V."],
                    ["Productivity", "50-150 m/min."],
                    ["Weight", "20 kg"],
                    ["Offer", "Free Machine with 200 Bundles & Paper*"]
                ]
            },
            {
                title: "Operational Protocol: System Features",
                headers: ["Feature Matrix", "Status"],
                rows: [
                    ["Custom Size", "CHECK_SYNC"],
                    ["Eco-Friendly", "CERTIFIED"],
                    ["Instant Start", "ACTIVE"],
                    ["Compostable", "RECYCABLE"],
                    ["Integrations (bins & conveyors)", "READY"],
                    ["CO2 reduction 70%", "VERIFIED"],
                    ["Degradable", "100%"],
                    ["Pollution Control Board (IN)", "APPROVED"]
                ]
            }
        ]
    },
    {
        id: "fillezy-rapid",
        title: "Fillezy® Rapid Machine",
        techId: "RAP-M0",
        description: "Universal air cushion generator inflating cushions and quilts at 37m/min.",
        longDescription: "The Fillezy® Rapid is a revolutionary universal device capable of producing multiple variants of air cushioning products. Developed by our dedicated R&D team, it inflates all films from 200mm cushions to 800mm wide quilts. Weighing less than 10kg, it is portable, practical, and programmable with 10 presets to suit diverse industrial requirements.",
        image: "/product/Fillezy Rapid Orange v2.webp",
        videoUrl: "https://www.youtube.com/embed/UyZrtOo_DC0",
        videoGallery: [
            "https://www.youtube.com/embed/6WY1rIb0EN4",
            "https://www.youtube.com/embed/xCCLPySnkOg",
            "https://www.youtube.com/embed/VMBSng_gGG0",
            "https://www.youtube.com/embed/putyMACb5Bs",
            "https://www.youtube.com/embed/Kea_HESxJ44"
        ],
        category: "Machines",
        specs: [
            { label: "Max Speed", value: "37 m/min" },
            { label: "Film Width", value: "100mm to 800mm" },
            { label: "Thickness", value: "12μm - 70μm" },
            { label: "Warm-up Time", value: "4 Seconds" }
        ],
        features: ["RFID Film Recognition", "Patented Thermal Control", "10 Programmable Presets", "Assembled in India // US Tech"],
        gallery: [
            "/product/Fillezy Rapid Orange v2.webp",
            "/product/Fillezy Rapid Red v2.webp",
            "/product/Fillezy Rapid Grey v2.webp",
            "/product/Rapid Bubbles.webp",
            "/product/Rapid Film.webp",
            "/product/Rapid Quilt.webp"
        ],
        colorImages: {
            "Safety Orange": "/product/Fillezy Rapid Orange v2.webp",
            "Industrial Red": "/product/Fillezy Rapid Red v2.webp",
            "Tech Grey": "/product/Fillezy Rapid Grey v2.webp"
        },
        suitableIndustries: ["E-commerce", "Pharmacy", "Retail Distribution", "Sensitive Instruments"],
        variants: [
            { label: "Model Variant", options: ["RAPID_X1 (Std)", "RAPID_PRO (Extreme)"] },
            { label: "Machine Color", options: ["Safety Orange", "Industrial Red", "Tech Grey"] },
            { label: "Integration", options: ["Overhead Bin", "Winder Ready", "Movable Trolley"] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Rapid Specifications",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Start Time", "4 Seconds"],
                    ["Fixed Programs", "10 Presets"],
                    ["Leakage from Start", "Zero (1 Pouch Peak)"],
                    ["Construction", "Aluminum and SS"],
                    ["Warranty", "5 Years | 24x7 Ready"]
                ]
            },
            {
                title: "Universal Film Compatibility Matrix",
                headers: ["Asset Type", "Thickness", "Application"],
                rows: [
                    ["AER Cushion", "15-50 mic", "Void Fill / Block & Brace"],
                    ["AER Quilt", "20-50 mic", "Surface Wrap / Padding"],
                    ["Paper AER", "40-50 gsm", "Eco-Padding"],
                    ["Bio AER", "12-70 mic", "Compostable Fulfillment"]
                ]
            }
        ]
    },
    {
        id: "paper-smart",
        title: "Fillezy® Paper-Smart Machine",
        techId: "SMT-M2",
        description: "Industrial paper pad cushion generator for heavy-duty protection.",
        longDescription: "The Fillezy® Paper-Smart Machine is the industrial standard for generating high-density paper pads. It transforms multi-ply Kraft paper into structural cushions that provide superior shock absorption for heavy automotive and engineering parts. Featuring an automated blade cutter and instant start/stop logic, it maximizes throughput while maintaining 100% compostability.",
        image: "/product/Fillezy Paper Smart Machine.webp",
        // No video URL as per request
        gallery: [
            "/product/Fillezy Paper Smart Machine.webp",
            "/product/Fillezy Paper Smarts.webp",
            "/product/Fillezy Paper Smarts 1.webp",
            "/product/Fillezy Paper Smarts 2.webp",
            "/product/Fillezy Paper Smarts 3.webp",
            "/product/Fillezy Paper Smarts 4.webp"
        ],
        category: "Machines",
        specs: [
            { label: "Operation", value: "Instant Start / Stop" },
            { label: "Cutting Logic", value: "Automatic Blade" },
            { label: "Material", value: "Multi-Ply Kraft" },
            { label: "Certification", value: "CE / Pollution Control" }
        ],
        features: ["Precision Pad Count", "Metered Output", "Anti-Corrosion Paper Ready", "Digital Smart Display"],
        suitableIndustries: ["Automotive Logistics", "Heavy Engineering", "Industrial Electronics", "Fulfillment Hubs"],
        applicationTables: [
            {
                title: "Technical Matrix: Paper-Smart Machine",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Control System", "Digital Smart Control"],
                    ["Cutting Protocol", "Automated Blade Cutter"],
                    ["Start Time", "Instant (Zero Buffer)"],
                    ["Eco Compliance", "100% Biodegradable Output"],
                    ["Warranty", "Industrial Grade Support"]
                ]
            }
        ]
    },

    {
        id: "paper-eco",
        title: "Fillezy® Paper Eco Dispenser",
        techId: "ECO-M0",
        description: "Sustainable no-electricity manual dispenser for decentralized stations.",
        longDescription: "The Fillezy® Eco Machine is our answer to sustainable, decentralized packaging needs. This system requires zero electricity, providing instant recycled void fill for low-to-medium volume stations. It effectively fills empty space in a box to prevent your product from moving and getting damaged. Easy to install frame design can be placed at any pack station.",
        image: "/product/Fillezy Eco Machine.webp",
        category: "Machines",
        specs: [
            { label: "Dimensions", value: "621x621x1500mm" },
            { label: "Power", value: "Zero (No Electricity)" },
            { label: "Productivity", value: "Manual / Pull Logic" },
            { label: "System Weight", value: "20 kg" }
        ],
        suitableIndustries: ["E-commerce Fulfillment", "Warehouse Logistics", "Decentralized Packing Stations", "SME Shipping"],
        features: ["Energy-Zero Operation", "Rapid Feed Logic", "Maintenance-Free Chassis", "100% Recyclable Paper"],
        gallery: [
            "/product/Fillezy Eco Machine.webp",
            "/product/Eco Paper 1.webp",
            "/product/Eco Paper 2.webp",
            "/product/Eco Paper 3.webp",
            "/product/Eco Paper 4.webp"
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Eco Specifications",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Operation", "Manual Pulling"],
                    ["Material", "Pre Perforated Paper"],
                    ["Color Options", "White / Black"],
                    ["Maintenance", "Zero Chassis"],
                    ["Mounting", "Frame Design Ready"]
                ]
            },
            {
                title: "Sustainability Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["CO2 Reduction", "70% Verified"],
                    ["Compostability", "100% Biodegradable"],
                    ["FSC Status", "Certified Supply"],
                    ["Lead/Mercury Free", "VERIFIED"]
                ]
            }
        ]
    },

    // MATERIALS
    {
        id: "air-bubbles",
        title: "Fillezy® Air Bubbles",
        techId: "BUB-A1",
        description: "Industrial-strength air bubble sheets capable of withstanding 120kg loads.",
        longDescription: "Fillezy® Air Bubbles provide ultra-reliable surface protection. Our proprietary film blend possesses a strength that allows a 120kg load to stand on the bubbles without puncturing. Designed for wrapping, void fill, and corner protection, it is 100% recyclable and available with Rust-X VCI for metal protection.",
        image: "/product/Fillezy_Bubble.webp",
        videoUrl: "https://www.youtube.com/embed/xCCLPySnkOg",
        gallery: [
            "/product/Fillezy_Bubble.webp",
            "/product/Fillezy Bubble Applications.webp",
            "/product/Fillezy Bubble Applications1.webp",
            "/product/Air Bubbles.webp",
            "/product/Rapid Bubbles.webp"
        ],
        category: "Materials",
        specs: [
            { label: "Load Rating", value: "120 kg (No Puncture)" },
            { label: "Micron Range", value: "20, 35, 50 μm" },
            { label: "Standard Length", value: "200 mtr / 400 mtr" },
            { label: "Bubble Diameter", value: "30mm / 43mm" }
        ],
        features: ["ASTM D1709 Puncture Proof", "Moisture Resistant Barrier", "Rust-X VCI Option Available", "Easy Manual Trimming"],
        suitableIndustries: ["Fine Art Shipping", "Heavy Machinery Parts", "Consumer Electronics", "VCI Metal Protection"],
        variants: [
            { label: "Film Thickness", options: ["20 Microns", "35 Microns", "50 Microns"] },
            { label: "Bubble Diameter", options: ["30mm (Standard)", "43mm (Large)"] },
            { label: "Roll Width", options: ["200mm", "400mm"] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Sizes",
                headers: ["Model No", "Perf (MM)", "Width (MM)", "Length (M)", "Microns", "Sheets/Roll"],
                rows: [
                    ["FILLEZY AIR BUBBLE", "400", "200", "300", "22", "1500"],
                    ["FILLEZY AIR BUBBLE", "400", "200", "200", "35", "1000"],
                    ["FILLEZY AIR BUBBLE", "400", "200", "200", "50", "750"]
                ]
            },
            {
                title: "Engineering Protocol: Load Displacement",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Puncture Resistance", "120kg Load Tested"],
                    ["VCI Integration", "Available for Metals"],
                    ["Air Retention", "High-Barriered Blend"],
                    ["Transparency", "Visual Inspection Ready"]
                ]
            },
            {
                title: "Safety & Compliance Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["RoHS Directives", "COMPLIANT"],
                    ["REACH (EU)", "EXPORT READY"],
                    ["Lead/Mercury Free", "VERIFIED"],
                    ["Recyclability", "100% LDPE"]
                ]
            }
        ]
    },
    {
        id: "air-cushion",
        title: "Fillezy® Air Cushion",
        techId: "CSH-A2",
        description: "High-volume polyethylene void fill pillows for efficient shipping.",
        longDescription: "Fillezy® Air Cushions are the most efficient way to fill large voids. Made from 100% recyclable virgin polymers, these pillows reduce freight costs while providing reliable block-and-brace protection. Featuring a whopping 65 kg/sq cm strength, they are ideal for void fill, interleaving, and shipping container cushioning.",
        image: "/product/Fillzy Air CUshion.webp",
        videoUrl: "https://www.youtube.com/embed/UyZrtOo_DC0", // Shared machinery ref or specific cushion video
        category: "Materials",
        specs: [
            { label: "Impact Strength", value: "65 kg / sq cm" },
            { label: "Micron Range", value: "12, 15, 20, 35, 50 μm" },
            { label: "Standard Length", value: "50 mtr / 500 mtr" },
            { label: "Customizable", value: "Print & Size Ready" }
        ],
        features: ["Fastest-Filling Valve Tech", "Auto-Shut-Off Safety", "Rust-X VCI Option", "High Volumetric Efficiency"],
        suitableIndustries: ["E-commerce Logistics", "Retail Fulfilment", "Warehouse Distribution", "Container Shipping"],
        variants: [
            { label: "Pillow Size (MM)", options: ["100x200", "120x200", "130x200", "200x200"] },
            { label: "Film Thickness", options: ["15μm", "22μm", "35μm", "50μm"] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Sizes",
                headers: ["Width (MM)", "Perf (MM)", "Length (M)", "Microns", "Bags/Roll"],
                rows: [
                    ["200", "100", "500", "22", "5000"],
                    ["200", "120", "500", "22", "4200"],
                    ["200", "130", "500", "22", "3850"],
                    ["200", "200", "500", "22", "2500"],
                    ["200", "100", "250", "35", "2500"],
                    ["200", "120", "250", "35", "2100"],
                    ["200", "130", "250", "35", "1925"],
                    ["200", "200", "250", "35", "1000"],
                    ["200", "120", "250", "50", "2100"],
                    ["200", "200", "250", "50", "1000"]
                ]
            },
            {
                title: "Engineering Protocol: Strength Logic",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Strength Peak", "65 kg / sq cm"],
                    ["Valve Type", "Check-Valve Inflatable"],
                    ["Recyclability", "LDPE Category 4"],
                    ["Elastic Recovery", "Industrial Grade"]
                ]
            },
            {
                title: "Safety & Compliance Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["RoHS Directives", "COMPLIANT"],
                    ["REACH (EU)", "EXPORT READY"],
                    ["Lead/Mercury Free", "VERIFIED"],
                    ["Recyclability", "100% LDPE"]
                ]
            }
        ]
    },
    {
        id: "air-quilts",
        title: "Fillezy® Air Quilts",
        techId: "QLT-A3",
        description: "Wide-format protection for handbags, accessories, and surface wrapping.",
        longDescription: "Fillezy® Air Quilts are specifically designed for wrapping large surfaces and filling tight spaces in luxury goods like leather bags. The low-pressure pillow logic with air transfer makes these cushions extremely easy to pack into awkward spaces. Our proprietary blend provides outstanding puncture resistance for sensitive transit.",
        image: "/product/Fillezy Quilt v2.webp",
        gallery: [
            "/product/Fillezy Quilt v2.webp",
            "/product/Rapid Quilt v2.webp",
            "/product/Fillezy Quilt Applications v2.webp",
            "/product/Fillezy Quilt Application 1 v2.webp"
        ],
        category: "Materials",
        specs: [
            { label: "Roll Length", value: "250 mtr / 500 mtr" },
            { label: "Micron Range", value: "20, 35, 50 μm" },
            { label: "Best Suited", value: "Leather Goods / Bags" },
            { label: "Puncture Resis", value: "Reinforced Blend" }
        ],
        features: ["Leather Goods Best Suited", "Void Fill / Block & Brace Ready", "Rust-X VCI Metal Protection", "Bio-Degradable Option Available"],
        suitableIndustries: ["Fashion & Luxury", "Leather Accessories", "Fragile Home Decor"],
        variants: [
            { label: "Quilt Width", options: ["200mm", "400mm", "600mm", "800mm"] },
            { label: "Film Thickness", options: ["20μm", "35μm", "50μm"] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Sizes",
                headers: ["Model No", "Width (MM)", "Perf (MM)", "Length (M)", "Microns", "Bags/Roll"],
                rows: [
                    ["FILLEZY Air Quilt", "200", "400", "300", "22", "1500"],
                    ["FILLEZY Air Quilt", "200", "400", "300", "35", "5000"],
                    ["FILLEZY Air Quilt", "200", "400", "200", "22", "1000"]
                ]
            },
            {
                title: "Engineering Protocol: Wrapping Dynamics",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Strength Peak", "60 kg / sq cm"],
                    ["Valve Type", "Internal Air Transfer"],
                    ["Recyclability", "LDPE Category 4"],
                    ["Flexibility", "High Conformal Wrap"]
                ]
            },
            {
                title: "Safety & Compliance Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["RoHS Directives", "COMPLIANT"],
                    ["REACH (EU)", "EXPORT READY"],
                    ["Lead/Mercury Free", "VERIFIED"],
                    ["Recyclability", "100% LDPE"]
                ]
            }
        ]
    },
    {
        id: "air-tubes",
        title: "Fillezy® Air Tubes",
        techId: "TUB-A4",
        description: "Individual chamber failsafe technology for bottle and electronics protection.",
        longDescription: "Fillezy® Air Tubes utilize two-way folding air tube technology to offer exceptional corner protection. Each chamber is independently inflated, making it excellent for shielding sharp-edged tin products, bottles, and breakable pottery. The bags hold items perfectly in place, guarding against impact and vibration during high-speed transit.",
        image: "/product/Fillezy Air Tubes v2.webp",
        gallery: [
            "/product/Fillezy Air Tubes v2.webp",
            "/product/Fillezy Tube Application v2.webp",
            "/product/Fillezy Tube Application 1 v2.webp",
            "/product/Fillezy Tube APplicaitons 2 v2.webp"
        ],
        category: "Materials",
        specs: [
            { label: "Folding Type", value: "2-Way Folding Tech" },
            { label: "Protection", value: "Exceptional Corner Guard" },
            { label: "Best Suited", value: "Tin Products / Bottles" },
            { label: "Roll Length", value: "250 mtr / 500 mtr" }
        ],
        features: ["Chamber Independence", "Reusable Inflation Valve", "Anti-Impact Vibration Guard", "High Portability System"],
        suitableIndustries: ["Wine & Spirits", "Industrial Tin-ware", "Advanced Electronics"],
        variants: [
            { label: "Tube Format", options: ["2-Way Folding", "4-Way Folding"] },
            { label: "Width Range", options: ["200mm", "400mm"] },
            { label: "Film Strength", options: ["20μm", "35μm"] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Measurement",
                headers: ["Width (MM)", "Perf (MM)", "Length (M)", "Microns"],
                rows: [
                    ["200", "50", "500", "20"],
                    ["200", "50", "250", "35"],
                    ["400", "50", "500", "20"],
                    ["400", "50", "250", "35"]
                ]
            },
            {
                title: "Engineering Protocol: Failsafe Column",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Chamber Logic", "Uni-Valve Isolated"],
                    ["Corner Protection", "Reinforced Folding Guard"],
                    ["Recyclability", "100% LDPE"],
                    ["RoHS Compliance", "Certified REACH Ready"]
                ]
            },
            {
                title: "Safety & Compliance Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["RoHS Directives", "COMPLIANT"],
                    ["REACH (EU)", "EXPORT READY"],
                    ["Lead/Mercury Free", "VERIFIED"],
                    ["Recyclability", "100% LDPE"]
                ]
            }
        ]
    },
    {
        id: "double-cushion",
        title: "Fillezy® Double Cushion",
        techId: "DBL-C5",
        description: "Heavy-duty dual-layer cushions with 65 kg/sq cm impact resistance.",
        longDescription: "Fillezy® Double Cushion is our most robust air-based material, providing a whopping 65 kg per square cm of strength. Featuring a dual-layer buffer logic, it is specifically engineered for medical instruments, heavy industrial parts, and high-value electronics that require the highest available shock shield.",
        image: "/product/Fillezy Double CUshion.webp",
        category: "Materials",
        specs: [
            { label: "Strength Peak", value: "65 kg / sq cm" },
            { label: "Micron Range", value: "25, 35, 50 μm" },
            { label: "Roll Length", value: "50 mtr rolls" },
            { label: "Dimensions", value: "200 x 200 mm" }
        ],
        features: ["65 kg / sq cm Strength", "Dual-Ply Laminated Logic", "VCI Protection Available", "Biodegradable Choice Available"],
        suitableIndustries: ["Industrial Equipment", "Laboratory Instruments", "High-Value Servers", "Metal Components"],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Sizes",
                headers: ["Model No", "Width (MM)", "Perf (MM)", "Length (M)", "Microns"],
                rows: [
                    ["FILLEZY DOUBLE CUSHION", "200", "200", "50", "22"],
                    ["FILLEZY DOUBLE CUSHION", "200", "200", "50", "35"],
                    ["FILLEZY DOUBLE CUSHION", "200", "200", "50", "50"]
                ]
            },
            {
                title: "Engineering Protocol: Double-Buffer Protocol",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Buffering Strength", "65kg/sq.cm Peak"],
                    ["Layer Logic", "Dual-Ply Laminated"],
                    ["Air Retention", "Superior Thermal Lock"],
                    ["Industrial Grade", "A+++ Fulfillment Ready"]
                ]
            },
            {
                title: "Safety & Compliance Matrix",
                headers: ["Standard", "Status"],
                rows: [
                    ["RoHS Directives", "COMPLIANT"],
                    ["REACH (EU)", "EXPORT READY"],
                    ["Lead/Mercury Free", "VERIFIED"],
                    ["Recyclability", "100% LDPE"]
                ]
            }
        ]
    },
    {
        id: "paper-aer",
        title: "Fillezy® Paper Aer",
        techId: "AER-P6",
        description: "Compostable, FSC-certified paper air cushions for green supply chains.",
        longDescription: "Paper-Aer is the premier environmentally friendly alternative to traditional air cushions. Made of flexible recycled paper and FSC-compliant materials, these cushions are fully compostable and biodegradable. The unique inner sealing layer is also made of bio-plastic that degrades naturally, ensuring zero damage to both products and the planet.",
        image: "/product/Aer Paper Cushion.webp",
        gallery: [
            "/product/Aer Paper Cushion.webp",
            "/product/Aer Paper Cushion 1.webp",
            "/product/Aer Paper Cushion 2.webp",
            "/product/Aer Paper Cushion 3.webp"
        ],
        category: "Materials",
        specs: [
            { label: "Eco-Rating", value: "100% Compostable" },
            { label: "Certification", value: "FSC / EN 13432" },
            { label: "Puncture Resis", value: "High-Tensile Paper" },
            { label: "Seal Tech", value: "Bio-Inert Layer" }
        ],
        features: ["Zero Plastic Waste", "Home Compost Integrity", "Carbon-Neutral Choice", "FSC Supply Integrity"],
        suitableIndustries: ["Sustainable Fashion", "Organic Cosmetics", "Eco-Ecommerce", "Global Logistics"],
        applicationTables: [
            {
                title: "Technical Matrix: Standard Measurement",
                headers: ["Width (MM)", "Perf (MM)", "Length (M)", "Material Depth"],
                rows: [
                    ["200", "100", "300", "70-90 GSM"],
                    ["200", "120", "300", "70-90 GSM"],
                    ["200", "200", "300", "70-90 GSM"]
                ]
            },
            {
                title: "Sustainability Protocol: Paper-Aer",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Compostability", "Home & Industrial Verified"],
                    ["Supply Chain", "100% Traceable FSC"],
                    ["Degradation Time", "Zero Microplastic Residue"],
                    ["Surface Texture", "Premium Paper Feel"]
                ]
            }
        ]
    },
    {
        id: "smart-pads",
        title: "Fillezy® Paper Smart Pads",
        techId: "SMT-P7",
        description: "Multi-ply high-absorption paper cushions for medium-to-large cargo.",
        longDescription: "Fillezy® Smart Pads are created from 100% recycled structural material to provide maximum void fill with minimum usage. The unique 'crumpled padding' logic provides industrial-grade shock absorption, supporting loads from 5kg to 50kg. It is the perfect solution for shipping machinery, ceramics, and heavy automotive parts.",
        image: "/product/Fillezy Paper Smarts.webp",
        gallery: [
            "/product/Fillezy Paper Smarts.webp",
            "/product/Fillezy Paper Smarts 1.webp",
            "/product/Fillezy Paper Smarts 2.webp",
            "/product/Fillezy Paper Smarts 3.webp",
            "/product/Fillezy Paper Smarts 4.webp"
        ],
        category: "Materials",
        specs: [
            { label: "Load Support", value: "5 kg - 50 kg" },
            { label: "Ply Type", value: "Multi-Ply Reinforced" },
            { label: "Material", value: "100% Recycled Kraft" },
            { label: "Disposal", value: "100% Recyclable" }
        ],
        features: ["Structural Shock Buffer", "Material Efficiency Logic", "Heavy Cargo Padding"],
        suitableIndustries: ["Automotive Parts", "Ceramics & Glass", "Industrial Machinery"],
        applicationTables: [
            {
                title: "Engineering Protocol: Padding Efficiency",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Pad Height", "50mm - 75mm"],
                    ["Paper Grade", "Recycled structural Kraft"],
                    ["Shock Absorption", "Dynamic Displacement Logic"],
                    ["Eco Compliance", "Zero Chemical Additives"]
                ]
            }
        ]
    },
    {
        id: "hexa-papers",
        title: "Fillezy® Hexa Paper",
        techId: "HEX-P8",
        description: "Interlocking hexagonal honeycomb wrapping for premium fragile goods.",
        longDescription: "Fillezy® Hexa Paper uses a specialized hexagonal geometry to provide volumetric expansion that is 40% more efficient than standard paper wrapping. This honeycomb structure provides superior cushioning and surface protection, eliminating the need for bubble wrap in luxury and electronics shipping. Made from high-strength FSC Kraft paper.",
        image: "/product/Fillezy Hexa Papers.webp",
        videoUrl: "https://www.youtube.com/embed/WjgrvyX6p6A",
        category: "Materials",
        specs: [
            { label: "Geometry", value: "Honeycomb Hex" },
            { label: "Expansion", value: "1:1.6 Stretch" },
            { label: "Material", value: "Reinforced Kraft" },
            { label: "Certification", value: "FSC Certified Source" }
        ],
        features: ["Interlocking Hex Protocol", "No Adhesive Required", "40% Volumetric Efficiency", "Zero Plastic Alternative"],
        gallery: [
            "/product/Fillezy Hexa Papers.webp",
            "/product/Fillezy-Hexa-Paper.webp",
            "/product/Hexa Paper Application.webp",
            "/product/Hexa Paper Application 1.webp",
            "/product/Hexa Paper Application 2.webp",
            "/product/Hexa Paper Application 3.webp",
            "/product/Hexa Paper Application 4.png"
        ],
        suitableIndustries: ["Luxury Retail", "Fragile Artworks", "Eco-Cosmetics", "Gift Packaging"],
        applicationTables: [
            {
                title: "Structural Protocol: Hex-Cell Expansion",
                headers: ["Feature", "Benefit"],
                rows: [
                    ["Honeycomb Logic", "Interlocking cells secure item"],
                    ["Expansion Ratio", "1:1.6 Stretch Efficiency"],
                    ["Surface Texture", "Anti-Scratch Protection"],
                    ["Ecological Status", "FSC Certified Source"]
                ]
            }
        ]
    },

    // BIO AER
    {
        id: "bio-film",
        title: "Fillezy® Bio Aer Film",
        techId: "BIO-F1",
        description: "100% starch-based home-compostable fulfillment film.",
        longDescription: "Fillezy® Bio Aer is the industrial benchmark for carbon-neutral packaging. Made from Corn and Cassava starch, it is 100% biologically degradable. Our vertical integration allows us to supply this premium film cheaply even in small quantities. It features a high 95-99% air ratio and has the lowest volume-material ratio of all void-fill options.",
        image: "/product/Bio-Aer.webp",
        gallery: [
            "/product/Bio-Aer.webp",
            "/product/Bio Aer Machine.webp"
        ],
        category: "Bio Aer",
        specs: [
            { label: "Main Material", value: "Corn & Cassava Starch" },
            { label: "Air Ratio", value: "95% to 99% Air" },
            { label: "Compostability", value: "Home & Industrial" },
            { label: "Climate Tech", value: "Climate Partner Sync" }
        ],
        features: ["100% Starch-Based Polymer", "Carbon-Neutral Signal", "Lowest Volume-Material Ratio", "High-Volume Transit Sufficiency"],
        suitableIndustries: ["Eco-Fulfillment", "Organic Retail", "Climate-Conscious Pharma"],
        applicationTables: [
            {
                title: "Sustainability Protocol: Bio-Aer",
                headers: ["Parameter", "Technical Value"],
                rows: [
                    ["Degradability", "100% Biological"],
                    ["Material Count", "1 - 5% Starch Polymer"],
                    ["Logistics Yield", "1 Truck = 40,000 m3 Void Fill"],
                    ["Eco Certification", "Climate Partner Verified"]
                ]
            }
        ]
    },
    {
        id: "bio-aer-machine",
        title: "Fillezy® Bio Aer Machine",
        techId: "BIO-M1",
        description: "Specialized air cushion generator for high-speed eco-film inflation.",
        longDescription: "The Fillezy® Bio Aer Machine is engineered specifically for the unique physical properties of starch-based films. It features precise thermal control for perfect sealing of corn and cassava starch polymers without shrinking. Capable of processing films from 12 to 70 microns, it is the industrial benchmark for sustainable fulfillment centers.",
        image: "/product/Bio Aer Machine.webp",
        videoUrl: "https://www.youtube.com/embed/UyZrtOo_DC0",
        category: "Bio Aer",
        specs: [
            { label: "Film Type", value: "Starch/Compostable" },
            { label: "Thickness", value: "12μm - 70μm" },
            { label: "Speed", value: "37 mtrs/min" },
            { label: "Certification", value: "US/EU Tech Standards" }
        ],
        features: ["Starch-Polymer Sealing Tech", "Precision Heat Mapping", "10 Preset Bio-Programs", "Industrial Heavy Duty Build"],
        suitableIndustries: ["Green Logistics", "Renewable Energy Support", "Organic Supply Chains"],
        applicationTables: [
            {
                title: "Technical Matrix: Innovation Protocol",
                headers: ["Parameter", "Industrial Value"],
                rows: [
                    ["Thickness Range", "12 - 70 microns"],
                    ["Film Width", "100 - 800 mm"],
                    ["Start Time", "4 Seconds"],
                    ["Speed", "37 mtrs per minute"],
                    ["Programs", "10 Fixed Programs"],
                    ["Leakage from Start", "1 Pouch Peak"],
                    ["Service Support", "24x7 WhatsApp Video"],
                    ["Global Presence", "45 Countries / 80 Managers"],
                    ["Warranty", "5 Years (Industrial Grade)"],
                    ["Ease of Operations", "Digital Display"]
                ]
            },
            {
                title: "Universal Variant Compatibility",
                headers: ["Category", "Variant Options"],
                rows: [
                    ["Core Materials", "Cushion, Bubble, Tube, Quilt, Hexa"],
                    ["Specialty", "Pad locks, Mats, Hearts, Smileys"],
                    ["Protection", "Shoe Inserts, Mailer Bubble Bags"],
                    ["Aesthetics", "Various Custom Colours"]
                ]
            }
        ]
    },

    // INTEGRATIONS
    {
        id: "dunnage-bags",
        title: "Fillezy® Kraft Dunnage Bags",
        techId: "INT-D1",
        description: "Industrial Kraft paper dunnage bags for heavy-duty cargo stabilization.",
        longDescription: "Fillezy® Kraft Dunnage Bags are the ultimate solution for restraining cargo movement in trucks, containers, or railcars. Engineered with a multi-ply high-quality Kraft paper outer and a co-extruded PE-mox inner bladder, they provide exceptional structural integrity and air tightness. These bags absorb vibrations and fill variable voids, ensuring 100% cargo stability during rail, sea, or road transit.",
        image: "/product/Dunnage Bags.webp",
        category: "Integrations",
        specs: [
            { label: "Construction", value: "Multi-Ply Kraft + PE-mox" },
            { label: "Burst Pressure", value: "Exceeds EU Standards" },
            { label: "Recyclability", value: "100% Recyclable/Reusable" },
            { label: "Usage", value: "Void Fill & Cargo Bracing" }
        ],
        features: ["High Tensile Strength Kraft", "Turbo High-Flow Valve", "Failsafe Air Retention", "Moisture Resistant Coating Option"],
        suitableIndustries: ["Sea-Freight Carriers", "Rail Logistics", "Industrial Export", "Chemical Logistics"],
        variants: [
            { label: "Ply Level", options: ["1-Ply (Light)", "2-Ply (Standard)", "4-Ply (Heavy Duty)", "6-Ply (Super Heavy)"] },
            { label: "Standard Sizes", options: ["36x48\"", "36x66\"", "36x84\"", "48x48\"", "48x96\""] }
        ],
        applicationTables: [
            {
                title: "Technical Matrix: Ply & Pressure",
                headers: ["Ply Rating", "Type", "Max Filling Pressure"],
                rows: [
                    ["1-PLY", "SAFVER Light", "13 kPa (1.9 PSI)"],
                    ["2-PLY", "AAR Level 1", "20 kPa (2.9 PSI)"],
                    ["4-PLY", "HEAVY Level 2", "40 kPa (5.8 PSI)"],
                    ["6-PLY", "SUPER HEAVY", "60 kPa (8.7 PSI)"]
                ]
            }
        ]
    },
    {
        id: "jet-stream",
        title: "Fillezy® Jet Stream Overhead",
        techId: "INT-J2",
        description: "Automated overhead delivery system for centralized air-cushion production.",
        longDescription: "The Fillezy® Jet Stream system is an architectural integration that moves packaging production to the overhead plane. By streaming inflated cushions directly into overhead accumulation bins, it recovers 100% of packing station floor space. Engineered for high-volume 3PL and E-commerce hubs, the system increases throughput by up to 25% through gravity-fed delivery logic.",
        image: "/product/FIlezy Handling Systems.webp",
        category: "Integrations",
        specs: [
            { label: "Productivity", value: "+25% Throughput" },
            { label: "Integration", value: "Rapid-X1 / Bio-Aer compatible" },
            { label: "Scaling", value: "Up to 8 Multi-Port Ports" },
            { label: "Operation", value: "Sensor-Sync Automated" }
        ],
        features: ["Floor Space Recovery", "Centralized Supply Hub", "Gravity-Fed Delivery", "Modular Framework"],
        suitableIndustries: ["3PL Fulfillment Hubs", "E-commerce Mega-Centers", "Automotive Distribution"],
        variants: [
            { label: "Bin Capacity", options: ["Standard (1.2m3)", "High-Volume (2.5m3)"] },
            { label: "Frame Type", options: ["Ceiling Mounted", "Floor Stand Support"] }
        ],
        applicationTables: [
            {
                title: "Operational Matrix: Jet Stream Logic",
                headers: ["System Component", "Functional Role"],
                rows: [
                    ["Rapid Machine Interface", "Production Core"],
                    ["Streaming Arm", "Overhead Transfer"],
                    ["Accumulation Bin", "Buffer Storage (1.2m3 - 2.5m3)"],
                    ["Gravity Chute", "Station Delivery"]
                ]
            }
        ]
    },
    {
        id: "movable-bins",
        title: "Fillezy® Movable Bins",
        techId: "INT-M3",
        description: "Modular material handling bins with high-load 360-degree mobility.",
        longDescription: "Engineered for lean manufacturing environments, Fillezy® Movable Bins provide flexible accumulation and transfer of protective materials. These bins feature a reinforced industrial chassis and high-load casters with 360-degree rotation for effortless maneuverability. Equipped with magnetic locks and optional anti-static coating, they are the standard for mobile fulfillment stations.",
        image: "/product/Fillezy Bins.webp",
        category: "Integrations",
        specs: [
            { label: "Volume", value: "1.2 Cubic Meters" },
            { label: "Mobility", value: "360° Industrial Casters" },
            { label: "Construction", value: "Reinforced Steel Chassis" },
            { label: "Safety", value: "Modular Magnetic Locks" }
        ],
        features: ["Rapid Station Re-Config", "Anti-Static Coating Option", "High-Volume Buffer", "Heavy-Duty Build"],
        suitableIndustries: ["Lean Manufacturing", "Warehouse Logistics", "Electronics Assembly"],
        variants: [
            { label: "Wheel Type", options: ["Nylon (High-Load)", "Polyurethane (Soft-Floor)"] },
            { label: "Coating", options: ["Standard Industrial", "Anti-Static ESD", "Powder-Coated Orange"] }
        ]
    },
    {
        id: "winders",
        title: "Fillezy® Industrial Winders",
        techId: "INT-W4",
        description: "Precision winding system for off-line air cushion roll production.",
        longDescription: "The Fillezy® Industrial Winder is a high-speed attachment designed to automate the collection of inflated cushions, quilts, and bubbles. Synchronized with the Fillezy Rapid or Air Master series, it eliminates manual winding by creating perfectly tensioned industrial-grade rolls. This system is essential for regional hubs and centralized production where materials are prepared off-line for station-wide distribution.",
        image: "/product/Fillezy-Winder.webp",
        category: "Integrations",
        specs: [
            { label: "Winding Speed", value: "Up to 37 m/min" },
            { label: "Core Standard", value: "76mm Industrial" },
            { label: "Logic", value: "Synchronized Pulse Tech" },
            { label: "Capacity", value: "Full Machine Throttle" }
        ],
        gallery: [
            "/product/Fillezy-Winder.webp",
            "/product/Fillezy Paper Shark Machine.webp",
            "/product/Paper-Shark-Machine.webp"
        ],
        features: ["Auto-Stop Induction", "Perfect Tension Logic", "Eliminates Manual Winding", "Heavy-Duty Core Hub"],
        suitableIndustries: ["Regional Distribution Hubs", "Wholesale Packaging", "Centralized Fulfillment"],
        variants: [
            { label: "Arm Extension", options: ["Standard (200mm)", "Wide (400/600mm)"] },
            { label: "Model Sync", options: ["Rapid Series", "Air Master (RFID)"] }
        ]
    },
    {
        id: "woven-dunnage-bags",
        title: "Fillezy® Woven Polypropylene Dunnage Bags",
        techId: "INT-D2",
        description: "Heavy-duty moisture-impermeable load bracing for extreme sea transit.",
        longDescription: "Architected for extreme maritime conditions, Fillezy® Woven PP Dunnage Bags offer superior resistance to puncture and moisture compared to traditional Kraft bags. The laminated woven polypropylene outer shell, combined with a multi-ply co-extruded PE bladder, provides a failsafe buffer for high-value industrial cargo. These bags are 100% water impermeable, making them the industry standard for overseas containers and open-deck railcars.",
        image: "/product/Dunnage Bags.webp",
        category: "Integrations",
        specs: [
            { label: "Material", value: "Laminated Woven PP" },
            { label: "Load Rating", value: "AAR Level 1 - Level 4" },
            { label: "Impermeability", value: "100% Water-Resistant" },
            { label: "Valve Tech", value: "Turbo Reusable High-Flow" }
        ],
        features: ["Puncture Deflection Mesh", "Turbo Reusable Valve", "Salt-Mist Resistant", "High Pressure Integrity"],
        suitableIndustries: ["International Sea-Freight", "Mining Equipment Export", "Chemical Bulk Logistics"],
        variants: [
            { label: "Load Level", options: ["Level 1 (Standard)", "Level 2 (Heavy Duty)", "Level 3 (Extreme)", "Level 4 (Rail Peak)"] },
            { label: "Standard Metric", options: ["900x1200mm", "900x1800mm", "1200x1800mm", "1200x2400mm"] }
        ]
    }
];
