import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/requireAdminAppRouter";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/db/prisma";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createCampaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goal: z.number().min(1, "Goal must be at least ₹1"),
  category: z.string(),
  image: z.string().url("Invalid image URL"),
  endDate: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Check admin authentication
  const auth = requireAdmin(request);
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const validatedData = createCampaignSchema.parse(body);

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Convert amount to paise
    const goalInPaise = Math.round(validatedData.goal * 100);

    const campaign = await prisma.campaign.create({
      data: {
        title: validatedData.title,
        slug,
        description: validatedData.description,
        goal: goalInPaise,
        category: validatedData.category,
        image: validatedData.image,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Campaign created successfully",
        data: {
          ...campaign,
          goal: campaign.goal / 100,
          raised: campaign.raised / 100,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    console.error("Create campaign error:", error);
    return NextResponse.json(
      {
        error: "Failed to create campaign",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  // Check admin authentication
  const auth = requireAdmin(request);
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 },
      );
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...updateData,
        goal: updateData.goal ? Math.round(updateData.goal * 100) : undefined,
        endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Campaign updated successfully",
        data: {
          ...campaign,
          goal: campaign.goal / 100,
          raised: campaign.raised / 100,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update campaign error:", error);
    return NextResponse.json(
      {
        error: "Failed to update campaign",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Check admin authentication
  const auth = requireAdmin(request);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 },
      );
    }

    await prisma.campaign.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Campaign deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete campaign error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete campaign",
      },
      { status: 500 },
    );
  }
}
