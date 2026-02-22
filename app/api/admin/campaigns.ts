import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check admin authentication
  const user = requireAuth(req, res);
  if (!user) return; // requireAuth already sent error response

  if (req.method === "POST") {
    try {
      const validatedData = createCampaignSchema.parse(req.body);

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
          endDate: validatedData.endDate
            ? new Date(validatedData.endDate)
            : null,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Campaign created successfully",
        data: {
          ...campaign,
          goal: campaign.goal / 100,
          raised: campaign.raised / 100,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: error.issues,
        });
      }

      console.error("Create campaign error:", error);
      return res.status(500).json({
        error: "Failed to create campaign",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Campaign ID is required" });
      }

      const campaign = await prisma.campaign.update({
        where: { id },
        data: {
          ...updateData,
          goal: updateData.goal ? Math.round(updateData.goal * 100) : undefined,
          endDate: updateData.endDate
            ? new Date(updateData.endDate)
            : undefined,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Campaign updated successfully",
        data: {
          ...campaign,
          goal: campaign.goal / 100,
          raised: campaign.raised / 100,
        },
      });
    } catch (error) {
      console.error("Update campaign error:", error);
      return res.status(500).json({
        error: "Failed to update campaign",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid campaign ID" });
      }

      await prisma.campaign.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: "Campaign deleted successfully",
      });
    } catch (error) {
      console.error("Delete campaign error:", error);
      return res.status(500).json({
        error: "Failed to delete campaign",
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
