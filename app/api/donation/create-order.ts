import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import Razorpay from "razorpay";
import { prisma } from "@/db/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const createOrderSchema = z.object({
  amount: z.number().min(1, "Amount must be at least ₹1"),
  donorName: z.string().min(2, "Name is required"),
  donorEmail: z.string().email("Invalid email"),
  donorPhone: z.string().min(10, "Valid phone number required"),
  donorPan: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  campaignId: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const validatedData = createOrderSchema.parse(req.body);

    // Convert amount to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(validatedData.amount * 100);

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        campaignId: validatedData.campaignId || "general",
      },
    });

    // Save donation record in database
    const donation = await prisma.donation.create({
      data: {
        orderId: order.id,
        amount: amountInPaise,
        currency: "INR",
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        donorPhone: validatedData.donorPhone,
        donorPan: validatedData.donorPan,
        isAnonymous: validatedData.isAnonymous,
        campaignId: validatedData.campaignId,
        status: "created",
      },
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: amountInPaise,
      currency: order.currency,
      donationId: donation.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.issues,
      });
    }

    console.error("Create order error:", error);
    return res.status(500).json({
      error: "Failed to create donation order",
    });
  }
}
