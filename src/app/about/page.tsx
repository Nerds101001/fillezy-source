import { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
    title: "About Fillezy - Legacy of Innovation",
    description: "40 years of engineering excellence. Vertically integrated manufacturing of industrial air cushion systems and sustainable films.",
};

export default function About() {
    return <AboutClient />;
}
