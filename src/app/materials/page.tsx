import { Metadata } from "next";
import MaterialsClient from "@/components/MaterialsClient";

export const metadata: Metadata = {
    title: "Sustainable Packaging Materials & Films",
    description: "Browse our catalog of FSC-certified paper, compostable Bio-AER films, and heavy-duty protective consumables.",
};

export default function Materials() {
    return <MaterialsClient />;
}
