import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    const token = request.cookies.get("admin_token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all stats in parallel
    const [
      totalDonations,
      uniqueDonorEmails,
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
      // Total unique donors (count unique emails from successful donations)
      prisma.donation.findMany({
        where: { status: "success" },
        select: { donorEmail: true },
        distinct: ["donorEmail"],
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
      // Top campaigns by donations
      prisma.campaign.findMany({
        where: { status: "active" },
        take: 5,
        orderBy: {
          donations: {
            _count: "desc",
          },
        },
        include: {
          _count: {
            select: { donations: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalDonationsAmount: totalDonations._sum.amount || 0,
        totalDonationsCount: totalDonations._count || 0,
        totalDonors: uniqueDonorEmails.length,
        activeCampaigns,
        pendingContacts,
        recentDonations,
        topCampaigns,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
