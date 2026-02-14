"use client";

import CategoryPageLayout from "./CategoryPageLayout";
import { allProducts } from "@/data/allProducts";
import { Zap } from "lucide-react";

export default function MachinesClient() {
    // Filter products for Machines category
    const machineProducts = allProducts.filter(p => p.category === "Machines");

    return (
        <CategoryPageLayout
            title="Precision"
            subtitle="Machinery."
            description="High-velocity void fill systems engineered for the modern warehouse. Seamless integration, zero downtime, and cinematic throughput."
            icon={<Zap className="text-primary" size={24} />}
            products={machineProducts}
            categoryTag="PROTOCOL_DEPLOYED // MACHINES"
        />
    );
}
