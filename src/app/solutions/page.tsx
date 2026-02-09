import { Metadata } from "next";
import SolutionsClient from "@/components/SolutionsClient";

export const metadata: Metadata = {
    title: "Packaging Ecosystems & Solutions",
    description: "Explore Fillezy's end-to-end packaging ecosystems: High-speed machines, sustainable consumables, and automated workflow integrations.",
};

export default function Solutions() {
    return <SolutionsClient />;
}
