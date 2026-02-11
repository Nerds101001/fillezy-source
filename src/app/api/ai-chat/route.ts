import { NextResponse } from 'next/server';
import { machines } from '@/data/machines';
import { products } from '@/data/products';
import { careerJobs } from '@/data/career_jobs';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const userInput = message.toLowerCase();

        let response = "";
        let found = false;

        // 1. Search Machines
        for (const machine of machines) {
            if (userInput.includes(machine.title.toLowerCase()) || userInput.includes("machine") && userInput.includes(machine.id.split('-')[1])) {
                response = `The ${machine.title} is ${machine.description} \n\nKey Specs: \n${machine.specs.map(s => `• ${s.label}: ${s.value}`).join('\n')}`;
                found = true;
                break;
            }
        }

        // 2. Search Products
        if (!found) {
            for (const product of products) {
                if (userInput.includes(product.title.toLowerCase())) {
                    response = `Our ${product.title} is a ${product.description}. It's highly optimized for sustainable packaging automation.`;
                    found = true;
                    break;
                }
            }
        }

        // 3. Search Careers
        if (!found && (userInput.includes("job") || userInput.includes("career") || userInput.includes("opening") || userInput.includes("work"))) {
            response = `We have ${careerJobs.length} current openings including ${careerJobs.slice(0, 2).map(j => j.title).join(', ')}. You can view full details on our Careers page!`;
            found = true;
        }

        // 4. General Info
        if (!found) {
            if (userInput.includes("contact") || userInput.includes("reach") || userInput.includes("call")) {
                response = "You can reach our operating team directly at +91 98142 15000 or email us at info@fillezy.com. Or simply click 'Start Chat' to talk on WhatsApp!";
            } else if (userInput.includes("help") || userInput.includes("what can you do")) {
                response = "I can tell you about our packaging machines (like Fillezy Rapid or Paper Shark), our sustainable materials, current job openings, or help you contact our sales team!";
            } else {
                response = "I'm the Fillezy Assistant. I can help you with technical machine specs, sustainable material info, or connecting with our sales team. How can I assist you specifically?";
            }
        }

        return NextResponse.json({ text: response });
    } catch {
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
