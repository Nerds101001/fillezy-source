import { Metadata } from "next";
import MachinesClient from "@/components/MachinesClient";

export const metadata: Metadata = {
    title: "Industrial Void Fill Machines",
    description: "Discover Fillezy's range of high-velocity air cushion systems. From the compact Series 400 to the industrial-grade Rapid 7000.",
};

export default function Machines() {
    return <MachinesClient />;
}
