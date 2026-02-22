import { prisma } from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { status } = req.query;

      const campaigns = await prisma.campaign.findMany({
        where: status ? { status: status as string } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { donations: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: campaigns.map(
          (campaign: {
            goal: number;
            raised: number;
            _count: { donations: any };
          }) => ({
            ...campaign,
            goal: campaign.goal / 100,
            raised: campaign.raised / 100,
            donorCount: campaign._count.donations,
          }),
        ),
      });
    } catch (error) {
      console.error("Get campaigns error:", error);
      return res.status(500).json({
        error: "Failed to fetch campaigns",
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
