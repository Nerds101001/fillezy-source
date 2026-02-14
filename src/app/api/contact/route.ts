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
        // Validate SMTP configuration
        const smtpConfigured = process.env.SMTP_USER &&
            process.env.SMTP_PASS &&
            process.env.SMTP_USER !== "placeholder@gmail.com";

        if (!smtpConfigured) {
            console.error('[CONTACT API] SMTP not configured. Missing environment variables.');
            console.error('[CONTACT API] SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
            console.error('[CONTACT API] SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
            return NextResponse.json(
                { error: "Email service not configured. Please contact us directly at info@fillezy.com" },
                { status: 500 }
            );
        }

        const contentType = req.headers.get("content-type") || "";
        let name, email, phone, productId, message, mode, cvFile, fileUrl;

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            name = formData.get("name") as string;
            email = formData.get("email") as string;
            productId = formData.get("role") as string;
            message = formData.get("skills") as string;
            mode = formData.get("type") as string;
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
            fileUrl = body.fileUrl;
        }

        const product = allProducts.find(p => p.id === productId);
        const productName = product ? product.title : productId;
        const productCategory = product ? product.category : "N/A";
        const adminEmail = process.env.CONTACT_RECIPIENT || "ai@rustx.com";

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

        // Send admin notification email with error handling
        try {
            console.log('[CONTACT API] Attempting to send email to:', adminEmail);
            await transporter.sendMail(adminMailOptions);
            console.log('[CONTACT API] Admin email sent successfully');
        } catch (emailError: any) {
            console.error('[CONTACT API] Failed to send admin email:', emailError.message);
            console.error('[CONTACT API] Error details:', emailError);
            return NextResponse.json(
                { error: "Failed to send email. Please try again or contact us at info@fillezy.com" },
                { status: 500 }
            );
        }

        if (mode === "SPEC_SHEET" || mode === "CATALOGUE" || mode === "CERTIFICATE") {
            const isCatalogue = mode === "CATALOGUE";
            const isCertificate = mode === "CERTIFICATE";

            const userMailOptions = {
                from: `"Fillezy Systems" <${process.env.SMTP_USER}>`,
                to: email,
                subject: isCertificate
                    ? "Your Fillezy Compliance Certificate"
                    : isCatalogue
                        ? "Your Fillezy Product Catalogue"
                        : `${productName} - Technical Specification Sheet`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee;">
                        <h2 style="color: #FF6B35;">Thank You for Your Interest</h2>
                        <p>Hi ${name},</p>
                        <p>Thank you for requesting ${isCertificate ? "our compliance certificate" : isCatalogue ? "our product catalogue" : `the technical specification for ${productName}`}.</p>
                        ${fileUrl ? `<p><a href="${fileUrl}" style="display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Download ${isCertificate ? "Certificate" : isCatalogue ? "Catalogue" : "Spec Sheet"}</a></p>` : ""}
                        <p>Our team will also reach out to you shortly to discuss your requirements.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #666;">
                            <strong>Fillezy Systems</strong><br />
                            Email: info@fillezy.com<br />
                            Phone: +91 98142 15000
                        </p>
                    </div>
                `
            };

            try {
                console.log('[CONTACT API] Sending user confirmation email to:', email);
                await transporter.sendMail(userMailOptions);
                console.log('[CONTACT API] User confirmation email sent successfully');
            } catch (userEmailError: any) {
                console.error('[CONTACT API] Failed to send user confirmation email:', userEmailError.message);
                // Don't fail the request if user email fails, admin email was successful
            }
        }

        console.log('[CONTACT API] Request completed successfully');
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: unknown) {
        const err = error as Error;
        console.error('[CONTACT API] Request failed:', err.message);
        console.error('[CONTACT API] Stack trace:', err.stack);
        return NextResponse.json(
            { error: err.message || "Internal server error. Please try again." },
            { status: 500 }
        );
    }
}
