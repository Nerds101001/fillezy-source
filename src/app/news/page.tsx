import { Metadata } from "next";
import NewsClient from "@/components/NewsClient";

export const metadata: Metadata = {
    title: "News & Media | Fillezy",
    description: "Fillezy and its group companies featured in leading publications for innovation in sustainable packaging, bio-polymers, and industrial manufacturing.",
};

export default function News() {
    return <NewsClient />;
}
