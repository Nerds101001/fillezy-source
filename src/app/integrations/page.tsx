import { Metadata } from "next";
import IntegrationsClient from "@/components/IntegrationsClient";

export const metadata: Metadata = {
    title: "Workflow Integration & Packaging Automation",
    description: "Optimize your warehouse layout with Fillezy's overhead hoppers, conveyor integrations, and automated winding systems.",
};

export default function Integrations() {
    return <IntegrationsClient />;
}
