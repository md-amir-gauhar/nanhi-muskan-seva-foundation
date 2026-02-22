import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/db/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body);

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    });

    // Send email notification to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Submission: ${validatedData.subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
        ${validatedData.subject ? `<p><strong>Subject:</strong> ${validatedData.subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    });

    // Send auto-reply to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: validatedData.email,
      subject: "Thank you for contacting us",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${validatedData.name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <p style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #ff6b35;">
          ${validatedData.message}
        </p>
        <p>Best regards,<br/>Bright Child Cause Team</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Failed to submit contact form",
    });
  }
}
