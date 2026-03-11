import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { requireAdmin } from "@/lib/requireAdminAppRouter";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAdmin(request);
    if (auth.error) {
      return auth.error;
    }

    // Fetch all contacts ordered by most recent first
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}
