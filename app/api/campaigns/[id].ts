import { prisma } from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid campaign ID" });
  }

  if (req.method === "GET") {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
          donations: {
            where: { status: "success", isAnonymous: false },
            select: {
              donorName: true,
              amount: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 10,
          },
          _count: {
            select: { donations: true },
          },
        },
      });

      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      return res.status(200).json({
        success: true,
        data: {
          ...campaign,
          goal: campaign.goal / 100,
          raised: campaign.raised / 100,
          donorCount: campaign._count.donations,
          recentDonations: campaign.donations.map((d) => ({
            ...d,
            amount: d.amount / 100,
          })),
        },
      });
    } catch (error) {
      console.error("Get campaign error:", error);
      return res.status(500).json({
        error: "Failed to fetch campaign",
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
