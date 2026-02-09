import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { allProducts } from "@/data/allProducts";
import path from "path";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER || "placeholder@gmail.com",
        pass: process.env.SMTP_PASS || "placeholder_pass",
    },
});

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get("content-type") || "";
        let name, email, phone, productId, message, mode, targetEmail, cvFile;

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            name = formData.get("name") as string;
            email = formData.get("email") as string;
            productId = formData.get("role") as string;
            message = formData.get("skills") as string;
            mode = formData.get("type") as string;
            targetEmail = formData.get("target") as string;
            cvFile = formData.get("cv") as File;
        } else {
            const body = await req.json();
            name = body.name;
            email = body.email;
            phone = body.phone;
            productId = body.product;
            message = body.message;
            mode = body.mode;
            targetEmail = process.env.ADMIN_EMAIL || "sales@fillezy.com";
        }

        const product = allProducts.find(p => p.id === productId);
        const productName = product ? product.title : productId;
        const productCategory = product ? product.category : "N/A";
        const adminEmail = process.env.CONTACT_RECIPIENT || "ai@rustx.com"; // Dynamic routing via Env Var

        const adminMailOptions: any = {
            from: `"Fillezy Web Leads" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            subject: `New ${mode === "CAREER_APPLICATION" ? "Career Application" : mode} Request: ${productName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee;">
                    <h2 style="color: #FF6B35;">${mode === "CAREER_APPLICATION" ? "New Career Submission" : "New Business Lead"}</h2>
                    <p><strong>Type:</strong> ${mode}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                    <p><strong>${mode === "CAREER_APPLICATION" ? "Selected Role" : "Product"}:</strong> ${productName} ${productCategory !== "N/A" ? `(${productCategory})` : ""}</p>
                    ${message ? `<p><strong>${mode === "CAREER_APPLICATION" ? "Skills/Statement" : "Message"}:</strong> ${message}</p>` : ""}
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Automated Transmission // Fillezy Industrial Core</p>
                </div>
            `,
            attachments: []
        };

        if (cvFile) {
            const buffer = Buffer.from(await cvFile.arrayBuffer());
            adminMailOptions.attachments.push({
                filename: cvFile.name,
                content: buffer
            });
        }

        await transporter.sendMail(adminMailOptions);

        if (mode === "SPEC_SHEET" || mode === "CATALOGUE") {
            const isCatalogue = mode === "CATALOGUE";
            const downloadUrl = isCatalogue
                ? "https://fillezy.com/Fillezy-Catalogue-Final.pdf"
                : `https://fillezy.com/product-specs/${productId}.pdf`; // Hypothetical for now, using main for demo

            const userMailOptions = {
                from: `"Fillezy Support" <${process.env.SMTP_USER}>`,
                to: email,
                subject: isCatalogue ? "Fillezy Full Product Catalogue" : `Technical Specifications: ${productName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; line-height: 1.6;">
                        <h2 style="color: #FF6B35;">${isCatalogue ? "Full Catalogue Access" : "Technical Specs Ready"}</h2>
                        <p>Dear ${name},</p>
                        <p>Thank you for your interest in <strong>Fillezy Protective Packaging</strong>.</p>
                        <div style="margin: 30px 0;">
                            <a href="${downloadUrl}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                                ${isCatalogue ? "DOWNLOAD FULL CATALOGUE (PDF)" : "DOWNLOAD SPEC SHEET (PDF)"}
                            </a>
                        </div>
                        <p>Our engineering team is ready to assist you with any custom workflow requirements.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p>Best Regards,</p>
                        <p><strong>Team Fillezy</strong><br/>Gurugram, India // Los Angeles, USA</p>
                    </div>
                `,
            };
            await transporter.sendMail(userMailOptions);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }
}
