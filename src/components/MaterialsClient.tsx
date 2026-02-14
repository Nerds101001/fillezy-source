"use client";

import CategoryPageLayout from "./CategoryPageLayout";
import { allProducts } from "@/data/allProducts";
import { ShieldCheck } from "lucide-react";

export default function MaterialsClient() {
    // Filter products for Materials category
    const materialProducts = allProducts.filter(p => p.category === "Materials" || p.category === "Bio Aer");

    return (
        <CategoryPageLayout
            title="Sustainable"
            subtitle="Materials."
            description="Next-generation protective films and paper consumables. Engineered for circular economy compliance and zero-damage transit."
            icon={<ShieldCheck className="text-primary" size={24} />}
            products={materialProducts}
            categoryTag="ECO_PROTOCOL // MATERIALS"
        />
    );
}
