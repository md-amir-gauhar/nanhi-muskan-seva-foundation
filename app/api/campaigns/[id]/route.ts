import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 },
      );
    }

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
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
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
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get campaign error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch campaign",
      },
      { status: 500 },
    );
  }
}
