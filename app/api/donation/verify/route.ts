import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/db/prisma";

// Validate environment variables
if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET not configured in .env");
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const verifyPaymentSchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature } = verifyPaymentSchema.parse(body);

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature",
        },
        { status: 400 },
      );
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

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          error: "Donation record not found",
        },
        { status: 404 },
      );
    }

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
    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
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
            
            <p>With gratitude,<br/>Nanhi Muskan Seva Foundation Team</p>
          `,
        });

        // Mark receipt as sent
        await prisma.donation.update({
          where: { id: donation.id },
          data: { receiptSent: true },
        });
      } catch (emailError) {
        console.error("Failed to send email receipt:", emailError);
        // Don't fail the verification if email fails
      }
    } else {
      console.warn("Email service not configured. Skipping receipt email.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        donation: {
          id: donation.id,
          amount: donation.amount / 100,
          status: donation.status,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error("Verify payment error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment. Please contact support.",
      },
      { status: 500 },
    );
  }
}
