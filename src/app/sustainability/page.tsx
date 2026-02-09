import SustainabilityClient from "@/components/SustainabilityClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sustainability - Zero Waste Global Packaging",
    description: "Our industrial-grade paper systems and 100% compostable Bio-Aer materials are engineered for zero-waste high-velocity fulfillment.",
};

export default function SustainabilityPage() {
    return <SustainabilityClient />;
}
