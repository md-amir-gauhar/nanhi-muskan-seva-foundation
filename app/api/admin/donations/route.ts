import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdminAppRouter";
import { prisma } from "@/db/prisma";

export async function GET(request: NextRequest) {
  // Check admin authentication
  const auth = requireAdmin(request);
  if ("error" in auth) return auth.error;

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        campaign: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: donations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get donations error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch donations",
      },
      { status: 500 },
    );
  }
}
