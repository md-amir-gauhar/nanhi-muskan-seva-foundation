import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/db/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const verifyPaymentSchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, paymentId, signature } = verifyPaymentSchema.parse(
      req.body,
    );

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        error: "Invalid payment signature",
      });
    }

    // Update donation status
    const donation = await prisma.donation.update({
      where: { orderId },
      data: {
        paymentId,
        signature,
        status: "success",
      },
      include: {
        campaign: true,
      },
    });

    // Update campaign raised amount if donation is for a campaign
    if (donation.campaignId) {
      await prisma.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raised: {
            increment: donation.amount,
          },
        },
      });
    }

    // Send receipt email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: donation.donorEmail,
      subject: "Thank you for your donation - Receipt",
      html: `
        <h2>Thank you for your generous donation!</h2>
        <p>Dear ${donation.donorName},</p>
        <p>We have received your donation of <strong>₹${(donation.amount / 100).toFixed(2)}</strong>.</p>
        
        <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h3>Donation Details</h3>
          <p><strong>Amount:</strong> ₹${(donation.amount / 100).toFixed(2)}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          ${donation.campaign ? `<p><strong>Campaign:</strong> ${donation.campaign.title}</p>` : ""}
        </div>

        <p>Your contribution will help us make a difference in the lives of underprivileged children.</p>
        <p>This is your official receipt for tax purposes.</p>
        
        <p>With gratitude,<br/>Bright Child Cause Team</p>
      `,
    });

    // Mark receipt as sent
    await prisma.donation.update({
      where: { id: donation.id },
      data: { receiptSent: true },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      donation: {
        id: donation.id,
        amount: donation.amount / 100,
        status: donation.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Verify payment error:", error);
    return res.status(500).json({
      error: "Failed to verify payment",
    });
  }
}
