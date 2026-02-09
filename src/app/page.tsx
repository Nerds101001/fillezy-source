import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";
import SolutionsOverview from "@/components/SolutionsOverview";
import WhyFillezy from "@/components/WhyFillezy";
import VideoSection from "@/components/VideoSection";
import CertificationsSection from "@/components/CertificationsSection";
import NewsMediaSection from "@/components/NewsMediaSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import GlobalPresence from "@/components/GlobalPresence";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fillezy - Smart Packaging. Zero Waste. Maximum Protection.",
    description: "On-demand air and paper cushioning systems designed to reduce transit damages, save warehouse space, and streamline packaging operations. Serving 45+ countries.",
};

export default function Home() {
    return (
        <div className="bg-background">
            <Header />
            <main>
                <Hero />
                <PartnersMarquee />
                <SolutionsOverview />
                <WhyFillezy />
                <VideoSection />
                <CertificationsSection />
                <NewsMediaSection />
                <SustainabilitySection />
                <GlobalPresence />
            </main>
            <Footer />
        </div>
    );
}
