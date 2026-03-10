import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { prisma } from "@/db/prisma";

const createOrderSchema = z.object({
  amount: z
    .number()
    .min(1, "Amount must be at least ₹1")
    .max(10000000, "Amount too large"),
  donorName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  donorEmail: z
    .string()
    .email("Invalid email address")
    .max(255, "Email too long"),
  donorPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  donorPan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .optional()
    .or(z.literal("")),
  isAnonymous: z.boolean().default(false),
  campaignId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (
      !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("Razorpay credentials missing:", {
        hasKeyId: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
      });
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment service not configured. Please contact administrator.",
        },
        { status: 500 },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Convert amount to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(validatedData.amount * 100);

    // Verify campaign exists if campaignId provided
    if (validatedData.campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: validatedData.campaignId },
      });

      if (!campaign) {
        return NextResponse.json(
          {
            success: false,
            error: "Campaign not found",
          },
          { status: 404 },
        );
      }
    }

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

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: amountInPaise,
        currency: order.currency,
        donationId: donation.id,
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

    console.error("Create order error:", error);

    // Handle Razorpay specific errors
    if (error && typeof error === "object" && "statusCode" in error) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment gateway error. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create donation order. Please try again.",
      },
      { status: 500 },
    );
  }
}
