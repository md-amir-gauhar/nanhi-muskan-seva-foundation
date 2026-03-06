import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const campaigns = await prisma.campaign.findMany({
      where: status ? { status: status } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { donations: true },
        },
      },
    });

    return NextResponse.json(
      {
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
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch campaigns",
      },
      { status: 500 },
    );
  }
}
