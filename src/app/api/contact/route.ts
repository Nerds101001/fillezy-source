import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { allProducts } from "@/data/allProducts";

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
        let name, email, phone, productId, message, mode, cvFile, fileUrl;

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            name = formData.get("name") as string;
            email = formData.get("email") as string;
            productId = formData.get("role") as string;
            message = formData.get("skills") as string;
            mode = formData.get("type") as string;
            // targetEmail = formData.get("target") as string;
            cvFile = formData.get("cv") as File;
            fileUrl = formData.get("fileUrl") as string;
        } else {
            const body = await req.json();
            name = body.name;
            email = body.email;
            phone = body.phone;
            productId = body.product;
            message = body.message;
            mode = body.mode;
            // targetEmail = process.env.ADMIN_EMAIL || "sales@fillezy.com";
            fileUrl = body.fileUrl;
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

        if (mode === "SPEC_SHEET" || mode === "CATALOGUE" || mode === "CERTIFICATE") {
            const isCatalogue = mode === "CATALOGUE";
            const isCertificate = mode === "CERTIFICATE";

            let downloadUrl = "";
            let emailSubject = "";
            let emailHeader = "";
            let buttonText = "";

            if (isCatalogue) {
                downloadUrl = "https://fillezy.com/Fillezy-Catalogue-Final.pdf";
                emailSubject = "Fillezy Full Product Catalogue";
                emailHeader = "Full Catalogue Access";
                buttonText = "DOWNLOAD FULL CATALOGUE (PDF)";
            } else if (isCertificate) {
                // If it's a certificate, the fileUrl should be passed from the frontend, 
                // but we can fallback or ensure it's absolute. 
                // Since actual file is local public, we construct full URL.
                // However, for local dev it's localhost, for prod it's domain.
                // For now, we trust the relative path or construct it.
                // Ideally, we just link to the file.
                // But the user receives this email.
                const baseUrl = "https://fillezy.com"; // Hardcoded for production email
                const cleanFileUrl = fileUrl || "";
                downloadUrl = cleanFileUrl.startsWith("http") ? cleanFileUrl : `${baseUrl}${cleanFileUrl}`;
                emailSubject = "Fillezy Compliance Documentation";
                emailHeader = "Certificate Access Granted";
                buttonText = "DOWNLOAD CERTIFICATE";
            } else {
                downloadUrl = `https://fillezy.com/product-specs/${productId}.pdf`;
                emailSubject = `Technical Specifications: ${productName}`;
                emailHeader = "Technical Specs Ready";
                buttonText = "DOWNLOAD SPEC SHEET (PDF)";
            }

            const userMailOptions = {
                from: `"Fillezy Support" <${process.env.SMTP_USER}>`,
                to: email,
                subject: emailSubject,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; line-height: 1.6;">
                        <h2 style="color: #FF6B35;">${emailHeader}</h2>
                        <p>Dear ${name},</p>
                        <p>Thank you for your interest in <strong>Fillezy Protective Packaging</strong>.</p>
                        <div style="margin: 30px 0;">
                            <a href="${downloadUrl}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                                ${buttonText}
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
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }
}
