"use client";

import CategoryPageLayout from "./CategoryPageLayout";
import { allProducts } from "@/data/allProducts";
import { Globe } from "lucide-react";

export default function IntegrationsClient() {
    // Filter products for Integrations category
    const integrationProducts = allProducts.filter(p => p.category === "Integrations");

    return (
        <CategoryPageLayout
            title="Workflow"
            subtitle="Integrations."
            description="Advanced workflow automation and gravity-fed infrastructure. Optimize your warehouse throughput with modular technical bays."
            icon={<Globe className="text-primary" size={24} />}
            products={integrationProducts}
            categoryTag="SYSTEM_SYNC // INTEGRATIONS"
        />
    );
}
