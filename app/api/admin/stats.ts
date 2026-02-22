import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check admin authentication
    const user = requireAuth(req, res);
    if (!user) return; // requireAuth already sent error response

    // Get all stats in parallel
    const [
      totalDonations,
      totalDonors,
      activeCampaigns,
      pendingContacts,
      recentDonations,
      topCampaigns,
    ] = await Promise.all([
      // Total donations amount (successful only)
      prisma.donation.aggregate({
        where: { status: "success" },
        _sum: { amount: true },
        _count: true,
      }),
      // Total unique donors
      prisma.user.count({
        where: { role: "user" },
      }),
      // Active campaigns
      prisma.campaign.count({
        where: { status: "active" },
      }),
      // Pending contacts
      prisma.contact.count(),
      // Recent donations (last 10)
      prisma.donation.findMany({
        where: { status: "success" },
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          campaign: {
            select: { title: true },
          },
        },
      }),
      // Top campaigns by raised amount
      prisma.campaign.findMany({
        take: 5,
        orderBy: { raised: "desc" },
        select: {
          id: true,
          title: true,
          goal: true,
          raised: true,
          _count: {
            select: { donations: true },
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalDonationsAmount: (totalDonations._sum.amount || 0) / 100,
        totalDonationsCount: totalDonations._count,
        totalDonors,
        activeCampaigns,
        pendingContacts,
        recentDonations: recentDonations.map((d) => ({
          ...d,
          amount: d.amount / 100,
        })),
        topCampaigns: topCampaigns.map((c) => ({
          ...c,
          goal: c.goal / 100,
          raised: c.raised / 100,
          donorCount: c._count.donations,
        })),
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({
      error: "Failed to fetch admin stats",
    });
  }
}
