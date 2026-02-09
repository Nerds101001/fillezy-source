import { Metadata } from "next";
import IndustriesClient from "@/components/IndustriesClient";

export const metadata: Metadata = {
    title: "Sector-Specific Packaging Solutions",
    description: "Specialized protection protocols for E-Commerce, Automotive, Pharmaceuticals, and Electronics industries.",
};

export default function Industries() {
    return <IndustriesClient />;
}
